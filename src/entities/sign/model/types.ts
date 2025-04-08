

interface ISign{
    type: 'error' | 'message'
    message: string
}

interface ISignInitialState{
    sign: ISign;
    isLoading: boolean;
}