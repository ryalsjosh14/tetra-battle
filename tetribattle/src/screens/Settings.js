//import { useState } from 'react';
import { Slider, Grid, Box, Typography } from '@material-ui/core';

//hook to update props.user.settings on form submit here

const Settings = (props) => {
    //ON PAGE LOAD: need to find a way to set state of form elements based on what comes from the stored user config
    // const [val_DAS, set_DAS] = useState(5);
    // const set_DAS_handler = (e, new_val) => {
    //     set_DAS(new_val);
    // }

    return(
        <form>
            <Grid containter item alignItems="center" direction="column">
                
                <Grid item xs={false} sm={2}/>
                <Grid item xs={12} sm={8}>
                    <h1>Settings</h1>
                    <p>customize settings</p>
                </Grid>
                <Grid item xs={false} sm={2}/>

                <Box sx={{width:200}}>
                    <Typography id="das-slider" gutterBottom>
                        DAS
                    </Typography>
                    <Slider width={200} defaultValue={5} valueLabelDisplay="on"  min={1} max={10} step={.1}  />
                </Box>

            </Grid>
        </form>
    )
}

export default Settings;