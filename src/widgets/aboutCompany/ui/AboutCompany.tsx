import { FC } from "react";
import classes from './aboutCompany.module.scss'
import flow1 from '../lib/assets/flow1.png'
import flow2 from '../lib/assets/flow2.png'
import { Helmet } from "react-helmet-async";


export const AboutCompany: FC = () => {


    return (
        <section className={classes.aboutCompany}>
            <Helmet>
                <meta property="og:image" content={flow2} />
            </Helmet>
            
            <section className={classes.text}>
                <p>Магазин flowers предлагает широкий ассортимент товаров. Воспользовавшись нашим предложением, клиенты оценят не только удобство сервиса, 
                    но и качество предлагаемых цветочных композиций. Вы можете приобрести любимые цветы круглосуточно!  </p>
                <p>Вы можете сделать заказ онлайн и мы доставим его к вам или заберите его в магазине самостоятельно.</p>
                <p>Если ни один вариант вам не подошел, вы можете обратиться к менеджеру в магазин по телефону, он поможет вам собрать букет на ваш вкус.</p>
            </section>
            <section className={classes.images}>
                <img className={classes.flow1} src={flow1} />
                <img className={classes.flow2} src={flow2} />
            </section>
        </section>
    )
}