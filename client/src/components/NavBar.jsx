import React from 'react';
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import { Container, Wrapper, Left, Language, SearchContainer, Center, Logo, Right, MenuItem, Input } from '../styled/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { actions } from '../redux/userRedux'

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const signOut = (e) => {
    e.preventDefault();
    dispatch(actions.logout())
  }

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search ..." />
            <Search style={{ color: 'gray', fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Link to="/">
          <Center>
            <Logo>Shopee</Logo>
          </Center>
        </Link>
        <Right>
          {!user ? (
            <>
              <Link to="/register">
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          ) : <MenuItem onClick={signOut}>SIGN OUT</MenuItem>}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={cart.quantity} color="primary" overlap="rectangular">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar;