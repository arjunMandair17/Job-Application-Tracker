import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  SolutionOutlined,
  HomeOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import JobApps from "./JobApps";
import NewApp from "./NewApp";
import Profile from "./Profile";
import Footer from "../components/Footer";
import HomeTitle from "../components/HomeTitle";
import HomeHighlights from "../components/HomeHighlights";

const { Header, Sider, Content } = Layout;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenuKey, setActiveMenuKey] = useState("1");
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("Guest");
  const navigate = useNavigate();
  const {
    token: {
      colorBgContainer,
      borderRadiusLG,
      colorPrimary,
      colorPrimaryBg,
      colorBorderSecondary,
      colorFillTertiary,
    },
  } = theme.useToken();

  useEffect(() => {
    const loadAuth = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/auth/profile`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          setIsAuth(false);
          setUsername("Guest");
          return;
        }

        const profile = await response.json();
        setIsAuth(true);
        setUsername(profile.user.username || "User");
      } catch {
        setIsAuth(false);
        setUsername("Guest");
      }
    };

    loadAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setIsAuth(false);
      setUsername("Guest");
      navigate("/login");
    }
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[activeMenuKey]}
            onClick={({ key }) => setActiveMenuKey(key)}
            items={[
              {
                key: "1",
                icon: <HomeOutlined />,
                label: "Home",
              },
              {
                key: "2",
                icon: <UserOutlined />,
                label: "My Profile",
              },
              {
                key: "3",
                icon: <SolutionOutlined />,
                label: "My Applications",
              },
              {
                key: "4",
                icon: <UploadOutlined />,
                label: "Add Application",
              },
            ]}
          />
        </Sider>
        <Layout style={{ minHeight: "100vh" }} className="text-left">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
                marginLeft: 0,
              }}
            />

            <p className="flex-1 text-md font-semibold !text-center">
              Welcome to Job-Vault, {username}!
            </p>

            <Button
              type="primary"
              icon={isAuth ? <LogoutOutlined /> : <LoginOutlined />}
              style={{ marginLeft: "auto", marginRight: 24, marginBottom: 0 }}
              onClick={isAuth ? handleLogout : () => navigate("/login")}
            >
              {isAuth ? "Log Out" : "Log In"}
            </Button>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "calc(100vh - 112px)",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {activeMenuKey === "1" && (
              <section
                aria-label="Job-Vault home"
                style={{
                  minHeight: "clamp(520px, 62vh, 760px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 0,
                  margin: "-14px -10px 0",
                  padding:
                    "clamp(28px, 4vw, 48px) clamp(12px, 3vw, 28px) clamp(20px, 3vw, 36px)",
                  borderRadius: borderRadiusLG,
                  background: `radial-gradient(120% 80% at 50% -15%, ${colorPrimaryBg} 0%, transparent 52%),
                    linear-gradient(180deg, ${colorFillTertiary} 0%, transparent 42%)`,
                  border: `1px solid ${colorBorderSecondary}`,
                  boxShadow: `0 1px 0 color-mix(in srgb, ${colorPrimary} 18%, transparent) inset, 0 24px 48px rgba(15,23,42,0.06)`,
                }}
              >
                <HomeTitle />
                <div
                  aria-hidden
                  style={{
                    margin: "8px auto 28px",
                    height: 1,
                    width: "min(280px, 72%)",
                    background: `linear-gradient(90deg, transparent, color-mix(in srgb, ${colorPrimary} 45%, transparent), transparent)`,
                  }}
                />
                <Hero
                  onAddApplication={() => setActiveMenuKey("4")}
                  onViewApplications={() => setActiveMenuKey("3")}
                />
                <HomeHighlights />
              </section>
            )}

            {activeMenuKey === "3" && (
              <>
                <JobApps isAuth={isAuth} />
              </>
            )}

            {activeMenuKey === "2" && (
              <Profile
                isAuth={isAuth}
                includeFooter={false}
                onViewApps={() => setActiveMenuKey("3")}
              />
            )}

            {activeMenuKey === "4" && <NewApp isAuth={isAuth} />}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
