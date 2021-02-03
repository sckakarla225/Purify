import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams } from 'react-router-dom';
import logo from '../logo.svg';
import PropTypes from 'prop-types';
import '../App.css';

// UI
import Drawer from '@material-ui/core/Drawer';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';

// COMPONENTS
import { Menu } from '../components/Menu';
import { requirePropFactory } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

// CONTEXT
import { WaterContext } from '../context/WaterContext';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
});

export const LocationWaterData = () => {
    const { locationID } = useParams();
    const { locations, getLocations } = useContext(WaterContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [locationData, setLocationData] = useState({});
    const [embedLinks, setEmbedLinks] = useState([]);

    const classes = useStyles();

    useEffect(() => {
        Object.values(locations).map((location) => {
            if (location["PWSID"] === locationID) {
                setEmbedLinks(location["Embed"]);
            }
        });
        // const index = Object.keys(locations).indexOf(locationID);
        // const locationData = Object.values(locations)[index]; 
        // setLocationData(locationData);
    }, []);

    return (
        <div>
            <Drawer anchor='left' open={menuOpen} onClose={() => setMenuOpen(false)}>
                <div>
                    <div className="row">
                        <MenuRoundedIcon
                            style={{ fontSize: 50 }}
                            onClick={() => setMenuOpen(false)}
                        ></MenuRoundedIcon>
                    </div>
                    <div className="row">
                        <img src={logo} className="menu-logo" />
                        <h1 className="menu-header">PURIFY</h1>
                        <div className="menu-buttons-container">
                            <Link to="/" className="menu-buttons">HOME</Link>
                            <Link to="/map" className="menu-buttons">WATER MAP</Link>
                        </div>
                    </div>
                    <p>CA Water Data Challenge</p>
                </div>
            </Drawer>
            <MenuRoundedIcon
                style={{ fontSize: 50 }}
                onClick={() => setMenuOpen(true)}
            ></MenuRoundedIcon>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <Card className={classes.root}>
                        <h1>Leaderboard</h1>
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    <Card className={classes.root}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <iframe id="igraph" scrolling="no" style={{ border: "none" }} seamless="seamless" src={embedLinks[0]} height="525" width="100%"></iframe>
                            </Grid>
                            <Grid item xs={12}>
                                <iframe id="igraph" scrolling="no" style={{ border: "none" }} seamless="seamless" src={embedLinks[1]} height="525" width="100%"></iframe>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    <Card className={classes.root}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <iframe id="igraph" scrolling="no" style={{ border: "none" }} seamless="seamless" src={embedLinks[2]} height="525" width="100%"></iframe>
                            </Grid>
                            <Grid item xs={12}>
                                <iframe id="igraph" scrolling="no" style={{ border: "none" }} seamless="seamless" src={embedLinks[3]} height="525" width="100%"></iframe>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            <Link to="/">GO TO HOME</Link>
        </div>
    )
}
