import axios from "axios"
import { IUserLogin, IUserSignUp } from "../../types/user"
import { message } from "antd"

const signup = (user: IUserSignUp) => {
    return axios.post("http://localhost:8080/auth/signup", user).catch(res => message.error(res.response.data.message))
}

const login = async (user: IUserLogin) => {
    const res = await axios.post("http://localhost:8080/auth/login", user).catch(res => message.error(res.response.data.message))
    return res.data
}

const authRequest = {
    signup, login
}

export default authRequest 