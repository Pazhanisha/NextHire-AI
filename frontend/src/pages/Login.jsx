import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {LogIn} from "lucide-react";
import API from "@/api";


export default function Login(){


const navigate = useNavigate();


const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const [loading,setLoading]=useState(false);





const login = async()=>{


if(!email || !password){

alert("Enter email and password");

return;

}



try{


setLoading(true);



const res = await API.post(

"/auth/login",

{

email,

password

}

);





// save user details

localStorage.setItem(

"user",

JSON.stringify(res.data.user)

);




// if backend gives token

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

err.response?.data?.detail ||

"Login failed"

);


}


finally{


setLoading(false);


}



};







return(



<div className="min-h-screen flex items-center justify-center">





<motion.div

initial={{
opacity:0,
y:30
}}

animate={{
opacity:1,
y:0
}}

className="w-96 p-8 rounded-3xl"

style={{

background:"rgba(255,255,255,.08)",

border:"1px solid rgba(255,255,255,.1)"

}}

>





<h1 className="text-3xl font-bold text-white mb-2">

NextHire AI 🚀

</h1>



<p className="text-slate-400 mb-6">

Login to continue your AI career journey

</p>







<input

placeholder="Email"

value={email}

onChange={(e)=>setEmail(e.target.value)}

className="w-full p-3 mb-4 rounded-xl bg-slate-800 text-white outline-none"

/>







<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

className="w-full p-3 mb-5 rounded-xl bg-slate-800 text-white outline-none"

/>







<button

onClick={login}

className="w-full p-3 rounded-xl text-white flex justify-center gap-2 items-center"

style={{

background:

"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>


<LogIn size={18}/>


{

loading

?

"Logging in..."

:

"Login"

}



</button>








<p className="text-slate-400 mt-5 text-center">


Don't have an account?


<span

onClick={()=>navigate("/register")}

className="text-purple-400 cursor-pointer ml-2"

>


Register


</span>


</p>





</motion.div>






</div>



)


}