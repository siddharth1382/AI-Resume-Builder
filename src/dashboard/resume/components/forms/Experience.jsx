import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Loader2 } from 'lucide-react'
import GlobalService from '@/service/GlobalService'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const formField = {
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummary:''
}
 
function Experience() {

  const [loading, setLoading] = useState(false)
  const [experienceList, setExperienceList] = useState([
        formField
  ])

  const params = useParams()

  const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)

   

  const handleChange = (e, index)=>{
    const newEntries = experienceList.slice()
    const {name, value} = e.target
    newEntries[index][name] = value
    setExperienceList(newEntries)
    console.log(experienceList);

  }

  const addNewExperience = ()=>{    
    setExperienceList([...experienceList, formField])    
  }

  const removeExperience = ()=>{

    setExperienceList(experienceList.slice(0,-1))
  }

  const handleRichTextEditor = (e, name, index )=>{
    const newEntries = experienceList.slice()
    newEntries[index][name] = e.target.value
    setExperienceList(newEntries)
    console.log(experienceList);

  }
  useEffect(()=>{
    console.log(experienceList);
    
    setResumeInfo({
      ...resumeInfo,
      experience:experienceList
    })
  }, [experienceList])

  useEffect(()=>{
    resumeInfo&&setExperienceList(resumeInfo?.experience)
  }, [])

  const onSave = ()=>{
    setLoading(true)
    const data = {
        data:{
            experience: experienceList.map(({id, ...rest}) => rest)
        }
    }

    GlobalService.updateResumeDetails(params.resumeId, data).then((resp)=>{
        console.log(resp);
        setLoading(false)   
        toast('Experience details updated!')
    }, (error)=>{
        setLoading(false)  
        toast('Something went wrong! Please try again.')


    })
}

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-orange-600 border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional experience</h2>
        <p>Details about your work experience </p>

        <div>
        {
          experienceList.map((item, index)=>(
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div>
                  <label className='text-xs'>Position Title</label>
                  <Input name='title' onChange={(e)=>handleChange(e, index)}
                    defaultValue= {item?.title}
                  ></Input>
                </div>

                <div>
                  <label className='text-xs'>Company Name</label>
                  <Input name='companyName' onChange={(e)=>handleChange(e, index)}
                    defaultValue= {item?.companyName}
                  ></Input>
                </div>

                <div>
                  <label className='text-xs'>State</label>
                  <Input name='state' onChange={(e)=>handleChange(e, index)}
                    defaultValue= {item?.state}
                  ></Input>
                </div>

                <div>
                  <label className='text-xs'>City</label>
                  <Input name='city' onChange={(e)=>handleChange(e, index)}
                     defaultValue= {item?.city}
                  ></Input>
                </div>

                <div>
                  <label className='text-xs'>Start Date</label>
                  <Input name='startDate' type = 'date'onChange={(e)=>handleChange(e, index)}
                    defaultValue= {item?.startDate}
                  ></Input>
                </div>

                <div>
                  <label className='text-xs'>End Date</label>
                  <Input name='endDate' type = 'date' onChange={(e)=>handleChange(e, index)}
                    defaultValue= {item?.endDate}
                  ></Input>
                </div>
                
                <div className='col-span-2'>
                 {/* Work Summary */}
                 <RichTextEditor 
                 onRichextEditorChange={(e)=>handleRichTextEditor(e, 'workSummary', index)}
                  index={index}
                  defaultValue= {item?.workSummary}
                 />
                </div>

              </div>
            </div>
          ))
        }
        </div>

        <div className=' flex justify-between'>
          <div className='flex gap-2'>

            <Button variant = 'outline' 
            className= 'text-orange-600' 
            onClick = {addNewExperience}
            >+Add More</Button>

            <Button variant = 'outline' 
            className= 'text-orange-600' 
            onClick = {removeExperience}
            >-Remove</Button>
          </div>
          <Button disabled = {loading}
          onClick={()=>onSave()}
            >
            {loading? <Loader2 className='animate-spin'/>:'Save'}
            </Button>
        </div>
    </div>
  )
}

export default Experience