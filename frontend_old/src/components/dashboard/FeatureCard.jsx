import { motion } from "framer-motion";


function FeatureCard({icon,title,description,button}){


return(

<motion.div

whileHover={{
scale:1.03
}}

className="
glass
rounded-3xl
p-8
"

>


<div className="
text-4xl
">

{icon}

</div>


<h2 className="
text-2xl
font-bold
mt-5
">

{title}

</h2>


<p className="
text-gray-400
mt-3
">

{description}

</p>



<button className="
mt-6
px-5
py-3
rounded-xl
bg-gradient-to-r
from-blue-500
to-purple-600
">

{button}

</button>



</motion.div>


)

}


export default FeatureCard;