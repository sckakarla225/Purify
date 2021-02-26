import React from 'react'; 
import '../App.css';
import logo from '../logo.svg'; 
import { withStyles } from '@material-ui/core/styles';

// COMPONENTS
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
  
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
            <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
            </IconButton>
        ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    }))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


export const WelcomeModal = (props) => {
    return (
        <div>
            <Dialog onClose={props.onHide} aria-labelledby="customized-dialog-title" open={props.show}>
                <DialogContent dividers>
                    <img src={logo} id="welcome-modal-logo" />
                    <p id="welcome-modal-body">Please use a Desktop or Laptop to View this Website!</p>
                    <p id="welcome-modal-title">THANK YOU!</p>
                </DialogContent>
                <DialogActions>
                <Button onClick={props.onHide} color="primary" id="welcome-modal-button">
                    CLOSE
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
