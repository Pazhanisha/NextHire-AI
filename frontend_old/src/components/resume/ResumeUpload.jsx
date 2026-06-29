import {useState} from "react";
import API from "../../services/api";


function ResumeUpload(){

const [file,setFile] = useState(null);

const [loading,setLoading] = useState(false);

const [result,setResult] = useState("");



const uploadResume = async()=>{


if(!file) return;


const formData = new FormData();

formData.append(
"file",
file
);


try{

setLoading(true);


const response = await API.post(
"/upload-resume",
formData
);


setResult(
response.data.analysis
);


}

catch(error){

console.log(error);

}


finally{

setLoading(false);

}


}



return(

<div className="
glass
rounded-3xl
p-8
">


<h2 className="
text-2xl
font-bold
">

📄 Upload Resume

</h2>



<p className="
text-gray-400
mt-2
">

Upload your PDF resume for AI analysis.

</p>




<input

type="file"

accept=".pdf"

onChange={(e)=>
setFile(e.target.files[0])
}

className="
mt-6
block
w-full
text-sm
"

/>




<button

onClick={uploadResume}

className="
mt-6
px-8
py-3
rounded-xl
bg-gradient-to-r
from-blue-500
to-purple-600
"


>


{

loading
?
"Analyzing..."
:
"Analyze Resume"

}


</button>






{

result && (

<div className="
mt-8
bg-black/30
rounded-2xl
p-5
">


<h3 className="
font-bold
">

AI Analysis

</h3>


<p className="
text-gray-300
mt-3
">

{result}

</p>


</div>


)

}



</div>


)


}


export default ResumeUpload;