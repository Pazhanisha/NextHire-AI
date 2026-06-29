import {useState} from "react";
import Message from "./Message";


function ChatBox(){


const [messages,setMessages]=useState([

{
text:"Hi! I am your AI Career Mentor. Ask me anything about your career.",
type:"ai"
}

]);


const [input,setInput]=useState("");



const sendMessage=()=>{


if(!input) return;


setMessages([

...messages,

{
text:input,
type:"user"
},

{
text:"I will help you create a roadmap based on your goal 🚀",
type:"ai"
}

]);


setInput("");

}



return(

<div className="
glass
rounded-3xl
p-8
">


<h2 className="
text-2xl
font-bold
">

🤖 Career Mentor

</h2>




<div className="
mt-6
min-h-[300px]
">


{

messages.map((msg,index)=>(


<Message

key={index}

text={msg.text}

type={msg.type}

/>


))

}



</div>





<div className="
flex
gap-3
mt-6
">


<input

value={input}

onChange={(e)=>setInput(e.target.value)}

placeholder="Ask your career question..."

className="
flex-1
bg-black/30
rounded-xl
p-4
outline-none
"

/>



<button

onClick={sendMessage}

className="
px-6
rounded-xl
bg-gradient-to-r
from-blue-500
to-purple-600
"

>

Send

</button>



</div>



</div>


)


}


export default ChatBox;