import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Briefcase,
  MapPin,
  Building2
} from "lucide-react";

import API from "@/api";



export default function SavedJobs(){


const [jobs,setJobs]=useState([]);

const [loading,setLoading]=useState(false);


const [job,setJob]=useState({

company:"",
role:"",
location:""

});






useEffect(()=>{

loadJobs();

},[]);








const loadJobs=async()=>{


try{


setLoading(true);


const res = await API.get(

"/jobs/"

);



setJobs(res.data);



}

catch(err){

console.log(err);

}



finally{

setLoading(false);

}



};










const addJob=async()=>{


if(!job.company || !job.role){

alert("Enter company and role");

return;

}



try{


await API.post(

"/jobs/add",

job

);



setJob({

company:"",
role:"",
location:""

});


loadJobs();


}


catch(err){

console.log(err);

alert("Failed to add job");

}



};










const deleteJob=async(id)=>{


try{


await API.delete(

`/jobs/${id}`

);



loadJobs();



}

catch(err){

console.log(err);

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

Saved Jobs 💼

</h1>



<p className="text-slate-400 mt-2">

Track your career opportunities

</p>



</motion.div>












<div

className="p-8 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(255,255,255,.08)"

}}

>


<h2 className="text-white text-xl font-bold mb-6">

Add New Opportunity 🚀

</h2>




<div className="grid md:grid-cols-4 gap-4">





<input

placeholder="Company"

value={job.company}

onChange={(e)=>

setJob({

...job,

company:e.target.value

})

}

className="p-3 rounded-xl bg-slate-900 text-white outline-none"

/>








<input

placeholder="Job Role"

value={job.role}

onChange={(e)=>

setJob({

...job,

role:e.target.value

})

}

className="p-3 rounded-xl bg-slate-900 text-white outline-none"

/>








<input

placeholder="Location"

value={job.location}

onChange={(e)=>

setJob({

...job,

location:e.target.value

})

}

className="p-3 rounded-xl bg-slate-900 text-white outline-none"

/>









<button

onClick={addJob}

className="flex items-center justify-center gap-2 rounded-xl text-white font-semibold"

style={{

background:

"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>


<Plus size={18}/>

Add Job


</button>





</div>


</div>














{

loading ?

<p className="text-white">

Loading jobs...

</p>


:



<div className="grid md:grid-cols-2 gap-6">



{


jobs.map((item)=>(



<motion.div


key={item.id}


initial={{

opacity:0,

scale:.95

}}


animate={{

opacity:1,

scale:1

}}



className="p-6 rounded-3xl"


style={{


background:"rgba(255,255,255,.05)",


border:"1px solid rgba(255,255,255,.1)"


}}



>



<div className="flex justify-between">





<div className="flex gap-4">


<div className="p-3 rounded-xl bg-purple-600">


<Briefcase className="text-white"/>


</div>







<div>



<h2 className="text-white text-xl font-bold">


{item.role}


</h2>





<div className="flex gap-2 text-slate-400 mt-2">


<Building2 size={16}/>


{item.company}



</div>







<div className="flex gap-2 text-slate-500 mt-1">


<MapPin size={16}/>


{item.location || "Remote"}



</div>





</div>




</div>








<button


onClick={()=>deleteJob(item.id)}


className="text-red-400 hover:text-red-300"


>


<Trash2/>


</button>






</div>



</motion.div>



))



}




{


jobs.length===0 &&

<div className="text-slate-400">

No saved jobs yet. Add your first opportunity 🚀

</div>


}



</div>



}







</div>


)


}