import { Mic, Sparkles, Play, Brain } from "lucide-react";
import { useState } from "react";


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


const res = await fetch(

"http://localhost:8000/interview/start",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
role
})

}

);


const data = await res.json();


const q = data.questions
.split("\n")
.filter(q=>q.trim());


setQuestions(q);

setStarted(true);


};




// VOICE

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





// SUBMIT ANSWER

const submitAnswer = async()=>{


if(!answer){

alert("Answer first");

return;

}


try{


setLoading(true);



const res = await fetch(

"http://localhost:8000/interview/analyze",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

answer,

role

})

}

);



const data = await res.json();


setFeedback(data);


}


catch(error){

console.log(error);

alert("AI feedback failed");


}

finally{

setLoading(false);

}


};







// NEXT / FINISH

const nextQuestion = ()=>{

if(current === questions.length - 1){

  setCompleted(true);
  setStarted(false);

  return;

}


setCurrent(prev=>prev+1);

setAnswer("");

setFeedback(null);

};





return(


<div className="max-w-6xl mx-auto space-y-8">


<h1 className="text-3xl font-bold text-white">

AI Interview Simulator 🎙️

</h1>



{
completed ?

<div

className="p-10 rounded-3xl text-center"

style={{
background:"rgba(255,255,255,.05)",
border:"1px solid rgba(139,92,246,.3)"
}}

>

<h1 className="text-3xl text-white font-bold">

🎉 Interview Completed

</h1>


<p className="text-slate-400 mt-3">

AI has analyzed your interview performance

</p>


<div className="text-green-400 text-5xl font-bold mt-6">

{feedback?.score || 85}%

</div>



<button

onClick={async()=>{


await fetch(

"http://localhost:8000/interview/save-history",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

role,

answer:"Interview completed"

})

}

);


alert("Interview saved successfully");


}}

className="mt-6 px-6 py-3 rounded-xl bg-purple-600 text-white"

>

Save Interview Report

</button>


</div>



:

!started ?



<div

className="p-8 rounded-3xl"

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




<div className="grid md:grid-3 gap-4">


{

["Technical","HR","Placement"].map(item=>(


<div

key={item}

onClick={()=>setRole(item)}

className="p-5 rounded-xl cursor-pointer"

style={{

background:

role===item

?

"linear-gradient(135deg,#7c3aed,#2563eb)"

:

"rgba(255,255,255,.05)"

}}

>


<p className="text-white">

{item}

</p>


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



<div

className="md:col-span-2 p-8 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)"

}}

>



<h2 className="text-white font-bold text-xl">

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

{

listening

?

"Listening..."

:

"Speak"

}


</button>




<button

onClick={submitAnswer}

className="px-5 py-3 rounded-xl bg-green-600 text-white"

>


{

loading

?

"AI Checking..."

:

"Submit"

}


</button>


</div>




{

feedback &&

<button

onClick={nextQuestion}

className="mt-5 px-5 py-3 rounded-xl bg-blue-600 text-white"

>


{

current === questions.length-1

?

"Finish Interview 🎉"

:

"Next Question →"

}


</button>


}




</div>






<div

className="p-6 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)"

}}

>


<h2 className="text-white font-bold">

AI Feedback ✨

</h2>



{

feedback ?

<div className="mt-5 text-slate-300">


<p>

📊 Score:

<span className="text-green-400 font-bold ml-2">

{feedback.score}%

</span>


</p>


<p className="mt-3">

✨ {feedback.feedback}

</p>


</div>


:

<p className="text-slate-400 mt-5">

Submit answer to get feedback

</p>


}



</div>



</div>


}



{

completed &&


<div

className="p-10 rounded-3xl text-center"

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



<button

onClick={async()=>{


await fetch(

"http://localhost:8000/interview/save-history",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

role,

answer:"completed"

})

}

);


alert("Interview saved");


}}

className="mt-6 px-6 py-3 rounded-xl bg-purple-600 text-white"

>

Save Interview Report

</button>



</div>


}



</div>


)

}