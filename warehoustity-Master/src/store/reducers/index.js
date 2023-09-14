import { combineReducers } from 'redux';
// import {isError, isLoading, errorMessage } from './utils';
import { loginSuccess, authenticated, vendorAuthenticated, USERPROFILE } from './login';
// import {NAVDATA,HOMEDATA} from './homepage'
// import { registerSuccess, } from './register';
import user from './register';

import {PENDINGDATA, SUCCESSDATA, ERRORDATA, otpVerified} from './register';

import { isLoading, isError, errorMessage } from './utils';
import {BOOKINGDATA} from './vendor/booking';
import {WAREHOUSELIST} from './vendor/warehouse'

// customer imports
import {WAREHOUSEINFO} from './warehouseReducer';
import {NOTIFICATIONINFO} from './notificationReducer';
import {SERVICEINFO} from './serviceReducer';
import {BOOKINGINFO} from './customer/bookingReducer';
import {INVOICEINFO} from './customer/invoiceReducer';
import {ENQUIRYINFO} from './customer/enguiryReducer';
import {MYWAREHOUSEINFO} from './customer/myWarehouseReducer';
import {HOMEINFO} from './homeReducer';
import {FAVORITEINFO} from './customer/favoriteReducer';
import {WARESHEETINFO} from './customer/waresheetReducer';
import {CUSTOMER_RFQ_INFO} from './customer/rfqReducer';
import {VENDOR_RFQ_INFO} from './vendor/rfqReducer';
import {CUSTOMER_DOCUMENT} from './customer/documentReducer'
import {CATEGORY_INFO} from './categoryReducer';
import {ACCORDIAN_INFO} from './accordianReducer';
import {CARTINFO} from './customer/cartReducer';
import {COMPARE_INFO} from './customer/CompareReducer';
import {WHY_INFO} from './whyReducer';
import {WHS_USER_INFO} from './subUserReducer';
import {COMMAN_INFO} from './commanReducer';
import {TESTIMONIAL_INFO} from './testimonialReducer';
import {MIS_INFO} from './misReducer';
import {LOGIN_PENDING} from './login';
import {DASHBOARD_INFO} from './dashboardReducer';
import {REVIEW_INFO} from './reviewReducer';
import {SIDEMENU_INFO} from './sidemenuReducer';
import { saveReducer } from './vendor/saveReducer';

export default combineReducers({
  isError,
  isLoading,
  errorMessage,
  PENDINGDATA,
  SUCCESSDATA,
  ERRORDATA,
  otpVerified,
  BOOKINGDATA,
  WAREHOUSELIST,
  loginSuccess,
  authenticated,
  vendorAuthenticated,
  user,
  USERPROFILE,
  HOMEINFO,

  // customer
  WAREHOUSEINFO,

  // BOOKING
  BOOKINGINFO,

  // INVOICEINFO
  INVOICEINFO,

  // my warehouse for customer dashboard
  MYWAREHOUSEINFO,

  // Notification
  NOTIFICATIONINFO,

  // services
  SERVICEINFO,

  // enquiry
  ENQUIRYINFO,

  // FAVORITEINFO
  FAVORITEINFO,

  // WARESHEETINFO
  WARESHEETINFO,

  // CUSTOMER_RFQ_INFO
  CUSTOMER_RFQ_INFO,

  // VENDOR_RFQ_INFO
  VENDOR_RFQ_INFO,

  //CUSTOMER_DOCUMENT
  CUSTOMER_DOCUMENT,

  // CATEGORY_INFO
  CATEGORY_INFO,

  // ACCORDIAN_INFO
  ACCORDIAN_INFO,

  // CARTINFO
  CARTINFO,

  // COMPAREINFO
  COMPARE_INFO,

  // WHY_INFO
  WHY_INFO,

  // WHS_USER_INFO
  WHS_USER_INFO,

  // COMMAN_INFO
  COMMAN_INFO,

  // TESTIMONIAL_INFO
  TESTIMONIAL_INFO,

  // MIS_INFO
  MIS_INFO,

  // LOGIN_PENDING
  LOGIN_PENDING,

  // DASHBOARD_INFO
  DASHBOARD_INFO,

  // REVIEW_INFO
  REVIEW_INFO,

  // SIDEMENU_INFO
  SIDEMENU_INFO,

  //save
  saveReducer,

  


});

