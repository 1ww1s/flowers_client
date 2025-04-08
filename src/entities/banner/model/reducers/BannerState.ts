import { IBannerInitialState } from "../types";


export const BannerInitialState: IBannerInitialState = {
    banner: {
        title: '',
        sign: '',
        image: '',
        buttonLink: ''
    },
    isLoading: false,
    error: ''
}