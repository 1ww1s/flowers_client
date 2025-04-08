import { FC, PropsWithChildren } from "react";
import classes from './item.module.scss'
import { LoaderDiv } from "../loaderDiv/LoaderDiv";


interface IProps {
    isLoading?: boolean;
}


export const WrapItem: FC<IProps & PropsWithChildren> = ({isLoading, children}) => {

    return (
        <section className={classes.wrapItem}>
        {
            isLoading
                ?
            <section className={classes.loader}>
                <LoaderDiv />
            </section>
                :    
            children
        }
        </section>
    )
}