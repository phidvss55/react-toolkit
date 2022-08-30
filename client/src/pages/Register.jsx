import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Wrapper, Title, Form, Input, Agreement, Button } from '../styled/Register'
import { register } from '../redux/apiCall'
import { useDispatch, useSelector } from "react-redux";
import { Error } from "../styled/Login";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  })

  const { isFetching, error, currentUser } = useSelector((state) => state.user);

  const handleSetData = (e, field) => {
    setData({
      ...data, 
      [field]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    register(dispatch, data);

    if (currentUser) {
      navigate('/')
    }
  }

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="name" 
            onChange={(e) => handleSetData(e, 'name')}
          />
          <Input placeholder="username" onChange={(e) => handleSetData(e, 'username')} />
          <Input placeholder="email" onChange={(e) => handleSetData(e, 'email')} />
          <Input placeholder="password" onChange={(e) => handleSetData(e, 'password')} />
          <Input placeholder="confirm password" onChange={(e) => handleSetData(e, 'confirm_password')} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          
          <Button onClick={handleSubmit} disabled={isFetching}>CREATE</Button>

          {error && <Error>Something went wrong...</Error>}

          <Button>
            <Link to="/login">LOGIN</Link>
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;