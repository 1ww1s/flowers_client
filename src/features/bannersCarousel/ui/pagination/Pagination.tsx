import { FC } from "react";
import classes from './pagination.module.scss'


interface IProps{
    length: number;
    current: number;
    setCurrent: (current: number) => void;
}

export const BannersPagination: FC<IProps> = ({length, current, setCurrent}) => {

    const mas = []
    for(let i = 0; i < length; i++){
        mas.push(i)
    }

    const onClick = (ind: number) => {
        setCurrent(ind)
    }

    return (
        length > 1
            &&
        <ul className={classes.list}>
            {mas.map((d, i) => 
                <li onClick={() => onClick(i)} className={classes.item + (current === i ? ' ' + classes.active : '')}></li>
            )}
        </ul>
    )
}