import React, { useState, useEffect } from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import SaleOrderForm from '../components/SaleOrderForm';

const ActiveOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('activeOrders')) || [];
    setOrders(storedOrders);
  }, []);

  const saveOrdersToLocalStorage = (updatedOrders) => {
    localStorage.setItem('activeOrders', JSON.stringify(updatedOrders));
  };

  const openModal = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data) => {
    let updatedOrders;
    if (currentOrder) {
      updatedOrders = orders.map((order) => (order.id === currentOrder.id ? { ...order, ...data } : order));
    } else {
      updatedOrders = [...orders, { ...data, id: orders.length + 1 }];
    }
    setOrders(updatedOrders);
    saveOrdersToLocalStorage(updatedOrders);
    setIsModalOpen(false);
    setCurrentOrder(null);
  };

  const handleDelete = (orderId) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    saveOrdersToLocalStorage(updatedOrders);
  };

  const handleMoveToCompleted = (order) => {
    const updatedOrders = orders.filter(o => o.id !== order.id);
    setOrders(updatedOrders);
    saveOrdersToLocalStorage(updatedOrders);

    const completedOrders = JSON.parse(localStorage.getItem('completedOrders')) || [];
    localStorage.setItem('completedOrders', JSON.stringify([...completedOrders, order]));
  };

  return (
    <Box>
      <Button onClick={() => openModal(null)} mb={4}>
        + Sale Order
      </Button>
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
              <Td>{order.paid ? 'Yes' : 'No'}</Td>
              <Td>{order.invoice_date}</Td>
              <Td>
                <Button onClick={() => openModal(order)}>Edit</Button>
                <Button ml={2} onClick={() => handleMoveToCompleted(order)}>Paid</Button>
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
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default ActiveOrders;
