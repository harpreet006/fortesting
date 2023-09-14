import React, { useEffect, useState } from "react";
import Layout from "../../../../layout/Layout";
import CustomerLayout from "../../../../layout/CustomerLayout";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
// import TablePagination from '@mui/material/TablePagination';
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from "@mui/utils";
import pinCode from "../../../../json/pincode.json";
import {
  customerBookingAuth,
  bookingList,
} from "../../../../store/actions/customer/bookingAction";
import { useSelector, useDispatch } from "react-redux";
import { getWarehouseListByFilter } from "../../../../components/utils";
import BackButton from "../../../../components/helper/BackButton";
// import { typeByPage } from "../../../../store/actions/whyAction";
// import { categoryByPage } from "../../../../store/actions/categoryAction";
// import { getCustomerDemograpgy } from "../../../../store/actions/dashboardAction";

function createData(
  name,
  warehouseid,
  fat,
  carbs,
  protein,
  category,
  cfa,
  Industry,
  Product,
  Area,
  Count
) {
  return {
    name,
    warehouseid,
    fat,
    carbs,
    protein,
    category,
    cfa,
    Industry,
    Product,
    Area,
    Count,
  };
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Warehouse Name",
  },
  {
    id: "warehouseid",
    numeric: true,
    disablePadding: false,
    label: "Warehouse Id",
  },
  {
    id: "fat",
    numeric: true,
    disablePadding: false,
    label: "State Code",
  },
  {
    id: "carbs",
    numeric: true,
    disablePadding: false,
    label: "District",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Warehouse Type",
  },
  {
    id: "category",
    numeric: true,
    disablePadding: false,
    label: "Warehouse Category",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "CFA Name",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Industry",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Product",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "Area",
  },
  {
    id: "protein",
    numeric: true,
    disablePadding: false,
    label: "WH Count",
  },
];

function EnhancedTableHead(props) {
  // eslint-disable-next-line
  const {
    // onSelectAllClick,
    order,
    orderBy,
    // numSelected,
    // rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
        </TableCell> */}
        <TableCell>
          Sr.No.
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            className="text-nowrap"
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {false ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {/* Warehouse */}
        </Typography>
      )}

      {/* {false ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )} */}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const WarehouseStatsByTable = () => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("warehouseid");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const category = useSelector((state) => state.CATEGORY_INFO.categoryList);
  const typeWh = useSelector((state) => state.WHY_INFO);

  const dispatch = useDispatch();
  const data = useSelector((state) => state.BOOKINGINFO);
  const [rows, setRows] = useState([]);
  const [filterState, setFilterState] = useState({});
  const [warehouseList, setWarehouseList] = useState([]);
  const [location, setLocation] = useState("all");
  // eslint-disable-next-line
  const [selectedType, setSelectedType] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const [districtName, setDistrictName] = useState([]);

  async function getFilteredWarehouses() {
    const wareHouseListFilter = getWarehouseListByFilter(
      filterState,
      warehouseList
    );

    let whList = [];
    if (wareHouseListFilter && wareHouseListFilter.length > 0) {
      setRows([]);

      wareHouseListFilter.map((warehouse) => {
        whList.push(
          createData(
            warehouse?.warehouseName,

            warehouse?.warehouseId,
            warehouse?.warehouseContactDetailInfo?.address?.pinCode,
            warehouse?.warehouseContactDetailInfo?.address?.district,
            warehouse?.type?.type,
            warehouse?.category?.categoryName,
            "",
            "",
            "",
            warehouse?.warehouseContactDetailInfo?.address?.city,
            ""
          )
        );

        return whList;
      });
      setRows(whList);
    } else {
      setRows(whList);
    }
  }

  useEffect(() => {
    const warehouse = [];
    const whidList = [];
    if (data.bookingList && data.bookingList.length > 0) {
      let whList = [];
      data.bookingList.map((item) => {
        // if(!whidList.includes(item.warehouse.id)){
        warehouse.push(item.warehouse);
        whidList.push(item.warehouse.id);

        whList.push(
          createData(
            item.warehouse?.warehouseName,

            item.warehouse?.warehouseId,
            item.warehouse?.warehouseContactDetailInfo?.address?.pinCode,
            item.warehouse?.warehouseContactDetailInfo?.address?.district,
            item.warehouse?.type?.type,
            item.warehouse?.category?.categoryName,
            "",
            "",
            "",
            item.warehouse?.warehouseContactDetailInfo?.address?.city,
            ""
          )
        );

        // }
        return whList;
      });
      setRows(whList);
      setWarehouseList(warehouse);
    }
  }, [data]);

  async function stateSelectionChange(state) {
    // 233227

    filterState.state = [state.toUpperCase()];
    filterState.city = ["all".toUpperCase()];
    setFilterState(filterState);

    getFilteredWarehouses();

    const district = new Set();
    // console.log('pin--', pin)
    await pinCode.forEach((pin) => {
      if (pin.stateName === state.toUpperCase()) {
        district.add(pin.districtName);
      }
    });
    console.log(Array.from(district));
    setDistrictName(Array.from(district));
    return Array.from(district);
  }

  async function typeSelectionChange(warehouseType) {
    // 233227

    setSelectedType(warehouseType);
    filterState.warehouseType = [warehouseType.toUpperCase()];
    setFilterState(filterState);
    getFilteredWarehouses();
  }

  async function categorySelectionChange(warehouseCategory) {
    // 233227

    setSelectedCategory(warehouseCategory);
    filterState.warehouseCategory = [warehouseCategory.toUpperCase()];
    setFilterState(filterState);
    getFilteredWarehouses();
  }

  const demographyCall = (state) => {
    if (state !== "") {
      stateSelectionChange(state);
      setLocation(state);
    }
  };

  const demographyCallByCity = (city) => {
    setSelectedDistrict(city);

    filterState.city = [city.toUpperCase()];
    setFilterState(filterState);

    getFilteredWarehouses();
  };

  const options = [
    // { value: '0', label: 'Select State' },

    { value: "1", label: "Andaman & Nicobar" },
    { value: "2", label: "Andhra Pradesh" },
    { value: "3", label: "Arunachal Pradesh" },
    { value: "4", label: "Assam" },
    { value: "5", label: "Bihar" },
    { value: "6", label: "Chandigarh" },
    { value: "7", label: "Chhattisgarh" },
    { value: "8", label: "Dadra & Nagar Haveli" },
    { value: "9", label: "Daman & Diu" },
    { value: "10", label: "Delhi" },
    { value: "11", label: "Goa" },
    { value: "12", label: "Gujarat" },
    { value: "13", label: "Haryana" },
    { value: "14", label: "Himachal Pradesh" },
    { value: "15", label: "Jammu & Kashmir" },
    { value: "16", label: "Jharkhand" },
    { value: "17", label: "Karnataka" },
    { value: "18", label: "Kerala" },
    { value: "19", label: "Lakshadweep" },
    { value: "20", label: "Madhya Pradesh" },
    { value: "21", label: "Maharashtra" },
    { value: "22", label: "Manipur" },
    { value: "23", label: "Meghalaya" },
    { value: "24", label: "Mizoram" },
    { value: "25", label: "Nagaland" },
    { value: "26", label: "Orissa" },
    { value: "27", label: "Pondicherry" },
    { value: "28", label: "Punjab" },
    { value: "29", label: "Rajasthan" },
    { value: "30", label: "Sikkim" },
    { value: "31", label: "Tamil Nadu" },
    { value: "32", label: "Tripura" },
    { value: "33", label: "Uttar Pradesh" },
    { value: "34", label: "Uttaranchal" },
    { value: "35", label: "West Bengal" },
  ];

  // Booking Data Fetch

  useEffect(() => {
    dispatch(customerBookingAuth(parseInt(1)));

    return () => {
      dispatch(bookingList([]));
    };
  }, [dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // eslint-disable-next-line
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // eslint-disable-next-line
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // eslint-disable-next-line
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    useEffect(() => {
      document.getElementsByTagName("footer")[0].classList.add("d-none");
    });
  
  return (
    <Layout>
      <CustomerLayout title={`Dashboard`} subtitle={"My Operations"}>
        <div className="row">
          <div className="content col-12 shadow-sm">
            <div className="dashboard-btns pb-1 border-bottom mb-2 d-flex justify-content-between">
              <nav className="pt-3" aria-label="breadcrumb">
                <ol class="breadcrumb bg-transparent py-0 pl-0 mb-1 px-2">
                  <li class="breadcrumb-item ">
                    <Link to="/dashboard" className="text-dark">
                      My Dashboard
                    </Link>
                  </li>
                  <li
                    class="breadcrumb-item active text-warning"
                    aria-current="page"
                  >
                    My Warehouses
                  </li>
                </ol>
              </nav>
              <BackButton />
            </div>

            <div className="tab-content" id="pills-tabContent">
              <div className="dashboard-cards row ">
                <div className="row mx-0">
                  <div className="col-md-3 align-self-center">
                    <h6 className="mb-md-0">My Warehouses</h6>
                  </div>
                  <div className="col-auto text-end ml-auto mr-0 pr-0">
                    <div className="dashboard-btns  mb-0">
                      <ul
                        className="nav nav-pills common-tabs3 "
                        id="pills-tab"
                        role="tablist"
                      >
                        <li className="nav-item">
                          <Link
                            to="/customer-stats-by-table"
                            className="nav-link btn-sm btn py-2 mt-0 active"
                          >
                            Informative View
                          </Link>
                        </li>

                        <li className="nav-item">
                          <Link
                            to="/customer-stats-by-chart"
                            className="nav-link btn-sm btn py-2 mt-0 mr-0"
                          >
                            Demography View
                          </Link>
                        </li>

                        {/* <li className="nav-item">
                          <Link
                            to="/customer-stats-by-map"
                            className="nav-link btn-sm btn py-2 mt-0 mr-0"
                          >
                            Map View
                          </Link>
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 mb-3 d-flex shadow-sm py-4 px-3 mx-3 border bg-white">
                        <select
                          value={location}
                          onChange={(e) => demographyCall(e.target.value)}
                          className="common-select form-select form-control"
                          style={{ width: "100%" }}
                        >
                          <option value="">Select State</option>
                          <option value="all">All</option>

                          {options && options.length > 0
                            ? options.map((item, index) => {
                                return (
                                  <option value={item.label} key={index}>
                                    {item.label}
                                  </option>
                                );
                              })
                            : null}
                        </select>

                        <select
                          value={selectedDistrict}
                          onChange={(e) => demographyCallByCity(e.target.value)}
                          className="common-select form-select form-control ml-2"
                          style={{ width: "100%" }}
                        >
                          <option value="">Select District</option>
                          <option value="all">All</option>

                          {districtName && districtName.length > 0
                            ? districtName.map((item, index) => {
                                return (
                                  <option value={item} key={index}>
                                    {item}
                                  </option>
                                );
                              })
                            : null}
                        </select>

                        <select
                          value={selectedCategory}
                          onChange={(e) =>
                            categorySelectionChange(e.target.value)
                          }
                          className="common-select form-select form-control mx-1"
                          style={{ width: "100%" }}
                        >
                          <option value="">Select Category</option>
                          <option value="all">All</option>

                          {category && category.length > 0
                            ? category
                                .filter((item) => item.categoryStatus === true)
                                .map((item, index) => {
                                  return (
                                    <option
                                      value={item.categoryName}
                                      key={index}
                                      className="text-capitalize"
                                    >
                                      {item.categoryName}
                                    </option>
                                  );
                                })
                            : null}
                        </select>

                        <select
                          value={selectedType}
                          onChange={(e) => typeSelectionChange(e.target.value)}
                          className="common-select form-select form-control"
                          style={{ width: "100%" }}
                        >
                          <option value="">Select Type</option>
                          <option value="all">All</option>

                          {typeWh.typeList?.data &&
                          typeWh.typeList?.data?.length > 0
                            ? typeWh.typeList.data.map((item, index) => {
                                return (
                                  <option
                                    value={item.type}
                                    key={index}
                                    className="text-capitalize"
                                  >
                                    {item.type}
                                  </option>
                                );
                              })
                            : null}
                        </select>
                      </div>

                      {/* <div className="col-lg-6 col-md-6 col-sm-6 mt-2">
                                                Total Warehouse :{" "}
                                                {data.customerDemography?.totalWarehouse}
                                            </div> */}
                    </div>
                  </div>
                </div>

                <Box sx={{ width: "100%" }} className="custom-table-tablecontainer">
                  <Paper sx={{ width: "100%", mb: 2 }}>
                    {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
                    <TableContainer className="">
                      <Table
                        bordered
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? "small" : "medium"}
                        className="table-custom-th-none"
                      >
                        <EnhancedTableHead
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={handleSelectAllClick}
                          onRequestSort={handleRequestSort}
                          rowCount={rows.length}
                        />
                        <TableBody>
                          {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                                                     rows.slice().sort(getComparator(order, orderBy)) */}
                          {stableSort(rows, getComparator(order, orderBy))
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.name);
                              const labelId = `enhanced-table-checkbox-${index}`;

                              return (
                                <TableRow
                                  hover
                                  onClick={(event) =>
                                    handleClick(event, row.name)
                                  }
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.name}
                                  selected={isItemSelected}
                                >
                                  {/* <TableCell padding="checkbox">
                                    <Checkbox
                                                                            color="primary"
                                                                            checked={isItemSelected}
                                                                            inputProps={{
                                                                                'aria-labelledby': labelId,
                                                                            }}
                                                                        />
                                  </TableCell> */}
                                  <TableCell>
                                    {index+1}
                                  </TableCell>
                                  <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                  >
                                    {row.name}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.warehouseid}
                                  </TableCell>
                                  <TableCell align="right">{row.fat}</TableCell>
                                  <TableCell align="right">
                                    {row.carbs}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.protein}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.category}
                                  </TableCell>
                                  <TableCell align="right">{row.cfa}</TableCell>
                                  <TableCell align="right">
                                    {row.Industry}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.Product}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.Area}
                                  </TableCell>
                                  <TableCell align="right">
                                    {row.Count}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          {emptyRows > 0 && (
                            <TableRow
                              style={{
                                height: (dense ? 33 : 53) * emptyRows,
                              }}
                            >
                              <TableCell colSpan={6} />
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    {/* <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]}
                                            component="div"
                                            count={rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        /> */}
                  </Paper>
                  {/* <FormControlLabel
                                        control={<Switch checked={dense} onChange={handleChangeDense} />}
                                        label="Dense padding"
                                    /> */}
                </Box>
              </div>
            </div>
          </div>
        </div>
      </CustomerLayout>
    </Layout>
  );
};

export default WarehouseStatsByTable;
