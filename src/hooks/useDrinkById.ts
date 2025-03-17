import { useQuery } from '@tanstack/react-query';
import { getCustomDrinks } from '../utils/localStorage';

const fetchDrinkById = async (id: string) => {
    const customDrinks = getCustomDrinks();
    const localDrink = customDrinks.find((drink) => drink.idDrink === id);
    if (localDrink) return localDrink;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/lookup.php?i=${id}`).then((res) => res.json());
    return res?.drinks[0];
};

export const useDrinkById = (id: string) => {
    return useQuery({
        queryKey: ['drink', id],
        queryFn: () => fetchDrinkById(id),
        enabled: !!id,
        staleTime: 60000 * 30,
    });
};
