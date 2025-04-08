import { FC, MouseEvent } from "react";
import classes from './itemData.module.scss'
import { GroupData } from "./group/GroupData";

interface IProps {
    items: {    
        sign: string;
        data: string;
    }[]
}

export const ItemData: FC<IProps> = ({items}) => {


    return (
        <section className={classes.infs}>
            {items.map((item, ind) =>  
                <GroupData key={ind} sign={item.sign} data={item.data} />
            )}
        </section>
    )
}