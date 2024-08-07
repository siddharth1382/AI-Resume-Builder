import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalService from '@/service/GlobalService'
import { Brain, Loader2 } from 'lucide-react'
import { toast } from "sonner";
import { AIchatSession } from '@/service/AI_Model'
/*

[
  {
    "experienceLevel": "Fresher",
    "summary": "Highly motivated and eager to contribute as a full-stack React developer. Possessing a strong foundation in React, JavaScript, and backend technologies, I'm eager to learn and apply my skills to build innovative web applications."
  },
  {
    "experienceLevel": "Mid Level",
    "summary": "Experienced full-stack React developer with a proven track record of delivering high-quality web applications. Proficient in React, Node.js, and SQL databases, I have a strong understanding of both front-end and back-end development principles and practices."
  },
  {
    "experienceLevel": "Experienced",
    "summary": "Seasoned full-stack React developer with extensive experience in building and maintaining complex web applications.  I excel in leading development teams, implementing scalable solutions, and ensuring optimal performance and user experience."
  }
]

*/

const prompt = 'Job Title: {jobTitle}. Depending on job title, give me a profile summary for my resume within 4-5 lines in json format with fields experience level and summary with experience levels : fresher, mid level, experienced. the response should be an array so i can use hte map method.'
function Summary({enableNext}) {

    const {resumeInfo, setResumeInfo}=useContext(ResumeInfoContext)
    const [summary, setSummary] = useState()
    const [loading, setLoading] = useState(false)
    const params = useParams()
    const [aiSummary, setAiSummary] = useState([])

    useEffect(()=>{
        summary && setResumeInfo({
            ...resumeInfo,
            summary:summary
        })
    },[summary])

    const generateSummaryWithAI = async()=>{
      setLoading(true)
      const PROMPT = prompt.replace('{jobTitle}', resumeInfo.jobTitle)
      console.log(PROMPT);
      
      const result = await AIchatSession.sendMessage(PROMPT)
      console.log(JSON.parse(result.response.text()));
      setAiSummary(JSON.parse([result.response.text()]))
      console.log(aiSummary);
      
      setLoading(false)
      
    }

    const onSave =(e)=>{
        e.preventDefault()

        setLoading(true)
        const data = {
          data:{
            summary:summary
          }
        }
    
        GlobalService.updateResumeDetails(params?.resumeId, data).then((resp)=>{
          toast("Summary saved!")
          setLoading(false)
          console.log(resp);
        }, (error)=>{
          setLoading(false)
        })
        
        
        enableNext(true)
    

    }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-orange-600 border-t-4 mt-10">
    <h2 className="font-bold text-lg">Summary</h2>
    <p>Profile Summary for the job role</p>

    <div>

    </div>
        <form className='mt-7' onSubmit={onSave}>
            
            <div className='flex justify-between items-end'>

                <label>Add Summary</label>
                <Button className="border-orange-600 text-orange-600"
                size="sm"
                variant='outline'
                onClick = {generateSummaryWithAI}
                >
                    <Brain/>
                    Generate using AI
                </Button>
            </div>
            <Textarea className='mt-5'
            onChange = {(e)=>setSummary(e.target.value)}
            value={summary}
            />

            <div className='flex mt-2 justify-end'>
                <Button type = 'submit'
                disabled = {loading}
                >
                    {loading? <Loader2 className='animate-spin'/>:"Save"}
                </Button>
            </div>
        </form>

        {aiSummary.length >0 &&
          <div>
           <h2 className='font-bold text-lg'>Sugestions</h2>
           {
            aiSummary.length >0 &&
            aiSummary.map((item, index)=>(
              <div key={index} 
                onClick={()=>setSummary(item?.summary)}
                className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                    <h2 className='font-bold my-1 text-orange-600'>Level: {item?.experienceLevel}</h2>
                    <p>{item?.summary}</p>
                </div>
            ))
           }
          </div>
        }
    </div>
  )
}

export default Summary