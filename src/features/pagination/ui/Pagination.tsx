import { FC, useEffect, useRef, useState } from "react";
import classes from './pagination.module.scss'
import { useLocation, useSearchParams } from "react-router-dom";


interface IProps {
    totalPages: number;
}


export const Pagination: FC<IProps> = ({totalPages}) => {

    const [searchParams, setSearchParams] = useSearchParams()
    const {pathname} = useLocation()

    const check = () => {
        let pageParams = searchParams.get('page')
        if(!pageParams){
            pageParams = '1'
        }
        return pageParams
    }

    const [page, setPage] = useState<number>(+check()) 

    useEffect(() => {
        setPage(+check())
    }, [pathname, searchParams])

    const isOne = useRef<boolean>(true)
    useEffect(() => {
        if(isOne.current){
            isOne.current = false;
        }
        else{
            const url = new URLSearchParams(searchParams)
            if(page === 1){
                url.delete('page')
            }
            else{
                url.set('page', `${page}`)
            }
            setSearchParams(url)
        }
    }, [page])

    let pages: number[] = [];
    for(let i = 0; i < totalPages; i++){
        pages.push(i + 1)
    }

    const forward = () => {
        if(page < totalPages){
            setPage(page + 1)
        }
    }

    const back = () => {
        if(page > 1){
            setPage(page - 1)
        }
    }

    const onChoice = (p: number) => {
        setPage(p)
    }


    return(
        totalPages > 1
            ?
        <section className={classes.pagination}>
            <svg onClick={back} className={page === 1 ? classes.border : ''} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 16.25L6.25 10L12.5 3.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            <ul>
                {pages.map(p => 
                    <li 
                        className={p === page ? classes.selected : ''} 
                        key={p}
                        onClick={() => onChoice(p)}
                    >
                        {p}
                    </li>
                )}
            </ul>

            <svg onClick={forward} className={page === totalPages ? classes.border : ''} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 16.25L13.75 10L7.5 3.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

        </section>
            :
        <></>
    )
}