import { FC, useEffect, useState } from "react";
import { SelectionFilter } from "../selection/SelectionFilter";
import classes from './filters.module.scss'
import { LoaderDiv } from "../../../../shared";
import { IFilters } from "../../model/types";
import { IFilterCharacteristic } from "../../../../entities/category";
import { useLocation, useSearchParams } from "react-router-dom";


interface IProps {
    needSearch?: boolean;
    isLoading: boolean;
    characteristics: IFilterCharacteristic[]
}


export const SelectionFilters: FC<IProps> = ({needSearch, isLoading, characteristics}) => {

    const [searchParams, setSearchParams] = useSearchParams()
    const {pathname} = useLocation()
    const check = () => {
        let sc: {characteristicName: string, values: string[]}[] = []
        for(let param of searchParams.entries()){
            if(param[0] === 'page'){
                continue
            }
            if(param[0] === 'sort'){
                continue
            }
            if(param[0] === 'price'){
                continue
            }
            sc.push({characteristicName: param[0], values: param[1].split(',')})
        }
        return sc
    }

    const [selectedCharacteristics, setSelectedCharacteristics] = useState<IFilters['characteristics']>(check())

    useEffect(() => {
        setSelectedCharacteristics(check())
    }, [pathname])

    const setCharacterisrticValue = (characteristicSlug: string, slug: string) => {
            const url = new URLSearchParams(searchParams)
            const targetChs: IFilters['characteristics'] = JSON.parse(JSON.stringify(selectedCharacteristics))
            let targetCharacteristics = targetChs.find(ch => ch.characteristicName === characteristicSlug)
            if(!targetCharacteristics){
                targetCharacteristics = {characteristicName: characteristicSlug, values: [slug]}
                targetChs.push(targetCharacteristics)
                url.set(`${characteristicSlug}`, slug)
            }
            else{
                const ind = targetCharacteristics.values.findIndex(v => v === slug)
                if(ind === -1){
                    targetCharacteristics.values.push(slug)
                }
                else{
                    targetCharacteristics.values.splice(ind, 1)
                }
                if(targetCharacteristics.values.length === 0){
                    url.delete(`${characteristicSlug}`)
                }   
                else{
                    url.set(`${characteristicSlug}`, targetCharacteristics.values.join(','))
                }
            }
            url.delete('page')
            setSearchParams(url)
            setSelectedCharacteristics([...targetChs])
        }
    

    return (
        <section className={classes.selectionFilters}>
            {
                isLoading
                    ?
                <section className={classes.loader}><LoaderDiv /></section>
                    :
                characteristics.map((ch, ind) =>
                    ch.values.length > 0
                        &&
                    <section key={ind} className={classes.filter}>
                        <h3>
                            {ch.characteristicName}
                        </h3>
                        <SelectionFilter
                            needSearch={needSearch}
                            characteristicName={ch.characteristicSlug}
                            characteristicValues={selectedCharacteristics.find(c => c.characteristicName === ch.characteristicSlug)?.values || []} 
                            setCharacteristicValues={setCharacterisrticValue} 
                            values={ch.values} 
                        />
                    </section>
                )
            }
        </section>
    )
}