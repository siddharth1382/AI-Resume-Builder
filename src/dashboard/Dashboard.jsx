import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalService from "@/service/GlobalService";
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {

  const {user} = useUser()
  const [resumeList, setResumeList] = useState([])
  
  const getResumesList = ()=>{
    
    GlobalService.getUserResumes(user?.primaryEmailAddress?.emailAddress)
    .then( resp =>{
      // console.log('here',resp.data.data);
      setResumeList(resp.data.data)
      console.log("here is the resumelist:", resp.data.data);
    })
  }

  useEffect(()=>{
    user&&getResumesList()
  },[user])

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">Your Resumes</h2>
      <p>Build the perfect resume to ace you next job application </p>
      {/* <p>Start creatnig AI resume to your next job roles </p> */}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
        <AddResume/>

        {
          resumeList.length>0 && resumeList.map((resume, index)=>(
            <ResumeCardItem resume={resume} key={index} refreshData={getResumesList}/>

          ))
        }
      </div>
    </div>
  );
}

export default Dashboard;
