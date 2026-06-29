import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function Register(){


const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate = useNavigate();



const register=async()=>{


try{


const res = await fetch(

"http://localhost:8000/auth/register",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

name,
email,
password

})

}

);



const data = await res.json();


console.log(data);



if(res.ok){


localStorage.setItem(
"email",
email
);


navigate("/verify");


}

else{


alert(data.detail);

}



}

catch(err){

console.log(err);

alert("Register failed");

}


};




return(


<div className="min-h-screen flex items-center justify-center">


<div className="p-8 rounded-3xl bg-white/5 w-96">


<h1 className="text-3xl text-white font-bold">

Create Account 🚀

</h1>




<input

className="mt-6 w-full p-3 rounded-xl bg-white/10 text-white"

placeholder="Name"

onChange={(e)=>setName(e.target.value)}

/>





<input

className="mt-4 w-full p-3 rounded-xl bg-white/10 text-white"

placeholder="Email"

onChange={(e)=>setEmail(e.target.value)}

/>




<input

className="mt-4 w-full p-3 rounded-xl bg-white/10 text-white"

placeholder="Password"

type="password"

onChange={(e)=>setPassword(e.target.value)}

/>





<button

onClick={register}

className="mt-6 w-full py-3 rounded-xl text-white"

style={{

background:
"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>

Send OTP

</button>



</div>


</div>


)

}