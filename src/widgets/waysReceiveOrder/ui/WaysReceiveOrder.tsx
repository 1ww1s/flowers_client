import { FC, MouseEvent } from "react";
import { LoaderDiv, WrapSide } from "../../../shared";
import classes from './waysReceiveOrder.module.scss'

interface IProps {
    isLoading: boolean;
    count: number;
}

export const WaysReceiveOrder: FC<IProps> = ({isLoading, count}) => {

    const onClick = (e: MouseEvent) => {
        const s = document.querySelector('#shops')
        if(s){
            const top = s.getBoundingClientRect().top
            window.scrollBy({top:  (top)})
        }
    }

    return (
        <section className={classes.waysReceiveOrder}>
        {
            isLoading
                ?
            <section className={classes.loader}><LoaderDiv /></section>
                :
            <WrapSide>
            {
                <section className={classes.content}>                     
                    <section className={classes.title}>Способы получения заказа</section>            
                    <section className={classes.text}>
                        <a className={classes.link} onClick={e => onClick(e)}>Самовызов за 30 минут</a> из {count} {count > 1 ? 'магазинов' :'магазина'}
                    </section>
                </section>
            }
            </WrapSide>
        }
        </section>
    )
}