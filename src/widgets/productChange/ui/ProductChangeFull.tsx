import { FC, useEffect, useState } from "react";

import classes from './change.module.scss'
import { ADMIN_CREATE_ROUTE } from "../../../app/router/routes";
import { useLocation } from "react-router-dom";
import { Update } from "./update/Update";
import { ProductInitialState, useProductActions } from "../../../entities/product";
import { Create } from "./create/Create";
import { useAppSelector } from "../../../app/store/store";
import { MyModal } from "../../../shared";



export const ProductChangeFull: FC = () => {

    const {pathname} = useLocation()
    const isCreate = pathname === ADMIN_CREATE_ROUTE.path
    const [open, setOpen] = useState<boolean>(false)
    const {setProduct} = useProductActions()
    const {sign} = useAppSelector(s => s.SignReducer)

    useEffect(() => {
        setProduct(ProductInitialState.product)
    }, [open])

    useEffect(() => {
        setOpen(false)
    }, [sign])


    return (
        <section>
            <MyModal open={open} setOpen={setOpen} title={"Товар"}>
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