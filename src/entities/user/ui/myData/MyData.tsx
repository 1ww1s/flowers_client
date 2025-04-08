import { FC } from "react";
import classes from './myData.module.scss'
import { useAppSelector } from "../../../../app/store/store";


export const MyData: FC = () => {

    const {user} = useAppSelector(s => s.UserReducer)
    
    return(
        <section className={classes.myData}>
            <h2>Мои данные</h2>

            <section className={classes.infs}>
                <section className={classes.inf}>
                    <label className={classes.title}>Имя</label>
                    <span className={classes.value}>{user.name}</span>
                </section>

                <section className={classes.inf}>
                    <label className={classes.title}>Телефон</label>
                    <span className={classes.value}>{user.phone}</span>
                </section>
            
            </section>
        </section>
    )
}