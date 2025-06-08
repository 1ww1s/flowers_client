import { FC, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { SelectionFilters } from "../../../features/selectionFilter";
import { IFilterCharacteristic } from "../../../entities/category";
import { shopService } from "../../../entities/shop";

export const FilterByShops: FC = () => {

    const [characteristics, setCharacterisrtics] = useState<IFilterCharacteristic[]>([]) 
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const params = useParams<{category: string}>()
    const {pathname} = useLocation()

    const getCharacteristics = async () => {
        try{
            setIsLoading(true)
            const data: IFilterCharacteristic = await shopService.getAllByCategory(params.category || "")
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
        <SelectionFilters
            characteristics={characteristics}
            isLoading={isLoading}
        />
    )
}