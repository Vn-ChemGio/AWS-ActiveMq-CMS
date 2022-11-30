import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { BrokerListResults } from '../components/broker/broker-list-results';
import { BrokerListToolbar } from '../components/broker/broker-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

import { useEffect, useRef, useState } from "react";
import axios from '../utils/axios'

const Page = () => {
    const _isMounted              = useRef( true ); // Initial value _isMounted = true
    const [ brokers, setBrokers ] = useState( [] )
    
    const reloadData = async () => {
        let data = await axios.get( '/aws-active-mq' );
        
        setBrokers( data.data.BrokerSummaries )
    }
    useEffect( () => {
        ( async () => {
            await reloadData()
        } )()
        
        return () => { // ComponentWillUnmount
            _isMounted.current = false;
        }
    }, [] )
    
    return (
        <>
            <Head>
                <title>
                    Broker | Material Kit
                </title>
            </Head>
            <Box
                component="main"
                sx={ {
                    flexGrow: 1,
                    py      : 8
                } }
            >
                <Container maxWidth={ false }>
                    <BrokerListToolbar reloadData={reloadData}/>
                    <Box sx={ { mt: 3 } }>
                        <BrokerListResults brokers={ brokers }
                                           reloadData={reloadData}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

Page.getLayout = ( page ) => (
    <DashboardLayout>
        { page }
    </DashboardLayout>
);

export default Page;
