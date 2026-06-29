import { useEffect,useState } from "react";
import { motion } from "framer-motion";


export default function InterviewHistory(){

const [history,setHistory]=useState([]);


useEffect(()=>{

fetch(
"http://localhost:8000/interview/history"
)

.then(res=>res.json())

.then(data=>setHistory(data));


},[]);



return(

<div className="max-w-6xl mx-auto space-y-8">


<h1 className="text-3xl font-bold text-white">

Interview History 📊

</h1>



<div className="grid md:grid-cols-2 gap-5">


{

history.map(item=>(


<motion.div

key={item.id}

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

className="p-6 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(139,92,246,.3)"

}}

>


<h2 className="text-white text-xl font-bold">

{item.role} Interview

</h2>



<p className="text-green-400 text-3xl font-bold mt-4">

{item.score}%

</p>



<p className="text-slate-400 mt-3">

{item.feedback}

</p>


</motion.div>


))

}



</div>


</div>

)


}