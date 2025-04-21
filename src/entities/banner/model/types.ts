


export interface IBanner {
    id?: number;
    image: string;
    title: string;
    sign: string;
    buttonLink: string;
}

export interface IBannerInitialState {
    banner: IBanner;
    isLoading: boolean;
    error: string;
}