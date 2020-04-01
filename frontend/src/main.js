import {removeElements, publicPosts, postDetails} from './public.js';
import {loginDetails} from './login.js';

function initApp(apiUrl) {
  // your app initialisation goes here
  
    //chec kif the person is logged in or not
    if (localStorage.getItem("loginUser") !== null) {
        let logToken = localStorage.getItem("loginUser");
        loginDetails(logToken, apiUrl);
    }
  
    //MAKING THE HEADER--------------------------------------------------------------
    let header = document.createElement("header");
    let titleh1 = document.createElement("h1");
    let titleText = document.createTextNode("Seddit");

    header.setAttribute("id", "nav");
    header.classList.add("banner");

    titleh1.setAttribute("id","logo");
    titleh1.classList.add("flex-center");
    titleh1.appendChild(titleText);

    let ul = document.createElement("ul");
    ul.classList.add("nav");
        

    //make the search
    let searchLi = document.createElement("li");
    searchLi.classList.add("nav-item");
    let searchBar = document.createElement("input");
    searchBar.setAttribute("id","search");
    searchBar.setAttribute("data-id-search","");
    searchBar.setAttribute("placeholder","Search Seddit");
    searchBar.setAttribute("type","search");
    
    searchLi.appendChild(searchBar);
    ul.appendChild(searchLi);
    


    //make the login
    let loginLi = document.createElement("li");
    loginLi.classList.add("nav-item");
    let loginButton = document.createElement("button");
    loginButton.classList.add("button", "button-primary");
    
    loginButton.appendChild(document.createTextNode("Log In"));
    loginLi.appendChild(loginButton);
    ul.appendChild(loginLi);
    

    //make the register
    let registerLi = document.createElement("li");
    registerLi.classList.add("nav-item");
    let registerButton = document.createElement("button");
    registerButton.classList.add("button", "button-secondary");
    
    registerButton.appendChild(document.createTextNode("Sign Up"));
    registerLi.appendChild(registerButton);
    ul.appendChild(registerLi);

    header.appendChild(titleh1);
    //header.appendChild(postDiv);
    header.appendChild(ul);

    document.getElementById("root").appendChild(header);
    

    //LOGIN FORM----------------------------------------------------------------------
    let loginDiv = document.createElement("div");
    let loginTitle = document.createElement("h3");
    loginTitle.appendChild(document.createTextNode("Log In"));
    
    let userLogIn = document.getElementsByClassName("button-primary");

    loginDiv.setAttribute("id", "id01");
    loginDiv.classList.add("modal");
    let loginForm = document.createElement("form");
    loginForm.setAttribute("id","loginForm");
    loginForm.classList.add("modal-content");

    let loginContainer = document.createElement("div");  
    loginContainer.appendChild(loginTitle);       
    //username
    let labelU = document.createElement("label");
    labelU.setAttribute("for", "username");
    labelU.appendChild(document.createTextNode("Username"));
    let userNameInput = document.createElement("input");
    userNameInput.setAttribute("type", "username");
    userNameInput.setAttribute("placeholder", "Enter Username");
    userNameInput.setAttribute("name", "username");
    userNameInput.setAttribute("id", "username");
    userNameInput.required = true;

    loginContainer.appendChild(labelU);
    loginContainer.appendChild(userNameInput);


    //password
    let labelP = document.createElement("label");
    labelP.setAttribute("for", "password");
    labelP.appendChild(document.createTextNode("Password"));
    let passwordInput = document.createElement("input");
    passwordInput.setAttribute("type", "password");
    passwordInput.setAttribute("placeholder", "Enter Password");
    passwordInput.setAttribute("name", "password");
    passwordInput.setAttribute("id", "password");
    passwordInput.required = true;

    loginContainer.appendChild(labelP);
    loginContainer.appendChild(passwordInput);


    //login button
    let userLogButton = document.createElement("button");
    userLogButton.setAttribute("type", "button");
    userLogButton.setAttribute("id", "login-button");
    userLogButton.appendChild(document.createTextNode("Sign In"));

    loginContainer.appendChild(userLogButton);

    loginForm.appendChild(loginContainer);
    loginDiv.appendChild(loginForm);
    
    document.getElementById("root").appendChild(loginDiv);
    
    //REGISTER FORM---------------------------------------------------------
    let userRegister = document.getElementsByClassName("button-secondary");
    var registerTrue = 0;
    let registerTitle = document.createElement("h3");
    registerTitle.appendChild(document.createTextNode("Sign Up"));
    
    let registerDiv = document.createElement("div");
    registerDiv.setAttribute("id", "id02");
    registerDiv.classList.add("modal");
    let registerForm = document.createElement("form");
    registerForm.setAttribute("id","registerForm");
    registerForm.classList.add("modal-content");
    
    
    let registerContainer = document.createElement("div");
    
    //email
    let labelE = document.createElement("label");
    labelE.setAttribute("for", "email");
    labelE.appendChild(document.createTextNode("Email"));
    let emailInput = document.createElement("input");
    emailInput.setAttribute("type", "email");
    emailInput.setAttribute("placeholder", "Enter Email");
    emailInput.setAttribute("name", "email");
    emailInput.setAttribute("id", "email");
    emailInput.required = true;
    
    //userName
    let labelRN = document.createElement("label");
    labelRN.setAttribute("for", "nameR");
    labelRN.appendChild(document.createTextNode("newUsername"));
    let nameInputRegister = document.createElement("input");
    nameInputRegister.setAttribute("type", "nameR");
    nameInputRegister.setAttribute("placeholder", "Enter Your Name");
    nameInputRegister.setAttribute("name", "usernameR");
    nameInputRegister.setAttribute("id", "nameRegister");
    nameInputRegister.required = true;
    
    //userName
    let labelRU = document.createElement("label");
    labelRU.setAttribute("for", "usernameR");
    labelRU.appendChild(document.createTextNode("newUsername"));
    let usernameInputRegister = document.createElement("input");
    usernameInputRegister.setAttribute("type", "username");
    usernameInputRegister.setAttribute("placeholder", "Enter New Username");
    usernameInputRegister.setAttribute("name", "nameR");
    usernameInputRegister.setAttribute("id", "usernameRegister");
    usernameInputRegister.required = true;
    
    //password
    let labelRP = document.createElement("label");
    labelRP.setAttribute("for", "passwordR");
    labelRP.appendChild(document.createTextNode("newPassword"));
    let passwordInputRegister = document.createElement("input");
    passwordInputRegister.setAttribute("type", "password");
    passwordInputRegister.setAttribute("placeholder", "Enter New password");
    passwordInputRegister.setAttribute("name", "passwordR");
    passwordInputRegister.setAttribute("id", "passwordRegister");
    passwordInputRegister.required = true;
    
    //button
    let registerButtonAccount = document.createElement("button");
    registerButtonAccount.setAttribute("type", "button");
    registerButtonAccount.setAttribute("id", "register-button");
    registerButtonAccount.appendChild(document.createTextNode("Sign Up!"));

    
    registerContainer.appendChild(emailInput);
    registerContainer.appendChild(nameInputRegister);
    registerContainer.appendChild(usernameInputRegister);
    registerContainer.appendChild(passwordInputRegister);
    registerContainer.appendChild(registerButtonAccount);
    
    registerForm.appendChild(registerTitle);
    
    registerForm.appendChild(registerContainer);
    registerDiv.appendChild(registerForm);
    
    document.getElementById("root").appendChild(registerDiv);
    
    
    //USER FORM TOGGLE
    userLogIn[0].addEventListener("click", function() {

        loginDiv.style.display= "block";

    });   
    
    //register form toggle
    userRegister[0].addEventListener("click", function() {

        registerDiv.style.display= "block";
 
    });  

    //change the form toggle
    window.onclick = function(event) {

        if (event.target == loginDiv) {
            loginDiv.style.display= "none";
        }
        
        if (event.target == registerDiv) {
            registerDiv.style.display = "none";
        }
    }
    
    //getting the public posts------------------------------------------------------
    publicPosts(apiUrl);
        
    document.getElementById("register-button").addEventListener("click", postDetails);
    
    function postDetails() {
        let name = document.getElementById("registerForm").elements["nameR"].value;
        let email = document.getElementById("registerForm").elements["email"].value;
        let username = document.getElementById("registerForm").elements["usernameR"].value;
        let password = document.getElementById("registerForm").elements["passwordR"].value;
        
        const details = {
            username: username,
            password: password,
            email: email,
            name: name
        }
        
        const options = {
            method : 'POST',
            body: JSON.stringify(details),
            headers :{
              'Content-Type': 'application/json'
            }
        }
        
        
        fetch(`${apiUrl}/auth/signup/`, options)
        .then(signup => {
            if (signup.status == 409) {
                alert("Username Taken!");
                throw new Error('409');
            } else if (signup.status == 400) {
                alert("Invalid Input!");
                throw new Error('400');
            } else {
                return signup.json();
            }
        })
        .then(token => {
            if (token != false) {
                localStorage.setItem(username, token.token)
                registerDiv.style.display='none';
                loginDiv.style.display='block';
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }
        
    document.getElementById("login-button").addEventListener("click", loginToken);
    
    function loginToken() {
        let username = document.getElementById("loginForm").elements["username"].value;
        let password = document.getElementById("loginForm").elements["password"].value;
        
        const details = {
            username: username,
            password: password
        
        }
        
        const options = {           
            method : 'POST',
            body: JSON.stringify(details),
            headers :{
              'Content-Type': 'application/json'
            }
        
        }
        
        fetch(`${apiUrl}/auth/login`, options)
        .then(signup => {
            if (signup.status == 400) {
                alert("Missing Username/Password");
                throw new Error('400');
            } else if (signup.status == 403) {
                alert("Invalid Username/Password");
                throw new Error('403');
            } else {
                return signup.json();
            }
        })
        
        .then (token => {
            var userToken = token.token;
            loginDiv.style.display = "none";
            localStorage.setItem('loginUser', userToken);
            console.log(token);
            loginDetails(token.token, apiUrl);
        })
        .catch((error) => {
            alert(error);
        });
                 
    }

}

export default initApp;
