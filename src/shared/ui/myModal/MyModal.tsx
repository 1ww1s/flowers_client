import { FC, MouseEvent, PropsWithChildren, useRef } from "react";
import classes from './myModal.module.scss'
import imgClose from '../../../shared/lib/assets/icon/X.png'

interface IProps{
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
}

export const MyModal: FC<IProps & PropsWithChildren> = ({title, open, setOpen, children}) => {

    const refShadow = useRef<HTMLDivElement>(null)

    const openModal = () => {
        setOpen(true)
    }

    const close = (e: MouseEvent) => {
        if(e.currentTarget === e.target)
            setOpen(false)
    }

    return (
        <section className={classes.myModal}>
        {
            open
                &&
            <section onClick={close} ref={refShadow} className={classes.bgShadow}>
                <section className={classes.content}>
                    {children}
                    <img onClick={(e) => close(e)} className={classes.close} src={imgClose} />
                </section>
            </section>
        }
            <span onClick={openModal} className={classes.title}>{title}</span>
        </section>
    )
}