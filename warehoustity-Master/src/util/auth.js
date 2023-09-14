export function isAuth(){
    const TOKEN = localStorage.getItem('accesstoken')
    return TOKEN ? true : false
}

export function authUser(){
    const user = JSON.parse(localStorage.getItem('userData'))
    return user
}