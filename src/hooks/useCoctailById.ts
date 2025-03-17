import { useQuery } from '@tanstack/react-query';
import { baseUrlApi } from '../api/Axios';
import { Drink } from '../types/Api/drink-type';
import { getCustomDrinks } from '../utils/localStorage';

const fetchCocktailById = async (id: string) => {
    const customDrinks = getCustomDrinks();
    const localDrink = customDrinks.find((cocktail) => cocktail.idDrink === id);
    if (localDrink) return localDrink;
    

    const { data } = await baseUrlApi.get<{ drinks: Drink[] }>('/lookup.php', { i: id });
    return data?.drinks[0];
};

export const useCocktailById = (id: string) => {
    return useQuery({
        queryKey: ['cocktail', id],
        queryFn: () => fetchCocktailById(id),
        enabled: !!id,
        staleTime: 60000 * 30,
    });
};
