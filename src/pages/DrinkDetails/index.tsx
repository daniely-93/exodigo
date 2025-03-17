import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { useCocktailById } from '../../hooks/useCoctailById';
import Drink from '../../components/Drink';

const CocktailDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: cocktail, isLoading, isError } = useCocktailById(id!);

    if (isLoading) return <p>Loading...</p>;
    if (isError || !cocktail) return <p>Error fetching cocktail.</p>;

    // Extract ingredients from strIngredient1 to strIngredient15
    const ingredients = Object.keys(cocktail)
        .filter((key) => key.startsWith('strIngredient') && cocktail[key as keyof typeof Drink])
        .map((key) => ({
            name: cocktail[key as keyof typeof Drink],
            measure: cocktail[key as keyof typeof Drink],
        }));

    return (
        <div>
            <div onClick={() => navigate(-1)}>← Back to Search</div>
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
        </div>
    );
};

export default CocktailDetails;
