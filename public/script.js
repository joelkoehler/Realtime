const socket = io('/');
const avatarGrid = document.getElementById('avatar-grid')
const peer = new Peer(undefined, {
    host: '/',
    port: 3001
});
const myVideo = document.createElement('video')
myVideo.muted = true

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream)

    peer.on('call', call => {
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream('video', userVideoStream)
        })
    })

    socket.on('user-connected', userID => {
        connectToNewUser(userID, stream) // "stream" is the video stream that is SENT to the stranger...consider changing THIS to facial recognicaion or avatar stream
    })
})

peer.on('open',  id => {
    socket.emit('join-room', ROOM_ID, id);
})

socket.on('user-connected', userID => {
    console.log('User connected ' + userID)
})


// Potential ares to change what stream is being sent?
function addVideoStream(video, stream) {
    video.srcObject = stream // allows you to play the video
    video.addEventListener('loadedmetadata', () => { // once stream is loaded on page, then play it
        video.play();
    });
    avatarGrid.append(video) // adds video to grid
}

function connectToNewUser(userID, stream) {
    const call = peer.call(userID, stream) // stream that's being sent to other user
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
    })
    call.on('close', () => {
        video.remove()
    })
}