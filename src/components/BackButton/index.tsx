import { useNavigate } from 'react-router';
import styles from './index.module.scss';

type Props = {
    text?: string;
};

const BackButton = ({ text = '← Back to Search' }: Props) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => navigate(-1)} className={styles.backButton}>
            {text}
        </div>
    );
};

export default BackButton;
