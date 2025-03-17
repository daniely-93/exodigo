import { useQuery } from '@tanstack/react-query';
import { getCustomDrinks } from '../utils/localStorage';

const fetchDrinksByName = async (keyword: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/search.php?s=${keyword}`).then((res) => res.json());
    const storedDrinks = getCustomDrinks();

    const customDrinksByName = storedDrinks.filter((drink) => drink.strDrink.toLowerCase().includes(keyword?.toLowerCase()));
    return [...customDrinksByName, ...(res.drinks || [])];
};

const fetchDrinks = async () => {
    const alphabet = Array.from({ length: 26 }, (_, n) => String.fromCharCode(n + 97));
    const responses = await Promise.all(
        alphabet.map((char) => fetch(`${import.meta.env.VITE_API_URL}/search.php?s=${char}`).then((res) => res.json())),
    );
    const flattedDrinks = [
        ...new Map(
            responses
                .map((res) => res.drinks)
                .flat()
                .map((drink) => [drink.idDrink, drink]),
        ).values(),
    ];

    return flattedDrinks;
};

export const useDrinkByName = (keyword: string) => {
    return useQuery({
        queryKey: ['drinks', keyword],
        queryFn: async ({ signal }) => {
            if (!keyword) return fetchDrinks();
            await new Promise((resolve) => setTimeout(resolve, 400)); // Daniel: added a delay of 400ms when the user is typing
            if (signal?.aborted) return;
            return fetchDrinksByName(keyword);
        },
        staleTime: 60000 * 30, // Daniel: added a stale time of 30 minutes
    });
};
