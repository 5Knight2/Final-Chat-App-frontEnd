const sendbtn=document.querySelector('#send');
const baseURL="http://localhost:3000/";
sendbtn.addEventListener("click",sendmsg);
async function  sendmsg(e){
    e.preventDefault()
    try{
        
        const msg={message:document.querySelector('#message').value}
        
result=await axios.post(baseURL+'msg',msg,{headers:{Authorization:localStorage.getItem('token')}})
if(result.data.msg=="message stored in database")
addmsg("You",msg.message);
    }catch(err){console.log(err)}

}

function addmsg(name,message){
    const div=document.querySelector('#div1')
const p=document.createElement('p')
p.classList.add('rounded-3')
p.style.border="1px";
p.style.borderStyle='solid';

    p.appendChild(document.createTextNode(name+': '+message))
    div.appendChild(p);




}