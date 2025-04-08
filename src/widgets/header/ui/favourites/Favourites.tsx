import { FC } from "react";
import { useAppSelector } from "../../../../app/store/store";
import classes from '../userInfo.module.scss'
import { Link, useLocation } from "react-router-dom";
import { FAVOURITES_ROUTE, MY_FAVOURITES_ROUTE } from "../../../../app/router/routes";
import { IUser } from "../../../../entities/user";
import { NumbItems } from "../../../../shared/ui/numbItems/NumbItems";

interface IProps {
    user: IUser;
}

export const Favourites: FC<IProps> = ({user}) => {

    const {pathname, search} = useLocation()

    return (
        <Link to={user.isAuth ? MY_FAVOURITES_ROUTE.path : FAVOURITES_ROUTE.path} state={pathname+search}>
            <figure className={classes.info}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 20.25C12 20.25 2.625 15 2.625 8.625C2.625 7.49802 3.01546 6.40585 3.72996 5.5343C4.44445 4.66276 5.43884 4.06569 6.54393 3.84467C7.64903 3.62365 8.79657 3.79234 9.79131 4.32203C10.7861 4.85173 11.5665 5.70971 12 6.75C12.4335 5.70971 13.2139 4.85173 14.2087 4.32203C15.2034 3.79234 16.351 3.62365 17.4561 3.84467C18.5612 4.06569 19.5555 4.66276 20.27 5.5343C20.9845 6.40585 21.375 7.49802 21.375 8.625C21.375 15 12 20.25 12 20.25Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <figcaption className={classes.numb}> 
                    <NumbItems numb={user.favourites.length} />
                </figcaption>
            </figure>
        </Link>
    )
}