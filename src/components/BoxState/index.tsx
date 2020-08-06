import React from 'react';

import { Container } from './styles';

interface IEmptyStateProps {
  message: string;
  image: string;
}

const BoxState: React.FC<IEmptyStateProps> = ({message, image}) => {
  console.log(image);
  return (
    <Container>
      <img src={image} alt="Empty State" />
      <strong>{message}</strong>
    </Container>
  )
}

export default BoxState;