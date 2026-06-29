import { motion } from "framer-motion";

import {
Brain,
Rocket,
Target,
TrendingUp,
Send,
Sparkles
} from "lucide-react";

import {useState,useEffect} from "react";
import API from "@/api";



export default function CareerMentor(){


const [loading,setLoading]=useState(false);

const [data,setData]=useState(null);

const [message,setMessage]=useState("");

const [chat,setChat]=useState([]);





// GENERATE ROADMAP

const getAdvice = async()=>{


try{

setLoading(true);


const res = await API.post(
"/recommendation/generate"
);


setData(res.data.data);



}

catch(err){

console.log(err);

alert("Recommendation failed");

}


finally{

setLoading(false);

}


};






// CHAT

const sendMessage = async()=>{


if(!message) return;



const userText = message;



setChat(prev=>[

...prev,

{
role:"user",
text:userText
}

]);



setMessage("");



try{


const res = await API.post(

"/mentor/chat",

{

message:userText

}

);



setChat(prev=>[

...prev,

{

role:"ai",

text:res.data.reply

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


<div className="flex gap-4 items-center">


<div className="p-4 rounded-2xl bg-purple-600">

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

className="mt-6 px-8 py-3 rounded-xl text-white flex gap-2"

style={{

background:
"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>


<Sparkles size={18}/>


{

loading

?

"Generating..."

:

"Generate Career Roadmap 🚀"

}



</button>




</div>









{

data &&

<div className="space-y-6">





<div className="grid md:grid-cols-2 gap-5">


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



</div>






<div

className="p-8 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(255,255,255,.1)"

}}

>


<div className="flex gap-3 items-center mb-6">


<Rocket className="text-purple-400"/>


<h2 className="text-white text-2xl font-bold">

AI Career Roadmap 🚀

</h2>


</div>





<div className="space-y-5">


{

data.roadmap

.split("Week")

.filter(Boolean)

.map((item,index)=>(


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

className="p-5 rounded-2xl"

style={{

background:

"linear-gradient(135deg,rgba(124,58,237,.15),rgba(37,99,235,.15))"

}}

>


<h3 className="text-purple-300 font-bold">

Week {index+1}

</h3>



<p className="text-slate-300 mt-2">

{item}

</p>




<div className="h-2 bg-white/10 rounded-full mt-4">


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




</div>


}









<div

className="p-8 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)"

}}

>



<h2 className="text-white text-2xl font-bold mb-5">

💬 Chat With AI Mentor

</h2>




<div className="h-80 overflow-y-auto space-y-4">


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

className="inline-block p-3 rounded-xl text-white"

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







<div className="flex gap-3 mt-5">


<input

value={message}

onChange={(e)=>setMessage(e.target.value)}

placeholder="Ask career question..."

className="flex-1 p-3 rounded-xl bg-white/10 text-white"

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

border:"1px solid rgba(255,255,255,.1)"

}}

>


<div className="text-purple-400">

{icon}

</div>


<p className="text-slate-400 mt-3">

{title}

</p>


<h2 className="text-white font-bold text-xl mt-2">

{value}

</h2>



</div>


)

}