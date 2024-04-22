{/* <script> */ }
// Connect to the server
var socket = io();

function sendComment(e) {
    e.preventDefault();
    const commentInput = document.getElementById("MessageInput").value;
    if (!commentInput.trim()) {
        return; // Don't send empty comments
    }
    axios.post('/comments', {
        postId: postId,
        comment: commentInput
    }).then(function (response) {
        // Handle successful comment submission
        console.log('Comment submitted successfully:', response);

        // Emit a 'newComment' event to the server
        socket.emit('newComment', {
            postId: postId,
            comment: commentInput
        });

        // Optionally, you can redirect to the same page
        // window.location.href = `/chat/${postText}`; // Redirect to chat page
    }).catch(function (error) {
        // Handle error
        console.error('Error submitting comment:', error);
    });
}

// Listen for the 'newComment' event from the server
socket.on('newComment', function (data) {
    // Add the new comment to the chat
    const newComment = `<div class="message you">
                                    <p class="messageContent">${data.comment}</p>
                                    <div class="messageDetails">
                                        <div class="messageTime">3:30 PM</div>
                                        <i class="fa-solid fa-check"></i>
                                    </div>
                                </div>`;
    document.querySelector(".MessageContainer").innerHTML += newComment;
});
{/* </script> */ }
{/* <script> */ }

function sendComment() {
    const commentInput = document.getElementById("MessageInput").value;
    if (!commentInput.trim()) {
        return; // Don't send empty comments
    }
    axios.post('/comments', {
        postId: postId,
        comment: commentInput
    }).then(function (response) {
        // Handle successful comment submission
        console.log('Comment submitted successfully:', response);
        // Optionally, you can redirect to the same page
        window.location.href = `/chat/${postText}`; // Redirect to chat page
    }).catch(function (error) {
        // Handle error
        console.error('Error submitting comment:', error);
    });
}
{/* </script> */ }


// animayion
// Toggle button
{ //js
    // const toggleButton = document.getElementById('toggleButton');

    // // Animated div
    // const animatedDiv = document.getElementById('animatedDiv');

    // // Initial state of the div
    // let isOpen = true;

    // // Toggle function
    // function toggleDiv() {
    //     if (isOpen) {
    //         // Animation to hide the div
    //         gsap.to(animatedDiv, {
    //             duration: 0.5, width: 0, height: 0, onComplete: () => {
    //                 animatedDiv.style.display = 'none';
    //             }
    //         });
    //     } else {
    //         // Make div visible
    //         animatedDiv.style.display = 'block';
    //         // Animation to show the div
    //         gsap.to(animatedDiv, { duration: 0.5, width: 100, height: 80 });
    //     }

    //     // Update the state
    //     isOpen = !isOpen;
    // }

    // // Event listener for the toggle button
    // toggleButton.addEventListener('click', toggleDiv);
}
{ // css
    // #animatedDiv {
    //     width: 100px;
    //     height: 80px;
    //     background-color: red;
    //     display: block;
    //   }

}
{ //html
//     <button id="toggleButton">Toggle Div</button>
// <div id="animatedDiv"></div>

}