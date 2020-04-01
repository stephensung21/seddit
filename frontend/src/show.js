import API_URL from './backend_url.js';

export function showComments(apiUrl, post){
    
    let commentDiv = document.createElement("div");
    let commentTitle = document.createElement("h3");
    let addCommentTitle = document.createElement("h3");
    addCommentTitle.appendChild(document.createTextNode("Add your Own Comment"));
    commentTitle.appendChild(document.createTextNode("Post's comments"));
    
    //let userLogIn = document.getElementsByClassName("button-primary");

    commentDiv.setAttribute("id", "id01");
    commentDiv.setAttribute("id", "commentDiv");
    commentDiv.classList.add("modal");
    let commentForm = document.createElement("form");
    commentForm.setAttribute("id","commentForm");
    commentForm.classList.add("comments-modal-content");

    let commentContainer = document.createElement("div");  

    //making the commenting textarea
    let commentInput = document.createElement("textarea");
    commentInput.setAttribute("id", "commentText");
    commentInput.setAttribute("name", "commentText");
    commentInput.setAttribute("placeholder", "What do you want to comment?");

    //making the add comment button
    let commentButton = document.createElement("button");
    commentButton.setAttribute("type", "button");
    commentButton.setAttribute("id", "upload-button");
    commentButton.addEventListener("click", () => postComment(post.id, commentForm));
    commentButton.appendChild(document.createTextNode("Add a Comment!"));

    commentContainer.appendChild(addCommentTitle);
    commentContainer.appendChild(commentInput);
    commentContainer.appendChild(commentButton);
    commentContainer.appendChild(commentTitle);

    let postCommentsContainer = document.createElement("div");
    commentContainer.appendChild(postCommentsContainer);

    //adding the comments of the post
    let postCommentDiv = document.createElement("div");

    let array = post.comments;
   
    //if there are no comments
    if (array.length === 0) {
        let noCommentTitle = document.createElement("h3");
        noCommentTitle.appendChild(document.createTextNode("No comments to be shown"));
        
        postCommentDiv.appendChild(noCommentTitle);
        postCommentsContainer.appendChild(postCommentDiv);
    
    }
    //if there are comments
    else {
        let sorted_array_comments = array.slice().sort((a,b) => parseFloat(b.published) - parseFloat(a.published));

        for (let i = 0; i < sorted_array_comments.length; i++) {

            let commenterTitle = document.createElement("h4");
            let commenterDate = document.createElement("h5");
            let commenterBody = document.createElement("p");

            let publishedCommentDate = new Date(parseFloat(sorted_array_comments[i].published)*1000);

            console.log(publishedCommentDate);

            commenterTitle.appendChild(document.createTextNode("By "+sorted_array_comments[i].author));
            //let actualCommentDate = publishedCommentDate.getDate() + "/" + publishedCommentDate.getDate().getMonth() + "/" + publishedCommentDate.getDate().getFullYear() + " " + publishedCommentDate.getDate().getHours() + ":" + publishedCommentDate.getDate().getMinutes();
            commenterDate.appendChild(document.createTextNode(`Posted on ${publishedCommentDate}`));
            commenterBody.appendChild(document.createTextNode(sorted_array_comments[i].comment));

            postCommentDiv.appendChild(commenterTitle);
            postCommentDiv.appendChild(commenterDate);
            postCommentDiv.appendChild(commenterBody);


        }


        postCommentsContainer.appendChild(postCommentDiv);
    
    }


    commentForm.appendChild(commentContainer);
    commentDiv.appendChild(commentForm);

    document.getElementById("root").appendChild(commentDiv);

    commentDiv.style.display= "block";

    window.onclick = function(event) {

        if (event.target == commentDiv) {
            commentDiv.style.display= "none";
        }

    }
}



export function showVotes(post, apiUrl) {

    //making the showVotes Modal
    let showVoteDiv = document.createElement("div");
    let showVoteTitle = document.createElement("h3");
    showVoteTitle.appendChild(document.createTextNode("Who Has Upvoted"));
    

    showVoteDiv.setAttribute("id", "id01");
    showVoteDiv.classList.add("modal");
    let showVoteForm = document.createElement("div");
    showVoteForm.setAttribute("id","showVoteForm");
    showVoteForm.classList.add("comments-modal-content");
    showVoteForm.appendChild(showVoteTitle);

    //getting who has upvoted a post
    let showVoteContainer = document.createElement("div");
    let tokenU = localStorage.getItem("loginUser");

    const options = {
        method : 'GET',
        headers : {
            'Authorization': `Token ${tokenU}`
        }
    }
    
    let array = post.meta.upvotes;

    if (array.length === 0) {

        let noVotes = document.createElement("h4");
        noVotes.appendChild(document.createTextNode("No one has Upvoted"));

        showVoteContainer.appendChild(noVotes);

        showVoteForm.appendChild(showVoteContainer);
        //console.log("nothing htere");
    }

    else {

        for (let i = 0; i < array.length; i++) {

            fetch(`${apiUrl}/user/?id=${array[i]}`, options)
            .then(resp => resp.json())
            .then(user => {

                let votedName = document.createElement("p");
                votedName.appendChild(document.createTextNode(`${user.username}`));

                showVoteContainer.appendChild(votedName);
                
                //console.log(user);
        
            });

        }
        showVoteForm.appendChild(showVoteContainer);

        
    }


    showVoteDiv.appendChild(showVoteForm);
    

    document.getElementById("root").appendChild(showVoteDiv);

    showVoteDiv.style.display= "block";

    window.onclick = function(event) {

        if (event.target == showVoteDiv) {
            showVoteDiv.style.display= "none";
        }

    }


}

function postComment(postID, form) {
    //id of the post, authorisation, comment

    let comment = form.elements["commentText"].value;
    let token = localStorage.getItem("loginUser");

    const details = {
        comment: comment
    }

    const options = {
        method: 'PUT',
        body: JSON.stringify(details),
        headers: {
            'Authorization': `Token ${token}`,
            'Content-type': 'application/json'
        }
    }
    console.log("here");
    fetch(`${API_URL}/post/comment?id=${postID}`, options)
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
            document.getElementById("commentDiv").style.display = "none";
            //console.log("asd");
        }
    })
    .catch((error) => {
        console.log(error);
    });

}


