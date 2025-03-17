import { Drink } from '../types/Api/drink-type';

export const saveDrinkToStorage = (drink: Drink) => {
    try {
        const customDrinks = JSON.parse(localStorage.getItem('customDrinks') || '[]');
        localStorage.setItem('customDrinks', JSON.stringify([...customDrinks, drink]));
    } catch (error) {
        console.log('Failed to save drink to localStorage', error);
    }
};

export const getCustomDrinks = (): Drink[] => {
    return JSON.parse(localStorage.getItem('customDrinks') || '[]');
};
