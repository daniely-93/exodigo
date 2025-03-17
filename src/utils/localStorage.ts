import { Drink } from '../types/Api/drink-type';

export const saveDrinkToStorage = (drink: Drink) => {
    const customDrinks = JSON.parse(localStorage.getItem('customDrinks') || '[]');
    localStorage.setItem('customDrinks', JSON.stringify([...customDrinks, drink]));
};

export const getCustomDrinks = (): Drink[] => {
    return JSON.parse(localStorage.getItem('customDrinks') || '[]');
};
