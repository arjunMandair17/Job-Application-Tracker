import {
  Form,
  Input,
  Button,
  Modal,
  Typography,
  Divider,
  Card,
  Space,
  theme,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeOutlined, SafetyOutlined } from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import { message } from "antd";
import Footer from "./Footer";

const { Title, Text, Paragraph } = Typography;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const EXTENSION_ID = import.meta.env.VITE_EXTENSION_ID;

/** Mirrors backend `/auth/register` validation in authRouter.js */
const USERNAME_REGEX = /^[a-zA-Z0-9._@-]{1,254}$/;
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{12,}$/;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInType, setSignInType] = useState("Login");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const {
    token: {
      colorPrimaryBg,
      colorFillTertiary,
      colorBgContainer,
      colorBorderSecondary,
      colorPrimary,
    },
  } = theme.useToken();

  const signInText =
    signInType === "Login"
      ? "Don't have an account? Sign Up!"
      : "Already have an account? Login!";

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const response = await fetch(BACKEND_URL + "/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });

      const result = await response.json();

      if (result && result.success) {
        message.success(result.message || "Google login successful");
        // Store JWT token in localStorage
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
        navigate("/");
        return;
      }
      setPopupMessage(result.message || "Google login failed");
      setPopupOpen(true);
    } catch {
      setPopupMessage("Google login failed");
      setPopupOpen(true);
    }
  };

  const handleGoogleLoginError = () => {
    setPopupMessage("Google login failed");
    setPopupOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();

    if (signInType === "Sign Up") {
      if (!USERNAME_REGEX.test(trimmedUsername)) {
        setPopupMessage(
          "Username can be 1–254 characters. Allowed characters: letters, numbers, dots, hyphens, underscores, and @ symbol (supports email addresses).",
        );
        setPopupOpen(true);
        return;
      }
      if (!PASSWORD_REGEX.test(password)) {
        setPopupMessage(
          "Password must be at least 12 characters and include uppercase, lowercase, and a number. Characters allowed: letters, digits, or @ $ ! % * ? &.",
        );
        setPopupOpen(true);
        return;
      }
    }

    const endpoint = signInType === "Login" ? "login" : "register";
    const response = await fetch(`${BACKEND_URL}/auth/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: trimmedUsername,
        password,
      }),
    });
    const result = await response.json();

    if (response.ok) {
      message.success(result.message || `${signInType} successful`);
      // Store JWT token in localStorage
      if (result.token) {

        localStorage.setItem('token', result.token);

        // if the browser is chromium-based, send the token to the extension as well so it can verify authentication
        if (typeof chrome !== "undefined" && chrome.runtime) {
          chrome.runtime.sendMessage(EXTENSION_ID, {type: "AUTH_SUCCESS", token: result.token}, response => {
            console.log("Response from extension:", response);
            if (chrome.runtime.lastError) {
              console.error("Error sending message to extension:", chrome.runtime.lastError);
            }else{
              console.log("Message sent to extension!");
            }
          });
          
        }
        
      }
      navigate("/");
      return;
    }

    setPopupMessage(result.message || "Authentication failed");
    setPopupOpen(true);
  };

  return (
    <>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f8fafc",
          backgroundImage: `radial-gradient(120% 90% at 50% -25%, ${colorPrimaryBg} 0%, transparent 52%),
            linear-gradient(180deg, ${colorFillTertiary} 0%, transparent 48%)`,
        }}
      >
        <Button
          type="primary"
          icon={<HomeOutlined />}
          onClick={() => navigate("/")}
          style={{
            position: "fixed",
            top: window.innerWidth < 640 ? 10 : 20,
            left: window.innerWidth < 640 ? 10 : 20,
            zIndex: 20,
            height: window.innerWidth < 640 ? 36 : 40,
            borderRadius: 10,
            fontSize: window.innerWidth < 640 ? 14 : 16,
            boxShadow: `0 8px 20px color-mix(in srgb, ${colorPrimary} 35%, transparent)`,
          }}
        >
          {window.innerWidth < 640 ? "" : "Home"}
        </Button>

        <Modal
          title="Something went wrong"
          open={popupOpen}
          onOk={() => setPopupOpen(false)}
          onCancel={() => setPopupOpen(false)}
        >
          <p>{popupMessage}</p>
        </Modal>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(72px, 12vw, 120px) clamp(16px, 4vw, 32px) 40px",
          }}
        >
          <Card
            variant="borderless"
            style={{
              width: "100%",
              maxWidth: window.innerWidth < 640 ? "95%" : 460,
              background: colorBgContainer,
              borderRadius: 22,
              border: `1px solid ${colorBorderSecondary}`,
              boxShadow: `0 1px 0 color-mix(in srgb, ${colorPrimary} 12%, transparent) inset,
                0 28px 64px rgba(15, 23, 42, 0.12)`,
            }}
            styles={{ body: { padding: "clamp(24px, 5vw, 36px)" } }}
          >
            <Space direction="vertical" size={20} style={{ width: "100%" }}>
              <div style={{ textAlign: "center" }}>
                <Title
                  level={1}
                  style={{
                    margin: 0,
                    fontSize: "clamp(1.75rem, 5vw, 2.25rem)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    fontWeight: 800,
                  }}
                >
                  Job-Vault
                </Title>
                <Text type="secondary" style={{ fontSize: 13, letterSpacing: "0.22em" }}>
                  STAY ORGANIZED, STAY AHEAD
                </Text>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  padding: "12px 14px",
                  borderRadius: 12,
                  background: colorPrimaryBg,
                  border: `1px solid color-mix(in srgb, ${colorPrimary} 18%, transparent)`,
                }}
              >
                <SafetyOutlined style={{ fontSize: 18, color: colorPrimary }} />
                <Text style={{ fontSize: 13, color: "rgba(15,23,42,0.75)" }}>
                  Apply with confidence — your data is secure with us
                </Text>
              </div>

              <Title level={4} style={{ margin: 0 }}>
                {signInType === "Login" ? "Welcome back" : "Create your account"}
              </Title>
              <Paragraph
                style={{
                  margin: "-8px 0 0",
                  color: "rgba(15,23,42,0.65)",
                  fontSize: 14,
                }}
              >
                Use Google or your email and password to access your applications.
              </Paragraph>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "14px 12px",
                  borderRadius: 14,
                  background: "rgba(248, 250, 252, 0.95)",
                  border: "1px solid rgba(148,163,184,0.22)",
                }}
              >
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    handleGoogleLoginSuccess(credentialResponse);
                  }}
                  onError={() => {
                    handleGoogleLoginError();
                  }}
                />
              </div>

              <Divider plain style={{ margin: "4px 0" }}>
                or email & password
              </Divider>

              {signInType === "Sign Up" && (
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "rgba(248, 250, 252, 0.95)",
                    border: `1px solid rgba(148,163,184,0.28)`,
                  }}
                >
                  <Text strong style={{ fontSize: 13, display: "block", marginBottom: 8 }}>
                    Account rules (signup)
                  </Text>
                  <Paragraph style={{ margin: 0, fontSize: 13, color: "rgba(15,23,42,0.78)" }}>
                    <strong style={{ fontWeight: 600 }}>Username:</strong> 1–254 characters; letters,
                    numbers, dots, hyphens, underscores, and @ symbol. Use your email as your username if you prefer.
                  </Paragraph>
                  <Paragraph
                    style={{
                      margin: "8px 0 0",
                      fontSize: 13,
                      color: "rgba(15,23,42,0.78)",
                    }}
                  >
                    <strong style={{ fontWeight: 600 }}>Password:</strong> at least 12 characters;
                    include at least one uppercase letter, one lowercase letter, and one number.
                  </Paragraph>
                </div>
              )}

              {signInType === "Login" && (
                <Text type="secondary" style={{ fontSize: 13, display: "block" }}>
                  Log in with your username and password
                </Text>
              )}

              <Form layout="vertical" requiredMark={false} className="w-full">
                <Form.Item label="Username" style={{ marginBottom: 14 }}>
                  <Input
                    size="large"
                    maxLength={254}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="yourname or your@email.com"
                    autoComplete="username"
                  />
                </Form.Item>

                <Form.Item label="Password" style={{ marginBottom: 18 }}>
                  <Input.Password
                    size="large"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete={
                      signInType === "Login" ? "current-password" : "new-password"
                    }
                  />
                </Form.Item>

                <Form.Item style={{ marginBottom: 10 }}>
                  <Button
                    type="primary"
                    size="large"
                    htmlType="submit"
                    block
                    onClick={handleSubmit}
                    style={{
                      height: 46,
                      borderRadius: 10,
                      fontWeight: 600,
                      boxShadow: `0 10px 24px color-mix(in srgb, ${colorPrimary} 32%, transparent)`,
                    }}
                  >
                    {signInType}
                  </Button>
                </Form.Item>

                <Form.Item style={{ marginBottom: 0, textAlign: "center" }}>
                  <Button
                    type="link"
                    htmlType="button"
                    onClick={() =>
                      setSignInType(signInType === "Login" ? "Sign Up" : "Login")
                    }
                    style={{ fontWeight: 500 }}
                  >
                    {signInText}
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
}
