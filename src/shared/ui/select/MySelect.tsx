import { ComponentProps, FC, useState } from "react";
import classes from './mySelect.module.scss'

interface IProps {
    multiple?: boolean;
    setValue?: (value: string) => void;
    setValues?: (values: string[]) => void; 
    value: string | string[];
    defaultValue: string;
    options: {name: string, value: string}[]
    sign?: string;
    setGlobalError?: (error: string) => void;
}

export const MySelect: FC<IProps & ComponentProps<'select'>> = (
    {multiple=false, value, setValue=()=>{}, defaultValue, options, sign="", setGlobalError=()=>{}, setValues=()=>{}, ...props}
) => {

    const [error, setError] = useState<string>('')

    const onChange = (newVal: string) => {
        setGlobalError('')
        setValue(newVal)
    }

    const onChangeValues = (val: HTMLCollectionOf<HTMLOptionElement>) => {
        setGlobalError('')
        const options = [
            ...val,
        ];
        const values = options.map(
            (option) => option.value
        );
        setValues(values)
    }

    const onFocus = () => {
        if(!value.length) setError('')
    }

    const onBlur = () => {
        if(!value.length) setError('Поле не может быть пустым')
    }

    return (
        <section className={classes.selectBox}>
            <select 
                {...props}
                multiple={multiple}
                onBlur={onBlur} 
                onFocus={onFocus} 
                onChange={(e) => {multiple ? onChangeValues(e.target.selectedOptions) : onChange(e.target.value)}} 
                value={value} 
                className={classes.select}
            >
                <option disabled value={""} >{defaultValue}</option>
                {options.map(option => 
                    <option key={option.value} value={option.value}>{option.name}</option>
                )}
            </select>
            <section className={classes.sign + ' ' + (Boolean(error) ? classes.error : '')}>{error || sign}</section>
        </section>
    )
}