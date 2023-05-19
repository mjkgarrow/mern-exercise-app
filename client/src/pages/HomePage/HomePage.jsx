/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { ACTIONS } from '../../context/Actions'
import { useProgramContext } from '../../hooks/useProgramContext'
import ProgramCard from '../../components/ProgramCard/ProgramCard'
import './HomePage.css'
import { URL } from '../../utils/globals'
import AddRemoveButton from '../../components/AddRemoveButton/AddRemoveButton'
import { useNavigate } from 'react-router-dom'
import ContentLoading from '../../components/ContentLoading/ContentLoading'
import { useLocalStorageContext } from '../../hooks/useLocalStorageContext'
import { useAuthContext } from '../../hooks/useAuthContext';


export default function HomePage(props) {
    const programContext = useProgramContext()
    const [assetsLoaded, setAssetsLoaded] = useState(false)
    const navigate = useNavigate()
    const localStorageContext = useLocalStorageContext()
    const { token } = useAuthContext()


    useEffect(() => {
        if (token) {
            fetch(`${URL}/programs/`, {
                method: "GET",
                mode: "cors",
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(resp => resp.json())
                .then(data => {
                    programContext.programDispatcher({ type: ACTIONS.READ, payload: data.length ? data : [] })
                    setAssetsLoaded(true)

                })
                .catch(err => console.log(err.message))
        } else {
            navigate('/login')
        }

    }, [])

    // Save API data to local storage
    useEffect(() => {
        localStorageContext.programData.setPersistentProgramData(programContext.programData)
        // localStorage.setItem('programData', JSON.stringify(programContext.programData))
    }, [programContext.programData])



    return (
        <>
            <div className="homePageContainer">
                <h1>Let's get started!</h1>

                <div>
                    {programContext.programData.length > 0 ? "Choose a workout:" : "Create a workout:"}
                </div>

                {!assetsLoaded ? <ContentLoading /> :
                    <>
                        <div className="programCardsContainer">
                            {programContext.programData && programContext.programData.map(program => {
                                return (
                                    <ProgramCard key={program._id} program={program} />
                                )
                            })}
                        </div>

                        <div onClick={() => navigate('/programs')}>
                            <AddRemoveButton tooltip={"Create workout"} type={"+"} />
                        </div>
                    </>
                }
            </div>
        </>
    )
}