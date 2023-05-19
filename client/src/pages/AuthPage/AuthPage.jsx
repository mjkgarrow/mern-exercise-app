import './AuthPage.css'
import AuthForm from '../../components/AuthForm/AuthForm'

export default function AuthPage(props) {
    return (
        <>
            <div className="authPageContainer">
                <AuthForm type={props.type} />
            </div>
        </>
    )
}