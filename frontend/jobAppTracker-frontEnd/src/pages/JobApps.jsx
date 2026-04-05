import Search from "../components/Search";
import ItemView from "../components/ItemView";
import { Select } from "antd";
import { useState } from "react";

const JobApps = () => {
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <Search>
                <Select
                    placeholder="Filter by status"
                    options={[
                        { value: "all", label: "All Applications" },
                        { value: "pending", label: "Pending" },
                        { value: "interview", label: "In Interview" },
                        { value: "rejected", label: "Rejected" },
                        { value: "offered", label: "Offered" }
                    ]}
                    className="!flex !items-left !justify-left !mb-4 !w-[200px] !h-10 !text-sm"
                    value={filter}
                    onChange={(value) => setFilter(value)}
                />
            </Search>

            
            <ItemView items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]} />

        </div>
    );
};

export default JobApps;