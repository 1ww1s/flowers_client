import { FC } from "react";
import classes from './compositionChange.module.scss'
import { ItemChange } from "../itemChange/ItemChange";
import close from '../../../../shared/lib/assets/icon/X.png'
import { useAppSelector } from "../../../../app/store/store";
import { IProduct, useProductActions } from "../../../../entities/product";



export const CompositionChange: FC = () => {

    const {product, isLoading} = useAppSelector(s => s.ProductReducer)
    const {setComposition, setError} = useProductActions()
    

    const addItem = () => {
        setError('')
        const newComposition: IProduct['composition']  = JSON.parse(JSON.stringify(product.composition))
        newComposition.push({
            name: '',
            count: '1'
        })
        setComposition([...newComposition])
    }

    const deleteItem = (ind: number) => {
        if(isLoading) return
        setError('')
        const newComposition = JSON.parse(JSON.stringify(product.composition))
        newComposition.splice(ind, 1)
        setComposition([...newComposition])
    }

    return (
        <section>
            {
                product.composition.map((i, ind) =>
                    
                    <ItemChange 
                        key={ind} 
                        ind={ind}
                    >
                        <img src={close} onClick={() => deleteItem(ind)} className={classes.close} />    
                    </ItemChange>
                )
            }
            <button disabled={isLoading} className={classes.addItem + (isLoading ? (' ' + classes.disabled) : '')} onClick={addItem}>Добавить характеристику</button>
        </section>
    )
}