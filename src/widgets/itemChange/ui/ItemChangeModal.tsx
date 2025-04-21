import { FC, useEffect, useState } from "react";

import classes from './itemChangeModal.module.scss'
import { ADMIN_CREATE_ROUTE, ADMIN_UPDATE_ROUTE } from "../../../app/router/routes";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";
import { MyModal } from "../../../shared";
import { Create } from "./create/Create";
import { Update } from "./update/Update";
import { ItemInitialState, useItemActions } from "../../../entities/Item";



export const ItemChangeModal: FC = () => {

    const {pathname} = useLocation()
    const isCreate = pathname === ADMIN_CREATE_ROUTE.path
    const [open, setOpen] = useState<boolean>(false)
    const {setItem} = useItemActions()
    const {sign} = useAppSelector(s => s.SignReducer)

    useEffect(() => {
        setItem(ItemInitialState.item)
    }, [open])

    useEffect(() => {
        setOpen(false)
    }, [sign])

    return (
        <section>
            <MyModal open={open} setOpen={setOpen} title={"Единица товара (цветок)"}>
                <section className={classes.content}>
                    {
                        isCreate
                            ?
                        <>
                            <Create setOpen={setOpen} />
                        </>
                            :
                        <>
                            <Update isUpdate={pathname === ADMIN_UPDATE_ROUTE.path} setOpen={setOpen} />
                        </>
                    }

                </section>
            </MyModal>
        </section>
    )
}