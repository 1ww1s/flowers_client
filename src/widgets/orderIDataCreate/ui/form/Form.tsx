import { FC } from "react";
import { MyInput } from "../../../../shared";
import classes from './form.module.scss'
import { useOrderActions } from "../../../../entities/order";

interface IProps {
    name: string;
    setName: (val: string) => void;
    phone: string;
    setPhone: (val: string) => void;
}

export const Form: FC<IProps> = ({phone, setPhone, name, setName}) => {

    const {setError} = useOrderActions()

    return (
        <section className={classes.form}>
            <MyInput
                title="Имя"
                value={name}
                typeInput="text"
                setValue={setName}
                isSimple={false}
                setGlobalError={setError}
            />
            <MyInput 
                title="Телефон"
                value={phone}
                typeInput="tel"
                setValue={setPhone}
                isSimple={false}
                setGlobalError={setError}
            />
        </section>
    )
}