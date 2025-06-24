import { MdCheckCircle } from "react-icons/md";
import "./styles/SuccessMessage.css";
function SuccessMessage({ successMessage }) {
    return (
        <div className="success-message">
        <MdCheckCircle style={{ color: "green", marginLeft: "4px" }} />
        {successMessage}
      </div>
    )
}

export default SuccessMessage;  