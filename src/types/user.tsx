export interface IUserLogin {
    email: string,
    password: string
}

export interface IUserSignUp {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    role: "user" | "admin"
}