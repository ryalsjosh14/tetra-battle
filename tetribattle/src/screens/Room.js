//import WebSocket from 'ws';


const Room = (props) => {

    //if joining another player's room, get the id from the url
    if(props.id === null) {
        console.log('joined room\n');
        props.id = this.props.match.params.id;
        //send post request to game/update?user2={USER ID};
    }

    //CONNECT TO WEB SOCKET SERVER

    const userID = 1; // get from user context

    const socket = new WebSocket("ws://localhost:5000/" + userID);

    socket.onmessage = (msg) => {
        console.log(msg);
    };

    const ping = () => {
        console.log('pinging...\n');
        socket.send('hi from: ' + props.id);
    }


    return(
        <div>
            <p>Set options for game here, before actually going to the gameplay room?</p>
            <p>hiya. URL is: {props.id}</p>

            <button onClick={ping}>Test web socket...</button>
        </div>
    )
}

export default Room;