import { FC, useEffect, useState } from "react";
import { CharacteristicSelect } from "../../../../entities/characteristic";
import classes from './characteristicsChange.module.scss'
import { IProduct, useProductActions } from "../../../../entities/product";
import close from '../../../../shared/lib/assets/icon/X.png'
import { useAppSelector } from "../../../../app/store/store";

interface IProps {
    characteristic: IProduct['characteristics'][0]
}


export const ProductCharacteristicsChange: FC<IProps> = ({characteristic}) => {

    type TValues = {id?: string, value: string}
    const [values, setValues] = useState<TValues[]>(characteristic.values)
    const {setCharacteristicValues, setError} = useProductActions()
    const {isLoading} = useAppSelector(s => s.ProductReducer)

    useEffect(() => {
        setCharacteristicValues({name: characteristic.name, values: values})
    }, [values])

    const changeElem = (ind: number, newVal: string) => {
        const target = JSON.parse(JSON.stringify(values))
        target[ind].value = newVal;
        setValues(target)
    }

    const addChVal = () => {
        setError('')
        const newValues: TValues[] = JSON.parse(JSON.stringify(values))
        newValues.push({value: ''})
        setValues(newValues)
    }

    const deleteChVal = (ind: number) => {
        if(isLoading) return
        const newValues: TValues[] = JSON.parse(JSON.stringify(values))
        newValues.splice(ind, 1)
        setValues(newValues)
    }

    return (
        <section className={classes.productChChange}>
            <h3>{characteristic.name}</h3>
            <section className={classes.values}>
                {characteristic.values.map((value, ind) => 
                    <CharacteristicSelect 
                        key={ind}
                        characteristicName={characteristic.name}
                        value={value.value}
                        setValue={(val: string) => changeElem(ind, val)}
                    >
                        <img src={close} onClick={() => deleteChVal(ind)} className={classes.close} />    
                    </CharacteristicSelect>
                )}
            </section>
            <button disabled={isLoading} className={classes.addChVal + (isLoading ? (' ' + classes.disabled) : '')} onClick={addChVal}>Добавить характеристику</button>
        </section>
    )
}