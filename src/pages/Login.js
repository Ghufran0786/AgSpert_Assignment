import React from 'react';
import { Box, Button, Input, FormControl, FormLabel, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/dashboard');
  };

  const bgColor = useColorModeValue('gray.100', 'gray.700');
  const boxShadowColor = useColorModeValue('lg', 'dark-lg');

  return (
    <Box
      bgImage="url('/path/to/background.jpg')"
      bgPos="center"
      bgSize="cover"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        p={8}
        maxW="md"
        w="full"
        bg={bgColor}
        boxShadow={boxShadowColor}
        borderRadius="md"
      >
        <VStack spacing={4}>
          <Heading as="h1" size="lg" textAlign="center">
            Welcome Back
          </Heading>
          <Text fontSize="md" color="gray.500" textAlign="center">
            Please log in to your account
          </Text>
          <FormControl id="username" isRequired>
            <FormLabel>Username</FormLabel>
            <Input type="text" placeholder="Enter your username" />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder="Enter your password" />
          </FormControl>
          <Button
            onClick={handleLogin}
            colorScheme="blue"
            w="full"
            mt={4}
          >
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
