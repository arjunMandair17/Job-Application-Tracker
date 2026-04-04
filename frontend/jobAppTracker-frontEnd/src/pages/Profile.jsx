import { useParams } from "react-router-dom";
export default function Profile() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<h1 className="text-3xl font-bold">Profile</h1>
            <h3> User ID: {useParams().id} </h3>
		</div>
	);
}
