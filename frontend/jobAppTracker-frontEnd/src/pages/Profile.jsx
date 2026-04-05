import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function Profile({ isAuth = false, onViewApps = () => {} }) {
    const navigate = useNavigate();

    if(!isAuth) {
        return (
            <>
                <h1 className="!text-black flex items-center justify-center text-3xl font-bold"> 
                    Sign in to view your profile 
                </h1>

                <Button onClick={() => navigate("/login")} className="text-lg font-bold px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 items-center justify-center">
                    Sign In
                </Button>
            </>
        )
    }

	return (
        
		<div className=" !flex !items-center !justify-center !text-3xl !font-bold !flex-col !gap-6 !text-black">
			<h1>Your Name Here</h1>

            <h1>Number of applications: 12</h1>
            

            <Button onClick={() => onViewApps()}>
                View Applications
            </Button>
		</div>
	);
}
