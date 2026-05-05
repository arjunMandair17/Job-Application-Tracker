import AppRoutes from "./Routes";
import "antd/dist/reset.css";
import {GoogleOAuthProvider} from "@react-oauth/google";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;



function App() {
  return (
    <>
      <GoogleOAuthProvider clientId={googleClientId}>
        <AppRoutes />
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
