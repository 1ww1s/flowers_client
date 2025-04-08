import { FC, MouseEvent } from "react";
import classes from '../images.module.scss'


interface IProps {
    isUp: boolean;
    ref: React.RefObject<HTMLDivElement | null>
}

export const Button: FC<IProps> = ({isUp, ref}) => {

    const onClick = (e: MouseEvent) => {
        e.preventDefault()
        if(isUp){
            ref.current?.scrollBy({top: -90})
        }
        else{
            ref.current?.scrollBy({top: 90})
        }
    }

    return (
         <section onClick={e => onClick(e)} onMouseDown={e => e.preventDefault()} className={classes.arrow + " " + (isUp ? classes.up : classes.down)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.25 7.5L10 13.75L3.75 7.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </section>
    )
}