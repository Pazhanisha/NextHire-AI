import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import {
  FileText,
  Mic,
  Brain,
  Target,
  Briefcase,
  BookOpen
} from "lucide-react";



export default function Analytics(){


const [data,setData]=useState(null);



useEffect(()=>{

loadAnalytics();

},[]);





const loadAnalytics=async()=>{


try{


const res = await axios.get(

"http://localhost:8000/analytics/"

);


setData(res.data);


}

catch(err){

console.log(err);

}


};





if(!data){

return(

<div className="text-white p-8">

Loading analytics...

</div>

)

}






return(


<div className="max-w-6xl mx-auto space-y-8">





<motion.div

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

>


<h1 className="text-4xl font-bold text-white">

Career Analytics 📊

</h1>


<p className="text-slate-400 mt-2">

Your AI career growth overview

</p>


</motion.div>








<div className="grid md:grid-cols-3 gap-6">



<Card

icon={<FileText/>}

title="Resume Analyzed"

value={data.resumeAnalyzed}

/>




<Card

icon={<Mic/>}

title="Interviews"

value={data.interviews}

/>





<Card

icon={<Brain/>}

title="Skills"

value={data.skills}

/>




<Card

icon={<Briefcase/>}

title="Saved Jobs"

value={data.savedJobs}

/>





<Card

icon={<Target/>}

title="Interview Score"

value={`${data.averageInterviewScore}%`}

/>





<Card

icon={<BookOpen/>}

title="Career Score"

value={`${data.careerScore}%`}

/>



</div>









<div

className="p-8 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)"

}}

>



<h2 className="text-white text-2xl font-bold">

Career Progress 🚀

</h2>





<div className="mt-6 h-4 bg-white/10 rounded-full">


<div

className="h-4 rounded-full"

style={{

width:`${data.careerScore}%`,

background:
"linear-gradient(90deg,#7c3aed,#2563eb)"

}}


/>


</div>



<p className="text-slate-400 mt-3">

Keep improving your skills and interview performance.

</p>



</div>







</div>


)

}







function Card({icon,title,value}){


return(


<div

className="p-6 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(255,255,255,.1)"

}}

>



<div className="text-purple-400">

{icon}

</div>




<p className="text-slate-400 mt-4">

{title}

</p>




<h2 className="text-white text-3xl font-bold mt-2">

{value}

</h2>



</div>


)

}