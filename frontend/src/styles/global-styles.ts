import {
  createGlobalStyle
} from 'styled-components';

export default createGlobalStyle `
  @import url('https://fonts.googleapis.com/css?family=Roboto+Mono:400,500,700&display=swap');
  
  html {
    font-size: 14px;  
  }
  
  body {
    font-family: 'Roboto Mono', monospace !important;
    color: #3e3e3e !important;
  }
`