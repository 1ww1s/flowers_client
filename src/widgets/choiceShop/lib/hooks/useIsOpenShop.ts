import { useMemo } from "react";
import { IShopData } from "../../../../entities/shop";

export const useIsOpenShop = (shop: IShopData) => {
    return useMemo(() => {
      if(!shop.title) return false
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      
      const allTime = '24 часа';
      if (shop.openingHours === allTime) {
        return true;
      }
  
      // Разбираем время работы магазина
      const parseTime = (timeStr: string) => {
        const [hoursStr, minutesStr] = timeStr.split(':');
        return {
          hours: parseInt(hoursStr, 10),
          minutes: parseInt(minutesStr, 10),
        };
      };
  
      const [openingTime, closingTime] = shop.openingHours.split(' - ');
      
      const openTime = parseTime(openingTime);
      const closeTime = parseTime(closingTime);
      
      // Текущее время в минутах для удобства сравнения
      const currentTotalMinutes = currentHours * 60 + currentMinutes;
      const openTotalMinutes = openTime.hours * 60 + openTime.minutes;
      const closeTotalMinutes = closeTime.hours * 60 + closeTime.minutes;
      
      // Проверяем, что текущее время внутри интервала [openTime, closeTime]
      return (
        (currentTotalMinutes >= openTotalMinutes) && 
        (currentTotalMinutes <= closeTotalMinutes)
      );
    }, [shop]); // Зависимость от shop
};