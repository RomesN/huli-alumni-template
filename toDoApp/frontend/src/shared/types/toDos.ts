import { toDoPriorityEnum } from "../utils/toDoPriorityEnum";
import { SelectOption } from "./others";

type ToDoNavigationProps = {
    appliedSort: SelectOption | null;
    setAppliedSort: React.Dispatch<React.SetStateAction<SelectOption | null>>;
    sortIsAsc: boolean | null;
    setSortIsAsc: React.Dispatch<React.SetStateAction<boolean | null>>;
    searchOn: boolean;
    setSearchOn: React.Dispatch<React.SetStateAction<boolean>>;
    searchString: string;
    setSearchString: React.Dispatch<React.SetStateAction<string>>;
};

type ToDo = {
    id: number;
    name: string;
    description: string;
    done: boolean;
    dueDate: string;
    priority: string;
};

type ToDoBoxProps = {
    toDo: ToDo;
};

type ToDoListProps = {
    searchString: string;
    appliedSort: SelectOption | null;
    sortIsAsc: boolean | null;
};

export type { ToDo, ToDoBoxProps, ToDoListProps, ToDoNavigationProps };
