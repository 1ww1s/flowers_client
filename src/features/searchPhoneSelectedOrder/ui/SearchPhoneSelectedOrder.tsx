import { FC, useEffect, useState } from "react";
import { MyButton, MyInput } from "../../../shared";
import classes from './searchPhoneSelectedOrder.module.scss'

interface IProps {
    setSearchPhoneSelected: (searchPhoneSelected: string) => void;
}

export const SearchPhoneSelectedOrder: FC<IProps> = ({setSearchPhoneSelected}) => {

    const [searchPhone, setSearchPhone] = useState<string>('')

    const [error, setError] = useState<string>('')

    const selected = () => {
        checkFullPhone()
    }

    const changeValue = (val: string) => {
        setError('')
        setSearchPhoneSelected('')
        setSearchPhone(val)
    }

    const checkFullPhone = () => {
        if(searchPhone.length !== 11){
            setError('Незаполненный телефон')
        }
        else{
            setSearchPhoneSelected(searchPhone)
            setError('')
        }
    }

    return (
        <section className={classes.searchPhoneSelectedOrder}>
            <MyInput 
                typeInput="tel"
                title="Телефон"
                value={searchPhone}
                setValue={changeValue}
                isSimple={false}
                isEmpty={false}
            />
            <section className={classes.button}>
                <MyButton  
                    sign="Найти"
                    onClick={selected}
                    error={error}
                />
            </section>
        </section>
    )
}