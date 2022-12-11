import { useState } from "react";
import Navbar from "../components/Navbar";
import { SelectOption } from "../shared/types/toDoPage";

const ToDos = () => {
    const [searchOn, setSearchOn] = useState(false);
    const [searchString, setSearchString] = useState<string>("");
    const [appliedSort, setAppliedSort] = useState<SelectOption | null>(null);
    const [sortIsAsc, setSortIsAsc] = useState<boolean | null>(null);

    return (
        <div>
            <div>
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
            </div>
            <div></div>
        </div>
    );
};

export default ToDos;
