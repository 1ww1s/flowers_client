import { FC } from "react";
import { useSignActions } from "../../../entities/sign";
import classes from './closeSign.module.scss'

export const CloseSign: FC = () => {

    const {setMessage} = useSignActions()

    const close = () => {
        setMessage('')
    }

    return (
        <svg onClick={close} className={classes.close} width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 7L7 25" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M25 25L7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}