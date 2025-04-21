import { FC } from "react";
import { IProductPreview } from "../../../../entities/product";
import classes from './delete.module.scss'
import { ItemData } from "../../../../shared";
import { ImageList } from "../../../../entities/image";
import { ProductDelete } from "../../../../features/productDelete";

interface IProps{
    selectedProduct: IProductPreview
    setOpen: (open: boolean) => void;
}

export const Delete: FC<IProps> = ({selectedProduct, setOpen}) => {

    const items: {sign: string, data: string}[] = [
        {sign: 'Название', data: selectedProduct.name},
        {sign: 'Цена', data: selectedProduct.price}
    ]

    return(
        <section className={classes.delete}>
            <h3>Данные</h3>
            <ItemData items={items} />
            <h3>Фотография</h3>
            <section className={classes.imageList}>
                <ImageList images={[selectedProduct.image]} />
            </section>
            <ProductDelete 
                product={selectedProduct}
                setOpen={setOpen}    
            />
        </section>
    )
}