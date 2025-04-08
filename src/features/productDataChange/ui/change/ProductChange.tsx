import { FC } from "react";
import { useAppSelector } from "../../../../app/store/store";
import classes from './productChange.module.scss'
import { useProductActions } from "../../../../entities/product";
import { LoaderSpinner, MyInput } from "../../../../shared";
import { Categories } from "../categories/Categories";
import { Shops } from "../shops/Shops";

interface IProps {
    names: {id: number, name: string}[]
    isLoadingByCategory: boolean;
}

export const ProductChange: FC<IProps> = ({names, isLoadingByCategory}) => {

    const {product, isLoading} = useAppSelector(s => s.ProductReducer)
    const {setName, setPrice, setError} = useProductActions()

    return (
        <section className={classes.productChange}>
            <section className={classes.select}>
                {
                    isLoadingByCategory
                        ?
                    <section className={classes.loader}><LoaderSpinner /></section>
                        :
                    <Categories isLoading={isLoadingByCategory} names={names} />
                }
            </section>
            <section className={classes.input}>
                <MyInput
                    disabled={isLoading}
                    isSimple={false}
                    title="Название"
                    value={product.data.name}
                    setValue={setName}
                    typeInput='text'
                    setGlobalError={setError}
                />
            </section>
            <section className={classes.input}>
                <MyInput
                    disabled={isLoading}
                    isSimple={false}
                    title="Цена"
                    value={product.data.price}
                    setValue={setPrice}
                    typeInput='number'
                    setGlobalError={setError}
                />
            </section>
            <section className={classes.input}>
                <Shops />
            </section>
        </section>
    )
}