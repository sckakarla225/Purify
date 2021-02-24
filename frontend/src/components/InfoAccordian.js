import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '90%',
      margin: 'auto', 
    },
    heading: {
      fontSize: 20,
      fontWeight: theme.typography.fontWeightRegular,
      padding: 5, 
    },
    accordian: {
        backgroundColor: '#77B3D4',
    }
}));

export const InfoAccordian = () => {
    const classes = useStyles(); 

    return (
        <div className={classes.root}>
            <Accordion className={classes.accordian}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading} id="home-info-name-header">THE PROBLEM</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <p id="home-info-p">
                        Native American communities are 30% more likely to have water quality violations 
                        than Non-Native communities. They also have a significantly higher chance of their 
                        violations going unaddressed and continuing to pose a threat to the local population. 
                        Many times, Native American difficulties and struggles are overlooked by others. 
                        We want to change that. 
                    </p>
                </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordian}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading} id="home-info-name-header">OUR GOALS</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <p id="home-info-p">
                        1. Compare Native American water quality with Non-native communities in the same geographical region: 
                        Relative Water Quality reports <br />
                        2. Display our findings in an easy-to-use interactive map <br />
                        3. Provide interactive data visualizations so a user can explore the violations 
                        and relative risk of a location in-depth <br />
                        4. Provide our cleaned and improved data sets so others can build upon our research <br />
                    </p>
                </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordian}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading} id="home-info-name-header">OUR MISSION</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        <p id="home-info-p">
                            With our interactive tool, we hope to raise awareness for the major water quality issues 
                            present in Native American communities, not just in California, but throughout the western 
                            United States. The ability to compare Native American water quality with nearby non-native 
                            communities highlights the growing divide in access to clean water. Even when they are in the 
                            same geographical areas, Native American communities often have poorer water quality than 
                            Non-native communities. We hope to bring this often overlooked issue to the fore.
                        </p>
                        <p id="home-info-p">
                            We want our findings to inspire and fuel actions to protect these disadvantaged 
                            Native American communities and bring about change. We plan to present our findings 
                            to state and local governments to give a voice to a suppressed population.
                        </p>
                    </div>
                </AccordionDetails>
            </Accordion>
            <Accordion className={classes.accordian}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading} id="home-info-name-header">OUR DATA</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <p id="home-info-p">
                        Initially, we tried to access data from the California USGS, but it did not provide the information that we needed. 
                        As a result, our project revolved around EPA Enforcement and Compliance History Detailed Facility 
                        Reports for Native American and Non-native areas. This outlined water quality violations for each 
                        location and provided insightful data that we used to create our interactive map and visualizations. 
                        We utilized web-scraping and their API to get access to the information we needed.
                    </p>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}
