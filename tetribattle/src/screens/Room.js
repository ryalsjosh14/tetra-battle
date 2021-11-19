const Room = (props) => {

    const userID = 1; // get from user context

    //if joining another player's room, get the id from the url
    if(props.id === null) {
        console.log('joined room\n');
        props.id = this.props.match.params.id;
        //send post request to game/update?user2={USER ID};
    }
    else {
        fetch('http://localhost:8000/game/create/' + props.id + "&" + userID, {method: 'GET'})
        .then(response => response.json())
        .then(data => console.log())
        .catch(error => console.log(error));
    }

    //CONNECT TO WEB SOCKET SERVER

    const socket = new WebSocket("ws://localhost:5000/" + userID);

    socket.onmessage = (msg) => {
        console.log(msg);
    };

    const ping = () => {
        console.log('pinging...\n');
        socket.send('hi from: ' + props.id);
    }

    const test = async () => {
        let created = await fetch('http://localhost:8000/game/' + props.id, {method: 'GET'});
        console.log(created);
        if(created == null) {
            fetch('http://localhost:8000/game/create/' + props.id + "&" + userID, {method: 'GET'})
            .then(response => response.json())
            .then(data => console.log())
            .catch(error => console.log(error));
        }
    }


    return(
        <div>
            <p>Set options for game here, before actually going to the gameplay room?</p>
            <p>hiya. URL is: {props.id}</p>

            <button onClick={ping}>Test web socket...</button>
            <button onClick={test}>Test creation of game in db...</button>
        </div>
    )
}

export default Room;