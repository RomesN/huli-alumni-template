import { AxiosInstance } from "axios";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { ToDo } from "./toDos";

type Props = {
    children?: ReactNode;
};

type State = {
    hasError: boolean;
};

type SelectOption = {
    label: string;
    value: string;
};

type SelectSortProps = {
    options: SelectOption[];
    value: SelectOption | null;
    onChange: (value: SelectOption | null) => void;
};

type LocalStorage<T> = [T, Dispatch<SetStateAction<T>>];

type Position = { x: number; y: number };

type Positions = { prevPos: Position; currPos: Position };

type TargetProps = { element?: React.MutableRefObject<HTMLElement | null> | null; useWindow?: boolean };

export type { LocalStorage, Position, Positions, Props, SelectOption, SelectSortProps, State, TargetProps };
