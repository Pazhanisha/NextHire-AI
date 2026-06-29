import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, Sparkles } from "lucide-react";
import API from "@/api";


export default function ResumeHistory(){


const [history,setHistory]=useState([]);

const [loading,setLoading]=useState(true);





useEffect(()=>{

fetchHistory();

},[]);







const fetchHistory = async()=>{


try{


const res = await API.get(

"/resume/history"

);


setHistory(res.data);



}


catch(error){

console.log(error);

}


finally{

setLoading(false);

}



};








if(loading){


return(

<div className="text-white p-8">

Loading resume history...

</div>

)

}





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

Resume History 📄

</h1>


<p className="text-slate-400 mt-2">

Your previous AI resume analysis reports

</p>


</motion.div>









{

history.length===0 ?



<div

className="p-10 rounded-3xl text-center"

style={{

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(255,255,255,.1)"

}}

>


<FileText

size={45}

className="mx-auto text-purple-400 mb-4"

/>


<p className="text-slate-400">

No resume analysis available yet

</p>


</div>





:

<div className="space-y-6">


{

history.map((item,index)=>(



<motion.div


key={item.id || index}


initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}



className="p-8 rounded-3xl"


style={{


background:"rgba(255,255,255,.05)",

border:"1px solid rgba(139,92,246,.25)"


}}



>




<div className="flex justify-between items-center mb-6">


<h2 className="text-white text-xl font-bold">


Resume Analysis #{index+1}


</h2>




<div className="flex gap-2 text-slate-400 text-sm">


<Calendar size={16}/>


{item.created_at || "Recent"}


</div>



</div>








<div className="grid md:grid-cols-3 gap-5">



<Card

title="Resume Score"

value={`${item.analysis?.score || item.score || 0}%`}

/>




<Card

title="Strength"

value={
item.analysis?.strength ||
"Good profile foundation"
}

/>




<Card

title="Improvement"

value={
item.analysis?.improvement ||
"Keep improving skills"
}

/>




</div>







<div className="mt-6">


<div className="flex items-center gap-2 text-purple-400">

<Sparkles size={18}/>

<p>

AI Feedback

</p>

</div>




<p className="text-white mt-3">

{

item.analysis?.feedback ||

"No feedback available"

}


</p>



</div>






</motion.div>



))


}



</div>



}



</div>


)

}









function Card({title,value}){


return(


<div

className="p-5 rounded-2xl"

style={{

background:"rgba(255,255,255,.04)",

border:"1px solid rgba(255,255,255,.08)"

}}

>


<p className="text-slate-400 text-sm">

{title}

</p>



<h3 className="text-white font-bold mt-3">

{value}

</h3>



</div>


)


}