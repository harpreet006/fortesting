import {
  WAREHOUSE_ERROR,
  WAREHOUSE_PENDING,
  WAREHOUSE_LOADING,
  ADD_NEW_WAREHOUSE,
  WAREHOUSE_LIST,
  WAREHOUSE_BY_ID,
  NEW_WAREHOUSE_INFO,
  ACCORDION,
  IMAGE_ID,
  FINAL_SUBMIT,
  WAREHOUSE_BY_ID_AND_TYPE,
  WAREHOUSE_ERROR_MSG,
 
} from '../../types';

  
  const initialState = {
    isPending:false,
    isLoading:false,
    isError:"",
    isErrorMsg:"",
    accordion:"",
    IMAGEID:"",
    finalSubmit:false,
    addNewResponse:[],
    listOfWarehouse:[],
    warehouseDetail:[],
    newWarehouseInfo:[],
    singleFormData:[],
    
  }

  export function WAREHOUSELIST(state =initialState , action) {
    switch (action.type) {
      case ADD_NEW_WAREHOUSE:
          return {
              ...state,
              addNewResponse:action.payload,
          }
  
          case IMAGE_ID:
            return {
                ...state,
                IMAGEID:action.payload,
            }
      case NEW_WAREHOUSE_INFO:
        return {
            ...state,
            newWarehouseInfo:action.payload,
        }

      case WAREHOUSE_PENDING:
        return {
            ...state,
            isPending:action.payload,
        };

        case WAREHOUSE_LOADING:
          return {
              ...state,
              isLoading:action.payload,
          };

      case WAREHOUSE_LIST:
        return {
            ...state,
            listOfWarehouse:action.payload,
        };
      
      case WAREHOUSE_BY_ID:
        return {
            ...state,
            warehouseDetail:action.payload,
        };
      
        case WAREHOUSE_BY_ID_AND_TYPE:
          return {
              ...state,
              // warehouseDetail:action.payload,
              singleFormData:action.payload,
          };
      
      case WAREHOUSE_ERROR:
        return {
            ...state,
            isError:action.payload,
        };
      
      case WAREHOUSE_ERROR_MSG:
        return {
              ...state,
              isErrorMsg:action.payload,
          };
      
      case ACCORDION:
        return {
            ...state,
            accordion:action.payload,
        };
      
      case FINAL_SUBMIT:
        return {
            ...state,
            finalSubmit:action.payload,
        };

       



      default:
        return state;
    }
  }
