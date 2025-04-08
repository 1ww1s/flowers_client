import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { DeliveryArea } from '../../widgets/deliveryArea';
import classes from './deliveryAndPayment.module.scss'

export default function DeliveryAndPayment(){


    return (
        <section className={classes.deliveryAndPayment}>
            <section className={classes.wrap}> 
                <h1>Доставка и оплата</h1>
                <h2>Доставка осуществляется внутри города Твери</h2>
                <DeliveryArea />
                <h2>Оплата возможна следующими способами</h2>
            </section>
        </section>
    );
}