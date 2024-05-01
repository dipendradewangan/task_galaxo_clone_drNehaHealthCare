import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux'


import { clearErrors, registerUser } from '../../../redux/action/userAction'

const RegisterPage = () => {
    const history = useNavigate()
    const dispatch = useDispatch()
    const [bothpasswordMatch, setBothpasswordMatch] = useState(false)
    // const { isAuthenticated, error, user,  } = useSelector((state) => state.user)


    const { error, isAuthenticated } = useSelector((state) => state.user)
    console.log(error)

    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm()

    // register data submit
    const resiterSubmit = (data) => {
        if (data.password === data.confirmPassword) {
            setBothpasswordMatch(false)
            dispatch(registerUser(data.name, data.email, data.password))
            reset()
        }
        else {
            setBothpasswordMatch(true)
        }
    }

    useEffect(() => {
        if (error) {
            alert(error.message)
            dispatch(clearErrors())
            reset()
        }

        if (isAuthenticated) {
            history("/")
            reset()
        }

    }, [dispatch, error, history, reset, isAuthenticated])


    return (
        <div>


            {/* register box */}
            <div className="bg-white mt-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-center">

                <div className='border-gray-200 border-1 flex flex-col justify-center items-center p-4 login-form'>
                    <h1 className='font-bold text-2xl mb-3 text-gray-800'>Register </h1>
                    <form className='registerForm flex flex-col' onSubmit={handleSubmit((data) => resiterSubmit(data))} >

                        {errors.name && `${errors.name.message}`}
                        <input
                            {...register("name", { required: ["Enter your full name"] })}
                            placeholder='full name'
                            type='text'
                            className='login-input outline-none'
                        />

                        {errors.email && `${errors.email.message}`}
                        <input
                            {...register("email", { required: "Enter your email" })}
                            placeholder='Enter Your Email'
                            type='text'
                            className='login-input outline-none'
                        />



                        {errors.password && `${errors.password.message}`}
                        <input
                            {...register("password", { required: "Enter your password" }, watch)}
                            placeholder='password'
                            type='password'
                            className='login-input outline-none'
                        />


                        {errors.confirmPassword && `${errors.confirmPassword.message}`}
                        {
                            bothpasswordMatch ? <p className='text-black-500'>Confirm Password not matched</p> : ""
                        }
                        <input
                            {...register("confirmPassword", { required: "Enter your cofirm password" })}
                            placeholder='Confim Password'
                            type='password'
                            className='login-input outline-none'
                        />
                        <button className='login-now-btn text-white px-3 py-2 rounded-3xl mb-3' type='submit'>Register Now !</button>
                        <div className='flex justify-center w-full'>
                            <h1 className='cursor-pointer text-sm'>Allready Registered? <Link className='text-blue-500' to="/Login">Login Now!</Link></h1>

                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default RegisterPage
