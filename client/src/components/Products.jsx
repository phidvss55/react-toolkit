import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { popularProducts } from '../data';
import Product from './Product';

const Container = styled.div`
  padding; 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Products = () => {
  const navigate = useNavigate();

  const goToDetail = (id) => {
    navigate(`/product/${id}`)
  }
  return (
    <Container>
      {
        popularProducts.map(item => (
          <Product item={item} key={item.id} onClick={() => goToDetail(item.id)} />
        ))
      }
    </Container>
  )
}


export default Products;