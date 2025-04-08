import { FC, PropsWithChildren } from "react";
import classes from './wrapSide.module.scss'



export const WrapSide: FC <PropsWithChildren>= ({children}) => {

    return (
        <section className={classes.wrap}>
            {children}
        </section>
    )
}