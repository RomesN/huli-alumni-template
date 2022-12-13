import { parse } from "date-fns";
import { ToDo } from "../types/toDos";

export const getToDoObject = (
    idParam: number | null,
    dueDateParam: string | null,
    priorityParam: string,
    nameParam: string,
    descriptionParam: string,
    doneParam: boolean
) => {
    const dueDateDate = dueDateParam ? parse(dueDateParam, "yyyy-MM-dd", new Date()).toISOString() : null;
    return {
        id: idParam,
        dueDate: dueDateDate,
        priority: priorityParam.toUpperCase(),
        name: nameParam,
        description: descriptionParam,
        done: doneParam,
    } as ToDo;
};
