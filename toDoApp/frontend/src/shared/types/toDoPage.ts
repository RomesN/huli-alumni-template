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

type SelectOption = {
    label: string;
    value: string;
};

type SelectSortProps = {
    options: SelectOption[];
    value: SelectOption | null;
    onChange: (value: SelectOption | null) => void;
};

export type { SelectOption, SelectSortProps, ToDoNavigationProps };
