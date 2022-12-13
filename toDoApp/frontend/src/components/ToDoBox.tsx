import { useCallback, useState } from "react";
import { add, format, isBefore, parseISO } from "date-fns";
import { ToDoBoxProps } from "../shared/types/toDos";
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
} from "@fortawesome/free-solid-svg-icons";

const ToDoBox = ({ toDo }: ToDoBoxProps) => {
    const [editing, setEditing] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

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
        <div className={styles.toDoBox} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
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
                    type="description"
                    name="name"
                    defaultValue={toDo.description}
                    className={`${styles.description} ${giveClassNameExtension(toDo.done, editing)}`}
                />
            </div>
            {!editing ? (
                <button className={isHovering ? styles.markDoneButtonShow : styles.markDoneButton}>
                    <FontAwesomeIcon icon={faCheck} />
                </button>
            ) : (
                ""
            )}
            {!editing ? (
                <button
                    className={isHovering ? styles.editButtonShow : styles.editButton}
                    onClick={() => {
                        setEditing(true);
                    }}
                >
                    <FontAwesomeIcon icon={faPen} />
                </button>
            ) : (
                <button className={isHovering ? styles.saveButtonShow : styles.saveButton}>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                </button>
            )}
        </div>
    );
};

export default ToDoBox;
