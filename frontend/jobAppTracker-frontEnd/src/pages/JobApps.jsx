import Search from "../components/Search";
import ItemView from "../components/ItemView";
import { Select, Button } from "antd";
import { useState, useEffect } from "react";
import { FrownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import NoAuth from "../components/NoAuth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const JobApps =  ({ isAuth }) => {
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            if (!isAuth) {
                setItems([]);
                return;
            }

            const token = localStorage.getItem('token');
            const response = await fetch(`${BACKEND_URL}/jobApps`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                setItems([]);
                return;
            }

            const data = await response.json();
            setItems(data.apps || []);
        };

        fetchItems();
    }, [isAuth]);

    const visibleItems = items.filter((item) => {
        const query = searchTerm.trim().toLowerCase();
        const status = String(item.status || "").toLowerCase();

        const matchesStatus =
            filter === "all" || status.includes(filter.toLowerCase());

        if (!matchesStatus) return false;
        if (!query) return true;

        return (
            String(item.title || "").toLowerCase().includes(query) ||
            String(item.company || "").toLowerCase().includes(query) ||
            String(item.description || "").toLowerCase().includes(query) ||
            String(item.status || "").toLowerCase().includes(query)
        );
    });

    if (!isAuth) {
        return (
            <NoAuth 
            title="Sign in to view your applications!" 
            innerText="Sign in to see organize your job search, all in one place." 
            />
        );
    }

    return (
        <div>
            <Search onSearchChange={setSearchTerm}>
                <Select
                    placeholder="Filter by status"
                    options={[
                        { value: "all", label: "All Applications" },
                        { value: "applied", label: "Applied" },
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