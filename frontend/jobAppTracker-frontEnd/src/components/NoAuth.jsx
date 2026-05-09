import { useNavigate } from "react-router-dom";
import { FrownOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function NoAuth({ title, innerText }) {
  const navigate = useNavigate();
  return (
    <div className="min-h-[calc(100vh-112px)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white/90 px-8 py-10 text-center shadow-lg backdrop-blur-sm sm:px-10">
        <div className="mb-6 flex flex-col items-center gap-4">
          <span
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[2.125rem] leading-none !text-blue-500 ring-1 ring-blue-100/80"
            aria-hidden
          >
            <FrownOutlined />
          </span>
          <h1 className="m-0 max-w-md text-[1.5rem] font-bold leading-snug !text-blue-500 sm:text-3xl sm:leading-tight">
            {title}
          </h1>
        </div>

        <div className="flex flex-col items-center gap-7 sm:gap-9 md:gap-11">
          <p className="m-0 max-w-md text-base leading-7 text-slate-600">
            {innerText}
          </p>
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
    </div>
  );
}
