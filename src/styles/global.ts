import { createGlobalStyle } from 'styled-components';

import ifoodBackground from '../assets/ifood-background.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #F0F0F5 url(${ifoodBackground}) no-repeat 70% -50px;
    -webkit-font-smoothing: antialiased;
  }

  @media only screen and (max-width: 600px) {
  body {
    background: #F0F0F5;
    }
  }

  body, input, button, select {
    font: 16px Roboto, sans-serif;
  }

  select::-ms-expand {
    display: none !important;
  }

  select{
    -webkit-appearance: none;
    appearance: none;
  }

  #root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  button {
    cursor: pointer;
  }

`;