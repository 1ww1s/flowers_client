import { FC, useEffect, useState } from "react";
import { AuthError, LoaderSpinner, MyModal, Stages } from "../../../shared";
import classes from './changeRoles.module.scss'
import { SearchAndSelectUser } from "../../../features/userSearchAndSelect";
import { userService, useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";
import { AddRoles } from "./addRoles/AddRoles";
import { useAppSelector } from "../../../app/store/store";




export const ChangeRolesModal: FC = () => {

    const [open, setOpen] = useState<boolean>(false)
    const [stage, setStage] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [selectedPhone, setSelectedPhone] = useState<string>('')
    const {setIsAuth} = useUserAcions()
    const {setSign} = useSignActions()
    const {sign} = useAppSelector(s => s.SignReducer)
    const [user, setUser] = useState<{name: string, phone: string, roles: string[]}>({name: '', phone: '', roles: []})

    const getUser = async () => {
        try{
            setIsLoading(true)
            const data = await userService.get(selectedPhone.slice(0, selectedPhone.search(',')))
            setUser(data)
            setStage(2)
        }
        catch(e){ // +
            if(e instanceof Error){  
                if(e instanceof AuthError && e.status === 401){
                    setIsAuth(false)
                }
                else {
                    setSign({type: 'error', message: e.message})
                }
            }
            else{
                console.log(e)
            }
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        setOpen(false)
    }, [sign])

    useEffect(() => {
        setUser({name: '', phone: '', roles: []})
        if(open){
            setStage(1)
        }
    }, [open])

    useEffect(() => {
        if(selectedPhone){
            getUser()
        }
    }, [selectedPhone])

    return (
        <MyModal open={open} setOpen={setOpen} title={"Изменить роли у пользователя"}>
            <Stages stage={stage} setStage={setStage}>
                <section className={classes.content}>
                    <h2>Изменить роль у пользователя</h2>
                    { stage === 1 && !isLoading && <SearchAndSelectUser setOpen={setOpen} setSelected={setSelectedPhone} /> }
                    { stage === 1 && isLoading && <section className={classes.loader}><LoaderSpinner /></section> }
                    { stage === 2 && <AddRoles userTarget={user} setUserTarget={setUser} setOpen={setOpen} /> }
                </section>
            </Stages>
        </MyModal>
    )
}