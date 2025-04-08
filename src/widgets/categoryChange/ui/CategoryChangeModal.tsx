import { FC, useEffect, useState } from "react";

import classes from './categoryChangeModal.module.scss'
import { ADMIN_CREATE_ROUTE } from "../../../app/router/routes";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";
import { MyModal } from "../../../shared";
import { Create } from "./create/Create";
import { Update } from "./update/Update";
import { CategoryInitialState, useCategoryActions } from "../../../entities/category";



export const CategoryChangeModal: FC = () => {

    const {pathname} = useLocation()
    const isCreate = pathname === ADMIN_CREATE_ROUTE.path
    const [open, setOpen] = useState<boolean>(false)
    const {setCategory} = useCategoryActions()

    const {sign} = useAppSelector(s => s.SignReducer)

    useEffect(() => {
        setCategory(CategoryInitialState.category)
    }, [open])

    useEffect(() => {
        setOpen(false)
    }, [sign])


    return (
        <section>
            <MyModal open={open} setOpen={setOpen} title={"Категория"}>
                <section className={classes.content}>
                    {
                        isCreate
                            ?
                        <>
                            <Create setOpen={setOpen} />
                        </>
                            :
                        <>
                            <Update setOpen={setOpen} />
                        </>
                    }

                </section>
            </MyModal>
        </section>
    )
}