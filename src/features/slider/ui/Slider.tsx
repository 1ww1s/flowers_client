import { FC, useEffect, useRef, useState } from "react";
import classes from './slider.module.scss'



interface IProps {
    min: number;
    max: number;
    valueMax: number;
    valueMin: number;
    setValueMax: (valueMax: number) => void;
    setValueMin: (valueMin: number) => void;
    onBlur: (valMin: number, valMax: number) => void;
}

export const Slider: FC<IProps> = ({min, max, valueMax, valueMin, setValueMax, setValueMin, onBlur}) => {

    const slider = useRef<HTMLDivElement>(null)
    const refThumbMin = useRef<HTMLDivElement>(null)
    const refThumbMax = useRef<HTMLDivElement>(null)
    const refInactiveLeft = useRef<HTMLDivElement>(null)
    const refInactiveRight = useRef<HTMLDivElement>(null)

    const onmousedownMin = (e: MouseEvent) => {
        e.preventDefault()
                
        if(refThumbMin.current){
            const shiftX = e.clientX - refThumbMin.current.getBoundingClientRect().left;
        
            let targetMin = valueMin;

            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp);
            
            function onMouseMove(event: MouseEvent){
                if(slider.current && refThumbMin.current && refInactiveLeft.current && refThumbMax.current){
                    const leftSlider = slider.current.getBoundingClientRect().left
                    let newLeft = event.clientX - shiftX - leftSlider;
                    
                    if(newLeft < 0){
                        newLeft = 0;
                    }
                    
                    let rightEdge = slider.current.offsetWidth - refThumbMin.current.offsetWidth;
                    
                    if(newLeft > rightEdge){
                        newLeft = rightEdge;
                    }

                    let leftThumbMax = refThumbMax.current.getBoundingClientRect().left - leftSlider
                    if(newLeft > leftThumbMax){
                        newLeft = leftThumbMax
                    }

                    const p = Math.round(newLeft) / (slider.current.offsetWidth - refThumbMin.current.offsetWidth);
                    const numb = (min + (max - min) * p)
                    setValueMin(Math.round(numb))
                    targetMin = Math.round(numb)
                }
            }

            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
                onBlur(targetMin, valueMax)
            }
        }
    }

    const onmousedownMax = (e: MouseEvent) => {
        e.preventDefault()
                
        if(refThumbMax.current){
            const shiftX = e.clientX - refThumbMax.current.getBoundingClientRect().left;
            
            document.addEventListener('mousemove', onMouseMove)
            document.addEventListener('mouseup', onMouseUp);
            
            let targetMax = valueMax;

            function onMouseMove(event: MouseEvent){
                if(slider.current && refThumbMax.current && refInactiveRight.current && refThumbMin.current){

                    const leftSlider =  slider.current.getBoundingClientRect().left;
                    let newLeft = event.clientX - shiftX - leftSlider;
                    
                    const leftThumbMin = refThumbMin.current.getBoundingClientRect().left - leftSlider;  

                    if(leftThumbMin > newLeft){
                        newLeft = leftThumbMin;
                    }

                    if(newLeft < 0){
                        newLeft = 0;
                    }
                    
                    let rightEdge = slider.current.offsetWidth - refThumbMax.current.offsetWidth;
                    
                    if(newLeft > rightEdge){
                        newLeft = rightEdge;
                    }

                    const p = Math.round(newLeft) / (slider.current.offsetWidth - refThumbMax.current.offsetWidth);
                    const numb = (min + (max - min) * p)
                    setValueMax(Math.round(numb))
                    targetMax = Math.round(numb)
                }
            }

            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
                onBlur(valueMin, targetMax)
            }
        }
    }

    useEffect(() => {
        if(slider.current && refThumbMax.current && refInactiveRight.current){
            const p = (max - min) / (slider.current.offsetWidth - refThumbMax.current.offsetWidth);
            let r = ((valueMax - min) / p)
            refThumbMax.current.style.left = r / slider.current.offsetWidth * 100 + '%'
            refInactiveRight.current.style.width = 100 - r / (slider.current.offsetWidth - refThumbMax.current.offsetWidth) * 100 + '%'
        }
    }, [valueMax])

    useEffect(() => {
        if(slider.current && refThumbMin.current && refInactiveLeft.current){
            if(valueMin === max){
                refThumbMin.current.style.zIndex = '99';
            }
            else{
                refThumbMin.current.style.zIndex = '1';
            }
            const p = (max - min) / (slider.current.offsetWidth - refThumbMin.current.offsetWidth);
            let r = ((valueMin - min) / p)
            refThumbMin.current.style.left = r / slider.current.offsetWidth * 100 + '%'
            refInactiveLeft.current.style.width =  r / slider.current.offsetWidth * 100 + '%'
        }
    }, [valueMin])

    useEffect(() => {
        if(refThumbMin.current &&  refThumbMax.current && slider.current){

            refThumbMin.current.onmousedown = onmousedownMin;
            refThumbMax.current.onmousedown = onmousedownMax;

            refThumbMin.current.ondragstart = function() {
                return false;
            };
            refThumbMax.current.ondragstart = function() {
                return false;
            };
        }

    }, [valueMin, valueMax])

    

    return (
        <section ref={slider} className={classes.slider}>
            <section ref={refInactiveLeft} className={classes.inactiveLeft}></section>
            <section ref={refInactiveRight} className={classes.inactiveRight}></section>
            <section ref={refThumbMin} className={classes.thumb + " " + classes.min}></section>
            <section ref={refThumbMax} className={classes.thumb + " " + classes.max}></section>
        </section>
    )
}