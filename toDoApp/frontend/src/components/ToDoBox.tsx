import { add, format, isBefore, parseISO } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faExclamation,
    faExclamationCircle,
    faCalendarDay,
    faCheck,
    faPen,
    faFloppyDisk,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { ToDo, ToDoBoxProps } from "../shared/types/toDos";
import styles from "../styles/toDoBox.module.css";
import { toDoPriorityEnum } from "../shared/utils/toDoPriorityEnum";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { Positions } from "../shared/types/others";
import { deleteToDo, updateToDo } from "../api/toDoApi";
import { getToDoObject } from "../shared/utils/helperFunctions";

const ToDoBox = ({ toDo }: ToDoBoxProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isShown, setIsShown] = useState(true);
    const [id, setId] = useState<number | null>(null);
    const [dueDate, setDueDate] = useState<string | null>(null);
    const [priority, setPriority] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [done, setDone] = useState(false);
    const queryClient = useQueryClient();
    const containerElement = useRef<HTMLDivElement | null>(null);
    const MySwal = withReactContent(Swal);

    useEffect(() => {
        setId(toDo.id);
        setDueDate(toDo.dueDate ? format(parseISO(toDo.dueDate), "yyyy-MM-dd") : null);
        setPriority(toDo.priority.toLocaleLowerCase());
        setName(toDo.name);
        setDescription(toDo.description);
        setDone(toDo.done);
        if (!toDo.name) {
            setIsEditing(true);
        }
    }, [toDo.id, toDo.dueDate, toDo.priority, toDo.name, toDo.description, toDo.done]);

    const updateToDoMutation = useMutation({
        mutationFn: updateToDo,
        onSuccess: (data: ToDo) => {
            queryClient.setQueryData("toDos", (oldData: ToDo[] | null | undefined) =>
                oldData ? [...oldData.filter((toDoOld: ToDo) => toDoOld.id !== data.id), data] : []
            );
        },
    });

    const deleteToDoMutation = useMutation({
        mutationFn: deleteToDo,
        onSuccess: (data: string, variables: ToDo) => {
            queryClient.setQueryData("toDos", (oldData: ToDo[] | null | undefined) =>
                oldData ? [...oldData.filter((toDoOld: ToDo) => toDoOld.id !== variables.id)] : []
            );
        },
    });

    const handleDeleteClick = (toDoParam: ToDo) => {
        MySwal.fire({
            title: "Please, confirm delete.",
            showDenyButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't delete`,
            customClass: {
                popup: styles.popup,
                title: styles.popupTitle,
                confirmButton: styles.deleteButtonPopup,
                denyButton: styles.noThreatButtonPopup,
                actions: styles.actionsContainerPopup,
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteToDoMutation.mutate(toDoParam);
                MySwal.fire({
                    title: "Todo was deleted.",
                    icon: "success",
                    customClass: {
                        popup: styles.popup,
                        title: styles.popupTitle,
                        confirmButton: styles.noThreatButtonPopup,
                        icon: styles.successIconPopup,
                    },
                });
            } else if (result.isDenied) {
                MySwal.fire({
                    title: "Todo was not deleted.",
                    icon: "info",
                    customClass: {
                        popup: styles.popup,
                        title: styles.popupTitle,
                        confirmButton: styles.noThreatButtonPopup,
                        icon: styles.infoIconPopup,
                    },
                });
            }
        });
    };

    useScrollPosition(
        ({ prevPos, currPos }: Positions) => {
            const shouldShow = currPos.y > 50;
            if (isShown !== shouldShow) {
                setIsShown(shouldShow);
            }
        },
        [isShown],
        containerElement,
        false,
        null
    );

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const giveClassNameExtension = useCallback((toDoDone: boolean, isEditingMode: boolean) => {
        if (isEditingMode) {
            return styles.editMode;
        } else {
            return toDoDone ? styles.done : styles.normal;
        }
    }, []);

    const givePriorityClassNameExtension = useCallback(
        (toDoDone: boolean, isEditingMode: boolean, priority: string, date?: string | null) => {
            if (!toDoDone && !isEditingMode && !date) {
                switch (priority.toLocaleLowerCase()) {
                    case "low":
                        return styles.low;
                    case "medium":
                        return styles.medium;
                    case "high":
                        return styles.high;
                }
            } else if (!toDoDone && !isEditingMode && date) {
                if (isBefore(parseISO(date), add(new Date(), { days: 1 }))) {
                    return styles.high;
                } else if (isBefore(parseISO(date), add(new Date(), { days: 3 }))) {
                    return styles.medium;
                } else {
                    return styles.low;
                }
            } else {
                return "";
            }
        },
        [styles]
    );

    const givePriority = useCallback(
        (toDoDone: boolean, isEditingMode: boolean, priority: string) => {
            if (toDoDone) {
                return (
                    <FontAwesomeIcon
                        icon={faCheck}
                        className={`${styles.priority} ${giveClassNameExtension(toDoDone, isEditingMode)}`}
                    />
                );
            } else {
                switch (priority.toLocaleLowerCase()) {
                    case toDoPriorityEnum.HIGH.toLocaleLowerCase():
                        return (
                            <FontAwesomeIcon
                                icon={faExclamationCircle}
                                className={`${styles.priority} ${givePriorityClassNameExtension(
                                    toDoDone,
                                    isEditingMode,
                                    priority
                                )} ${giveClassNameExtension(toDoDone, isEditingMode)}`}
                            />
                        );
                    case toDoPriorityEnum.MEDIUM.toLocaleLowerCase():
                        return (
                            <FontAwesomeIcon
                                icon={faExclamation}
                                className={`${styles.priority} ${givePriorityClassNameExtension(
                                    toDoDone,
                                    isEditingMode,
                                    priority
                                )} ${giveClassNameExtension(toDoDone, isEditingMode)}`}
                            />
                        );
                    case toDoPriorityEnum.LOW.toLocaleLowerCase():
                        return (
                            <FontAwesomeIcon
                                icon={faCalendarDay}
                                className={`${styles.priority} ${givePriorityClassNameExtension(
                                    toDoDone,
                                    isEditingMode,
                                    priority
                                )} ${giveClassNameExtension(toDoDone, isEditingMode)}`}
                            />
                        );
                }
            }
        },
        [styles]
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = event.currentTarget.value;
        const name = event.currentTarget.name;
        switch (name) {
            case "dueDate":
                setDueDate(value);
                break;
            case "priority":
                setPriority(value);
                break;
            case "name":
                setName(value);
                break;
            case "description":
                setDescription(value);
                break;
        }
    };

    return (
        <div
            className={`${isShown ? styles.toDoBox : styles.hidden} ${giveClassNameExtension(done, isEditing)}`}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            ref={containerElement}
        >
            <div className={styles.toDoHeader}>
                <div className={styles.dueDateContainer}>
                    {!dueDate && !isEditing ? (
                        <p className={`${styles.dueDate} ${giveClassNameExtension(done, isEditing)}`}>no due date</p>
                    ) : (
                        <input
                            disabled={!isEditing}
                            type="date"
                            name="dueDate"
                            value={dueDate ? format(parseISO(dueDate), "yyyy-MM-dd") : ""}
                            className={`${styles.dueDate} ${givePriorityClassNameExtension(
                                done,
                                isEditing,
                                priority,
                                dueDate
                            )} ${giveClassNameExtension(done, isEditing)}`}
                            onChange={handleChange}
                        />
                    )}
                </div>
                <div className={styles.priorityContainer}>
                    {!isEditing ? (
                        givePriority(done, isEditing, priority)
                    ) : (
                        <select
                            className={`${styles.priority} ${giveClassNameExtension(done, isEditing)}`}
                            onChange={handleChange}
                            name="priority"
                        >
                            <option value={priority[0].toUpperCase() + priority.substring(1).toLocaleLowerCase()}>
                                {priority[0].toUpperCase() + priority.substring(1).toLocaleLowerCase()}
                            </option>
                            {Object.values(toDoPriorityEnum).map((key) => {
                                if (key.toLocaleLowerCase() !== priority.toLocaleLowerCase()) {
                                    return (
                                        <option
                                            key={key}
                                            value={key[0].toUpperCase() + key.substring(1).toLocaleLowerCase()}
                                        >
                                            {key[0].toUpperCase() + key.substring(1).toLocaleLowerCase()}
                                        </option>
                                    );
                                }
                            })}
                        </select>
                    )}
                </div>
                {done && !isEditing && dueDate ? <hr className={styles.doneLine}></hr> : ""}
            </div>
            <div className={`${styles.nameContainer}`}>
                <input
                    disabled={!isEditing}
                    type="text"
                    name="name"
                    value={name}
                    className={`${styles.name} ${giveClassNameExtension(done, isEditing)}`}
                    onChange={handleChange}
                    placeholder="name"
                    maxLength={32}
                />
            </div>
            <div className={`${styles.descriptionContainer}`}>
                <input
                    disabled={!isEditing}
                    type="text"
                    name="description"
                    value={description}
                    className={`${styles.description} ${giveClassNameExtension(done, isEditing)}`}
                    onChange={handleChange}
                    placeholder="description"
                    maxLength={32}
                />
            </div>
            {!isEditing ? (
                <button
                    className={isHovering ? styles.markDoneButtonShow : styles.markDoneButton}
                    onClick={() => {
                        const doneUpdate = !done;
                        if (id) {
                            updateToDoMutation.mutate(
                                getToDoObject(id, dueDate, priority, name, description, doneUpdate)
                            );
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            ) : (
                ""
            )}
            {!isEditing ? (
                <>
                    <button
                        className={isHovering ? styles.deleteButtonShow : styles.deleteButton}
                        onClick={() => {
                            handleDeleteClick({ id, dueDate, priority, name, description, done } as ToDo);
                        }}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                        className={isHovering ? styles.editButtonShow : styles.editButton}
                        onClick={() => {
                            setIsEditing(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                </>
            ) : (
                <button
                    className={isHovering ? styles.saveButtonShow : styles.saveButton}
                    onClick={() => {
                        if (id) {
                            updateToDoMutation.mutate(getToDoObject(id, dueDate, priority, name, description, done));
                            setIsEditing(false);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faFloppyDisk} />
                </button>
            )}
        </div>
    );
};

export default ToDoBox;
