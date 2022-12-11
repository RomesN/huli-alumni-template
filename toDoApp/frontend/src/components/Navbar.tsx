import { useState } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/navbar.module.css";

const Navbar = () => {
    const [searchOn, setSearchOn] = useState(false);

    return (
        <div className={styles.navbarContainer}>
            <ul className={styles.navbar}>
                <li className={styles.ordinaryItem}>Add new</li>
                <li className={styles.ordinaryItem}>Logout</li>
                <li
                    onClick={() => {
                        setSearchOn(!searchOn);
                    }}
                    className={styles.ordinaryItem}
                >
                    <FontAwesomeIcon icon={faSearch} className={styles.searchSwitcher} />
                </li>
                <li className={searchOn ? styles.serachInputOn : styles.serachInputOff}>
                    <input placeholder="type here" type="text"></input>
                </li>
            </ul>
        </div>
    );
};

export default Navbar;
