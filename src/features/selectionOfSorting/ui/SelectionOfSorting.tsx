import { FC, useEffect, useState } from "react";
import classes from './selectionOfSorting.module.scss'
import { TSort } from "../../../widgets/productsByCategory";
import { useLocation, useSearchParams } from "react-router-dom";


interface IProps {
    sort: TSort[];
}

export const SelectionOfSorting: FC<IProps> = ({sort}) => {

    const [searchParams, setSearchParams] = useSearchParams()
    const {pathname} = useLocation()
    const [open, setOpen] = useState<boolean>(false)

    const check = () => {
        let sortParam = searchParams.get('sort')
        let sortTarget = sort.find(s => s.value === sortParam)
        if(!sortTarget){
            return sort[0].value
        }
        return sortTarget.value
    }
    const [selectedSort, setSelectedSort] = useState<string>(check())

    useEffect(() => {
        setSelectedSort(check())
    }, [pathname])

    const openToggle = () => {
        if(open)
            setOpen(false)
        else
            setOpen(true)
    }

    const onSelected = (selected: {name: string, value: string}) => {
        if(!(selected.value === selectedSort)){
            const url = new URLSearchParams(searchParams)
            if(selected.value === sort[0].value){
                url.delete('sort')
            }
            else{
                url.set('sort', selected.value)
            }
            url.delete('page')
            setSearchParams(url)
            setSelectedSort(selected.value)
        }
        setOpen(false)
    }

    return (
        <section className={classes.selectionOfSorting}>
            <section onMouseDown={e => e.preventDefault()} onClick={openToggle} className={classes.selectedSort}>
                {sort.find(s => s.value === selectedSort)?.name}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 16.5L7.5 19.5L4.5 16.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7.5 4.5V19.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.5 7.5L16.5 4.5L19.5 7.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.5 19.5V4.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </section>
            {
                open 
                    &&
                <section className={classes.dropdown}>
                    <ul>
                        {sort.map((s, ind) => 
                            <li onClick={() => onSelected(s)} key={ind} className={selectedSort === s.name ? classes.selected : ''} >
                                {s.name}
                            </li>
                        )}
                    </ul>
                </section>
            }
        </section>
    )
}