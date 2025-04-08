import { FC } from "react";
import classes from './categoryChange.module.scss'
import { MyInput } from "../../../shared";
import { useAppSelector } from "../../../app/store/store";
import { useCategoryActions } from "../../../entities/category";



export const CategoryChange: FC = () => {

    const {category, isLoading} = useAppSelector(s => s.CategoryReducer)
    const {setName, setError} = useCategoryActions()

    return (
        <section className={classes.input}>
            <MyInput 
                value={category.name}
                setValue={setName}
                typeInput='text'
                isSimple={false}
                title="Наименование категории"
                disabled={isLoading}
                setGlobalError={setError}
            />
        </section>
    )
}