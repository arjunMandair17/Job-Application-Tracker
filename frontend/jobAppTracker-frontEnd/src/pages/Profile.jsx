import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import Footer from "../components/Footer";
import NoAuth from "../components/NoAuth";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Profile({ isAuth = false, includeFooter = true, onViewApps = () => {} }) {
  const navigate = useNavigate();
  const [data, setData] = useState({ username: null, apps: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isAuth) return;

    const loadProfile = async () => {
      setLoading(true);
      try {
        const profileResp = await fetch(`${BACKEND_URL}/auth/profile`, {
          method: "GET",
          credentials: "include",
        });
        if (!profileResp.ok) throw new Error("Failed to load profile");
        const profile = await profileResp.json();

        const appsResp = await fetch(`${BACKEND_URL}/jobApps`, {
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
      <>
      <NoAuth
        title="Sign in to view your profile!"
        innerText="Sign in to organize your job search, all in one place."
      />
        {includeFooter && <Footer />}
      </>
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
    <>
      <div className="min-h-[calc(100vh-112px)] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white/90 p-10 shadow-lg backdrop-blur-sm">
          <div className="mb-8 text-center">
            <h1 className="mb-2 flex items-center justify-center gap-3 text-4xl font-bold !text-slate-900">
              <SmileOutlined className="!text-blue-500" />
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
      {includeFooter && <Footer />}
    </>
  );
}
