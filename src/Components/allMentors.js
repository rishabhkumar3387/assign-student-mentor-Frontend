import {useState,useEffect} from "react";
import axios from "axios";
export default function AllMentors(){
    let [data,setData]=useState([]);
    useEffect(()=>{
        getAlldata();
    },[])
    let getAlldata = async()=>{// to get all mentor data
        await axios.get("https://assign-mentor-be.onrender.com/users/all-mentors")
        .then((response)=>{
            console.log(response)
            setData(response.data.user);
        })
        .catch((error)=>{
            console.log(error);
        })
    }   
    return <>
        <div>
        <h3>Mentor Details</h3>
            <table className="table table-hover table-bordered border-primary">
                <thead className="table" id="thead">
                    <tr>
                        <th>Mentor Name</th>
                        <th>Student Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((e)=>{
                            return <>
                                <tr key={e._id}>
                                    <td >{ e.mentorName }</td>
                                    <td>
                                        <table>
                                            <tbody>
                                                {
                                                    e.mentorStudents.map((f)=>{
                                                        return<tr>{f}</tr>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </>
                        })
                    }
                </tbody>
            </table>
        </div>
    </>
}