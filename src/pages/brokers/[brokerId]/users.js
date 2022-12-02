import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { useEffect, useRef, useState } from "react";
import { UserListResults } from '../../../components/broker/user/user-list-results';
import { UserListToolbar } from '../../../components/broker/user/user-list-toolbar';
import { DashboardLayout } from '../../../components/dashboard-layout';

import axios from "../../../utils/axios";
import { useRouter } from "next/router";

const Page = () => {
    const _isMounted              = useRef( true ); // Initial value _isMounted = true
    const [ users, setUsers ] = useState( [] )
    const router = useRouter()

    const reloadData = async () => {
        let data = await axios.get( `/amazon-mq/${router.query.brokerId}/users` );
    
        setUsers( data.data.Users )
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
                    Customers | Material Kit
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
                    <UserListToolbar/>
                    <Box sx={ { mt: 3 } }>
                        <UserListResults users={ users }/>
                    </Box>
                </Container>
            </Box>
        </>
    )
};

Page.getLayout = ( page ) => (
    <DashboardLayout>
        { page }
    </DashboardLayout>
);

export default Page;
