import { FC, useEffect, useState } from "react";
import { AuthError, Autocomplete } from "../../../shared";
import classes from './searchAndSelectUser.module.scss'
import { userService, useUserAcions } from "../../../entities/user";
import { useSignActions } from "../../../entities/sign";



interface IProps {
    setSelected: (selected: string) => void;
    setOpen: (open: boolean) => void;
}


export const SearchAndSelectUser: FC<IProps> = ({setSelected, setOpen}) => {

    const [users, setUsers] = useState<{phone: string, name: string}[]>([])
    const [phone, setPhone] = useState<string>('')
    const [targetError, setTargetError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {setIsAuth} = useUserAcions()
    const {setSign} = useSignActions()

    const getUsers = async () => {
        try{
            setIsLoading(true)
            const userData = await userService.getStartsWith(phone)
            setUsers(userData)
        }
        catch(e){  // +
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
                    setTargetError(e.message)
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
        if(phone){
            getUsers()
        }
    }, [phone])

    return (
        <section className={classes.searchAndSelectUser}>  
            <Autocomplete
                value={phone}
                setValue={setPhone}
                values={users.map(user => `${user.phone}, ${user.name}`)}
                setSelectedValue={setSelected}
                title="Телефон (7XXXXXXXXXX)"
                sign="Начните вводить телефон и выберите из списка нужного пользователя"
                isLoading={isLoading}
                setGlobalError={setTargetError}
                globalError={targetError}
            />
        </section>
    )
}