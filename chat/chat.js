const sendbtn=document.querySelector('#send');
const baseURL="http://localhost:3000/";
sendbtn.addEventListener("click",sendmsg);

showall()

async function  sendmsg(e){
    e.preventDefault()
    try{
        
        const msg={message:document.querySelector('#message').value}
        
const result=await axios.post(baseURL+'msg',msg,{headers:{Authorization:localStorage.getItem('token')}})
if(result.data.msg=="message stored in database")
addmsg("You",msg.message);
document.querySelector('#message').value=''
    }catch(err){console.log(err)}

}

async function showall(){

try{
      
   const result=await axios.get(baseURL+'msg',{headers:{Authorization:localStorage.getItem('token')}})
   for(let i=0;i<result.data.length;i++)
   addmsg(result.data[i].user.name,result.data[i].msg)

}catch(err){console.log(err)}
}

function addmsg(name,message){
    const div=document.querySelector('#div1')
const p=document.createElement('p')
p.classList.add('rounded-3')
p.style.border="1px";
p.style.borderStyle='solid';
if(name==localStorage.getItem('name')){
p.style.borderRightWidth="0px";
name='You'}
else p.style.borderLeftWidth="0px";

    p.appendChild(document.createTextNode(name+': '+message))
    div.appendChild(p);

}