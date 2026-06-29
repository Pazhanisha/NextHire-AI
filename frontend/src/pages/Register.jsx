import {useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "@/api";


export default function Register(){


const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const [loading,setLoading]=useState(false);


const navigate = useNavigate();





const register = async()=>{


if(!name || !email || !password){

alert("Fill all fields");

return;

}




try{


setLoading(true);



const res = await API.post(

"/auth/register",

{

name,
email,
password

}

);




console.log(res.data);



// save user details temporarily

localStorage.setItem(

"email",

email

);



localStorage.setItem(

"name",

name

);



navigate("/verify");




}


catch(err){


console.log(err);



if(err.response){

alert(err.response.data.detail);

}

else{

alert("Register failed");

}



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



<h1 className="text-3xl text-white font-bold">

Create Account 🚀

</h1>




<p className="text-slate-400 mt-2">

Join NextHire AI

</p>







<input


className="mt-6 w-full p-3 rounded-xl bg-white/10 text-white outline-none"


placeholder="Full Name"


value={name}


onChange={(e)=>

setName(e.target.value)

}


/>







<input


className="mt-4 w-full p-3 rounded-xl bg-white/10 text-white outline-none"


placeholder="Email"


value={email}


onChange={(e)=>

setEmail(e.target.value)

}


/>







<input


className="mt-4 w-full p-3 rounded-xl bg-white/10 text-white outline-none"


placeholder="Password"


type="password"


value={password}


onChange={(e)=>

setPassword(e.target.value)

}


/>








<button


onClick={register}



disabled={loading}



className="mt-6 w-full py-3 rounded-xl text-white font-semibold"



style={{


background:

"linear-gradient(135deg,#7c3aed,#2563eb)"


}}



>


{


loading

?

"Creating Account..."

:

"Send OTP"

}



</button>






</div>



</div>



)


}