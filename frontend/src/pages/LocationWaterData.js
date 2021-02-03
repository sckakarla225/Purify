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
    const [locationData, setLocationData] = useState({
		"Native Name": "Aha Quin",
		"Native Violations": 1,
		"Non-Native Names": ["99 PALMS INN AND SUITES", "SAC VALLEY TRUCK STOP", "GOOSELAKE WATER COMPANY", "SHANT BHAVAN PUNJABI FUNERAL HOME", "RANCHO ESTATES MUTUAL WATER CO.", "SIERRA EAST HOA", "PLAINVIEW MUTUAL WATER COMPANY", "WINSHIP ELEMENTARY SCHOOL", "JACUMBA VALLEY RANCH WATER COMPANY", "LAIRD FAMILY ESTATE", "ROUND MOUNTAIN WATER COMPANY", "OLD SUGAR MILL WINERY", "STOCKTON BAPTIST CHURCH"],
		"Non-Native Violations": [3, 3, 8, 4, 14, 44, 6, 18, 1, 3, 21, 76, 17],
		"Rank": 13,
		"Total Rank": 14,
		"Percentile": 7.140000000000001,
		"Latitude": 33.628333,
		"Longitude": -114.61905,
		"Embed": ["https://plotly.com/~amotiani22/86.embed", "https://plotly.com/~amotiani22/88.embed", "https://plotly.com/~amotiani22/65.embed", "https://plotly.com/~amotiani22/67.embed"]
	});

    const classes = useStyles();

    useEffect(() => {
        const index = Object.keys(locations).indexOf(locationID);
        const locationData = Object.values(locations)[index]; 
        setLocationData(locationData);
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
                                <iframe id="igraph" scrolling="no" style={{ border: "none" }} seamless="seamless" src={locationData["Embed"][0]} height="525" width="100%"></iframe>
                            </Grid>
                            <Grid item xs={12}>
                                <iframe id="igraph" scrolling="no" style={{ border: "none" }} seamless="seamless" src={locationData["Embed"][1]} height="525" width="100%"></iframe>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={5}>
                    <Card className={classes.root}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <iframe id="igraph" scrolling="no" style={{ border: "none" }} seamless="seamless" src={locationData["Embed"][2]} height="525" width="100%"></iframe>
                            </Grid>
                            <Grid item xs={12}>
                                <iframe id="igraph" scrolling="no" style={{ border: "none" }} seamless="seamless" src={locationData["Embed"][3]} height="525" width="100%"></iframe>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            <Link to="/">GO TO HOME</Link>
        </div>
    )
}
