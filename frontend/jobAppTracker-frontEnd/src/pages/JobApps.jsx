import Search from "../components/Search";
import ItemView from "../components/ItemView";
import { Select, Button } from "antd";
import { useState, useEffect } from "react";
import { FrownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

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

            const response = await fetch(`${BACKEND_URL}/jobApps`, {
                method: "GET",
                credentials: "include",
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
            <div className="min-h-[calc(100vh-112px)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white/90 p-10 text-center shadow-lg backdrop-blur-sm">
                <h1 className="mb-3 flex items-center justify-center gap-3 text-3xl font-bold !text-blue-500">
                    <FrownOutlined className="!text-blue-500" />
                    Sign in to view your applications!
                </h1>
                <p className="mb-8 text-base leading-7 text-slate-600">
                    Sign in to see organize your job search, all in one place.
                </p>
                <br></br>

                <Button
                    onClick={() => navigate("/login")}
                    className="h-11 px-6 text-base font-semibold"
                    type="primary"
                    size="large"
                >
                    Sign In
                </Button>
                </div>
            </div>
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