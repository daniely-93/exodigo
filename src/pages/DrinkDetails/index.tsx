import { useParams } from 'react-router';
import BackButton from '../../components/BackButton';
import Drink from '../../components/Drink';
import { useDrinkById } from '../../hooks/useDrinkById';
import styles from './index.module.scss';

const DEFAULT_IMAGE = import.meta.env.VITE_DEFAULT_IMAGE;

const DrinkDetails = () => {
    const { id } = useParams();
    const { data: drink, isLoading, isError } = useDrinkById(id!);

    if (isLoading) return <p>Loading...</p>;
    if (isError || !drink) return <p>Error fetching drink.</p>;

    const ingredients = Object.keys(drink)
        .filter((key) => key.startsWith('strIngredient') && drink[key as keyof typeof Drink])
        .map((key, idx) => ({
            name: (idx + 1).toString(),
            measure: drink[key as keyof typeof Drink],
        }));

    const isCustomDrink = id?.includes('custom');

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <BackButton />
                <h1 className={styles.title}>{drink.strDrink}</h1>
            </div>

            <div className={styles.imageContainer}>
                <img src={drink.strDrinkThumb || DEFAULT_IMAGE} alt={drink.strDrink} />
                {!isCustomDrink && (
                    <div className={styles.details}>
                        <p>
                            <strong>Category:</strong> {drink.strCategory}
                        </p>
                        <p>
                            <strong>Alcoholic:</strong> {drink.strAlcoholic}
                        </p>
                        <p>
                            <strong>Glass Type:</strong> {drink.strGlass}
                        </p>
                    </div>
                )}
            </div>

            <div className={styles.section}>
                <h2>Instructions</h2>
                <p>{drink.strInstructions}</p>
            </div>

            <div className={styles.section}>
                <h2>Ingredients</h2>
                <ul className={styles.ingredientsList}>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>
                            {!isCustomDrink && (
                                <img
                                    src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.measure}-small.png`}
                                    alt={ingredient.name}
                                />
                            )}
                            <span>{ingredient.measure}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default DrinkDetails;
