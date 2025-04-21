import { FC, useEffect, useState } from "react";
import classes from './productImages.module.scss'
import { ProductImage, productService, useProductActions } from "../../../entities/product";
import { SelectionProductImage } from "../../../features/selectionProductImage";
import { LoaderDiv } from "../../../shared";
import { useAppSelector } from "../../../app/store/store";

interface IProps {
    slug: string;
}

export const ProductImages: FC<IProps> = ({slug}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [selectedImage, setSelectedImage] = useState<number>(0)
    const {setError, setImages: setImagesProduct} = useProductActions()

    const {product} = useAppSelector(s => s.ProductReducer)

    const getImages = async () => {
        try{
            setIsLoading(true)
            const data = await productService.getImages(slug)
            // await new Promise(resolve => setTimeout(resolve, 4000))
            setImagesProduct(data)
        }
        catch(e){
            setError('err')
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getImages()
    }, [])

    return (
        <section className={classes.wrap}>
            <section className={classes.track}>
                <section className={classes.selectionImage}>
                    {
                        isLoading
                            ?
                        <section className={classes.loader}><LoaderDiv /></section>                            
                            :
                        <SelectionProductImage 
                            images={product.data.images}
                            selectedImage={selectedImage}
                            setSelectedImage={setSelectedImage}
                        />
                    }
                </section>
                <section className={classes.selectedImage}>
                    {
                        isLoading
                            ?
                        <section className={classes.loader}><LoaderDiv /></section>                            
                            :
                        <ProductImage image={product.data.images[selectedImage]} />
                    }
                </section>
            </section>
        </section>
    )
}