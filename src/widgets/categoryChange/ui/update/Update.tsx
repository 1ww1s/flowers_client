import { FC, useEffect, useState } from "react";
import classes from './update.module.scss'
import { Change } from "../change/Change";
import { Stages, LoaderSpinner, AuthError } from "../../../../shared";
import { useSignActions } from "../../../../entities/sign";
import { categoryService, useCategoryActions } from "../../../../entities/category";
import { useUserAcions } from "../../../../entities/user";
import { CategorySearchAndSelect } from "../../../../features/categorySearchAndSelect";

interface IProps {
    setOpen: (open: boolean) => void;
}

export const Update: FC<IProps> = ({setOpen}) => {

    
    const [selected, setSelected] = useState<string>('')
    const {setSign} = useSignActions()
    const [stage, setStage] = useState<number>(1)
    const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(false)
    const {setCategory, setError} = useCategoryActions()
    const {setIsAuth} = useUserAcions()

    const getCategory = async () => {
        try{
            setIsLoadingCategory(true)
            const category = await categoryService.get(selected)
            setCategory(category)
            setStage(2)
        }
        catch(e){
            if(e instanceof Error){
                if(e instanceof AuthError && e.status === 401){
                    setIsAuth(false)
                }
                else if(e instanceof AuthError && e.status === 403) {
                    setSign({type: 'error', message: e.message})
                }
                else{
                    setError(e.message)
                }
            }
            else{
                console.log(e)
            }
        }
        finally{
            setIsLoadingCategory(false)
        }
    }

    useEffect(() => {
        if(selected){
            getCategory()
        }
    }, [selected])

    return (
        <section className={classes.update}>
            <Stages setStage={setStage} stage={stage}>
                <section className={classes.content}>
                    <h2>Обновить категорию</h2>
                    { stage === 1 && !isLoadingCategory && <CategorySearchAndSelect setSelected={setSelected} /> } {/* Переимновать продукт селект также */}
                    { stage === 1 && isLoadingCategory && <section className={classes.loader}><LoaderSpinner /></section> }
                    { stage === 2 && <Change setOpen={setOpen} /> } 
                </section>
            </Stages>
        </section>
    )
}