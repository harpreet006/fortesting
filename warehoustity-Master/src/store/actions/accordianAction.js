import {
    ACTIVE_ACCORDIAN
} from '../types';



export function accordian(error) {
  return {
    type: ACTIVE_ACCORDIAN,
    payload: error,
  };
}

