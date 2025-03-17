import { useState } from 'react';
import Drink from '../../components/Drink';
import styles from './index.module.scss';
import { useCoctailByName } from '../../hooks/useCoctailByName';
import { useNavigate, useSearchParams } from 'react-router';

const ITEMS_PER_PAGE = 6;

const DrinksContainer = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') ?? '';
    const { data, isLoading, error } = useCoctailByName(query);
    const [pageIdx, setPageIdx] = useState<number>(0);
    const navigate = useNavigate();

    const pageCount = Math.max(Math.ceil((data?.length ?? 0) / ITEMS_PER_PAGE), 1);
    const isBackDisabled = pageIdx === 0;
    const isNextDisabled = pageIdx === pageCount - 1 || pageCount === 0;

    const pageData = data?.slice(pageIdx * ITEMS_PER_PAGE, (pageIdx + 1) * ITEMS_PER_PAGE);

    const onSearchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setSearchParams(newQuery ? { query: newQuery } : {});
    };

    return (
        <section className={styles.pageContainer}>
            <div className={styles.searchContainer}>
                <input type="text" value={query} onChange={onSearchChangeHandler} placeholder="Search for a drink..." />
                <button onClick={() => navigate('/add')}>Add Drink</button>
            </div>

            <div className={styles.listContainer}>
                {isLoading && <p>Loading...</p>}
                {error && <p>Error fetching cocktails.</p>}
                {!data?.length && !isLoading && <p>No drinks found.</p>}
                {pageData && (
                    <>
                        <div className={styles.drink}>
                            {pageData.map((drink) => (
                                <Drink key={drink.idDrink} drink={drink} />
                            ))}
                        </div>
                        {!!pageData.length && (
                            <div className={styles.pagination}>
                                <button onClick={() => !isBackDisabled && setPageIdx(pageIdx - 1)} disabled={isBackDisabled}>
                                    Previous
                                </button>
                                {pageIdx + 1} / {pageCount}
                                <button onClick={() => !isNextDisabled && setPageIdx(pageIdx + 1)} disabled={isNextDisabled}>
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default DrinksContainer;
