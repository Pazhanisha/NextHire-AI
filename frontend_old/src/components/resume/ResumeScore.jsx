function ResumeScore({score}){


return(

<div className="
glass
rounded-3xl
p-8
text-center
">


<h2 className="
text-xl
text-gray-400
">

ATS Score

</h2>


<h1 className="
text-6xl
font-bold
mt-5
gradient-text
">

{score}%

</h1>


<p className="
text-gray-400
mt-4
">

Resume optimization level

</p>



</div>


)

}


export default ResumeScore;