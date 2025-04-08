import { FC } from 'react'
import classes from './iconAndText.module.scss'


interface IProps {
    text: string;
    iconSrc: string;
}

export const IconAndText: FC<IProps> = ({text, iconSrc}) => {


    return (
        <section className={classes.iconAndText}>
            <img className={classes.icon} src={iconSrc} alt='icon' />
            <section className={classes.text}>
                {text}
            </section>
        </section>
    )
}