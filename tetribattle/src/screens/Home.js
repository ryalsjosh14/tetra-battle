import { Grid, Button } from '@material-ui/core'
import demo from '../assets/demo2.gif';
//import Typography from '@material-ui/core/Typography';

export default function Home(){

    return (
        <Grid containter direction="column">
            <Grid item container style={{paddingBottom:'80px'}}>
                <Grid item xs={false} sm={2}/>
                <Grid item xs={12} sm={8}>
                    <h1>Anti-Matter Tetris</h1>
                    <h3>A multiplayer, turn-based <i>Tetris</i> variant</h3>
                    <img src={demo} alt='demo'/>
                </Grid>
                <Grid item xs={false} sm={2}/>

                <Grid item xs={false} sm={3}/>
                <Grid item xs={12} sm={6}>
                    <h2>How to start a game</h2>
                    <p align="left">
                        First, create an account and log in <br />
                        Then, click the play button at the top right and send the given URL to your opponent <br />
                        Once you see "Opponent: has joined the room!" in the chat, click the start game button to begin playing!
                    </p>
                </Grid>
                <Grid item xs={false} sm={3}/>

                <Grid item xs={false} sm={3}/>
                <Grid item xs={12} sm={6}>
                    <h2>Gameplay description</h2>
                    <p align="left">
                        The biggest difference from normal <i>Tetris</i> is that both players share the same gameboard. <br />
                        One player places tetrominoes from the top, and the other places tetrominoes from the bottom (because their board is mirrored, they still see it placed from the top). <br />
                        The goal is to clear to the bottom of your board, pushing the other player to the top of theirs. <br />
                        To do this, you must clear an entire row by making every tile the same color. Every time you clear a row, the boundary moves down. <br />
                        If it gets to the point when one player does not fit on the board, then the other player wins. <br />
                    </p>
                </Grid>
                <Grid item xs={false} sm={3}/>

                <Grid item xs={false} sm={3}/>
                <Grid item xs={12} sm={6}>
                    <h2>Default Controls</h2>
                    <div align="left">
                        <li>Space Bar - Hard drop: makes the tetromino fall instantly</li>
                        <li>Down Arrow Key - Soft drop: makes the tetromino fall faster than normal</li>
                        <li>Up Arrow Key - Rotate: Rotates the tetromino clockwise, if possible</li>
                        <li>Left/Right Arrow Keys - Move: makes the tetromino shift sideways, faster if held</li>
                    </div>
                </Grid>
                <Grid item xs={false} sm={3}/>
            </Grid>
        </Grid>
    )
}