import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { SelectOption, SelectSortProps } from "../shared/types/others";
import styles from "../styles/selectSort.module.css";

const SelectSort = ({ value, onChange, options }: SelectSortProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);

    const handleClear = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        if (value) {
            onChange(null);
        }
        setIsOpen(false);
    };

    const handleSelect = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, selectedOption: SelectOption) => {
        event.stopPropagation();
        if (selectedOption.value !== value?.value) {
            onChange(selectedOption);
        }
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) setHighlightedIndex(0);
    }, [isOpen]);

    return (
        <div
            onBlur={() => setIsOpen(false)}
            onClick={() => setIsOpen((prev) => !prev)}
            tabIndex={0}
            className={styles.container}
        >
            <span className={styles.value}>
                {value ? `${value.label}` : `Sort by`}
                <FontAwesomeIcon icon={faCaretDown} size="sm" />
            </span>
            <div className={`${styles.options} ${isOpen ? styles.show : ""}`}>
                {options.map((option, index) => {
                    if (option.value === "clearAll") {
                        return (
                            <div
                                onClick={(event) => {
                                    handleClear(event);
                                }}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                key={option.value}
                                className={`${styles.option} ${option.value === value?.value ? styles.selected : ""} ${
                                    index === highlightedIndex ? styles.highlighted : ""
                                }`}
                            >
                                <hr />
                                {option.label}
                            </div>
                        );
                    } else {
                        return (
                            <div
                                onClick={(event) => {
                                    handleSelect(event, option);
                                }}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                key={option.value}
                                className={`${styles.option} ${option.value === value?.value ? styles.selected : ""} ${
                                    index === highlightedIndex ? styles.highlighted : ""
                                }`}
                            >
                                {option.label}
                            </div>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default SelectSort;
