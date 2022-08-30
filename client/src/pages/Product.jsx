import { Add, Remove } from "@material-ui/icons";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import Newsletter from "../components/Newsletter";
import { Container, Amount, Button, Wrapper, ImgContainer, Image, InfoContainer, Title, Desc, Price, FilterContainer, Filter, FilterTitle, FilterColor, FilterSize, FilterSizeOption, AddContainer, AmountContainer } from '../styled/Product'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { publicRequest } from '../requestMethods'
import { useDispatch } from "react-redux";
import { addProduct } from '../redux/cartRedux'

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1)
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async() => {
      try {
        const res = await publicRequest.get(`/products/${id}`)
        if (!res.data.data) {
          navigate('/')
        }
        setProduct(res.data.data)
      } catch (error) {
        console.log(error);
      }
    }

    getProduct();
  }, [id, navigate])

  const handleQuantity = (act) => {
    if (act === 'dec') {
      if (quantity === 1) return
      setQuantity(quantity - 1)
    }else {
      setQuantity(quantity + 1)
    }
  }

  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, color, size })
    );
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color && product.color.map((col) => (
                <FilterColor key={col} color={col} onClick={() => setColor(col)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size && product.size.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity('dec')} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity('inc')} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;