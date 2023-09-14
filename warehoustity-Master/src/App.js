import React, { Suspense, lazy, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { authenticated, vendorAuthenticated } from "./store/actions/login";

import "./style/common.scss";
import "./style/scrollbutton.css";
import "./style/successModal.scss";
import "./style/css/custom.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";

import Home from "./pages/Home";
import Warehouse from "./pages/warehouse/warehouse";
import ContactUs from "./pages/ContactUs";
import Feedback from "./pages/Feedback";
import WarehouseCompare from "./pages/warehouse/WarehouseCompare";
import WarehouseDetail from "./pages/warehouse/warehouse_detail";
import WhDetails from "./pages/warehouse/WarehouseDetails";
import WarehouseAbout from "./pages/warehouse/warehouse_about";
import WarehouseCity from "./pages/warehouse/warehouse_city";
import WhyWarehousity from "./pages/warehouse/why_warehousity";
import Product from "./pages/product";
import Service from "./pages/service/Service";
import PageNotFound from "./pages/PageNotFound";
import SpaceCertificate from "./pages/dashboard/documents/spaceCertificate";
import AgreementPackage from "./pages/dashboard/documents/argeementPackage";
import NOC from "./pages/dashboard/documents/noc";
import SOP from "./pages/dashboard/documents/sop";
import SOW from "./pages/dashboard/documents/sow";
import Other from "./pages/dashboard/documents/other";
import Services from "./pages/dashboard/service/services";
import GST from "./pages/dashboard/gst";
import CreateNewWaresheet from "./pages/dashboard/waresheet/createNewWaresheet";
import ManageWaresheet from "./pages/dashboard/manageWaresheet";
import Mywarehouse from "./pages/dashboard/myWarehouse/mywarehouse";
import Mis from "./pages/dashboard/mis";
import CreateNewEnquiry from "./pages/dashboard/enquiry/createNewEnquiry";
import ManageEnquiry from "./pages/dashboard/enquiry/manageEnquiry";
import Notification from "./pages/dashboard/notification/notification";
import KeyContact from "./pages/dashboard/keyContact";
import MyAccount from "./pages/dashboard/myaccount";
import Company from "./pages/dashboard/Company";
import Individual from "./pages/dashboard/Individual";
import loadjs from "loadjs";

//vendor dashboard
import VendorMyWarehouses from "./pages/vendor-dashboard/MyWarehouses";
import VendorMyOperations from "./pages/vendor-dashboard/MyOperations";
import VendorMyInventory from "./pages/vendor-dashboard/MyInventory";
import VendorMyCompliances from "./pages/vendor-dashboard/MyCompliances";
import VendorMyProductivity from "./pages/vendor-dashboard/MyProductivity";
import VendorMyAudit from "./pages/vendor-dashboard/MyAudit";
import VendorMyRfqs from "./pages/vendor-dashboard/MyRfqs";
import VendorValueAddedServices from "./pages/vendor-dashboard/ValueAddedServices";
import VendorAnalytics from "./pages/vendor-dashboard/Analytics";

import VendorDashboard from "./pages/vendor-dashboard/index";
import WarehouseSpaceSummary from "./pages/vendor-dashboard/WarehouseSpaceSummary";
import DemographySummary from "./pages/vendor-dashboard/DemographySummary";
import WMS from "./pages/vendor-dashboard/WMS";
import MyWarehouseVendor from "./pages/vendor-dashboard/mywarehouse";
import MyWarehouseRejected from "./pages/vendor-dashboard/myWarehouseRejected";

import BookingVendor from "./pages/vendor-dashboard/booking/bookings";
import BookingDetailVendor from "./pages/vendor-dashboard/booking/bookingDetail";
import ServiceVendor from "./pages/vendor-dashboard/service";
import ServiceDetailVendor from "./pages/vendor-dashboard/serviceDetail";
import VendorAgreementPackage from "./pages/vendor-dashboard/documents/argreementPackage";
import VendorAllSpaceCertificate from "./pages/vendor-dashboard/documents/spacecertificate";
import VendorSop from "./pages/vendor-dashboard/documents/sop";
import VendorSow from "./pages/vendor-dashboard/documents/sow";
import VendorOther from "./pages/vendor-dashboard/documents/other";
import VendorNoc from "./pages/vendor-dashboard/documents/noc";
import ViewCertificate from "./pages/vendor-dashboard/documents/viewCertificate";
import ManageSubUserVendor from "./pages/vendor-dashboard/subusers/manageSubuser";
import BulkUploadVendor from "./pages/vendor-dashboard/subusers/bulkUpload";
import CreateSubUserVendor from "./pages/vendor-dashboard/subusers/createSubUser";
import ViewUserLogsVendor from "./pages/vendor-dashboard/subusers/viewUserLogs";
import ViewUserDetailVendor from "./pages/vendor-dashboard/subusers/viewSubUserDetail";
import EditSubUserDetailVendor from "./pages/vendor-dashboard/subusers/editSubUserDetail";
import ManageRoleVendor from "./pages/vendor-dashboard/subusers/manageRole";
import ViewUserRoleAndPermission from "./pages/vendor-dashboard/subusers/viewUserRoleAndPermission";
import WarehouseMappingVendor from "./pages/vendor-dashboard/subusers/warehousMapping";
import AddNewUserVendor from "./pages/vendor-dashboard/subusers/addNewUser";
import CreateNewEnquiryVendor from "./pages/vendor-dashboard/createNewEnquiry";
import ManageEnquiryVendor from "./pages/vendor-dashboard/manageEnquiry";
import notificationVenor from "./pages/vendor-dashboard/notification";
import viewNotificationVenor from "./pages/vendor-dashboard/viewNotification";
import gstVendor from "./pages/vendor-dashboard/gst";
import manageMis from "./pages/vendor-dashboard/manageMis";
import ManageMISList from "./pages/vendor-dashboard/ManageMISList";
import MyAccountVendor from "./pages/vendor-dashboard/myaccount";

import store from "./store";

import requireAuth from "./hoc/require_auth";
import noRequireAuth from "./hoc/no_require_auth";
import vendorRequireAuth from "./hoc/vendor_required_auth";

import BookingDetails from "./pages/dashboard/booking/BookingDetails";
import NotificationDetails from "./pages/dashboard/notification/NotificationDetails";
import EnquiryDetails from "./pages/dashboard/enquiry/EnquiryDetails";
import EnquiryDetailsVendor from "./pages/dashboard/enquiry/EnquiryDetailsVendor";

import MyWarehouseDetails from "./pages/dashboard/myWarehouse/MyWarehouseDetails";
import ServicesDetails from "./pages/dashboard/service/ServicesDetails";
import GstView from "./pages/dashboard/GstView";
import SpaceCertificateView from "./pages/dashboard/documents/SpaceCertificateView";
import EditSubUserRole from "./pages/dashboard/subuser/EditSubUserRole";
import MisView from "./components/dashboard/MisView";
import ResetPassword from "./pages/dashboard/ResetPassword";
import GstVendorView from "./pages/vendor-dashboard/GstVendorView";
import ListOfWarehouse from "./pages/vendor-dashboard/vendorWarehouse/ListOfWarehouse";
import MisViews from "./pages/vendor-dashboard/MisViews";
import SubUserRoleDetails from "./pages/vendor-dashboard/subusers/SubUserRoleDetails";
import MyAccountIndividual from "./pages/vendor-dashboard/MyAccountIndividual";

import { ToastProvider } from "react-toast-notifications";
import Invoice from "./pages/dashboard/invoice/Invoice";
import ViewInvoice from "./pages/dashboard/invoice/ViewInvoice";
import CustomLoader from "./components/helper/CustomLoader";
import DashboardDemographics from "./pages/dashboard/DashboardDemographics";
import DashboardWMS from "./pages/dashboard/DashboardWMS";
import AddSubUser from "./pages/dashboard/subuser/AddSubUser";
import BulkUploadSubUser from "./pages/dashboard/subuser/BulkUploadSubUser";
import EditSubUser from "./pages/dashboard/subuser/EditSubUser";
import SubUserDetails from "./pages/dashboard/subuser/SubUserDetails";
import ManageRFQ from "./pages/vendor-dashboard/vendorRfq/ManageRFQ";
import ReceiveRFQ from "./pages/vendor-dashboard/vendorRfq/ReceiveRFQ";
import BookingConfirm from "./pages/vendor-dashboard/booking/BookingConfirm";
import BookingCancelled from "./pages/vendor-dashboard/booking/BookingCancelled";
import CreateRole from "./pages/dashboard/subuser/CreateRole";
import UserRoleDetails from "./pages/dashboard/subuser/UserRoleDetails";
import ManageVendorInvoice from "./pages/vendor-dashboard/vendorInvoice/ManageVendorInvoice";
import VendorInvoiceDetails from "./pages/vendor-dashboard/vendorInvoice/VendorInvoiceDetails";
import UpdateOfWarehouse from "./pages/vendor-dashboard/vendorWarehouse/UpdateOfWarehouse";
import UpdateOfWarehouseRejected from "./pages/vendor-dashboard/vendorWarehouse/UpdateOfWarehouseRejected";

import ShowOfWarehouse from "./pages/vendor-dashboard/vendorWarehouse/ShowOfWarehouse";
import WhsRFQDetails from "./pages/dashboard/rfq/WhsRFQDetails";
import RfqDetails from "./pages/vendor-dashboard/vendorRfq/RfqDetails";
import VendorRFQViewDetail from "./pages/vendor-dashboard/vendorRfq/VendorRFQViewDetail";
import ManageOpenRfq from "./pages/vendor-dashboard/vendorRfq/ManageOpenRfq";
import VendorResponseDetails from "./pages/vendor-dashboard/vendorRfq/VendorResponseDetails";
import ManageRfqList from "./pages/dashboard/rfq/ManageRfqList";
import RfqManageOpenList from "./wrapper/customer/rfq/RfqManageOpenList";
import BookingPending from "./pages/vendor-dashboard/booking/BookingPending";
import CreateVendorDepartment from "./pages/vendor-dashboard/subusers/CreateVendorDepartment";
import ManageDepartment from "./pages/vendor-dashboard/subusers/ManageDepartment";
import DepartmentDetails from "./pages/vendor-dashboard/subusers/DepartmentDetails";
import RoleDetails from "./pages/dashboard/subuser/RoleDetails";
import ManageCustomerDepartment from "./pages/dashboard/subuser/ManageCustomerDepartment";
import CreateCustomerDepartment from "./pages/dashboard/subuser/CreateCustomerDepartment";
import CustomerDepartmentDetails from "./pages/dashboard/subuser/CustomerDepartmentDetails";
import ServiceDetails from "./pages/service/ServiceDetails";
import CustomerSpaceCertificate from "./pages/dashboard/documents/CostomerSpaceCertificate";
import VendorSpaceCertificate from "./pages/vendor-dashboard/documents/VendorSpaceCertificate";
import FrequentlyAskedQuestions from "./pages/warehouse/FrequentlyAskedQuestions";
import TermsAndConditions from "./pages/warehouse/TermsAndConditions";
import Testimonial from "./pages/Testimonial";
import ManagePermission from "./pages/dashboard/subuser/ManagePermissionOld";
import MisListPage from "./pages/dashboard/MisListPage";
import UpdateCustomerDepartment from "./pages/dashboard/subuser/UpdateCustomerDepartment";
import UpdateSubUserRole from "./pages/dashboard/subuser/UpdateSubUserRole";
// import Toast from 'react-bootstrap/Toast';
// import ToastContainer from 'react-bootstrap/ToastContainer'

// firebase push notification confrigation

// import { getToken } from './thirdParty/firebase';
import Tutorials from "./pages/Tutorials";
import Support from "./pages/Support";
import AddReview from "./pages/dashboard/review/AddReview";
import VendorConsultant from "./pages/vendor-dashboard/VendorConsultant";
import CunsultAccount from "./pages/dashboard/CunsultAccount";
import CreateInvoice from "./pages/vendor-dashboard/vendorInvoice/CreateInvoice";
import ManageCreatedInvoice from "./pages/vendor-dashboard/vendorInvoice/ManageCreatedInvoice";
import ExploreNetwork from "./pages/warehouse/ExploreNetwork";
import FeaturedDetails from "./pages/vendor-dashboard/vendorWarehouse/FeaturedDetails";
import ServiceRfqForm from "./pages/service/ServiceRfqForm";
import ServiceFavorite from "./pages/dashboard/service/ServiceFavorite";
import PrivacyPolicy from "./pages/warehouse/PrivacyPolicy";
import MyReport from "./pages/dashboard/MyReport";
import RfqCreate from "./pages/dashboard/rfq/RfqCreate";
import WarehouseStatsByTable from "./pages/dashboard/DashboardPages/warehouseTableMapChart/WarehouseStatsByTable";
import WarehouseStatsByChart from "./pages/dashboard/DashboardPages/warehouseTableMapChart/WarehouseStatsByChart";
import WarehouseStatsByMap from "./pages/dashboard/DashboardPages/warehouseTableMapChart/WarehouseStatsByMap";

import WarehouseStatsByTableInfraV2 from "./pages/dashboard/DashboardPages/warehouseTableMapChartInfra/WarehouseStatsByTableInfraV2";
import WarehouseStatsByTableInfra from "./pages/dashboard/DashboardPages/warehouseTableMapChartInfra/WarehouseStatsByTableInfra";
import WarehouseStatsByChartInfra from "./pages/dashboard/DashboardPages/warehouseTableMapChartInfra/WarehouseStatsByChartInfra";
import WarehouseStatsByMapInfra from "./pages/dashboard/DashboardPages/warehouseTableMapChartInfra/WarehouseStatsByMapInfra";

import WarehouseStatsByTableContact from "./pages/dashboard/DashboardPages/warehouseTableMapChartContact/WarehouseStatsByTableContact";
import WarehouseStatsByChartContact from "./pages/dashboard/DashboardPages/warehouseTableMapChartContact/WarehouseStatsByChartContact";
import WarehouseStatsByMapContact from "./pages/dashboard/DashboardPages/warehouseTableMapChartContact/WarehouseStatsByMapContact";

// import WarehouseStatsByTableTerms from './pages/dashboard/DashboardPages/warehouseTableMapChartTerms/WarehouseStatsByTableTerms';
// import WarehouseStatsByChartTerms from './pages/dashboard/DashboardPages/warehouseTableMapChartTerms/WarehouseStatsByChartTerms';
// import WarehouseStatsByMapTerms from './pages/dashboard/DashboardPages/warehouseTableMapChartTerms/WarehouseStatsByMapTerms';

import WarehouseStatsByTableScore from "./pages/dashboard/DashboardPages/warehouseTableMapChartScore/WarehouseStatsByTableScore";
import WarehouseStatsByChartScore from "./pages/dashboard/DashboardPages/warehouseTableMapChartScore/WarehouseStatsByChartScore";
import WarehouseStatsByMapScore from "./pages/dashboard/DashboardPages/warehouseTableMapChartScore/WarehouseStatsByMapScore";
import ValueAddedServiceDetail from "./pages/dashboard/DashboardPages/valueAdded/ValueAddedServiceDetail";
import ValueAddedServiceDetailTwo from "./pages/dashboard/DashboardPages/valueAdded/ValueAddedServiceDetailTwo";
import ValueAddedServiceDetailThree from "./pages/dashboard/DashboardPages/valueAdded/ValueAddedServiceDetailThree";
import UpdateWaresheet from "./pages/dashboard/waresheet/UpdateWaresheet";
import ConciseRfq from "./pages/dashboard/rfq/ConciseRfq";
import Insights from "./pages/warehouse/Insights";
import Blog from "./pages/warehouse/Blog";
import BlogDetails from "./pages/warehouse/BlogDetails";
import WhFeedback from "./pages/feedback/WhFeedback";
import WhFeedbackDetails from "./pages/feedback/WhFeedbackDetails";
import DashboardDocs from "./pages/dashboard/DashboardDocs";
import News from "./pages/news/News";
import NewsDetails from "./pages/news/NewsDetails";
import NewBlog from "./pages/warehouse/NewBlog";
import Glossary from "./pages/warehouse/Glossary";
import GlossaryDetails from "./pages/warehouse/GlossaryDetails";
import SimilarGlossary from "./pages/warehouse/SimilarGlossary";

import NewBlogDetails from "./pages/warehouse/NewBlogDetails";
import RecentlyGlossary from "./pages/warehouse/RecentlyGlossary.js";

import Dashboard from "./pages/dashboard/index";
import DashboardMyWarehouses from "./pages/dashboard/DashboardPages/MyWarehouses";
import DashboardMyOperations from "./pages/dashboard/DashboardPages/MyOperations";
import DashboardMyInventory  from "./pages/dashboard/MyInventory";
import DashboardMyCompliances  from "./pages/dashboard/MyCompliances";
import DashboardMyProductivity  from "./pages/dashboard/MyProductivity";
import DashboardMyAudit  from "./pages/dashboard/MyAudit";
import DashboardMyRFQs  from "./pages/dashboard/MyRFQs";
import DashboardValueAddedServices  from "./pages/dashboard/DashboardPages/valueAdded/ValueAddedServices";
import DashboardAnalytics  from "./pages/dashboard/Analytics";
import Favorite  from "./pages/dashboard/favorites";
import Cart  from "./pages/dashboard/cart/Cart";
import CreateNewRFQ  from "./pages/dashboard/rfq/createNewRfq";
import Waresheet  from "./pages/dashboard/waresheet/waresheet";
import Booking  from "./pages/dashboard/booking/booking";
import ManageSubUser  from "./pages/dashboard/subuser/manageSubUser";
import ManageRoles  from "./pages/dashboard/subuser/manageRoles";
import WarehouseMapping  from "./pages/dashboard/subuser/warehouseMapping";
import ManageRfq  from "./pages/dashboard/rfq/ManageRfq";
import RFQViewDetails  from "./pages/dashboard/rfq/RFQViewDetails";
import CustomerRFQDetails  from "./pages/dashboard/rfq/CustomerRFQDetails";
import WarehouseEvents  from "./pages/WarehouseEvents";
import EventDetails from "./pages/EventDetails";



// =========== User dashboard ==================================
// const Dashboard = lazy(() => import("./pages/dashboard/index"));

// const DashboardMyWarehouses = lazy(() =>
//   import("./pages/dashboard/DashboardPages/MyWarehouses")
// );
// const DashboardMyOperations = lazy(() =>
//   import("./pages/dashboard/DashboardPages/MyOperations")
// );

// const DashboardMyInventory = lazy(() =>
//   import("./pages/dashboard/MyInventory")
// );
// const DashboardMyCompliances = lazy(() =>
//   import("./pages/dashboard/MyCompliances")
// );
// const DashboardMyProductivity = lazy(() =>
//   import("./pages/dashboard/MyProductivity")
// );
// const DashboardMyAudit = lazy(() => import("./pages/dashboard/MyAudit"));
// const DashboardMyRFQs = lazy(() => import("./pages/dashboard/MyRFQs"));
// const DashboardValueAddedServices = lazy(() =>
//   import("./pages/dashboard/DashboardPages/valueAdded/ValueAddedServices")
// );
// const DashboardAnalytics = lazy(() => import("./pages/dashboard/Analytics"));

// const Favorite = lazy(() => import("./pages/dashboard/favorites"));
// const Cart = lazy(() => import("./pages/dashboard/cart/Cart"));
// const CreateNewRFQ = lazy(() => import("./pages/dashboard/rfq/createNewRfq"));
// const Waresheet = lazy(() => import("./pages/dashboard/waresheet/waresheet"));
// const Booking = lazy(() => import("./pages/dashboard/booking/booking"));
// const ManageSubUser = lazy(() =>
//   import("./pages/dashboard/subuser/manageSubUser")
// );
// const ManageRoles = lazy(() => import("./pages/dashboard/subuser/manageRoles"));
// const WarehouseMapping = lazy(() =>
//   import("./pages/dashboard/subuser/warehouseMapping")
// );
// const ManageRfq = lazy(() => import("./pages/dashboard/rfq/ManageRfq"));
// const RFQViewDetails = lazy(() =>
//   import("./pages/dashboard/rfq/RFQViewDetails")
// );
// const CustomerRFQDetails = lazy(() =>
//   import("./pages/dashboard/rfq/CustomerRFQDetails")
// );

const user = localStorage.getItem("accesstoken");

if (user) {
  if (localStorage.getItem("userType") === "vendor") {
    store.dispatch(vendorAuthenticated(true));
  }
  if (localStorage.getItem("userType") === "userDashboard") {
    store.dispatch(authenticated(true));
  }
}

function App() {
  useEffect(() => {
    loadjs("/assets/js/jquery.min.js", function () {
      loadjs(
        "/assets/plugins/bootstrap/js/bootstrap.bundle.min.js",
        function () {}
      );
    });
  });

  return (
    <ToastProvider
      placement="bottom-right"
      autoDismiss
      autoDismissTimeout={5000}
    >
      {/* Firebase Implementation */}

      {/* <div>
        <Toast onClose={() => setShow(false)} show={show} delay={10000} style={{zIndex:200000,position:"fixed"}}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">{notification.title}</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body>{notification.body}</Toast.Body>
        </Toast>
      <div className="App-header">
        {isTokenFound && <h1> Notification permission enabled Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. </h1>}
        {!isTokenFound && <h1> Need notification permission  </h1>}
        <button onClick={() => setShow(true)}>Show Toast</button>
      </div>


    </div> */}

      {/* <div
      aria-live="polite"
      aria-atomic="true"
      className={`notification ${show ? "d-none" :null}`}
    >
      <ToastContainer position="botton-end" className="p-3">
        <Toast onClose={toastShow} autohide delay={15000}>
          <Toast.Header className="bg-warning text-white">
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto">{notification.title}</strong>
            <small className="text-muted">just now</small>        
          </Toast.Header>
          <Toast.Body className="alert-warning">{notification.body}</Toast.Body>
          <Toast.Body className="alert-warning">{isTokenFound && <h5> Notification permission enabled </h5>}</Toast.Body>
          <Toast.Body className="alert-warning">{!isTokenFound && <h5> Need notification permission </h5>}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div> */}

      <Suspense fallback={<CustomLoader />}>
        <Router>
          <Switch>
            <Route exact path={process.env.PUBLIC_URL + "/"} component={Home} />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/createnewenquiry"}
              component={vendorRequireAuth(CreateNewEnquiryVendor)}
            />

            {/* <Myaccount */}
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/createnewenquiry"}
              component={vendorRequireAuth(CreateNewEnquiry)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/myaccount"}
              component={vendorRequireAuth(MyAccountVendor)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/myaccount-individual"}
              component={vendorRequireAuth(MyAccountIndividual)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/myaccount-consultant"}
              component={vendorRequireAuth(VendorConsultant)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/managemis"}
              component={vendorRequireAuth(manageMis)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/managemis/:misId"}
              component={vendorRequireAuth(ManageMISList)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL + "/vendor/managemis/:misId/:misViewId"
              }
              component={vendorRequireAuth(MisViews)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/gst"}
              component={vendorRequireAuth(gstVendor)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/gst/:gstId"}
              component={vendorRequireAuth(GstVendorView)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/notification"}
              component={vendorRequireAuth(notificationVenor)}
            />
            <Route
              exact
              path={
                process.env.PUBLIC_URL + "/vendor/notification/:notificationId"
              }
              component={vendorRequireAuth(viewNotificationVenor)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/manageenquiry"}
              component={vendorRequireAuth(ManageEnquiryVendor)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor"}
              component={vendorRequireAuth(VendorDashboard)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/myWarehouses"}
              component={vendorRequireAuth(VendorMyWarehouses)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/myProductivity"}
              component={vendorRequireAuth(VendorMyProductivity)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/myOperations"}
              component={vendorRequireAuth(VendorMyOperations)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/myInventory"}
              component={vendorRequireAuth(VendorMyInventory)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/myCompliances"}
              component={vendorRequireAuth(VendorMyCompliances)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/myAudit"}
              component={vendorRequireAuth(VendorMyAudit)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/myRfqs"}
              component={vendorRequireAuth(VendorMyRfqs)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/valueAddedServices"}
              component={vendorRequireAuth(VendorValueAddedServices)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/Analytics"}
              component={vendorRequireAuth(VendorAnalytics)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/space-summary"}
              component={vendorRequireAuth(WarehouseSpaceSummary)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/demograpgy-summary"}
              component={vendorRequireAuth(DemographySummary)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/wms"}
              component={vendorRequireAuth(WMS)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/mywarehouse"}
              component={vendorRequireAuth(MyWarehouseVendor)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/feature/:featuredId"}
              component={vendorRequireAuth(FeaturedDetails)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/mywarehouserejected"}
              component={vendorRequireAuth(MyWarehouseRejected)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/warehouse-list"}
              component={vendorRequireAuth(ListOfWarehouse)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL + "/vendor/update-warehouse/:warehouseId"
              }
              component={vendorRequireAuth(UpdateOfWarehouse)}
            />
            <Route
              exact
              path={
                process.env.PUBLIC_URL +
                "/vendor/update-warehouse-rejected/:warehouseId"
              }
              component={vendorRequireAuth(UpdateOfWarehouseRejected)}
            />
            <Route
              exact
              path={
                process.env.PUBLIC_URL +
                "/vendor/warehouse-details/:warehouseId"
              }
              component={vendorRequireAuth(ShowOfWarehouse)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/addnewuser"}
              component={vendorRequireAuth(AddNewUserVendor)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/warehousemapping"}
              component={vendorRequireAuth(WarehouseMappingVendor)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL +
                "/vendor/viewuserroleandpermission/:roleId"
              }
              component={vendorRequireAuth(ViewUserRoleAndPermission)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/viewuserlogs"}
              component={vendorRequireAuth(ViewUserLogsVendor)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/managerole"}
              component={vendorRequireAuth(ManageRoleVendor)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/managerole/:roleId"}
              component={vendorRequireAuth(SubUserRoleDetails)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL + "/vendor/viewuserdetail/:subUserId"
              }
              component={vendorRequireAuth(ViewUserDetailVendor)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/edituserdetail/:userId"}
              component={vendorRequireAuth(EditSubUserDetailVendor)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/createrole"}
              component={vendorRequireAuth(CreateSubUserVendor)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/create-department"}
              component={vendorRequireAuth(CreateVendorDepartment)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/department"}
              component={vendorRequireAuth(ManageDepartment)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/department/:departmentId"}
              component={vendorRequireAuth(DepartmentDetails)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/bulkupload"}
              component={vendorRequireAuth(BulkUploadVendor)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/booking"}
              component={vendorRequireAuth(BookingVendor)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/booking-pending"}
              component={vendorRequireAuth(BookingPending)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/booking-confirm"}
              component={vendorRequireAuth(BookingConfirm)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/booking-cancel"}
              component={vendorRequireAuth(BookingCancelled)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/booking/:bookingId"}
              component={vendorRequireAuth(BookingDetailVendor)}
            />

            {/* <Route
            exact
            path={process.env.PUBLIC_URL + '/vendor/bookingdetail'}
            component={requireAuth(BookingDetailVendor)}
          /> */}

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/vendor-invoice"}
              component={vendorRequireAuth(ManageVendorInvoice)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL + "/vendor/vendor-invoice/:invoiceId"
              }
              component={vendorRequireAuth(VendorInvoiceDetails)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/create-invoice"}
              component={vendorRequireAuth(CreateInvoice)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/manage-create-invoice"}
              component={vendorRequireAuth(ManageCreatedInvoice)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/service"}
              component={vendorRequireAuth(ServiceVendor)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/service/:serviceId"}
              component={vendorRequireAuth(ServiceDetailVendor)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/other"}
              component={vendorRequireAuth(VendorOther)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/spacecertificate"}
              component={vendorRequireAuth(VendorAllSpaceCertificate)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL +
                "/vendor/vendor-space-certificate/:certificateId"
              }
              component={vendorRequireAuth(VendorSpaceCertificate)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/agreementpackage"}
              component={vendorRequireAuth(VendorAgreementPackage)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/managesubuser"}
              component={vendorRequireAuth(ManageSubUserVendor)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/viewcertificate"}
              component={vendorRequireAuth(ViewCertificate)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/noc"}
              component={vendorRequireAuth(VendorNoc)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/sop"}
              component={vendorRequireAuth(VendorSop)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/sow"}
              component={vendorRequireAuth(VendorSow)}
            />

            {/* Manage RFQ */}
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/manage-rfq"}
              component={vendorRequireAuth(ManageRFQ)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/manage-open-rfq"}
              component={vendorRequireAuth(ManageOpenRfq)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL +
                "/vendor/rfq-status/:rfqResponseId/:customerRfqId"
              }
              component={vendorRequireAuth(VendorRFQViewDetail)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL +
                "/vendor/manage-rfq/:vRequestId/:customerRfqId"
              }
              component={vendorRequireAuth(ReceiveRFQ)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL +
                "/vendor/vendor-response-detail/:vRequestId"
              }
              component={vendorRequireAuth(VendorResponseDetails)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/rfq-detail/:vRequestId"}
              component={vendorRequireAuth(RfqDetails)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/receive-rfq"}
              component={vendorRequireAuth(ReceiveRFQ)}
            />

            {/* ====================   User Accesss   =========================== */}

            <Route
              exact
              path={process.env.PUBLIC_URL + "/warehousecity"}
              component={noRequireAuth(WarehouseCity)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/whywarehousity/:whyId"}
              component={WhyWarehousity}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/blog"}
              component={Blog}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/new-blog"}
              component={NewBlog}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/glossary"}
              component={Glossary}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/glossary-detail"}
              component={GlossaryDetails}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/recently"}
              component={RecentlyGlossary}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/similar"}
              component={SimilarGlossary}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/new-blog/:slug"}
              component={NewBlogDetails}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/blog/:slug"}
              component={BlogDetails}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/explore-network"}
              component={ExploreNetwork}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/product"}
              component={noRequireAuth(Product)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/service"}
              component={Service}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/service/:categoryId"}
              component={Service}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL + "/service/:categoryId/:subCategoryId"
              }
              component={Service}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/service-detail/:serviceId"}
              component={ServiceDetails}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/create-rfq"}
              component={ServiceRfqForm}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/warehouse"}
              component={Warehouse}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/warehousecompare"}
              component={WarehouseCompare}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/Warehousedetail"}
              component={noRequireAuth(WarehouseDetail)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/wh-detail/:warehouseId"}
              component={WhDetails}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/contactUs"}
              component={ContactUs}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/feedback"}
              component={Feedback}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/wh-feedback"}
              component={WhFeedback}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + `/wh-feedback/:feedbackId`}
              component={WhFeedbackDetails}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/about"}
              component={WarehouseAbout}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/insights"}
              component={Insights}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/privacy"}
              component={PrivacyPolicy}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/terms-and-conditions"}
              component={TermsAndConditions}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/testimonial"}
              component={Testimonial}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/support"}
              component={Support}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/frequently-ask-question"}
              component={FrequentlyAskedQuestions}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/dashboard"}
              component={requireAuth(Dashboard)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/dashboard/mywarehouses"}
              component={requireAuth(DashboardMyWarehouses)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/dashboard/my-report"}
              component={requireAuth(MyReport)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/dashboard/myoperations"}
              component={requireAuth(DashboardMyOperations)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/customer-stats-by-table"}
              component={requireAuth(WarehouseStatsByTable)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/customer-stats-by-table-infra"}
              component={requireAuth(WarehouseStatsByTableInfraV2)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/customer-stats-by-table-infra2"}
              component={requireAuth(WarehouseStatsByTableInfra)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/customer-stats-by-chart-infra"}
              component={requireAuth(WarehouseStatsByChartInfra)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/customer-stats-by-map-infra"}
              component={requireAuth(WarehouseStatsByMapInfra)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/customer-stats-by-table-contact"}
              component={requireAuth(WarehouseStatsByTableContact)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/customer-stats-by-chart-contact"}
              component={requireAuth(WarehouseStatsByChartContact)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/customer-stats-by-map-contact"}
              component={requireAuth(WarehouseStatsByMapContact)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/customer-stats-by-table-score"}
              component={requireAuth(WarehouseStatsByTableScore)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/customer-stats-by-chart-score"}
              component={requireAuth(WarehouseStatsByChartScore)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/customer-stats-by-map-score"}
              component={requireAuth(WarehouseStatsByMapScore)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/customer-stats-by-chart"}
              component={requireAuth(WarehouseStatsByChart)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/customer-stats-by-map"}
              component={requireAuth(WarehouseStatsByMap)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/dashboard/myinventory"}
              component={requireAuth(DashboardMyInventory)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/dashboard/mycompliances"}
              component={requireAuth(DashboardMyCompliances)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/dashboard/myproductivity"}
              component={requireAuth(DashboardMyProductivity)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/dashboard/myaudit"}
              component={requireAuth(DashboardMyAudit)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/dashboard/myrfqs"}
              component={requireAuth(DashboardMyRFQs)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/dashboard/valueaddedservices"}
              component={requireAuth(DashboardValueAddedServices)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL +
                "/dashboard/valueaddedservices/:index/:id/:type"
              }
              component={requireAuth(ValueAddedServiceDetail)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL +
                "/dashboard/valueaddedservices/:id/:pageId"
              }
              component={requireAuth(ValueAddedServiceDetailTwo)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL +
                "/dashboard/valueaddedservices/:id/:pageId/:pageThreeId"
              }
              component={requireAuth(ValueAddedServiceDetailThree)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/dashboard/analytics"}
              component={requireAuth(DashboardAnalytics)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/dashboard/docs"}
              component={requireAuth(DashboardDocs)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/dashboard-demographics"}
              component={requireAuth(DashboardDemographics)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/dashboard-wms"}
              component={requireAuth(DashboardWMS)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/waresheet"}
              component={requireAuth(Waresheet)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/update-waresheet/:waresheetId"}
              component={requireAuth(UpdateWaresheet)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/waresheet/:waresheetId"}
              component={requireAuth(ManageWaresheet)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/myaccount"}
              component={requireAuth(MyAccount)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/reset-password"}
              component={requireAuth(ResetPassword)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/manageroles"}
              component={requireAuth(ManageRoles)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/customer-permission/:roleId"}
              component={requireAuth(ManagePermission)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL + "/role-customer-detail/:customerRoleId"
              }
              component={requireAuth(RoleDetails)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/manage-customer-department"}
              component={requireAuth(ManageCustomerDepartment)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL +
                "/manage-customer-department/:departmentId"
              }
              component={requireAuth(CustomerDepartmentDetails)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/create-customer-department"}
              component={requireAuth(CreateCustomerDepartment)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL +
                "/update-customer-department/:departmentId"
              }
              component={requireAuth(UpdateCustomerDepartment)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/user-role/:userRoleId"}
              component={requireAuth(UserRoleDetails)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/create-role"}
              component={requireAuth(CreateRole)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/update-user-role/:roleId"}
              component={requireAuth(UpdateSubUserRole)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/company"}
              component={requireAuth(Company)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/individual"}
              component={requireAuth(Individual)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/consult-account"}
              component={requireAuth(CunsultAccount)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/manageroles/:editId"}
              component={requireAuth(EditSubUserRole)}
            />

            {/* <Route
            exact
            path={process.env.PUBLIC_URL + '/manageroles/:editId'}
            component={requireAuth(EditSubUserRole)}
          /> */}

            <Route
              exact
              path={process.env.PUBLIC_URL + "/tutorials"}
              component={Tutorials}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/edit-sub-user/:userId"}
              component={requireAuth(EditSubUser)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/managesubusers"}
              component={requireAuth(ManageSubUser)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/managesubusers/:userId"}
              component={requireAuth(SubUserDetails)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/add-sub-user"}
              component={requireAuth(AddSubUser)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/bulk-upload-sub-user"}
              component={requireAuth(BulkUploadSubUser)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/warehousemapping"}
              component={requireAuth(WarehouseMapping)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/favorites"}
              component={requireAuth(Favorite)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/cart"}
              component={requireAuth(Cart)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/bookings"}
              component={requireAuth(Booking)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/bookings/:bookingId"}
              component={requireAuth(BookingDetails)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/review/:warehouseId"}
              component={requireAuth(AddReview)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/agreementpackage"}
              component={requireAuth(AgreementPackage)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/noc"}
              component={requireAuth(NOC)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/others"}
              component={requireAuth(Other)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/sop"}
              component={requireAuth(SOP)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/sow"}
              component={requireAuth(SOW)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/spacecertificate"}
              component={requireAuth(SpaceCertificate)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL +
                "/customer-space-cetificate/:certificateId"
              }
              component={requireAuth(CustomerSpaceCertificate)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/spacecertificate/:certificateId"}
              component={requireAuth(SpaceCertificateView)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/gst"}
              component={requireAuth(GST)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/gst/:gstId"}
              component={requireAuth(GstView)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/services"}
              component={requireAuth(Services)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/services/:serviceId"}
              component={requireAuth(ServicesDetails)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/services-favorite"}
              component={requireAuth(ServiceFavorite)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/mis"}
              component={requireAuth(Mis)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/mis-list/:misId/:warehouseId"}
              component={requireAuth(MisListPage)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/mis/:misId"}
              component={requireAuth(MisView)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/mywarehouse"}
              component={requireAuth(Mywarehouse)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/mywarehouse/:mywarehouseId"}
              component={requireAuth(MyWarehouseDetails)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/createnewwaresheet"}
              component={requireAuth(CreateNewWaresheet)}
            />

            {/* <Route
            exact
            path={process.env.PUBLIC_URL + '/managewaresheet'}
            component={requireAuth(ManageWaresheet)}
          /> */}

            {/* RFQ Management */}

            <Route
              exact
              path={process.env.PUBLIC_URL + "/createnewrfq"}
              component={requireAuth(CreateNewRFQ)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/conciserfq"}
              component={requireAuth(ConciseRfq)}
            />

{/* <Route
              exact
              path={process.env.PUBLIC_URL + "/conciserfq/:rfqId"}  
              component={requireAuth(ConciseRfq)}
            /> */}

            <Route
              exact
              path={process.env.PUBLIC_URL + "/rfq-create"}
              component={requireAuth(RfqCreate)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/managerfq"}
              component={requireAuth(ManageRfq)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/managerfq-wh/:rfqId"}
              component={requireAuth(ManageRfqList)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/managerfq-open/:rfqId"}
              component={requireAuth(RfqManageOpenList)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/managerfq/:rfqId/:warehouseId"}
              component={requireAuth(RFQViewDetails)}
            />

            <Route
              exact
              path={
                process.env.PUBLIC_URL +
                "/customer-rfq-details/:rfqId/:warehouseId"
              }
              component={requireAuth(CustomerRFQDetails)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/whs-rfq-details/:wResponseId"}
              component={requireAuth(WhsRFQDetails)}
            />

            {/* Enquiry Management */}

            <Route
              exact
              path={process.env.PUBLIC_URL + "/createnewenquiry"}
              component={requireAuth(CreateNewEnquiry)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/manageenquiry"}
              component={requireAuth(ManageEnquiry)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/manageenquiry/:enquiryId"}
              component={requireAuth(EnquiryDetails)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/vendor/manageenquiry/:enquiryId"}
              component={vendorRequireAuth(EnquiryDetailsVendor)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/notification"}
              component={requireAuth(Notification)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/notification/:notificationId"}
              component={requireAuth(NotificationDetails)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/keycontact"}
              component={requireAuth(KeyContact)}
            />
            {/* Invoice management */}
            <Route
              exact
              path={process.env.PUBLIC_URL + "/invoice"}
              component={requireAuth(Invoice)}
            />

            <Route
              exact
              path={process.env.PUBLIC_URL + "/news"}
              component={News}
            />
            <Route 
             exact
             path={process.env.PUBLIC_URL + "/news-details"}
              component={NewsDetails} /> 
            <Route
              exact
              path={process.env.PUBLIC_URL + "/invoice/:invoiceId"}
              component={requireAuth(ViewInvoice)}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/events"}
              component={WarehouseEvents}
            />
            <Route
              exact
              path={process.env.PUBLIC_URL + "/events-details"}
              component={EventDetails}
            />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </Suspense>
    </ToastProvider>
  );
}

export default App;
