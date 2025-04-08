import { FC } from "react";
import classes from './categoryPrev.module.scss'
import { LoaderDiv } from "../../../../shared";

interface IProps {
    numbItems: number;
}

export const CategoryPrevLoader: FC<IProps> = ({numbItems}) => {

    const m = []
    for (let i = 0; i < numbItems; i++){
        m.push(i)
    }

    return (
        
        m.map((m, ind) => 
            <section key={ind} className={classes.categoryPrev}>
                <LoaderDiv key={m} />
            </section>
        )
            
    )
}