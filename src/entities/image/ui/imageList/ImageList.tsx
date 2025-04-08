import { FC } from "react";
import classes from './imageList.module.scss'

interface IProps {
    images: string[]
    onDeleteImg?: (ind: number) => void;
    heightImg?: number;
    widthImg?: number;  
}


export const ImageList: FC<IProps> = ({images, onDeleteImg, heightImg, widthImg}) => {


    return (
        <section className={classes.list}>
            {
                images.map((image, ind) => 
                    <section 
                        style={{
                            height: heightImg ? heightImg : 110,
                            width: widthImg ? widthImg : 100,
                        }}
                        key={ind} 
                        className={classes.imgWrapper}
                    >
                        <img src={image} />
                        {
                            onDeleteImg
                                &&
                            <label onClick={() => onDeleteImg(ind)} className={classes.delete}>
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M25 7L7 25" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M25 25L7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </label>
                        }
                    </section>
                )
            }
        </section>
    )
}