import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";

export default function Profile({ isAuth = false, onViewApps = () => {} }) {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: null, apps: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuth) return;

    const loadProfile = async () => {
      setLoading(true);
      try {
        const profileResp = await fetch("http://localhost:3000/auth/profile", {
          method: "GET",
          credentials: "include",
        });
        if (!profileResp.ok) throw new Error("Failed to load profile");
        const profile = await profileResp.json();

        const appsResp = await fetch("http://localhost:3000/jobApps", {
          method: "GET",
          credentials: "include",
        });
        if (!appsResp.ok) throw new Error("Failed to load applications");
        const appsJson = await appsResp.json();

        setData({
          username: profile.user.username,
          apps: appsJson.apps || [],
        });
      } catch (err) {
        setError(err.message || "Error loading profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isAuth]);

  if (!isAuth) {
    return (
      <div className="min-h-[calc(100vh-112px)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white/90 p-10 text-center shadow-lg backdrop-blur-sm">
          <h1 className="mb-3 flex items-center justify-center gap-3 text-3xl font-bold text-slate-900">
            <SmileOutlined className="text-blue-500" />
            Sign in to view your profile
          </h1>
          <p className="mb-8 text-base leading-7 text-slate-600">
            Sign in to see your username and application count in one place.
          </p>

          <Button
            onClick={() => navigate("/login")}
            className="h-11 px-6 text-base font-semibold"
            type="primary"
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <div className="min-h-[calc(100vh-112px)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <p className="rounded-full border border-slate-200 bg-white px-5 py-3 text-center text-slate-600 shadow-sm">
          Loading profile...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-[calc(100vh-112px)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <p className="rounded-full border border-red-200 bg-red-50 px-5 py-3 text-center text-red-600 shadow-sm">
          {error}
        </p>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-112px)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white/90 p-10 shadow-lg backdrop-blur-sm">
        <div className="mb-8 text-center">
          <h1 className="mb-2 flex items-center justify-center gap-3 text-4xl font-bold !text-slate-900">
            <SmileOutlined className="text-blue-500" />
            My Profile
          </h1>
          <p className="text-base text-slate-600">
            A quick snapshot of your account and saved applications.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-slate-500">
              Username
            </p>
            <h3 className="text-2xl font-semibold text-slate-900">
              {data.username}
            </h3>
          </div>

          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">
              Applications
            </p>
            <h4 className="text-2xl font-semibold text-slate-900">
              {data.apps.length}
            </h4>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={onViewApps}
            className="h-11 px-6 text-base font-semibold"
            type="primary"
          >
            View Applications
          </Button>
        </div>
      </div>
    </div>
  );
}
