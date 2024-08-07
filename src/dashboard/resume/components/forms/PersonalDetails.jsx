import React from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import GlobalService from "@/service/GlobalService";
import {  Loader2 } from "lucide-react";
import { toast } from "sonner";

function PersonalDetails({enableNext}) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const params = useParams()

  const [formData, setFormData] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    console.log('params:',params);
  },[])
  
  const handleInputChange = (e) => {
    enableNext(false)
    const {name, value} = e.target

    setFormData({
      ...formData,
      [name]:value
    })

    setResumeInfo({
        ...resumeInfo,
        [name]:value
    })
    
  };

  const onSave = (e)=>{
    e.preventDefault()

    setLoading(true)
    const data = {
      data:formData
    }

    GlobalService.updateResumeDetails(params?.resumeId, data).then((resp)=>{
      toast("Details saved!")
      setLoading(false)
      console.log(resp);
    }, (error)=>{
      setLoading(false)
    })
    
    
    enableNext(true)

  }
  return (
    <div className="p-5 shadow-lg rounded-lg border-t-orange-600 border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Basic info about you</p>

      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName" required onChange={handleInputChange} 
              defaultValue = {resumeInfo?.firstName}
            />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" required onChange={handleInputChange} 
              defaultValue = {resumeInfo?.lastName}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input name="jobTitle" required onChange={handleInputChange} 
              defaultValue = {resumeInfo?.jobTitle}
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input name="address" required onChange={handleInputChange} 
              defaultValue = {resumeInfo?.address}
            />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" required onChange={handleInputChange} 
              defaultValue = {resumeInfo?.phone}
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input name="email" required onChange={handleInputChange} 
              defaultValue = {resumeInfo?.email}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
            <Button type='submit'
            disabled ={loading}
            >
            {loading?<Loader2 className='animate-spin'/>:'Save'}
                
            </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;
