// import {
//     PRODUCTLISTDATA,
  
//     VARIANTLIST
//   } from '../constants/types';
  
//   // import { FILTER_URL,WISHLIST_SORTING_URL } from '../api/constants';

//   import axiosauth from '../api/axios-auth';

  
//   export function productlist(data) {
//     return {
//       type: PRODUCTLISTDATA,
//       product: data,
//     };
//   }
 
//   export function variantlist(data) {
//     return {
//       type: VARIANTLIST,
//       variant: data,
//     };
//   }
  
  
//   export function loadProductbycategory(slug) {
//     return async(dispatch) => {
     
//       try {
//         axiosauth.get('products/category/'+slug+'/').then(response => {
//           console.log("runagaun",response.data);
//           let res = JSON.parse(response.data)
//           if (res.status === true) {  
//               dispatch(productlist(res.data))           
//           }
//           else {
//           }
//       }).catch((error) => {
//           console.log(error);
//       }).then(() => {
//           console.log("-----always executes");
//       })
       
//       } catch(e) {
      
//       }
//     };
//   }

  
//   export function loadProductDetails(slug) {
//     return async(dispatch) => {
     
//       try {
//         axiosauth.get('products/category/'+slug+'/').then(response => {
//           console.log("runagaun",response.data);
//           let res = JSON.parse(response.data)
//           if (res.status === true) {  
//               dispatch(productlist(res.data))           
//           }
//           else {
//           }
//       }).catch((error) => {
//           console.log(error);
//       }).then(() => {
//           console.log("-----always executes");
//       })
       
//       } catch(e) {
      
//       }
//     };
//   }

//   export function loadVariants(slug) {
//     return async(dispatch) => {
     
//       try {
//         axiosauth.get('products/filters/'+slug+'/').then(response => {
//           console.log("runagaun",response.data);
//           let res = JSON.parse(response.data)
//           if (res.status === true) {  
//               dispatch(variantlist(res.data))           
//           }
//           else {
//           }
//       }).catch((error) => {
//           console.log(error);
//       }).then(() => {
//           console.log("-----always executes");
//       })
       
//       } catch(e) {
      
//       }
//     };
//   }
  
  