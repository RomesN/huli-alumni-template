import { useQuery } from "react-query";
import { getToDos } from "../api/toDoApi";
import ToDoBox from "./ToDoBox";
import { ToDo, ToDoListProps } from "../shared/types/toDos";
import Loading from "./Loading";
import usePrivateApi from "../hooks/usePrivateApi";
import styles from "../styles/toDoList.module.css";
import { useCallback } from "react";
import { SelectOption } from "../shared/types/others";
import { isBefore, parseISO } from "date-fns";

const ToDoList = ({ searchString, appliedSort, sortIsAsc }: ToDoListProps) => {
    const privateApi = usePrivateApi();
    const toDos = useQuery(["toDos", [privateApi]], getToDos, {
        useErrorBoundary: true,
        staleTime: 1000 * 60 * 60,
    });

    const sortById = useCallback((toDoA: ToDo, toDoB: ToDo) => {
        return toDoA.id - toDoB.id;
    }, []);

    const sortByName = useCallback(
        (toDoA: ToDo, toDoB: ToDo) => {
            const result = sortIsAsc ? -1 : 1;
            return toDoA.name < toDoB.name ? result : -1 * result;
        },
        [sortIsAsc]
    );

    const sortByDone = useCallback(
        (toDoA: ToDo, toDoB: ToDo) => {
            const result = sortIsAsc ? -1 : 1;
            return toDoA.done && !toDoB.done ? result : -1 * result;
        },
        [sortIsAsc]
    );

    const sortByDueDate = useCallback(
        (toDoA: ToDo, toDoB: ToDo) => {
            const result = sortIsAsc ? -1 : 1;
            const dateA = parseISO(toDoA.dueDate);
            const dateB = parseISO(toDoB.dueDate);
            return isBefore(
                new Date(dateA.getFullYear(), dateA.getMonth(), dateA.getDay()),
                new Date(dateB.getFullYear(), dateB.getMonth(), dateB.getDay())
            )
                ? result
                : -1 * result;
        },
        [sortIsAsc]
    );

    const sortByPriority = useCallback(
        (toDoA: ToDo, toDoB: ToDo) => {
            const result = sortIsAsc ? -1 : 1;
            if (
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

    if (toDos.data) {
        return (
            <div className={styles.toDoListContainer}>
                {toDos.data.data.sort(getSortFunction(appliedSort)).map((toDoToShow) => (
                    <ToDoBox key={toDoToShow.id} toDo={toDoToShow} />
                ))}
            </div>
        );
    }

    return <Loading />;
};

export default ToDoList;
