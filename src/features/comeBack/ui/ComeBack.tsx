import { FC } from "react";
import { Link } from "react-router-dom";
import classes from './comeBack.module.scss'

interface IProps {
    to: string;
    text: string;
}

export const ComeBack: FC<IProps> = ({to, text}) => {

    return (
        <section className={classes.back}>
            <section className={classes.wrap}>
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M27 16H5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 7L5 16L14 25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <Link to={to}>{text}</Link>
            </section>
        </section>
    )
}