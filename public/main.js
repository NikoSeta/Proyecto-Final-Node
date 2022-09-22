const socket = io.connect();

function render(data) {
    const html = data.map((elem, index) => {
        return(`
        <li>
            <img>${elem.avatar}</img>
            <strong>${elem.alias}, ${elem.age}</strong>:
            <p>${elem.time}<p>
            <em>${elem.text}</em>
        </li>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    const message = {
        alias: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', message);
    return false;
}
socket.on('messages', data => {
    render(data);
});