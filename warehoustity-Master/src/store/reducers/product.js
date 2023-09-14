import {
    PRODUCTLISTDATA,
    VARIANTLIST
  } from '../types';
  
  
  export function PRODUCTLIST(state = [], action) {
    switch (action.type) {
      case PRODUCTLISTDATA:
        return action.product;
      default:
        return state;
    }
  }
  export function VARIANTS(state = [], action) {
    switch (action.type) {
      case VARIANTLIST:
        return action.variant;
      default:
        return state;
    }
  }
//   export function HOMEDATA(state = [], action) {
//     switch (action.type) {
//       case HOMESECTIONDATA:
//         return action.homedata;
//       default:
//         return state;
//     }
//   }
  
  