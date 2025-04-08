import { FC, useEffect, useState } from "react";
import { LoaderSpinner, MyModal } from "../../../shared";
import { SelectedShowShops } from "../../../features/selectedShowShops";
import classes from './choiceShop.module.scss'
import { AvailableAndUnavailableProducts, IProductCountShop, productService } from "../../../entities/product";
import { IShop, IShopData, ShopData, ShopList } from "../../../entities/shop";
import { useAppSelector } from "../../../app/store/store";
import { YMaps } from "@pbe/react-yandex-maps";
import { ShopsMap } from "../../../features/shopsMap";
import { ShopChoose } from "../../../features/shopChoose";
import { useOrderActions } from "../../../entities/order";

interface IProps {
    isLoadingShops: boolean;
    shops: IShop[];
    setAvailableProductsCountsShop: (shops: IProductCountShop[]) => void;
    setUnavailableProductsCountsShop: (shops: IProductCountShop[]) => void;
    selectedShop: IShopData;
    setSelectedShop: (selectedShop: IShopData) => void;
}

export const ChoiceShop: FC<IProps> = ({
    isLoadingShops, shops, setAvailableProductsCountsShop, setUnavailableProductsCountsShop, selectedShop, setSelectedShop
}) => {
    
    const [open, setOpen] = useState<boolean>(false)
    const [selectedList, setSelectedList] = useState<boolean>(false)
    const {user} = useAppSelector(s => s.UserReducer)
    const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false)
    const {orderCreate} = useAppSelector(s => s.OrderReducer)
    const {setError} = useOrderActions()
    const [products, setProducts] = useState<IProductCountShop[]>([])
    const [unproducts, setUnproducts] = useState<IProductCountShop[]>([])

    const productsInTheShop = async () => {
        try{
            setIsLoadingProducts(true)
            if(selectedShop?.id){
                const data = await productService.getInTheShop(user.basket.map(b => b.id), selectedShop.id)
                // await new Promise(resolve => setTimeout(resolve, 3000))
                const available: IProductCountShop[] = [];
                const unavailable: IProductCountShop[] = [];
                for (let p of data){
                    const b = user.basket.find(b => b.id === p.productId)
                    let count = 0;
                    if(b){
                        count = b.count;
                    }
                    if(p.productCountMax === 0){
                        unavailable.push({...p, count: count - p.productCountMax})
                        continue 
                    }
                    if(count > p.productCountMax){
                        available.push({...p, count: p.productCountMax})
                        unavailable.push({...p, count: count - p.productCountMax})
                    }
                    else{
                        available.push({...p, count})
                    }
                }
                setProducts(available)
                setUnproducts(unavailable)
            }
        }
        catch(e){
            console.log(e)
        }
        finally{
            setIsLoadingProducts(false)
        }
    }

    useEffect(() => {
        if(selectedShop){
            setError('')
            productsInTheShop()
        }
    }, [selectedShop])

    const onSelected = () => {
        setOpen(false)
        setAvailableProductsCountsShop(products)
        setUnavailableProductsCountsShop(unproducts)
    }
    
    return (
        <MyModal
            title={orderCreate.shop.title ? 'Изменить магазин' : 'Выбрать магазин'}
            open={open}
            setOpen={setOpen}  
        >
            <section className={classes.content}>
                <section className={classes.selectedList}>
                    <SelectedShowShops selectedList={selectedList} setSelectedList={setSelectedList} />
                </section>
                <section className={classes.wrapChoice}>
                    {isLoadingProducts ? <section className={classes.loaderProducts}><LoaderSpinner /></section> : <></>}
                    <section className={classes.choice}>
                    {
                        isLoadingShops
                            ?
                        <section className={classes.loader}><LoaderSpinner /></section>
                            :
                        selectedList
                            ?
                        <section className={classes.list}>
                            <ShopList shops={shops} choice={{selectedShop, setSelectedShop}} />
                        </section>    
                            :
                        <YMaps query={{apikey: '5232156a-499a-4991-94f5-87306751113a'}}>
                            <ShopsMap shops={shops} choice={{selectedShop, setSelectedShop}} />
                        </YMaps>
                    }
                    </section>
                    <section className={classes.shopProducts}>
                    {
                        selectedShop.title
                            ?
                        <section className={classes.data}>
                            <ShopData shop={selectedShop} /> 
                            <AvailableAndUnavailableProducts products={products} />
                            <AvailableAndUnavailableProducts available={false} products={unproducts} />
                            <ShopChoose 
                                onClick={onSelected} 
                                shop={selectedShop} 
                            />
                        </section>
                            :
                        <h3 className={classes.notSelected}>Выберите магазин</h3>
                    }
                    </section>
                </section>
            </section>
        </MyModal>
    )
}