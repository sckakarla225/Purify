import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams } from 'react-router-dom';
import logo from '../logo.svg';
import PropTypes from 'prop-types';
import '../App.css';

// UI
import Drawer from '@material-ui/core/Drawer';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

// COMPONENTS
import { Menu } from '../components/Menu';
import { StandingPlace } from '../components/StandingPlace';
import { requirePropFactory } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';

// CONTEXT
import { WaterContext } from '../context/WaterContext';

const useStyles = makeStyles({
    leftRoot: {
      minWidth: 275,
      marginLeft: 30,
    },
    leftBottomRoot: {
        minWidth: 275,
        marginLeft: 30,
        marginTop: 15,
    },
    rightRoot: {
        minWidth: 275,
        marginRight: 20,
        marginBottom: 20,
    },
});

export const LocationWaterData = (props) => {
    const { locationID } = useParams();
    const { locations } = useContext(WaterContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [locationData, setLocationData] = useState({});
    const [embedLinks, setEmbedLinks] = useState([]);
    const [violationsAmounts, setViolationsAmounts] = useState([]); 
    const [violationsNames, setViolationsNames] = useState([]); 

    const classes = useStyles();

    const sortViolations = (vnames, vamounts) => {
        const violationNames = vnames;
        const violationAmounts = vamounts;
        console.log(violationNames);
        console.log(violationAmounts);

        let combinedList = [];
        for (let i = 0; i < violationNames.length; i++) {
            combinedList.push({ "violationName": violationNames[i], "violationAmount": violationAmounts[i]});
        };

        combinedList.sort((a, b) => {
            return ((a.violationName < b.violationName) ? -1 : ((a.violationName == b.violationName) ? 0 : 1));
        });

        for (let j = 0; j < combinedList.length; j++) {
            violationNames[j] = combinedList[j].violationName; 
            violationAmounts[j] = combinedList[j].violationAmount; 
        }

        return [violationNames, violationAmounts];
    }

    useEffect(() => {
        Object.values(locations).map((location) => {
            if (location["PWSID"] === locationID) {
                setLocationData(location);
                setEmbedLinks(location["Embed"]);
                console.log(location["Non-Native Names"]);
                location["Non-Native Names"].reverse();
                location["Non-Native Violations"].reverse();
                location["Non-Native Names"].splice(location["Rank"] - 1, 0, location["Native Name"]);
                location["Non-Native Violations"].splice(location["Rank"] - 1, 0, location["Native Violations"]); 
                console.log(location["Non-Native Names"]); 
                console.log(location["Non-Native Violations"]); 
                setViolationsNames(location["Non-Native Names"]);
                setViolationsAmounts(location["Non-Native Violations"]); 
            }
        });
    }, []);

    return (
        <div className="data-page-container">
            <Drawer 
                anchor='left' 
                open={menuOpen} 
                onClose={() => setMenuOpen(false)}
                style={{ overflow: 'hidden' }}
            >
                <div>
                    <div className="row">
                        <MenuRoundedIcon
                            style={{ fontSize: 30, marginLeft: 15, marginTop: 10 }}
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
                    <p 
                        className="menu-water-header"
                        style={{ textAlign: "center", marginTop: 40, fontSize: 14 }}
                    >
                        CA Water Data Challenge
                    </p>
                    <p 
                        className="menu-names"
                        style={{ textAlign: "center", margin: 15, fontSize: 14 }}
                    >
                        Ansh Motiani, Aditya Gupta, <br /> Samhith Kakarla
                    </p>
                </div>
            </Drawer>
            <div>
                <MenuRoundedIcon
                    style={{ fontSize: 50, marginLeft: 30, marginTop: 10, display: 'inline-block' }}
                    onClick={() => setMenuOpen(true)}
                ></MenuRoundedIcon>
                <ArrowBackIosIcon
                    style={{ fontSize: 40, marginLeft: 30, marginTop: 10, marginBottom: 5, display: 'inline-block' }}
                    onClick={() => props.history.push('/map')}
                >
                </ArrowBackIosIcon>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card className={classes.leftRoot}>
                        <h1 className="area-data-header">NATIVE AREA NAME</h1>
                        <p className="area-data-value">{locationData["Native Name"]}</p>
                        <h1 className="area-data-header">RANK</h1>
                        <p className="area-data-value">{locationData["Rank"]} / {locationData["Total Rank"]}</p>
                        <h1 className="area-data-header"># OF VIOLATIONS</h1>
                        <p className="area-data-value">{locationData["Native Violations"]}</p>
                    </Card>
                    <Card className={classes.leftBottomRoot}>
                        <h1 className="violations-header">VIOLATIONS RANKING</h1>
                        {/* {() => {
                            const violationsNames = sortViolations(locationData["Non-Native Names"], locationData["Non-Native Violations"])[0]; 
                            const violationsAmounts = sortViolations(locationData["Non-Native Names"], locationData["Non-Native Violations"])[1];
                            console.log(violationsNames);
                            console.log(violationsAmounts);

                            violationsNames.map((name) => {
                                const nameIndex = violationsNames.indexOf(name);
                                const violationAmount = violationsAmounts[nameIndex];
                                return (
                                    <StandingPlace
                                        rank={nameIndex + 1}
                                        violationName={name}
                                        violationAmount={violationAmount}
                                    />
                                )
                            }); 
                        }} */}
                        {violationsNames.map((name) => {
                            const nameIndex = violationsNames.indexOf(name);
                            const violationAmount = violationsAmounts[nameIndex];
                            return (
                                <StandingPlace
                                    number={nameIndex + 1}
                                    violationName={name}
                                    violationAmount={violationAmount}
                                    nativeViolation={nameIndex === locationData["Rank"] - 1 ? true : false}
                                />
                            )
                        })}
                    </Card>
                </Grid>
                <Grid item xs={8}>
                    <Card className={classes.rightRoot}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <div>
                                    <iframe 
                                        id="igraph" 
                                        scrolling="no" 
                                        style={{ border: "none" }} 
                                        seamless="seamless" 
                                        src={embedLinks[3]} 
                                        height="525" 
                                        width="100%"
                                        logo="false"
                                        link="false"
                                        modebar="false"
                                    >
                                    </iframe>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <iframe 
                                        id="igraph" 
                                        scrolling="no" 
                                        style={{ border: "none" }} 
                                        seamless="seamless" 
                                        src={embedLinks[0]} 
                                        height="525" 
                                        width="100%"
                                        logo="false"
                                        link="false"
                                        modebar="false"
                                    >
                                    </iframe>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <iframe 
                                        id="igraph" 
                                        scrolling="no" 
                                        style={{ border: "none" }} 
                                        seamless="seamless" 
                                        src={embedLinks[1]} 
                                        height="525" 
                                        width="100%"
                                        logo="false"
                                        link="false"
                                        modebar="false"
                                    >
                                    </iframe>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <iframe 
                                        id="igraph" 
                                        scrolling="no" 
                                        style={{ border: "none" }} 
                                        seamless="seamless" 
                                        src={embedLinks[2]} 
                                        height="525" 
                                        width="100%"
                                        logo="false"
                                        link="false"
                                        modebar="false"
                                    >
                                    </iframe>
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </div>
    )
}
