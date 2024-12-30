import type { Meta, StoryObj } from '@storybook/react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Box } from '@mui/material';
import { ShoppingCartItem, ActionMenu } from '../components';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/ActionMenu',
  component: ActionMenu,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof ActionMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    actionButtonText: 'Buy',
    actionButtonIcon: <AddShoppingCartIcon />,
    items: [
      <ShoppingCartItem text="50ml" price="€100.00" description="Description 1" tag="Tag 1" />,
      <ShoppingCartItem text="30ml" price="€60.00" />,
      <ShoppingCartItem text="20ml" description="Description 3" />,
      <ShoppingCartItem text="5ml" tag="3x5ml for €40.00" />,
    ],
    originVertical:"bottom",
  },
  render: (args) => (
    <Box sx={{ position: 'fixed', bottom: '400px', right: '30px' }}>
        <ActionMenu {...args}/>
    </Box>
  ),
};
