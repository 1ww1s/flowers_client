export interface IUserState {
    user: IUser;
    isLoading: boolean;
    error: string
}

export interface IUser {
    name: string;
    email: string;
    phone: string;
    isAuth: boolean;
    basket: {id: number, count: number}[]
    favourites: string[]
    roles: string[]
}
