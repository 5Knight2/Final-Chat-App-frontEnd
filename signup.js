const signupbtn= document.querySelector('#submit');

signupbtn.addEventListener('click',signup);

function signup(e){
    e.preventDefault()
    const pass2=document.querySelector('#pass2');
    const signup_form=document.querySelector('form');
if(document.querySelector('#pass1').value!=pass2.value)
pass2.setCustomValidity("Invalid field.");
else pass2.setCustomValidity("");
    if(signup_form.checkValidity()){
console.log('yes')
    }else{
        signup_form.classList.add('was-validated')
        if(document.querySelector('#pass1').value!=pass2.value)
        alert('entered passwaords are  not same')
    }
}

