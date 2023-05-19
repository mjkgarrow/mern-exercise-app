import ToolTip from '../ToolTip/ToolTip'
import './SubmitButton.css'

export default function SubmitButton(props) {
    return (
        <button className="submit-button" type="submit">

            <ToolTip tooltip={props.tooltip} />

            <div className='submit-button-name'>{props.name}</div>

        </button>
    )
}
