import {
  WHS_USER,
  WHS_USER_BY_ID,
  ROLE,
  ROLE_BY_ID,
  DEPARTMENT,
  DEPARTMENT_BY_ID,
  PERMISSION,
  PERMISSION_BY_ID,
  ROLE_PERMISSION,
  WHS_RESPONSE,
  IS_ERROR,
  IS_LOADING,
  IS_PENDING,
  KEY_CONTACT_LIST,
} from "../types";

import // GET_WHS_URL,
// GET_WHS_BY_ID_URL,
// CREATE_WHS_URL,
// UPDATE_WHS_URL,

// GET_ROLE_URL,
// GET_ROLE_BY_ID_URL,
// CREATE_ROLE_URL,
// UPDATE_ROLE_URL,

// GET_DEPARTMENT_URL,
// GET_DEPARTMENT_BY_ID_URL,
// CREATE_DEPARTMENT_URL,
// UPDATE_DEPARTMENT_URL
"../../api/urls";

import axiosauth from "../../api/axios-auth";

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

export function isPending(bool) {
  return {
    type: IS_PENDING,
    isLoading: bool,
  };
}

export function whsUserList(data) {
  return {
    type: WHS_USER,
    payload: data,
  };
}

export function whsUser_By_Id(data) {
  return {
    type: WHS_USER_BY_ID,
    payload: data,
  };
}

export function roleList(data) {
  return {
    type: ROLE,
    payload: data,
  };
}

export function role_By_Id(data) {
  return {
    type: ROLE_BY_ID,
    payload: data,
  };
}

export function departmentList(data) {
  return {
    type: DEPARTMENT,
    payload: data,
  };
}

export function department_By_Id(data) {
  return {
    type: DEPARTMENT_BY_ID,
    payload: data,
  };
}

export function permissionList(data) {
  return {
    type: PERMISSION,
    payload: data,
  };
}

export function rolePermissionList(data) {
  return {
    type: ROLE_PERMISSION,
    payload: data,
  };
}

export function permission_By_Id(data) {
  return {
    type: PERMISSION_BY_ID,
    payload: data,
  };
}

export function keyUser(data) {
  return {
    type: KEY_CONTACT_LIST,
    payload: data,
  };
}

export function responseWhs(data) {
  return {
    type: WHS_RESPONSE,
    payload: data,
  };
}

// ###########  Fecth All WHS List ########

export const whsByPage = (page = 1, limit = 10) => {
  return async (dispatch) => {
    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;
    dispatch(isLoading(true));
    dispatch(isError(""));
    try {
      axiosauth
        .get(`/api/v1/accounts/${accountId}/users?limit=${limit}&page=${page}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(whsUserList(res));
          dispatch(isLoading(false));
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// ###########  Fecth  WHS Detail By Id ########

export const whsById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));

    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;

    try {
      axiosauth
        .get(`/api/v1/accounts/${accountId}/users/${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(whsUser_By_Id(res));
          dispatch(isLoading(false));
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// ###########  Create WHS USer  ########

export const createWhsUser = (data) => {
  return async (dispatch) => {
    dispatch(isPending(true));
    dispatch(isError(""));

    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;

    try {
      axiosauth
        .post(`/api/v1/accounts/${accountId}/users/`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(responseWhs(res));
          if (res.statusCode === 500) {
            setTimeout(() => {
              dispatch(responseWhs(null));
            }, 5000);
          }

          dispatch(isPending(false));
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isPending(false));
        })
        .then(() => {
          dispatch(isPending(false));
        });
    } catch (e) {}
  };
};

// ###########  Update WHS USer  ########

export const updateWhsUser = (id, data) => {
  return async (dispatch) => {
    dispatch(isPending(true));
    dispatch(isError(""));

    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;

    try {
      axiosauth
        .patch(`/api/v1/accounts/${accountId}/users/${id}`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(responseWhs(res));
          if (res.statusCode === 500) {
            setTimeout(() => {
              dispatch(responseWhs(null));
            }, 5000);
          }

          dispatch(isPending(false));
        })
        .catch((error) => {
          dispatch(isError(error.message));
          setTimeout(() => {
            dispatch(isError(""));
          }, 5000);

          dispatch(isPending(false));
        })
        .then(() => {
          dispatch(isPending(false));
        });
    } catch (e) {}
  };
};

// ###########  Fecth All Role List ########

export const roleByPage = (isActive) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));

    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;

    try {
      axiosauth
        .get(
          `/api/v1/accounts/${accountId}/roles?isActive=${isActive}&page=1&limit=50&search=`
        )
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(roleList(res.data));
          dispatch(isLoading(false));
        })
        .catch((error) => {
          console.log("error.message===>", error.message);
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// ###########  Get Key Contact User ########

export const getKeyContactUser = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));

    let account = JSON.parse(localStorage.getItem("userData"));

    try {
      axiosauth
        .get(
          `/api/v1/accounts/warehousekeycontact/city/${account?.city}?page=1&limit=10`
        )
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(keyUser(res));
          dispatch(isLoading(false));
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// ###########  Fecth  Role Detail By Id ########

export const roleById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;

    try {
      axiosauth
        .get(`/api/v1/accounts/${accountId}/roles/${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(role_By_Id(res));
          dispatch(isLoading(false));
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// ###########  Create Role  ########

export const createRole = (data) => {
  return async (dispatch) => {
    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;
    dispatch(isPending(true));
    dispatch(isError(""));
    try {
      axiosauth
        .post(`/api/v1/accounts/${accountId}/roles/`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          // if (res.statusCode === 200) {
          dispatch(responseWhs(res));
          dispatch(isPending(false));
          // }
          // else {
          // console.log("Role Fail")
          // }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isPending(false));
        })
        .then(() => {
          dispatch(isPending(false));
        });
    } catch (e) {}
  };
};

// ###########  Update Role  ########

export const updateRole = (id, data) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;
    try {
      axiosauth
        .patch(`/api/v1/accounts/${accountId}/roles/${id}`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(responseWhs(res));
          dispatch(roleByPage("all"));
          dispatch(isLoading(false));
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// ###########  Fecth All Department List ########

export const departmentByPage = (isActive) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));

    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;
    dispatch(departmentList(null));
    try {
      axiosauth
        .get(
          `/api/v1/accounts/${accountId}/departments?isActive=${isActive}&page=1&limit=50&search=`
        )
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            dispatch(departmentList(res.data));
            dispatch(isLoading(false));
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

export const departmentV2 = (isActive, setDepartments) => {
  return async (dispatch) => {
    setDepartments({isLoading:true, data:[]})
    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;
    dispatch(departmentList(null));
    try {
      axiosauth
        .get(
          `/api/v1/accounts/${accountId}/departments?isActive=${isActive}&page=1&limit=50&search=`
        )
        .then((response) => {
          let res = JSON.parse(response.data);
          if (res.statusCode === 200) {
            setDepartments({isLoading:false, data:res.data})
          }
        })
        .catch((error) => {
          dispatch(isError(error.message));
        })
    } catch (e) {}
  };
};

// ###########  Fecth  Department Detail By Id ########

export const departmentById = (id) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));

    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;

    try {
      axiosauth
        .get(`/api/v1/accounts/${accountId}/departments/${id}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(department_By_Id(res));
          dispatch(isLoading(false));
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// ###########  Create Department  ########

export const createDepartment = (data) => {
  return async (dispatch) => {
    dispatch(isPending(true));
    dispatch(isError(""));

    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;

    try {
      axiosauth
        .post(`/api/v1/accounts/${accountId}/departments/`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(responseWhs(res));
          dispatch(isPending(false));
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// ###########  Update Department  ########

export const updateDepartment = (id, data) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));
    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;

    try {
      axiosauth
        .patch(`/api/v1/accounts/${accountId}/departments/${id}`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(responseWhs(res));
          dispatch(isLoading(false));
          // }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// Fetch Perminssion Module

export const rolePermission = () => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));

    try {
      axiosauth
        .get(`/api/v1/accounts/modules/`)
        .then((response) => {
          let res = JSON.parse(response.data);
          // if (res.statusCode === 200) {
          console.log("res---->", res);
          dispatch(permissionList(res));
          dispatch(isLoading(false));
          // }
          // else {
          // console.log("Role Fail")
          // }
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// Fetch Perminssion Module

export const rolePermissionByRoleId = (id, roleType) => {
  return async (dispatch) => {
    dispatch(isLoading(true));
    dispatch(isError(""));

    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;

    try {
      axiosauth
        .get(`/api/v1/accounts/${accountId}/roles/${id}/maps?type=${roleType}`)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(rolePermissionList(res));
          dispatch(isLoading(false));
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isLoading(false));
        })
        .then(() => {
          dispatch(isLoading(false));
        });
    } catch (e) {}
  };
};

// When Status data created already

export const updatePermission = (id, data) => {
  return async (dispatch) => {
    dispatch(isPending(true));
    dispatch(isError(""));
    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;

    try {
      axiosauth
        .patch(`/api/v1/accounts/${accountId}/roles/${id}/maps/`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(responseWhs(res));
          dispatch(isPending(false));
        })
        .catch((error) => {
          dispatch(isError(error.message));
          dispatch(isPending(false));
        })
        .then(() => {
          dispatch(isPending(false));
        });
    } catch (e) {}
  };
};

// When Status data created already

export const createPermission = (id, data) => {
  return async (dispatch) => {
    dispatch(isError(""));
    let account = JSON.parse(localStorage.getItem("userData"));
    let accountId = account?.account?.id;

    try {
      axiosauth
        .post(`/api/v1/accounts/${accountId}/roles/${id}/maps/`, data)
        .then((response) => {
          let res = JSON.parse(response.data);
          dispatch(responseWhs(res));
        })
        .catch((error) => {
          dispatch(isError(error.message));
        })
        .then(() => {});
    } catch (e) {}
  };
};
