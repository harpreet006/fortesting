import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage, getIn } from 'formik';
import * as Yup from 'yup';
import { updateMhInfra, changeWarehouseStatus } from '../../../store/actions/vendor/warehouseList';
import { useDispatch, useSelector } from 'react-redux';
import FormSuccess from '../../helper/FormSuccess';
import { onlyNumberAllow, readableDate } from '../../validation';
import Spinner from 'react-bootstrap/Spinner';
import ErrorCard, { FormErrorCard } from '../../helper/ErrorCard';
import { CardLoader } from '../../helper/CustomLoader';

const UpdateMHInfraForm = ({warehouseId, viewMood }) => {
  const [initValue, setInitValue] = useState(
    {
      pickingTrolley: "",
      hydraulicDockLevler: "",
      batteryOperatedPalletTruck: "",
      handPalletTruck: "",
      electricStacker: "",
      shrinkAndStretchWrapMachine: "",
      others: "",
      pallets: {
        quantity: "",
        remark: ""
      },
      weighingMachine: {
        validFrom: "",
        validTill: ""
      },
      forkLifts: [{
        type: "batteryoperated",
        capacityTon: ""
      }, {
        type: "dieseloperated",
        capacityTon: ""
      }],
      hydraCrane: {
        loadCapacity: "",
        remark: ""
      }
    }
  )
  const dispatch = useDispatch()
  const data = useSelector((state) => state.WAREHOUSELIST);
  // console.log("MH STATE===>", data.singleFormData);

  useEffect(() => {

    let mhInfo = data.singleFormData.mhInfraInfo

    if (mhInfo !== null && mhInfo !== undefined) {

      setInitValue(
        {
          pickingTrolley: mhInfo.pickingTrolley !== undefined ? mhInfo.pickingTrolley : "",
          hydraulicDockLevler: mhInfo !== null ? mhInfo.hydraulicDockLevler : "",
          batteryOperatedPalletTruck: mhInfo !== null ? mhInfo.batteryOperatedPalletTruck : "",
          handPalletTruck: mhInfo !== null ? mhInfo.handPalletTruck : "",
          electricStacker: mhInfo !== null ? mhInfo.electricStacker : "",
          shrinkAndStretchWrapMachine: mhInfo !== null ? mhInfo.shrinkAndStretchWrapMachine : "",
          others: mhInfo !== null ? mhInfo.others : "",
          pallets: {
            quantity: mhInfo !== null ? mhInfo.pallets.quantity : "",
            remark: mhInfo !== null ? mhInfo.pallets.remark : ""
          },
          weighingMachine: {
            validFrom: (mhInfo !== null && mhInfo.weighingMachine !== null) ? mhInfo.weighingMachine.validFrom : "",
            validTill: (mhInfo !== null && mhInfo.weighingMachine !== null) ? mhInfo.weighingMachine.validTill : ""
          },
          forkLifts: [{
            type: "batteryoperated",
            capacityTon: (mhInfo !== null && mhInfo.forkLifts.length > 0) ? mhInfo.forkLifts[0].capacityTon : ""
          }, {
            type: "dieseloperated",
            capacityTon: (mhInfo !== null && mhInfo.forkLifts.length > 0) ? mhInfo.forkLifts[1].capacityTon : ""
          }],
          hydraCrane: {
            loadCapacity: mhInfo !== null ? mhInfo.hydraCrane.loadCapacity : "",
            remark: mhInfo !== null ? mhInfo.hydraCrane.remark : ""
          }
        }
      )

      setYesForm({
        palletYes: mhInfo && mhInfo.pallets.quantity ? true : false,
        handPalletYes: mhInfo && mhInfo.handPalletTruck ? true : false,
        weighingMachineYes: mhInfo && mhInfo.weighingMachine.validFrom ? true : false,
        pickingTrolleyYes: mhInfo && mhInfo.pickingTrolley ? true : false,
        hydraulicYes: mhInfo && mhInfo.hydraulicDockLevler ? true : false,
        batteryYes: mhInfo && mhInfo.batteryOperatedPalletTruck ? true : false,
        forkliftYes: mhInfo && mhInfo.forkLifts[0].capacityTon ? true : false,
        forkliftDieselYes: mhInfo && mhInfo.forkLifts[1].capacityTon ? true : false,
        electricYes: mhInfo && mhInfo.electricStacker ? true : false,
        hydraYes: true,
        shrinkYes: mhInfo && mhInfo.shrinkAndStretchWrapMachine ? true : false,
      })


    }
  }, [data.singleFormData])

  // console.log("initValue==>", initValue)

  // Only for Disable and enable
  const [yesForm, setYesForm] = useState({
    palletYes: false,
    handPalletYes: false,
    weighingMachineYes: false,
    pickingTrolleyYes: false,
    hydraulicYes: false,
    batteryYes: false,
    forkliftYes: false,
    forkliftDieselYes: false,
    electricYes: false,
    hydraYes: false,
    shrinkYes: false
  })

  const {
    palletYes,
    handPalletYes,
    weighingMachineYes,
    pickingTrolleyYes,
    hydraulicYes,
    batteryYes,
    forkliftYes,
    forkliftDieselYes,
    electricYes,
    hydraYes,
    shrinkYes
  } = yesForm;

  const handleChange = (e) => {
    setYesForm({ ...yesForm, [e.target.name]: e.target.value === "true" });
  }


  const mhInfraSchema = Yup.object().shape({
    pallets: Yup.lazy(() => {
      if (palletYes) {
        return Yup.object().shape({
          quantity: Yup.number().required('Required'),
          remark: Yup.string().matches(/^[\w .,!?()]+$/, 'Please enter valid Remark')
          ,
        })
      }
      return Yup.mixed().notRequired();
    }),

    handPalletTruck: Yup.lazy(() => {
      if (handPalletYes) {
        return Yup.string().required('Required')
      }
      return Yup.mixed().notRequired();
    }),
    pickingTrolley: Yup.lazy(() => {
      if (pickingTrolleyYes) {
        return Yup.string().required('Required')
      }
      return Yup.mixed().notRequired();
    }),
    hydraulicDockLevler: Yup.lazy(() => {
      if (hydraulicYes) {
        return Yup.number().required('Required')
      }
      return Yup.mixed().notRequired();
    }),
    batteryOperatedPalletTruck: Yup.lazy(() => {
      if (batteryYes) {
        return Yup.string().required('Required')
      }
      return Yup.mixed().notRequired();
    }),
    electricStacker: Yup.lazy(() => {
      if (electricYes) {
        return Yup.string().required('Required')
      }
      return Yup.mixed().notRequired();
    }),
    shrinkAndStretchWrapMachine: Yup.lazy(() => {
      if (shrinkYes) {
        return Yup.number().required('Required')
      }
      return Yup.mixed().notRequired();
    }),
    others: Yup.lazy(() => {
      return Yup.string().matches(/^[\w .,!?()]+$/, 'Please enter valid')
    }),

    weighingMachine: Yup.lazy(() => {
      if (weighingMachineYes) {
        return Yup.object().shape({
          validFrom: Yup.string().required('Required'),
          validTill: Yup.string().required('Required')
        })
      }
      return Yup.mixed().notRequired();
    }),

    hydraCrane: Yup.lazy(() => {
      if (hydraYes) {
        return Yup.object().shape({
          loadCapacity: Yup.string().required('Required'),
          remark: Yup.string().matches(/^[\w .,!?()]+$/, 'Please enter valid Remark')
          ,
        })
      }
      return Yup.mixed().notRequired();
    }),

    // forkLifts: Yup.array().of(
    //         Yup.object().shape({
    //           capacityTon: Yup.string().required('Required')
    //         }) 
    //       )


  });

  // console.log(viewMood)

  return (
    <>
      {/* Loader */}

      {data.isLoading ? <CardLoader /> : (data.isError !== "" ?
        <ErrorCard message={data.isError} />
        :
        <>

          {
            data.addNewResponse.statusCode === 201 ?
              <FormSuccess onClick={() => dispatch(changeWarehouseStatus())} message={data.addNewResponse.message} />
              : null
          }

          <div className="row align-items-center pb-3 mx-0 overflow-auto">
            <div className="col-12">

              <Formik
                enableReinitialize={true}
                initialValues={

                  initValue

                }
                validationSchema={mhInfraSchema}
                onSubmit={fields => {

                  if (palletYes === false) {
                    fields.pallets.quantity = ""
                  }

                  if (handPalletYes === false) {
                    fields.handPalletTruck = ""
                  }
                  // if( weighingMachineYes&&new Date(safetyForm.fireABCTill)<new Date(safetyForm.fireABCFrom)){
                  //   isError = false;
                  //   errors['validTill'] = "Valid Till Date Invalid";
                  // }
                  // if(weighingMachineYes===false){
                  //   fields.weighingMachine.validFrom=""
                  //   fields.weighingMachine.validTill=""
                  // }

                  if (pickingTrolleyYes === false) {
                    fields.pickingTrolley = ""
                  }

                  if (hydraulicYes === false) {
                    fields.hydraulicDockLevler = ""
                  }

                  if (batteryYes === false) {
                    fields.batteryOperatedPalletTruck = ""
                  }

                  if (forkliftYes === false) {
                    fields.forkLifts[0].capacityTon = ""
                  }

                  if (forkliftDieselYes === false) {
                    fields.forkLifts[1].capacityTon = ""
                  }

                  if (electricYes === false) {
                    fields.electricStacker = ""
                  }

                  if (hydraYes === false) {
                    fields.hydraCrane.loadCapacity = ""
                    fields.hydraCrane.remark = ""
                  }
                  if (shrinkYes === false) {
                    fields.shrinkAndStretchWrapMachine = ""
                  }

                  fields["warehouse"] = warehouseId

                  // console.log("MHInfora===>", fields);

                  dispatch(updateMhInfra(fields))

                }}

                render={({ errors, status, onChange, touched, values }) => {

                  const fieldClass = (fieldName, isYes) => {
                    return 'form-control form-control-sm bg-white px-4' + (isYes ? errors[fieldName] && touched[fieldName] ? ' is-invalid' : '' : '')
                  }

                  return (
                    <Form>
                      <div className="row bg-white rounded mx-0 col-xxxl-11">
                        <div className="col-12 border-0 border-bottom-0 table-responsive table-collapse">
                          <table className="table customTable">
                            <tbody>
                              <tr className='border'>
                                <td className="">
                                  <p className="mb-0">Pallets:</p>
                                </td>
                                <td className="col-auto form-group d-flex border-0 mt-2 mb-0">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={palletYes} className="common-radio-deep-blue-input" type="radio" name="palletYes" id="palletYes" value={true} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-2" htmlFor="palletYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={!palletYes} className="common-radio-deep-blue-input" type="radio" name="palletYes" id="palletYes1" value={false} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-2" htmlFor="palletYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto mt-1">
                                  <p className="mb-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field onKeyPress={(e) => onlyNumberAllow(e)} name="pallets.quantity" type="number" disabled={!palletYes} className={'form-control form-control-sm bg-white px-4 mb-2' + (palletYes ? (getIn(errors, 'pallets.quantity') && getIn(touched, 'pallets.quantity') ? ' is-invalid' : '') : '')} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="pallets.quantity" component="div" className="invalid-feedback" />
                                </td>
                                <td className="">
                                  <Field type="text" name="pallets.remark" disabled={!palletYes} className={'form-control form-control-sm bg-white px-4 mb-2' + (palletYes ? (getIn(errors, 'pallets.remark') && getIn(touched, 'pallets.remark') ? ' is-invalid' : '') : '')} placeholder="Remarks" readOnly={viewMood} />
                                  <ErrorMessage name="pallets.remark" component="div" className="invalid-feedback" />


                                </td>
                              </tr>
                              {/* {console.log("nm sdn",errors)} */}
                              {/* <p style={{color:"red"}}>{errors["pallets.remark"]}</p> */}

                              <tr className='border'>
                                <td className="">
                                  <p className="mb-0 pb-2">Hand Pallet Truck(Hydraulic):</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline  border-0 mt-2 mb-0">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={handPalletYes} className="common-radio-deep-blue-input" type="radio" name="handPalletYes" id="handPalletYes" value={true} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="handPalletYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={!handPalletYes} className="common-radio-deep-blue-input" type="radio" name="handPalletYes" id="handPalletYes1" value={false} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="handPalletYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto mt-1">
                                  <p className="mb-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field type="number" name="handPalletTruck" disabled={!handPalletYes} className={fieldClass('handPalletTruck', handPalletYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="handPalletTruck" component="div" className="invalid-feedback" />
                                </td>
                                <td></td>
                              </tr>
                              <tr className='border'>
                                <td className="">
                                  <p className="mb-0">Weighing Machine:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline  border-0 mt-2 mb-0">
                                  <div className="form-check common-radio-deep-blue mx-3 mt-1">
                                    <input onChange={(e) => handleChange(e)} checked={weighingMachineYes} className="common-radio-deep-blue-input" type="radio" name="weighingMachineYes" id="weighingMachineYes" value={true} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="weighingMachineYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3 mt-1">
                                    <input onChange={(e) => handleChange(e)} checked={!weighingMachineYes} className="common-radio-deep-blue-input" type="radio" name="weighingMachineYes" id="weighingMachineYes1" value={false} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="weighingMachineYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="mb-0 text-nowrap">Calliberated on:</p>
                                </td>
                                <td className="py-0">
                                  <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid from</label>
                                  <Field name="weighingMachine.validFrom" disabled={!weighingMachineYes} type="date" value={readableDate(values.weighingMachine.validFrom ? values.weighingMachine.validFrom : "")} className={'form-control form-control-sm bg-white px-4' + (weighingMachineYes ? (getIn(errors, 'weighingMachine.validFrom') && getIn(touched, 'weighingMachine.validFrom') ? ' is-invalid' : '') : '')} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="weighingMachine.validFrom" component="div" className="invalid-feedback" />
                                </td>
                                <td className="py-0">
                                  <label htmlFor="" className="mb-0 px-4 small text-uppercase">Valid till</label>
                                  <Field name="weighingMachine.validTill" disabled={!weighingMachineYes} type="date" value={readableDate(values.weighingMachine.validTill ? values.weighingMachine.validTill : "")} className={'form-control form-control-sm bg-white px-4' + (weighingMachineYes ? (getIn(errors, 'weighingMachine.validTill') && getIn(touched, 'weighingMachine.validTill') ? ' is-invalid' : '') : '')} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="weighingMachine.validTill" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <tr className="border">
                                <td className="">
                                  <p className="mb-0">Picking Trolley:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mt-2 mb-0">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={pickingTrolleyYes} className="common-radio-deep-blue-input" type="radio" name="pickingTrolleyYes" id="pickingTrolleyYes" value={true} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="pickingTrolleyYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={!pickingTrolleyYes} className="common-radio-deep-blue-input" type="radio" name="pickingTrolleyYes" id="pickingTrolleyYes1" value={false} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="pickingTrolleyYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto py-1">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="py-1">
                                  <Field type="number" name="pickingTrolley" disabled={!pickingTrolleyYes} className={fieldClass('pickingTrolley', pickingTrolleyYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="pickingTrolley" component="div" className="invalid-feedback" />
                                </td>
                                <td></td>
                              </tr>
                              <tr className='border'>
                                <td className="">
                                  <p className="mb-0 pb-2">Hydraulic Dock Levler:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline  border-0 mt-2 mb-0">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={hydraulicYes} className="common-radio-deep-blue-input" type="radio" name="hydraulicYes" id="hydraulicYes" value={true} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="hydraulicYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={!hydraulicYes} className="common-radio-deep-blue-input" type="radio" name="hydraulicYes" id="hydraulicYes1" value={false} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="hydraulicYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto mt-1">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field type="number" name="hydraulicDockLevler" disabled={!hydraulicYes} className={fieldClass('hydraulicDockLevler', hydraulicYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="hydraulicDockLevler" component="div" className="invalid-feedback" />
                                </td>
                                <td></td>
                              </tr>
                              <tr className='border'>
                                <td className="">
                                  <p className="mb-0 pb-2"> Battery Operated Pallet Truck(BOPT)</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline  border-0 mt-2 mb-0">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={batteryYes} className="common-radio-deep-blue-input" type="radio" name="batteryYes" id="batteryYes" value={true} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="batteryYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={!batteryYes} className="common-radio-deep-blue-input" type="radio" name="batteryYes" id="batteryYes1" value={false} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="batteryYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto mt-1">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field type="number" name="batteryOperatedPalletTruck" disabled={!batteryYes} className={fieldClass('batteryOperatedPalletTruck', batteryYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="batteryOperatedPalletTruck" component="div" className="invalid-feedback" />
                                </td>
                                <td></td>
                              </tr>
                              <tr className="border">
                                <td className="">
                                  <p className="mb-0 pb-2">Forklift (Battery Operated):</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline  border-0 mt-2 mb-0">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={forkliftYes} className="common-radio-deep-blue-input" type="radio" name="forkliftYes" id="forkliftYes" value={true} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="forkliftYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={!forkliftYes} className="common-radio-deep-blue-input" type="radio" name="forkliftYes" id="forkliftYes1" value={false} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="forkliftYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0"> Capacity in ton:</p>
                                </td>
                                <td className="">
                                  <Field type="number" name={`forkLifts[${0}].capacityTon`} disabled={!forkliftYes} className={'form-control form-control-sm bg-white px-4 mb-2'} placeholder="Ton Capacity" readOnly={viewMood} />
                                  {/* <ErrorMessage name={`forkLifts[${0}].capacityTon`} component="div" className="invalid-feedback" /> */}
                                </td>
                                <td></td>
                              </tr>
                              <tr className='border'>
                                <td className="">
                                  <p className="mb-0">Forklift (Diesel Operated):</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline  border-0 mt-2 mb-0">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={forkliftDieselYes} className="common-radio-deep-blue-input" type="radio" name="forkliftDieselYes" id="forkliftDieselYes" value={true} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="forkliftDieselYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={!forkliftDieselYes} className="common-radio-deep-blue-input" type="radio" name="forkliftDieselYes" id="forkliftDieselYes1" value={false} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="forkliftDieselYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="mb-0"> Capacity in ton:</p>
                                </td>
                                <td className="">
                                  <Field type="number" name={`forkLifts[${1}].capacityTon`} disabled={!forkliftDieselYes} className={'form-control form-control-sm bg-white px-4 mb-2'} placeholder="Ton Capacity" readOnly={viewMood} />
                                  {/* <ErrorMessage name={`forkLifts[${1}].capacityTon`} component="div" className="invalid-feedback" /> */}
                                </td>
                                <td></td>
                              </tr>
                              <tr className='border'>
                                <td className="">
                                  <p className="mb-0 pb-2">Electric Stacker:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline border-0 mt-2 mb-0">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={electricYes} className="common-radio-deep-blue-input" type="radio" name="electricYes" id="electricYes" value={true} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="electricYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={!electricYes} className="common-radio-deep-blue-input" type="radio" name="electricYes" id="electricYes1" value={false} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="electricYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto mt-1">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td className="">
                                  <Field type="number" name="electricStacker" disabled={!electricYes} className={fieldClass('electricStacker', electricYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="electricStacker" component="div" className="invalid-feedback" />
                                </td>
                                <td></td>
                              </tr>
                              <tr className='border'>
                                <td className="">
                                  <p className="mb-0 pb-1">Hydra Crane:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline  border-0 mt-2 mb-0">
                                  <div className="form-check common-radio-deep-blue mx-3 mt-1">
                                    <input onChange={(e) => handleChange(e)} checked={hydraYes} className="common-radio-deep-blue-input" type="radio" name="hydraYes" id="hydraYes" value={true} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="hydraYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3 mt-1">
                                    <input onChange={(e) => handleChange(e)} checked={!hydraYes} className="common-radio-deep-blue-input" type="radio" name="hydraYes" id="hydraYes1" value={false} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="hydraYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Load Capacity:</p>
                                </td>
                                <td className="">
                                  <Field name="hydraCrane.loadCapacity" as="select" className={"form-control form-control-sm custom-select bg-white px-4 common-select-deep-blue" + (hydraYes ? (getIn(errors, 'hydraCrane.loadCapacity') && getIn(touched, 'hydraCrane.loadCapacity') ? ' is-invalid' : '') : '')} id="exampleFormControlSelect1" disabled={viewMood || !hydraYes} >
                                    <option>Select</option>
                                    <option>10T</option>
                                    <option>15T</option>
                                    <option>20T</option>
                                    <option>others</option>
                                  </Field>
                                  <ErrorMessage name="hydraCrane.loadCapacity" component="div" className="invalid-feedback" />
                                </td>
                                <td>
                                  {/* eslint-disable-next-line */}
                                  <Field type="text" name="hydraCrane.remark" className={"form-control form-control-sm bg-white px-4" + (hydraYes ? (getIn(errors, 'hydraCrane.remark') && getIn(touched, 'hydraCrane.remark') ? ' is-invalid' : '') : '')} id="exampleFormControlSelect1" disabled={viewMood || !hydraYes} placeholder="Remarks" readOnly={viewMood} />
                                  <ErrorMessage name="hydraCrane.remark" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              <p  style={{ color: "red" }}>{errors["hydraCrane.remark"]}</p>

                              <tr className='border'>
                                <td className="">
                                  <p className="mb-0 pb-2">Shrink / Stretch Wrap Machine:</p>
                                </td>
                                <td className="col-auto form-inline form-group form-inline  border-0 mt-2 mb-0">
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={shrinkYes} className="common-radio-deep-blue-input" type="radio" name="shrinkYes" id="shrinkYes" value={true} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="shrinkYes">Yes</label>
                                  </div>
                                  <div className="form-check common-radio-deep-blue mx-3">
                                    <input onChange={(e) => handleChange(e)} checked={!shrinkYes} className="common-radio-deep-blue-input" type="radio" name="shrinkYes" id="shrinkYes1" value={false} hidden="" disabled={viewMood} />
                                    <label className="common-radio-deep-blue-label pl-4" htmlFor="shrinkYes1">No</label>
                                  </div>
                                </td>
                                <td className="col-auto">
                                  <p className="my-0">Qty:</p>
                                </td>
                                <td>
                                  <Field type="number" name="shrinkAndStretchWrapMachine" disabled={!shrinkYes} className={fieldClass('shrinkAndStretchWrapMachine', shrinkYes)} placeholder="" readOnly={viewMood} />
                                  <ErrorMessage name="shrinkAndStretchWrapMachine" component="div" className="invalid-feedback" />
                                </td>
                                <td></td>
                              </tr>
                              <tr className='border'>
                                <td className="">
                                  <p className="mb-0 pb-1">Others:</p>
                                </td>
                                <td className="" colSpan="4">
                                  <Field as="textarea" name="others" className={'form-control form-control-sm bg-white px-4 rounded-sm' + (errors.others && touched.others ? ' is-invalid' : '')} placeholder="" rows="3" readOnly={viewMood} ></Field>
                                  <ErrorMessage name="others" component="div" className="invalid-feedback" />
                                </td>
                              </tr>
                              {/* <p style={{color:"red"}}>{errors["others"]}</p> */}

                            </tbody>

                          </table>
                        </div>

                        <div className={`col-12 mt-4 ${viewMood ? 'd-none' : ''}`}>
                          <div className="row justify-content-end">
                            {Object.keys(errors).length !== 0 ? <FormErrorCard message="Fill All Required Fields" /> : null}
                            {data.isError !== "" ? <FormErrorCard message={data.isError} /> : null}

                            {/* <div className="col-auto"> */}
                            {/* <button type="button" className="btn btn-outline-deep-blue add-class remove-class" data-add-target=".steps5" data-add-target-class="d-none" data-remove-target=".steps4" data-remove-target-class="d-none">Back</button> */}
                            {/* </div> */}
                            <div className="col-auto">
                              <button type="submit"  className="btn btn-deep-primary add-class remove-class px-5">Save
                                {data.isPending ? <Spinner animation="border" /> : null}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )
                }}

              />
            </div>
          </div>

        </>)
      }

    </>
  )
}

export default UpdateMHInfraForm
