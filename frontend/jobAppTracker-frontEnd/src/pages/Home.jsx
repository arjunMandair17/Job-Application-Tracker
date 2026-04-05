import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  SolutionOutlined,
  HomeOutlined,
  LogoutOutlined,
  LoginOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import JobApps from "./JobApps";
const { Header, Sider, Content } = Layout;

const isAuthenticated = async () => {   // change this to useEffect later
  // check if the user has an active session by sending a request to the backend
  const response = await fetch("http://localhost:3000/auth/session", {
    method: "GET",
    credentials: "include", // include cookies in the request
  });
  return response.ok;
};

const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenuKey, setActiveMenuKey] = useState("1");
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
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

            <Button
              type="primary"
              icon={ isAuthenticated ? <LoginOutlined/> : <LogoutOutlined />}
              style={{ marginLeft: "auto", marginRight: 24, marginBottom: 0 }}
              onClick={() => navigate("/login")}
            >
              {isAuthenticated ? "Log In" : "Log Out"}
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
              <Hero
                onAddApplication={() => setActiveMenuKey("4")}
                onViewApplications={() => setActiveMenuKey("3")}
              />
            )}

            {activeMenuKey === "3" && (
            <>
                <JobApps />
            </>
            )}

            {activeMenuKey !== "1" && activeMenuKey !== "3" && <p>Coming soon.</p>}

          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Home;
