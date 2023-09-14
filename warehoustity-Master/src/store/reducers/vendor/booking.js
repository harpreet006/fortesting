import {
    BOOKINGLIST,
    BOOKINGDETAIL,
    SAVEVALUE
  } from '../../types';
  
  
  export function BOOKINGDATA(state = {
    bookingList:[],
    bookingDetails:[]
  }, action) {
    switch (action.type) {
      case BOOKINGLIST:
        return {
            ...state,
            bookingList:action.payload,
        };
      case BOOKINGDETAIL:
        return {
            ...state,
            bookingDetails:action.payload,
        }

        case SAVEVALUE:
        return {
            ...state,
            save:action.payload,
        };
      default:
        return state;
    }
  }


//   export function BOOKINGDATA(state = {
//     loading:false,
//     error:null,
//     success:false,
//     confirm:false
// }, action) {
//     console.log("BOOKING DATA REDUCER")
//   switch (action.type) {
//     case BOOKINGLIST:
//       return {
//           ...state,
//           error:action.payload,
//           confirm:false
//       };
//     case BOOKINGDETAIL:
//       return  {
//           ...state,
//           loading:action.payload,
//       };
//     default:
//       return state;
//   }
// }
