import { Helmet } from "react-helmet-async";
import { useAppSelector } from "../../app/store/store";
import { Logout } from "../../features/logout";
import { getPhoneFormat, ItemData, WrapItem } from "../../shared";
import classes from './my.module.scss'


export default function MyMain () {

    const {user} = useAppSelector(s => s.UserReducer)

    return (
        <section className={classes.main}>
            <Helmet>
                <title>Личный кабинет</title>
                <meta name="description" content="Личный кабинет. Мои данные" />
            </Helmet>
            <section className={classes.data}>
                <WrapItem>
                    <ItemData 
                        items={[
                            {
                                sign: 'Имя',
                                data: user.name
                            },
                            {
                                sign: 'Телефон',
                                data: getPhoneFormat(user.phone)
                            }
                        ]}
                    />
                </WrapItem>
            </section>
            <section className={classes.logout}>
                <Logout />
            </section>
        </section>
    )
}