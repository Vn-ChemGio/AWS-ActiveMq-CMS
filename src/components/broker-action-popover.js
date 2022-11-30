import * as React from 'react';
import Popover from '@mui/material/Popover';

import { Alert, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Snackbar, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import ReplayIcon from "@mui/icons-material/Replay";
import axios from "../utils/axios";

const BrokerActionPopover = ( {broker, reloadData} ) => {
    const [ anchorEl, setAnchorEl ] = React.useState( null );
    const [ openSnackBarSuccess, setOpenSnackBarSuccess ] = React.useState( false );
    const [ openSnackBarError, setOpenSnackBarError ] = React.useState( false );
    const [ openSnackBarErrorMSG, setOpenSnackBarErrorMSG ] = React.useState( "" );
    
    const handleClick = ( event ) => {
        setAnchorEl( event.currentTarget );
    };
    
    const handleClose = () => {
        setAnchorEl( null );
    };
    
    const handleReboot = async () => {
        try {
            let data = await axios.patch( `/aws-active-mq/${broker.BrokerId}` );
            console.log(data)
            setOpenSnackBarSuccess(true)
            reloadData()
        }catch ( e ) {
            setOpenSnackBarErrorMSG(e.response.data.error)
        
            setOpenSnackBarError(true)
        }
       
        
    }
    const open = Boolean( anchorEl );
    const id   = open ? 'simple-popover' : undefined;
    
    return (
        <div>
            <IconButton aria-label="more-vert"
                        size="large"
                        style={ { float: "right" } }
                        onClick={ handleClick }
            >
                <MoreVertIcon fontSize="inherit"/>
            </IconButton>
            
            <Popover
                id={ id }
                open={ open }
                anchorEl={ anchorEl }
                onClose={ handleClose }
                anchorOrigin={ {
                    vertical  : 'bottom',
                    horizontal: 'left',
                } }
            >
                <ListItem disablePadding>
                    <ListItemButton component="a"
                                    href="#simple-list"
                    >
                        <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>
                        
                        <ListItemText primary="User"/>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding 
                          onClick={handleReboot}
                >
                    <ListItemButton component="a"
                                    href="#simple-list"
                    >
                        <ListItemIcon>
                            <ReplayIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Reboot"/>
                    
                    </ListItemButton>
                </ListItem>
            </Popover>
    
         
            <Snackbar
                open={openSnackBarSuccess}
                autoHideDuration={6000}
                anchorOrigin={{vertical:"top", horizontal:"right"}}
            >
                <Alert onClose={handleClose} 
                       severity="success"
                       sx={{ width: '100%' }}
                >
                    Rebooting!
                </Alert>
            </Snackbar>
            <Snackbar
                open={openSnackBarError}
                autoHideDuration={6000}
                anchorOrigin={{vertical:"top", horizontal:"right"}}
            >
                <Alert onClose={handleClose}
                       severity="error"
                       sx={{ width: '100%' }}
                >
                    {openSnackBarErrorMSG}
                </Alert>
            </Snackbar>
            
        </div>
    );
};

export default BrokerActionPopover;

 
