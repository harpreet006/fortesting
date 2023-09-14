import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateInboundRFQ, responseRfq } from '../../../store/actions/customer/rfqAction'
import { useSelector, useDispatch } from 'react-redux';
import FormSuccess from '../../../components/helper/FormSuccess';
import Spinner from 'react-bootstrap/Spinner';
import { onlyNumberAllow, onlyAlphaNumericSpaceAllow, forDescriptionAlphaNumericAllow } from '../../../components/validation';

const InBoundForm = ({ isView, rfqid }) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.CUSTOMER_RFQ_INFO);

    const [jsonData, setJsonData] = useState([
        // {
        //     "processType": "pro typeupdate",
        //     "uom": "",
        //     "weightPerUom": "",
        //     "volume": "DAILY",
        //     "quantity": "",
        //     "vehicleType": "",
        //     "remark": ""
        // },
        {
            "processType": "Carton Box",
            monthlyQty: "",
            weightUnit: "",
            handlingUnit: "",
            putawayUnit: "",
            qc: "",
            vas: "",
            vasPer: "",
            scanning: "",
            vehicleQty: "",
            remark: "",

            "uom": "",
            "weightPerUom": "",
            "volume": "DAILY",
            "quantity": 0,
            "vehicleType": "",
            // "uom": "",
            // "weightPerUom": "",
            // "volume": "DAILY",
            // "quantity": "",
            // "vehicleType": "",
            // "remark": ""
        },
        {
            "processType": "Pallets",
            monthlyQty: "",
            weightUnit: "",
            handlingUnit: "",
            putawayUnit: "",
            qc: "",
            vas: "",
            vasPer: "",
            scanning: "",
            vehicleQty: "",
            remark: "",

            "uom": "",
            "weightPerUom": "",
            "volume": "DAILY",
            "quantity": 0,
            "vehicleType": "",
            // "uom": "",
            // "weightPerUom": "",
            // "volume": "DAILY",
            // "quantity": "",
            // "vehicleType": "",
            // "remark": ""
        },
        {
            "processType": "Bags",
            monthlyQty: "",
            weightUnit: "",
            handlingUnit: "",
            putawayUnit: "",
            qc: "",
            vas: "",
            vasPer: "",
            scanning: "",
            vehicleQty: "",
            remark: "",

            "uom": "",
            "weightPerUom": "",
            "volume": "DAILY",
            "quantity": 0,
            "vehicleType": "",
            // "uom": "",
            // "weightPerUom": "",
            // "volume": "DAILY",
            // "quantity": "",
            // "vehicleType": "",
            // "remark": ""
        },
        {
            "processType": "Each",
            monthlyQty: "",
            weightUnit: "",
            handlingUnit: "",
            putawayUnit: "",
            qc: "",
            vas: "",
            vasPer: "",
            scanning: "",
            vehicleQty: "",
            remark: "",

            "uom": "",
            "weightPerUom": "",
            "volume": "DAILY",
            "quantity": 0,
            "vehicleType": "",
            // "uom": "",
            // "weightPerUom": "",
            // "volume": "DAILY",
            // "quantity": "",
            // "vehicleType": "",
            // "remark": ""
        },
        {
            "processType": " Sale / Returns (Yes / No)",
            monthlyQty: "",
            weightUnit: "",
            handlingUnit: "",
            putawayUnit: "",
            qc: "",
            vas: "",
            vasPer: "",
            scanning: "",
            vehicleQty: "",
            remark: "",

            "uom": "",
            "weightPerUom": "",
            "volume": "DAILY",
            "quantity": 0,
            "vehicleType": "",

            // saleReturn : ""

            // "uom": "",
            // "weightPerUom": "",
            // "volume": "DAILY",
            // "quantity": "",
            // "vehicleType": "",
            // "remark": ""
        },
        // {
        //     "processType": "Scanning Inbound",
        // "uom": "",
        // "weightPerUom": "",
        // "volume": "DAILY",
        // "quantity": "",
        // "vehicleType": "",
        //     "remark": ""
        // },
        // {
        //     "processType": "MRN/GRN in System",
        //     "uom": "",
        //     "weightPerUom": "",
        //     "volume": "DAILY",
        //     "quantity": "",
        //     "vehicleType": "",
        //     "remark": ""
        // }
    ])

    const inboundSchema = Yup.object().shape({
        inbounds: Yup.array().of(
            Yup.object().shape({
                uom: Yup.string().required('Required').max(5, 'Must be 5 digits'),
                weightPerUom: Yup.string().required('Required').max(5, 'Must be 5 digits'),
                volume: Yup.string().required('Required'),
                quantity: Yup.string().required('Required').max(5, 'Must be 5 digits'),
                vehicleType: Yup.string().required('Required')
            })
        )
    });


    useEffect(() => {

        if (data.rfqInitialDetail?.inbounds && data.rfqInitialDetail?.inbounds.length > 0) {
            setJsonData(
                data.rfqInitialDetail.inbounds.map((item, i) => {
                    return (
                        {
                            "processType": item.processType,
                            "uom": item.uom,
                            "weightPerUom": item.weightPerUom,
                            "volume": item.volume,
                            "quantity": item.quantity,
                            "vehicleType": item.vehicleType,
                            "remark": item.remark,

                            monthlyQty: item.monthlyQty,
                            weightUnit: item.weightUnit,
                            handlingUnit: item.handlingUnit,
                            putawayUnit: item.putawayUnit,
                            qc: item.qc,
                            vas: item.vas,
                            vasPer: item.vasPer,
                            scanning: item.scanning,
                            vehicleQty: item.vehicleQty, 
                        }
                    )
                })
            )
        }

        if (data.rfqFirstForm?.inbounds && data.rfqFirstForm?.inbounds.length > 0) {
            setJsonData(
                data.rfqFirstForm.inbounds.map((item, i) => {
                    return (
                        {
                            "processType": item.processType,
                            "uom": item.uom,
                            "weightPerUom": item.weightPerUom,
                            "volume": item.volume,
                            "quantity": item.quantity,
                            "vehicleType": item.vehicleType,
                            "remark": item.remark,
                            monthlyQty: item.monthlyQty,
                            weightUnit: item.weightUnit,
                            handlingUnit: item.handlingUnit,
                            putawayUnit: item.putawayUnit,
                            qc: item.qc,
                            vas: item.vas,
                            vasPer: item.vasPer,
                            scanning: item.scanning,
                            vehicleQty: item.vehicleQty, 
                        }
                    )
                })
            )
        }

    }, [data]);


    return (
        <>
            {
                (data.rfqResponse.statusCode === 200 || data.rfqResponse.statusCode === 201) ?
                    <FormSuccess onClick={() => dispatch(responseRfq([]))} message={data.rfqResponse.message} />
                    : null
            }


            <Formik
                enableReinitialize={true}
                // validationSchema={inboundSchema}
                initialValues={{ "inbounds": jsonData }}
                onSubmit={fields => {
                    if (rfqid) {
                        fields["customerRfq"] = rfqid
                        // console.log("---->", fields)
                        // console.log("---->", fields)
                        dispatch(updateInboundRFQ(fields,data?.rfqFirstForm?.warehouses))
                    }
                    // console.log("---->", fields)
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
                                                        <td className="text-left border-top-0 font-weight-bold text-nowrap py-3">Receving Handling Unit</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-250px">Monthly Qty</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-200px">Weight/Unit</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-200px">Handling Unit </td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-200px">Put-Away Unit</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-200px">QC %</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-200px">VAS</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-200px">VAS%</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-200px">Scanning %</td>
                                                        <td className="border-top-0 font-weight-bold py-3 mw-200px">Vehicle Qty</td>
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
                                                                        <Field name={`inbounds.${index}.monthlyQty`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1` + (boundErrors.monthlyQty && boundTouched.monthlyQty ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                                                        <ErrorMessage name={`inbounds.${index}.monthlyQty`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`inbounds.${index}.weightUnit`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1` + (boundErrors.weightUnit && boundTouched.weightUnit ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                                                        <ErrorMessage name={`inbounds.${index}.weightUnit`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`inbounds.${index}.handlingUnit`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1` + (boundErrors.handlingUnit && boundTouched.handlingUnit ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                                                        <ErrorMessage name={`inbounds.${index}.handlingUnit`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    {/* <td>
                                                                        <Field name={`inbounds.${index}.volume`} as="select" className={`form-control h-35px bg-white  my-1` + (boundErrors.volume && boundTouched.volume ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} >
                                                                            <option value="">Select</option>
                                                                            <option value="DAILY">Daily</option>
                                                                            <option value="WEEKLY">Weekly</option>
                                                                            <option value="MONTHLY">Monthly</option>
                                                                        </Field>
                                                                        <ErrorMessage name={`inbounds.${index}.volume`} component="div" className="invalid-feedback" />
                                                                    </td> */}
                                                                    <td>
                                                                        <Field name={`inbounds.${index}.putawayUnit`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white  my-1` + (boundErrors.putawayUnit && boundTouched.putawayUnit ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                                                        <ErrorMessage name={`inbounds.${index}.putawayUnit`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`inbounds.${index}.qc`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1` + (boundErrors.qc && boundTouched.qc ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                                                        <ErrorMessage name={`inbounds.${index}.qc`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`inbounds.${index}.vas`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1` + (boundErrors.vas && boundTouched.vas ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                                                        <ErrorMessage name={`inbounds.${index}.vas`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`inbounds.${index}.vasPer`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1` + (boundErrors.vasPer && boundTouched.vasPer ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                                                        <ErrorMessage name={`inbounds.${index}.vasPer`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`inbounds.${index}.scanning`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1` + (boundErrors.scanning && boundTouched.scanning ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                                                        <ErrorMessage name={`inbounds.${index}.scanning`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`inbounds.${index}.vehicleQty`} onKeyPress={(e) => onlyNumberAllow(e)} type="number" className={`form-control text-center bg-white my-1` + (boundErrors.vehicleQty && boundTouched.vehicleQty ? ' is-invalid' : '')} placeholder="Type here" readOnly={isView} />
                                                                        <ErrorMessage name={`inbounds.${index}.vehicleQty`} component="div" className="invalid-feedback" />
                                                                    </td>
                                                                    <td>
                                                                        <Field name={`inbounds.${index}.remark`} onKeyPress={(e) => forDescriptionAlphaNumericAllow(e)} type="text" className={`form-control text-center bg-white my-1`} placeholder="Type here" readOnly={isView} />
                                                                        {/* <ErrorMessage name={`inbounds.${index}.remark`} component="div" className="invalid-feedback" /> */}
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

export default InBoundForm;
