import React from 'react'
import { Container, Image, Info, Title, Button } from '../styled/CategoryItem'
import { Link } from 'react-router-dom';

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>Book Now</Button>
        </Info>
      </Link>
    </Container>
  )
}

export default CategoryItem;