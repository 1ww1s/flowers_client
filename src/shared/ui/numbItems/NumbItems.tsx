import { FC } from "react";
import classes from './numbItems.module.scss'
import { LoaderSpinner } from "../loaderSpinner/LoaderSpinner";


interface IProps{
    numb: number;
    borderColor?: boolean;
    isLoading?: boolean;
}

export const NumbItems: FC<IProps> = ({numb, isLoading=false, borderColor=true}) => {

    return (
        <section style={{border: borderColor ? "" : "none"}} className={classes.numbItems}>
            {isLoading
                ?
            <LoaderSpinner />
                :
            <span>{numb}</span>
            }
        </section>
    )
}