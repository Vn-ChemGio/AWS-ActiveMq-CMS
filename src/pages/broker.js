import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { BrokerListResults } from '../components/broker/broker-list-results';
import { BrokerListToolbar } from '../components/broker/broker-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { customers } from '../__mocks__/brokers';

const Page = () => (
  <>
    <Head>
      <title>
        Broker | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <BrokerListToolbar />
        <Box sx={{ mt: 3 }}>
          <BrokerListResults customers={customers} />
        </Box>
      </Container>
    </Box>
  </>
);

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
