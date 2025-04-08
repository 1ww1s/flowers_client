import { FC, PropsWithChildren } from "react";
import classes from './myButton.module.scss'

interface IProps {
    isLoading?: boolean;
    onClick: () => void; 
}

export const MyButtonMin: FC<IProps & PropsWithChildren> = ({isLoading = false, onClick, children}) => {

    return (
        <button disabled={isLoading} className={classes.myButton + (isLoading ? (' ' + classes.disabled) : '')} onClick={onClick}>
            {children}
        </button>
    )
}