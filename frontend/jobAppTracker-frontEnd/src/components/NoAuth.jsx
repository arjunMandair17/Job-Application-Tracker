
import { useNavigate } from "react-router-dom";
import { FrownOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function NoAuth( {title, innerText} ) {
    const navigate = useNavigate();
    return (
            <div className="min-h-[calc(100vh-112px)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50">
                <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white/90 p-10 text-center shadow-lg backdrop-blur-sm">
                <h1 className="mb-3 flex items-center justify-center gap-3 text-3xl font-bold !text-blue-500">
                <FrownOutlined className="!text-blue-500" />
                    {title}
                </h1>
                <p className="mb-8 text-base leading-7 text-slate-600">
                    {innerText}
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
    )
};