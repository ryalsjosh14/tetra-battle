import { UserContext } from "../UserContext";
import { useContext, useState, useEffect, useCallback, useRef } from "react";

//Perry Add
import React from "react";
import Unity, { UnityContext} from "react-unity-webgl";
//End Perry Add

const unityContext = new UnityContext({
loaderUrl: "Anti-Matter Tetris WEBGL/build/Anti-Matter Tetris.loader.js",
dataUrl: "Anti-Matter Tetris WEBGL/build/Anti-Matter Tetris.data",
frameworkUrl: "Anti-Matter Tetris WEBGL/build/Anti-Matter Tetris.framework.js",
codeUrl: "Anti-Matter Tetris WEBGL/build/Anti-Matter Tetris.wasm",
});


//TODO*** CONVERT WS SERVER TO USING HASHMAP INSTEAD OF ARRAY DUE TO LARGE NUMBER INDICES

const Room = (props) => {

  //Perry Add


    const [isGameOver, setIsGameOver] = useState(false);
    const [gridString, setGridString] = useState("");
    const [didError, setDidError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    var playerNbr = 1;


    useState(function () {
      unityContext.on("GameOver", function () {
        setIsGameOver(true);
        });
      }, []);

    useState(function () {
      unityContext.on("NextPlayer", function (gridString) {
        setGridString(gridString);
        /*if (playerNbr === 1)
        {
          playerNbr = 2;
          unityContext.send("Player2Spawner", "nextPlayer", gridString);
        }
        else {
          playerNbr = 1;
          unityContext.send("Player1Spawner", "nextPlayer", gridString);
        }*/

        });
      }, []);

    function Player1NextTurn()
      {
          unityContext.send("Player1Spawner", "nextPlayer", gridString);
      }


    function Player2NextTurn()
      {
          unityContext.send("Player2Spawner", "nextPlayer", gridString);
      }


    function StartGame()
      {
          unityContext.send("StartGame", "LoadGame",);
      }

    function muteSound()
      {
          unityContext.send("VolumeControl", "muteSound",);
      }

    function decreaseVolume()
      {
          unityContext.send("VolumeControl", "decreaseVolume",);
      }

    function increaseVolume()
      {
          unityContext.send("VolumeControl", "increaseVolume",);
      }

  //End Perry Add


    const { currentUser } = useContext(UserContext);

    const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws'

    const userID = useRef(null); // get from user context
    const gameID = useRef(null);
    const otherUserID = useRef(null);
    const socket = useRef(null);


    const getIdAsInteger = (id) => { // for storing UID in database
        let sum = 0;
        for (let i = 0; i < id.length; i++) {
            sum += id.charCodeAt(i);
        }

        return sum;
    }

    const handshake = async () => { // handshake with other web socket
        let data = await fetch(window.location.protocol + "//" + window.location.hostname + ':8000/game/' + gameID.current, {method: 'GET'});
        data = await data.json();

        otherUserID.current = data.user1; // store partners ID for websocket communications
        sendMessage("-999 " + userID.current); // send ID to partner
    }

    const sendMessage = useCallback((msg) => { // send a message to the wsServer
        console.log("sending")
        socket.current.send(otherUserID.current + " " + msg);
    }, [otherUserID, socket]); // TODO CHECK THESE DEPENDENCIES



    //TODO*** encapsulate the whole process in a function to run on browser load/after currentUser is passed with useEffect() [currentUser]
    useEffect(() => {
        if(!currentUser) //only run if currentUser has been updated
            return;

        // console.log("id: " + props.id);
        const testDuplicate = async () => { // do not want to create duplicate gameID within mongo
            let created = await fetch(window.location.protocol + "//" + window.location.host + '/game/' + props.id, {method: 'GET'});
            console.log(created);
            if(created == null)
                return true;
        }

        userID.current = getIdAsInteger(currentUser.UID); // get from user context

        //CONNECT TO WEB SOCKET SERVER
        socket.current = new WebSocket(wsProtocol + '://' + window.location.hostname + ':5000/' + userID.current);

        socket.current.onmessage = (msg) => { //when receiving a message
            if(parseInt(msg.data) === -999) { // for completing the hanshake
                otherUserID.current = parseInt(msg.data.substr(5));
            }
            console.log("received: " + msg.data + " from userID: " + otherUserID.current); // basic logging in js console
            alert("received: " + msg.data + " from userID: " + otherUserID.current);
        };


        console.log(socket.current);
        if(props.id === null) { // if second user on webpage
            console.log('user ' + userID.current + ' joined room\n');
            console.log(props.match.params.id);
            gameID.current = props.match.params.id; // save game id
            fetch(window.location.protocol + "//" + window.location.hostname + ':8000/game/update/' + gameID.current + "&" + userID.current, {method: 'PATCH'})
            .then(response => response.json())
            .then(data => console.log())
            .catch(error => console.log(error))
            .then(handshake()); // second player to join initiates handshake
        }
        else { //first user on webpage
            if(!testDuplicate)
                return;
            //console.log(window.location.protocol + "//" + window.location.hostname + ':8000/game/create/' + props.id + "&" + userID.current);

            fetch(window.location.protocol + "//" + window.location.hostname + ':8000/game/create/' + props.id + "&" + userID.current, {method: 'GET'})
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
            gameID.current = props.id;
        }
    }, [currentUser]); // run only once on load


    return(
      <div>
        <div>
            {props.id ? <p>hiya. URL is: {window.location.protocol + "//" + window.location.host + "/join_room/" + props.id}</p> : <p></p>}

            {/* <button onClick={ping}>Test web socket...</button> */}
            {/* <button onClick={test}>Test creation of game in db...</button> */}
            <input type="text" onKeyPress={(e) => {
                if(e.key === 'Enter') {
                    sendMessage(e.target.value); // whatever was typed in gets sent on enter press
                    e.target.value = "";
                }
            }}></input>

          <Unity unityContext={unityContext}
              style={{
                  height: "720px",
                  width: "600px",
                  border: "2px solid black",
                  background: "grey",
                  }}
          />

</div>

  <div>
      <div><div><button onClick={Player1NextTurn}>Player 1 Next Turn<br /></button></div>
      <button onClick={Player2NextTurn}>Player 2 Next Turn<br /></button>

      <button onClick={StartGame}>Start Game</button>

      <button onClick={muteSound}>Mute/Unmute</button>
      <button onClick={decreaseVolume}>Volume -</button>
      <button onClick={increaseVolume}>Volume +</button>

    </div>
    </div>

  </div>

    )
}

export default Room;
