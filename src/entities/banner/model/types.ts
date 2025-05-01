


export interface IBanner {
    id?: number;
    imageDesctop: string;
    imageMobile: string;
    title: string;
    sign: string;
    buttonLink: string;
}

export interface IBannerInitialState {
    banner: IBanner;
    isLoading: boolean;
    error: string;
}