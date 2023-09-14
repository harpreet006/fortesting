import {
    WAREHOUSE_LIST,
    WAREHOUSE_BY_ID,
    WAREHOUSE_FETURE,
    WAREHOUSE_SUGGEST,
    EXPLORE_NETWORK,
    IS_ERROR,
    IS_LOADING,
    WAREHOUSEFILTER,
    ERROR_MESSAGE,
    GEOCORDINATE,
    WAREHOUSE_DETAIL_PAGE
  } from '../types';
  
    
    const initialState = {
      isLoading:false,
      isError:"",
      isErrorMsg:"",
      listOfWarehouse:[],
      fetureWarehouse:[],
      suggestWarehouse:[],
      warehouseDetail:[],
      warehouseDetailPage:null,
      exploreWarehouse:null,
      filter:[],
      latlng:[]
    }
  
    export function WAREHOUSEINFO(state =initialState , action) {
      
      switch (action.type) {

        case EXPLORE_NETWORK:
            return {
                ...state,
                exploreWarehouse:action.payload,
            };
       
          case IS_LOADING:
            return {
                ...state,
                isLoading:action.isLoading,
            };
            case GEOCORDINATE:
              return {
                  ...state,
                  latlng:action.payload,
              }
        case WAREHOUSE_LIST:
          return {
              ...state,
              listOfWarehouse:action.payload,
          };

          case WAREHOUSE_FETURE:
            return {
                ...state,
                fetureWarehouse:action.payload,
            };

            case WAREHOUSE_SUGGEST:
              return {
                  ...state,
                  suggestWarehouse : action.payload,
              };
        
          case WAREHOUSEFILTER:
            return {
                ...state,
                filter:action.payload,
            };
          
        case WAREHOUSE_BY_ID:
          return {
              ...state,
              warehouseDetail:action.payload,
          };
          case WAREHOUSE_DETAIL_PAGE:
            return {
                ...state,
                warehouseDetailPage:action.payload,
            };
          
        case IS_ERROR:
          return {
              ...state,
              isError:action.isError,
          };
        
        case ERROR_MESSAGE:
          return {
                ...state,
                isErrorMsg:action.payload,
            };
    
  
        default:
          return state;
      }
    }
  