import { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { IFilters } from "../../../../features/selectionFilter/model/types";
import { categoryService, IFilterCharacteristic } from "../../../../entities/category";
import classes from './filters.module.scss'
import { SelectionFilters } from "../../../../features/selectionFilter";

interface IProps {

}

export const Filters: FC<IProps> = () => {

    const [characteristics, setCharacterisrtics] = useState<IFilterCharacteristic[]>([]) 
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const params = useParams<{category: string}>()
    const {pathname} = useLocation()

    const getCharacteristics = async () => {
        try{
            setIsLoading(true)
            const data = await categoryService.getFilters(params.category || '')
            setCharacterisrtics(data)
        }
        catch(e){
            if(e instanceof Error && e.name === 'AbortError'){
            }
            else{
                console.log(e)
            }
        }
        finally{
            setIsLoading(false)
        }
    }
    
    useEffect(() => {
        getCharacteristics()
    }, [pathname])

    return (
        <section className={classes.filters}>
            <SelectionFilters 
                needSearch={true}
                characteristics={characteristics}
                isLoading={isLoading}
            />
        </section>
    )
}