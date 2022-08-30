import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Link, Container, Form, Input, Title, Wrapper, Error } from '../styled/Login';
import { login } from '../redux/apiCall'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isFetching, error, currentUser } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });

    if (currentUser) {
      navigate('/')
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
          
          {error && <Error>Something went wrong...</Error>}

          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>

          <Link href="/register">CREATE A NEW ACCOUNT</Link>

        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;