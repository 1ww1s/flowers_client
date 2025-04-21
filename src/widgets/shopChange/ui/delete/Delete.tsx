import { FC } from "react";
import classes from './delete.module.scss'
import { useAppSelector } from "../../../../app/store/store";
import { ShopData } from "../../../../entities/shop";
import { ShopDelete } from "../../../../features/shopDelete";

interface IProps{
    setOpen: (open: boolean) => void;
}

export const Delete: FC<IProps> = ({setOpen}) => {

    const {shop} = useAppSelector(s => s.ShopReducer)

    return(
        <section className={classes.delete}>
            <h3>Данные</h3>
            <ShopData shop={shop} />
            <ShopDelete 
                setOpen={setOpen}    
            />
        </section>
    )
}