import { FC, useEffect, useState } from "react";

import classes from './shopChangeModal.module.scss'
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../../app/store/store";
import { ADMIN_CREATE_ROUTE } from "../../../../app/router/routes";
import { ShopInitialState, useShopActions } from "../../../../entities/shop";
import { MyModal } from "../../../../shared";
import { Create } from "../create/Create";
import { Update } from "../update/Update";



export const ShopChangeFull: FC = () => {

    const {pathname} = useLocation()
    const isCreate = pathname === ADMIN_CREATE_ROUTE.path
    const [open, setOpen] = useState<boolean>(false)
    const {setShop} = useShopActions()
    const {sign} = useAppSelector(s => s.SignReducer)

    useEffect(() => {
        setShop(ShopInitialState.shop)
    }, [open])

    useEffect(() => {
        setOpen(false)
    }, [sign])


    return (
        <section>
            <MyModal open={open} setOpen={setOpen} title={"Магазин"}>
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