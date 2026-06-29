import { motion } from "framer-motion";


function StatsCard({title,value,icon}){


return(

<motion.div

whileHover={{
y:-5
}}

className="
glass
rounded-2xl
p-6
"

>


<div className="
text-3xl
">

{icon}

</div>


<p className="
text-gray-400
mt-4
">

{title}

</p>


<h2 className="
text-4xl
font-bold
mt-2
gradient-text
">

{value}

</h2>


</motion.div>


)

}


export default StatsCard;