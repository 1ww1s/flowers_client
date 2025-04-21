import { FC, useEffect, useRef, useState } from "react";
import classes from './form.module.scss'
import { useAppSelector } from "../../../../app/store/store";
import { DeliveryPrice, isPointInPolygon, IZone, useOrderActions } from "../../../../entities/order";
import { DropDownList, MyInput, MyTextarea } from "../../../../shared";
import { useYMaps } from "@pbe/react-yandex-maps";
import { ISuggestion } from "../../model/types";


interface IProps {
    zones: IZone[];
}

export const FormReceivingMethod: FC<IProps> = ({zones}) => {

    const {orderCreate} = useAppSelector(s => s.OrderReducer)
    const {setApartment, setEntrance, setFloor, setStreet, setDeliveryMessage, setError, setDeliveryPrice} = useOrderActions()

    const [streetVal, setStreetVal] = useState<string>(orderCreate.address.street.value)
    const [suggestions, setSuggestions] = useState<ISuggestion[]>([])
    const [streetError, setStreetError] = useState<string>('')
    const [PriceError, setPriceError] = useState<string>('Выберите улицу и дом')

    const cityBounds = [
        [56.795482, 35.705539], 
        [56.944472, 35.973998], 
      ];
    const ymaps = useYMaps(['geocode'])

    const handleAddressChange = async (value: string) => {
        setStreetVal(value)
        setStreet({value: '', coords: [0, 0]})
        setError('')
        if (ymaps && value.length > 2) {
            const query = `${value}, Тверь`;
      
            ymaps.geocode(query, {
                boundedBy: cityBounds,
                strictBounds: true,
            })
            .then((res: any) => {
                const geoObjects = res.geoObjects.toArray();
                console.log(geoObjects)
                const suggestions: ISuggestion[] = geoObjects.map((geoObject: any) => {
                    const res: ISuggestion = {
                        value: geoObject.getAddressLine() as string,
                        coords: geoObject.geometry.getCoordinates() as [number, number]
                    }
                    return res
                });
                setSuggestions(suggestions.filter(s => {
                    let isOk = false;
                    for (let val of value.split(/[, .]+/)){
                        if (s.value.toLocaleLowerCase().includes(val.toLocaleLowerCase())){
                            isOk = true;
                            break
                        }
                    }
                    return isOk
                }))
            }).catch((error: any) => {
                console.error('Ошибка при геокодировании:', error);
                setSuggestions([])
            });
        } 
        else{
            if(value.length === 0) setStreet({value: '', coords: [0, 0]})
            setSuggestions([])
        }
    }
    
    const chooseStreet = (address: ISuggestion) => {
        setSuggestions([])
        setStreetVal(address.value)
        setStreetError('')
        setStreet(address)
    }
    
    const StreetEmpty = () => {
        if(!orderCreate.address.street.value){
            setStreetError('Выберите адрес из выпадающего списка')
        }
    }

    useEffect(() => {
        if(orderCreate.address.street.value){
            const MIN = 10000;
            let minPrice = MIN;
            for(let polygon of zones){
                const inside = isPointInPolygon(orderCreate.address.street.coords, polygon.coords)
                if(inside && minPrice > polygon.price){
                    minPrice = polygon.price;
                }
            }
            if(MIN === minPrice){
                setPriceError('Нет доставки по указанному адресу')
                setDeliveryPrice(0)
            }
            else{
                setPriceError('')
                setDeliveryPrice(minPrice)
            }
        }
    }, [orderCreate.address.street])

    return (
        <section className={classes.form}>
            <DeliveryPrice price={orderCreate.address.price} error={PriceError} />
            <section onBlur={StreetEmpty} className={classes.address}>
                <MyInput 
                    value={streetVal}
                    setValue={handleAddressChange}
                    typeInput="text"
                    title="Улица, дом"
                    sign="Начните вводить адрес и выберите из списка"
                    isSimple={false}
                    globalError={streetError}
                    setGlobalError={setStreetError}
                />
                <DropDownList 
                    list={suggestions} 
                    onClick={chooseStreet} 
                    onMouseDown={e => e.preventDefault()} 
                />
            </section>
            <section className={classes.details}>
                <section className={classes.input}>
                    <MyInput 
                        value={orderCreate.address.apartment}
                        setValue={setApartment}
                        typeInput="text"
                        title="Квартира/офис"
                        isSimple={false}
                    />
                </section>
                <section className={classes.input}>
                    <MyInput 
                        value={orderCreate.address.entrance}
                        setValue={setEntrance}
                        typeInput="text"
                        title="Подъезд"
                        isSimple={false}
                    />
                </section>
                <section className={classes.input}>
                    <MyInput 
                        value={orderCreate.address.floor}
                        setValue={setFloor}
                        typeInput="text"
                        title="Этаж"
                        isSimple={false}
                    />
                </section>
            </section>
            <section className={classes.message}>
                <p>Сообщение</p>
                <MyTextarea 
                    sign="Сообщение курьеру, если нужно"
                    value={orderCreate.address.message}
                    setValue={setDeliveryMessage}
                />
            </section>
        </section>
    )
}