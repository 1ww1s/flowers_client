import { isRouteErrorResponse, useRouteError } from "react-router-dom"
import classes from './notFound.module.scss'
import { NotFoundWidget } from "../../widgets/notFoundWidget"


export default function NotFound() {

    const error = useRouteError()

    return (
        <section className={classes.wrap}>
            <section className={classes.content}>
            {
                isRouteErrorResponse(error)
                    ?
                error.status === 404 
                    ? 
                <section className={classes.notFound}>
                    <NotFoundWidget />
                </section>
                    : 
                <section>
                    <h2>Неизвестная ошибка route</h2>
                    <p>Свяжитесь с нами: ctop124@mail.ru</p>
                </section>
                    :
                <section>
                    <h2>Неизвестная ошибка</h2>
                    <p>Свяжитесь с нами: ctop124@mail.ru</p>
                </section>
            }
            </section>
        </section>
        )

}