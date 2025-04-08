import { FC } from "react";
import logo from '../../lib/assets/images/Logo.png'
import classes from './logo.module.scss'
import { Link } from "react-router-dom";
import { HOME_ROUTE } from "../../../app/router/routes";

interface IProps {
    white?: boolean;
}

export const Logo: FC<IProps> = ({white}) => {

    return (
        <Link to={HOME_ROUTE.path}>
            <figure className={classes.logo + (white ? ' ' + classes.white : '')}>
                <section className={classes.sign}>
                    <span className={classes.title}>flowers</span>
                    <svg className={classes.image} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 25C18 25 21.3125 24.975 25.1125 22.775C28.9125 20.575 30.15 17.8375 30.5375 16.425C30.5732 16.2978 30.583 16.1647 30.5663 16.0336C30.5496 15.9025 30.5067 15.7761 30.4403 15.6618C30.3739 15.5476 30.2852 15.4479 30.1795 15.3685C30.0738 15.2892 29.9532 15.2319 29.825 15.2C28.9125 14.9625 27.3125 14.75 25.2625 15.2375" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6.7375 15.225C4.6875 14.75 3.0875 14.9625 2.175 15.2C2.04676 15.2319 1.92622 15.2892 1.82053 15.3685C1.71484 15.4479 1.62614 15.5476 1.5597 15.6618C1.49326 15.7761 1.45042 15.9025 1.43372 16.0336C1.41703 16.1646 1.42682 16.2978 1.4625 16.425C1.85 17.8375 3.0875 20.5875 6.8875 22.775C10.6875 24.9625 14 25 16 25"  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 25C16 25 21 22.275 21 15C21 9.29999 17.925 6.39999 16.6 5.39999C16.4261 5.27206 16.2159 5.20306 16 5.20306C15.7841 5.20306 15.5739 5.27206 15.4 5.39999C14.075 6.39999 11 9.29999 11 15C11 22.275 16 25 16 25Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M16 25C17.5 24.675 21.5375 22.4 23.9625 18.2C26.3875 14 25.7875 10.6625 25.3125 9.20001C25.2399 8.9648 25.0809 8.76578 24.8676 8.64289C24.6543 8.52001 24.4024 8.48236 24.1625 8.53751C22.7273 8.85894 21.3847 9.50459 20.2375 10.425" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M11.7625 10.425C10.6153 9.50459 9.27272 8.85894 7.8375 8.53751C7.59758 8.48236 7.34569 8.52001 7.13238 8.64289C6.91907 8.76578 6.76014 8.9648 6.6875 9.20001C6.2125 10.6625 5.6125 14.0125 8.0375 18.2C10.4625 22.3875 14.5 24.675 16 25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </section>
                <figcaption>цветочный магазин</figcaption>
            </figure>
        </Link>
    )
}