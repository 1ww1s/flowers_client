import { FC, useEffect, useState } from "react";
import { ProductChange } from "../../../../features/productDataChange";
import { useSignActions } from "../../../../entities/sign";
import { useUserAcions } from "../../../../entities/user";
import { AuthError } from "../../../../shared";
import { categoryService } from "../../../../entities/category";
import { useProductActions } from "../../../../entities/product";


export const ProductData: FC = () => {

    const [names, setNames] = useState<{id: number, name: string}[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {setSign} = useSignActions()
    const {setIsAuth} = useUserAcions()

    const getCategoryNames = async () => {
        try{
            setIsLoading(true)
            const names = await categoryService.getNames()
            setNames(names)
        }
        catch(e) {
            if(e instanceof Error){
                if(e instanceof AuthError && e.status === 401){
                    setIsAuth(false)
                }
                else {
                    setSign({type: 'error', message: e.message})
                }
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
        getCategoryNames()
    }, [])

    return (
        <section>
            <ProductChange 
                names={names} 
                isLoadingByCategory={isLoading} 
            />
        </section>
    )
}