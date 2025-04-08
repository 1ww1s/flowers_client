import React, { ComponentProps, FC, FocusEvent, HTMLInputTypeAttribute, PropsWithChildren, useEffect, useRef, useState } from "react";
import classes from './myInput.module.scss'
import lockImg from '../../lib/assets/icon/Lock.png'
import lockOpenImg from '../../lib/assets/icon/LockOpen.png'
import { IMaskInput } from "react-imask";

interface IProps {
    value: string;
    setValue: (value: string) => void;
    typeInput: HTMLInputTypeAttribute;
    isEmpty?: boolean;
    placeholder?: string;
    title?: string;
    sign?: string;
    tel?: boolean;
    globalError?: string;
    setGlobalError?: (error: string) => void;
    isSimple?: boolean;
    icon?: React.ReactElement;
    clear?: boolean;
}


export const MyInput: FC<IProps & PropsWithChildren & ComponentProps<"input">> = ({
    value, setValue, placeholder="", sign="", isEmpty = true, title, tel, children, icon, clear = true,
    globalError="", setGlobalError=() => {}, typeInput, isSimple=true, ...props
}) => {

    const placeholderRef = useRef<HTMLLabelElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        if((value.length || value) && !isSimple){
            placeholderRef.current?.classList.remove(classes.active)
        }
    }, [value])

    const onBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
        if(props.onBlur){
            props.onBlur(e)
        }
        if(!value.length && !isSimple) {
            placeholderRef.current?.classList.add(classes.active)
        }
    }

    const onFocus = () => {
        if(!value.length && !isSimple){
            placeholderRef.current?.classList.remove(classes.active)
        }
        setError('')
    }

    const onChange = (value: string) => {
        setValue(value)
        setError('')
        setGlobalError('')
    }

    const isOne = useRef<boolean>(true)
    useEffect(() => {
        if(!isOne.current){
            if(isEmpty && !value.length) 
                setError('Поле не может быть пустым')
        }
        else {
            isOne.current = false
        }
    }, [value])
    
    const viewPassword = () => {
        if(showPassword){
            setShowPassword(false)
        }
        else{
            setShowPassword(true)
        }
        inputRef.current?.blur()
    }

    const onClear = () => {
        setValue('')
    }


    return (
        <section className={classes.myInput}>
            <label ref={placeholderRef}  className={classes.title + ' ' + (isSimple ? classes.simple : classes.active)}>{title}</label>
            <section className={classes.inputBox}>
                {
                    typeInput === 'tel'
                        ?
                    <section className={classes.tel}>
                        <IMaskInput
                            type="tel"
                            className={isSimple ? classes.simple : ''}
                            mask={"+{7} (000) 000-00-00"}
                            value={value}
                            unmask={true}
                            {...props}
                            prepare={(appended, masked) => {
                                if(appended.length === 1) return appended
                                let newVal = appended.replaceAll(' ', '')
                                if(newVal.startsWith('+7')) newVal = newVal.slice(2)
                                if(newVal.startsWith('7') || newVal.startsWith('8')) newVal = newVal.slice(1)
                                return newVal
                            }}
                            placeholder={placeholder}
                            title={title}
                            inputRef={inputRef}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onAccept={
                                (value, mask) => onChange(value)
                            }
                        />
                    </section>
                        :
                    <input 
                        className={(isSimple ? classes.simple : '') + ' ' + ((clear || Boolean(icon)) ? classes.icon : '')}
                        ref={inputRef} 
                        type={typeInput === 'password' ? showPassword ? 'text' : 'password' : typeInput || 'text'}
                        {...props}
                        onFocus={onFocus} 
                        onBlur={onBlur} 
                        title={title}
                        value={value} 
                        placeholder={placeholder}
                        onChange={e => onChange(e.target.value)}
                        data-feature={Boolean(children)} 
                    />
                }
               
                <section className={classes.features + (value.length ? " " + classes.filled : "")}>
                    <section className={classes.icon}>
                        {icon}
                    </section>
                    {
                        clear
                            &&
                        <section onClick={onClear} className={classes.clear}>
                            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25 7L7 25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M25 25L7 7"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </section>
                    }
                    <section className={classes.feature}>
                        {children}
                    </section>
                    {typeInput === "password" 
                        && 
                    <section 
                        className={classes.lock} 
                        onClick={viewPassword} 
                        onMouseDown={e => e.preventDefault()}
                    >
                        <img src={showPassword ? lockOpenImg : lockImg} />
                    </section>}
                </section>
            </section>
            <section 
                className={classes.sign + ' ' + ((Boolean(error) || Boolean(globalError)) ? classes.error : '')}
            >
                {globalError || error || sign}
            </section>
        </section>
    )



}