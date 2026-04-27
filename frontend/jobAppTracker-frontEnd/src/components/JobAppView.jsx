import { useNavigate } from "react-router-dom";

const JobAppView = ({ item }) => {

    const navigate = useNavigate(); 

  if (!item) {
    return <p>EMPTY</p>
  }

  return (
    
    <div className="!p-4 !border !rounded-lg !shadow-md text-center !text-black cursor-pointer" onClick={() =>navigate(`/jobApps/${item.id}`)}>
        <h2 className="!text-xl !font-bold !text-blue-500">{item.title}</h2>
        <p className="!text-lg">{item.company}</p>
        <p className="!text-sm !text-gray-500">{`Applied on ${item.date_applied}`}</p>
    </div>
  )
};

export default JobAppView;
