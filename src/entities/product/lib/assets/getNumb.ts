
export const getNumb = (count: number[]) => {
    let numb = 0;
    for (let p of count){
        numb += p
    }
    return numb
}