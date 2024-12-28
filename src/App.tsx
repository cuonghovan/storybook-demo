import { Typography } from '@mui/material';
import { ActionMenu } from './stories/ActionMenu';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ShoppingCartItem } from './stories/ShoppingCartItem';

function App() {
  const items = [
    {text: 'Item 1', price: '€100.00', description: 'Description 1', tag: 'Tag 1'},
    {text: 'Item 2', price: '€200.00', description: 'Description 2', tag: 'Tag 2'},
    {text: 'Item 3', price: '€300.00', description: 'Description 3', tag: 'Tag 3'}
  ];
  const itemsList = [];
  for (const item of items) {
    itemsList.push(<ShoppingCartItem text={item.text} price={item.price} description={item.description} tag={item.tag} />);
  }

  return (
    <div>
      <Typography variant="h4">Welcome to My MUI App</Typography>
      <div style={{ position: 'fixed', bottom: '100px', right: '100px' }}>
        <ActionMenu
          actionButtonText="Buy"
          actionButtonIcon={<AddShoppingCartIcon />}
          items={itemsList}
        />
      </div>
    </div>
  );
}

export default App;