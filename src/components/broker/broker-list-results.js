import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box, Button,
    Card,
    Checkbox, ListItemButton, ListItemText, Popover,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { getInitials } from '../../utils/get-initials';
import BrokerActionPopover from "../broker-action-popover";

export const BrokerListResults = ( { brokers, reloadData, ...rest } ) => {
    const [ selectedCustomerIds, setSelectedCustomerIds ] = useState( [] );
    const [ limit, setLimit ]                             = useState( 10 );
    const [ page, setPage ]                               = useState( 0 );
    
    
    const handleSelectAll = ( event ) => {
        let newSelectedCustomerIds;
        
        if ( event.target.checked ) {
            newSelectedCustomerIds = brokers.map( ( broker ) => broker.BrokerId );
        } else {
            newSelectedCustomerIds = [];
        }
        
        setSelectedCustomerIds( newSelectedCustomerIds );
    };
    
    const handleSelectOne = ( event, id ) => {
        const selectedIndex        = selectedCustomerIds.indexOf( id );
        let newSelectedCustomerIds = [];
        
        if ( selectedIndex === -1 ) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat( selectedCustomerIds, id );
        } else if ( selectedIndex === 0 ) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat( selectedCustomerIds.slice( 1 ) );
        } else if ( selectedIndex === selectedCustomerIds.length - 1 ) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat( selectedCustomerIds.slice( 0, -1 ) );
        } else if ( selectedIndex > 0 ) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(
                selectedCustomerIds.slice( 0, selectedIndex ),
                selectedCustomerIds.slice( selectedIndex + 1 )
            );
        }
        
        setSelectedCustomerIds( newSelectedCustomerIds );
    };
    
    const handleLimitChange = ( event ) => {
        setLimit( event.target.value );
    };
    
    const handlePageChange = ( event, newPage ) => {
        setPage( newPage );
    };
    
    return (
        <Card { ...rest }>
            <PerfectScrollbar>
                <Box sx={ { minWidth: 1050 } }>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={ selectedCustomerIds.length === brokers.length }
                                        color="primary"
                                        indeterminate={
                                            selectedCustomerIds.length > 0
                                            && selectedCustomerIds.length < brokers.length
                                        }
                                        onChange={ handleSelectAll }
                                    />
                                </TableCell>
                                <TableCell>
                                    BrokerName
                                </TableCell>
                                <TableCell>
                                    BrokerState
                                </TableCell>
                                <TableCell>
                                    DeploymentMode
                                </TableCell>
                                <TableCell>
                                    EngineType
                                </TableCell>
                                <TableCell>
                                    HostInstanceType
                                </TableCell>
                                <TableCell>
                                    Created
                                </TableCell>
                                <TableCell>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { brokers.slice( 0, limit ).map( ( broker ) => (
                                <TableRow
                                    hover
                                    key={ broker.BrokerId }
                                    selected={ selectedCustomerIds.indexOf( broker.BrokerId ) !== -1 }
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={ selectedCustomerIds.indexOf( broker.BrokerId ) !== -1 }
                                            onChange={ ( event ) => handleSelectOne( event, broker.BrokerId ) }
                                            value="true"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={ {
                                                alignItems: 'center',
                                                display   : 'flex'
                                            } }
                                        >
                                            <Avatar
                                                sx={ { mr: 2 } }
                                            >
                                                { getInitials( broker.BrokerName ) }
                                            </Avatar>
                                            <Typography
                                                color="textPrimary"
                                                variant="body1"
                                            >
                                                { broker.BrokerName }
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        { broker.BrokerState }
                                    </TableCell>
                                    <TableCell>
                                        { broker.DeploymentMode }
                                    </TableCell>
                                    <TableCell>
                                        { broker.EngineType }
                                    </TableCell>
                                    <TableCell>
                                        { broker.HostInstanceType }
                                    </TableCell>
                                    <TableCell>
                                        {/*{ format( new Date(broker.Created), 'dd/MM/yyyy' ) }*/ }
                                        { broker.Created }
                                    </TableCell>
                                    <TableCell>
                                        {/*{ format( new Date(broker.Created), 'dd/MM/yyyy' ) }*/ }
                                        <BrokerActionPopover broker={broker} 
                                                             reloadData={reloadData}
                                        />
                                    </TableCell>
                                    
                                   
                                
                                </TableRow>
                            ) ) }
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={ brokers.length }
                onPageChange={ handlePageChange }
                onRowsPerPageChange={ handleLimitChange }
                page={ page }
                rowsPerPage={ limit }
                rowsPerPageOptions={ [ 5, 10, 25 ] }
            />
        </Card>
    );
};

BrokerListResults.propTypes = {
    brokers: PropTypes.array.isRequired
};
