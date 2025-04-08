import { FC, PropsWithChildren } from "react";
import classes from './stages.module.scss'

interface IProps{
    stage: number;
    setStage: (stage: number) => void;
}

export const Stages: FC<IProps & PropsWithChildren> = ({stage, setStage, children}) => {

    const onClick = () => {
        if(stage !== 1){
            setStage(stage - 1)
        }
    }

    return (
        <section className={classes.stages}>
            <section className={classes.back}>
                {stage !== 1 && <span onClick={onClick}>Назад</span>}
            </section>
            <section className={classes.content}>
                {children}
            </section>
        </section>
    )
}