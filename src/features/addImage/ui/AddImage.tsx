import { ChangeEvent, FC, useState } from "react";
import classes from './addImage.module.scss'
import { LoaderSpinner } from "../../../shared";


interface IProps{
    addImage: (image: string) => void;
    disabled?: boolean;
    setGlobalError?: (error: string) => void;
}

export const AddImage: FC<IProps> = (
    {addImage, disabled=false, setGlobalError=()=>{}}
) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setGlobalError('')
        const files = e.target.files;
        if(!files?.length) return
        setIsLoading(true)
        const file = files[0]
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => { 
            setIsLoading(false)
            addImage(fileReader.result as string)
        }
    }

    return (
        <section className={classes.addImageBox}>
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderSpinner /></section>
                    :
                <label className={classes.addImage}>
                    <input 
                        disabled={disabled}
                        type='file' 
                        onChange={(e) => onChange(e)} 
                        accept="image/*"
                    />
                    <svg className={disabled ? classes.disabled : ''} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 16H27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 5V27" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </label>
            }
        </section>
        
    )
}