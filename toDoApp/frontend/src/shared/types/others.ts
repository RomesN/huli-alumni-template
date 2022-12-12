import { Dispatch, ReactNode, SetStateAction } from "react";

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

export type { LocalStorage, Props, SelectOption, SelectSortProps, State };
