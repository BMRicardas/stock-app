import getSymbolFromCurrency from 'currency-symbol-map';
import { FC } from 'react';
import { generatePath, Link } from 'react-router-dom';

import { Path } from 'config/path';
import { getFlagEmoji } from 'tools/common/get-flag-emoji';
import { CompanyData } from 'types/company-data';

import styles from './card.module.scss';

interface Props {
  data: CompanyData;
}

export const Card: FC<Props> = ({ data }) => {
  const {
    logo,
    name,
    country,
    weburl,
    ticker,
    finnhubIndustry,
    ipo,
    currency,
    marketCapitalization,
    shareOutstanding,
  } = data;

  const handleCompanyPage = (symbol: string) => {
    return `${generatePath(Path.COMPANY_DETAILS, { symbol })}`;
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.image}>
          <img src={logo} alt={name} />
        </div>
        <div className={styles.title}>
          {getFlagEmoji(country ?? '')}
          <h2>
            <a
              className={styles.link}
              href={weburl}
              target="_blank"
              rel="noopener noreferrer"
              title="Go to company page"
            >
              {name}
            </a>
          </h2>
          <p>{ticker}</p>
          <p>{finnhubIndustry}</p>
        </div>
      </div>
      <div className={styles.details}>
        <p>IPO: {ipo}</p>
        <p>
          Market Capitalization:{' '}
          {`${getSymbolFromCurrency(
            currency ?? ''
          )}${marketCapitalization.toFixed(2)}`}
        </p>
        <p>
          Shares Outstanding:{' '}
          {`${getSymbolFromCurrency(currency ?? '')}${shareOutstanding.toFixed(
            2
          )}`}
        </p>
      </div>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <Link className={styles.btn} to={handleCompanyPage(ticker)}>
        Stock price history
      </Link>
    </div>
  );
};
