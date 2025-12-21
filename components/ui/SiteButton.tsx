import { ReactNode } from "react"
import Link from "../link"

const Button = ({
    className="",
    variant="contained",
    background="bg-button",
    textColor="text-gray-100 hover:text-gray-200",
    border="border border-cyan-500 hover:border-cyan-800",
    padding="px-6 py-2",
    text,
    link,
    disabled=false,
    icon,
    handleClick
}:{
    className?: string,
    variant?: string,
    padding?: string,
    border?: string,
    text: string,
    link?:string,
    disabled?: boolean,
    icon?: ReactNode,
    handleClick?: ()=>void,
    background?: string,
    textColor?: string
}) => {
    const style = variant==="outlined"? border : variant==="contained"? background : ""
  return (
    <button onClick={handleClick&&handleClick} disabled={disabled} className={`rounded-full ${padding} cursor-pointer duration-300 ${textColor} ${className} ${style}`}>
        {link?(<Link href={link}>{text}</Link>):text}
        {icon&&icon}
    </button>
  )
}

export default Button