import { FC, useEffect, useState } from "react";
import classes from './selectionFilter.module.scss'
import { IFilters } from "../../model/types";
import { IFilterCharacteristic } from "../../../../entities/category";

import { MyInput } from "../../../../shared";

interface IProps {
    needSearch?: boolean;
    values: IFilterCharacteristic['values'];
    characteristicName: string;
    characteristicValues: IFilters['characteristics'][0]['values'];
    setCharacteristicValues: (characteristicSlug: string, characteristic: string) => void;
}

export const SelectionFilter: FC<IProps> = ({needSearch, values, characteristicName, setCharacteristicValues, characteristicValues}) => {

    const [search, setSearch] = useState<string>('')
    const [searchedValues, setSearchedValues] = useState<IFilterCharacteristic['values']>(values)

    useEffect(() => {
        const svs = values.filter(v => v.name.toLocaleLowerCase().startsWith(search.toLowerCase()))
        setSearchedValues(svs)        
    }, [search])

    return (
        <section className={classes.selectionFilter}>
            {
                needSearch
                    &&
                <section className={classes.search}>
                    <MyInput 
                        typeInput='text'
                        value={search}
                        setValue={setSearch}
                        isEmpty={false}
                        icon={
                            <svg className={classes.glass} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.25 12.5C10.1495 12.5 12.5 10.1495 12.5 7.25C12.5 4.35051 10.1495 2 7.25 2C4.35051 2 2 4.35051 2 7.25C2 10.1495 4.35051 12.5 7.25 12.5Z" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M10.9625 10.9625L14 14" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        }
                    />
                </section>
            }
            <ul>
                {searchedValues.map((v, ind) => 
                    <li key={ind}>
                        <label onClick={() => setCharacteristicValues(characteristicName, v.slug)} className={characteristicValues.find(cv => cv === v.slug) ? classes.selected : ""} >
                            <section className={classes.checkbox}>
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 7L9.42857 17L6 13" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </section>
                            <span className={classes.name}>{v.name}</span>
                            <span className={classes.count}>{v.count}</span>
                        </label>
                    </li>
                )}
            </ul>
        </section>
    )
}