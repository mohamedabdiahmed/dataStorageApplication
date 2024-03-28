const form = document.querySelector('form');
const logout = document.getElementById("logout")
form.addEventListener('click',(e)=>{
    e.preventDefault();

    const username = form.username.value;
    const password  = form.password.value;

    const authenticated = authentication(username,password);
    if(authenticated){
        window.location.href = "/DataStorage.html"
    }else{
        alert("Invalid Username or Password")
    }
})

const authentication = (username,password)=>{
    if(username === "admin" && password === "123"){
        return true
    }else{
        return false;
    }
}


// outh2
logout.addEventListener('click',()=>{
    if(!window.location.replace("./login.html")){
        window.confirm("Are you sure you want to log out?");
    }
    return
})