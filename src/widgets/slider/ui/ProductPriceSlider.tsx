import { FC, useEffect, useRef, useState } from "react";
import classes from './productPriceSlider.module.scss'
import { Slider } from "../../../features/slider";
import { ChangeProductPrices } from "../../../features/changeProductPrices";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { categoryService } from "../../../entities/category";
import { LoaderDiv } from "../../../shared";


export const ProductPriceSlider: FC = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const [error, setError] = useState<string>('')

    const [max, setMax] = useState<number>(0)
    const [min, setMin] = useState<number>(0)

    const [currentMax, setCurrentMax] = useState<number>(max) 
    const [currentMin, setCurrentMin] = useState<number>(min) 

    const [valueMin, setValueMin] = useState<number>(currentMin)
    const [valueMax, setValueMax] = useState<number>(currentMax)

    const [isLoading, setIsLoading] = useState<boolean>(true) 
    const {pathname} = useLocation()
    const params = useParams<{category: string}>()

    useEffect(() => {
        setValueMin(currentMin)
        setValueMax(currentMax)
    }, [currentMin, currentMax])

    const onBlur = (valMin: number, valMax: number) => {
        setCurrentMin(valMin)
        setCurrentMax(valMax)
    }

    const getParams = () => {
        const priceParam = searchParams.get('price')
        let price: number[] = []
        if(priceParam){
            price = priceParam.split('-').map(p => +p)
        }
        return price
    }

    const check = (priceMin: number, priceMax: number, min: number, max: number) => {
        if(priceMax > max){
            priceMax = max
        }
        if(priceMax < min){
            priceMax = min
        }
        if(priceMin < min){
            priceMin = min
        }
        if(priceMin > max){
            priceMin = max
        }
        if(priceMin > priceMax){
            priceMin = priceMax
        }
        return [priceMin, priceMax]
    }

    const getPrices = async () => {
        try{
            setIsLoading(true)
            const prices = await categoryService.getPrices(params.category || '')
            // await new Promise(resolve => setTimeout(resolve, 3000))
            const pricesParams = getParams()
            setMax(prices.max)
            setMin(prices.min)
            if(pricesParams.length === 2){
                const pricesCheck = check(pricesParams[0], pricesParams[1], prices.min, prices.max)
                setValueMin(pricesCheck[0])
                setValueMax(pricesCheck[1])
                const url = new URLSearchParams(searchParams)
                url.set('price', `${pricesCheck[0]}-${pricesCheck[1]}`)
                setSearchParams(url)
            }
            else{
                setValueMax(prices.max)
                setValueMin(prices.min)
            }
        }
        catch(e){
            if(e instanceof Error) setError(e.message)
            console.log(e)
        }
        finally{
            setIsLoading(false)
        }
    }
        
    useEffect(() => {
        getPrices()
    }, [pathname])

    const isOne = useRef<boolean>(true)
    useEffect(() => {
        if(isOne.current){
            isOne.current = false;
        }
        else{
            const url = new URLSearchParams(searchParams)
            if(currentMin === min && currentMax === max){
                url.delete('price')
            }
            else{
                url.set('price', `${currentMin}-${currentMax}`)
            }
            url.delete('page')
            setSearchParams(url)
        }
    }, [currentMax, currentMin])

    return (
        min===max && min === 0
            ?
        <></>
            :
        <section className={classes.productPriceSlider}>
            <h3>
                Цена
            </h3>
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderDiv /></section>
                    :
                <>
                    <ChangeProductPrices 
                        min={min}
                        max={max}
                        valueMax={valueMax}
                        valueMin={valueMin}
                        onBlur={onBlur}
                    />
                    <Slider 
                        min={min}
                        max={max}
                        valueMax={valueMax}
                        valueMin={valueMin}
                        setValueMax={setValueMax}
                        setValueMin={setValueMin}
                        onBlur={onBlur}
                    />
                    {error && <p>{error}</p>}
                </>
            }
        </section>
    )
}