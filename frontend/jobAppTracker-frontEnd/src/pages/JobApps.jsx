import Search from "../components/Search";
import ItemView from "../components/ItemView";
import { Select } from "antd";
import { useState, useEffect } from "react";

const JobApps =  () => {
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch("http://localhost:3000/jobApps", {
                method: "GET",
                credentials: "include",
            });
            const data = await response.json();
            setItems(data.apps || []);
        };

        fetchItems();
    }, []);

    const visibleItems = items.filter((item) => {
        const query = searchTerm.trim().toLowerCase();
        if (!query) return true;

        return (
            String(item.title || "").toLowerCase().includes(query) ||
            String(item.company || "").toLowerCase().includes(query) ||
            String(item.description || "").toLowerCase().includes(query) ||
            String(item.status || "").toLowerCase().includes(query)
        );
    });

    return (
        <div>
            <Search onSearchChange={setSearchTerm}>
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

            
            <ItemView items={visibleItems} />

        </div>
    );
};

export default JobApps;