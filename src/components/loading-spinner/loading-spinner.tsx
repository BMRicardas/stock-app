import { FC } from 'react';

import styles from './loading-spinner.module.scss';

export const LoadingSpinner: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loadingSpinner} />
    </div>
  );
};
