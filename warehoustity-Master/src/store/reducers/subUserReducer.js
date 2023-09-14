import {
    WHS_USER,
    WHS_USER_BY_ID,
    ROLE,
    ROLE_BY_ID,
    DEPARTMENT,
    DEPARTMENT_BY_ID,
    PERMISSION,
    ROLE_PERMISSION,
    PERMISSION_BY_ID,
    WHS_RESPONSE,
    IS_ERROR,
    IS_LOADING,
    IS_PENDING,
    ERROR_MESSAGE,
    KEY_CONTACT_LIST
  } from '../types';
  
    
    const initialState = {
      isLoading:false,
      isPending:false,
      isError:"",
      isErrorMsg:"",
      whsUserList:null,
      whsUserDetail:null,
      roleList:null,
      roleDetail:null,
      departmentList:null,
      departmentDetail:null,
      permissionList:null,
      rolePermissionList:null,
      permissionDetail:null,
      keyContactUser:null,
      whsResponse:null
    }
  
    export function WHS_USER_INFO(state =initialState , action) {
      
      switch (action.type) {

        case WHS_USER:
        return {
            ...state,
            whsUserList:action.payload,
        };

        case KEY_CONTACT_LIST:
            return {
                ...state,
                keyContactUser:action.payload,
            };
        
        case WHS_USER_BY_ID:
        return {
            ...state,
            whsUserDetail:action.payload,
        };

        case ROLE:
        return {
            ...state,
            roleList:action.payload,
        };
        
        case ROLE_BY_ID:
        return {
            ...state,
            roleDetail:action.payload,
        };

        case DEPARTMENT:
        return {
            ...state,
            departmentList:action.payload,
        };
        
        case DEPARTMENT_BY_ID:
        return {
            ...state,
            departmentDetail:action.payload,
        };

        case PERMISSION:
        return {
            ...state,
            permissionList:action.payload,
        };

        case ROLE_PERMISSION:
        return {
            ...state,
            rolePermissionList:action.payload,
        };
        
        case PERMISSION_BY_ID:
        return {
            ...state,
            permissionDetail:action.payload,
        };
    
        case WHS_RESPONSE:
        return {
            ...state,
            whsResponse:action.payload,
        };
    
        case IS_LOADING:
        
        return {
            ...state,
            isLoading:action.isLoading,
        };

        case IS_PENDING:
        
            return {
                ...state,
                isPending:action.isLoading,
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
  