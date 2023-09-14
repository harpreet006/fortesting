import {
    BOOKINGLIST,
    BOOKINGDETAIL
} from '../../types';

import bookingJSON from '../../../json/bookingJSON.json'


export function bookingList(data) {
    return {
      type: BOOKINGLIST,
      payload: data,
    };
  }

  export function bookingDetails(data) {
    return {
      type: BOOKINGDETAIL,
      payload: data,
    };
  }


  export const fetchBooking = () => {
    return async(dispatch) => {
        let dt = bookingJSON.slice(2,5);
        console.log(dt)
        dispatch(bookingList(bookingJSON))
    
    }
  }

  export const fetchBookingByPage = () => {
    return async(dispatch) => {
        let dt = bookingJSON.slice(2,5);
        console.log(dt)
        dispatch(bookingList(bookingJSON))
    
    }
  }