import { SAVEVALUE } from "../../types"

const initialState = {
    save:false
    
  }

  export function saveReducer(state =initialState , action)
  {

    switch (action.type) {
        case SAVEVALUE:
            return {
                ...state,
                save : action.payload,
            }

            default:
                return state;
  }
}



  