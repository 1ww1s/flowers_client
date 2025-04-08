import { FC, useEffect, useState } from "react";
import { CloseSign } from "../../../features/closeSign";
import { useAppSelector } from "../../../app/store/store";
import classes from './sign.module.scss'
import { useSignActions } from "../../../entities/sign";



export const Sign: FC = () => {

    const {sign} = useAppSelector(s => s.SignReducer)
    const {setMessage} = useSignActions()
    const [idT, setIdT] = useState<NodeJS.Timeout>()

    useEffect(() => {
        if(sign.message){
            if(idT){
                clearTimeout(idT)
            }
            const id = setTimeout(() => setMessage(''), 3000)
            setIdT(id)
        }
    }, [sign])

    return (
        <section 
            className={classes.sign + (sign.message ? (' ' + classes.active + ' ' + ((sign.type === 'error') ? classes.error : classes.message)) : '')}
        >
        {
            <section className={classes.wrapper + ' ' + classes.close}>
                <span>{sign.message}</span>
                <CloseSign />
            </section>
        }
        </section>
    )
}