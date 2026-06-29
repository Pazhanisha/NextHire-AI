import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  Plus,
  Trash2,
  Brain,
  CheckCircle
} from "lucide-react";

import API from "@/api";



export default function SkillTracker(){


const [skills,setSkills]=useState([]);

const [newSkill,setNewSkill]=useState("");

const [level,setLevel]=useState("Beginner");

const [progress,setProgress]=useState(0);





useEffect(()=>{

loadSkills();

},[]);






// LOAD SKILLS

const loadSkills = async()=>{


try{


const res = await API.get(
"/skills/"
);


setSkills(res.data);


}


catch(err){

console.log(err);

}


};









// ADD SKILL

const addSkill = async()=>{


if(!newSkill){

alert("Enter skill name");

return;

}



try{


await API.post(

"/skills/add",

{

name:newSkill,

level,

progress:Number(progress)

}

);



setNewSkill("");

setLevel("Beginner");

setProgress(0);



loadSkills();



}

catch(err){

console.log(err);

alert("Failed to add skill");

}


};








// DELETE SKILL

const deleteSkill = async(id)=>{


try{


await API.delete(

`/skills/${id}`

);



loadSkills();



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

Skill Tracker 📚

</h1>


<p className="text-slate-400 mt-2">

Track your career skill growth

</p>



</motion.div>









{/* ADD SKILL */}



<div

className="p-8 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(255,255,255,.08)"

}}

>


<h2 className="text-white text-xl font-bold mb-6">

Add New Skill

</h2>




<div className="grid md:grid-cols-4 gap-4">





<input

value={newSkill}

onChange={(e)=>
setNewSkill(e.target.value)
}

placeholder="Skill name"

className="p-3 rounded-xl bg-slate-800 text-white"

/>







<select

value={level}

onChange={(e)=>
setLevel(e.target.value)
}

className="p-3 rounded-xl bg-slate-800 text-white"

>


<option>Beginner</option>

<option>Intermediate</option>

<option>Advanced</option>


</select>







<input

type="number"

value={progress}

onChange={(e)=>
setProgress(e.target.value)
}

placeholder="Progress %"

className="p-3 rounded-xl bg-slate-800 text-white"

/>







<button

onClick={addSkill}

className="flex justify-center items-center gap-2 rounded-xl text-white"

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









{/* SKILLS */}



<div className="grid md:grid-cols-2 gap-6">



{

skills.map(skill=>(


<motion.div

key={skill.id}

initial={{
opacity:0,
y:20
}}

animate={{
opacity:1,
y:0
}}

className="p-6 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(255,255,255,.08)"

}}

>





<div className="flex justify-between">





<div className="flex gap-3 items-center">


<div className="text-purple-400">

<Brain/>

</div>




<div>


<h2 className="text-white text-xl font-bold">

{skill.name}

</h2>


<p className="text-slate-400">

{skill.level}

</p>


</div>




</div>







<button

onClick={()=>deleteSkill(skill.id)}

className="text-red-400"

>


<Trash2/>


</button>






</div>








<div className="mt-6">



<div className="h-3 bg-white/10 rounded-full">


<div

className="h-3 rounded-full"

style={{

width:`${skill.progress}%`,

background:

"linear-gradient(90deg,#7c3aed,#2563eb)"

}}

/>


</div>




<p className="text-slate-400 mt-2">

{skill.progress}% completed

</p>



</div>








<div className="mt-4 flex gap-2 items-center text-green-400">


<CheckCircle size={16}/>

Tracked


</div>






</motion.div>



))


}







{

skills.length===0 &&

<p className="text-slate-400">

No skills added yet

</p>


}




</div>







</div>


)

}