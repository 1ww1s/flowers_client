import { FC } from "react";
import classes from './productPrev.module.scss'
import { LoaderDiv } from "../../../../shared";


interface IProps {
    numbItems: number;
}

export const ProductPrevLoader: FC<IProps> = ({numbItems}) => {


    const m = []
    for (let i = 0; i < numbItems; i++){
        m.push(i)
    }


    return (
        m.map(i => 
            <section key={i} className={classes.productPrev}>
                <section className={classes.img}>
                    <LoaderDiv />
                </section>  
                <section className={classes.wrapper}>
                    <section className={classes.data}>
                        <section className={classes.price}>
                            <section className={classes.loader}>
                                <LoaderDiv />
                            </section>
                        </section>
                        <section className={classes.name}>
                            <section className={classes.loader}>
                                <LoaderDiv />
                            </section>
                        </section>          
                    </section>
                                       
                    <section className={classes.features}>
                        <section className={classes.buttonBasket}>
                            <section className={classes.loader}>
                                <LoaderDiv />
                            </section>
                        </section>
                        <section className={classes.buttonFavourites}>
                            <section className={classes.loader}>
                                <LoaderDiv />
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        )
    )
}