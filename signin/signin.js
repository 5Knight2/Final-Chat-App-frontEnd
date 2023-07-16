const login_btn =document.querySelector('#submit');
const baseURL="http://localhost:3000/";
login_btn.addEventListener('click',login)

function login(e){
    const obj={password:document.querySelector('#pass').value,
    email:document.querySelector('#email').value
}
    axios.post(baseURL,obj)
    .then((response)=>{
        document.localstorage.setItem('token',response.data.token)
        alert("Login successful")
        location.href="http://127.0.0.1:5500/Signup.html";
    })
    .catch(err=>{
        if(err.response.data.msg=="user not authorized")
        alert("wrong credentials")
        else  alert("something went wrong try again later")
    })
}