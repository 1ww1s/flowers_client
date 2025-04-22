import { FC, useEffect, useRef, useState } from "react";
import classes from './pagination.module.scss'
import { useLocation, useSearchParams } from "react-router-dom";

interface IProps {
    totalPages: number;
}

export const Pagination: FC<IProps> = ({ totalPages }) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const { pathname } = useLocation()

    const check = () => {
        let pageParams = searchParams.get('page')
        if (!pageParams) {
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
        if (isOne.current) {
            isOne.current = false;
        }
        else {
            const url = new URLSearchParams(searchParams)
            if (page === 1) {
                url.delete('page')
            }
            else {
                url.set('page', `${page}`)
            }
            setSearchParams(url)
        }
    }, [page])

    const forward = () => {
        if (page < totalPages) {
            setPage(page + 1)
        }
    }

    const back = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }

    const onChoice = (p: number) => {
        setPage(p)
    }

    const getVisiblePages = () => {
        const visiblePages: (number | string)[] = [];
        const maxVisiblePages = 3; // Максимальное количество видимых номеров страниц
        
        if (totalPages <= maxVisiblePages + 2) {
            // Если страниц немного, показываем все
            for (let i = 1; i <= totalPages; i++) {
                visiblePages.push(i);
            }
        } else {
            // Определяем границы видимых страниц
            let startPage = Math.max(2, page - 1);
            let endPage = Math.min(totalPages - 1, page + 1);
            
            // Если текущая страница близка к началу
            if (page <= 3) {
                endPage = 4;
            }
            
            // Если текущая страница близка к концу
            if (page >= totalPages - 2) {
                startPage = totalPages - 3;
            }
            
            // Всегда добавляем первую страницу
            visiblePages.push(1);
            
            // Добавляем многоточие после первой страницы, если нужно
            if (startPage > 2) {
                visiblePages.push('...');
            }
            
            // Добавляем видимые страницы
            for (let i = startPage; i <= endPage; i++) {
                visiblePages.push(i);
            }
            
            // Добавляем многоточие перед последней страницей, если нужно
            if (endPage < totalPages - 1) {
                visiblePages.push('...');
            }
            
            // Всегда добавляем последнюю страницу
            visiblePages.push(totalPages);
        }
        
        return visiblePages;
    }

    return (
        totalPages > 1
            ?
            <section className={classes.pagination}>
                <svg onClick={back} className={page === 1 ? classes.border : ''} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 16.25L6.25 10L12.5 3.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                <ul>
                    {getVisiblePages().map((p, index) =>
                        p === '...' ? (
                            <li key={`ellipsis-${index}`} className={classes.ellipsis}>...</li>
                        ) : (
                            <li
                                className={p === page ? classes.selected : ''}
                                key={p}
                                onClick={() => onChoice(p as number)}
                            >
                                {p}
                            </li>
                        )
                    )}
                </ul>

                <svg onClick={forward} className={page === totalPages ? classes.border : ''} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.5 16.25L13.75 10L7.5 3.75" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </section>
            :
            <></>
    )
}