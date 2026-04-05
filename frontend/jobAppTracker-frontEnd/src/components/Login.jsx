import { Form } from "antd";
import { Input } from "antd";
import { Button } from "antd";
import { useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInType, setSignInType] = useState("Login");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();
  let signInText =
    signInType === "Login"
      ? "Don't have an account? Sign Up!"
      : "Already have an account? Login!";

  // function to handle both login and sign up form submissions
  const handleSubmit = async (e) => {
    e.preventDefault();

    // if the user is signing up, check if the password is strong enough
    if (signInType === "Sign Up") {
      const hasUppercase = /[A-Z]/.test(password);
      const hasLowercase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);

      if (!hasUppercase || !hasLowercase || !hasNumber) {
        setPopupMessage(
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number.",
        );
        setPopupOpen(true);
        return;
      }
    }

    // send a request to the backedn to either log in or sign up the user
    const response = await fetch(
      `http://127.0.0.1:3000/auth/${signInType.toLowerCase()}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      },
    );
    const result = await response.json();

    if (response.ok) {
      navigate("/");
      // add a modal that says login successful
      return;
    }

    setPopupMessage(result.message || "Authentication failed");
    setPopupOpen(true);
  };
  return (
    <>
      <Modal
        title="Uh oh!"
        open={popupOpen}
        onOk={() => setPopupOpen(false)}
        onCancel={() => setPopupOpen(false)}
      >
        <p>{popupMessage}</p>
      </Modal>

      <div className="min-h-screen flex flex-col items-center justify-start pt-10 px-4">
        <h1 className="text-3xl font-bold mb-4">{signInType}:</h1>

        <Form className="w-full max-w-lg p-8 rounded-lg shadow-md">
          
          <Form.Item>
            <p className="text-lg text-blue-200 font-bold"> Username </p>
            <Input
              className="!w-full max-w-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <p className="text-lg text-blue-200 font-bold"> Password </p>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="!w-full max-w-md"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              onClick={handleSubmit}
              className="!px-6 !h-12 !text-lg text-white !bg-blue-600 hover:!bg-blue-700"
            >
              {signInType}
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="default"
              htmlType="reset"
              onClick={() =>
                setSignInType(signInType === "Login" ? "Sign Up" : "Login")
              }
              className="text-base px-5 py-2.5 !border-0 !bg-transparent !text-blue-600 hover:!text-blue-700"
            >
              {signInText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
