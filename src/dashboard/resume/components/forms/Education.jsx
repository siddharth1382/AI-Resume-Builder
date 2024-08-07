import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useContext } from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalService from '@/service/GlobalService'
import { toast } from 'sonner'


function Education() {

    const [loading, setLoading] = useState(false)
    const params = useParams()
    console.log('params:',params);
    

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

    const [educationList, setEducationList] = useState([
        {
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:''
        }
    ])

    const handleChange = (e, index)=>{
        const newEntries = educationList.slice()
        const {name, value} = e.target
        newEntries[index][name] = value
        setEducationList(newEntries)
        console.log(educationList);

    }

    const addNewEducation = ()=>{
        setEducationList([...educationList,{
            universityName:'',
            degree:'',
            major:'',
            startDate:'',
            endDate:'',
            description:''
        }])
    }

    const removeEducation = ()=>{
        setEducationList(educationList.slice(0,-1))

    }

    const onSave = ()=>{
        setLoading(true)
        const data = {
            data:{
                education: educationList.map(({id, ...rest}) => rest)
            }
        }

        GlobalService.updateResumeDetails(params.resumeId, data).then((resp)=>{
            console.log(resp);
            setLoading(false)   
            toast('Education details updated!')
        }, (error)=>{
            setLoading(false)  
            toast('Something went wrong! Please try again.')
 

        })
    }

    useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            education: educationList
        })
    }, [educationList])

    useEffect(()=>{
        resumeInfo&&setEducationList(resumeInfo?.education)
      },[])

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-orange-600 border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Details about your academics </p>

        <div>
            {
                educationList.map((item,index)=>(
                    <div key={index}>
                        <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                            <div className='col-span-2'>
                                <label>University name</label>
                                <Input name='universityName' onChange = {(e)=>handleChange(e,index)}
                                    defaultValue ={item?.universityName}
                                />
                            </div>

                            <div>
                                <label>Degree</label>
                                <Input name='degree' onChange = {(e)=>handleChange(e,index)}
                                    defaultValue ={item?.degree}
                                />
                            </div>

                            <div>
                                <label>Major</label>
                                <Input name='major' onChange = {(e)=>handleChange(e,index)}
                                    defaultValue ={item?.major}
                                />
                            </div>

                            <div>
                                <label>Start date</label>
                                <Input name='startDate' type='date' onChange = {(e)=>handleChange(e,index)}
                                    defaultValue ={item?.startDate}
                                />
                            </div>

                            <div>
                                <label>End date</label>
                                <Input name='endDate' type='date' onChange = {(e)=>handleChange(e,index)}
                                    defaultValue ={item?.endDate}
                                />
                            </div>

                            <div className='col-span-2'>
                                <label>Description</label>
                                <Textarea className='col-span-2' name='description' onChange = {(e)=>handleChange(e,index)}
                                    defaultValue ={item?.description}
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
            onClick = {addNewEducation}
            >+Add More</Button>

            <Button variant = 'outline' 
            className= 'text-orange-600' 
            onClick = {removeEducation}
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

export default Education