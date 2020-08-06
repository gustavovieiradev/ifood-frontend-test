import React from 'react';
import BeatLoader from "react-spinners/BeatLoader";

import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <Container>
      <BeatLoader
          size={20}
          color={"#ea1e2c"}
          loading={true}
      />
    </Container>
  )
}

export default Loading;