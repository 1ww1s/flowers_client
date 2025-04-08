import { FC } from "react";
import classes from './itemData.module.scss'
import { LoaderDiv } from "../loaderDiv/LoaderDiv";
import { GroupDataLoader } from "./group/GroupDataLoader";

interface IProps {
    isLoading: boolean;
    numbItems: number; 
}

export const ItemDataLoader: FC<IProps> = ({numbItems, isLoading}) => {

    let items = []
    for(let i = 0; i < numbItems; i++){
        items.push(i)
    }

    return (
        <section className={classes.infs}>
            {items.map(i =>  
                <GroupDataLoader key={i} />
            )}
        </section>
    )
}