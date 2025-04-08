import { FC } from "react";
import { useAppSelector } from "../../../../app/store/store";
import { useCategoryActions } from "../../../../entities/category";
import { AddImage } from "../../../../features/addImage";
import classes from './change.module.scss'
import { CategorySend } from "../../../../features/categorySend";
import { ImageList } from "../../../../entities/image";
import { CategoryChange } from "../../../../features/categoryChange";

interface IProps {
    setOpen: (open: boolean) => void;
}

export const Change: FC<IProps> = ({setOpen}) => {

    const {category, isLoading} = useAppSelector(s => s.CategoryReducer)
    const {setImage, setError} = useCategoryActions()

    return (
        <section className={classes.change}>
            <CategoryChange />
            <h3 className={classes.imgTitle}>Фотография</h3>
            <section className={classes.image}>
                <section className={classes.img}>
                    <ImageList images={category.image ? [category.image] : []} />
                </section>
                <section className={classes.add}>
                    <AddImage
                        addImage={setImage}
                        setGlobalError={setError}
                        disabled={isLoading}
                    />
                </section>
            </section>

            <CategorySend
                setOpen={setOpen}
            />
        </section>
    )
}