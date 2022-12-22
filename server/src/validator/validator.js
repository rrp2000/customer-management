const validateString = (input)=>{
    if(!input) return `is required.`
    if(typeof input !== "string") return `should be a string.`
    if(input.trim().length===0) return `can't be empty.`
}

const checkOnlyLetters = (input)=>{
    return /^[A-Za-z\s]*$/ .test(input)
}

const checkOnlyNumbers = (input)=>{
    return /^[0-9]+$/.test(input)
}

const checkEmail = (input)=>{
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)
}


export {validateString, checkOnlyLetters, checkOnlyNumbers, checkEmail} 