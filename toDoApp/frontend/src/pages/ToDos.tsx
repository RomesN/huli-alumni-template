import { useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Navbar from "../components/Navbar";
import ToDoList from "../components/ToDoList";
import { SelectOption } from "../shared/types/others";
import styles from "../styles/toDoPage.module.css";

const ToDos = () => {
    const [searchOn, setSearchOn] = useState(false);
    const [searchString, setSearchString] = useState<string>("");
    const [appliedSort, setAppliedSort] = useState<SelectOption | null>(null);
    const [sortIsAsc, setSortIsAsc] = useState<boolean | null>(null);

    return (
        <div>
            <div className={styles.navbarContainer}>
                <ErrorBoundary>
                    <Navbar
                        searchOn={searchOn}
                        setSearchOn={setSearchOn}
                        searchString={searchString}
                        setSearchString={setSearchString}
                        appliedSort={appliedSort}
                        setAppliedSort={setAppliedSort}
                        sortIsAsc={sortIsAsc}
                        setSortIsAsc={setSortIsAsc}
                    />
                </ErrorBoundary>
            </div>
            <div className={styles.listContainer}>
                <ErrorBoundary>
                    <ToDoList searchString={searchString} appliedSort={appliedSort} sortIsAsc={sortIsAsc} />
                </ErrorBoundary>
            </div>
        </div>
    );
};

export default ToDos;
