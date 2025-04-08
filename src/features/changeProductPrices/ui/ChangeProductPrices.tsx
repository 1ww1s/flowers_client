import { FC, useEffect, useState } from "react";
import { MyInput } from "../../../shared";
import classes from './changeProductPrices.module.scss'



interface IProps {
    max: number;
    min: number;
    valueMax: number;
    valueMin: number;
    onBlur: (valMin: number, valMax: number) => void;
}


export const ChangeProductPrices: FC<IProps> = ({
    max, min, valueMax, valueMin, onBlur
}) => {

    const [targetMin, setTargetMin] = useState<number>(valueMin)
    const [targetMax, setTargetMax] = useState<number>(valueMax)

    useEffect(() => {
        setTargetMax(valueMax)
        setTargetMin(valueMin)
    }, [valueMax, valueMin])

    const check = (numb: number) => {
        if(numb > max){
            numb = max;
        }
        if(numb < min){
            numb = min;
        }
        return numb;
    }
    
    const onTargetBlur = () => {
        const checkMin = check(targetMin) > valueMax ? valueMax : check(targetMin) 
        const checkMax = check(targetMax) < valueMin ? valueMin : check(targetMax)
        setTargetMax(valueMax)
        setTargetMin(valueMin)
        onBlur(checkMin, checkMax)
    }

    return (
        <section className={classes.inputs}>
                <MyInput 
                    onBlur={onTargetBlur}
                    typeInput="number"
                    value={`${targetMin}`}
                    setValue={val => setTargetMin(+val)}
                    clear={false}
                />
            <section className={classes.dash}>
            </section>

            <MyInput 
                typeInput="number"
                value={`${targetMax}`}
                setValue={val => setTargetMax(+val)}
                onBlur={onTargetBlur}
                clear={false}
            />
        </section>
    )
}