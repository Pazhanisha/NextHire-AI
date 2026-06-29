import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Award, MessageSquare } from "lucide-react";
import API from "@/api";


export default function InterviewHistory(){


const [history,setHistory]=useState([]);

const [loading,setLoading]=useState(true);





useEffect(()=>{

loadHistory();

},[]);





const loadHistory = async()=>{


try{


const res = await API.get(

"/interview/history"

);


setHistory(res.data);


}


catch(err){

console.log(err);

}


finally{

setLoading(false);

}


};







if(loading){


return(

<div className="text-white p-8">

Loading interview history...

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

Interview History 🎤

</h1>


<p className="text-slate-400 mt-2">

Track your AI interview performance and improvement

</p>



</motion.div>








{

history.length===0 ?



<div

className="p-10 rounded-3xl text-center"

style={{

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(139,92,246,.2)"

}}

>


<h2 className="text-white text-xl font-bold">

No interviews yet 🚀

</h2>


<p className="text-slate-400 mt-3">

Start your first AI interview and your progress will appear here.

</p>


</div>



:



<div className="grid md:grid-cols-2 gap-6">


{

history.map((item,index)=>(


<motion.div


key={item.id}


initial={{

opacity:0,

y:20

}}


animate={{

opacity:1,

y:0

}}


transition={{

delay:index*0.1

}}



className="p-7 rounded-3xl"


style={{


background:

"linear-gradient(135deg,rgba(124,58,237,.12),rgba(37,99,235,.12))",


border:

"1px solid rgba(139,92,246,.25)"


}}



>





<div className="flex items-center gap-3">


<div className="p-3 rounded-xl bg-purple-600">


<MessageSquare

className="text-white"

/>


</div>




<h2 className="text-white text-xl font-bold">


{item.role} Interview


</h2>



</div>







<div className="flex items-center gap-3 mt-6">


<Award className="text-green-400"/>


<p className="text-green-400 text-3xl font-bold">


{item.score || 0}%


</p>



</div>







<p className="text-slate-300 mt-5">


{item.feedback || "AI feedback unavailable"}


</p>






<div className="flex items-center gap-2 text-slate-400 mt-5 text-sm">


<Clock size={16}/>


{item.created_at || "Recent interview"}



</div>





</motion.div>


))


}



</div>



}



</div>


)

}