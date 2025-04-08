import { FC } from "react";
import classes from './about.module.scss'
import { Logo } from "../../../../shared";
import { IconAndText } from "../iconAndText/IconAndText";
import phone from '../../lib/icons/phone.png'
import clock from '../../lib/icons/clock.png'
import mark from '../../lib/icons/mark.png'
import { List } from "../list/List";

export const About: FC = () => {


    return (
        <section className={classes.about}>
            <section className={classes.logo}>
                <Logo white={true} />
            </section>
            <section className={classes.infos}>
                <h3>Информация о нас</h3>
                <List
                    childrens={[
                        <IconAndText 
                            text="8 (952) 094-91-16"
                            iconSrc={phone}
                        />,
                        <IconAndText 
                            text="Круглосуточно"
                            iconSrc={clock}
                        />,
                        <IconAndText 
                            text="Тверь, ул. Хрустальная, д. 46"
                            iconSrc={mark}
                        />
                    ]}
                />
                
            </section>
        </section>
    )
}