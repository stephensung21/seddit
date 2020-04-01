import {removeElements} from './public.js';
import initApp from './main.js';
import {showComments, showVotes} from './show.js';
import {postForm, testPosts} from './post.js';
import API_URL from './backend_url.js';

export function loginDetails(token, apiUrl) {


    const options = {           
        method: 'GET',
        headers: {
            'Authorization': `Token ${token}`,
        }
    
    }

    fetch(`${apiUrl}/user/feed`, options)
    .then(resp => resp.json())
    .then(details => {

        fetch(`${apiUrl}/user/`, options)
        .then(resp => resp.json())
        .then(user => {
            
            let profileName = user.name;
            //console.log(profileName);
            let profilePostNum = user.posts.length;
            //console.log(profilePostNum);
            console.log("here");
            console.log(user.id);
            localStorage.setItem('userID', user.id);
            
            if (document.getElementById("root").hasChildNodes()) {
                removeElements("root");
            }

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


            //make the post
            let postDiv = document.createElement("div");
            postDiv.classList.add("nav-item");
            let postButton = document.createElement("button");
            postButton.classList.add("button", "button-post");

            postButton.appendChild(document.createTextNode("Post"));
            postDiv.appendChild(postButton);
            document.getElementById("root").appendChild(postDiv);
            
            //make posting modal          
            let postingDiv = document.createElement("div");
            postingDiv.setAttribute("id", "id01");
            postingDiv.setAttribute("id", "postDiv");
            postingDiv.classList.add("modal");
            let postingTitle = document.createElement("h3");
            postingTitle.appendChild(document.createTextNode("Make a New Post"));
            
            let postingModal = document.createElement("form");
            postingModal.classList.add("posting-modal-content");

            //making a title
            let labelPT = document.createElement("label");
            labelPT.setAttribute("for", "postTitle");
            labelPT.appendChild(document.createTextNode("Add a Title"));
            let titlePostInput = document.createElement("input");
            titlePostInput.setAttribute("type", "email");
            titlePostInput.setAttribute("placeholder", "What do you want to Post?");
            titlePostInput.setAttribute("name", "postTitle");
            titlePostInput.setAttribute("id", "postTitle");
            titlePostInput.required = true;
            
            //uploading text
            let labelUP = document.createElement("label");
            labelUP.setAttribute("for", "commentText");
            labelUP.appendChild(document.createTextNode("Create a Text Post"));
            let textPostInput = document.createElement("textarea");
            textPostInput.setAttribute("type", "email");
            textPostInput.setAttribute("placeholder", "What do you want to Post?");
            textPostInput.setAttribute("name", "postText");
            textPostInput.setAttribute("id", "postText");
            textPostInput.required = true;
            
            //uploading iamge
            let labelIP = document.createElement("label");
            labelIP.setAttribute("for", "postImage");
            labelIP.appendChild(document.createTextNode("Upload an Image (optional)"));
            let imageInput = document.createElement("input");
            imageInput.setAttribute("type", "email");
            imageInput.setAttribute("placeholder", "");
            imageInput.setAttribute("name", "imageText");
            imageInput.setAttribute("id", "imageText");
            
            //button
            let uploadButton = document.createElement("button");
            uploadButton.setAttribute("type", "button");
            uploadButton.setAttribute("id", "upload-button");
            uploadButton.appendChild(document.createTextNode("Post!"));

            uploadButton.addEventListener("click", () => postForm(postingModal));
                      
            postingModal.appendChild(postingTitle);
            postingModal.appendChild(labelPT);
            postingModal.appendChild(titlePostInput);
            postingModal.appendChild(labelUP);
            postingModal.appendChild(textPostInput);
            postingModal.appendChild(labelIP);
            postingModal.appendChild(imageInput);
            postingModal.appendChild(uploadButton);
            
            
            
            postingDiv.appendChild(postingModal);
            document.getElementById("root").appendChild(postingDiv);


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

            //make the profile/using the login
            let userLi = document.createElement("li");
            userLi.classList.add("nav-item");
            let userButton = document.createElement("button");
            userButton.classList.add("button", "button-primary", "button-profile");
            
            
            userButton.appendChild(document.createTextNode("User"));
            userLi.appendChild(userButton);
            ul.appendChild(userLi);
            
            //make the settings
            let settingsLi = document.createElement("li");
            settingsLi.classList.add("nav-item");
            let settingsButton = document.createElement("button");
            settingsButton.classList.add("button", "button-primary", "button-settings");

            settingsButton.appendChild(document.createTextNode("Settings"));
            settingsLi.appendChild(settingsButton);
            ul.appendChild(settingsLi);
            
            let settingsDiv = document.createElement("div");
            settingsDiv.setAttribute("id", "id01");
            settingsDiv.classList.add("modal");
            let settingsTitle = document.createElement("h3");
            settingsTitle.appendChild(document.createTextNode(`${profileName} Account Settings`));

            let settingsModal = document.createElement("form");
            settingsModal.setAttribute("id", "settingsForm");
            settingsModal.classList.add("post-modal-content");
            
            //change email
            let labelCE = document.createElement("label");
            labelCE.setAttribute("for", "changeEmail");
            labelCE.appendChild(document.createTextNode("Change Your Email"));
            let changeEmailInput = document.createElement("input");
            changeEmailInput.setAttribute("type", "email");
            changeEmailInput.setAttribute("placeholder", "Enter Your New Email");
            changeEmailInput.setAttribute("name", "changeEmail");
            changeEmailInput.setAttribute("id", "changeEmail");
            changeEmailInput.required = true;
            
            //change username           
            let labelCU = document.createElement("label");
            labelCU.setAttribute("for", "changeUsername");
            labelCU.appendChild(document.createTextNode("Change Your Username"));
            let changeUsernameInput = document.createElement("input");
            changeUsernameInput.setAttribute("type", "username");
            changeUsernameInput.setAttribute("placeholder", "Enter Your New Username");
            changeUsernameInput.setAttribute("name", "changeUsername");
            changeUsernameInput.setAttribute("id", "changeUsername");
            changeUsernameInput.required = true;
            
            //change password
            let labelCP = document.createElement("label");
            labelCP.setAttribute("for", "changePassword");
            labelCP.appendChild(document.createTextNode("Change Your Password"));
            let changePasswordInput = document.createElement("input");
            changePasswordInput.setAttribute("type", "password");
            changePasswordInput.setAttribute("placeholder", "Enter Your New Password");
            changePasswordInput.setAttribute("name", "changePassword");
            changePasswordInput.setAttribute("id", "changePassword");
            changePasswordInput.required = true;

            //settings button
            let settingsChangeConfirm = document.createElement("button");
            settingsChangeConfirm.setAttribute("type", "button");
            settingsChangeConfirm.setAttribute("id", "upload-button");
            settingsChangeConfirm.appendChild(document.createTextNode("Change Account Settings"));
            settingsChangeConfirm.addEventListener("click", () => changeDetails(settingsModal));


            settingsModal.appendChild(settingsTitle);
            settingsModal.appendChild(labelCE);
            settingsModal.appendChild(changeEmailInput);
            settingsModal.appendChild(labelCU);
            settingsModal.appendChild(changeUsernameInput);
            settingsModal.appendChild(labelCP);
            settingsModal.appendChild(changePasswordInput);
            settingsModal.appendChild(settingsChangeConfirm);

            settingsDiv.appendChild(settingsModal);

            document.getElementById("root").appendChild(settingsDiv);



            //making the profile modal
            let profileDiv = document.createElement("div");
            profileDiv.setAttribute("id", "id01");
            profileDiv.classList.add("modal");
            let profileTitle = document.createElement("h3");
            profileTitle.appendChild(document.createTextNode(`${profileName} Profile`));

            let profileModal = document.createElement("form");
            profileModal.classList.add("post-modal-content");
            
            let profilePostNumP = document.createElement("p");
            profilePostNumP.appendChild(document.createTextNode("Number of Posts You\'ve made\: "+`${profilePostNum}`));
            
            let profileVotesP = document.createElement("p");
            profileVotesP.appendChild(document.createTextNode("Number of Upvotes You\'ve made\: XD"));
            
            
            
            profileModal.appendChild(profileTitle);
            profileModal.appendChild(profilePostNumP);
            profileModal.appendChild(profileVotesP);

            

            profileDiv.appendChild(profileModal);    

            document.getElementById("root").appendChild(profileDiv);


            //make the signout
            let signoutLi = document.createElement("li");
            signoutLi.classList.add("nav-item");
            let signoutButton = document.createElement("button");
            signoutButton.classList.add("button", "button-signout");

            signoutButton.appendChild(document.createTextNode("Sign Out"));
            signoutLi.appendChild(signoutButton);
            ul.appendChild(signoutLi);

            header.appendChild(titleh1);
            header.appendChild(postDiv);
            header.appendChild(ul);

            document.getElementById("root").appendChild(header);

            //making the feed
            let postWrapper = document.createElement("main");
            postWrapper.setAttribute("role", "main");
            postWrapper.setAttribute("id", "main");

            let postList = document.createElement("ul");
            postList.setAttribute("id", "feed");
            postList.setAttribute("data-id-feed","");

            let postHeader = document.createElement("div");
            postHeader.classList.add("header");

            let postHeaderH = document.createElement("h3");
            postHeaderH.classList.add("feed-title", "alt-txt");
            postHeaderH.appendChild(document.createTextNode("Your Feed"));

            postHeader.appendChild(postHeaderH);
            postList.appendChild(postHeader);

            postWrapper.appendChild(postList);
            document.getElementById("root").appendChild(postWrapper);

            let feedNext = 10;

            let array = details.posts;
            let sorted_array = array.slice().sort((a,b) => parseFloat(b.meta.published) - parseFloat(a.meta.published));

            for (let i = 0; i < sorted_array.length; i++) {

                let li = document.createElement("li");
                li.classList.add("post");
                li.setAttribute("data-id-post","");

                let voteWrapper = document.createElement("div");
                voteWrapper.classList.add("voteWrapper");

                let divVote = document.createElement("div");
                divVote.classList.add("vote");
                divVote.setAttribute("id", "numberVotes");
                if (details.posts[i].meta.upvotes.includes(parseFloat(localStorage.getItem("userID")))) {
                    divVote.classList.add("upvoted");
                }
                
                divVote.setAttribute("data-id-upvotes","");
                divVote.appendChild(document.createTextNode(sorted_array[i].meta.upvotes.length));
                divVote.addEventListener("click", () => showVotes(sorted_array[i], apiUrl));
                console.log("num votes: "+ sorted_array[i].meta.upvotes.length);

                let divUpvote = document.createElement("div");
                divUpvote.classList.add("upvote");
                divUpvote.setAttribute("id", "upvote");
                let iconUp = document.createElement("i");
                iconUp.classList.add("material-icons");
                iconUp.setAttribute("id", "iconUp");
                iconUp.appendChild(document.createTextNode("expand_less"));
                //button
                iconUp.addEventListener("click", () => postUpvote(sorted_array[i], divVote, apiUrl));
                iconUp.addEventListener("click", () => alertUp());
                divUpvote.appendChild(iconUp);

                let divDownvote = document.createElement("div");
                divDownvote.classList.add("downvote");
                divDownvote.setAttribute("id", "downvote");
                let iconDown = document.createElement("i");
                iconDown.setAttribute("id", "iconDown");
                iconDown.classList.add("material-icons");
                //button
                iconDown.addEventListener("click", () => deleteUpvote(sorted_array[i], divVote, apiUrl));
                iconDown.addEventListener("click", () => alertDown());
                iconDown.appendChild(document.createTextNode("expand_more"));
                divDownvote.appendChild(iconDown);

                
                voteWrapper.appendChild(divUpvote);
                voteWrapper.appendChild(divVote);
                voteWrapper.appendChild(divDownvote);

                li.appendChild(voteWrapper);

                let divContent = document.createElement("div");
                divVote.classList.add("content");

                let divContentTitle = document.createElement("h4");
                divContentTitle.classList.add("post-title", "alt-text");
                divContentTitle.setAttribute("data-id-title","");
                divContentTitle.appendChild(document.createTextNode(sorted_array[i].title));
                divContent.appendChild(divContentTitle);

                let divContentPicture = document.createElement("img");
                divContentPicture.classList.add("post-image");
                divContentPicture.setAttribute("data-id-image", "");
                if (sorted_array[i].image) {
                    divContentPicture.setAttribute("src", `data:image/jpeg;base64,${sorted_array[i].thumbnail}`);
                }
                divContent.appendChild(divContentPicture);

                let author = document.createElement("p");
                author.classList.add("post-author");
                author.setAttribute("data-id-author", "");
                author.appendChild(document.createTextNode(`Posted By u/${sorted_array[i].meta.author}`));
                divContent.appendChild(author);

                let date = document.createElement("p");
                date.classList.add("post-author");
                date.setAttribute("data-id-date", "");
                var actualDate = new Date(parseFloat(sorted_array[i].meta.published)*1000);
                let postDate = actualDate.getDate() + "/" + actualDate.getMonth() + "/" + actualDate.getFullYear() + " " + actualDate.getHours() + ":" + actualDate.getMinutes();
                date.appendChild(document.createTextNode(`Posted on ${postDate}`));
                divContent.appendChild(date);

                let comment = document.createElement("p");
                comment.classList.add("post-author");
                comment.setAttribute("data-id-comment", "");
                comment.appendChild(document.createTextNode(`${sorted_array[i].comments.length} comments`));
                comment.addEventListener("click", () => showComments(apiUrl, sorted_array[i]));
                divContent.appendChild(comment);

                let subseddit = document.createElement("p");
                subseddit.classList.add("post-author");
                subseddit.setAttribute("data-id-comment", "");
                subseddit.appendChild(document.createTextNode(`r/${sorted_array[i].meta.subseddit}`));
                divContent.appendChild(subseddit);

                li.appendChild(divContent);

                postList.appendChild(li);
            }

            //logging out
            signoutButton.addEventListener("click", function() {

            localStorage.removeItem("loginUser");
            localStorage.removeItem("userID");
            removeElements("root");
            initApp(apiUrl);
            console.log("signout");

            }); 

            //user button
            var profileButt = document.getElementsByClassName("button-profile");
            var postButt = document.getElementsByClassName("button-post");
            var settingsButt = document.getElementsByClassName("button-settings");

            //profile button
            profileButt[0].addEventListener("click", function() {

                profileDiv.style.display= "block";

            }); 
            
            //post button
            postButt[0].addEventListener("click", function() {

                postingDiv.style.display= "block";

            }); 

            //settings button
            settingsButt[0].addEventListener("click", function() {
                settingsDiv.style.display="block";
            });
            
            
            window.onclick = function(event) {
                if (event.target == profileDiv) {
                    profileDiv.style.display = "none";
                }
                
                if (event.target == postingDiv) {
                    postingDiv.style.display = "none";
                }

                if (event.target == settingsDiv) {
                    settingsDiv.style.display = "none";
                }
                

            } 
            
            //infinite scroll
            document.addEventListener("scroll", function (event)  {


               if (testPosts(feedNext) == true) {
                   console.log(feedNext);
                   //document.rem
                   feedNext += 3;
                   //setTimeout(addLines, 2000);
               }
            });
            
            //console.log(details);
                   
        });
    
        
    });

}

export function postUpvote(post, numberElement, apiUrl) {
    let tokenU = localStorage.getItem("loginUser");
    let id = post.id;
    if (checkLogin() && !haveUpvoted(numberElement)) {
        //console.log("clickedup");
        const options = {
            method : 'PUT',
            headers : {
                'Authorization': `Token ${tokenU}`
            }
        }
        console.log("votes"+post.meta.upvotes.length);
        fetch(`${apiUrl}/post/vote?id=${id}`, options)
        .then(vote => {
            console.log(`${apiUrl}/post/vote?id=${id}`);
            if (vote.status == 400) {
                //alert("Malformed Request");
                throw new Error('400');
            } else if (vote.status == 403) {
                //alert("Invalid Auth Token");
                throw new Error('403');
            } else {               
                numberElement.innerText = 1+parseFloat(numberElement.innerText);
                console.log("upvotedx");
                numberElement.classList.add("upvoted");
                console.log("updated votes: "+post.meta.upvotes.length);
            }
        })
        .catch(error => {
            console.log(error);
        });

    }

}

export function deleteUpvote(post, numberElement, apiUrl) {
    let tokenU = localStorage.getItem("loginUser");
    let id = post.id;
    if (checkLogin() && haveUpvoted(numberElement)) {
        console.log("clickeddown");
        const options = {
            method : 'DELETE',
            headers : {
                'Authorization': `Token ${tokenU}`
            }
        }
        //console.log(postJson.meta.upvotes.length);
        fetch(`${apiUrl}/post/vote?id=${id}`, options)
        .then(vote => {
            if (vote.status == 400) {
                throw new Error('400');
            } else if (vote.status == 403) {
                throw new Error('403');
            } else {
                numberElement.innerText = parseFloat(numberElement.innerText) - 1;
                numberElement.classList.remove("upvoted");
                
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
}



function checkLogin() {
    if (localStorage.getItem("loginUser")) {
        return true;
    } else {
        return false;
    }
}

function haveUpvoted(Obj) {
    return Obj.classList.contains("upvoted");
}

function addLines() {
    feedNext += 10;
}

function removeListener() {

}

function changeDetails(form) {
    let token = localStorage.getItem("loginUser");
    let nullFlag = 0;
    const details ={
        
    };

    //check if field is null, then append if not
    if (form.elements["changeEmail"].value) {
        nullFlag = 1;
        details.email = form.elements["changeEmail"].value;

    }
    
    if (form.elements["changeUsername"].value) {
        nullFlag = 1;
        details.name = form.elements["changeUsername"].value;
    }

    if (form.elements["changePassword"].value) {
        nullFlag = 1;
        details.password = form.elements["changePassword"].value;
    }

    //if all are null
    if (nullFlag === 0) {
        alert("Nothing to be Changed");
        return 0;
    }

    nullFlag = 0;

    const options = {
        method: 'PUT',
        body: JSON.stringify(details),
        headers: {
            'Authorization': `Token ${token}`,
            'Content-type': 'application/json'
        }
    }

    fetch(`${API_URL}/user/`, options)
    .then(resp => {
        if (resp.status == '400') {
            throw new Error('400');
        }
        else if (resp.status == '403') {
            throw new Error('403');
        }
        else {
            return resp.json();
        }
    })
    .then(response => {
        if (response != false) {
            document.getElementById("settingsDiv").style.display = "none";
        }
    })
    .catch((error) => {
        console.log(error);
    });

}