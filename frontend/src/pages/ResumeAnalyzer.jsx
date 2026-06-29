import { motion } from "framer-motion";
import {
UploadCloud,
Sparkles,
FileText,
Download,
CheckCircle
} from "lucide-react";

import {useState} from "react";
import jsPDF from "jspdf";
import API from "@/api";



export default function ResumeAnalyzer(){


const [file,setFile]=useState(null);

const [result,setResult]=useState(null);

const [loading,setLoading]=useState(false);





// DOWNLOAD PDF

const downloadReport=()=>{


if(!result) return;



const pdf=new jsPDF();



pdf.setFontSize(18);

pdf.text(
"NextHire AI Resume Analysis Report",
20,
20
);



pdf.setFontSize(12);


pdf.text(
`Resume Score : ${result.score}%`,
20,
45
);



pdf.text(
`Strength : ${result.strength}`,
20,
65
);



pdf.text(
`Improvement : ${result.improvement}`,
20,
85
);



pdf.text(
`Feedback : ${result.feedback}`,
20,
105
);



pdf.save(
"NextHire-AI-Resume-Report.pdf"
);



};








// UPLOAD


const uploadResume=async()=>{


if(!file){

alert("Please select resume PDF");

return;

}



const formData=new FormData();


formData.append(
"file",
file
);



try{


setLoading(true);



const res = await API.post(

"/resume/upload-resume",

formData,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);




const data =

res.data.analysis ||

res.data;




setResult({


score:

data.score ||

data.resume_score ||

0,



strength:

data.strength ||

data.strengths?.[0] ||

"Good technical background",



improvement:

data.improvement ||

data.improvements?.[0] ||

"Improve projects and skills",



feedback:

data.feedback ||

data.career_fit ||

"Resume analyzed successfully"

});



}


catch(err){


console.log(err);


alert(
"Resume analysis failed"
);


}



finally{


setLoading(false);


}



};







return(


<div className="max-w-6xl mx-auto space-y-8">







<motion.div

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

>


<h1 className="text-4xl font-bold text-white">

AI Resume Analyzer ✨

</h1>


<p className="text-slate-400 mt-2">

Get AI powered resume feedback and improve your career profile.

</p>


</motion.div>









<div

className="p-10 rounded-3xl text-center"

style={{

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(139,92,246,.3)"

}}

>



<div

className="mx-auto w-20 h-20 rounded-2xl flex items-center justify-center"

style={{

background:
"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>


<UploadCloud

size={40}

className="text-white"

/>


</div>





<h2 className="text-white text-2xl font-bold mt-5">

Upload Resume

</h2>




<p className="text-slate-400 mt-3">

{

file?

file.name

:

"PDF format supported"

}

</p>






<label

className="inline-block mt-6 px-6 py-3 rounded-xl text-white cursor-pointer"

style={{

background:
"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>


Choose PDF



<input

type="file"

accept=".pdf"

hidden

onChange={(e)=>

setFile(
e.target.files[0]
)

}

/>



</label>







<button

onClick={uploadResume}

className="ml-4 px-6 py-3 rounded-xl text-white"

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




</div>









{

result &&


<div className="space-y-6">





<div className="flex justify-between items-center">


<h2 className="text-3xl font-bold text-white">

AI Resume Insights

</h2>




<button

onClick={downloadReport}

className="flex gap-2 px-5 py-3 rounded-xl text-white"

style={{

background:
"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>


<Download size={18}/>

Download


</button>



</div>









<div className="grid md:grid-cols-3 gap-5">



<Card

title="Resume Score"

value={`${result.score}%`}

/>



<Card

title="Strength"

value={result.strength}

/>



<Card

title="Improvement"

value={result.improvement}

/>



</div>









<div

className="p-8 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)"

}}

>


<h2 className="text-white text-xl font-bold flex gap-2">


<CheckCircle className="text-green-400"/>

AI Feedback


</h2>



<p className="text-slate-300 mt-4">

{result.feedback}

</p>



</div>






</div>



}









<div className="grid md:grid-cols-3 gap-5">


<Card

title="AI Score"

value="Resume Quality"

/>



<Card

title="Recruiter Review"

value="Professional Feedback"

/>



<Card

title="Career Tips"

value="Skill Improvement"

/>




</div>







</div>


)


}






function Card({title,value}){


return(


<div

className="p-6 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(255,255,255,.1)"

}}

>


<p className="text-slate-400">

{title}

</p>


<h2 className="text-white font-bold text-xl mt-3">

{value}

</h2>


</div>


)


}