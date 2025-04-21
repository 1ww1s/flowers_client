import { FC } from "react";
import classes from './delete.module.scss'
import { useAppSelector } from "../../../../app/store/store";
import { ItemData } from "../../../../shared";
import { ItemDelete } from "../../../../features/itemDelete";

interface IProps{
    setOpen: (open: boolean) => void;
}

export const Delete: FC<IProps> = ({setOpen}) => {

    const {item} = useAppSelector(s => s.ItemReducer)

    return(
        <section className={classes.delete}>
            <h3>Данные</h3>
            <ItemData items={[
                {
                    sign: 'Название',
                    data: item.name
                }
            ]} />
            <ItemDelete 
                setOpen={setOpen}    
            />
        </section>
    )
}