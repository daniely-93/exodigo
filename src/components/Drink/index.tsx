import { Drink as DrinkType } from '../../types/Api/drink-type';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import styles from './index.module.scss';
import { Link } from 'react-router';

type Props = {
    drink: DrinkType;
};

const DEFAULT_IMAGE = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

const Drink = ({ drink }: Props) => {
    return (
        <Link to={`/drink/${drink.idDrink}`} className={styles.coctail}>
            <LazyLoadImage src={drink.strDrinkThumb ?? DEFAULT_IMAGE} alt={drink.strDrink} />
            <div className={styles.details}>
                <span className={styles.title}>
                    {drink.strDrink} <span className={styles.glass}>({drink.strGlass})</span>
                </span>
                <span className={styles.category}>{drink.strCategory}</span>
            </div>
        </Link>
    );
};

export default Drink;
