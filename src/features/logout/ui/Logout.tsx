import { FC } from "react";
import { MyButton } from "../../../shared";
import { useAppSelector } from "../../../app/store/store";
import { userService, useUserAcions } from "../../../entities/user";





export const Logout: FC = () => {

    const {isLoading} = useAppSelector(s => s.UserReducer)
    const {setIsLoading, setIsAuth} = useUserAcions()

    const logout = async () => {
        try{
            setIsLoading(true)
            await userService.logout()
            setIsAuth(false)
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <section>
            <MyButton 
                sign="Выйти"
                onClick={logout}  
                isLoading={isLoading}  
            />
        </section>
    )
}