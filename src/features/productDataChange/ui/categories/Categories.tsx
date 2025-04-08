import { FC } from "react";
import { MySelect } from "../../../../shared";
import { useAppSelector } from "../../../../app/store/store";
import { useProductActions } from "../../../../entities/product";
import classes from './categories.module.scss'


interface IProps {
    isLoading: boolean;
    names: {id: number, name: string}[]
}


export const Categories: FC<IProps> = ({isLoading, names}) => {

    const {product} = useAppSelector(s => s.ProductReducer)
    const {setCategories, setError} = useProductActions()

    const onChange = (values: string[]) => {
        setCategories(values.map(value => ({id: names.find(data => data.name === value)?.id, name: value})))
    }

    return (
        <section className={classes.categories}>
            <MySelect
                multiple
                disabled={isLoading}
                value={product.categories.map(c => c.name)}
                setValues={onChange}
                defaultValue="Выберите категории"
                options={names.map(data => ({name: data.name, value: data.name}))}
                setGlobalError={setError}
                sign="Для выбора нескольких значений списка нужно использовать клавиши Ctrl или Shift совместно с курсором мыши."
            />       
        </section>
    )
}