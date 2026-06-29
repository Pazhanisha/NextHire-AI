import { motion } from "framer-motion";

import {
  Brain,
  Rocket,
  Target,
  TrendingUp,
  Send,
  Sparkles
}from "lucide-react";

import { useState, useEffect } from "react";
import axios from "axios";



export default function CareerMentor(){


const [loading,setLoading] = useState(false);

const [data,setData] = useState(null);


const [message,setMessage] = useState("");

const [chat,setChat] = useState([]);
const [user,setUser] = useState(null);

const [skills,setSkills] = useState([]);
const [resumeData,setResumeData] = useState({});

const [interviewScore,setInterviewScore] = useState(0);
useEffect(()=>{


const storedUser = localStorage.getItem("user");


if(storedUser){

setUser(
JSON.parse(storedUser)
);

}



loadUserData();


},[]);




const loadUserData = async()=>{


try{


// get skills

const skillRes = await axios.get(

"http://localhost:8000/skills/"

);


setSkills(

skillRes.data.map(

(s)=>s.name

)

);





// get interview history

const interviewRes = await axios.get(

"http://localhost:8000/interview/history"

);



if(interviewRes.data.length > 0){


const latest =

interviewRes.data[

interviewRes.data.length-1

];



setInterviewScore(

latest.score

);


}




}

catch(err){

console.log(err);

}


};





// AI CAREER RECOMMENDATION

const getAdvice = async()=>{


setLoading(true);


try{


const res = await fetch(

"http://localhost:8000/recommendation/generate",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


}

);



const result = await res.json();


setData(result.data);



}

catch(err){

console.log(err);

alert("Recommendation failed");

}


setLoading(false);


};






// AI CHAT

const sendMessage = async()=>{


if(!message) return;



setChat(prev=>[

...prev,

{

role:"user",

text:message

}

]);



const userMessage = message;


setMessage("");



try{


const res = await fetch(

"http://localhost:8000/mentor/chat",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

message:userMessage

})

}

);
const resumeRes = await axios.get(

"http://localhost:8000/resume/history"

);


if(resumeRes.data.length > 0){


const latestResume =

resumeRes.data[

resumeRes.data.length - 1

];



setResumeData(

latestResume

);


}



const result = await res.json();



setChat(prev=>[

...prev,

{

role:"ai",

text:result.reply

}

]);



}

catch(err){

console.log(err);

}



};






return(


<div className="max-w-6xl mx-auto space-y-8">





<motion.div

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

>


<h1 className="text-4xl font-bold text-white">

AI Career Mentor ✨

</h1>


<p className="text-slate-400 mt-2">

Your personal AI career coach

</p>


</motion.div>








<div

className="p-8 rounded-3xl"

style={{

background:
"linear-gradient(135deg,rgba(124,58,237,.25),rgba(37,99,235,.25))"

}}

>


<div className="flex items-center gap-4">


<div className="p-4 bg-purple-600 rounded-2xl">

<Brain className="text-white"/>

</div>


<div>

<h2 className="text-white text-2xl font-bold">

NextHire AI Mentor

</h2>


<p className="text-green-400">

● Online

</p>


</div>


</div>




<button

onClick={getAdvice}

className="mt-6 px-8 py-3 rounded-xl text-white flex gap-2 items-center"

style={{

background:
"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>


<Sparkles size={18}/>


{

loading

?

"Analyzing..."

:

"Generate Career Plan 🚀"

}


</button>



</div>









{

data &&


<div className="grid md:grid-cols-3 gap-6">



<Card

icon={<Target/>}

title="Recommended Role"

value={data.recommended_role}

/>





<Card

icon={<TrendingUp/>}

title="Skill Gap"

value={data.skill_gap}

/>





<Roadmap roadmap={data.roadmap}/>


</div>



}









{/* AI CHAT */}



<div

className="p-8 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(255,255,255,.08)"

}}

>


<h2 className="text-white text-2xl font-bold mb-5">

💬 Chat With AI Mentor

</h2>





<div className="h-80 overflow-y-auto space-y-4 mb-5">


{

chat.map((c,i)=>(


<div

key={i}

className={

c.role==="user"

?

"text-right"

:

"text-left"

}

>


<span

className="inline-block px-4 py-3 rounded-xl text-white"

style={{


background:


c.role==="user"

?

"rgba(37,99,235,.5)"

:

"rgba(124,58,237,.5)"


}}

>


{c.text}


</span>



</div>


))


}



</div>







<div className="flex gap-3">


<input


value={message}


onChange={(e)=>

setMessage(e.target.value)

}


placeholder="Ask your career question..."


className="flex-1 p-3 rounded-xl bg-white/10 text-white outline-none"



/>




<button

onClick={sendMessage}

className="px-5 rounded-xl text-white"

style={{

background:
"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>


<Send/>


</button>



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

border:"1px solid rgba(255,255,255,.08)"

}}

>


<div className="text-purple-400">

{icon}

</div>


<p className="text-slate-400 mt-3">

{title}

</p>


<h2 className="text-white text-xl font-bold mt-2">

{value}

</h2>



</div>


)


}
function Roadmap({roadmap}){


const weeks = roadmap
.split("Week")
.filter(Boolean)
.map(item=>"Week"+item);



return(

<div

className="p-6 rounded-3xl md:col-span-3"

style={{

background:"rgba(255,255,255,0.05)",

border:"1px solid rgba(255,255,255,0.1)"

}}

>


<div className="flex items-center gap-3 mb-6">


<div className="p-3 rounded-xl bg-purple-600">

<Rocket className="text-white"/>

</div>


<h2 className="text-white text-2xl font-bold">

AI Career Roadmap 🚀

</h2>


</div>





<div className="space-y-4">


{

weeks.map((week,index)=>(


<motion.div

key={index}

initial={{
opacity:0,
x:-20
}}

animate={{
opacity:1,
x:0
}}

transition={{
delay:index*0.1
}}

className="p-5 rounded-2xl"

style={{

background:

"linear-gradient(135deg,rgba(124,58,237,.15),rgba(37,99,235,.15))",

border:

"1px solid rgba(139,92,246,.25)"

}}

>


<h3 className="text-purple-300 font-bold text-lg">

{week.split(":")[0]}

</h3>


<p className="text-slate-300 mt-2">

{week.split(":")[1]}

</p>


<div className="mt-4 h-2 rounded-full bg-white/10">


<div

className="h-2 rounded-full"

style={{

width:`${(index+1)*25}%`,

background:

"linear-gradient(90deg,#7c3aed,#2563eb)"

}}


/>


</div>



</motion.div>


))


}


</div>


</div>


)

}