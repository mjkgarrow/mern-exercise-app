import { useForm } from 'react-hook-form';
import './AuthForm.css'
import { useSubmitAuth } from '../../hooks/useSubmitAuth';
import { Link } from 'react-router-dom';


export default function Login(props) {
    const { type } = props
    const { submitAuth, isLoading, error } = useSubmitAuth()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password', '');



    let onSubmit = async (data) => {
        if (type === "Register") {
            if (data.password === data.passwordCheck) {
                await submitAuth(data.email, data.password, true)
            }
        } else if (type === "Login") {
            await submitAuth(data.email, data.password, false)
        }

    };

    return (
        <div className="auth-form-container" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="auth-title">
                {type === "Register" ? "Sign up" : "Welcome back"}
            </h2>
            <form className="auth-form">
                <input
                    {...register("email", { required: true })}
                    className='email-input'
                    type='text'
                    placeholder='your@email.com'
                />

                <input
                    {...register("password", { required: true, minLength: 8 })}
                    className='password-input'
                    type='password'
                    placeholder='Password'
                />
                {type === "Register" && (
                    <>
                        <input
                            {...register("passwordCheck", {
                                required: true,
                                validate: (value) => value === password || 'Passwords do not match',
                            })}
                            className='password-input'
                            type='password'
                            placeholder='Confirm password'
                        />
                        {errors?.passwordCheck?.message && (
                            <p className='error'>
                                {errors.passwordCheck.message}
                            </p>
                        )}
                    </>
                )}


                <button
                    disabled={isLoading}
                    className="auth-button">
                    {isLoading ? 'Sending' : type}
                </button>

                {type !== "Register" ? <Link className="register-link" to="/register">Register</Link> : <Link className="register-link" to="/login">Login</Link>}

                {error && <div className='error'>{error}</div>}
            </form>
        </div>
    )
}