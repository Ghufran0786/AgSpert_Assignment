import React from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import ThemeToggleButton from '../components/ThemeToggleButton';
import ActiveOrders from './ActiveOrders';
import CompletedOrders from './CompletedOrders';

const Dashboard = () => {
  return (
    <Box p={4}>
      <ThemeToggleButton />
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Active Orders</Tab>
          <Tab>Completed Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ActiveOrders />
          </TabPanel>
          <TabPanel>
            <CompletedOrders />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Dashboard;
