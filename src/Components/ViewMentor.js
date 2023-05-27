import {useState,useEffect} from "react";

import axios from "axios";
export default function ViewMentor(){// to view the selected mentors student
    let [allMentors,setAllMentors]=useState([]);
    let [mName,setmName]=useState("");
    
    let [students,setStudents]=useState([]);
    let count = 0;
    useEffect(()=>{
        getAllMentors();
    },[])
    const getAllMentors = async()=>{
        await axios.get("https://assign-mentor-be.onrender.com/users/all-mentors")
        .then((response)=>{
            setAllMentors(response.data.user);
            console.log(response.data.user)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const handleEvent = async()=>{// to get the student details of particular mentor
        await axios.post("https://assign-mentor-be.onrender.com/users/students",{
            mentorName:mName
        }).then((response)=>{
            console.log(response.data.mentorStudents)
            setStudents(response.data.mentorStudents);
        }).catch((error)=>{
            console.log(error);
        })
    }
    return <>
        <div className="add-wrapper">
        <h3>View Mentor Students</h3>
            <div className="inputfields">
            <label>Mentor Name : </label>
            <select className="input" onChange={(e)=>setmName(e.target.value)}>
                    <option selected disabled hidden>
                        Select an Option
                    </option>
                    {
                        allMentors.map((e)=>{
                            return <>
                                <option key={e._id}>{e.mentorName}</option>
                            </>
                        })
                    }
                </select>
            </div>
            <br></br>
            <button className="btn btn-primary" id="but" onClick={handleEvent}>View</button>
            <h3> Students Mapped to Mentor {mName} are:</h3>
            {   
                students.map((e)=>{
                    count=count+1;// to give s.no for each students
                    return <h4 key={e._id}>{count}.{e}</h4>
                })
            }
        </div>
    </>
}