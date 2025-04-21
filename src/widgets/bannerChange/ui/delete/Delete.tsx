import { FC } from "react";
import classes from './delete.module.scss'
import { useAppSelector } from "../../../../app/store/store";
import { ImageList } from "../../../../entities/image";
import { BannerDelete } from "../../../../features/bannerDelete";

interface IProps{
    setOpen: (open: boolean) => void;
}

export const Delete: FC<IProps> = ({setOpen}) => {

    const {banner} = useAppSelector(s => s.BannerReducer)

    return(
        <section className={classes.delete}>
            <h3>Данные</h3>
            <section className={classes.image}>
                <section>
                    <ImageList
                        heightImg={180}
                        widthImg={580}
                        images={banner.image ? [banner.image] : []} 
                    />

                </section>
            </section>
            <BannerDelete 
                setOpen={setOpen}    
            />
        </section>
    )
}