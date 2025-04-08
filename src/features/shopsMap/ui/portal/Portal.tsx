import React, {FC, PropsWithChildren, useEffect} from 'react';
import {createPortal} from 'react-dom';

interface IProps{
    elementId: string;
}

export const Portal: FC<IProps & PropsWithChildren> =
    ( { children, elementId } ) => {
        // находим искомый HTML по id
        const mount = document.getElementById(elementId)
        // создаём свой div
        const el = document.createElement('section')

        useEffect(() => {
            // добавляем свой див к искомому элементу
            if (mount) mount.appendChild(el)
            return () => {
                // удаляем элемент от искомого при завершении компоненты
                if (mount) mount.removeChild(el)
            }
        }, [ el, mount ])
       
        // отменяем отрисовку при отсутствии искомого элемента
        if (!mount) return null
        // собственно, пририсовываем React-элемент в div к искомому HTML
        return createPortal(children, el)
    }