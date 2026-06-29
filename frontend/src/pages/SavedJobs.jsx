import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Plus,
  Trash2,
  Briefcase
} from "lucide-react";


export default function SavedJobs(){


const [jobs,setJobs]=useState([]);


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


const res=await axios.get(

"http://localhost:8000/jobs/"

);


setJobs(res.data);


}

catch(err){

console.log(err);

}


};







const addJob=async()=>{


try{


await axios.post(

"http://localhost:8000/jobs/add",

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

}


};








const deleteJob=async(id)=>{


await axios.delete(

`http://localhost:8000/jobs/${id}`

);


loadJobs();


};







return(


<div className="max-w-6xl mx-auto space-y-8">





<motion.div

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

>


<h1 className="text-4xl font-bold text-white">

Saved Jobs 💼

</h1>


<p className="text-slate-400 mt-2">

Manage your career opportunities

</p>


</motion.div>










<div

className="p-8 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)"

}}

>



<h2 className="text-white text-xl font-bold mb-5">

Add Job

</h2>



<div className="grid md:grid-cols-4 gap-4">


<input

placeholder="Company"

value={job.company}

onChange={(e)=>

setJob({...job,company:e.target.value})

}

className="p-3 rounded-xl bg-slate-800 text-white"

/>





<input

placeholder="Role"

value={job.role}

onChange={(e)=>

setJob({...job,role:e.target.value})

}

className="p-3 rounded-xl bg-slate-800 text-white"

/>





<input

placeholder="Location"

value={job.location}

onChange={(e)=>

setJob({...job,location:e.target.value})

}

className="p-3 rounded-xl bg-slate-800 text-white"

/>





<button

onClick={addJob}

className="flex items-center justify-center gap-2 rounded-xl text-white"

style={{

background:
"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>


<Plus size={18}/>

Add


</button>


</div>


</div>









<div className="grid md:grid-cols-2 gap-6">


{

jobs.map((item)=>(



<div

key={item.id}

className="p-6 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(255,255,255,.1)"

}}

>



<div className="flex justify-between">



<div className="flex gap-3">


<Briefcase className="text-purple-400"/>


<div>


<h2 className="text-white text-xl font-bold">

{item.role}

</h2>


<p className="text-slate-400">

{item.company}

</p>


<p className="text-slate-500">

{item.location}

</p>


</div>


</div>





<button

onClick={()=>deleteJob(item.id)}

className="text-red-400"

>


<Trash2/>


</button>



</div>


</div>



))


}



{

jobs.length===0 &&

<p className="text-slate-400">

No saved jobs yet

</p>


}


</div>







</div>


)

}