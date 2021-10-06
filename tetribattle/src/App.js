import { w3cwebsocket } from 'websocket';
import Home from './screens/Home'
import './App.css';

//currently fails if server is offline before client connects, but that should not matter since clients will be connecting to server intermittently ->
//and not the other way around: server always running, clients not.

const client = new w3cwebsocket('ws://localhost:8000'); //all of this does not belong here, but is staying here for now 
const UID = Math.floor(Math.random() * 100); 

client.onopen = () => console.log("Connected to WebSocket");
client.onmessage = (msg) => console.log(msg.data);
function send() {
  client.readyState === 1 ? client.send(JSON.stringify({user: UID, data: 'Test client message'})) : console.log("Server not running");
}

function App() {
  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

export default App;
