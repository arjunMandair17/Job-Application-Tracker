import { useNavigate } from "react-router-dom";

const JobAppView = ({ item }) => {

    const navigate = useNavigate(); 

  if (!item) {
    return <p>EMPTY</p>
  }

  return (
    
    <div className="!p-4 !border !rounded-lg !shadow-md text-center !text-black" onClick={() =>navigate(`/jobApps/${item.id}`)}>
        <h2>{item.title}</h2>
        <p>{item.company}</p>
        <p className="!text-sm !text-gray-500">{`Applied on ${item.date_applied}`}</p>
    </div>
  )
};

export default JobAppView;
