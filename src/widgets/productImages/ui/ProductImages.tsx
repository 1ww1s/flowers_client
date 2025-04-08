import { FC, useEffect, useState } from "react";
import classes from './productImages.module.scss'
import { ProductImage, productService, useProductActions } from "../../../entities/product";
import { SelectionProductImage } from "../../../features/selectionProductImage";
import { LoaderDiv } from "../../../shared";

interface IProps {
    slug: string;
}

export const ProductImages: FC<IProps> = ({slug}) => {

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [images, setImages] = useState<string[]>([])
    const [selectedImage, setSelectedImage] = useState<number>(0)
    const {setError} = useProductActions()

    const getImages = async () => {
        try{
            setIsLoading(true)
            const data = await productService.getImages(slug)
            // await new Promise(resolve => setTimeout(resolve, 1000))
            setImages(data)
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
                            images={images}
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
                        <ProductImage image={images[selectedImage]} />
                    }
                </section>
            </section>
        </section>
    )
}