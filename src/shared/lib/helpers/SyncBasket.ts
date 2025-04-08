import { basketService } from "../../../entities/basket";
import { IUser } from "../../../entities/user";





export const SyncBasket = async (isAuth: boolean, userBasket: IUser['basket'], setBasket: (basket: IUser['basket']) => void) => {
    if(isAuth){
        let localBasket: IUser['basket'] = []
        try{
            localBasket = JSON.parse(localStorage.getItem('basket') || '[]')
        }
        catch(e){
            console.log(e)
        }
        const newProducts = localBasket.filter(localB => !userBasket.find(b => b.id === localB.id))
        if(newProducts.length) {
            const deleteProducts = await basketService.basketAddItems(newProducts)
        }
        const newBasket = [...userBasket, ...newProducts] 
        localStorage.removeItem('basket')
        localStorage.setItem('basket', JSON.stringify(newBasket)) 
        setBasket(newBasket)
    }
    else{
        const newBasket: IUser['basket'] = JSON.parse(localStorage.getItem('basket') || '[]')
        setBasket(newBasket || [])
    }
}