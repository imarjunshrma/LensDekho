import { ButtonProps } from "@/interfaces";
import "@/styles/components/button.scss"

const Button = ({ text, type, classes }: ButtonProps) => {
    return (
        <button type={type ? type : "button"} className={`c-btn -${classes}`}
        >
            {text}
        </button>
    )
};

export default Button;
