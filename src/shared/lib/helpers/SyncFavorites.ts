

export const SyncFavourites = (setFavourites: (favourites: string[]) => void) => {
    const newBasket: string[] = JSON.parse(localStorage.getItem('favourites') || '[]')
    setFavourites(newBasket || [])
}