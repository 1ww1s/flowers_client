import { FC, PropsWithChildren } from "react";
import classes from './button.module.scss'

interface IProps {
    active?: boolean;
    onClick?: () => void;
}

export const ButtonBlack: FC<IProps & PropsWithChildren> = ({active=false, onClick=() => {}, children}) => {
    


    return (
        <button
            onClick={onClick} 
            className={classes.button + (active ? ' ' + classes.active : '')}
        >
            {children}
        </button>
    )
}