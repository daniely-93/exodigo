import { useState } from 'react';
import { useNavigate } from 'react-router';
import { saveDrinkToStorage } from '../../utils/localStorage';

const MAX_INGREDIENTS = 15; // The API supports up to 15 ingredients

const AddDrink = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        instructions: '',
        image: '',
        ingredients: Array(MAX_INGREDIENTS).fill(''), // Empty 15 ingredients
    });

    const [error, setError] = useState('');

    // Handle form input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
        if (index !== undefined) {
            // Update specific ingredient
            const newIngredients = [...form.ingredients];
            newIngredients[index] = e.target.value;
            setForm({ ...form, ingredients: newIngredients });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.name || !form.instructions || form.ingredients.every((ing) => ing.trim() === '')) {
            setError('Please fill in all required fields.');
            return;
        }

        // Transform ingredients array into the required object format
        const formattedIngredients = form.ingredients.reduce(
            (acc, ingredient, index) => {
                if (ingredient.trim()) {
                    acc[`strIngredient${index + 1}`] = ingredient;
                } else {
                    acc[`strIngredient${index + 1}`] = null;
                }
                return acc;
            },
            {} as Record<string, string | null>,
        );

        saveDrinkToStorage({
            idDrink: `custom-${Date.now()}`,
            strDrink: form.name,
            strInstructions: form.instructions,
            strDrinkThumb: form.image || 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg',
            ...formattedIngredients, // Spread the structured ingredients
        });

        navigate('/');
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold">Add a New Drink</h1>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Drink Name"
                    className="p-2 border rounded w-full"
                />

                <textarea
                    name="instructions"
                    value={form.instructions}
                    onChange={handleChange}
                    placeholder="Instructions"
                    className="p-2 border rounded w-full"
                />

                <div>
                    <h3 className="text-lg font-bold">Ingredients</h3>
                    {form.ingredients.map((ingredient, index) => (
                        <input
                            key={index}
                            type="text"
                            value={ingredient}
                            onChange={(e) => handleChange(e, index)}
                            placeholder={`Ingredient ${index + 1}`}
                            className="p-2 border rounded w-full mt-2"
                        />
                    ))}
                </div>

                <input
                    type="text"
                    name="image"
                    value={form.image}
                    onChange={handleChange}
                    placeholder="Image URL (Optional)"
                    className="p-2 border rounded w-full"
                />

                <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
                    Save Drink
                </button>
            </form>
        </div>
    );
};

export default AddDrink;
