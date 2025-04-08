import { cp } from "fs";
import { ChangeEvent, FC, useEffect, useRef } from "react";
import {IMaskInput} from 'react-imask'

interface IProps {
    value: string;
    setValue: (value: string) => void;
}

export const MyInputTel: FC<IProps> = ({value, setValue}) => {

    const ref = useRef<HTMLInputElement>(null);

    return (
        <section>
            <label>+7</label>
            <IMaskInput 
                mask={"+{7} (000) 000-00-00"}
                value={value}
                unmask={true}
                prepare={(appended, masked) => {
                    if(appended.length === 1) return appended
                    let newVal = appended.replaceAll(' ', '')
                    if(newVal.startsWith('+7')) newVal = newVal.slice(2)
                    if(newVal.startsWith('7') || newVal.startsWith('8')) newVal = newVal.slice(1)
                    return newVal
                  }}
                inputRef={ref}
              
                onAccept={
                    (value, mask) => {setValue(value)}
                }
                placeholder="Телефон"
            />

        </section>
    )
}