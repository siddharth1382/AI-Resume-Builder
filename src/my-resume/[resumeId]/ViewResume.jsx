import React, { useEffect, useState } from "react";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import PreviewSection from "@/dashboard/resume/components/PreviewSection";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalService from "@/service/GlobalService";
import { RWebShare } from "react-web-share";


function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    getResumeInfo();
  }, []);

  const getResumeInfo = () => {
    GlobalService.getResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <>
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        <div id="no-print">
          <Header />

          <div className="my-10 mx-10 md:mx-20 lg:mx36">
            <h2 className="text-center text-2xl font-medium">
              {" "}
              Your resume is ready!
            </h2>
            <p className="text-center">
              You can Download and share your resume via link
            </p>

            <div className="flex justify-between px-44 my-10">
              <Button onClick={handleDownload}>Download</Button>
              <RWebShare
                data={{
                  text: "Click the link to access the resume",
                  url: import.meta.env.VITE_BASE_URL + '/my-resume/'+ resumeId+'/view',
                  title: resumeInfo?.firstName + " " + resumeInfo?.lastName + `'s resume`,
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <Button>Share</Button>
              </RWebShare>
            </div>
          </div>
        </div>

        <div id="print-area" className="my-10 mx-10 md:mx-20 lg:mx36">
          <PreviewSection />
        </div>
      </ResumeInfoContext.Provider>
    </>
  );
}

export default ViewResume;
