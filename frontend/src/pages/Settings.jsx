import { useState, useEffect } from "react";
import API from "@/api";
import { motion } from "framer-motion";

import {
  Bell,
  Shield,
  Palette,
  User,
  Brain,
  Save,
  CheckCircle
} from "lucide-react";


export default function Settings() {


const [saved,setSaved] = useState(false);

const [user,setUser] = useState(null);



const [settings,setSettings] = useState({

dailyTips:true,
weeklyReview:true,
jobAlerts:true,
interviewReminder:true,
skillReminder:true,

difficulty:"Intermediate",

careerDomain:"AI / ML",

theme:"Dark",

saveHistory:true,

aiLearning:true

});





useEffect(()=>{


const storedUser =
localStorage.getItem("user");


if(storedUser){

setUser(
JSON.parse(storedUser)
);

}



loadSettings();


},[]);






const loadSettings = async()=>{


try{


const res = await API.get("/settings/")





setSettings(prev=>({

...prev,

...res.data

}));



}

catch(err){

console.log(err);

}



};









const toggle=(key)=>{


setSettings(prev=>({

...prev,

[key]:!prev[key]

}));


};







const updateValue=(key,value)=>{


setSettings(prev=>({

...prev,

[key]:value

}));


};









const saveSettings = async()=>{


try{


await API.post(
  "/settings/save",
  settings
);



setSaved(true);



setTimeout(()=>{

setSaved(false)

},2500);



}

catch(err){


console.log(err);

alert("Failed to save settings");


}


};









return(


<div className="max-w-6xl mx-auto space-y-8">





<motion.div

initial={{opacity:0,y:20}}

animate={{opacity:1,y:0}}

>


<h1 className="text-4xl font-bold text-white">

Settings ⚙️

</h1>


<p className="text-slate-400 mt-2">

Manage your NextHire AI preferences

</p>


</motion.div>









<Section

icon={<User size={20}/>}

title="Account"

>



<Input

label="Full Name"

value={user?.name || ""}

/>




<Input

label="Email"

value={user?.email || ""}

/>



</Section>









<Section

icon={<Bell size={20}/>}

title="Notifications"

>



<Toggle

title="Daily AI Career Tips"

checked={settings.dailyTips}

onChange={()=>toggle("dailyTips")}

/>




<Toggle

title="Weekly Resume Review"

checked={settings.weeklyReview}

onChange={()=>toggle("weeklyReview")}

/>




<Toggle

title="Job Match Alerts"

checked={settings.jobAlerts}

onChange={()=>toggle("jobAlerts")}

/>




<Toggle

title="Interview Reminders"

checked={settings.interviewReminder}

onChange={()=>toggle("interviewReminder")}

/>




<Toggle

title="Skill Learning Reminder"

checked={settings.skillReminder}

onChange={()=>toggle("skillReminder")}

/>



</Section>









<Section

icon={<Brain size={20}/>}

title="AI Preferences"

>




<Select

label="Difficulty"

value={settings.difficulty}

options={[

"Beginner",

"Intermediate",

"Advanced"

]}

onChange={(v)=>updateValue("difficulty",v)}

/>






<Select

label="Career Domain"

value={settings.careerDomain}

options={[

"Frontend",

"Backend",

"AI / ML",

"Full Stack",

"Cloud",

"Data Science"

]}

onChange={(v)=>updateValue("careerDomain",v)}

/>



</Section>









<Section

icon={<Palette size={20}/>}

title="Appearance"

>


<Select

label="Theme"

value={settings.theme}

options={[

"Dark",

"Light",

"System"

]}

onChange={(v)=>updateValue("theme",v)}

/>


</Section>









<Section

icon={<Shield size={20}/>}

title="Privacy"

>


<Toggle

title="Allow AI Learning"

checked={settings.aiLearning}

onChange={()=>toggle("aiLearning")}

/>




<Toggle

title="Save Resume History"

checked={settings.saveHistory}

onChange={()=>toggle("saveHistory")}

/>



</Section>









<button

onClick={saveSettings}

className="flex gap-3 items-center px-8 py-4 rounded-2xl text-white font-semibold"

style={{

background:
"linear-gradient(135deg,#7c3aed,#2563eb)"

}}

>


<Save size={18}/>

Save Settings


</button>








{

saved &&


<motion.div

initial={{opacity:0}}

animate={{opacity:1}}

className="flex items-center gap-2 text-green-400"

>


<CheckCircle size={18}/>

Settings Saved Successfully


</motion.div>


}






</div>


)

}









function Section({title,icon,children}){


return(


<div

className="p-8 rounded-3xl"

style={{

background:"rgba(255,255,255,.05)",

border:"1px solid rgba(255,255,255,.08)"

}}

>


<div className="flex gap-3 items-center mb-6">


<div className="text-purple-400">

{icon}

</div>


<h2 className="text-white text-xl font-bold">

{title}

</h2>


</div>



<div className="space-y-5">

{children}

</div>


</div>


)

}









function Toggle({title,checked,onChange}){


return(


<div className="flex justify-between items-center">


<p className="text-white">

{title}

</p>



<button

onClick={onChange}

className={`w-14 h-8 rounded-full transition ${
checked
?"bg-purple-600"
:"bg-slate-600"
}`}

>


<div

className={`w-6 h-6 bg-white rounded-full transition ${
checked
?"translate-x-7"
:"translate-x-1"
}`}

/>


</button>



</div>


)

}








function Input({label,value}){


return(


<div>


<p className="text-slate-400 mb-2">

{label}

</p>


<input

value={value}

readOnly

className="w-full p-3 rounded-xl bg-slate-800 text-white"

/>


</div>


)

}








function Select({label,value,options,onChange}){


return(


<div>


<p className="text-slate-400 mb-2">

{label}

</p>


<select

value={value}

onChange={(e)=>onChange(e.target.value)}

className="w-full p-3 rounded-xl bg-slate-800 text-white"

>


{

options.map(o=>(

<option key={o}>

{o}

</option>

))

}



</select>



</div>


)

}