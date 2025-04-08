import { FC, useEffect, useRef, useState } from "react";
import classes from './autocomplete.module.scss'
import { MyInput } from "../input/MyInput";
import arrayDowm from '../../lib/assets/icon/ArrowDown.png'
import arrayUp from '../../lib/assets/icon/ArrowUp.png'
import { LoaderSpinner } from "../loaderSpinner/LoaderSpinner";
import { useLocation } from "react-router-dom";



interface IProps {
    title: string;
    sign: string;
    value: string;
    setValue: (value: string) => void;
    values: string[]
    isLoading: boolean;
    globalError?: string;
    setGlobalError?: (globalError: string) => void;
    disabled?: boolean;
    setSelectedValue?: (select: string) => void;
}   

export const Autocomplete: FC<IProps> = (
    {value, setValue, values, isLoading, title, sign, globalError="", setGlobalError=() => {}, setSelectedValue=()=>{}}
) => {
    
    const [dataValue, setDataValue] = useState<string[]>(values)
    const [selected, setSelected] = useState<boolean>(false)    
    const [open, setOpen] = useState<boolean>(false)
    const inputTargetRef = useRef<HTMLInputElement>(null)

    const isOne = useRef<boolean>(true)
    useEffect(() => {
        if(!isOne.current){
            setDataValue(values)
        }
        else{
            isOne.current = false
        }
    }, [values])

    const onChange = (value: string) => {
        changeData(value)
        setSelected(false)
        setSelectedValue("")
        inputTargetRef.current!.style.backgroundColor=''
        setOpen(true)
    }   

    const changeData = (newValue: string) => {
        setValue(newValue)
    }

    const onSelected = (value: string) => {
        setSelected(true)
        setSelectedValue(value)
        inputTargetRef.current!.style.backgroundColor='var(--light-blue)'
        setOpen(false)
        changeData(value)
        setGlobalError('')
        setDataValue([""])
    } 

    const toggleDropdown = () => {
        if(!isLoading && !selected){
            if(open){
                setOpen(false)
            }
            else{
                setOpen(true)
                
            }
        }
    }

    const isOne2 = useRef<boolean>(true)
    useEffect(() => {
        if(isOne2.current && value){
            onSelected(value)
        }
        if(!isOne2.current){
            if(!value.length){
                setOpen(false) // было true
                inputTargetRef.current!.style.backgroundColor=''
            }
        }
        else{
            isOne2.current = false
        }

    }, [value])

    return (
        <section className={classes.autocomplete}>
            <section className={classes.inputBox}>
                <MyInput  
                    ref={inputTargetRef}
                    value={value}
                    setValue={onChange}
                    isSimple={false}
                    title={title}
                    sign={sign}
                    typeInput="text"
                    globalError={globalError}
                    setGlobalError={setGlobalError}
                >
                    <img className={classes.openDropdown} src={open ? arrayUp : arrayDowm} onClick={toggleDropdown} />
                </MyInput>
            </section>
            {open   
                &&
            <ul className={classes.dropdown}>
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                !selected && !dataValue.length
                    ?
                <span>Ничего не найдено</span>
                    :
                dataValue.map(value => 
                    <li onClick={() => onSelected(value)} key={value}>
                        {value}
                    </li>
                )
            }
            </ul>
            }
        </section>
    )
}