import { useParams } from 'react-router';
import BackButton from '../../components/BackButton';
import Drink from '../../components/Drink';
import { useCocktailById } from '../../hooks/useCoctailById';
import styles from './index.module.scss';

const CocktailDetails = () => {
    const { id } = useParams();
    const { data: cocktail, isLoading, isError } = useCocktailById(id!);

    if (isLoading) return <p>Loading...</p>;
    if (isError || !cocktail) return <p>Error fetching cocktail.</p>;

    const ingredients = Object.keys(cocktail)
        .filter((key) => key.startsWith('strIngredient') && cocktail[key as keyof typeof Drink])
        .map((key, idx) => ({
            name: (idx + 1).toString(),
            measure: cocktail[key as keyof typeof Drink],
        }));

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <BackButton />
                <h1 className={styles.title}>{cocktail.strDrink}</h1>
            </div>

            <div className={styles.imageContainer}>
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                <div className={styles.details}>
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

            <div className={styles.section}>
                <h2>Instructions</h2>
                <p>{cocktail.strInstructions}</p>
            </div>

            <div className={styles.section}>
                <h2>Ingredients</h2>
                <ul className={styles.ingredientsList}>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>
                            <img
                                src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.measure}-small.png`}
                                alt={ingredient.name}
                            />
                            {ingredient.measure}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default CocktailDetails;
