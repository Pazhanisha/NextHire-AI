import {useState} from "react";


function VoiceRecorder(){

const [listening,setListening]=useState(false);

const [text,setText]=useState("");



const startListening=()=>{


const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



const recognition =
new SpeechRecognition();


recognition.start();


setListening(true);



recognition.onresult=(event)=>{


const speech =
event.results[0][0].transcript;


setText(speech);


};



recognition.onend=()=>{

setListening(false);

};


}



return(

<div className="
glass
rounded-3xl
p-8
text-center
">


<button

onClick={startListening}

className="
w-20
h-20
rounded-full
bg-gradient-to-r
from-blue-500
to-purple-600
text-3xl
"

>

🎙️

</button>



<p className="
mt-4
text-gray-400
">

{
listening
?
"Listening..."
:
"Click and answer"
}

</p>



<div className="
mt-5
bg-black/30
rounded-xl
p-4
text-left
">


{text || "Your answer will appear here..."}


</div>


</div>

)


}


export default VoiceRecorder;