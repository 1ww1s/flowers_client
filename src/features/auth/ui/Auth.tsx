import { FC, useEffect, useState } from "react";
import classes from './auth.module.scss'
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, MY_MAIN_ROUTE, MY_ROUTE, REGISTRATION_ROUTE } from "../../../app/router/routes";
import { IUser, userService, useUserAcions } from "../../../entities/user";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/store/store";
import { MyButton, MyInput, SyncBasket } from "../../../shared";

interface IProps {
    title: string;
    isLogin: boolean;
}

export const Auth: FC<IProps> = ({title, isLogin}) => {
    const router = useNavigate()
    const {user} = useAppSelector(s => s.UserReducer)
    const {setRoles, setIsAuth, setName, setPhone, setBasket} = useUserAcions()
    const {pathname} = useLocation()

    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    useEffect(() => {   
        setError('')
    }, [pathname])

    const check = () => {
        if(!isLogin && !user.name.length){
            setError('Заполните имя')
            return false
        }
        if(user.phone.length < 11){
            setError('Незаполненный номер телефона')
            return false
        }
        if(!password.length){
            setError('Незаполненный пароль')
            return false
        }
        return true
    }

    const onAuth = async () => {
        try{
            const isOk = check()
            if(isOk){
                setIsLoading(true)
                let userRes: IUser | null = null;
                if(isLogin){
                    userRes = await userService.login(user.phone, password) 
                }
                else {
                    userRes = await userService.registration(user.name, user.phone, password)
                }
                if(userRes){
                    setName(userRes.name)
                    setPhone(userRes.phone)
                    setRoles(userRes.roles)
                    setIsAuth(true)
                    await SyncBasket(true, userRes.basket, setBasket)
                }
                router(`${MY_ROUTE.path}`, {
                    replace: true
                })
            }
        }
        catch(e){
            if(e instanceof Error) 
                setError(e.message)
        }
        finally{
            setIsLoading(false)
        }
    }

    return (
        <form autoComplete="off" onSubmit={(e) => {e.preventDefault(); onAuth()}} className={classes.auth}>
            <span className={classes.title}>{title}</span>
            {
                !isLogin
                    &&
                <MyInput 
                    name="name"
                    typeInput="text"
                    autoComplete='given-name'
                    value={user.name}
                    setValue={setName}
                    placeholder="Имя"
                    setGlobalError={setError}
                    sign="*как к вам обращаться"
                    style={{height: 44}}
                />
            }
            <MyInput 
                typeInput="tel" 
                name="tel"
                autoComplete='tel'
                value={user.phone} 
                setValue={setPhone} 
                placeholder="Телефон" 
                setGlobalError={setError}
                style={{height: 44}}
            />
            <MyInput 
                typeInput="password" 
                name="password"
                autoComplete='off'
                value={password} 
                setValue={setPassword} 
                placeholder="Пароль" 
                setGlobalError={setError}
                style={{height: 44}}
            />
            <section className={classes.buttonWrapper}>
                <MyButton 
                    error={error} 
                    width={260} 
                    isLoading={isLoading} 
                    onClick={onAuth} 
                    sign={isLogin ? "Войти" : "Зарегистрироваться"} 
                />
            </section>
            <section className={classes.change}>
                <Link to={`${process.env.REACT_APP_CLIENT_URL}${isLogin ? REGISTRATION_ROUTE.path : LOGIN_ROUTE.path }`}>
                    {isLogin ? "У меня ещё нет аккаунта" : "Войти"}
                </Link>
            </section>
        </form>
    )
}