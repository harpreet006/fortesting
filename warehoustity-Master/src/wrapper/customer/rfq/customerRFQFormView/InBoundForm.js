import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import { CardLoader } from '../../../../components/helper/CustomLoader';

const InBoundForm = ({ isView }) => {
    const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);

    const [jsonData, setJsonData] = useState([
        {
            "processType": "pro typeupdate",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        },
        {
            "processType": "Vehicles Inbound",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        },
        {
            "processType": "Invoice per Vehicle",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        },
        {
            "processType": "Cartons/ Boxes /Pallets per vehicle",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        },
        {
            "processType": "SKU Items per Invoice",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        },
        {
            "processType": " Generate barcode/Lable/Sticker",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        },
        {
            "processType": "Scanning Inbound",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        },
        {
            "processType": "MRN/GRN in System",
            "uom": "",
            "weightPerUom": "",
            "volume": "",
            "quantity": "",
            "vehicleType": "",
            "remark": ""
        }
    ])

    const inboundSchema = Yup.object().shape({
        inbounds: Yup.array().of(
            Yup.object().shape({
                uom: Yup.string().required('Required'),
                weightPerUom: Yup.string().required('Required'),
                volume: Yup.string().required('Required'),
                quantity: Yup.string().required('Required'),
                vehicleType: Yup.string().required('Required'),
                remark: Yup.string().required('Required')
            })
        )
    });


    useEffect(() => {

        if (data.rfqDetail && data.rfqDetail.inbounds && data.rfqDetail.inbounds.length > 0) {
            setJsonData(data.rfqDetail.inbounds)
        }

    }, [data.rfqDetail]);


    return (
        <>
            {
                data.isLoading ? <CardLoader loaderCard="loaderCard" /> :
                    <Formik
                        enableReinitialize={true}
                        validationSchema={inboundSchema}
                        initialValues={{ "inbounds": jsonData }}
                        onSubmit={fields => {
                            console.log("---->", fields)
                        }}

                        render={({ values, errors, status, onChange, touched }) => {
                            return (
                                <div className="w-100 d-block">
                                    <Form >


                                        <div className="row pt-2">

                                            <div className="col-12 ml-0">
                                                <div className="table-responsive border bg-deep-gray rounded-md table-cell">
                                                    <table className="table text-center">

                                                        <thead>
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
                                                        </thead>
                                                        <tbody>


                                                            {values.inbounds.length > 0 &&
                                                                values.inbounds.map((bound, index) => {
                                                                    const boundErrors = (errors.inbounds?.length && errors.inbounds[index]) || {};
                                                                    const boundTouched = (touched.inbounds?.length && touched.inbounds[index]) || {};
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>
                                                                                {index + 1}
                                                                            </td>
                                                                            <td className="text-left">
                                                                                {bound.processType}
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`inbounds.${index}.uom`} type="text" className={`form-control text-center bg-white my-1` + (boundErrors.uom && boundTouched.uom ? ' is-invalid' : '')} placeholder="Nos" readOnly={isView} />
                                                                                <ErrorMessage name={`inbounds.${index}.uom`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`inbounds.${index}.weightPerUom`} type="text" className={`form-control text-center bg-white my-1` + (boundErrors.weightPerUom && boundTouched.weightPerUom ? ' is-invalid' : '')} readOnly={isView} />
                                                                                <ErrorMessage name={`inbounds.${index}.weightPerUom`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`inbounds.${index}.volume`} as="select" className={`form-control h-35px bg-white  my-1` + (boundErrors.volume && boundTouched.volume ? ' is-invalid' : '')} readOnly={isView} >
                                                                                    <option value="DAILY">Daily</option>
                                                                                    <option value="WEEKLY">Weekly</option>
                                                                                    <option value="MONTHLY">Monthly</option>
                                                                                </Field>
                                                                                <ErrorMessage name={`inbounds.${index}.volume`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`inbounds.${index}.quantity`} type="number" className={`form-control text-center bg-white  my-1` + (boundErrors.quantity && boundTouched.quantity ? ' is-invalid' : '')} placeholder="60" readOnly={isView} />
                                                                                <ErrorMessage name={`inbounds.${index}.quantity`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`inbounds.${index}.vehicleType`} type="text" className={`form-control text-center bg-white my-1` + (boundErrors.vehicleType && boundTouched.vehicleType ? ' is-invalid' : '')} placeholder="20Ft" readOnly={isView} />
                                                                                <ErrorMessage name={`inbounds.${index}.vehicleType`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                            <td>
                                                                                <Field name={`inbounds.${index}.remark`} type="text" className={`form-control text-center bg-white my-1` + (boundErrors.remark && boundTouched.remark ? ' is-invalid' : '')} placeholder="Approx" readOnly={isView} />
                                                                                <ErrorMessage name={`inbounds.${index}.remark`} component="div" className="invalid-feedback" />
                                                                            </td>
                                                                        </tr>

                                                                    )
                                                                })}


                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <div className={`col-12 mt-5 ${isView ? "d-none" : ""}`}>
                                                <div className="row justify-content-end">
                                                    {/* <div className="col-auto">
                <button type="button" className="btn btn-outline-deep-primary mb-3 add-className remove-className" data-add-target=".steps4" data-add-target-className="d-none" data-remove-target=".steps3" data-remove-target-className="d-none">Back</button>
                </div> */}
                                                    <div className="col-auto">
                                                        <button disabled={data.isLoading} type="submit" className="btn btn-deep-primary mb-3 add-className remove-className">Submit
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
            }
        </>
    );
}

export default InBoundForm;
