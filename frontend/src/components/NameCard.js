import React from 'react'; 
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import '../App.css'; 

// COMPONENTS
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: 'center',
      color: theme.palette.text.secondary,
      backgroundColor: '#114070',
      height: 170, 
      width: 500, 
      margin: 25, 
    },
    picture: {
        height: 155, 
        marginTop: 5, 
        float: 'left',
        marginLeft: 20, 
    }, 
    nameHeader: {
        fontSize: 25,
        float: 'left', 
        marginLeft: 30,  
        display: 'inline-block', 
        color: 'white', 
    }, 
    school: {
        display: 'inline-block', 
        marginTop: -2, 
        float: 'left', 
        marginLeft: 30,  
        color: 'white', 
    }, 
    role: {
        display: 'inline-block', 
        marginTop: -1,
        float: 'left', 
        marginLeft: 30,  
        color: 'white', 
    }
}));

export const NameCard = ({ picture, name, school, role }) => {
    const classes = useStyles(); 

    return (
        <div>
            <Paper className={classes.paper}>
                <img 
                    src={picture} 
                    className={classes.picture}
                />
                <div>
                    <h1 className={classes.nameHeader} id="home-name-header">{name}</h1>
                    <p className={classes.school} id="home-school-header">{school}</p>
                    <p className={classes.role} id="home-role-header">{role}</p>
                </div>
            </Paper>
        </div>
    )
}
