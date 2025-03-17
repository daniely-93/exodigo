import { useState } from 'react';
import { saveDrinkToStorage } from '../../utils/localStorage';
import { useNavigate } from 'react-router';
import styles from './index.module.scss';
const MAX_INGREDIENTS = 15;
const INITIAL_INGREDIENTS = 4;

const AddDrink = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        instructions: '',
        image: '',
        ingredients: Array(INITIAL_INGREDIENTS).fill(''),
    });

    const [error, setError] = useState('');

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
        if (index !== undefined) {
            const newIngredients = [...form.ingredients];
            newIngredients[index] = e.target.value;
            setForm({ ...form, ingredients: newIngredients });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    const onAddFieldHandler = () => {
        if (form.ingredients.length >= MAX_INGREDIENTS) return;
        setForm({ ...form, ingredients: [...form.ingredients, ''] });
    };

    const onSubmitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.instructions || form.ingredients.every((ing) => ing.trim() === '')) {
            setError('Please fill in all required fields.');
            return;
        }

        const formattedIngredients = form.ingredients.reduce(
            (acc, ingredient, index) => {
                acc[`strIngredient${index + 1}`] = ingredient.trim() || null;
                return acc;
            },
            {} as Record<string, string | null>,
        );

        saveDrinkToStorage({
            idDrink: `custom-${Date.now()}`,
            strDrink: form.name,
            strInstructions: form.instructions,
            strDrinkThumb: form.image,
            ...formattedIngredients,
        });

        navigate('/');
    };

    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Add a New Drink</h1>

            {error && <p className={styles.error}>{error}</p>}

            <form onSubmit={onSubmitHandler} className={styles.form}>
                <input type="text" name="name" value={form.name} onChange={onChangeHandler} placeholder="Drink Name" />

                <textarea name="instructions" value={form.instructions} onChange={onChangeHandler} placeholder="Instructions" />

                <div className={styles.ingredientsContainer}>
                    <h3 className={styles.ingredientsTitle}>Ingredients</h3>
                    {form.ingredients.map((ingredient, index) => (
                        <input
                            key={index}
                            type="text"
                            value={ingredient}
                            onChange={(e) => onChangeHandler(e, index)}
                            placeholder={`Ingredient ${index + 1}`}
                            className="p-2 border rounded w-full mt-2"
                        />
                    ))}

                    {form.ingredients.length < MAX_INGREDIENTS && (
                        <button type="button" onClick={onAddFieldHandler} className={`inverted ${styles.addIngredientButton}`}>
                            + Add Another Ingredient
                        </button>
                    )}
                </div>

                <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={onChangeHandler}
                    placeholder="Image URL (Optional)"
                    className="p-2 border rounded w-full"
                />

                <button type="submit" className={styles.saveButton}>
                    Save Drink
                </button>
            </form>
        </section>
    );
};

export default AddDrink;
