import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 48px;
  color: #3A3A3A;
  max-width: 450px;
  line-height: 56px;
  margin-top: 80px;
`;

export const BoxFilter = styled.section`
  margin-top: 50px;
  max-width: 880px;
`;

export const BoxPlaylists = styled.section`
  margin-top: 50px;
  max-width: 880px;
`;

export const Logo = styled.div`
  width: auto;
  display: flex;
  align-items: center;
  
  img {
    margin-right: 10px;
    width: 30px;
    height: 30px;
  }

  strong {
    font-size: 30px;

    .ifood {
      color: #ea1e2c;
    }

    .spot {
      color: #3A3A3A;
    }
  }
`;