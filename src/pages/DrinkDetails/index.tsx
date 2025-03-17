import { useParams } from 'react-router';
import BackButton from '../../components/BackButton';
import Drink from '../../components/Drink';
import { useCocktailById } from '../../hooks/useCoctailById';

const CocktailDetails = () => {
    const { id } = useParams();
    const { data: cocktail, isLoading, isError } = useCocktailById(id!);

    if (isLoading) return <p>Loading...</p>;
    if (isError || !cocktail) return <p>Error fetching cocktail.</p>;

    const ingredients = Object.keys(cocktail)
        .filter((key) => key.startsWith('strIngredient') && cocktail[key as keyof typeof Drink])
        .map((key) => ({
            name: cocktail[key as keyof typeof Drink],
            measure: cocktail[key as keyof typeof Drink],
        }));

    return (
        <section>
            <BackButton />
            <h1>{cocktail.strDrink}</h1>
            <div>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <div>
                    <p>
                        <strong>Category:</strong> {cocktail.strCategory}
                    </p>
                    <p>
                        <strong>Alcoholic:</strong> {cocktail.strAlcoholic}
                    </p>
                    <p>
                        <strong>Glass Type:</strong> {cocktail.strGlass}
                    </p>
                </div>
            </div>

            {/* Instructions */}
            <div>
                <h2>Instructions</h2>
                <p>{cocktail.strInstructions}</p>
            </div>

            {/* Ingredients Section */}
            <div>
                <h2>Ingredients</h2>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>
                            <strong>{ingredient.name}</strong>: {ingredient.measure}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default CocktailDetails;
