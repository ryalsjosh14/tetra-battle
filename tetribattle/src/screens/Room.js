const Room = (props) => {

    let userID = 1; // get from user context
    let gameID;
    //if joining another player's room, get the id from the url
    if(props.id === null) {
        userID = 2; //temp for testing
        console.log('user ' + userID + ' joined room\n');
        gameID = props.match.params.id;
        fetch(window.location.protocol + "//" + window.location.host + '/game/update/' + gameID + "&" + userID, {method: 'PATCH'})
        .then(response => response.json())
        .then(data => console.log())
        .catch(error => console.log(error));
        
    }
    else {
        //***CHECK IF CREATED GAME WOULD BE DUPLICATE;;; crashes server rn :/
        fetch(window.location.protocol + "//" + window.location.host + '/game/create/' + props.id + "&" + userID, {method: 'GET'})
        .then(response => response.json())
        .then(data => console.log())
        .catch(error => console.log(error));
        gameID = props.id;
    }

    //CONNECT TO WEB SOCKET SERVER

    const socket = new WebSocket("ws://localhost:5000/" + userID);

    socket.onmessage = (msg) => {
        console.log(msg);
    };

    const ping = () => {
        console.log('pinging...\n');
        socket.send('hi from: ' + gameID);
    }

    /*const test = async () => {
        let created = await fetch(window.location.protocol + "//" + window.location.host + '/game/' + props.id, {method: 'GET'});
        console.log(created);
        if(created == null) {
            fetch(window.location.protocol + "//" + window.location.host + '/game/create/' + props.id + "&" + userID, {method: 'GET'})
            .then(response => response.json())
            .then(data => console.log())
            .catch(error => console.log(error));
        }
    }*/


    return(
        <div>
            <p>Set options for game here, before actually going to the gameplay room?</p>
            <p>hiya. URL is: {window.location.protocol + "//" + window.location.host + "/join_room/" + gameID}</p>

            <button onClick={ping}>Test web socket...</button>
            {/* <button onClick={test}>Test creation of game in db...</button> */}
        </div>
    )
}

export default Room;