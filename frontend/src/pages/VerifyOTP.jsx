import {useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "@/api";


export default function VerifyOTP(){


const [otp,setOtp]=useState("");

const [loading,setLoading]=useState(false);

const navigate=useNavigate();





const verify = async()=>{


const email = localStorage.getItem("email");



if(!otp){

alert("Enter OTP");

return;

}



try{


setLoading(true);



const res = await API.post(

"/auth/verify",

{

email,

otp

}

);





console.log(res.data);




// save user details

if(res.data.user){


localStorage.setItem(

"user",

JSON.stringify(res.data.user)

);


}





if(res.data.token){


localStorage.setItem(

"token",

res.data.token

);

}





navigate("/dashboard");





}


catch(err){


console.log(err);


alert(

err.response?.data?.message ||

"OTP verification failed"

);


}


finally{


setLoading(false);


}



};








return(


<div className="min-h-screen flex items-center justify-center">


<div

className="p-8 rounded-3xl w-96"

style={{

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(255,255,255,.1)"

}}

>


<h1 className="text-white text-3xl font-bold">

Verify OTP 🔐

</h1>



<p className="text-slate-400 mt-2">

Enter the OTP sent to your email

</p>





<input


value={otp}


onChange={(e)=>setOtp(e.target.value)}


className="mt-6 w-full p-3 rounded-xl bg-white/10 text-white outline-none"


placeholder="Enter OTP"



/>





<button


onClick={verify}


disabled={loading}


className="mt-5 w-full py-3 rounded-xl text-white font-semibold"


style={{


background:

"linear-gradient(135deg,#10b981,#2563eb)"


}}



>


{


loading

?

"Verifying..."

:

"Verify OTP"

}



</button>





</div>


</div>


)

}