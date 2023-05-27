import {Link} from "react-router-dom";
import "../Style/topBar.css"
export default function Topbar(){
    return<>
        <div className="contain">
                <div className="title">
                    <span>Student Mentor Management System</span>
                </div>
                <div className="side-nav">
                        <Link to="/home" className="link">
                            <span className="item"><i className="fas fa-home fa-lg"></i> Home</span>
                        </Link>
                        <Link to="/all-students" className="link">
                            <span className="item"><i className="fas fa-users fa-lg"></i> All Students</span>
                        </Link>
                        <Link to="/all-mentors" className="link">
                            <span className="item"><i className="fas fa-user-tie"></i> All Mentors</span>
                        </Link>
                        

                </div>
        </div>
    </>
}