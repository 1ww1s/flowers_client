import { FC, useState } from "react"
import { IBanner } from "../../../../entities/banner"
import classes from './carousel.module.scss'
import { BannersPagination } from "../pagination/Pagination";
import { Link } from "react-router-dom";

interface IProps {
    banners: IBanner[];
}

export const BannersCarousel: FC<IProps> = ({banners}) => {

    const [currentBanner, setCurrentBanner] = useState<number>(0)

    const onBack = () => {
        if(currentBanner === 0){
            setCurrentBanner(banners.length - 1)
        }
        else{
            setCurrentBanner(currentBanner - 1)
        }
    }

    const onForward = () => {
        if(currentBanner === banners.length - 1){
            setCurrentBanner(0)
        }
        else{
            setCurrentBanner(currentBanner + 1)
        }
    }

    return (
        <>
            <section className={classes.carousel}>
                {
                    banners.length > 1
                        &&
                    <button onClick={onBack} className={classes.left}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19.5L7.5 12L15 4.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                }
                <ul className={classes.list}>
                    {banners.map((banner, ind) => 
                        <li className={classes.item + (currentBanner === ind ? ' ' + classes.active : '')}>
                            <Link to={banner.buttonLink}>
                                <img src={banner.image} />
                            </Link>
                        </li>
                    )}
                </ul>
                {
                    banners.length > 1
                        &&
                    <button onClick={onForward} className={classes.right}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 19.5L16.5 12L9 4.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                }
            </section>
            <section className={classes.pagination}>
                <BannersPagination 
                    length={banners.length} 
                    current={currentBanner} 
                    setCurrent={setCurrentBanner} 
                />
            </section>
        </>

    )
}