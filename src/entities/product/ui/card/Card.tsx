import { FC, PropsWithChildren } from "react";
import { IProductCard } from "../../model/types";
import classes from './card.module.scss'
import { CharacteristicCard } from "../characteristicCard/CharacteristicCard";
import { Description } from "../description/Description";
import { LoaderDiv } from "../../../../shared";

interface IProps {
    product: IProductCard;
    isLoading: boolean;
}

export const Card: FC<IProps & PropsWithChildren> = ({product, isLoading, children}) => {


    return (
        <section className={classes.card}> 
            <section className={classes.name}>
                {
                    isLoading   
                        ?
                    <section className={classes.loader}><LoaderDiv /></section>
                        :
                    <>
                        <h1>{product.name}</h1>
                        {children}
                    </>
                    
                }
            </section>
            {
                isLoading
                    ?
                <section className={classes.loaderDescs}><LoaderDiv /></section>
                    :
                <>
                    <h2>Описание</h2>
                    { product.composition.length ? <Description name="Состав" values={product.composition.map(c => `${c.name} - ${c.count}`)} /> : <></> }
                    <CharacteristicCard characteristics={product.characteristics} />
                </>
            }
        </section>
    )
}