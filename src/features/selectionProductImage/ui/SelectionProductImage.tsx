import { FC, useRef, useState } from "react";
import classes from './images.module.scss'
import { Button } from "./up/Button";

interface IProps {
    images: string[];
    selectedImage: number;
    setSelectedImage: (selectedImage: number) => void;
}

export const SelectionProductImage: FC<IProps> = ({images, selectedImage, setSelectedImage}) => {

    const ref = useRef<HTMLDivElement>(null)
    const [showButtonUp, setShowButtonUp] = useState<boolean>(false)
    const [showButtonDown, setShowButtonDown] = useState<boolean>(true)
    const useButtons = images.length > 4

    const onSelected = (ind: number) => {
        setSelectedImage(ind)
    }

    const onScroll = (e:  React.UIEvent<HTMLElement, UIEvent>) => {
        console.dir(e.currentTarget)
        if(e.currentTarget.scrollTop === 0){
            setShowButtonUp(false)
        }
        else{
            setShowButtonUp(true)
        }
        if(e.currentTarget.scrollHeight - e.currentTarget.offsetHeight === e.currentTarget.scrollTop){
            setShowButtonDown(false)
        }
        else{
            setShowButtonDown(true)
        }
    }

    return (
        <section className={classes.carousel}>
            { useButtons && showButtonUp && <Button isUp={true} ref={ref} /> }
            <section ref={ref} onScroll={e => onScroll(e)} className={classes.images}>
            {
                images.map((image, ind) => 
                    <section 
                        key={ind} 
                        className={classes.image + (selectedImage === ind ? " " + classes.selected : '')}
                        onClick={() => onSelected(ind)}
                    > 
                        <img src={image} alt="Выберите одну из фотографий" />
                    </section>
                )
            }
            </section>
            { useButtons && showButtonDown && <Button isUp={false} ref={ref} /> }
        </section>
    )
}