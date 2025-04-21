import { FC } from "react";
import classes from './change.module.scss'
import { MyInput } from "../../../shared";
import { useAppSelector } from "../../../app/store/store";
import { useItemActions } from "../../../entities/Item";


export const ItemChange: FC = () => {

    const {item, isLoading} = useAppSelector(s => s.ItemReducer)
    const {setName, setError} = useItemActions()

    return (
        <section className={classes.inputs}>
            <MyInput 
                value={item.name}
                setValue={setName}
                typeInput='text'
                isSimple={false}
                title="Название цветка"
                disabled={isLoading}
                setGlobalError={setError}
            />
        </section>
    )
}