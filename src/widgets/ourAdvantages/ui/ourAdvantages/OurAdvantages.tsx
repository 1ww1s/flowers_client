import { FC } from "react";
import classes from './ourAdvantages.module.scss'
import { Box } from "../box/Box";
import Users from '../../lib/assets/Users.png'
import Squares from '../../lib/assets/SquaresFour.png'
import Package from '../../lib/assets/Package.png'


export const OurAdvantages: FC = () => {


    return (
        <section className={classes.ourAdvantages}>
            <section className={classes.wrap}>
                <section className={classes.boxes}>
                    <Box 
                        img={Users} 
                        title="Вежливый персонал" 
                        sign="Персонал всегда подскажет, учтет все ваши просьбы. Мы уделяем внимание каждому клиенту" 
                    />
                    <Box 
                        img={Package} 
                        title="Ежедневные поставки" 
                        sign="Все букеты собираются из свежих цветов" 
                    />
                    <Box 
                        img={Squares} 
                        title="Широкий ассортимент" 
                        sign="Букеты из более чем 20 цветов, корзины с букетами, комнатные растения, игрушки, открытки" 
                    />
                </section>
            </section>
        </section>
    )
}