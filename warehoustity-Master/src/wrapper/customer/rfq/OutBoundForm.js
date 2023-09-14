import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateOutboundRFQ, responseRfq } from '../../../store/actions/customer/rfqAction'
import { useSelector, useDispatch } from 'react-redux';
import FormSuccess from '../../../components/helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';
import { onlyNumberAllow, onlyAlphaNumericSpaceAllow, forDescriptionAlphaNumericAllow } from '../../../components/validation';

const OutBoundForm = ({ rfqid }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);

    const [jsonData, setJsonData] = useState({


        
        "transferOrders": [{
            "processType": "B2B Orders",
            "uom": "",
            "weightPerUom": "",
            "volume": "DAILY",
            "quantity": "",
            "vehicleType": "",
            "remark": "",
            "salesOrdersType": [{
                "processType": "B2B Orders",
                monthlyQty :"",
                orderUOM :"",
                orderQty :"",
                packingunit : "",
                vas : "",
                vasPer :"",
                qc :"",
                scanning : "",
                vehicleQty :"",
                remark : "",
                // "processType": "B2B Orders",
                // "uom": "",
                // "weightPerUom": "",
                // "volume": "DAILY",
                // "quantity": "",
                // "vehicleType": "",
                // "remark": ""
            },
            {
                "processType": "B2C Orders",
                monthlyQty :"",
                orderUOM :"",
                orderQty :"",
                packingunit : "",
                vas : "",
                vasPer :"",
                qc :"",
                scanning : "",
                vehicleQty :"",
                remark : "",
                // "processType": "B2C Orders",
                // "uom": "",
                // "weightPerUom": "",
                // "volume": "DAILY",
                // "quantity": "",
                // "vehicleType": "",
                // "remark": ""
            }
            ]
        }],
        "outbounds": [
            //     {
            //     "processType": "Vehicles Outbound",
            //     "uom": "",
            //     "weightPerUom": "",
            //     "volume": "DAILY",
            //     "quantity": "",
            //     "vehicleType": "",
            //     "remark": ""
            // },
            // {
            //     "processType": "Invoice per Vehicle",
            //     "uom": "",
            //     "weightPerUom": "",
            //     "volume": "DAILY",
            //     "quantity": "",
            //     "vehicleType": "",
            //     "remark": ""
            // }
            //     ,
            // {
            //     "processType": "Cartons/ Boxes /Pallets per vehicle",
            //     "uom": "",
            //     "weightPerUom": "",
            //     "volume": "DAILY",
            //     "quantity": "",
            //     "vehicleType": "",
            //     "remark": ""
            // }
            //     ,
            // {
            //     "processType": "Quality Check Outbound",
            //     "uom": "",
            //     "weightPerUom": "",
            //     "volume": "DAILY",
            //     "quantity": "",
            //     "vehicleType": "",
            //     "remark": ""
            // }
                
            {
                "processType": "Packings / Packaging",
                monthlyQty :"",
                orderUOM :"",
                orderQty :"",
                packingunit : "",
                vas : "",
                vasPer :"",
                qc :"",
                scanning : "",
                vehicleQty :"",
                remark : "",
                // "uom": "",
                // "weightPerUom": "",
                // "volume": "DAILY",
                // "quantity": "",
                // "vehicleType": "",
                // "remark": ""
            }
                ,
            // {
            //     "processType": "Cartonisation Packing",
            //     "uom": "",
            //     "weightPerUom": "",
            //     "volume": "DAILY",
            //     "quantity": "",
            //     "vehicleType": "",
            //     "remark": ""
            // }
            //     ,
            // {
            //     "processType": "Cartons / Pallet Weight Check",
            //     "uom": "",
            //     "weightPerUom": "",
            //     "volume": "DAILY",
            //     "quantity": "",
            //     "vehicleType": "",
            //     "remark": ""
            // }
            //     ,
            // {
            //     "processType": "Cartons / Pallet Weight Check",
            //     "uom": "",
            //     "weightPerUom": "",
            //     "volume": "DAILY",
            //     "quantity": "",
            //     "vehicleType": "",
            //     "remark": ""
            // }
            //     ,
            // {
            //     "processType": "Shipping Labels Outbound",
            //     "uom": "",
            //     "weightPerUom": "",
            //     "volume": "DAILY",
            //     "quantity": "",
            //     "vehicleType": "",
            //     "remark": ""
            // }
            //     ,
            // {
            //     "processType": "Goods Issue/Invoice/STN Generation",
            //     "uom": "",
            //     "weightPerUom": "",
            //     "volume": "DAILY",
            //     "quantity": "",
            //     "vehicleType": "",
            //     "remark": ""
            // }
            //     ,
            // {
            //     "processType": "Cartons / Pallet Loading",
            //     "uom": "",
            //     "weightPerUom": "",
            //     "volume": "DAILY",
            //     "quantity": "",
            //     "vehicleType": "",
            //     "remark": ""
            // }
            ],
    })


    const outSchema = Yup.object().shape({
        outbounds: Yup.array().of(
            Yup.object().shape({
                uom: Yup.string().required('Required').max(5, 'Must be 5 digits'),
                weightPerUom: Yup.string().required('Required').max(5, 'Must be 5 digits'),
                volume: Yup.string().required('Required'),
                quantity: Yup.string().required('Required').max(5, 'Must be 5 digits'),
                vehicleType: Yup.string().required('Required'),
                remark: Yup.string().required('Required')
            })
        ),

        transferOrders: Yup.array().of(
            Yup.object().shape({
                uom: Yup.string().required('Required').max(5, 'Must be 5 digits'),
                weightPerUom: Yup.string().required('Required').max(5, 'Must be 5 digits'),
                volume: Yup.string().required('Required'),
                quantity: Yup.string().required('Required').max(5, 'Must be 5 digits'),
                vehicleType: Yup.string().required('Required'),
                remark: Yup.string().required('Required'),

                // salesOrdersType: Yup.array().of(
                //     Yup.object().shape({
                //         uom: Yup.string().required('Required'),
                //         weightPerUom: Yup.string().required('Required'),
                //         volume: Yup.string().required('Required'),
                //         quantity: Yup.string().required('Required'),
                //         vehicleType: Yup.string().required('Required'),
                //         remark: Yup.string().required('Required')
                //     })

                // )


            })
        )


    });


    
    useEffect(() => {
        if (data.rfqInitialDetail?.outbounds && data.rfqInitialDetail?.outbounds.length !== 0) {
            setJsonData({
                "outbounds": data.rfqInitialDetail.outbounds,
                "transferOrders": [{
                    ...data.rfqInitialDetail.transferOrder[0],
                    "salesOrdersType": data.rfqInitialDetail.transferOrder[0].saleOrderType
                }]
            })
        }

        if (data.rfqFirstForm?.outbounds && data.rfqFirstForm?.outbounds.length !== 0) {
            setJsonData({
                "outbounds": data.rfqFirstForm.outbounds,
                "transferOrders": [{
                    ...data.rfqFirstForm.transferOrder[0],
                    "salesOrdersType": data.rfqFirstForm.transferOrder[0].saleOrderType
                }]
            })
        }

    }, [data]);




    return (
        <>
            {
                (data.rfqResponse.statusCode === 201 || data.rfqResponse.statusCode === 200) ?
                    <FormSuccess onClick={() => dispatch(responseRfq([]))} message={data.rfqResponse.message} />
                    : null
            }

            <Formik
                enableReinitialize={true}
                // validationSchema={outSchema}
                initialValues={jsonData}
                onSubmit={fields => {
                    delete fields.transferOrders[0].saleOrderType;
                    if (rfqid) {
                        fields["customerRfq"] = rfqid
                        // console.log("submit---->>" , fields)
                        dispatch(updateOutboundRFQ(fields, data?.rfqFirstForm?.warehouses))
                    }
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
                                                        <td className="text-left border-top-0 font-weight-bold text-nowrap py-3">Order Handling Unit</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-250px">Monthly Qty</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-150px">Order UOM</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-150px">Qty/Order</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-150px">Picking Unit</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-150px">VAS</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-150px">VAS%</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-150px">QC %</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-150px">Scanning %</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-150px">Vehicle Qty</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-200px">Remarks</td>
                                                    </tr>

                                                    {values.outbounds && values.outbounds.length > 0 &&
                                                        values.outbounds.map((man, index) => {
                                                            const boundErrors = (errors.outbounds?.length && errors.outbounds[index]) || {};
                                                            const boundTouched = (touched.outbounds?.length && touched.outbounds[index]) || {};

                                                            return (
                                                                <tr key={index}>
                                                                    <td>
                                                                        {/* {index + 1} */}
                                                                        1
                                                                    </td>
                                                                    <td className="text-left"> 
                                                                        {man?.processType}
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`outbounds.${index}.monthlyQty`} onKeyPress={(e) => onlyNumberAllow(e)} type="text" className={`form-control text-center bg-white border-0 my-1` + (boundErrors.monthlyQty && boundTouched.monthlyQty ? ' is-invalid' : '')} placeholder="Type here" />
                                                                        <ErrorMessage name={`outbounds.${index}.monthlyQty`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`outbounds.${index}.orderUOM`} onKeyPress={(e) => onlyNumberAllow(e)} type="text" className={`form-control text-center bg-white border-0 my-1` + (boundErrors.orderUOM && boundTouched.orderUOM ? ' is-invalid' : '')} placeholder="Type here" />
                                                                        <ErrorMessage name={`outbounds.${index}.orderUOM`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    {/* <td>
                                                                        <Field name={`outbounds.${index}.volume`} as="select" className="form-control h-35px bg-white border-0 my-1">
                                                                            <option value="">Select</option>
                                                                            <option value="DAILY">Daily</option>
                                                                            <option value="WEEKLY">Weekly</option>
                                                                            <option value="MONTHLY">Monthly</option>
                                                                        </Field>
                                                                    </td> */}
                                                                    <td>
                                                                        <Field name={`outbounds.${index}.orderQty`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white border-0 my-1` + (boundErrors.orderQty && boundTouched.orderQty ? ' is-invalid' : '')} placeholder="Type here" />
                                                                        <ErrorMessage name={`outbounds.${index}.orderQty`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`outbounds.${index}.packingunit`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white border-0 my-1` + (boundErrors.packingunit && boundTouched.packingunit ? ' is-invalid' : '')} placeholder="Type here" />
                                                                        <ErrorMessage name={`outbounds.${index}.packingunit`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`outbounds.${index}.vas`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white border-0 my-1` + (boundErrors.vas && boundTouched.vas ? ' is-invalid' : '')} placeholder="Type here" />
                                                                        <ErrorMessage name={`outbounds.${index}.vas`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`outbounds.${index}.vasPer`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white border-0 my-1` + (boundErrors.vasPer && boundTouched.vasPer ? ' is-invalid' : '')} placeholder="Type here" />
                                                                        <ErrorMessage name={`outbounds.${index}.vasPer`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`outbounds.${index}.qc`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white border-0 my-1` + (boundErrors.qc && boundTouched.qc ? ' is-invalid' : '')} placeholder="Type here" />
                                                                        <ErrorMessage name={`outbounds.${index}.qc`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`outbounds.${index}.scanning`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white border-0 my-1` + (boundErrors.scanning && boundTouched.scanning ? ' is-invalid' : '')} placeholder="Type here" />
                                                                        <ErrorMessage name={`outbounds.${index}.scanning`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`outbounds.${index}.vehicleQty`} onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} type="text" className={`form-control text-center bg-white border-0 my-1` + (boundErrors.vehicleQty && boundTouched.vehicleQty ? ' is-invalid' : '')} placeholder="Type here" />
                                                                        <ErrorMessage name={`outbounds.${index}.vehicleQty`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`outbounds.${index}.remark`} onKeyPress={(e) => forDescriptionAlphaNumericAllow(e)} type="text" className={`form-control text-center bg-white border-0 my-1` + (boundErrors.remark && boundTouched.remark ? ' is-invalid' : '')} placeholder="Type here" />
                                                                        <ErrorMessage name={`outbounds.${index}.remark`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                </tr>


                                                            )
                                                        })}


                                                    {values.transferOrders && values.transferOrders.length > 0 &&
                                                        values.transferOrders.map((man, index) => {

                                                            const transErrors = (errors.transferOrders?.length && errors.transferOrders[index]) || {};
                                                            const transTouched = (touched.transferOrders?.length && touched.transferOrders[index]) || {};
                                                            return (
                                                                <>
                                                                    <>
                                                                        <tr key={index}>
                                                                            <td>
                                                                                2
                                                                            </td>
                                                                            <td className="text-left">
                                                                                Transfer Orders -
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>

                                                                            </td>
                                                                            <td className="text-left">
                                                                                {man.processType}
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`transferOrders.${index}.monthlyQty`} onKeyPress={(e) => onlyNumberAllow(e)} type="text" className={`form-control text-center bg-white border-0 my-1` + (transErrors.monthlyQty && transTouched.monthlyQty ? ' is-invalid' : '')} placeholder="Type here" />
                                                                                <ErrorMessage name={`transferOrders.${index}.monthlyQty`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`transferOrders.${index}.orderUOM`} onKeyPress={(e) => onlyNumberAllow(e)} type="text" className={`form-control text-center bg-white border-0 my-1` + (transErrors.orderUOM && transTouched.orderUOM ? ' is-invalid' : '')} placeholder="Type here" />
                                                                                <ErrorMessage name={`transferOrders.${index}.orderUOM`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                            {/* <td>
                                                                                <Field name={`transferOrders.${index}.volume`} as="select" className="form-control h-35px bg-white border-0 my-1">
                                                                                    <option value="">Select</option>
                                                                                    <option value="DAILY">Daily</option>
                                                                                    <option value="WEEKLY">Weekly</option>
                                                                                    <option value="MONTHLY">Monthly</option>
                                                                                </Field>
                                                                            </td> */}
                                                                            <td>
                                                                                <Field name={`transferOrders.${index}.orderQty`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white border-0 my-1` + (transErrors.orderQty && transTouched.orderQty ? ' is-invalid' : '')} placeholder="Type here" />
                                                                                <ErrorMessage name={`transferOrders.${index}.orderQty`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`transferOrders.${index}.packingunit`} type="text" className={`form-control text-center bg-white border-0 my-1` + (transErrors.packingunit && transTouched.packingunit ? ' is-invalid' : '')} placeholder="Type here" />
                                                                                <ErrorMessage name={`transferOrders.${index}.packingunit`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`transferOrders.${index}.vas`} type="text" className={`form-control text-center bg-white border-0 my-1` + (transErrors.vas && transTouched.vas ? ' is-invalid' : '')} placeholder="Type here" />
                                                                                <ErrorMessage name={`transferOrders.${index}.vas`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`transferOrders.${index}.vasPer`} type="text" className={`form-control text-center bg-white border-0 my-1` + (transErrors.vasPer && transTouched.vasPer ? ' is-invalid' : '')} placeholder="Type here" />
                                                                                <ErrorMessage name={`transferOrders.${index}.vasPer`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`transferOrders.${index}.qc`} type="text" className={`form-control text-center bg-white border-0 my-1` + (transErrors.qc && transTouched.qc ? ' is-invalid' : '')} placeholder="Type here" />
                                                                                <ErrorMessage name={`transferOrders.${index}.qc`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`transferOrders.${index}.scanning`} type="text" className={`form-control text-center bg-white border-0 my-1` + (transErrors.scanning && transTouched.scanning ? ' is-invalid' : '')} placeholder="Type here" />
                                                                                <ErrorMessage name={`transferOrders.${index}.scanning`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`transferOrders.${index}.vehicleQty`} type="text" className={`form-control text-center bg-white border-0 my-1` + (transErrors.vehicleQty && transTouched.vehicleQty ? ' is-invalid' : '')} placeholder="Type here" />
                                                                                <ErrorMessage name={`transferOrders.${index}.vehicleQty`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`transferOrders.${index}.remark`} onKeyPress={(e) => forDescriptionAlphaNumericAllow(e)} type="text" className={`form-control text-center bg-white border-0 my-1` + (transErrors.remark && transTouched.remark ? ' is-invalid' : '')} placeholder="Type here" />
                                                                                <ErrorMessage name={`transferOrders.${index}.remark`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                    <tr>
                                                                        <td>

                                                                        </td>

                                                                        <td className="text-left">
                                                                            Sales Orders -
                                                                        </td>
                                                                    </tr>
                                                                    <>
                                                                        {
                                                                            man.salesOrdersType.map((salse, index) => {
                                                                                return (
                                                                                    <tr key={index}>
                                                                                        <td>
                                                                                            {/* {index+1} */}
                                                                                        </td>
                                                                                        <td className="text-left">
                                                                                            {salse.processType}
                                                                                        </td>
                                                                                        <td>
                                                                                            <Field name={`transferOrders.${0}.salesOrdersType.${index}.monthlyQty`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white border-0 my-1`} placeholder="Type here" />
                                                                                            {/* <ErrorMessage name={`transferOrders.${0}.salesOrdersType.${index}.uom`} component="div" className="invalid-feedback" /> */}
                                                                                        </td>
                                                                                        <td>
                                                                                            <Field name={`transferOrders.${0}.salesOrdersType.${index}.orderUOM`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className="form-control text-center bg-white border-0 my-1" placeholder="Type here" />
                                                                                        </td>
                                                                                        {/* <td>
                                                                                            <Field name={`transferOrders.${0}.salesOrdersType.${index}.orderQty`} as="select" className="form-control h-35px bg-white border-0 my-1">
                                                                                                <option value="">Select</option>
                                                                                                <option value="DAILY">Daily</option>
                                                                                                <option value="WEEKLY">Weekly</option>
                                                                                                <option value="MONTHLY">Monthly</option>
                                                                                            </Field>
                                                                                        </td> */}
                                                                                        <td>
                                                                                            <Field name={`transferOrders.${0}.salesOrdersType.${index}.orderQty`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className="form-control text-center bg-white border-0 my-1" placeholder="Type here" />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Field name={`transferOrders.${0}.salesOrdersType.${index}.packingunit`} type="text" onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} className="form-control text-center bg-white border-0 my-1" placeholder="Type here" />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Field name={`transferOrders.${0}.salesOrdersType.${index}.vas`} type="text" onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} className="form-control text-center bg-white border-0 my-1" placeholder="Type here" />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Field name={`transferOrders.${0}.salesOrdersType.${index}.vasPer`} type="text" onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} className="form-control text-center bg-white border-0 my-1" placeholder="Type here" />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Field name={`transferOrders.${0}.salesOrdersType.${index}.qc`} type="text" onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} className="form-control text-center bg-white border-0 my-1" placeholder="Type here" />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Field name={`transferOrders.${0}.salesOrdersType.${index}.scanning`} type="text" onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} className="form-control text-center bg-white border-0 my-1" placeholder="Type here" />
                                                                                        </td>
                                                                                        <td>
                                                                                            <Field name={`transferOrders.${0}.salesOrdersType.${index}.vehicleQty`} type="text" onKeyPress={(e) => onlyAlphaNumericSpaceAllow(e)} className="form-control text-center bg-white border-0 my-1" placeholder="Type here" />
                                                                                        </td>
                                                                                         
                                                                                        <td>
                                                                                            <Field name={`transferOrders.${0}.salesOrdersType.${index}.remark`} onKeyPress={(e) => forDescriptionAlphaNumericAllow(e)} type="text" className="form-control text-center bg-white border-0 my-1" placeholder="Type here" />
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
                                    <div className="col-12 mt-5">
                                        <div className="row justify-content-end">

                                            <div className="col-auto">
                                                <button disabled={data.isLoading} type="submit" className="btn btn-deep-primary mb-3 add-className remove-className">Save
                                                    {data.isLoading ? <Spinner animation="border" /> : null}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    )
                }}
            />
        </>
    );
}

export default OutBoundForm;
