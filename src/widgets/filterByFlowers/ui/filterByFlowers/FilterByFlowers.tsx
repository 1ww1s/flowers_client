import { FC, useEffect, useState } from "react";
import classes from './filterByFlowers.module.scss'
import { useLocation, useParams } from "react-router-dom";
import { IFilterCharacteristic } from "../../../../entities/category";
import { itemService } from "../../../../entities/Item";
import { SelectionFilters } from "../../../../features/selectionFilter";

export const FilterByFlowers: FC = () => {

    const [characteristics, setCharacterisrtics] = useState<IFilterCharacteristic[]>([]) 
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const params = useParams<{category: string}>()
    const {pathname} = useLocation()

    const getCharacteristics = async () => {
        try{
            setIsLoading(true)
            const data: IFilterCharacteristic = await itemService.getAllByCategory(params.category || "")
            setCharacterisrtics([data])
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
        <section className={classes.filterByFlowers}>
            <SelectionFilters
                needSearch={true}
                characteristics={characteristics}
                isLoading={isLoading}
            />
        </section>
    )
}