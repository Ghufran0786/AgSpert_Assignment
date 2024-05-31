import React, { useState, useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import SaleOrderForm from '../components/SaleOrderForm';

const CompletedOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
    setOrders(storedOrders);
  }, []);

  const openModal = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleDelete = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem('completedOrders', JSON.stringify(updatedOrders));
  };

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer Name</Th>
            <Th>Invoice No</Th>
            <Th>Product Name</Th>
            <Th>Price</Th>
            <Th>Paid</Th>
            <Th>Invoice Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>{order.customer_name + ' ' + '(' + order.customer_id + ')'}</Td>
              <Td>{order.invoice_no}</Td>
              <Td>
                {order.product.map((p, index) => (
                  <div key={index}>{p.label}</div>
                ))}
              </Td>
              <Td>{'₹ ' + order.price}</Td>
              <Td>{order.paid ? 'Yes' : 'Yes'}</Td>
              <Td>{order.invoice_date}</Td>
              <Td>
                <Button onClick={() => openModal(order)}>View</Button>
                <Button ml={2} onClick={() => handleDelete(order.id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <SaleOrderForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={currentOrder}
        onSubmit={() => {}}
        readOnly
      />
    </Box>
  );
};

export default CompletedOrders;
