import { Input } from '@/components/ui/input'
import React, {useContext, useEffect, useState} from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalService from '@/service/GlobalService'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'


function Skills() {

    const [skillSet, setSkillSet] = useState([
        {
            name:'',
            rating:0
        }
    ])

    const {resumeInfo, setResumeInfo}=  useContext(ResumeInfoContext)

const [loading, setLoading] = useState(false)

const params = useParams()

const handleChange= (index, name, value)=>{
    const newEntries = skillSet.slice()
        newEntries[index][name] = value
        setSkillSet(newEntries)
        console.log(skillSet);
}

const addNewSkill= ()=>{
    setSkillSet(
        [
            ...skillSet, {
                name:'',
                rating:0
            }
        ]
    )
}

const removeSkill= ()=>{
    setSkillSet(
        skillSet.slice(0,-1)
    )
}

const onSave = ()=>{
    setLoading(true)
    const data = {
        data:{
            skills: skillSet.map(({id, ...rest})=> rest)
        }
    }

    GlobalService.updateResumeDetails(params.resumeId, data).then((resp)=>{
        console.log(resp);
        setLoading(false)   
        toast('Skills updated!')
    }, (error)=>{
        setLoading(false)  
        toast('Something went wrong! Please try again.')


    })
}

useEffect(()=>{
    setResumeInfo(
        {
            ...resumeInfo,
            skills: skillSet
        }
    )
},[skillSet])

useEffect(()=>{
    skillSet&&setSkillSet(resumeInfo?.skills)
  },[])


  return (
    <div className="p-5 shadow-lg rounded-lg border-t-orange-600 border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your skills </p>

        <div>
            {
                skillSet.map((item, index)=>(
                    <div key={index} className='flex justify-between border rounded-lg p-3 mb-2' >
                        <div>
                            <label className='text-xs'>Name</label>
                            <Input className='w-full'onChange = {(e)=>handleChange(index,'name',e.target.value)}
                             defaultValue = {item?.name}   
                            />

                        </div>

                        <div>
                        <Rating
                        style={{maxWidth:120}} 
                        isRequired value={item.rating} 
                        onChange={(v)=>handleChange(index, 'rating', v)} 
                        defaultValue = {item?.rating}   
                        />
                        </div>
                    </div>
                ))
            }
        </div>

        <div className=' flex justify-between'>
          <div className='flex gap-2'>

            <Button variant = 'outline' 
            className= '' 
            onClick = {addNewSkill}
            >+Add More</Button>

            <Button variant = 'outline' 
            className= 'text-orange-600' 
            onClick = {removeSkill}
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

export default Skills