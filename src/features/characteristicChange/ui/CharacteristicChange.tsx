import { FC } from "react";
import classes from './characteristicChange.module.scss'
import { MyInput } from "../../../shared";
import { useAppSelector } from "../../../app/store/store";
import { useCharacteristicActions } from "../../../entities/characteristic";


export const CharacteristicChange: FC = () => {

    const {characteristic, isLoading} = useAppSelector(s => s.CharacteristicReducer)
    const {setName, setError} = useCharacteristicActions()

    return (
        <section className={classes.inputs}>
            <MyInput 
                value={characteristic.name}
                setValue={setName}
                typeInput='text'
                isSimple={false}
                title="Название характеристики"
                disabled={isLoading}
                setGlobalError={setError}
            />
        </section>
    )
}