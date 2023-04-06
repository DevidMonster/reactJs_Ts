import axios from "axios"
import { IUserLogin, IUserSignUp } from "../../types/user"

const signup = (user: IUserSignUp) => {
    return axios.post("http://localhost:8080/auth/signup", user)
}

const login = async (user: IUserLogin) => {
    const res = await axios.post("http://localhost:8080/auth/login", user)
    return res.data
}

const authRequest = {
    signup, login
}

export default authRequest 