import { DeliveryArea } from '../../widgets/deliveryArea';
import classes from './deliveryAndPayment.module.scss'
import { PaymentMethods } from '../../widgets/paymentMethods';
import { Helmet } from 'react-helmet-async';

export default function DeliveryAndPayment(){


    return (
        <section className={classes.deliveryAndPayment}>
            <Helmet>
                <title>Доставка и оплата</title>
                <meta name="description" content="Доставка осуществляется внутри города Тверь" />
                <meta property="og:title" content='Доставка и оплата' />
                <meta property="og:description" content='Доставка осуществляется внутри города Тверь' />
            </Helmet>
            <section className={classes.wrap}> 
                <h1>Доставка и оплата</h1>
                <h2>Доставка осуществляется внутри города Тверь</h2>
                <section className={classes.deliveryArea}>
                    <DeliveryArea />
                </section>
                <h2>Оплата возможна следующими способами</h2>
                <PaymentMethods choice={false} />
            </section>
        </section>
    );
}