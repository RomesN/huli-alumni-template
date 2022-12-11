import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import SelectSort from "./SortSelect";
import { ToDoNavigationProps } from "../shared/types/toDoPage";
import { toDoSortEnum } from "../shared/utils/toDoSortEnum";

type OptionType = {
    value: string;
    label: string;
};

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

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);
    };

    return (
        <div className={styles.navbarContainer}>
            <ul className={styles.navbar}>
                <li
                    className={`${styles.hoverSpecialEffect} ${styles.item} ${styles.grey}`}
                    onClick={() => {
                        localStorage.removeItem(import.meta.env.VITE_JWT_LOCALSTORAGE_NAME);
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
        </div>
    );
};

export default Navbar;
