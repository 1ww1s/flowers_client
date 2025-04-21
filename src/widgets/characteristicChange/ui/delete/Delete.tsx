import { FC } from "react";
import classes from './delete.module.scss'
import { useAppSelector } from "../../../../app/store/store";
import { ItemData } from "../../../../shared";
import { CharacteristicDelete } from "../../../../features/characteristicDelete";

interface IProps{
    setOpen: (open: boolean) => void;
}

export const Delete: FC<IProps> = ({setOpen}) => {

    const {characteristic} = useAppSelector(s => s.CharacteristicReducer)

    return(
        <section className={classes.delete}>
            <h3>Данные</h3>
            <ItemData items={[
                {
                    sign: 'Название',
                    data: characteristic.name
                }
            ]} />
            <CharacteristicDelete 
                setOpen={setOpen}    
            />
        </section>
    )
}