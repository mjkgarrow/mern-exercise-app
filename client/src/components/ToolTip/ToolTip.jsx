import './ToolTip.css'

export default function ToolTip(props) {
    if (props.tooltip) {
        return (
            <span className="tooltiptext">{props.tooltip}</span>
        )
    } else {
        return (<></>)
    }
}
