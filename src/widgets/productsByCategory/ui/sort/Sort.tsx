import { FC } from "react";
import { SelectionOfSorting } from "../../../../features/selectionOfSorting";
import classes from './sort.module.scss'
import { TSort } from "../../lib/const/const";

interface IProps {
    sort: TSort[];
}

export const Sort: FC<IProps> = ({sort}) => {


    return (
        <section className={classes.sort}>
            <SelectionOfSorting sort={sort} />
        </section>
    )
}