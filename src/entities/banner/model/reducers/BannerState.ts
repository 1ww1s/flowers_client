import { IBannerInitialState } from "../types";


export const BannerInitialState: IBannerInitialState = {
    banner: {
        title: '',
        sign: '',
        imageDesctop: '',
        imageMobile: '',
        buttonLink: ''
    },
    isLoading: false,
    error: ''
}