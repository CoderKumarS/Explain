gsap.to(".sideNav1 li", {
    delay: 0.5,
    duration: 1,
    y: 0,
    opacity: 1,
    stagger: 0.2
})
gsap.to('.sideNav1', {
    y: 0,
    duration: 0.5,
    delay: 0.1,
    opacity: 1
});
gsap.from('.sideNav2', {
    x: -1000,
    duration: 2
});
gsap.from('.Chat', {
    x: 2000,
    duration: 2
});

function closeSearchArea() {
    // gsap.from('.searchArea', {
    //     x: 0,
    //     duration: 1,
    //     opacity: 1
    // });
    document.getElementById('searchArea').style.display = 'none';
}
function showSearchArea() {
    document.getElementById('searchArea').style.display = 'flex';
}
let clut = "";
function searchChat() {
    var input = document.getElementById('searchInput');
    axios.get(`/search/${input.value}`).then(function (data) {
        console.log(data.data);
        data.data.forEach(function (elem) {
            clut = "";
            clut += `<a href="/users/${elem._id}">
                    <div>
                        <div>
                            <img src ="/images/uploads/${elem.profile}" alt = "profile">
                        </div>
                        <div>
                            <h2>${elem.fullname}</h2>
                            <p>${elem.username}</p>
                        </div>
                    </div>
                    </a>`;
        })
        document.getElementById('searchResults').innerHTML = clut;
    })
}

let clutter = "";
let clutter2 = "";
let postId = "";//----------------
let postText = "";//----------------
// function submitForm(url) {
//     axios.get(`/chat/${url}`).then(async function (data) {
//         clutter = `<div class="messageSeperator">${data.data.question}</div>`;
//         clutter2 = "";
//         postId = data.data._id;//---------------
//         const postWithComments = await postModel.findById(postId).populate('comments');
//         const comments = postWithComments.comments.reverse(); // Reverse comments if needed

//         comments.reverse().forEach(function (comm) {
//             clutter += `<div class="message you">
//                                 <p class="messageContent">${comm.commentText}</p>
//                                 <div class="messageDetails">
//                                     <div class="messageTime">3:30 PM</div>
//                                     <i class="fa-solid fa-check"></i>
//                                 </div>
//                             </div>`;
//         })
//         clutter2 = `<li class="group">
//             <div class="avatar"><img src="/images/uploads/${data.data.user.profile}" alt=""></div>
//             <p class="GroupName">${data.data.postText}</p>
//         </li>`;
//         document.querySelector(".MessageContainer").innerHTML = clutter;
//         document.querySelector(".ChatHead").innerHTML = clutter2;
//     })
// }
// // -----------------
async function submitForm(url) {
    try {
        const postData = await axios.get(`/chat/${url}`);
        const post = postData.data.post;
        const comments = postData.data.comments;
        const user = postData.data.user;

        clutter = `<div class="messageSeperator">${post.question}</div>`;
        clutter2 = "";
        postId = post._id;
        postText = post.postText;

        comments.forEach(function (comm) {
            clutter += `<div class="message you">
                            <p class="messageContent">${comm.commentText}</p>
                            <div class="messageDetails">
                                <div class="messageTime">3:30 PM</div>
                                <i class="fa-solid fa-check"></i>
                            </div>
                        </div>`;
        });

        clutter2 = `<li class="group">
                        <div class="avatar overflow-hidden" style="padding: 0;">
                            <img class ="object-fit-cover p-0" src="/images/uploads/${user.profile}" alt="">
                        </div>
                        <p class="GroupName" id="postId">${post.postText}</p>
                    </li>`;

        document.querySelector(".MessageContainer").innerHTML = clutter;
        document.querySelector(".ChatHead").innerHTML = clutter2;
    } catch (error) {
        console.error('Error fetching chat:', error);
    }
}