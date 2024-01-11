import Tooltip from "react-bootstrap/esm/Tooltip"
import "./smallComponents.scss"

export const customTooltip = (text: string) => {
    return (
    <Tooltip id={text} className="customTooltip">
      {text}
    </Tooltip>
    )
};