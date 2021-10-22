import { Grid, Button } from '@material-ui/core'
//import Typography from '@material-ui/core/Typography';

export default function Home(){

    return (
        <Grid containter direction="column">
            <Grid item container>
                <Grid item xs={false} sm={2}/>
                <Grid item xs={12} sm={8}>
                    <h1>Tetrabattle</h1>
                    <p>(Iinsert GIF of gameplay here)</p>
                </Grid>
                <Grid item xs={false} sm={2}/>

                <Grid item xs={false} sm={3}/>
                <Grid item xs={12} sm={6}>
                    <h2>Game description</h2>
                    <p align="left">This is a desctiption of the game. This is a desctiption of the game. This is a desctiption of the game. This is a desctiption of the game. This is a desctiption of the game. This is a desctiption of the game. This is a desctiption of the game. This is a desctiption of the game. This is a desctiption of the game. </p>
                </Grid>
                <Grid item xs={false} sm={3}/>

                <Grid item xs={false} sm={3}/>
                <Grid item xs={12} sm={6}>
                    <h2>Game Rules</h2>
                    <div align="left">
                        <li>This is rule number 1. Here is a description of this rule. Here is an example showing this rule in action.</li>
                        <li>This is rule number 2. Here is a description of this rule. Here is an example showing this rule in action.</li>
                        <li>This is rule number 3. Here is a description of this rule. </li>
                        <li>This is rule number 4. Here is a description of this rule. Here is an example showing this rule in action.</li>
                        <li>This is rule number 5. Here is a description of this rule. Here is an example showing this rule in action.</li>
                        <li>This is rule number 6. Here is a description of this rule. Here is an example showing this rule in action.</li>
                        <li>This is rule number 7. Here is a description of this rule. Here is an example showing this rule in action.</li>

                    </div>
                </Grid>
                <Grid item xs={false} sm={3}/>

                <Grid item xs={12} sm={6} style={{align: "center"}}>
                    <Button href="/room">
                        Create a room!
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}