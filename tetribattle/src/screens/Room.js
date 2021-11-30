import { UserContext } from "../UserContext";
import { useContext, useState, useEffect, useCallback, useRef } from "react";

//Perry Add
import React from "react";
import Unity, { UnityContext} from "react-unity-webgl";
import SelectInput from "@material-ui/core/Select/SelectInput";
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
    var gameStarted = 0;


    useState(function () {
      unityContext.on("GameOver", function () {
        setIsGameOver(true);
        });
      }, []);

    useState(function () {
      unityContext.on("NextPlayer", function (gridString) {
        setGridString(gridString);

        if (otherUserID.current != null)
          {
            console.log("send message");
            sendMessage('-998 ' + gridString); // send grid to other player
          } else
            {
              if (playerNbr === 1)
                {
                  playerNbr = 2;
                  unityContext.send("Player2Spawner", "nextPlayer", gridString);
                }
                  else
                    {
                      playerNbr = 1;
                      unityContext.send("Player1Spawner", "nextPlayer", gridString);
                    }
              }
        });
      }, []);

    function Player1NextTurn()
      {
          unityContext.send("Player1Spawner", "nextPlayer", gridString);
      }


    function Player2NextTurn()
      {
          if (gameStarted === 0)
                StartGame()
            else
                unityContext.send("Player2Spawner", "nextPlayer", gridString);
      }


      function StartGame()
        {
            if (playerNum.current !== 2)
              {
                  unityContext.send("StartGame", "LoadGame","AAA");
              } else {
                  unityContext.send("StartGame", "LoadGame",gridString);
              }

              gameStarted = 1;
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

    const port = window.location.protocol === 'https:' ? '' : ':8000'; // heroku or local
    const wsPort = window.location.protocol === 'https:' ? '' : ':3000';
    const wsProtocol = window.location.protocol === 'https:' ? 'wss' : 'ws'

    const userID = useRef(null); // get from user context
    const gameID = useRef(null);
    const otherUserID = useRef(null);
    const socket = useRef(null);
    const playerNum = useRef(null);


    const getIdAsInteger = (id) => { // for storing UI  D in database
        let sum = 0;
        for (let i = 0; i < id.length; i++) {
            sum += id.charCodeAt(i);
        }

        return sum;
    }

    const handshake = async () => { // handshake with other web socket
        let data = await fetch(window.location.protocol + "//" + window.location.hostname + port + '/game/' + gameID.current, {method: 'GET'});
        data = await data.json();

        otherUserID.current = data.user1; // store partners ID for websocket communications
        sendMessage("-999 " + userID.current); // send ID to partner
    }

    const sendMessage = useCallback((msg) => { // send a message to the wsServer
        //console.log("sending")
        socket.current.send(otherUserID.current + " " + msg);
    }, [otherUserID, socket]); // TODO CHECK THESE DEPENDENCIES


    useEffect(() => {
        if(!currentUser) //only run if currentUser has been updated
            return;

        //console.log("id: " + props.id);
        const testDuplicate = async () => { // do not want to create duplicate gameID within mongo
            let created = await fetch(window.location.protocol + "//" + window.location.hostname + port + '/game/' + props.id, {method: 'GET'});
            created = await created.json();
            console.log(created);
            if(created === null)
                return true;
            return false;
        }

        const init = async () => {
            if(props.id === null) { // if second user on webpage
                //console.log('user ' + userID.current + ' joined room\n');
                //console.log(props.match.params.id);
                console.log("in second user if")
    
                playerNum.current = 2;
                gameID.current = props.match.params.id; // save game id
                fetch(window.location.protocol + "//" + window.location.hostname + ':8000/game/update/' + gameID.current + "&" + userID.current, {method: 'PATCH'})
                .then(response => response.json())
                //.then(data => console.log(data))
                .catch(error => console.log(error))
                .then(handshake()); // second player to join initiates handshake
            }
            else { //first user on webpage
              console.log("in first user if")

              let created = await testDuplicate();
              console.log(created);
                if(!created){
                    console.log("returning");
                    return;
                }
                //console.log(window.location.protocol + "//" + window.location.hostname + ':8000/game/create/' + props.id + "&" + userID.current);
                playerNum.current = 1;
    
                fetch(window.location.protocol + "//" + window.location.hostname + ':8000/game/create/' + props.id + "&" + userID.current, {method: 'GET'})
                .then(response => response.json())
                .then(data => {
                  //console.log(data)
                  //console.log("successfully made request")
                })
                .catch(error => console.log(error));
                gameID.current = props.id;
            }
        }

        userID.current = getIdAsInteger(currentUser.UID); // get from user context

        //CONNECT TO WEB SOCKET SERVER
        //socket.current = new WebSocket(wsProtocol + '://' + window.location.hostname + wsPort + '/' + userID.current);
        socket.current = new WebSocket(wsProtocol + '://' + window.location.hostname + ':5000/' + userID.current);

        init(); // create game db entry and assign playerNum

        socket.current.onmessage = (msg) => { //when receiving a message
            if(parseInt(msg.data) === -999) { // for completing the hanshake
                otherUserID.current = parseInt(msg.data.substr(5));
            }

            if(parseInt(msg.data) === -998) { // for receiving grid
                console.log("gridstring: " + msg.data.substr(5));
                setGridString(msg.data.substr(5)); // set the grid string based on what is received

                if(playerNum.current === 1) // send to respective player
                  {
                    Player1NextTurn();
                  }
                else if(playerNum.current === 2)
                  {
                    Player2NextTurn();
                  }
            }

            console.log("received: " + msg.data + " from userID: " + otherUserID.current); // basic logging in js console
            //alert("received: " + msg.data + " from userID: " + otherUserID.current);
        };


        //console.log(socket.current);

    }, [currentUser]); // run when currentUser is updated

    let startGameButton;
    if (playerNum !== 2 && gameStarted === 0){
      startGameButton = (<button onClick={StartGame}>Start Game</button>)
    }

    return(
    <div>
        <div>
            {props.id ? <p>Link to join: {window.location.protocol + "//" + window.location.host + "/join_room/" + props.id}</p> : <p></p>}

            {/*<input type="text" onKeyPress={(e) => {
                if(e.key === 'Enter') {
                    sendMessage(e.target.value); // whatever was typed in gets sent on enter press
                    e.target.value = "";
                }
            }}></input>*/}

            {/* {props.id ? <p>Player 1</p>:<p>Player 2</p>} */}
            {props.id ? 
            <div>
                <p>Player 1</p>
                <Unity unityContext={unityContext}
                    style={{
                        height: "720px",
                        width: "600px",
                        border: "2px solid black",
                        background: "grey",
                    }}
                />
            </div>
            :
            <div>
                <p>Player 2</p>
                <Unity unityContext={unityContext}
                    style={{
                        height: "720px",
                        width: "600px",
                        border: "2px solid black",
                        background: "grey",
                    }}
                />
            </div>
            }
        </div>

    {startGameButton}
    <div><button onClick={muteSound}>Mute/Unmute</button>
    <button onClick={decreaseVolume}>Volume -</button>
    <button onClick={increaseVolume}>Volume +</button>

    </div>


    </div>

    )
}

export default Room;
