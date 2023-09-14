import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import { CardLoader } from '../../../../components/helper/CustomLoader';

const OutBoundForm = () => {
    const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);
    const [jsonData, setJsonData] = useState({
        "outbounds": [{
            "processType": "Vehicles Outbound",
            "uom": "uom",
            "weightPerUom": "weightPerUom",
            "volume": "DAILY",
            "quantity": 10,
            "vehicleType": "vehicleType",
            "remark": "remark"
        },
        {
            "processType": "Invoice per Vehicle",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        }
            ,
        {
            "processType": "Cartons/ Boxes /Pallets per vehicle",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        }
            ,
        {
            "processType": "Quality Check Outbound",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        }
            ,
        {
            "processType": "Quality Check Outbound",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        }
            ,
        {
            "processType": "Packing / Packaging",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        }
            ,
        {
            "processType": "Cartonisation Packing",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        }
            ,
        {
            "processType": "Cartons / Pallet Weight Check",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        }
            ,
        {
            "processType": "Cartons / Pallet Weight Check",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        }
            ,
        {
            "processType": "Shipping Labels Outbound",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        }
            ,
        {
            "processType": "Goods Issue/Invoice/STN Generation",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        }
            ,
        {
            "processType": "Cartons / Pallet Loading",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        }
        ],
        "transferOrders": [{
            "processType": "B2B Orders",
            "uom": "uom",
            "weightPerUom": "weightPerUom-upadted",
            "volume": "DAILY",
            "quantity": 80,
            "vehicleType": "vehicleType",
            "remark": "remark",
            "salesOrdersType": [{
                "transferOrderType": "B2B Orders",
                "uom": "uom",
                "weightPerUom": "weightPerUom-upadted",
                "volume": "DAILY",
                "quantity": 80,
                "vehicleType": "vehicleType",
                "remark": "remark"
            },
            {
                "transferOrderType": "B2C Orders",
                "uom": "uom",
                "weightPerUom": "weightPerUom-upadted",
                "volume": "DAILY",
                "quantity": 80,
                "vehicleType": "vehicleType",
                "remark": "remark"
            }
            ]
        }]
    })

    useEffect(() => {
        if (data.rfqDetail.outbounds && data.rfqDetail.outbounds.length !== 0) {
            setJsonData({
                "outbounds": data.rfqDetail.outbounds,
                "transferOrders": [{
                    ...data.rfqDetail.transferOrder[0],
                    "salesOrdersType": data.rfqDetail.transferOrder[0].saleOrderType
                }]
            })
        }

    }, [data.rfqDetail]);


    return (
        <>
            {
                data.isLoading ? <CardLoader loaderCard="loaderCard" /> :

                    <Formik
                        enableReinitialize={true}
                        // validationSchema={manSchema}
                        initialValues={jsonData}
                        onSubmit={fields => {
                            console.log("---->", fields)
                        }}

                        render={({ values, errors, status, onChange, touched }) => {
                            return (
                                <div className="w-100 d-block">
                                    <Form>
                                        <div className="row pt-2">

                                            <div className="col-12 ml-0">
                                                <div className="table-responsive border bg-deep-gray rounded-md table-cell">
                                                    <table className="table text-center">
                                                        <tbody>
                                                            <tr>
                                                                <td className="border-top-0 font-weight-bold py-3">S.no</td>
                                                                <td className="text-left border-top-0 font-weight-bold text-nowrap py-3">Process Description</td>
                                                                <td className="border-top-0 font-weight-bold py-3 mw-250px">UoM</td>
                                                                <td className="border-top-0 font-weight-bold text-nowrap py-3">Weight per UOM</td>
                                                                <td className="border-top-0 font-weight-bold py-3 w-100px">Daily/Weekly/Monthly Volume</td>
                                                                <td className="border-top-0 font-weight-bold py-3 mw-150px">Qty</td>
                                                                <td className="border-top-0 font-weight-bold text-nowrap py-3">Vehicle Type</td>
                                                                <td className="border-top-0 font-weight-bold py-3 mw-200px">Remarks</td>
                                                            </tr>

                                                            {values.outbounds && values.outbounds.length > 0 &&
                                                                values.outbounds.map((man, index) => {
                                                                    return (


                                                                        <tr>
                                                                            <td>
                                                                                {index + 1}
                                                                            </td>
                                                                            <td className="text-left">
                                                                                {man.processType}
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`outbounds.${index}.uom`} type="text" className="form-control text-center bg-white border-0 my-1" placeholder="# Vehicles" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`outbounds.${index}.weightPerUom`} type="text" className="form-control text-center bg-white border-0 my-1" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`outbounds.${index}.volume`} as="select" className="form-control h-35px bg-white border-0 my-1">
                                                                                    <option value="DAILY">Daily</option>
                                                                                    <option value="WEEKLY">Weekly</option>
                                                                                    <option value="MONTHLY">Monthly</option>
                                                                                </Field>
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`outbounds.${index}.quantity`} type="number" className="form-control text-center bg-white border-0 my-1" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`outbounds.${index}.vehicleType`} type="text" className="form-control text-center bg-white border-0 my-1" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`outbounds.${index}.remark`} type="text" className="form-control text-center bg-white border-0 my-1" />
                                                                            </td>
                                                                        </tr>


                                                                    )
                                                                })}


                                                            {values.transferOrders && values.transferOrders.length > 0 &&
                                                                values.transferOrders.map((man, index) => {
                                                                    return (
                                                                        <>
                                                                            <>
                                                                                <tr key={index}>
                                                                                    <td>
                                                                                        13
                                                                                    </td>
                                                                                    <td className="text-left">
                                                                                        Transfer Orders
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td>
                                                                                        {/* {index+1} */}
                                                                                    </td>
                                                                                    <td className="text-left">
                                                                                        {man.processType}
                                                                                    </td>
                                                                                    <td>
                                                                                        <Field name={`transferOrders.${index}.uom`} type="text" className="form-control text-center bg-white border-0 my-1" placeholder="# Vehicles" />
                                                                                    </td>
                                                                                    <td>
                                                                                        <Field name={`transferOrders.${index}.weightPerUom`} type="text" className="form-control text-center bg-white border-0 my-1" />
                                                                                    </td>
                                                                                    <td>
                                                                                        <Field name={`transferOrders.${index}.volume`} as="select" className="form-control h-35px bg-white border-0 my-1">
                                                                                            <option>Daily</option>
                                                                                            <option>Weekly</option>
                                                                                            <option>Monthly</option>
                                                                                        </Field>
                                                                                    </td>
                                                                                    <td>
                                                                                        <Field name={`transferOrders.${index}.quantity`} type="number" className="form-control text-center bg-white border-0 my-1" />
                                                                                    </td>
                                                                                    <td>
                                                                                        <Field name={`transferOrders.${index}.vehicleType`} type="text" className="form-control text-center bg-white border-0 my-1" />
                                                                                    </td>
                                                                                    <td>
                                                                                        <Field name={`transferOrders.${index}.remark`} type="text" className="form-control text-center bg-white border-0 my-1" />
                                                                                    </td>
                                                                                </tr>
                                                                            </>
                                                                            <tr>
                                                                                <td>

                                                                                </td>

                                                                                <td className="text-left">
                                                                                    Sales Orders
                                                                                </td>
                                                                            </tr>
                                                                            <>
                                                                                {
                                                                                    man.salesOrdersType.map((salse, i) => {
                                                                                        return (
                                                                                            <tr key={i}>
                                                                                                <td>
                                                                                                    {/* {index+1} */}
                                                                                                </td>
                                                                                                <td className="text-left">
                                                                                                    {salse.transferOrderType}
                                                                                                </td>
                                                                                                <td>
                                                                                                    <Field name={`transferOrders.${0}.salesOrdersType.${index}.uom`} type="text" className="form-control text-center bg-white border-0 my-1" placeholder="# Vehicles" />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <Field name={`transferOrders.${0}.salesOrdersType.${index}.weightPerUom`} type="text" className="form-control text-center bg-white border-0 my-1" />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <Field name={`transferOrders.${0}.salesOrdersType.${index}.volume`} as="select" className="form-control h-35px bg-white border-0 my-1">
                                                                                                        <option>Daily</option>
                                                                                                        <option>Weekly</option>
                                                                                                        <option>Monthly</option>
                                                                                                    </Field>
                                                                                                </td>
                                                                                                <td>
                                                                                                    <Field name={`transferOrders.${0}.salesOrdersType.${index}.quantity`} type="number" className="form-control text-center bg-white border-0 my-1" />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <Field name={`transferOrders.${0}.salesOrdersType.${index}.vehicleType`} type="text" className="form-control text-center bg-white border-0 my-1" />
                                                                                                </td>
                                                                                                <td>
                                                                                                    <Field name={`transferOrders.${0}.salesOrdersType.${index}.remark`} type="text" className="form-control text-center bg-white border-0 my-1" />
                                                                                                </td>
                                                                                            </tr>

                                                                                        )
                                                                                    })
                                                                                }

                                                                            </>
                                                                        </>

                                                                    )
                                                                })}



                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                    </Form>
                                </div>
                            )
                        }}
                    />
            }
        </>
    );
}

export default OutBoundForm;
