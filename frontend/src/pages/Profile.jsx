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
import API from "@/api";



export default function Profile(){


const [editing,setEditing]=useState(false);

const [skills,setSkills]=useState([]);



const [user,setUser]=useState({

full_name:"",
email:"",
role:"AI Developer",

resume:"Resume Analyzed",

careerScore:78,

interviewScore:82

});






useEffect(()=>{


loadProfile();


},[]);






const loadProfile=async()=>{


try{


// get logged user

const storedUser =
localStorage.getItem("user");



if(storedUser){


const userData =
JSON.parse(storedUser);



setUser(prev=>({

...prev,

full_name:userData.name || userData.full_name,

email:userData.email

}));



}






const res = await API.get(
"/profile/"
);



setUser(prev=>({

...prev,

...res.data

}));



setSkills(

res.data.skills || []

);



}

catch(err){

console.log(err);

}


};









const saveProfile=async()=>{


try{


await API.post(

"/profile/save",

{


full_name:user.full_name,

email:user.email,

role:user.role,

skills:skills

}


);



localStorage.setItem(

"user",

JSON.stringify({

name:user.full_name,

email:user.email

})

);



setEditing(false);



alert(
"Profile updated successfully"
);



}


catch(err){

console.log(err);

alert("Save failed");

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

Profile 👤

</h1>


<p className="text-slate-400 mt-2">

Manage your AI career profile

</p>


</motion.div>










<div

className="p-8 rounded-3xl"

style={{

background:

"linear-gradient(135deg,rgba(124,58,237,.25),rgba(37,99,235,.25))"

}}

>



<div className="flex justify-between items-center">





<div className="flex gap-5 items-center">


<div

className="w-20 h-20 rounded-full flex items-center justify-center"

style={{

background:

"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>

<User

size={40}

className="text-white"

/>


</div>





<div>


<h2 className="text-white text-2xl font-bold">

{user.full_name || "User"}

</h2>



<p className="text-slate-300">

{user.role}

</p>



<div className="flex gap-2 items-center text-slate-400 mt-2">

<Mail size={16}/>

{user.email}


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

className="px-5 py-3 rounded-xl text-white flex gap-2"

style={{

background:"rgba(255,255,255,.1)"

}}

>


<Edit size={18}/>


{

editing

?

"Save"

:

"Edit"

}


</button>






</div>



</div>












{

editing &&



<div

className="p-6 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)"

}}

>



<h2 className="text-white text-xl font-bold mb-5">

Edit Profile

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

/>



</div>



}









<div className="grid md:grid-cols-3 gap-5">



<Card

icon={<FileText/>}

title="Resume"

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



<h2 className="text-white text-2xl font-bold mt-2">

{value}

</h2>



</div>


)

}