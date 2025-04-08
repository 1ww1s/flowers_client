import { FC } from "react";
import classes from './selectedShowShops.module.scss'

interface IProps {
    selectedList: boolean;
    setSelectedList: (selected: boolean) => void;
}

export const SelectedShowShops: FC<IProps> = ({selectedList, setSelectedList}) => {



    return (
        <ul className={classes.selectedShowShops}>
           <li className={selectedList ? classes.active : ''} onClick={() => setSelectedList(true)}>Список</li>
           <li className={!selectedList ? classes.active : ''} onClick={() => setSelectedList(false)}>Карта</li>
        </ul>
    )
}