
// Base URL
// console.log("djsjsd",process.env)
require('dotenv').config()
 
// https://backlive.warehousity.com
export const BASE_URL = 'https://backlive.warehousity.com'; 
// export const BASE_URL = 'http://localhost:8080/';

// User Account
export const REGISTER_NEW_USER = '/api/v1/auth/signup';
export const LOGIN_USER = '/api/v1/auth/login';
export const PHONE_VERIFY = '/api/v1/user/phoneverify';
export const USER_PROFILE_URL = '/api/v1/user/userprofile'; 
export const UPDATE_PROFILE_URL = '/api/v1/user/updateprofile';

// DOCUMENTS UPLOAD

export const DOCUMET_UPLOAD_URL ='/api/v1/buildingtraderelated/fileupload';
export const UPLOAD_CERTIFICATE_URL ='/api/v1/bookingdocument';
export const DOCUMENT_URL = '/api/v1/bookingdocument';

// DASHBOARD_URL
export const DASHBOARD_URL='/api/v1/dashboard/customer';
export const DASHBOARD_CATEGORY_URL = '/api/v1/dashboard/customer/typeOfWarehouses';
export const DASHBOARD_VENDOR_URL = '/api/v1/dashboard/vendor/typeofwarehouse';
export const VENDOR_DEMOGRAPHY_URL = "/api/v1/warehouses/vendor/dashboard/demographicsummary";
export const CUSTOMER_DEMOGRAPHY_URL = "/api/v1/booking/customer/dashboard/demographicsummary";

export const QUERY_COUNT_URL ='/api/v1/enquiry/customer/dashboard/query';
export const MY_CART_COUNT_URL ='/api/v1/cart/customer/dashboard/totalcart';
export const TOTAL_REQUEST_FOR_WH_BOOKING_CUSTOMER_URL ='/api/v1/booking/customer/dashboard/totalrequestwhbookingcustomer';
export const BOOKING_REQUEST_ATTENDENT_WHS_URL ='/api/v1/booking/customer/dashboard/bookingrequestattendedbywhs';
export const BOOKING_REQUEST_UN_ATTENDENT_WHS_URL ='/api/v1/booking/customer/dashboard/bookingrequestunattendedbywhs';
export const CONFIRM_BOOKING_URL ='/api/v1/booking/customer/dashboard/confirmedbookings';
export const BOOKING_REQUEST_HOLD_LOST_URL ='/api/v1/booking/customer/dashboard/bookingrequestholdlost';
export const DAHOBOARD_NOTIFICATION_URL ='/api/v1/notification/customer/dashboard/notification';


// WAREHOUSE FORMS
export const ADD_WAREHOUSE = '/api/v1/warehouses';
export const UPDATE_WAREHOUSE_URL = '/api/v1/warehouses'; // SEND ID WITH URL PUT REQUEST 
export const UPDATE_CONTACT_URL = '/api/v1/warehousecontactdetail';
export const UPDATE_MHINFRA_URL = '/api/v1/mhinfra';
export const UPDATE_OFFICE_SPACE_URL = '/api/v1/storagespace';
export const UPDATE_IT_INFRA_URL = '/api/v1/itinfra';
export const UPDATE_IT_INFRA_SPACE_URL = '/api/v1/itinfraofficespace';
export const UPDATE_MATERIAL_TYPE_URL = '/api/v1/materialtypes';
export const UPDATE_SAFETY_SECURITY = '/api/v1/safetyandsecurity';
export const UPDATE_PERMIT_URL = '/api/v1/traderelatedpermit';
export const FORM_EIGHTY_URL = '/api/v1/formeighty';
export const WAREHOUSE_IMAGES = '/api/v1/warehouseimage'
// export const GET_BY_ID_TYPE_URL = '/api/v1/warehouses/1/type/tradeRelatedPermit';

// WAREHOUSE LISTING
export const WAREHOUSE_LIST_URL = '/api/v1/warehouses/fetchallwarehouses';
export const WAREHOUSE_BY_ID_URL = '/api/v1/warehouses'; // SEND ID WITH URL
export const WAREHOUSE_LIST_TYPE_URL = '/api/v1/warehouses/warehousetype';

// NOTIFICATION
export const NOTIFICATION_URL = '/api/v1/notification';

// SERVICES
export const SERVICE_URL ='/api/v1/service';
export const SERVICE_NEW_URL ='/api/v1/services';
export const SERVICE_CATEGORY_URL = '/api/v1/services/categories/homepage';
export const SERVICE_SUBCATEGORY_URL = '/api/v1/services/subcategories';

// BOOKING
export const BOOKING_URL ='/api/v1/booking';

// Customer Booking Process
export const NEW_BOOKING_URL = '/api/v1/booking';
export const CUSTOMER_BOOKING_URL = '/api/v1/booking/customer/mybooking';

// vendor booking url
export const VENDOR_BOOKING_URL = '/api/v1/booking/fetchallbooking'; // /api/v1/booking/fetchallbooking?page=1&limit=10
export const UPDATE_BOOKING_URL = '/api/v1/booking/vendor' // /api/v1/booking/vendor/1




// INVOICE
export const INVOICE_URL = '/api/v1/invoicemanagement';

// FEEDBACK
export const FEEDBACK_URL = '/api/v1/feedback';


// ENQUIRY
export const ENQUIRY_URL = '/api/v1/enquiry/customer/enquiries';

// Customer Warehouse

export const CUSTOMER_WAREHOUSE_URL = '/api/v1/mywarehouse';

// Home page dummy apis
export const HOMEPAGE_URL = '/api/v1/homepage';

// ADD TO FAVORITE
export const FAVORITE_POST_URL = '/api/v1/user/addfavoriteswarehouse'; // add id in last of End point
export const FAVORITE_GET_URL = '/api/v1/user/favoriteswarehouses';
export const FAVORITE_DEL_URL = '/api/v1/user/deletefavoriteswarehouses'; // add id in last of End point

// CREATE WARESHEET 
export const CREATE_WARESHEET_URL = '/api/v1/waresheet';
export const WARESHEET_URL = '/api/v1/waresheet';

// CUSTOMER RFQ
export const CREATE_CUSTOMER_RFQ_URL= '/api/v1/customerrfq';
export const CREATE_CUSTOMER_FINAL_RFQ_URL= '/api/v1/customerrfq/whsadmin';
export const GET_CUSTOMER_RFQ_URL = '/api/v1/customerresponserfq';
export const UPDATE_RFQ_CONTACT_URL = '/api/v1/rfqcontactinfo';

export const UPDATE_RFQ_INBOUND_URL = '/api/v1/rfqinbound';
export const UPDATE_RFQ_MANPOWER_URL = '/api/v1/rfqmanpower';
export const UPDATE_RETURN_RFQ_URL = '/api/v1/rfqreturn';
export const UPDATE_INVENTOR_RFQ_URL = '/api/v1/rfqinventorymanagement';
export const UPDATE_STORE_RFQ_URL = '/api/v1/rfqstoragetype';
export const ADDED_VALUE_RFQ_URL = '/api/v1/rfqvalueaddedservice';
export const OTHER_SERVICE_RFQ_URL = '/api/v1/rfqotherservicerequirement';
export const UPDATE_GENERAL_URL = '/api/v1/rfqgeneral';
export const UPDATE_RFQ_OUTBOUND_URL = '/api/v1/rfqoutbound';
export const UPDATE_KPI_URL = '/api/v1/rfqkpi';
export const UPDATE_REQUIREMENT_URL = '/api/v1/rfqadditionalrequirement';



// VENDOR RFQ

export const CREATE_VENDOR_RFQ_URL = '/api/v1/vendorresponserfq'; // ADD CUSTOMER rfq id in last
export const GET_VENDOR_RFQ_URL = '/api/v1/vendorrequestrfq';
export const WHS_TO_CUSTOMER_RFQ = "/api/v1/customerresponserfq";

// CATEGORY 
export const CATEGORY_URL = '/api/v1/category';

// CART
export const CART_URL = '/api/v1/cart';

// Compare
export const COMPARE_URL = '/api/v1/warehouses/warehousebyids';

// WHYWHS_URL
export const WHYWHS_URL = '/api/v1/whywarehousity';

// TESTIMONIAL_URL
export const  TESTIMONIAL_URL = "/api/v1/testimonial";

// MIS_URL
export const GET_MIS_BOOKING_URL = "/api/v1/booking/mis";
export const GET_MIS_URL = "/api/v1/mis";
export const GET_BOOKING_MIS_URL = "/api/v1/mis/booking";

// Review Management
export const ADD_REVIEW_URL = "/api/v1/review";
export const REVIEW_URL = "/api/v1/review/warehouse";