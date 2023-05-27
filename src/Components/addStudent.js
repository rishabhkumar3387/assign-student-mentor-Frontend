import {useState,useEffect} from "react";
import Select from "react-select";
import axios from "axios";
export default function AddStudent(){
    let [sName,setsName]=useState("");
    let [mName,setmName]=useState([]);
    // let [data,setData]=useState([]);
    let [options,setOptions]=useState([]);
    let [res,setRes]=useState("");
    useEffect(()=>{
        getAllMentors()
    },[])
    //to get all mentors and display in dropdown
    const getAllMentors = async()=>{
        await axios.get("https://assign-mentor-be.onrender.com/users/all-mentors")
        .then((response)=>{
            console.log(response.data)
            response.data.user.map((e)=>{
                //initialise options for multi select dropdown
                if(!e.mentorStudents){
                    options.push({
                        value:options.length+1,
                        label:e.mentorName
                    })
                }
            })
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    // creating student with a mentor or without mentor
    const handleEvent =async()=>{
        await axios.post("https://assign-mentor-be.onrender.com/users/add-student",{
            studentName:sName,
            studentMentor:mName
        })
        .then((response)=>{
            setRes(response.data.message);
            setTimeout(() => {
                window.location.reload();
              }, 1000);
        }).catch((error)=>{
            console.log(error);
        })
    }
     // to handle selected mentor in multi dropdown
     let UpdateSelected = (e)=>{
        setmName(Array.isArray(e)?e.map(x=>x.label):[]);
    }
    
    return <>
        <div className="add-wrapper">
        <h3>Add Student</h3>
            <div className="inputfields">
                <label>Student Name* : </label> <input className="input" type="text" placeholder="Student" required={true} onChange={(e)=>setsName(e.target.value)}></input>
                <label>Mentor Name : </label>
                <Select isMulti options={options} className="input" displayValue="Mentor" onChange={UpdateSelected}/>
            
            </div>
            <br></br>
            <button className="btn btn-primary" id="but" onClick={handleEvent}>Add</button>
            <div style={{color:"green"}}>{res}</div>
        </div>
    </>
}