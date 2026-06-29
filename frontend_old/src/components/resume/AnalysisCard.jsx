function AnalysisCard({title,icon,content}){


return(

<div className="
glass
rounded-2xl
p-6
">


<h2 className="
text-xl
font-bold
">

{icon} {title}

</h2>


<p className="
text-gray-400
mt-4
leading-relaxed
">

{content}

</p>



</div>


)

}


export default AnalysisCard;