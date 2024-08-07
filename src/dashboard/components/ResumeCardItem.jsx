import { MoreVertical, FileText } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import GlobalService from "@/service/GlobalService";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";



function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const onDelete = ()=>{
    setLoading(true)
    GlobalService.deleteResumeById(resume.documentId).then(resp=>{
      console.log(resp);
      toast('Resume Deleted!')
      refreshData()
      setLoading(false)
      setOpenAlert(false)
      
    },(error)=>{
      setLoading(false)
    })
  }

  return (
    <>
    <div className="relative p-6 
      bg-secondary 
      mt-10
      h-[280px]
      rounded-lg
      border
      border-orange-600
      hover:scale-105 
      transition-all
      hover:shadow-lg
      
      flex 
      flex-col
      justify-center
      items-center">
      
      <Link to={"/dashboard/resume/" + resume.documentId + "/edit"} className="flex flex-col items-center cursor-pointer ">
        <FileText className="h-12 w-12 mb-4" />
        <h2 className="text-center text-lg font-semibold">{resume.title}</h2>
      </Link>

      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className="h-6 w-6 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigation("/dashboard/resume/" + resume.documentId + "/edit")}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation("/my-resume/" + resume.documentId + "/view")}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigation("/my-resume/" + resume.documentId + "/view")}>
              Download
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    <AlertDialog open={openAlert}>
  
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete this resume of yours.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={onDelete} disabled={loading}>{loading? <Loader2 className='animate-spin'/>:'Delete'}</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </>
  );
}

export default ResumeCardItem;
