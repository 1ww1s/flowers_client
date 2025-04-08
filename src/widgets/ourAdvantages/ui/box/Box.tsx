import { FC } from "react";
import classes from './box.module.scss'


interface IProps {
    title: string;
    sign: string;
    img: string;
}

export const Box: FC<IProps> = ({title, sign, img}) => {


    return (
        <section className={classes.box}>
            <section className={classes.image}>
                <img src={img} />
            </section>
            <section className={classes.text}>
                <section className={classes.title}>
                    {title}
                </section>
                <section className={classes.sign}>
                    {sign}
                </section>
            </section>
        </section>
    )
}