import styled from 'styled-components';
import { shade } from 'polished';

export const Filter = styled.div`
  display: flex;
  flex-direction: column;

  .filters {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    
    select {
      border-radius: 20px;
      margin-right: 20px;
      padding: 10px 24px;
      color: #3a3a3a;
      border: 2px solid #fff;
      width: 200px;
      border-right: 0;

    }

    input {
      border-radius: 20px;
      margin-right: 20px;
      padding: 10px 24px;
      width: 200px;
      color: #3a3a3a;
      border: 2px solid #fff;
      border-right: 0;
    }

    .react-datepicker-time__input {
      input {
        padding: 0;
        border-radius: 0;
      }
    }
  }

  .filters > * {
    margin: 10px 0;
  }
  
  button.clear-button {
    width: 120px;
    height: 50px;
    background: #04D361;
    border-radius: 5px;
    border: 0;
    color: #FFF;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04D361')};
    }
  }

`;