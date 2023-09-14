module.exports = {
    stringValidation: (value, fieldName) => {
        if(value != undefined && value.length > 0){
            return true
        }
        return [
            "The "+fieldName+" field is required."
        ]
    },
    isValidEmail: (email, fieldEmail) => {
        var reg = new RegExp (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        if (reg.test(email.trim()) && email.length > 0) {
            return true
        }else{
            return  [
                "The "+fieldEmail+" field is required."
            ]
        }
    }
}