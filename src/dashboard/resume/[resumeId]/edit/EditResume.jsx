import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import PreviewSection from '../../components/PreviewSection';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalService from '@/service/GlobalService';

function EditResume() {
    const params= useParams()
    const {resumeId}= useParams()
    const [resumeInfo, setResumeInfo] = useState()

    useEffect(()=>{
        
        getResume()
    },[])

    const getResume = ()=>{
      GlobalService.getResumeById(resumeId).then(resp=>{
        console.log(resp.data.data);
        setResumeInfo(resp.data.data)
        
      })
    }

  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>

      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        {/* Form Section */}
        <FormSection/>

        {/* Preview Section */}
        <PreviewSection/>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume