import React from 'react'

function SummaryPreview({resumeInfo}) {
  return (
    <div className='text-xs'>
    
    {resumeInfo?.summary}
    </div>
  )
}

export default SummaryPreview