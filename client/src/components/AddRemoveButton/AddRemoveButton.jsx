import './AddRemoveButton.css'
import ToolTip from '../ToolTip/ToolTip'

export default function AddButton(props) {

    return (
        <button type="button" className={props.type === "+" ? "button-add" : "button-add remove"}>

            <ToolTip tooltip={props.tooltip} />
            <div className="add-icon">{props.type}</div>

        </button>
    )
}
