import { FC, useEffect, useRef } from "react";
import classes from './loaderScreen.module.scss'
import { LoaderSpinner } from "../loaderSpinner/LoaderSpinner";

interface IProps {
    full?: boolean;
}

export const LoaderScreen: FC<IProps> = ({full = true}) => {

    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if(full){
            document.body.style.overflow = 'hidden'
        }

        return (() => {
            if(full){
                document.body.style.overflow = 'visible'
            }
        })
    }, [])

    return (
        <section ref={ref} className={classes.loaderScreen + (full ? (' ' + classes.full) : '')}>
            <LoaderSpinner 
                style={{
                    background: 'white', 
                    width: '24px', 
                    height: '24px',
                    padding: '3px'
                }} 
            />
        </section>
    )
}