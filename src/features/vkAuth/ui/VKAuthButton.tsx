import { useEffect, useRef } from 'react';
import { Config, OneTap } from '@vkid/sdk';
import { generateCodeVerifier, generateCodeChallenge } from '../lib/helpers/generate';
import { VK_AUTH_ROUTE } from '../../../app/router/routes';
import classes from './vkAuthButton.module.scss'

export const VKAuthButton = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const initializeVKAuth = async () => {
            // Генерация PKCE-параметров
            const codeVerifier = generateCodeVerifier();
            const codeChallenge = await generateCodeChallenge(codeVerifier);
            
            // Сохраняем verifier для последующего использования
            localStorage.setItem('vk_code_verifier', codeVerifier);

            // Инициализация VK ID SDK
            (Config as any).set({
                app: process.env.REACT_APP_VK_CLIENT_ID,
                redirectUrl: `${process.env.REACT_APP_CLIENT_URL}${VK_AUTH_ROUTE.path}`,
                scope: 'phone',
                codeChallenge,
            });
            // Рендер кнопки
            const oneTap = new OneTap();
            if(containerRef.current){
              oneTap.render({
                  container: containerRef.current,
                  scheme: 'light',
                  styles: {
                    borderRadius: 40,
                  }
              });
            }

            return () => oneTap.unmount();
        };

        initializeVKAuth();
    }, []);

    return (
        <section 
            ref={containerRef} 
            className={classes.button}
        />
    )
};