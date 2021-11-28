import { UserContext } from "../UserContext";
import { useContext } from "react";

const Room = (props) => {

    const { currentUser, setCurrentUser } = useContext(UserContext);

    const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws'

    let userID = 1; // get from user context
    let gameID;
    let otherUserID;

    //CONNECT TO WEB SOCKET SERVER
    let socket;
    if (props.id !== null) //temp for testing
        socket = new WebSocket(wsProtocol + '://' + window.location.hostname + ':5000/' + userID);

    const sendMessage = (msg) => {
        console.log("sending")
        socket.send(otherUserID + " " + msg);
    }

    const handshake = async () => {
        let data = await fetch(window.location.protocol + "//" + window.location.hostname + ':8000/game/' + gameID, {method: 'GET'});
        data = await data.json();
        
        otherUserID = data.user1; // store partners ID for websocket communications
        sendMessage("-999 " + userID); // send ID to partner
    }

    if(props.id === null) {
        userID = 2; //temp for testing
        socket = new WebSocket(wsProtocol + '://' + window.location.hostname + ':5000/' + userID); // temp for testing
        console.log('user ' + userID + ' joined room\n');
        gameID = props.match.params.id; // save game id
        fetch(window.location.protocol + "//" + window.location.hostname + ':8000/game/update/' + gameID + "&" + userID, {method: 'PATCH'})
        .then(response => response.json())
        .then(data => console.log())
        .catch(error => console.log(error))
        .then(handshake()); // second player to join initiates handshake       
    }
    else {
        //***CHECK IF CREATED GAME WOULD BE DUPLICATE;;; crashes server rn :/
        console.log(window.location.protocol + "//" + window.location.hostname + ':8000/game/create/' + props.id + "&" + userID);
        //, headers: {'Content-Type': 'text/html'}
        fetch(window.location.protocol + "//" + window.location.hostname + ':8000/game/create/' + props.id + "&" + userID, {method: 'GET'})
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
        gameID = props.id;
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

    socket.onmessage = (msg) => {
        if(parseInt(msg.data) === -999) { // for completing the hanshake
            otherUserID = parseInt(msg.data.substr(5));
        }
        console.log("received: " + msg.data); // basic logging in js console
    };

    return(
        <div>
            <p>Set options for game here, before actually going to the gameplay room?</p>
            <p>hiya. URL is: {window.location.protocol + "//" + window.location.host + "/join_room/" + gameID}</p>

            {/* <button onClick={ping}>Test web socket...</button> */}
            {/* <button onClick={test}>Test creation of game in db...</button> */}
            <input type="text" onKeyPress={(e) => { 
                if(e.key === 'Enter') {
                    sendMessage(e.target.value); // whatever was typed in gets sent on enter press
                    e.target.value = "";
                }
            }}></input>
        </div>
    )
}

export default Room;