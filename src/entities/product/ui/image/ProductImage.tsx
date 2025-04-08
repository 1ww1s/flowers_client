import { FC } from "react";
import classes from './image.module.scss'

interface IProps {
    image: string;
}

export const ProductImage: FC<IProps> = ({image}) => {


    return (
        <img className={classes.image} src={image} alt="фото товара" />
    )
}