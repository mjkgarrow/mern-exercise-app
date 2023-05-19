import './ProgramForm.css';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import AddRemoveButton from '../AddRemoveButton/AddRemoveButton';
import ToolTip from '../ToolTip/ToolTip';
import { useSubmitProgram } from '../../hooks/useSubmitProgram'

export default function ProgramForm() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [targetElement, setTargetElement] = useState(null)
    const [tooltipStyle, setTooltipStyle] = useState(null)
    const { sendProgram, isLoading } = useSubmitProgram()
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [formValues, setFormValues] = useState({
        programName: '',
        programExercises: [
            {
                exerciseName: '',
                exerciseWeight: '',
                exerciseReps: '',
                exerciseSets: '',
                exerciseProgression: '',
            }
        ],
    });

    useEffect(() => {
        document.querySelector('.program-form-title').focus();
    }, []);


    const addFormFields = () => {
        setFormValues({ ...formValues, programExercises: [...formValues.programExercises, { exerciseName: "", exerciseWeight: "", exerciseReps: "", exerciseSets: "", exerciseProgression: "" }] });
    };

    const removeFormFields = (index) => {
        const newFormValues = { ...formValues };
        newFormValues.programExercises.splice(index, 1);
        setFormValues(newFormValues);
    };

    const onSubmit = async (data) => {
        await sendProgram(data)
        navigate('/')
    };

    const handleMouseMove = (event) => {
        const targetRect = event.target.getBoundingClientRect();
        setTargetElement(event.target.name);
        setTooltipStyle({ zIndex: "100", whiteSpace: 'nowrap', position: "absolute", top: `${event.clientY - targetRect.top - 30}px`, left: `${event.clientX - targetRect.left - 70}px` })
    };

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='program-form-card'>
                <div className='program-form-header'>
                    <input
                        {...register("programName", { required: 'Required' })}
                        className='program-form-title'
                        type='text'
                        placeholder='Workout name'
                    />
                    {errors.programName && <span className='error-span-name'>
                        <ToolTip tooltip={errors.programName.message} />
                    </span>}
                </div>
                <div className='program-form-body'>
                    {formValues.programExercises.map((element, index) => (
                        <div className='exercise-form-container' key={index}>
                            <div className='exercise-form-row'>
                                <div className='exercise-form-name-container'>
                                    <input
                                        {...register(`programExercises.${index}.exerciseName`, { required: 'Required' })}
                                        className='exercise-form-name'
                                        type='text'
                                        name={`programExercises.${index}.exerciseName`}
                                        placeholder='Exercise'
                                    />
                                    {errors.programExercises?.[index]?.exerciseName && (
                                        <span className='error-span-exercises'>
                                            <ToolTip tooltip={errors.programExercises?.[index]?.exerciseName.message} />
                                        </span>
                                    )}
                                </div>
                                <div className='exercise-form-weight-container'>
                                    <input
                                        {...register(`programExercises.${index}.exerciseWeight`, {
                                            required: 'Required', pattern: {
                                                value: /^\d+$/,
                                                message: 'Numbers only',
                                            },
                                        })}
                                        className='exercise-form-weight'
                                        type='text'
                                        name={`programExercises.${index}.exerciseWeight`}
                                        placeholder='kg'
                                    />
                                    {errors.programExercises?.[index]?.exerciseWeight && (
                                        <span className='error-span-exercises'>
                                            <ToolTip tooltip={errors.programExercises?.[index]?.exerciseWeight.message} />
                                        </span>
                                    )}
                                </div>
                                <div className='exercise-form-reps-container'>
                                    <input
                                        {...register(`programExercises.${index}.exerciseReps`, {
                                            required: 'Required', pattern: {
                                                value: /^\d+$/,
                                                message: 'Numbers only',
                                            },
                                        })}
                                        className='exercise-form-reps'
                                        type='text'
                                        name={`programExercises.${index}.exerciseReps`}
                                        placeholder='reps'
                                    />
                                    {errors.programExercises?.[index]?.exerciseReps && (
                                        <span className='error-span-exercises'>
                                            <ToolTip tooltip={errors.programExercises?.[index]?.exerciseReps.message} />
                                        </span>
                                    )}
                                </div>
                                <div className='exercise-form-sets-container'>
                                    <input
                                        {...register(`programExercises.${index}.exerciseSets`, {
                                            required: 'Required', pattern: {
                                                value: /^\d+$/,
                                                message: 'Numbers only',
                                            },
                                        })}
                                        className='exercise-form-sets'
                                        type='text'
                                        name={`programExercises.${index}.exerciseSets`}
                                        placeholder='sets'
                                    />
                                    {errors.programExercises?.[index]?.exerciseSets && (
                                        <span className='error-span-exercises'>
                                            <ToolTip tooltip={errors.programExercises?.[index]?.exerciseSets.message} />
                                        </span>
                                    )}
                                </div>
                                <div className='exercise-form-progression-container'>
                                    <input
                                        {...register(`programExercises.${index}.exerciseProgression`, {
                                            required: 'Required', pattern: {
                                                value: /^\d+$/,
                                                message: 'Numbers only',
                                            },
                                        })}
                                        onMouseEnter={() => setShowTooltip(true)}
                                        onMouseMove={handleMouseMove}
                                        onMouseLeave={() => setShowTooltip(false)}
                                        className='exercise-form-progression'
                                        type='text'
                                        name={`programExercises.${index}.exerciseProgression`}
                                        placeholder='gains' />
                                    {showTooltip && targetElement === `programExercises.${index}.exerciseProgression` && (
                                        <span className='progression-tooltip' style={tooltipStyle}>
                                            Weight increment per session
                                        </span>
                                    )}
                                    {errors.programExercises?.[index]?.exerciseProgression && (
                                        <span className='error-span-exercises'>
                                            <ToolTip tooltip={errors.programExercises?.[index]?.exerciseProgression.message} />
                                        </span>
                                    )}
                                </div>
                                {index ?
                                    <div className='program-form-delete' onClick={() => removeFormFields(index)}>
                                        <AddRemoveButton tooltip={''} type={'-'} />
                                    </div>
                                    : null}


                            </div>
                        </div>
                    ))}
                    <div className='program-form-add' onClick={() => addFormFields()}>
                        Add exercise
                    </div>
                    <button
                        disabled={isLoading}
                        className='program-form-submit' type='submit'>Create</button>
                </div>
            </div>
        </form>
    )
}
