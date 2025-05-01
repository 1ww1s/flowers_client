import { FC } from "react";
import classes from './notFoundWidget.module.scss'
import { MyButton } from "../../../shared";
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../../app/router/routes";



export const NotFoundWidget: FC = () => {

    return (
        <section className={classes.notFountWidget}>
            <section className={classes.status}>
                404
            </section>
            <section className={classes.message}>
                Неправильно набран адрес, или такой страницы на сайте больше не существует.
            </section>
            <section className={classes.goToHome}>
                <Link to={HOME_ROUTE.path}>
                    <MyButton 
                        sign="Вернуться на главную"
                        onClick={() => {}}
                    />
                </Link>
            </section>
        </section>
    )
}