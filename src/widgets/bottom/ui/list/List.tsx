import React, { FC } from "react";
import classes from './list.module.scss'


interface IProps {
    childrens: React.ReactElement[]
}

export const List: FC<IProps> = ({childrens}) => {

    return (
        <ul className={classes.list}>
            {childrens.map((children, ind) =>
                <li 
                    key={ind}
                    className={classes.item}
                >
                    {children}
                </li>
            )}
        </ul>
    )
}