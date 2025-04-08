import { ComponentProps, FC, PropsWithChildren } from "react";
import classes from './myTextarea.module.scss'


interface IProps {
    error?: string;
    sign?: string;
    setValue: (value: string) => void;
    value: string;
}

export const MyTextarea: FC<IProps & ComponentProps<'textarea'>> = ({error, sign, value, setValue, ...props}) => {
    


    return (
        <section className={classes.myTextarea}>
            <textarea
                {...props} 
                onChange={e => setValue(e.target.value)} 
                value={value} 
                className={classes.textarea}
            >
                {value}
            </textarea>
            <section className={classes.sign}>
                {sign ? sign : error}
            </section>
        </section>
    )
}