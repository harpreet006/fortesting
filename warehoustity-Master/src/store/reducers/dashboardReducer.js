import {
    DASHBOARD,
    DASHBOARD_RESPONSE,
    VENDORDATA,
    VENDOR_NUMBER_OF_WAREHOUSE,
    VENDOR_SPACE_CATEGORY,
    IS_ERROR,
    IS_LOADING,
    IS_PENDING,
    QUERY_COUNT,
    MY_CART_COUNT,
    TOTAL_REQUEST_FOR_WH_BOOKING_CUSTOMER,
    BOOKING_REQUEST_ATTENDENT_WHS,
    BOOKING_REQUEST_UN_ATTENDENT_WHS,
    CONFIRM_BOOKING,
    BOOKING_REQUEST_HOLD_LOST,
    DAHOBOARD_NOTIFICATION,
    DASHBOARD_CATEGORY,
    VENDOR_DEMOGRAPHY,
    CUSTOMER_DEMOGRAPHY,
  } from './../types';
  
    
    const initialState = {
      isLoading:false,
      isPending:false,
      isError:"",
      dashboardDetail:null,
      vendorDashboardDetail:null,
      dashboardResponse:null,
      dashboardCategory:null,
      vendorCategory:null,
      numberOfVendorWarehouse:null,

    //   customer end
      queryCount:null,
      myCartCount:null,
      totalRequestForWHBookingCustomer:null,
      bookingRequestAttendedWHS:null,
      bookingRequestUnAttendedWHS:null,
      confirmedBookings:null,
      bookingRequestHoldLost:null,
      notification:null,

      vendorDemography:null,
      customerDemography:null,
    }


    export function DASHBOARD_INFO(state =initialState , action) {
      
      switch (action.type) {

        case CUSTOMER_DEMOGRAPHY:
            return {
                ...state,
                customerDemography:action.payload,
            };

        case VENDOR_DEMOGRAPHY:
        return {
            ...state,
            vendorDemography:action.payload,
        };

        case QUERY_COUNT:
        return {
            ...state,
            queryCount:action.payload,
        };
        case VENDOR_NUMBER_OF_WAREHOUSE:
        return {
            ...state,
            numberOfVendorWarehouse:action.payload,
        };

        case VENDOR_SPACE_CATEGORY:
            return {
                ...state,
                vendorCategory:action.payload,
            };

        case DASHBOARD_CATEGORY:
            return {
                ...state,
                dashboardCategory:action.payload,
            };

        case VENDORDATA:
            return {
                ...state,
                vendorDashboardDetail:action.payload,
            };

        case MY_CART_COUNT:
        return {
            ...state,
            myCartCount:action.payload,
        };
        case TOTAL_REQUEST_FOR_WH_BOOKING_CUSTOMER:
        return {
            ...state,
            totalRequestForWHBookingCustomer:action.payload,
        };
        case BOOKING_REQUEST_ATTENDENT_WHS:
        return {
            ...state,
            bookingRequestAttendedWHS:action.payload,
        };
        case BOOKING_REQUEST_UN_ATTENDENT_WHS:
        return {
            ...state,
            bookingRequestUnAttendedWHS:action.payload,
        };

        case CONFIRM_BOOKING:
        return {
            ...state,
            confirmedBookings:action.payload,
        };

        case BOOKING_REQUEST_HOLD_LOST:
        return {
            ...state,
            bookingRequestHoldLost:action.payload,
        };

        case DAHOBOARD_NOTIFICATION:
        return {
            ...state,
            notification:action.payload,
        };

        case DASHBOARD:
        return {
            ...state,
            dashboardDetail:action.payload,
        };
        
        case DASHBOARD_RESPONSE:
        return {
            ...state,
            dashboardResponse:action.payload,
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
  
    
        default:
          return state;
      }
    }
  