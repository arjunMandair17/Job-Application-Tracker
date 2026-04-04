import { useParams } from 'react-router-dom'


const JobAppDetail = () => {
    const { id } = useParams();

    return (
        <div>
            <h1>Job App Detail</h1>
            <p>Job App ID: {id}</p>
        </div>
    )       
}

export default JobAppDetail;