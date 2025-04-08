import { FC } from "react";
import classes from './change.module.scss'
import { MyInput } from "../../../shared";
import { useAppSelector } from "../../../app/store/store";
import { useShopActions } from "../../../entities/shop";


export const ShopChange: FC = () => {

    const {shop, isLoading} = useAppSelector(s => s.ShopReducer)
    const {setAddress, setTitle, setOpeningHours, setCoordinateX, setCoordinateY, setError} = useShopActions()

    return (
        <section className={classes.inputs}>
            <MyInput 
                value={shop.title}
                setValue={setTitle}
                typeInput='text'
                isSimple={false}
                title="Название магазина"
                disabled={isLoading}
                setGlobalError={setError}
            />
            <MyInput 
                value={shop.address}
                setValue={setAddress}
                typeInput='text'
                isSimple={false}
                title="Адрес магазина"
                disabled={isLoading}
                setGlobalError={setError}
            />
            <MyInput 
                value={shop.openingHours}
                setValue={setOpeningHours}
                typeInput='text'
                isSimple={false}
                title="Время работы магазина"
                sign="Формат: 24 часа или 9:00 - 21:00"
                disabled={isLoading}
                setGlobalError={setError}
            />
            <h3>Координаты</h3>
            <MyInput 
                value={`${shop.coordinateX}`}
                setValue={x => setCoordinateX(+x)}
                typeInput='text'
                type='number'
                clear={false}
                isSimple={false}
                title="Координаты (x)"
                disabled={isLoading}
                setGlobalError={setError}
            />
            <MyInput 
                value={`${shop.coordinateY}`}
                setValue={y => setCoordinateY(+y)}
                typeInput='text'
                type='number'
                clear={false}
                isSimple={false}
                title="Координаты (y)"
                disabled={isLoading}
                setGlobalError={setError}
            />
        </section>
    )
}