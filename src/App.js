import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import UserQuery from "./UserQuery";
import {Switch} from "@material-ui/core";
import {baseURL, setBaseURL} from "./utils/baseURL";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
}));

export default function CenteredGrid(props) {
    const classes = useStyles();

    const [checked, setChecked] = React.useState(false)

    const handleChangeEnv = () => {
        setBaseURL(!checked)
        setChecked(!checked)
    }

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Grid item xs={9}>
                    <>
                        <label>
                            <Switch
                                checked={checked}
                                onChange={handleChangeEnv}

                            />
                            Dev
                            {" "}
                            <kbd><small>{baseURL}</small></kbd>
                        </label>
                    </>
                    <Paper className={classes.paper}>
                        <UserQuery/>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}
