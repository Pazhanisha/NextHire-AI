import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


export default function Login(){

const navigate = useNavigate();


const [email,setEmail] = useState("");
const [password,setPassword] = useState("");



const login = async()=>{

try{


const res = await axios.post(

"http://localhost:8000/auth/login",

{
email,
password
}

);


localStorage.setItem(
"user",
JSON.stringify(res.data.user)
);



navigate("/dashboard");



}

catch(err){

alert(
err.response?.data?.detail || 
"Login failed"
);

}


};



return(

<div className="min-h-screen flex items-center justify-center">


<div className="w-96 p-8 rounded-3xl bg-white/10">


<h1 className="text-3xl text-white font-bold mb-6">

NextHire AI 🚀

</h1>


<input

placeholder="Email"

className="w-full p-3 mb-4 rounded-xl bg-slate-800 text-white"

onChange={(e)=>setEmail(e.target.value)}

/>



<input

type="password"

placeholder="Password"

className="w-full p-3 mb-5 rounded-xl bg-slate-800 text-white"

onChange={(e)=>setPassword(e.target.value)}

/>



<button

onClick={login}

className="w-full p-3 rounded-xl text-white"

style={{
background:
"linear-gradient(135deg,#7c3aed,#2563eb)"
}}

>

Login

</button>



<p className="text-slate-400 mt-5 text-center">


Don't have an account?


<span

className="text-purple-400 cursor-pointer ml-2"

onClick={()=>navigate("/register")}

>

Register

</span>


</p>


</div>


</div>

)

}