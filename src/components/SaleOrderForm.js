import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Checkbox,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  useColorMode,
} from '@chakra-ui/react';

const customStyles = (colorMode) => ({
  control: (provided) => ({
    ...provided,
    backgroundColor: colorMode === 'dark' ? '#1A202C' : '#fff',
    color: colorMode === 'dark' ? '#E2E8F0' : '#1A202C',
  }),
  input: (provided) => ({
    ...provided,
    color: colorMode === 'dark' ? '#E2E8F0' : '#1A202C',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: colorMode === 'dark' ? '#1A202C' : '#fff',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? (colorMode === 'dark' ? '#2D3748' : '#EDF2F7') : colorMode === 'dark' ? '#1A202C' : '#fff',
    color: colorMode === 'dark' ? '#E2E8F0' : '#1A202C',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: colorMode === 'dark' ? '#E2E8F0' : '#1A202C',
  }),
});

const SaleOrderForm = ({ isOpen, onClose, initialData, onSubmit, readOnly = false, products }) => {
  const { register, handleSubmit, reset, control } = useForm({
    defaultValues: initialData || { customer_id: '', customer_name: '', invoice_no: '', price: '', invoice_date: '', product: [] },
  });

  useEffect(() => {
    reset(initialData);
  }, [initialData, reset]);

  const { colorMode } = useColorMode();

  const submitHandler = (data) => {
    onSubmit(data);
    onClose();
  };

  const mockProducts = [
    { value: 'Paneer Tikka', label: 'Paneer Tikka' },
    { value: 'Paneer Butter Masala', label: 'Paneer Butter Masala' },
    { value: 'Paneer Kadai', label: 'Paneer Kadai' },
    { value: 'Paneer Bhurji', label: 'Paneer Bhurji' },
    { value: 'Paneer Kofta', label: 'Paneer Kofta' },
    { value: 'Paneer Pakora', label: 'Paneer Pakora' },
    { value: 'Paneer Parantha', label: 'Paneer Parantha' },
    { value: 'Paneer Biryani', label: 'Paneer Biryani' },
    { value: 'Paneer Pizza', label: 'Paneer Pizza' },
    { value: 'Paneer Sandwich', label: 'Paneer Sandwich' },
    { value: 'Chicken Curry', label: 'Chicken Curry' },
    { value: 'Chicken Tikka', label: 'Chicken Tikka' },
    { value: 'Chicken Biryani', label: 'Chicken Biryani' },
    { value: 'Chicken Butter Masala', label: 'Chicken Butter Masala' },
    { value: 'Chicken Korma', label: 'Chicken Korma' },
    { value: 'Chicken 65', label: 'Chicken 65' },
    { value: 'Chicken Vindaloo', label: 'Chicken Vindaloo' },
    { value: 'Chicken Alfredo', label: 'Chicken Alfredo' },
    { value: 'Chicken Caesar Salad', label: 'Chicken Caesar Salad' },
    { value: 'Chicken Wings', label: 'Chicken Wings' },
    { value: 'Veg Biryani', label: 'Veg Biryani' },
    { value: 'Veg Manchurian', label: 'Veg Manchurian' },
    { value: 'Veg Spring Rolls', label: 'Veg Spring Rolls' },
    { value: 'Veg Hakka Noodles', label: 'Veg Hakka Noodles' },
    { value: 'Fish Curry', label: 'Fish Curry' },
    { value: 'Fish Tikka', label: 'Fish Tikka' },
    { value: 'Mutton Curry', label: 'Mutton Curry' },
    { value: 'Mutton Biryani', label: 'Mutton Biryani' },
    { value: 'Dal Makhani', label: 'Dal Makhani' },
    { value: 'Dal Tadka', label: 'Dal Tadka' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{readOnly ? 'View Sale Order' : 'Create/Edit Sale Order'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(submitHandler)}>
            <FormControl isDisabled={readOnly}>
              <FormLabel>Customer ID</FormLabel>
              <Input {...register('customer_id')} readOnly={readOnly} />
            </FormControl>
            <FormControl isDisabled={readOnly}>
              <FormLabel>Customer Name</FormLabel>
              <Input {...register('customer_name')} readOnly={readOnly} />
            </FormControl>
            <FormControl isDisabled={readOnly}>
              <FormLabel>Price</FormLabel>
              <Input {...register('price')} readOnly={readOnly} />
            </FormControl>
            <FormControl isDisabled={readOnly}>
              <FormLabel>Invoice No</FormLabel>
              <Input {...register('invoice_no')} readOnly={readOnly} />
            </FormControl>
            <FormControl isDisabled={readOnly}>
              <FormLabel>Invoice Date</FormLabel>
              <Input type="date" {...register('invoice_date')} readOnly={readOnly} />
            </FormControl>
            <FormControl isDisabled={readOnly} mt={4}>
              <FormLabel>Paid</FormLabel>
              <Checkbox {...register('paid')} isChecked={true} isDisabled={true}>
                False (Make it True on Active Orders Tab)
              </Checkbox>
            </FormControl>
            <FormControl isDisabled={readOnly}>
              <FormLabel>Products</FormLabel>
              <Controller
                name="product"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={products || mockProducts}
                    isMulti
                    isDisabled={readOnly}
                    placeholder="Select products"
                    styles={customStyles(colorMode)}
                  />
                )}
              />
            </FormControl>
            
            {!readOnly && <Button type="submit" mt={4}>Submit</Button>}
          </form>
        </ModalBody>
        {!readOnly && (
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderForm;
