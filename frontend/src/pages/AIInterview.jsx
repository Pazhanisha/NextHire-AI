import { Mic, Sparkles, Play, Brain } from "lucide-react";
import { useState } from "react";
import API from "@/api";


export default function AIInterview(){

const [started,setStarted] = useState(false);

const [role,setRole] = useState("");

const [questions,setQuestions] = useState([]);

const [current,setCurrent] = useState(0);

const [answer,setAnswer] = useState("");

const [listening,setListening] = useState(false);

const [feedback,setFeedback] = useState(null);

const [loading,setLoading] = useState(false);

const [completed,setCompleted] = useState(false);




// START INTERVIEW

const startInterview = async()=>{


if(!role){

alert("Select interview type");

return;

}



try{


const res = await API.post(

"/interview/start",

{

role:role

}

);



const q = res.data.questions

.split("\n")

.filter(q=>q.trim());



setQuestions(q);

setStarted(true);



}

catch(err){

console.log(err);

alert("Interview start failed");

}



};





// VOICE INPUT

const startVoice = ()=>{


const SpeechRecognition =

window.SpeechRecognition ||

window.webkitSpeechRecognition;



if(!SpeechRecognition){

alert("Browser not supported");

return;

}



const recognition = new SpeechRecognition();


recognition.continuous=true;

recognition.interimResults=true;

recognition.lang="en-US";



recognition.onstart=()=>{

setListening(true);

};



recognition.onresult=(event)=>{


let text="";


for(

let i=event.resultIndex;

i<event.results.length;

i++

){


text += event.results[i][0].transcript;


}


setAnswer(text);


};



recognition.onend=()=>{

setListening(false);

};



recognition.start();


};






// ANALYZE ANSWER


const submitAnswer = async()=>{


if(!answer){

alert("Answer first");

return;

}



try{


setLoading(true);



const res = await API.post(

"/interview/analyze",

{

answer:answer,

role:role

}

);



setFeedback(res.data);


}


catch(err){

console.log(err);

alert("AI feedback failed");

}


finally{

setLoading(false);

}



};







// NEXT QUESTION

const nextQuestion = ()=>{


if(current === questions.length-1){


setCompleted(true);

setStarted(false);


return;


}



setCurrent(current+1);

setAnswer("");

setFeedback(null);


};






// SAVE HISTORY


const saveHistory = async()=>{


try{


await API.post(

"/interview/save-history",

{

role:role,

answer:"Interview completed"

}

);


alert("Interview saved");


}


catch(err){

console.log(err);

}


};






return(


<div className="max-w-6xl mx-auto space-y-8">



<h1 className="text-3xl font-bold text-white">

AI Interview Simulator 🎙️

</h1>






{

completed ?


<div className="p-10 rounded-3xl text-center"

style={{

background:"rgba(255,255,255,.05)"

}}

>


<h1 className="text-3xl text-white font-bold">

🎉 Interview Completed

</h1>



<p className="text-slate-400 mt-3">

AI analyzed your performance

</p>




<div className="text-green-400 text-5xl mt-6 font-bold">

{feedback?.score || 85}%

</div>



<button

onClick={saveHistory}

className="mt-6 px-6 py-3 rounded-xl bg-purple-600 text-white"

>

Save Interview Report

</button>



</div>



:

!started ?


<div className="p-8 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)"

}}

>


<div className="flex gap-3 mb-6">

<Brain className="text-purple-400"/>

<h2 className="text-white text-xl font-bold">

Choose Interview

</h2>

</div>




<div className="grid md:grid-cols-3 gap-4">


{

["Technical","HR","Placement"].map(item=>(


<div

key={item}

onClick={()=>setRole(item)}

className="p-5 rounded-xl cursor-pointer text-white"

style={{

background:

role===item

?

"linear-gradient(135deg,#7c3aed,#2563eb)"

:

"rgba(255,255,255,.05)"

}}

>


{item}


</div>


))


}


</div>




<button

onClick={startInterview}

className="mt-8 px-6 py-3 rounded-xl bg-purple-600 text-white flex gap-2"

>


<Play size={18}/>

Start Interview


</button>



</div>






:



<div className="grid md:grid-cols-3 gap-6">



<div className="md:col-span-2 p-8 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)"

}}

>


<h2 className="text-white text-xl font-bold">

<Sparkles className="inline text-purple-400"/>

 AI Interviewer

</h2>




<p className="text-purple-400 mt-5">

Question {current+1}/{questions.length}

</p>



<h2 className="text-white text-xl mt-4">

{questions[current]}

</h2>





<textarea

value={answer}

onChange={(e)=>setAnswer(e.target.value)}

className="mt-6 w-full h-32 rounded-xl p-4 bg-black/30 text-white"

/>





<div className="flex gap-4 mt-5">


<button

onClick={startVoice}

className="px-5 py-3 rounded-xl bg-purple-600 text-white flex gap-2"

>


<Mic/>

{listening?"Listening...":"Speak"}


</button>




<button

onClick={submitAnswer}

className="px-5 py-3 rounded-xl bg-green-600 text-white"

>


{loading?"AI Checking...":"Submit"}


</button>



</div>





{

feedback &&


<button

onClick={nextQuestion}

className="mt-5 px-5 py-3 rounded-xl bg-blue-600 text-white"

>


Next Question →


</button>


}





</div>





<div className="p-6 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)"

}}

>


<h2 className="text-white font-bold">

AI Feedback ✨

</h2>



{

feedback ?

<p className="text-slate-300 mt-5">

📊 {feedback.score}% <br/>

{feedback.feedback}

</p>

:

<p className="text-slate-400 mt-5">

Submit answer to get feedback

</p>


}



</div>




</div>


}



</div>


)

}