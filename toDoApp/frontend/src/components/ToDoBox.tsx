import { useCallback, useRef, useState } from "react";
import { add, format, isBefore, parseISO } from "date-fns";
import { ToDo, ToDoBoxProps } from "../shared/types/toDos";
import styles from "../styles/toDoBox.module.css";
import { toDoPriorityEnum } from "../shared/utils/toDoPriorityEnum";
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
import { useScrollPosition } from "../hooks/useScrollPosition";
import { Positions } from "../shared/types/others";
import { useMutation, useQueryClient } from "react-query";
import { deleteToDo, updateToDo } from "../api/toDoApi";

const ToDoBox = ({ toDo }: ToDoBoxProps) => {
    const [editing, setEditing] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isShown, setIsShown] = useState(true);
    const queryClient = useQueryClient();
    const containerElement = useRef<HTMLDivElement | null>(null);

    const toggleDoneMutation = useMutation({
        mutationFn: updateToDo,
        onSuccess: (data: ToDo) => {
            queryClient.setQueryData("toDos", (oldData: ToDo[] | null | undefined) =>
                oldData ? [...oldData.filter((toDo: ToDo) => toDo.id !== data.id), data] : []
            );
        },
    });

    const deleteToDoMutation = useMutation({
        mutationFn: deleteToDo,
        onSuccess: (data: string, variables: ToDo) => {
            queryClient.setQueryData("toDos", (oldData: ToDo[] | null | undefined) =>
                oldData ? [...oldData.filter((toDo: ToDo) => toDo.id !== variables.id)] : []
            );
        },
    });

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
        (toDoDone: boolean, isEditingMode: boolean, priority: string, date?: string) => {
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

    return (
        <div
            className={isShown ? styles.toDoBox : styles.hidden}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            ref={containerElement}
        >
            <div className={styles.toDoHeader}>
                <div className={styles.dueDateContainer}>
                    {!toDo.dueDate && !editing ? (
                        <p className={`${styles.dueDate} ${giveClassNameExtension(toDo.done, editing)}`}>no due date</p>
                    ) : (
                        <input
                            disabled={!editing}
                            type="date"
                            name="dueDate"
                            defaultValue={format(parseISO(toDo.dueDate), "yyyy-MM-dd")}
                            className={`${styles.dueDate} ${givePriorityClassNameExtension(
                                toDo.done,
                                editing,
                                toDo.priority,
                                toDo.dueDate
                            )} ${giveClassNameExtension(toDo.done, editing)}`}
                        />
                    )}
                </div>
                <div className={styles.priorityContainer}>
                    {!editing ? (
                        givePriority(toDo.done, editing, toDo.priority)
                    ) : (
                        <select className={`${styles.priority} ${giveClassNameExtension(toDo.done, editing)}`}>
                            <option
                                value={toDo.priority[0].toUpperCase() + toDo.priority.substring(1).toLocaleLowerCase()}
                            >
                                {toDo.priority[0].toUpperCase() + toDo.priority.substring(1).toLocaleLowerCase()}
                            </option>
                            {Object.values(toDoPriorityEnum).map((key) => {
                                if (key.toLocaleLowerCase() !== toDo.priority.toLocaleLowerCase()) {
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
                {toDo.done && !editing ? <hr className={styles.doneLine}></hr> : ""}
            </div>
            <div className={`${styles.nameContainer}`}>
                <input
                    disabled={!editing}
                    type="text"
                    name="name"
                    defaultValue={toDo.name}
                    className={`${styles.name} ${giveClassNameExtension(toDo.done, editing)}`}
                />
            </div>
            <div className={`${styles.descriptionContainer}`}>
                <input
                    disabled={!editing}
                    type="textarea"
                    name="name"
                    defaultValue={toDo.description}
                    className={`${styles.description} ${giveClassNameExtension(toDo.done, editing)}`}
                />
            </div>
            {!editing ? (
                <button
                    className={isHovering ? styles.markDoneButtonShow : styles.markDoneButton}
                    onClick={() => {
                        const toDoToUpdate = { ...toDo };
                        toDoToUpdate.done = !toDoToUpdate.done;
                        toggleDoneMutation.mutate(toDoToUpdate);
                    }}
                >
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            ) : (
                ""
            )}
            {!editing ? (
                <>
                    <button
                        className={isHovering ? styles.deleteButtonShow : styles.deleteButton}
                        onClick={() => deleteToDoMutation.mutate(toDo)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                        className={isHovering ? styles.editButtonShow : styles.editButton}
                        onClick={() => {
                            setEditing(true);
                        }}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                </>
            ) : (
                <button className={isHovering ? styles.saveButtonShow : styles.saveButton}>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                </button>
            )}
        </div>
    );
};

export default ToDoBox;
