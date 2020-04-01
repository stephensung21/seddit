//deleting things
export function removeElements(Id){
    let element = document.getElementById(`${Id}`);
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    
}

//making public feed
export function publicPosts(apiUrl) {
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
    postHeaderH.appendChild(document.createTextNode("Popular Posts"));
    
    postHeader.appendChild(postHeaderH);
    postList.appendChild(postHeader);
    
    postWrapper.appendChild(postList);
    document.getElementById("root").appendChild(postWrapper);

    fetch(`${apiUrl}/post/public`) 
    .then(resp => resp.json())
    .then(resp => {           
        //sort           
        let array = resp.posts;
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
                            
            let divUpvote = document.createElement("div");
            divUpvote.classList.add("upvote");
            divUpvote.setAttribute("id", "upvote");
            let iconUp = document.createElement("i");
            iconUp.classList.add("material-icons");
            iconUp.setAttribute("id", "iconUp");
            iconUp.addEventListener("click", () => alertUp());
            iconUp.appendChild(document.createTextNode("expand_less"));
            divUpvote.appendChild(iconUp);
            
            let divDownvote = document.createElement("div");
            divDownvote.classList.add("downvote");
            divVote.setAttribute("id", "downvote");
            let iconDown = document.createElement("i");
            iconDown.setAttribute("id", "iconDown");
            iconDown.classList.add("material-icons");
            iconDown.addEventListener("click", () => alertDown());
            iconDown.appendChild(document.createTextNode("expand_more"));
            divDownvote.appendChild(iconDown);
            
            divVote.setAttribute("data-id-upvotes","");
            divVote.appendChild(document.createTextNode(sorted_array[i].meta.upvotes.length));
            
            voteWrapper.appendChild(divUpvote);
            voteWrapper.appendChild(divVote);
            voteWrapper.appendChild(divDownvote);
            
            li.appendChild(voteWrapper);
            
            //---------
            
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
            if (sorted_array[i].thumbnail) {
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
            divContent.appendChild(comment);
            
            let subseddit = document.createElement("p");
            subseddit.classList.add("post-author");
            subseddit.setAttribute("data-id-comment", "");
            subseddit.appendChild(document.createTextNode(`r/${sorted_array[i].meta.subseddit}`));
            divContent.appendChild(subseddit);

            li.appendChild(divContent);
            
            postList.appendChild(li);
                           
        }
      
    });

}

//postDetails (the token received after registering)
export function postDetails(apiUrl) {
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
            localStorage.setItem(username, token.token);
            registerDiv.style.display='none';
            loginDiv.style.display='block';
        }
    })
    .catch((error) => {
        console.log(error);
    });

}

function alertUp() {

    alert("Log in to Vote");
}

function alertDown() {

    alert("Log in to Vote");
}


