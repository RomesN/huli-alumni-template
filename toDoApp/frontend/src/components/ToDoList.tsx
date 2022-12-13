import { useQuery } from "react-query";
import { getToDos } from "../api/toDoApi";
import ToDoBox from "./ToDoBox";
import { ToDo, ToDoListProps } from "../shared/types/toDos";
import Loading from "./Loading";
import styles from "../styles/toDoList.module.css";
import { useCallback } from "react";
import { SelectOption } from "../shared/types/others";
import { isBefore, parseISO } from "date-fns";
import { format } from "date-fns/esm";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { da } from "date-fns/locale";

const ToDoList = ({ searchString, appliedSort, sortIsAsc }: ToDoListProps) => {
    const navigate = useNavigate();
    const { isLoading, isError, data, error } = useQuery<ToDo[], AxiosError<any>>(["toDos"], getToDos, {
        staleTime: 1000 * 60 * 40,
    });

    const sortById = useCallback((toDoA: ToDo, toDoB: ToDo) => {
        // done todos always last
        if (!toDoA.done && toDoB.done) {
            return -1;
        } else if (toDoA.done && !toDoB.done) {
            return 1;
        } else {
            return toDoA.id - toDoB.id;
        }
    }, []);

    const sortByName = useCallback(
        (toDoA: ToDo, toDoB: ToDo) => {
            // done todos always last
            if (!toDoA.done && toDoB.done) {
                return -1;
            } else if (toDoA.done && !toDoB.done) {
                return 1;
            } else {
                const result = sortIsAsc ? -1 : 1;
                return toDoA.name < toDoB.name ? result : -1 * result;
            }
        },
        [sortIsAsc]
    );

    const sortByDone = useCallback(
        (toDoA: ToDo, toDoB: ToDo) => {
            const result = sortIsAsc ? 1 : -1;
            return toDoA.done && !toDoB.done ? result : -1 * result;
        },
        [sortIsAsc]
    );

    const sortByDueDate = useCallback(
        (toDoA: ToDo, toDoB: ToDo) => {
            // done todos always last
            if (!toDoA.done && toDoB.done) {
                return -1;
            } else if (toDoA.done && !toDoB.done) {
                return 1;
            } else {
                const result = sortIsAsc ? -1 : 1;
                const dateA = parseISO(toDoA.dueDate);
                const dateB = parseISO(toDoB.dueDate);

                return isBefore(
                    new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDay()),
                    new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDay())
                )
                    ? result
                    : -1 * result;
            }
        },
        [sortIsAsc]
    );

    const sortByPriority = useCallback(
        (toDoA: ToDo, toDoB: ToDo) => {
            const result = sortIsAsc ? 1 : -1;

            // done todos always last
            if (!toDoA.done && toDoB.done) {
                return -1;
            } else if (toDoA.done && !toDoB.done) {
                return 1;
            } else if (
                toDoA.priority.toLocaleLowerCase() === "high" &&
                (toDoB.priority.toLocaleLowerCase() === "medium" || toDoB.priority.toLocaleLowerCase() === "low")
            ) {
                return result;
            } else if (
                toDoA.priority.toLocaleLowerCase() === "medium" &&
                toDoB.priority.toLocaleLowerCase() === "low"
            ) {
                return result;
            } else {
                return -1 * result;
            }
        },
        [sortIsAsc]
    );

    const getSortFunction = useCallback(
        (appliedSortSelect: SelectOption | null) => {
            switch (appliedSortSelect?.value.toLocaleLowerCase()) {
                case "name":
                    return sortByName;
                case "done":
                    return sortByDone;
                case "duedate":
                    return sortByDueDate;
                case "priority":
                    return sortByPriority;
                default:
                    return sortById;
            }
        },
        [sortById, sortByName, sortByDone, sortByDueDate, sortByPriority]
    );

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        return error.response?.status === 401 ? navigate("/login") : error;
    }

    if (data) {
        return (
            <div className={styles.toDoListContainer}>
                {data
                    .filter((toDo) => {
                        const dateAsDate = parseISO(toDo.dueDate);
                        if (!searchString) {
                            return true;
                        } else if (
                            //filtering all fields
                            toDo.description.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ||
                            toDo.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) ||
                            toDo.priority.toLocaleLowerCase().includes(searchString) ||
                            (toDo.done && searchString.toLocaleLowerCase() === "$done") ||
                            (toDo.done && searchString.toLocaleLowerCase() === "$opened") ||
                            dateAsDate.getFullYear().toString().includes(searchString.toLocaleLowerCase()) ||
                            (dateAsDate.getMonth() + 1).toString().includes(searchString.toLocaleLowerCase()) ||
                            dateAsDate.getDate().toString().includes(searchString.toLocaleLowerCase()) ||
                            format(dateAsDate, "dd.MM.yyyy").includes(searchString.toLocaleLowerCase())
                        ) {
                            return true;
                        }
                    })

                    .sort(getSortFunction(appliedSort))
                    .map((toDoToShow) => (
                        <ToDoBox key={toDoToShow.id} toDo={toDoToShow} />
                    ))}
            </div>
        );
    }
};

export default ToDoList;
