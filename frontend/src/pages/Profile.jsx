import {
User,
Mail,
FileText,
Brain,
Target,
Edit,
CheckCircle
} from "lucide-react";

import {motion} from "framer-motion";
import {useState,useEffect} from "react";
import axios from "axios";


export default function Profile(){


const [editing,setEditing] = useState(false);


const [user,setUser] = useState({

full_name:"",
email:"",
role:"AI Developer",

resume:"Resume Analyzed",

careerScore:78,

interviewScore:82

});


const [skills,setSkills] = useState([]);



useEffect(()=>{

loadProfile();

},[]);





const loadProfile = async()=>{


try{


const res = await axios.get(

"http://localhost:8000/profile/"

);



if(res.data.full_name){


setUser({

...user,

...res.data

});


setSkills(

res.data.skills || []

);


}


}

catch(err){

console.log(err);

}


}





const saveProfile = async()=>{


try{


await axios.post(

"http://localhost:8000/profile/save",

{


full_name:user.full_name,

email:user.email,

role:user.role,

skills:skills


}

);



setEditing(false);


alert("Profile saved successfully");


}

catch(err){

console.log(err);

alert("Save failed");

}


}





return(


<div className="max-w-6xl mx-auto space-y-8">



<motion.div

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

>


<h1 className="text-4xl font-bold text-white">

Profile 👤

</h1>


<p className="text-slate-400 mt-2">

Manage your AI career profile

</p>


</motion.div>







{/* HEADER */}



<div

className="p-8 rounded-3xl"

style={{

background:

"linear-gradient(135deg,rgba(124,58,237,.25),rgba(37,99,235,.25))"

}}

>


<div className="flex items-center justify-between">


<div className="flex items-center gap-5">


<div

className="w-20 h-20 rounded-full flex items-center justify-center"

style={{

background:

"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>


<User

className="text-white"

size={40}

/>


</div>





<div>


<h2 className="text-2xl font-bold text-white">

{user.full_name || "Your Name"}

</h2>


<p className="text-slate-300">

{user.role}

</p>


<div className="flex items-center gap-2 text-slate-400 mt-2">


<Mail size={16}/>

{user.email || "Email"}


</div>


</div>


</div>







<button


onClick={()=>{


editing

?

saveProfile()

:

setEditing(true)


}}


className="flex gap-2 items-center px-5 py-3 rounded-xl text-white"


style={{

background:"rgba(255,255,255,.1)"

}}

>


<Edit size={18}/>


{

editing

?

"Save Profile"

:

"Edit Profile"


}


</button>



</div>


</div>







{

editing && (


<div

className="p-6 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)"

}}

>


<h2 className="text-white text-xl font-bold mb-4">

Edit Information

</h2>




<input


value={user.full_name}


onChange={(e)=>

setUser({

...user,

full_name:e.target.value

})

}


className="w-full p-3 rounded-xl bg-white/10 text-white mb-3"


placeholder="Name"

/>






<input


value={user.email}


onChange={(e)=>

setUser({

...user,

email:e.target.value

})

}


className="w-full p-3 rounded-xl bg-white/10 text-white mb-3"


placeholder="Email"

/>






<input


value={user.role}


onChange={(e)=>

setUser({

...user,

role:e.target.value

})

}


className="w-full p-3 rounded-xl bg-white/10 text-white"


placeholder="Role"

/>



</div>


)

}









{/* STATS */}



<div className="grid md:grid-cols-3 gap-6">



<Card

icon={<FileText/>}

title="Resume Status"

value={user.resume}

/>



<Card

icon={<Brain/>}

title="Interview Score"

value={`${user.interviewScore}%`}

/>



<Card

icon={<Target/>}

title="Career Score"

value={`${user.careerScore}%`}

/>



</div>









{/* SKILLS */}



<div

className="p-8 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)"

}}

>



<h2 className="text-white text-xl font-bold">

Technical Skills 💻

</h2>



<div className="flex flex-wrap gap-3 mt-5">


{


skills.map((skill,index)=>(


<span

key={index}

className="px-4 py-2 rounded-xl text-purple-200"


style={{

background:"rgba(124,58,237,.2)"

}}

>


<CheckCircle

size={14}

className="inline mr-2"

/>


{skill}


</span>


))


}



</div>



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



<h2 className="text-white text-xl font-bold mt-2">

{value}

</h2>


</div>


)


}