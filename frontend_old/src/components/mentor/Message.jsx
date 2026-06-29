function Message({text,type}){


return(

<div className={

`
p-4
rounded-2xl
max-w-[80%]
mt-4

${type==="user"
?
"ml-auto bg-blue-600"
:
"bg-white/10"
}

`

}>


{text}


</div>

)

}


export default Message;