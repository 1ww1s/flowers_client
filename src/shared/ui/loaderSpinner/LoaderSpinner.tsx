import React, { Attributes, ComponentProps, FC } from 'react';
import classes from './loaderSpinner.module.scss'

export const LoaderSpinner: FC<ComponentProps<'div'>> = ({...props}) => {

    
    
    return (
        <section {...props} className={classes.loader}>
            
        </section>
    )
}
