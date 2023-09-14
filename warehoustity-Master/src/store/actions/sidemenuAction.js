
import {
    SIDEMENU,
    READ_ONLY,
    IS_ERROR,
    IS_LOADING,
} from '../types';

import axiosauth from '../../api/axios-auth'


export function isError(error) {
  return {
    type: IS_ERROR,
    isError: error,
  };
}


export function isLoading(bool) {
  return {
    type: IS_LOADING,
    isLoading: bool,
  };
}


export function onlyRead(bool){
    return({
      type:READ_ONLY,
      payload:bool
    })
  }
    

// ######################

  export const sidemenuList = (roleType) =>{
    return async(dispatch) => {
      dispatch(isLoading(true))
      dispatch(isError(""))
      let account = JSON.parse(localStorage.getItem('userData'));
      let accountId = account?.account?.id
      if(account?.accountRole?.id){
      try {
          axiosauth.get(`/api/v1/accounts/${accountId}/roles/${account.accountRole?.id}/maps?type=${roleType}`).then(response => {
              let res = JSON.parse(response.data)
        
              let arr = []
                for(let i=0; i< res.length ; i++){
                  let subItem = []
                  for(let k=0; k<res[i].subModules.length; k++){
                    subItem.push({ 
                        name: res[i].subModules[k].name,
                        label: res[i].subModules[k].name,
                        link:res[i].subModules[k].subModuleRoute,
                        canBoth: res[i].subModules[k].canBoth,
                        canRead: res[i].subModules[k].canRead,
                        canWrite: res[i].subModules[k].canWrite
                     })
                  }            
                  arr.push({
                    name: res[i].name,
                    label: res[i].name,
                    link: res[i].moduleRoute,
                    canBoth: res[i].canBoth,
                    canRead: res[i].canRead,
                    canWrite: res[i].canWrite,
                    items:subItem
                  })
                }  
                dispatch({
                  type: SIDEMENU,
                  payload: arr,
                })
            }).catch((error) => {
            }).then(() => {
            })
    
    } catch(e) {}
}else{
    dispatch({
        type: SIDEMENU,
        payload: null,
      })
}
    }
  }