import { FC } from "react";
import classes from './description.module.scss'


interface IProps {
    name: string;
    values: string[];
}


export const Description: FC<IProps> = ({name, values}) => {


    return (
       <section className={classes.desc}>
            <span className={classes.name}>{name}</span>
            <span className={classes.dashed}></span>
            <span className={classes.values}>{values.map(v => v.toLocaleLowerCase()).join(', ')}</span>
        </section>
    )
}