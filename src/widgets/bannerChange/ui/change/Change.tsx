import { FC } from "react";
import { useAppSelector } from "../../../../app/store/store";
import { AddImage } from "../../../../features/addImage";
import classes from './change.module.scss'
import { CategorySend } from "../../../../features/categorySend";
import { ImageList } from "../../../../entities/image";
import { useBannerActions } from "../../../../entities/banner";
import { BannerChange } from "../../../../features/bannerChange";
import { BannerSend } from "../../../../features/bannerSend";

interface IProps {
    setOpen: (open: boolean) => void;
}

export const Change: FC<IProps> = ({setOpen}) => {

    const {banner, isLoading} = useAppSelector(s => s.BannerReducer)
    const {setImageDesctop, setImageMobile, setError} = useBannerActions()

    return (
        <section className={classes.change}>
            <BannerChange />
            <h3 className={classes.imgTitle}>Фотография</h3>
            <section className={classes.image}>  { /* отдельный FC */}
                <p>Для пк версии</p>
                <section className={classes.img}>
                    <ImageList 
                        heightImg={180}
                        widthImg={580}
                        images={banner.imageDesctop ? [banner.imageDesctop] : []} 
                    />
                </section>
                <section className={classes.add}>
                    <AddImage
                        addImage={setImageDesctop}
                        setGlobalError={setError}
                        disabled={isLoading}
                    />
                </section>
            </section>
            <section className={classes.image}>
                <p>Для мобильной версии</p>
                <section className={classes.img}>
                    <ImageList 
                        heightImg={570}
                        widthImg={320}
                        images={banner.imageMobile ? [banner.imageMobile] : []} 
                    />
                </section>
                <section className={classes.add}>
                    <AddImage
                        addImage={setImageMobile}
                        setGlobalError={setError}
                        disabled={isLoading}
                    />
                </section>
            </section>
            <BannerSend 
                setOpen={setOpen}
            />
        </section>
    )
}