function animation() {
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
}
function searchAnimation() {
    var area = document.getElementById('searchArea');
    gsap.set(area, {
        scale: 0
    });
    document.querySelector('#open').addEventListener('click', () => {
        gsap.to(area, {
            duration: 1.2,
            scale: 1
        });
    });
    document.querySelector('#close').addEventListener('click', () => {
        gsap.to(area, {
            duration: 0.8,
            scale: 0
        });
    });

}
searchAnimation();
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
function searchChat() {
    let clut = "";
    var input = document.getElementById('searchInput');
    axios.get(`/search/${input.value}`).then(function (data) {
        clut = ""; 
        data.data.forEach(function (elem) {
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
const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
};
let clutter = "";
let clutter2 = "";
async function submitForm(url) {
    try {
        const postData = await axios.get(`/chat/${url}`);
        const post = postData.data.post;
        const comments = postData.data.comments;
        const user = postData.data.user;
        clutter = `<div class="messageSeperator">${post.question}</div>`;
        clutter2 = "";

        comments.forEach(function (comm) {
            var type = (comm.user._id != user._id) ? "you" : "me";
            clutter += `<div class="message ${type}">
                            <p class="messageContent">${comm.commentText}</p>
                            <div class="messageDetails">
                                <div class="messageTime">${formatTime(new Date(comm.createdAt))}</div>
                                <i>@${comm.user.username}</i>
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
document.addEventListener("DOMContentLoaded", function () {
    const socket = io();
    socket.on('chatMessage', (data) => {
        const messageContainer = document.querySelector('.MessageContainer');
        const messages = document.createElement('div');
        var type = (data.username === document.getElementById('username').innerHTML) ? 'me' : 'you';
        messages.innerHTML = `<div class="message ${type}">
                            <p class="messageContent">${data.message}</p>
                            <div class="messageDetails">
                                <div class="messageTime">${formatTime(new Date(data.timestamp))}</div>
                                <i class="fa-solid fa-check"></i>
                            </div>
                        </div>`;
        messageContainer.appendChild(messages);
    })
    const form = document.getElementById('MessageForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const postId = document.getElementById('postId').innerHTML;
        const username = document.getElementById('username').innerHTML;
        const messageInput = document.getElementById('MessageInput');
        const message = messageInput.value.trim();
        if (message !== '') {
            socket.emit('chatMessage', { message, postId, username });
            messageInput.value = '';
        }
    });
});
animation();