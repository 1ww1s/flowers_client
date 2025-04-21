import { ComponentProps, FC, useEffect, useRef, useState } from "react";
import classes from './myButton.module.scss'
import { LoaderSpinner } from "../loaderSpinner/LoaderSpinner";

interface IProps {
    sign: string;
    onClick: () => void;
    isLoading?: boolean;
    error?: string;
    width?: number;
}

export const MyButton: FC<IProps & ComponentProps<'button'>> = ({sign, isLoading = false, onClick, width, error="", ...props}) => {

    const Ref = useRef<HTMLButtonElement>(null)
    const isOne = useRef<boolean>(false)
    useEffect(() => {
        if(isOne.current)
            Ref.current?.classList.toggle(classes.active)
        else
            isOne.current=true
    }, [isLoading])

    return (
        <section className={classes.myButton}>
            <button 
                {...props}
                style={{width, ...props.style}} 
                ref={Ref} 
                disabled={isLoading || error?.length !== 0 || props.disabled} 
                className={isLoading ? classes.loading : ''} 
                onClick={onClick}
            >
                {
                    isLoading 
                        ? 
                    <section className={classes.loader}><LoaderSpinner /></section> 
                        : 
                    sign
                }
            </button>
            <section className={classes.error}>{error}</section>
        </section>
    )
}