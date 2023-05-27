import {useState,useEffect} from "react";
import Select from "react-select";
import axios from "axios";

export default function AssignStudents(){
    let [sNames,setsNames]=useState("");
    let [mName,setmName]=useState("");
    let [allMentors,setAllMentors]=useState([]);
    let [res,setRes]=useState("");
    let [options,setOptions]=useState([]);
    useEffect(()=>{
        getAllMentors();
        getAllStudents();
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
    const getAllStudents = async()=>{//get all students
        await axios.get("https://assign-mentor-be.onrender.com/users/all-students")
        .then((response)=>{
            console.log(response)
            response.data.map((e)=>{
                if(!e.studentMentor){
                    options.push({//initialise options for multi select dropdown
                        value:options.length+1,
                        label:e.studentName
                    })
                }
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    const handleEvent =async()=>{//assigning students for selected mentor
        await axios.post("https://assign-mentor-be.onrender.com/users/assign-students",{
            mentorName:mName,
            mentorStudents:sNames
        })
        .then(async(response)=>{
            console.log(response)
            await setRes(response.data.message);
            console.log(response)
            setTimeout(() => {// to refresh after successfull changes
                window.location.reload();
              }, 1000);
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    let UpdateSelected = (e)=>{
        setsNames(Array.isArray(e)?e.map(x=>x.label):[]);//to handle multi select dropdown selected data
    }
    // console.log(data)
    return <>
        <div className="add-wrapper">
        <h3>Assign Students</h3>
        
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
                <label>Students : </label>
                <Select isMulti options={options} className="input" displayValue="Student" onChange={UpdateSelected}/>
            </div>
            <br></br>
            <button className="btn btn-primary" id="but" onClick={handleEvent}>Add</button>
            <div style={{color:"green"}}>{res}</div>
        </div>
    </>
}