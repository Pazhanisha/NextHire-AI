import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FileText } from "lucide-react";


export default function ResumeHistory(){


const [history,setHistory] = useState([]);



useEffect(()=>{

fetchHistory();

},[]);





const fetchHistory = async()=>{


try{


const res = await axios.get(

"http://localhost:8000/resume-history"

);


setHistory(res.data);



}

catch(error){

console.log(error);

}


};





return (


<div className="max-w-6xl mx-auto space-y-8">



<div>


<h1 className="text-3xl font-bold text-white">

Resume History 📄

</h1>


<p className="text-slate-400 mt-2">

Previous AI resume analyses

</p>


</div>






{

history.length === 0 ?



<div

className="p-10 rounded-2xl text-center"

style={{

background:"rgba(255,255,255,0.05)",

border:"1px solid rgba(255,255,255,0.1)"

}}

>


<FileText className="mx-auto text-purple-400 mb-4"/>


<p className="text-slate-400">

No resume analysis found

</p>


</div>




:



history.map((item)=>(


<motion.div


key={item.id}


initial={{opacity:0,y:20}}


animate={{opacity:1,y:0}}



className="p-6 rounded-2xl"


style={{


background:"rgba(255,255,255,0.05)",

border:"1px solid rgba(139,92,246,0.25)"

}}



>



<h2 className="text-white font-bold text-xl mb-4">

Resume Analysis #{item.id}

</h2>





<div className="grid md:grid-cols-3 gap-4">



<Box

title="Resume Score"

value={`${item.analysis?.score || 0}%`}

/>




<Box

title="Strength"

value={item.analysis?.strength || "No data"}

/>




<Box

title="Improvement"

value={item.analysis?.improvement || "No data"}

/>



</div>





<div className="mt-5">


<p className="text-slate-400 text-sm">

AI Feedback

</p>


<p className="text-white mt-2">

{item.analysis?.feedback}

</p>



</div>





</motion.div>



))


}



</div>


)


}






function Box({title,value}){


return(


<div

className="p-4 rounded-xl"

style={{

background:"rgba(255,255,255,0.04)"

}}

>


<p className="text-slate-400 text-sm">

{title}

</p>



<h3 className="text-white text-lg font-bold mt-2">

{value}

</h3>



</div>


)

}