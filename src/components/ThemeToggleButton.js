import React from 'react';
import { Button, useColorMode } from '@chakra-ui/react';

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const handleToggle = () => {
    toggleColorMode();
    localStorage.setItem('chakra-ui-color-mode', colorMode === 'light' ? 'dark' : 'light');
  };

  return (
    <Button onClick={handleToggle} mb={4}>
      Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
    </Button>
  );
};

export default ThemeToggleButton;
