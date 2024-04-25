function animation() {
    var tl = gsap.timeline();
    tl.from('.Chat', {
        y: -200,
        opacity:0,
        duration: 2
    });
    tl.from('.me',{
        x:200,
        opacity:0,
        stagger:{
            amount:1
        },
        delay:0.1
    })
    tl.from('.you',{
        x:-200,
        opacity:0,
        stagger:{
            amount:1
        },
        delay:0.1
    })
    tl.to('#back',{
        duration: 1, 
        x: "-10px" ,
        repeat: -1, 
        yoyo: true 
    })
}
const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour12: false });
};
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
                                <i>@${data.username}</i>
                            </div>
                        </div>`;
        messageContainer.appendChild(messages);
        messageContainer.scrollTop = messageContainer.scrollHeight;
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
var ul = document.querySelector('.MessageContainer');
ul.scrollTop = ul.scrollHeight;