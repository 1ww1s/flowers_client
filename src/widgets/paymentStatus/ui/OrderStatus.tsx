import { FC } from "react";
import classes from './orderStatus.module.scss'
import { Link } from "react-router-dom";
import { CATALOG_ROUTE, ORDER_ROUTE } from "../../../app/router/routes";
import { MyButton } from "../../../shared";
import { useAppSelector } from "../../../app/store/store";

interface IProps {
    id: string;
    status: 'success' | 'failed'
}

export const OrderStatus: FC<IProps> = ({id, status}) => {
    
    const {user} = useAppSelector(s => s.UserReducer)

    return (
        <section className={classes.orderStatus}>
            <h1 className={classes.order}>Заказ №{id}</h1>
            <section className={classes.status}>
            {
                status === 'success'
                    ?
                <>
                    <svg className={classes.success} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5 13L14.1625 20L10.5 16.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>
                        успешно оформлен
                    </span>
                </>
                    :
                    <>
                    <svg className={classes.failed} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" strokeWidth="2" strokeMiterlimit="10"/>
                        <path d="M20 12L12 20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20 20L12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>
                        ошибка при оформлении
                    </span>
                </>
                }
            </section>
            <section className={classes.actions}>
                <section className={classes.action}>
                    <Link to={CATALOG_ROUTE.path}>
                        <MyButton
                            sign="Продолжить покупки"
                            onClick={() => {}}
                        />
                    </Link>
                </section>
                {
                    user.isAuth
                        &&
                    <section className={classes.action}>
                        <Link to={ORDER_ROUTE.path.slice(0,-3) + id}>
                            <MyButton 
                                sign="К заказу"
                                onClick={() => {}}
                            />
                        </Link>
                    </section>
                }
            </section>
        </section>
    )
}