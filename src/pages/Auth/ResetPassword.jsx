import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { message } from 'antd'
import axios from "axios";


const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate()

    const { token, email } = useParams()
    const newEmail = email.replaceAll('%2E', '.')

    const [password, setPasswrod] = useState('')
    const [rePassword, setRePasswrod] = useState('')

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/resetpassword', {
                token: token,
                email: newEmail,
                password: password,
                re_password: rePassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            message.success(response.data.message)
            navigate('/auth/login')
        } catch (error) {
            message.error(error.response.data.data.password ?? error.response.data.data.re_password)
        }
    }

    return (
        <div className="mt-20">
            <div className="container mx-auto">
                <div className="wrap-content flex justify-center">
                    <div className="bg-white bg-opacity-20 w-96 p-10 rounded-lg shadow-2xl">
                        <h1 className="font-bold text-center text-white text-3xl mb-10 ">
                            Change Password
                        </h1>
                        <form action="" className="w-full">
                            <div>
                                <input
                                    type="password"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md 
                            text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                    placeholder="Nhập mật khẩu mới"
                                    onChange={(e) => { setPasswrod(e.target.value) }}
                                />
                                <input
                                    type="password"
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md 
                            text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                            invalid:border-pink-500 invalid:text-pink-600
                            focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                    placeholder="Nhập lại mật khẩu mới"
                                    onChange={(e) => { setRePasswrod(e.target.value) }}
                                />
                                <button type="button" onClick={handleSubmit} className="w-full bg-orange-400 bg-opacity-50 p-1 mt-2 rounded-md text-white hover:bg-orange-500">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword