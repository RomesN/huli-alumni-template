import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import SelectSort from "./SortSelect";
import { ToDoNavigationProps } from "../shared/types/toDos";
import { toDoSortEnum } from "../shared/utils/toDoSortEnum";
import { useEffect } from "react";
import { useTokenContext } from "../hooks/useTokenContext";

const Navbar = ({
    searchOn,
    setSearchOn,
    searchString,
    setSearchString,
    appliedSort,
    setAppliedSort,
    sortIsAsc,
    setSortIsAsc,
}: ToDoNavigationProps) => {
    const navigate = useNavigate();
    const { setAccessToken } = useTokenContext();

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    };

    const handleAscDscSwithc = () => {
        if (sortIsAsc !== null) {
            setSortIsAsc((value) => !value);
        }
    };

    useEffect(() => {
        if (!sortIsAsc) {
            setSortIsAsc(true);
        }
    }, [appliedSort]);

    return (
        <>
            <ul className={styles.navbar}>
                <li
                    className={`${styles.hoverSpecialEffect} ${styles.item} ${styles.grey}`}
                    onClick={() => {
                        setAccessToken("");
                        navigate("/login");
                    }}
                >
                    Logout
                </li>
                <li className={`${styles.hoverSpecialEffect} ${styles.item} ${styles.green}`}>Add new</li>
                <li className={`${styles.item}`}>
                    <SelectSort
                        options={Object.entries(toDoSortEnum).map((entry) => {
                            return { label: entry[1], value: entry[0] };
                        })}
                        onChange={setAppliedSort}
                        value={appliedSort}
                    />
                </li>
                <li
                    className={`${styles.item} ${styles.hoverSpecialEffect} ${
                        appliedSort ? styles.ascSwitcherShow : styles.ascSwitcherHide
                    } ${styles.green} ${styles.greenDarker}`}
                    onClick={() => handleAscDscSwithc()}
                >
                    {sortIsAsc ? "Asc" : "Dsc"}
                </li>
                <li
                    onClick={() => {
                        setSearchString("");
                        setSearchOn(!searchOn);
                    }}
                    className={`${styles.hoverSpecialEffect} ${styles.item} ${styles.green}`}
                >
                    <FontAwesomeIcon icon={faSearch} className={`${styles.searchSwitcher}`} />
                </li>
                <li className={`${styles.item} ${searchOn ? styles.serachInputOn : styles.serachInputOff}`}>
                    <input placeholder="type here" type="text" onChange={handleInput} value={searchString}></input>
                </li>
            </ul>
        </>
    );
};

export default Navbar;
