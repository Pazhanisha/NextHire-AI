import { motion } from "framer-motion";
import { UploadCloud, Sparkles, FileText, Download } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import jsPDF from "jspdf";


export default function ResumeAnalyzer() {


console.log("RESUME PAGE LOADED");


const [file,setFile] = useState(null);
const [result,setResult] = useState(null);
const [loading,setLoading] = useState(false);





// DOWNLOAD REPORT

const downloadReport = ()=>{


if(!result) return;



const pdf = new jsPDF();



pdf.setFontSize(18);

pdf.text(
"NextHire AI - Resume Analysis Report",
20,
20
);



pdf.setFontSize(12);


pdf.text(
`Resume Score: ${result.score}%`,
20,
40
);



pdf.text(
`Feedback: ${result.feedback}`,
20,
60
);



pdf.text(
`Strength: ${result.strength}`,
20,
80
);



pdf.text(
`Improvement: ${result.improvement}`,
20,
100
);



pdf.save(
"NextHire-AI-Resume-Report.pdf"
);



};







// UPLOAD RESUME


const uploadResume = async()=>{


if(!file){

alert("Please select resume");

return;

}



const formData = new FormData();


formData.append(
"file",
file
);



try{


setLoading(true);



const response = await axios.post(

"http://localhost:8000/resume/upload-resume",

formData,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);



console.log(
"API RESPONSE:",
response.data
);



const data = response.data.analysis || response.data;


setResult({

score: data.score || data.resume_score,

feedback: data.feedback || data.career_fit,

strength: data.strength || data.strengths?.[0],

improvement: data.improvement || data.improvements?.[0]

});


}


catch(error){


console.log(
error.response?.data || error.message
);


alert("Upload failed");


}


finally{


setLoading(false);


}



};







return(


<div className="max-w-6xl mx-auto space-y-8">





<motion.div

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

>


<h1 className="text-3xl font-bold text-white">

AI Resume Analyzer ✨

</h1>


<p className="text-slate-400 mt-2">

Upload your resume and get AI career insights.

</p>


</motion.div>








<motion.div

whileHover={{scale:1.02}}

className="rounded-3xl p-10 flex flex-col items-center text-center"

style={{

background:"rgba(255,255,255,0.05)",

border:"1px solid rgba(139,92,246,.3)"

}}

>




<div

className="w-20 h-20 rounded-2xl flex items-center justify-center"

style={{

background:
"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>


<UploadCloud

className="text-white"

size={40}

/>


</div>






<h2 className="text-white text-xl mt-5">

Upload Resume

</h2>





<p className="text-slate-400 mt-2">

{

file ?

file.name

:

"PDF supported"

}

</p>







<label

className="mt-6 px-6 py-3 rounded-xl text-white cursor-pointer"

style={{

background:
"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>


Choose File



<input

type="file"

accept=".pdf"

className="hidden"

onChange={(e)=>

setFile(
e.target.files[0]
)

}


/>



</label>







<button

onClick={uploadResume}

className="mt-5 px-6 py-3 rounded-xl text-white"

style={{

background:
"linear-gradient(135deg,#10b981,#2563eb)"

}}

>


{

loading

?

"Analyzing..."

:

"Analyze Resume"

}


</button>





</motion.div>









{

result && (


<div className="space-y-6">





<div className="flex justify-between items-center">


<h2 className="text-3xl text-white font-bold">

AI Resume Insights

</h2>





<button

onClick={downloadReport}

className="px-5 py-3 rounded-xl text-white flex gap-2"

style={{

background:
"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>

<Download size={18}/>

Download Report


</button>



</div>









<div className="grid md:grid-cols-3 gap-6">



<div className="p-6 rounded-3xl bg-white/5">

<p className="text-slate-400">

Resume Score

</p>


<h1 className="text-4xl text-green-400 font-bold mt-3">

{result.score}%

</h1>


</div>






<div className="p-6 rounded-3xl bg-white/5">


<p className="text-slate-400">

Strength

</p>


<h2 className="text-white mt-3">

{result.strength}

</h2>


</div>








<div className="p-6 rounded-3xl bg-white/5">


<p className="text-slate-400">

Improvement

</p>


<h2 className="text-white mt-3">

{result.improvement}

</h2>


</div>



</div>









<div className="p-8 rounded-3xl bg-white/5">


<h2 className="text-white font-bold text-xl">

AI Feedback ✨

</h2>



<p className="text-slate-300 mt-4">

{result.feedback}

</p>



</div>







</div>


)


}







<div className="grid md:grid-cols-3 gap-5">


<Card

icon={<Sparkles/>}

title="AI Score"

text="Resume quality analysis"

/>



<Card

icon={<FileText/>}

title="AI Review"

text="Recruiter style feedback"

/>



<Card

icon={<Sparkles/>}

title="Career Tips"

text="Improve your profile"

/>



</div>






</div>


)


}








function Card({icon,title,text}){


return(

<div

className="p-6 rounded-2xl bg-white/5"

>


<div className="text-purple-400 mb-3">

{icon}

</div>


<h3 className="text-white font-semibold">

{title}

</h3>


<p className="text-slate-400 mt-2">

{text}

</p>



</div>


)

}