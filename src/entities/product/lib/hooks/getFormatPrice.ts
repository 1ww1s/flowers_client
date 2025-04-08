



export const getFormatPrice = (price: string) => {
    const normFormat = (+price > 0) ? (price.split('').map((p, i) => (((price.length - i) % 3 === 0) ? (' ' + p) : p)).join('')) : ''
    return normFormat
}