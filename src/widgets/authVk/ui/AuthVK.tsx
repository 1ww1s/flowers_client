import { FC, useEffect, useState } from "react";
import classes from './authVK.module.scss'
import { useNavigate, useSearchParams } from "react-router-dom";
import { userService, useUserAcions } from "../../../entities/user";
import { useAppSelector } from "../../../app/store/store";
import { LoaderSpinner, MyButton, SyncBasket } from "../../../shared";
import { HOME_ROUTE, LOGIN_ROUTE, MY_ROUTE } from "../../../app/router/routes";

export const AuthVK: FC = () => {

    const [searchParams] = useSearchParams();
    const router = useNavigate();
    const [error, setError] = useState<string>('')
    const [text, setText] = useState<string>('Сохраняем ваши данные')
    const {setIsLoading, setName, setBasket, setPhone, setIsAuth, setRoles} = useUserAcions()
    const {isLoading} = useAppSelector(s => s.UserReducer)
  
    const switchText = () => {
        setText('Еще немного...')
    }

    const getUserData = async (code: string, code_verifier: string, device_id: string, state: string) => {
      try{
        setIsLoading(true)
        const userData = await userService.vk_login(code, code_verifier, device_id, state)
        if(userData){
            setName(userData.name)
            setPhone(userData.phone)
            setRoles(userData.roles)
            setIsAuth(true)
            await SyncBasket(true, userData.basket, setBasket)
        }
        router(`${MY_ROUTE.path}`, {
            replace: true
        })  
    }
      catch(e){
        console.log(e)
        if(e instanceof Error){
          setError(e.message)
        }
      }
      finally{
        setIsLoading(false)
      }
    }
  
    useEffect(() => {
      const code = searchParams.get('code');
      const device_id = searchParams.get('device_id')
      const state = searchParams.get('state')
      const verifier = localStorage.getItem('vk_code_verifier');
  
      if (code && verifier && state && device_id) {
        getUserData(code, verifier, device_id, state) 
        setTimeout(switchText, 3000) 
      }
      else{
        setError('Одного из параметров (code, verifier, state, device_id) нет')
      }
    }, []);

    return (
        <section className={classes.authVK}>
            {
                isLoading
                    &&
                <section className={classes.loaderMain}>
                    <span className={classes.text}>{text}</span><LoaderSpinner />
                </section>
            }
            {
                error
                    &&
                <section className={classes.error}>
                    <h3>Произошла ошибка</h3>
                    {error}
                </section>
            }
            {
                !isLoading && error
                    &&
                <section className={classes.actions}>
                    <section className={classes.action}>
                        <MyButton 
                            sign="На главную"
                            onClick={() => router(HOME_ROUTE.path)}
                        />
                    </section>
                    <section className={classes.action}>
                        <MyButton 
                            sign="Попробовать снова"
                            onClick={() => router(LOGIN_ROUTE.path)}
                        />
                    </section>
                </section>
            }
        </section>
    )
}