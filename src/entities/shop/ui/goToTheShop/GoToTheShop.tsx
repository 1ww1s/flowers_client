import { FC } from "react";
import classes from './goToTheShop.module.scss'
import { MyButton } from "../../../../shared";
import { Link } from "react-router-dom";

interface IProps {
    to: string;
}

export const GoToTheShop: FC<IProps> = ({to}) => {


    return (
        <Link to={to}>
            <MyButton 
                sign="Подробнее"
                onClick={() => {}}
            />
        </Link>
    )
}