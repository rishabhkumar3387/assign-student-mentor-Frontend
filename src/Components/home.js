import "../Style/home.css";
import {Link} from "react-router-dom";
export default function Home(){
    return <>
    <div className="wrapper">
    <h3 style={{textAlign:"center"}}>Home</h3>
        <div className="elements">
            <Link to="/add-student">
                <button className="btn btn-primary">Add Student</button>
            </Link>
            <Link to="/add-mentor">
                <button className="btn btn-primary">Add Mentor</button>
            </Link>
            <Link to="/assign-students">
                <button className="btn btn-primary">Assign Students</button>
            </Link>
            <Link to="/change-mentor">
                <button className="btn btn-primary">Change Mentor</button>
            </Link>
            <Link to="/view-mentor">
                <button className="btn btn-primary">View Mentor</button>
            </Link>
        </div>
    </div>
    </>
}