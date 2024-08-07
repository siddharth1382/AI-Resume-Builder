import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import PersonalDetailsPreview from './preview/PersonalDetailsPreview'
import SummaryPreview from './preview/SummaryPreview'
import ExperiencePreview from './preview/ExperiencePreview'
import EducationPreview from './preview/EducationPreview'
import SkillsPreview from './preview/SkillsPreview'


function PreviewSection() {

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{borderColor: resumeInfo?.themeColor}}
    >
    {/* Personal Details */}

    <PersonalDetailsPreview  resumeInfo = {resumeInfo}/>

    {/* Summary */}

    <SummaryPreview resumeInfo = {resumeInfo}/>

    {/* Professional Experience */}

    <ExperiencePreview resumeInfo = {resumeInfo}/>

    {/* Education */}

    <EducationPreview resumeInfo={resumeInfo}/>

    {/* Skills */}

    <SkillsPreview resumeInfo={resumeInfo}/>

    </div>
  )
}

export default PreviewSection