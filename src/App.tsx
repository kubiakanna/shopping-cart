import { useState } from "react";
import { useQuery } from "react-query";
// Components
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
// Styles
import { Wrapper, StyledButton } from "./App.styles";
//Types
export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}

const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[])
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
    );
    console.log(data);

    const getTotalItems = (items: CartItemType[]) =>
      items.reduce((acc: number, item) => acc + item.amount, 0);

    const handleAddToCart = (addedItem: CartItemType) => {
      setCartItems(prev => {
        const isItemInCart = prev.find(item => item.id === addedItem.id);
        
        if (isItemInCart) {
          return prev.map(item =>
            item.id === addedItem.id ? { ...item, amount: item.amount + 1} : item
          );
        }
        return [...prev, { ...addedItem, amount: 1 }];
      });
    };

    const handleRemoveFromCart = (id: number) => {
      setCartItems(prev => (
        prev.reduce((acc, item) => {
          if (item.id === id) {
            if (item.amount === 1) return acc;
            return [...acc, { ...item, amount: item.amount - 1}];
          } else {
            return [...acc, item];
          }
        }, [] as CartItemType[])
      ));
    };

    if (isLoading) return <LinearProgress />;
    if (error) return <div>Something went wrong...</div>;

  return (
    <Wrapper>
      <Drawer anchor='right' open={cartIsOpen} onClose={() => setCartIsOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
          />
      </Drawer>
      <StyledButton onClick={() => setCartIsOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color='error'>
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
