const socketIo = require('socket.io');
const userModel = require('./users');
const postModel = require('./post');
const commentModel = require('./comment');
function initializeSocket(server) {
    const io = socketIo(server);
    io.on('connection', (socket) => {
        console.log('A user connected');
        socket.on('disconnect', () => {
            console.log('User disconnected');
        });

        // Handle chat message submission
        socket.on('chatMessage', async (data) => {
            const username = data.username;
            const message = data.message;
            const postId = data.postId;
            const user = await userModel.findOne({ username: username });
            const post = await postModel.findOne({postText: postId});
            const newComment = await commentModel.create({
                commentText: message,
                question: post._id,
                user: user._id,
            });
            user.comments.push(newComment._id);
            await user.save();
            post.comments.push(newComment._id);
            await post.save();
            io.emit('chatMessage', { message, timestamp: new Date()});
        });
    });
}
module.exports = initializeSocket;