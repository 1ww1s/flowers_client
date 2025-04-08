import { FC } from "react";
import classes from './userRolesChange.module.scss'
import { useAppSelector } from "../../../app/store/store";
import { useUserAcions } from "../../../entities/user";

interface IProps{
    userRoles: string[]
    setUserRoles: (userRoles: string[]) => void;
    roles: string[]
}


export const UserRolesChange: FC<IProps> = ({userRoles, setUserRoles, roles}) => {

    const {isLoading} = useAppSelector(s => s.UserReducer)
    const {setError} = useUserAcions()

    const onChange = (role: string, checked: boolean) => {
        setError('')
        if(checked){
            setUserRoles([...userRoles, role])
        }
        else{
            const r = userRoles.filter(r => r !== role)
            setUserRoles(r)
        }
    }

    return (
        <ul className={classes.list}>
            {
                roles.length
                    ?
                roles.map(role => 
                    <li key={role}>
                        <label>
                            <input 
                                type='checkbox'
                                disabled={isLoading} 
                                onChange={(e) => onChange(role, e.target.checked)} 
                                checked={userRoles.includes(role)} 
                            />
                            {role}
                        </label>
                    </li>  
                )
                    :
                <span>Нет доступных ролей</span>
            }
        </ul>
    )
}