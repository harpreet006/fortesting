import * as Yup from 'yup';

// onKeyPress={(e) => onlyNumberAllow(e)}
// ################  Only Alphabet Allow
export const onlyLetterAllow =(e)=> {
  const re = /[a-zA-Z]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}

export const onlyLetterSpaceAllow =(e)=> {
  const re = /[a-zA-Z ]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}

export const onlyLetterAllowWithSpace =(e)=> {
  const re = /[a-zA-Z ]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}

export const onlyNumberAllow =(e)=> {
  const re =  /^[A-Za-z0-9]+$/;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}

export const onlyAlphaNumericAllow =(e)=> {
  const re = /[a-zA-Z-0-9]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}

export const forDescriptionAlphaNumericAllow =(e)=> {
  const re = /[a-zA-Z-0-9 ,'"@.-/]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}

export const onlyAlphaNumericSpaceAllow =(e)=> {
  const re = /[a-zA-Z-0-9 ]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}

export const onlyAlphaNumericSpaceWithCommaAllow =(e)=> {
  const re = /[a-zA-Z-0-9., ]+/g;
  if (!re.test(e.key)) {
    e.preventDefault();
  }
}



// ########### Input Text with number typr ##############
export const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

// ############  Check Null Value #######

export const checkNull = (checkValue)=>{
  if(checkValue===null){
    return ""
  }
  return checkValue;
}

// ############  Convert Date in readable form  #######
export const readableDate = (dateReceive) =>{
  const d = new Date(dateReceive);   
  var datestring = d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) +"-"+("0" + d.getDate()).slice(-2);
  return datestring;
}

//  
export const uniqId =()=>{
  let randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  return (randLetter + Date.now()).slice(0,8);
}

// ############  Convert Date in readable form  #######
export const readableTime = (dateReceive) =>{
  const d = new Date(dateReceive);
  var hours = d.getHours();
  var minutes = "0" + d.getMinutes();
  var seconds = "0" + d.getSeconds();
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
  return formattedTime  + " "+ (hours>12 ? "PM" : "AM");;
}




// ########### list of Wharehouse ##############
export const newWarehouseSchema = Yup.object().shape({
  warehouseName: Yup.string()
     
  .required('Required'),
      category : Yup.string()
    .required('Required'),
      type : Yup.string()
    .required('Required')
  });


export const contactDetailsSchema = Yup.object().shape({
    // warehouseName: Yup.string()
    // .matches(/^[A-Za-z ]*$/, 'Please enter valid Name')
    // .required('Required')
    //   ,
      companyName: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid Name')
      .required('Required')
      ,
      mobileNumber: Yup.string()
      
      .matches(new RegExp('[0-9]{10}'),"number must be 10 digit")
      .required('Required'),
      altMobileNumber: Yup.string()
      
      .matches(new RegExp('[0-9]{10}'),"number must be 10 digit")
      .required('Required'),
      email: Yup.string().email('Invalid email')
      .required('Required')
      ,
      altEmail: Yup.string().email('Invalid email')
      .required('Required')
      ,
      addressOne: Yup.string()
      // .matches(/^[\w .,!?()]+$/, 'Please enter valid Address')
      .required('Required')
      ,
      addressTwo: Yup.string()
      .matches(/^[\w .,!?()]+$/, 'Please enter valid Address')
      .required('Required')
      ,
      country: Yup.string().required('Required')
      ,
      state: Yup.string().required('Required')
      ,
      city: Yup.string().required('Required')
      ,
      district: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Please enter valid District')
      ,
      landmark: Yup.string()
      .matches(/^[\w .,!?()]+$/, 'Please enter valid Landmark')
      ,
      pincode: Yup.string()
      
      .matches(new RegExp('[0-9]{6}'),"number must be 6 digit").required('Required'),
      gpsLatitude: Yup.string().matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/, 'Please enter valid Latitude').required('Required')
      ,
      gpsLongitude: Yup.string().matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/, 'Please enter valid Longitude').required('Required')
      ,
  });
  