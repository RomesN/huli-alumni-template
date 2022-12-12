import { useEffect, useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import Navbar from "../components/Navbar";
import ToDoList from "../components/ToDoList";
import { SelectOption } from "../shared/types/others";
import styles from "../styles/toDoPage.module.css";

const ToDos = () => {
    const [searchOn, setSearchOn] = useState(false);
    const [searchStringInput, setSearchStringInput] = useState<string>("");
    const [searchString, setSearchString] = useState<string>("");
    const [appliedSort, setAppliedSort] = useState<SelectOption | null>(null);
    const [sortIsAsc, setSortIsAsc] = useState<boolean | null>(null);

    useEffect(() => {
        const timeOutId = setTimeout(() => setSearchString(searchStringInput), 500);
        return () => clearTimeout(timeOutId);
    }, [searchStringInput]);

    return (
        <div>
            <div className={styles.navbarContainer}>
                <ErrorBoundary>
                    <Navbar
                        searchOn={searchOn}
                        setSearchOn={setSearchOn}
                        searchString={searchStringInput}
                        setSearchString={setSearchStringInput}
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
