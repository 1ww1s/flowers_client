import { FC } from "react";
import classes from './bannerChange.module.scss'
import { MyInput } from "../../../shared";
import { useAppSelector } from "../../../app/store/store";
import { useBannerActions } from "../../../entities/banner";




export const BannerChange: FC = () => {

    const {banner, isLoading} = useAppSelector(s => s.BannerReducer)
    const {setTitle, setButtonLink, setError} = useBannerActions()

    return (
        <>
            <section className={classes.input}>
                <MyInput 
                    value={banner.title}
                    setValue={setTitle}
                    typeInput='text'
                    isSimple={false}
                    title="Наименование баннера"
                    disabled={isLoading}
                    setGlobalError={setError}
                    />
            </section>
            <section className={classes.input}>
                <MyInput 
                    value={banner.buttonLink}
                    setValue={setButtonLink}
                    typeInput='text'
                    isSimple={false}
                    title="Ссылка"
                    disabled={isLoading}
                    setGlobalError={setError}
                />
            </section>
        </>
    )
}