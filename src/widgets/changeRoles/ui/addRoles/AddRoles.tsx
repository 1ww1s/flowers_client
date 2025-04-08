import { FC, useEffect, useState } from "react";
import classes from './addRoles.module.scss'
import { AuthError, ItemData, LoaderSpinner } from "../../../../shared";
import { roleService } from "../../../../entities/role";
import { useUserAcions } from "../../../../entities/user";
import { useSignActions } from "../../../../entities/sign";
import { UserRolesChange } from "../../../../features/userRolesChange";
import { UserSendRoles } from "../../../../features/userSendRoles";
import { useAppSelector } from "../../../../app/store/store";

type IU = {name: string, phone: string, roles: string[]}

interface IProps{
    userTarget: IU
    setUserTarget: (user: IU) => void;
    setOpen: (open: boolean) => void;
}

export const AddRoles: FC<IProps> = ({userTarget, setUserTarget, setOpen}) => {

    const items: {sign: string, data: string}[] = [
        { sign: 'Имя', data: userTarget.name },
        { sign: 'Телефон', data: userTarget.phone },
    ]

    const {isLoading} = useAppSelector(s => s.UserReducer)
    const {setIsLoading} = useUserAcions()
    const [roles, setRoles] = useState<string[]>([])
    const {setIsAuth} = useUserAcions()
    const {setSign} = useSignActions()

    const [userRoles, setUserRoles] = useState<string[]>(userTarget.roles)

    useEffect(() => {
        setUserTarget({...userTarget, roles: userRoles})
    }, [userRoles])

    const getRoles = async () => {
        try{
            setIsLoading(true)
            const data = await roleService.getAll()
            setRoles(data)
        }
        catch(e){  // +
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
        getRoles()
    }, [])


    return (
        <section className={classes.addRoles}>
            <ItemData items={items} />
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                <>
                    <h3>Роли</h3>
                    <UserRolesChange userRoles={userRoles} roles={roles} setUserRoles={setUserRoles} />
                    <UserSendRoles userTarget={userTarget} setOpen={setOpen} />
                </>
            }
        </section>
    )
}