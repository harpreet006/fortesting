import {
    SERVICE,
    SERVICE_BY_ID,
    SERVICE_CATEGORY,
    SERVICE_CATEGORY_BY_ID,
    SERVICE_SUBCATEGORY_BY_ID,
    SERVICE_SUBCATEGORY,
    SERVICE_ARRAY,
    IS_ERROR,
    IS_LOADING,
    ERROR_MESSAGE
  } from '../types';
  
    
    const initialState = {
      isLoading:false,
      isError:"",
      isErrorMsg:"",
      serviceArray:[],
      serviceList:[],
      serviceDetail:[],
      categoryList:null,
      categoryDetail:null,
      subCategoryList:null,
      subCategoryDetail:null,
    }
  
    export function SERVICEINFO(state =initialState , action) {
      
      switch (action.type) {

          case SERVICE:
            return {
                ...state,
                serviceList:action.payload,
            };
          
            case SERVICE_ARRAY:
              return {
                  ...state,
                  serviceArray:action.payload,
              };
          
          case SERVICE_BY_ID:
            return {
                ...state,
                serviceDetail:action.payload,
            };

          case SERVICE_CATEGORY:
            return {
                ...state,
                categoryList:action.payload,
            };
            
          case SERVICE_CATEGORY_BY_ID:
          return {
              ...state,
              categoryDetail:action.payload,
          };

          case SERVICE_SUBCATEGORY:
            return {
                ...state,
                subCategoryList:action.payload,
            };
            
          case SERVICE_SUBCATEGORY_BY_ID:
          return {
              ...state,
              subCategoryDetail:action.payload,
          };
       
          case IS_LOADING:
            
            return {
                ...state,
                isLoading:action.isLoading,
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
  