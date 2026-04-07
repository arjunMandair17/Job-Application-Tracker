import { useParams } from "react-router-dom";

export default function SingleApp() {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-black">
      <h1 className="text-3xl font-bold">Job Application Details</h1>
      <p>Viewing application ID: {id}</p>
    </div>
  );
}
