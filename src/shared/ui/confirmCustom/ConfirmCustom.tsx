import { FC, useEffect } from "react";
import classes from './confirmCustom.module.scss'
import { MyButton } from "../button/MyButton";
import { WrapItem } from "../wrapItem/WrapItem";

interface IProps {
    title: string;
    setIsOk: (isOk: boolean) => void;
}

export const ConfirmCustom: FC<IProps> = ({title, setIsOk}) => {

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return (() => {
            document.body.style.overflow = 'visible'
        })
    }, [])

    return (
        <section className={classes.confirmCustom}>
            <WrapItem>
                <h3>{title}</h3>
                <section className={classes.wrap}>
                    <section className={classes.button}>
                        <MyButton 
                            sign="Ок"
                            onClick={() => setIsOk(true)}
                        />
                    </section>
                    <section className={classes.button}>
                        <MyButton 
                            sign="Отмена"
                            onClick={() => setIsOk(false)}
                        />
                    </section>
                </section>
            </WrapItem>
        </section>
    )
}