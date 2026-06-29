import {useState} from "react";
import {useNavigate} from "react-router-dom";


export default function VerifyOTP(){


const [otp,setOtp]=useState("");

const navigate=useNavigate();


const verify=async()=>{


const email =
localStorage.getItem("email");



const res = await fetch(

"http://localhost:8000/auth/verify",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

email,

otp

})

}

);



const data=await res.json();


console.log(data);


if(res.ok){

navigate("/dashboard");

}


};



return(

<div className="min-h-screen flex items-center justify-center">


<div className="p-8 rounded-3xl bg-white/5 w-96">


<h1 className="text-white text-3xl font-bold">

Verify OTP 🔐

</h1>


<input

className="mt-6 w-full p-3 rounded-xl bg-white/10 text-white"

placeholder="Enter OTP"

onChange={(e)=>setOtp(e.target.value)}

/>


<button

onClick={verify}

className="mt-5 w-full py-3 rounded-xl text-white"

style={{

background:
"linear-gradient(135deg,#10b981,#2563eb)"

}}

>

Verify

</button>



</div>


</div>

)


}