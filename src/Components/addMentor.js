import {useState,useEffect} from "react";
import Select from "react-select";
import axios from "axios";
export default function AddMentor(){
    let [mName,setmName]=useState("");
    let [sNames,setsNames]=useState([]);
    let [res,setRes]=useState("");
    let [options,setOptions]=useState([]);
    useEffect(()=>{
        getAllStudents()
    },[])

    // to get the details of all students without mentor
    const getAllStudents = async()=>{
        await axios.get("https://assign-mentor-be.onrender.com/users/all-students")
        .then((response)=>{
            // console.log(response)
            response.data.map((e)=>{
                //initialise options for multi select dropdown
                if(!e.studentMentor){
                    options.push({
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

    // creating mentor with array of students
    const handleEvent =async()=>{
        await axios.post("https://assign-mentor-be.onrender.com/users/add-mentor",{
            mentorName:mName,
            mentorStudents:sNames
        })
        .then(async(response)=>{
            await setRes(response.data.message);
            setTimeout(() => {
                window.location.reload();
              }, 1000);
        }).catch((error)=>{
            console.log(error);
        })
        
    }
    // to handle selected students in multi dropdown
    let UpdateSelected = (e)=>{
        setsNames(Array.isArray(e)?e.map(x=>x.label):[]);
    }
    return <>
        <div className="add-wrapper">
        <h3>Add Mentor</h3>
            <div className="inputfields">
                <label>Mentor Name* : </label> <input className="input" type="text" placeholder="Student" required={true} onChange={(e)=>setmName(e.target.value)}></input>
                <label>Student Name : </label>
                <Select isMulti options={options} className="input" displayValue="Student" onChange={UpdateSelected}/>
            
            </div>
            <br></br>
            <button className="btn btn-primary" id="but" onClick={handleEvent}>Add</button>
            <div style={{color:"green"}}>{res}</div>
        </div>
    </>
}