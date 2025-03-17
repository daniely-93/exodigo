import { useQuery } from '@tanstack/react-query';
import { getCustomDrinks } from '../utils/localStorage';

const fetchCocktailsByName = async (keyword: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/search.php?s=${keyword}`).then((res) => res.json());
    // const res = await baseUrlApi.get<{ drinks: Drink[] }>('/search.php', { s: keyword });
    const storedDrinks = getCustomDrinks();

    const customDrinksByName = storedDrinks.filter((drink) => drink.strDrink.toLowerCase().includes(keyword?.toLowerCase()));
    return [...customDrinksByName, ...(res.drinks || [])];
};

export const useCoctailByName = (keyword: string) => {
    return useQuery({
        queryKey: ['cocktails', keyword],
        queryFn: async ({ signal }) => {
            await new Promise((resolve) => setTimeout(resolve, 400)); // Daniel: added a delay of 400ms when the user is typing
            if (signal?.aborted) return;
            return fetchCocktailsByName(keyword);
        },

        enabled: !!keyword,
        staleTime: 60000 * 30, // Daniel: added a stale time of 30 minutes
    });
};
