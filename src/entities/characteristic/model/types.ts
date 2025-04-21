


export interface ICharacteristic {
    id?: number;
    name: string;
    slug?: string;
}


export interface ICharacteristicInitialState {
    characteristic: ICharacteristic;
    isLoading: boolean;
    error: string;
}