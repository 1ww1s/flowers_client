import { FC, useEffect, useState } from "react";

import classes from './characteristicChangeModal.module.scss'
import { ADMIN_CREATE_ROUTE, ADMIN_UPDATE_ROUTE } from "../../../app/router/routes";
import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";
import { MyModal } from "../../../shared";
import { Create } from "./create/Create";
import { Update } from "./update/Update";
import { CharacteristicInitialState, useCharacteristicActions } from "../../../entities/characteristic";



export const CharacteristicChangeModal: FC = () => {

    const {pathname} = useLocation()
    const isCreate = pathname === ADMIN_CREATE_ROUTE.path
    const [open, setOpen] = useState<boolean>(false)
    const {setCharacteristic} = useCharacteristicActions()
    const {sign} = useAppSelector(s => s.SignReducer)

    useEffect(() => {
        setCharacteristic(CharacteristicInitialState.characteristic)
    }, [open])

    useEffect(() => {
        setOpen(false)
    }, [sign])

    return (
        <MyModal open={open} setOpen={setOpen} title={"Характеристика"}>
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
    )
}