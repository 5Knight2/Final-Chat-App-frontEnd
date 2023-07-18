const sendbtn=document.querySelector('#send');
const div1=document.querySelector('#div1');
const baseURL="http://localhost:3000/";
sendbtn.addEventListener("click",sendmsg);
div1.addEventListener("click",opengroup);
let lastmsg=0;
let groupid=0;


showGroups();

async function opengroup(e){
    e.preventDefault()
    if(e.target.tagName=='H4'){
        groupid=e.target.id;
        div1.removeEventListener('click',opengroup);
        while(div1.firstElementChild)div1.removeChild(div1.firstElementChild)
        
        div1.append(document.createElement('br'))
        showfirst()
        
 const a=setInterval(() =>{ 
 showall()} , 1000)
       
    }
}

async function showGroups(){
    const groups=await axios.get(baseURL+'group',{headers:{Authorization:localStorage.getItem('token')}})
 
    for(let i=0;i<groups.data.length;i++){
        div1.append(document.createElement('br'))
        const text=document.createTextNode(groups.data[i].name)
const h4=document.createElement("h4")
h4.id=groups.data[i].id
h4.appendChild(text)

div1.appendChild(h4); 
}

}



function showfirst(){
   let msg= localStorage.getItem('msg'+groupid)
   if(msg){msg=JSON.parse(msg)
   for(let i=0;i<msg.length;i++){
    addmsg(msg[i].user.name,msg[i].msg)
   }}
}

async function  sendmsg(e){
    e.preventDefault()
    try{
        
        const msg={message:document.querySelector('#message').value}
        
const result=await axios.post(baseURL+'msg/'+'?grpid='+groupid,msg,{headers:{Authorization:localStorage.getItem('token')}})
if(result.data.msg=="message stored in database")
//addmsg("You",msg.message);
document.querySelector('#message').value=''
    }catch(err){console.log(err)}

}

async function showall(){

try{
      let msg=localStorage.getItem('msg'+groupid);
      if(msg){
      msg=JSON.parse(msg);
      lastmsg=msg[msg.length-1].id}
      else msg=[];
     if (!lastmsg)lastmsg=0;
   const result=await axios.get(baseURL+'msg/'+lastmsg+'?grpid='+groupid,{headers:{Authorization:localStorage.getItem('token')}})
   if (lastmsg==result.data[result.data.length-1].id)return
   

lastmsg=result.data[result.data.length-1].id;
const div=document.querySelector('#div1')
   for(let i=0;i<result.data.length;i++){
   addmsg(result.data[i].user.name,result.data[i].msg)
    msg.push(result.data[i]);
}
localStorage.setItem('msg'+groupid,JSON.stringify(msg));
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