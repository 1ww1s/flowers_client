import { FC } from "react";
import { AuthError, MyButton } from "../../../shared";
import { userService, useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";
import classes from './userSendRoles.module.scss'
import { useAppSelector } from "../../../app/store/store";

interface IProps {
    userTarget: {name: string, phone: string, roles: string[]};
    setOpen: (open: boolean) => void;
}

export const UserSendRoles: FC<IProps> = ({userTarget, setOpen}) => {

    const {setIsAuth, setIsLoading, setError} = useUserAcions()
    const {setSign} = useSignActions()
    const {isLoading, error} = useAppSelector(s => s.UserReducer)

    const onClick = async () => {
        try{
            setIsLoading(true)
            await userService.rolesUpdate(userTarget.phone, userTarget.roles)
            setOpen(false)
        }
        catch(e){
            if(e instanceof Error){  
                if(e.name === 'AbortError'){
                    return
                }
                if(e instanceof AuthError && e.status === 401){
                    setIsAuth(false)
                }
                else if(e instanceof AuthError && e.status === 403) {
                    setSign({type: 'error', message: e.message})
                }
                else{
                    setError(e.message)
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

    return (
        <section className={classes.send}>
            <MyButton 
                width={240}
                sign={"Изменить роли"}
                isLoading={isLoading}
                onClick={() => onClick()}
                error={error}
            />
        </section>
    )
}