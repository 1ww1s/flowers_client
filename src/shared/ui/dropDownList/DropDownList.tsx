import { ComponentProps, MouseEvent } from 'react';
import classes from './dropDownList.module.scss'


interface IProps<T> {
    list: T[];
    onClick: (val: T) => void;
    onMouseDown?: (e: MouseEvent) => void;
}

export function DropDownList<T extends {value: string}>({list, onClick, onMouseDown}: (IProps<T>)) {

    return (
        list.length
            ?
        <ul className={classes.dropDown}>
            {list.map((l, ind) => 
                <li 
                    onMouseDown={onMouseDown}
                    onClick={() => onClick(l)} 
                    className={classes.item} 
                    key={ind}
                >
                    {l.value}
                </li>
            )}
        </ul>
            :
        <></>    
    )
}