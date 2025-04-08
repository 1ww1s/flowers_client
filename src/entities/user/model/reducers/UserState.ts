import { IUserState } from "../types";



export const UserInitialState: IUserState = {
    user: {
        name: '',
        phone: '',
        email: '',
        roles: [],
        isAuth: false,
        favourites: [],
        basket: []
    },
    isLoading: false,
    error: ''
}