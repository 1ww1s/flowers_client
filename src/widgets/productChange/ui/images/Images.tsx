import { FC } from "react";
import { AddImage } from "../../../../features/addImage";
import { ImageList } from "../../../../entities/image";
import classes from './images.module.scss'
import { useAppSelector } from "../../../../app/store/store";
import { useProductActions } from "../../../../entities/product";

export const Images: FC = () => {

    const {product, isLoading} = useAppSelector(s => s.ProductReducer)
    const {setImages} = useProductActions()
    const {setError} = useProductActions()

    const addImage = (newImage: string) => {
        setImages([...product.data.images, newImage])
    }
    
    const deleteImg = (ind: number) => {
        const copy = [...product.data.images]
        copy.splice(ind, 1)
        setImages(copy)
    }
    
    return (
        <section className={classes.images}>
            <h2>Фотографии</h2>
            <section className={classes.listBox}>
                <section className={classes.list}>
                    <ImageList images={product.data.images} onDeleteImg={deleteImg} />
                </section>
                <section className={classes.addImg}>
                    <AddImage setGlobalError={setError} disabled={isLoading} addImage={addImage} />
                </section>
            </section>
        </section>
    )
}