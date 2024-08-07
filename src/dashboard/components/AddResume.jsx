import { Loader2, PlusSquare } from 'lucide-react'
import React from 'react'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid'
import GlobalService from '../../service/GlobalService'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

  

function AddResume() {

    const [openDialog, setOpenDialog] = useState(false)
    const [resumeTitle, setResumeTitle] = useState(false)
    const {user} = useUser()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()

    const onCreate = async()=>{

        setLoading(true)
        const uuid = uuidv4();
        const data = {
            data:{
                title: resumeTitle,
            resumeId:uuid,
            userEmail: user?.primaryEmailAddress?.emailAddress,
            username: user?.fullName
            }
        }
        // console.log('passing ',data);
        GlobalService.createNewResume(data).then(resp=>{
            console.log('here',resp.data.data.documentId);
            if(resp){
                setLoading(false)
                navigation('/dashboard/resume/' +  resp.data.data.documentId + '/edit')
            }
        }, (error)=>{
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('Error request:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error message:', error.message);
            }
            console.error('Error config:', error.config);
            setLoading(false);
        })

    }
  return (
    <div>
    <div className='p-14 py-24 
    border items-center flex justify-center 
    bg-secondary rounded-lg mt-10 h-[280px]
    hover:scale-105 transition-all
    hover: shadow-lg
    hover: cursor-pointer border-dashed'
    onClick={()=>setOpenDialog(true)}
    >
        <PlusSquare/>
    </div>

    <Dialog open = {openDialog}>
  
  <DialogContent>

    <DialogHeader>
      <DialogTitle>Create new resume</DialogTitle>
      <DialogDescription>
      Add a title for your new resume
        <Input 
        className = 'mt-2 mb-2' 
        placeholder='e.g: Backend intern Resume'
        onChange = {(e)=>setResumeTitle(e.target.value)}
        />
      </DialogDescription>
      <div className='flex justify-end gap-5'>
        <Button variant = 'ghost'
        onClick = {()=>setOpenDialog(false)}
        >Cancel</Button>
        <Button onClick={()=>onCreate()}
        disabled = {!resumeTitle || loading}
        >
        {

            loading?<Loader2 className='animate-spin'/> : 'Create'

        }
        </Button>
      </div>
    </DialogHeader>
    
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddResume