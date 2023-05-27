import { useState,useEffect } from "react";
import axios from "axios";

export default function AllStudents(){
    let [data,setData]=useState([]);
    useEffect(()=>{
        getAllData();//to get all students data
    },[])
    let getAllData = async()=>{
        await axios.get("https://assign-mentor-be.onrender.com/users/all-students")
        .then((response)=>{
            setData(response.data)
        }).catch((error)=>console.log(error))
    }
    return<>
        <div>
        <h3>Student Details</h3>
            <table className="table table-hover table-bordered border-primary">
                <thead className="table" id="thead">
                    <tr>
                        <th>Student Name</th>
                        <th>Mentor Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((e)=>{
                            return <>
                                <tr key={e}>
                                    <td >{e.studentName}</td>
                                    <td >{e.studentMentor}</td>
                                    
                                </tr>
                            </>
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
}