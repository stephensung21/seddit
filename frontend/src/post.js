import API_URL from './backend_url.js';
import {loginDetails, postUpvote, deleteUpvote} from './login.js';


export function postForm(form) {

    let title = form.elements["postTitle"].value;
    let text = form.elements["postText"].value;
    let image = form.elements["imageText"].value;
    let tokenU = localStorage.getItem("loginUser");

    const details = {
        title: title,
        text: text,
        subseddit: "shower-thoughts"
    }

    //if there is an image
    if (image) {
        imageUrl(image)
        .then(dataUrl => {
            details.image = dataUrl.split(',')[1];
            const options = {
                method: 'POST',
                body: JSON.stringify(details),
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-type': 'application/json'
                }
            }
            fetch(`${API_URL}/post/`, options)
            .then(resp => {
                if (resp.status == 400) {
                    throw new Error('400');
                } else if (resp.status == 403) {
                    throw new Error('403');
                } else {
                    document.getElementById("postDiv").style.display = "none";
                    loginDetails(tokenU, API_URL);
                    return resp.json();
                }
            })
            .then(string => {
                console.log(string.post_id);
            })
            .catch(error =>{
                console.log(error);
            });
        })

    }

    else {

        const options = {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                'Authorization': `Token ${tokenU}`,
                'Content-type': 'application/json'
            }
        }

        fetch(`${API_URL}/post/`, options)
        .then(resp => {
            if (resp.status == 403) {
                throw new Error('403');
            } else if (resp.status == 400) {
                throw new Error('400');
            } else {
                document.getElementById("postDiv").style.display = "none";
                loginDetails(tokenU, API_URL);
                return resp.json();
            }
        })
        .then(string => {
            console.log(string.post_id);
        })
        .catch(error =>{
            console.log(error);
        });
    }

}

function imageUrl(url) {
    return fetch(url)
    // get the response as a raw binary blob
    .then(response => response.blob())
    // read it as a file and convert it into a base64 image
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    }));
}

export function testPosts(startPost) {
    let token = localStorage.getItem("loginUser");
    let pageOffset = window.pageYOffset;

    console.log("startpost "+startPost);
    console.log("ran "+document.getElementById("root").offsetHeight);
    console.log("number"+startPost);
    if(pageOffset > document.getElementById("root").offsetHeight - 800) {
        
        const options = {           
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
            }
        
        }

        fetch(`${API_URL}/user/feed?p=${startPost}`, options)
        .then(resp => resp.json())
        .then( feed => {

            let sorted_array = feed.posts;

            for (let i = 0; i < sorted_array.length; i++) {

                //console.log(sorted_array[i]);

                let li = document.createElement("li");
                li.classList.add("post");
                li.setAttribute("data-id-post","");

                let voteWrapper = document.createElement("div");
                voteWrapper.classList.add("voteWrapper");

                let divVote = document.createElement("div");
                divVote.classList.add("vote");
                divVote.setAttribute("id", "numberVotes");
                if (feed.posts[i].meta.upvotes.includes(parseFloat(localStorage.getItem("userID")))) {
                    divVote.classList.add("upvoted");
                }
                
                divVote.setAttribute("data-id-upvotes","");
                divVote.appendChild(document.createTextNode(sorted_array[i].meta.upvotes.length));
                divVote.addEventListener("click", () => showVotes(sorted_array[i], apiUrl));
                //console.log("num votes: "+ sorted_array[i].meta.upvotes.length);

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

                document.getElementById("feed").appendChild(li);
            }

        });

        return true;
    
        
    }

    else {
        return false;
    }

}

