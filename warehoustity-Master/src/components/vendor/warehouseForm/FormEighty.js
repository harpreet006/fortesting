import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  updateForm80,
  changeWarehouseStatus,
} from "../../../store/actions/vendor/warehouseList";
import Spinner from "react-bootstrap/Spinner";
import FormSuccess from "../../helper/FormSuccess";
import ErrorCard, { FormErrorCard } from "../../helper/ErrorCard";
import { CardLoader } from "../../helper/CustomLoader";

const FormEighty = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.WAREHOUSELIST);
  // console.log("Form 80 Data===>", data.singleFormData)

  const [jsonData, setJsonData] = useState([
    {
      heading: "Accessibility",
      parameter:
        "How wide is the Road Access to the warehouse from the main road - Ft",
      fieldType: "number",
      input: "",
      qualifying: "20",
      score: "",
      remark: "",
      comparison: "straight", //if filled value more than qualifying, comprasion will be straight otherwise it will be reverse
    },
    {
      heading: "Accessibility",
      parameter: "Distance from Fire Station (KMs)",
      fieldType: "number",
      input: "",
      qualifying: "15",
      score: "",
      remark: "",
      comparison: "reverse",
    },

    {
      heading: "Accessibility",
      parameter: "How wide is the Road / Pathway inside the premises - Ft.",
      fieldType: "number",
      input: "",
      qualifying: "12",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Accessibility",
      parameter: "Is the WH in residential area?(yes/no)",
      fieldType: "dropdown",
      input: "Yes",
      qualifying: "Yes",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Accessibility",
      parameter: "Is the WH in industrial area or any WH zone?(yes/no)",
      fieldType: "dropdown",
      input: "Yes",
      qualifying: "Yes",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Accessibility",
      parameter: "Distance from Police Station (KMs)",
      fieldType: "number",
      input: "",
      qualifying: "0",
      score: "",
      remark: "",
      comparison: "straight",
    },

    {
      heading: "Accessibility",
      parameter: "Distance from Nearest School (KMs)",
      fieldType: "number",
      input: "",
      qualifying: "2",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Accessibility",
      parameter: "Distance from Highway Road (KMs)",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },

    {
      heading: "Accessibility",
      parameter: "Distance from transport Hub (KMs)",
      fieldType: "number",
      input: "",
      qualifying: "5",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Accessibility",
      parameter: "Distance from warehousing Hub (KMs)",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Accessibility",
      parameter: "Distance from Metro/ Bus Station (KMs)",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Accessibility",
      parameter: "Distance from City Centre (KMs)",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Accessibility",
      parameter: "Distance from ICD/CFS/Port (KMs)",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Accessibility",
      parameter: "Distance from the Labour hub",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Accessibility",
      parameter: "Public transport availability",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Accessibility",
      parameter: "Distance from Hospital (KMs)",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Accommodation",
      parameter:
        "Are additional rooms available in the compound to be used as residence for Supervisors / workers? (yes/no)",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Accommodation",
      parameter:
        "How nearest is the resdential colony for workers from the warehouse? (KMs)",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Affiliation",
      parameter: "Is there any Labour Union in the area?",
      fieldType: "dropdown",
      input: "",
      qualifying: "NoNo",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Affiliation",
      parameter: "Is there any Transportation Union in the area?",
      fieldType: "dropdown",
      input: "",
      qualifying: "NoNo",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Construction",
      parameter: "Construction Type (RCC / Mixed / Shed)",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Construction",
      parameter: "Construction Age (No of Years)",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Construction",
      parameter: "Transparent Sheets in the roof (for Day Light) - Qty",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Construction",
      parameter: "Turbo Ventilators in the shed - Qty",
      fieldType: "number",
      input: "",
      qualifying: "1",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Construction",
      parameter: "Flooring Type – Trimix / Normal / Epoxy",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    //
    {
      heading: "Construction",
      parameter: "Shutter height from the platform in ft",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Construction",
      parameter: "Roof height of the storage area from the platform in ft",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Construction",
      parameter:
        "How many Loading / Unloading Docks avaibale in the warehouse?(nos)",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },

    {
      heading: "Accommodation",
      parameter: "Is the WH has Hydraulic Loading/Unloading Docs?",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },

    {
      heading: "Construction",
      parameter: "Dock height from the ground in ft",
      fieldType: "number",
      input: "",
      qualifying: "4",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Construction",
      parameter: "General apearance of the floor (Good / Bad / Ugly)",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Accommodation",
      parameter:
        "What is the size of the parking area for personal vehicles inside the coumpound?",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Accommodation",
      parameter:
        "What is the size of the parking area for trucks inside the coumpound?",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },

    {
      heading: "Accommodation",
      parameter: "Is there a meeting room available in the warehouse?",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },

    {
      heading: "Accommodation",
      parameter: "Is the WH structure capable to take load of solar panels?",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Electricity & Electrical Fittings",
      parameter: "Is there Genset Area available in the coumpound.(yes/no)",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Electricity & Electrical Fittings",
      parameter: "Electricity Connection (Kw)",
      fieldType: "number",
      input: "",
      qualifying: "5",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Electricity & Electrical Fittings",
      parameter: "Dedicated Transformer (Kva)",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Electricity & Electrical Fittings",
      parameter:
        "Electrical fittings /wirings /gadgets are with ISI marks.(yes/no)",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Electricity & Electrical Fittings",
      parameter: "Electrical Earthing is available",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Electricity & Electrical Fittings",
      parameter:
        "Is there is Electricity panel / Power Panel Room in the compound ?	",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Electricity & Electrical Fittings",
      parameter: "No open / loose wiring in and outside of the warehouse	",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Electricity & Electrical Fittings",
      parameter: "Is the WH using any green energy? Eg - Solar power	",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },

    {
      heading: "Emergency Exit & Fire Prevention",
      parameter: "No of Emergency Door available inside the warehouse?	",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Emergency Exit & Fire Prevention",
      parameter:
        "Is there an assembly area earmarked during fire breakout?(yes/no) ",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Emergency Exit & Fire Prevention",
      parameter: "What is the size of open area? - SQ Ft	",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Emergency Exit & Fire Prevention",
      parameter:
        "Are the fire fighting equipments in approachable limits inside the WH?(yes/no)	",
      fieldType: "dropdown",
      input: "Yes",
      qualifying: "Yes",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Emergency Exit & Fire Prevention",
      parameter:
        "Are the fire fighting equipments inside the WH are in adequate qty?	",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Emergency Exit & Fire Prevention",
      parameter:
        "Are the workers trained to fire fight and use fire fighting equipments?(yes/no)	",
      fieldType: "dropdown",
      input: "Yes",
      qualifying: "Yes",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Emergency Exit & Fire Prevention",
      parameter:
        "Is the evacuation route clearly marked and visible inside the warehouse?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Emergency Exit & Fire Prevention",
      parameter:
        "Emergency alarm is clearly audible, supported by battery and alarm buttons are available inside WH?	(yes/no)",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Environment Protection",
      parameter: "Does the compound has Green belt / plantation?(yes/no)	",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Environment Protection",
      parameter: "Is there a Rain Water Harvesting / Drainage system?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Environment Protection",
      parameter: "Is the open area well metteled?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Environment Protection",
      parameter: "Are the Sewage pipes connected to a sewage Pit?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Environment Protection",
      parameter:
        "Are the Sewage pipes connected to the approved system of the area?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Environment Protection",
      parameter:
        "Ground contamination due to release of / keeping of chemical is taken care of?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Environment Protection",
      parameter:
        "Is the PUC getting done of the air pollutant releasing equipments as per Govt norms?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Environment Protection",
      parameter:
        "Handling of all of type of waste inluding Hazardous waste within WH premises is as per defined norms?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Environment Protection",
      parameter:
        "Disposal of all type of waste inluding Hazardous waste within WH premises is as per defined norms?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Policy",
      parameter: "Policy for child labour is available?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Policy",
      parameter:
        "Policy for ethical ways of conducting business is available?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Policy",
      parameter: "Policy for environmental protection is available?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Policy",
      parameter:
        "Policy for worker/labour insurance, compensation and benefits is available?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Safety & Security	",
      parameter: "Is the Warehouse inside a gated compound?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Safety & Security	",
      parameter: "Aprox Height of the Compound Boundary Wall height - Ft	",
      fieldType: "number",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Safety & Security	",
      parameter:
        "How far is HT (high tension) electric line from the WH premise - KMs	",
      fieldType: "number",
      input: "",
      qualifying: "1",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Safety & Security	",
      parameter:
        "Are their Glass pieces on boundary wall, as a safety maeasure.(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Safety & Security	",
      parameter: "Are there Barbed Wire over boundary wall(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Safety & Security	",
      parameter: "No. of gates into the premises compound(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Safety & Security	",
      parameter: "Is there a proper Security Room at the main gate?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },

    {
      heading: "Warehouse Operations",
      parameter:
        "Are the windows on side walls are properly pilferage proof?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Warehouse Operations",
      parameter: "Is WH operational for 24 hrs?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Warehouse Operations",
      parameter: "Does the WH operator provides Handling Equipments?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Warehouse Operations",
      parameter: "Does the WH operator provides Labour?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Warehouse Operations",
      parameter: "Are the workers/labours working in WH are permanent?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Safety & Security	",
      parameter: "Is the complete premises under CCTV survellience?	",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Warehouse Operations",
      parameter: "Is there a Weigh Bridge inside the WH premises?	",
      input: "",
      qualifying: "",
      score: "",
      remark: "",
      comparison: "straight",
    },
    {
      heading: "Worker Facility, Health & Safety	",
      parameter:
        "Is there a Pantry area available within the warehouse premises ?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Worker Facility, Health & Safety	",
      parameter: "Are there washroosm for staff / workers?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Worker Facility, Health & Safety	",
      parameter: "Is there a creche available inside WH premises?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Worker Facility, Health & Safety	",
      parameter:
        "Are there enough lights in the open area in the night?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Worker Facility, Health & Safety	",
      parameter: "Source of Water in the warehouse (for regular use)?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Worker Facility, Health & Safety	",
      parameter:
        "Is drinking water available and accessible to all 24hrs?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Worker Facility, Health & Safety	",
      parameter:
        "Are the basic safety gears available for the labours/workers?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Worker Facility, Health & Safety	",
      parameter:
        "Are the safety signs visible and adequately availble inside the WH as well as WH premises?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Worker Facility, Health & Safety	",
      parameter:
        "Are the first aid boxes adequately available inside the WH?(yes/no)	",
      fieldType: "dropdown",
      input: "Yes",
      qualifying: "Yes",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
    {
      heading: "Worker Facility, Health & Safety	",
      parameter:
        "Is there an Ambulance parked 24/7 inside the WH premises?(yes/no)	",
      fieldType: "dropdown",
      input: "",
      qualifying: "No",
      score: "",
      remark: "",
      comparison: "dropdown",
    },
  ]);

  useEffect(() => {
    if (
      data.singleFormData.formEightyInfo &&
      data.singleFormData.formEightyInfo.length > 0
    ) {
      setJsonData(
        data.singleFormData.formEightyInfo.map((item, i) => {
          return {
            heading: item.heading,
            parameter: item.parameter,
            input: item.input,
            remark: item.remark,
            qualifying: item.qualifying,
            score: item.score,
            fieldType: item.fieldType,
            comparison:item.comparison
          };
        })
      );
    }
  }, [data.singleFormData.formEightyInfo]);

  const eightySchema = Yup.object().shape({
    formEighty: Yup.array().of(
      Yup.object().shape({
        input: Yup.string().matches(/^[\w .,!?()]+$/, "Please enter valid"),
        remark: Yup.string().matches(/^[\w .,!?()]+$/, "Please enter valid"),
      })
    ),
  });

  function calculation(input, qualifying, comparison) {
    // Check Straight
    if (comparison === "straight") {
      if (input >= qualifying) {
        return 1;
      } else {
        return 0;
      }
    }

    // Check Reverse Calculation
    if (comparison === "reverse") {
      if (input <= qualifying) {
        return 1;
      } else {
        return 0;
      }
    }

    // Check Reverse Calculation
    if (comparison === "dropdown") {
      if (input === "Yes") {
        return 1;
      } else {
        return 0;
      }
    }

  }

  return (
    <>
      {/* Loader */}

      {data.isLoading ? (
        <CardLoader />
      ) : data.isError !== "" ? (
        <ErrorCard message={data.isError} />
      ) : (
        <>
          {data.addNewResponse.statusCode === 201 ? (
            <FormSuccess
              onClick={() => dispatch(changeWarehouseStatus())}
              message={data.addNewResponse.message}
            />
          ) : null}

          <div className="row justify-content-end align-items-center py-3 px-3 mx-0 w-100">
            <div className="col-12">
              <Formik
                enableReinitialize={true}
                validationSchema={eightySchema}
                initialValues={{ formEighty: jsonData }}
                onSubmit={(fields) => {
                  fields["warehouse"] = data.singleFormData.id;
                  dispatch(updateForm80(fields));
                }}
                render={({ values, errors, status, onChange,setFieldValue, touched }) => {
                  return (
                    <Form>
                      <div className="row">
                        <div className="col-12 px-0 table-responsive table-gray-admin">
                          <table className="table">
                            <thead>
                              <tr>
                                <th className="w-100px bg-dark text-white px-3">S.NO</th>
                                <th className="bg-dark text-white px-3">Headings</th>
                                <th className="mw-300px bg-dark text-white px-3">Parameters</th>
                                <th className="bg-dark text-white px-3">Input</th>
                                {/* <th className="">Qualifying</th> */}
                                <th className="bg-dark text-white px-3">score</th>
                                <th className="text-center bg-dark text-white px-3">Remark</th>
                              </tr>
                            </thead>
                            <tbody>
                              {values.formEighty.length > 0 &&
                                values.formEighty.map((eighty, index) => {
                                  const eightyErrors =
                                    (errors.formEighty?.length &&
                                      errors.formEighty[index]) ||
                                    {};
                                  const eightyTouched =
                                    (touched.formEighty?.length &&
                                      touched.formEighty[index]) ||
                                    {};
                                  
                                    values.formEighty[index]['score'] = calculation(values.formEighty[index].input, values.formEighty[index].qualifying, values.formEighty[index].comparison)
                                  return (
                                    <tr key={index}>
                                      <td className="px-2 text-center">{index + 1}</td>
                                      <td className="px-2">{eighty.heading}</td>
                                      <td className="px-2">{eighty.parameter}</td>
                                  
                                      {eighty.fieldType !== "dropdown" ? (
                                        <td className="px-2">
                                          <Field
                                            type={
                                              eighty.fieldType
                                                ? eighty.fieldType
                                                : "text"
                                            }
                                            min="0"
                                            id={index}
                                            name={`formEighty.${index}.input`}
                                            className={
                                              "form-control form-control-sm border-1 w-150px" +
                                              (eightyErrors.input &&
                                              eightyTouched.input
                                                ? " is-invalid"
                                                : "")
                                            }
                                          />
                                          <ErrorMessage
                                            name={`formEighty.${index}.input`}
                                            component="div"
                                            className="invalid-feedback"
                                          />
                                        </td>
                                      ) : (
                                        <td className="px-2">
                                          <Field
                                            name={`formEighty.${index}.input`}
                                            as="select"
                                            className={
                                              "form-control custom-select bg-white px-4 common-select-deep-blue border-1 w-150px "
                                            }
                                          >
                                           
                                            <option
                                              value={"Yes"}
                                              className="text-capitalize"
                                            >
                                              Yes
                                            </option>
                                            <option
                                              value={"No"}
                                              className="text-capitalize"
                                            >
                                              No
                                            </option>
                                          </Field>
                                        </td>
                                      )}

                                      {/* <td className="px-2">
                                        <Field
                                          type={
                                            eighty.fieldType
                                              ? eighty.fieldType
                                              : "text"
                                          }
                                          name={`formEighty.${index}.qualifying`}
                                          className={
                                            "form-control form-control-sm border-1 w-150px"
                                          }
                                        />
                                      </td> */}
                                      <td className="px-2">
                                        <Field
                                          type={
                                            eighty.fieldType
                                              ? eighty.fieldType
                                              : "text"
                                          }
                                          disabled
                                          name={`formEighty.${index}.score`}
                                          className={
                                            "form-control form-control-sm border-1 w-50px"
                                          }
                                        />
                                      </td>
                                      <td className="px-2">
                                        <Field
                                          type="text"
                                          name={`formEighty.${index}.remark`}
                                          className="form-control form-control-sm border-1 w-150px"
                                        />
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                        <div className="col-12 mt-1">
                          <div className="row justify-content-end">
                            {/* <div className="col-auto"> */}
                            {/* <button type="button" className="btn btn-outline-deep-blue add-className remove-className" data-add-target=".steps9" data-add-target-className="d-none" data-remove-target=".steps8" data-remove-target-className="d-none">Back</button> */}
                            {/* </div> */}
                            {Object.keys(errors).length !== 0 ? (
                              <FormErrorCard message="Fill All Required Fields" />
                            ) : null}
                            {data.isError !== "" ? (
                              <FormErrorCard message={data.isError} />
                            ) : null}

                            <div className="col-auto">
                              <button
                                type="submit"
                                disabled={data.isPending}
                                className="btn btn-deep-blue add-className remove-className"
                              >
                                Save
                                {data.isPending ? (
                                  <Spinner animation="border" />
                                ) : null}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FormEighty;
