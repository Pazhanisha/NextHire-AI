import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";


export default function MainLayout() {


const navigate = useNavigate();



const user = JSON.parse(
  localStorage.getItem("user")
);



const logout = ()=>{


localStorage.removeItem("user");


navigate("/");


};



return (


<div
className="flex h-screen w-full overflow-hidden bg-grid"
style={{ background:"#050816" }}
>


{/* Background ambient blobs */}

<div className="pointer-events-none fixed inset-0 overflow-hidden">


<div

className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] rounded-full opacity-20"

style={{

background:
"radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)",

filter:"blur(80px)"

}}

/>


<div

className="absolute bottom-[-10%] right-[5%] w-[600px] h-[600px] rounded-full opacity-15"

style={{

background:
"radial-gradient(circle, rgba(37,99,235,0.5) 0%, transparent 70%)",

filter:"blur(100px)"

}}

/>


<div

className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full opacity-10"

style={{

background:
"radial-gradient(circle, rgba(192,132,252,0.4) 0%, transparent 70%)",

filter:"blur(60px)"

}}

/>


</div>





{/* Sidebar */}

<Sidebar />





{/* Main */}

<div className="flex flex-col flex-1 min-w-0 overflow-hidden">



<Navbar />





<main className="flex-1 overflow-y-auto px-6 py-6">



{/* User Info + Logout */}

<div className="flex justify-end items-center gap-5 mb-5">


<div className="text-right">


<h2 className="text-white font-bold">

{user?.name}

</h2>


<p className="text-slate-400 text-sm">

{user?.email}

</p>


</div>




<button

onClick={logout}

className="px-4 py-2 rounded-xl text-white bg-red-500/20 hover:bg-red-500/40 transition"

>


Logout


</button>


</div>





<Outlet />



</main>



</div>



</div>


)

}