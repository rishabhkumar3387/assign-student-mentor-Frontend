import {useState,useEffect} from "react";
import axios from "axios";
export default function ChangeMentor(){
    let [allMentors,setAllMentors]=useState([]);
    let [allStudents,setAllStudents]=useState([]);
    let [mName,setmName]=useState("");
    let [sName,setsName]=useState("");
    let [res,setRes]=useState("");
    useEffect(()=>{
        getAllMentors();//get all mentor details
        getAllStudents();//get all students details
    },[])
    const getAllMentors = async()=>{
        await axios.get("https://assign-mentor-be.onrender.com/users/all-mentors")
        .then((response)=>{
            setAllMentors(response.data.user);
            // console.log(response)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const getAllStudents = async()=>{
        await axios.get("https://assign-mentor-be.onrender.com/users/all-students")
        .then((response)=>{
            setAllStudents(response.data);
            // console.log(response)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const handleEvent =async()=>{
        let oldMentor=""//to get the old mentor of the selected student. 
        allStudents.map(async(e)=>{
            if(e.studentName===sName)
                oldMentor=(e.studentMentor)
        })
        await axios.post("https://assign-mentor-be.onrender.com/users/change-mentor",{
            mentorName:mName,
            studentName:sName,
            oldMentor:oldMentor,
        })//to modify the mentor
        .then((response)=>{
            setRes(response.data.message);
            setTimeout(() => {//to refresh the page after successfull modifications
                window.location.reload();
              }, 1000);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    return <>
        <div className="add-wrapper">
            <h3>Change Mentor</h3>
            <div className="inputfields">
                <label>Students : </label>
                <select className="input"  onChange={(e)=>setsName(e.target.value)}>
                    <option selected disabled hidden>
                        Select an Option
                    </option>
                    {
                        allStudents.map((e)=>{
                            return <>
                                <option key={e._id}>{e.studentName}</option>
                            </>
                        })
                    }
                </select>
                <label>New Mentor : </label>
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
            <button className="btn btn-primary" id="but" onClick={handleEvent}>Add</button>
            <div style={{color:"green"}}>{res}</div>
        </div>
    </>
}