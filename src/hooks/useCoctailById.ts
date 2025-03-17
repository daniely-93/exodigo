import { useQuery } from '@tanstack/react-query';
import { getCustomDrinks } from '../utils/localStorage';

const fetchCocktailById = async (id: string) => {
    const customDrinks = getCustomDrinks();
    const localDrink = customDrinks.find((cocktail) => cocktail.idDrink === id);
    if (localDrink) return localDrink;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/lookup.php?i=${id}`).then((res) => res.json());
    return res?.drinks[0];
};

export const useCocktailById = (id: string) => {
    return useQuery({
        queryKey: ['cocktail', id],
        queryFn: () => fetchCocktailById(id),
        enabled: !!id,
        staleTime: 60000 * 30,
    });
};
