import { ChangeEvent, FC, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Link, useParams } from 'react-router-dom';
import { ApexOptions } from 'apexcharts';

import { config } from 'config/config';
import {
  convertDateToUnixInSeconds,
  weekBeforeFromNowInSeconds,
  nowInSeconds,
  convertDateFromUnix,
} from 'tools/common/date';
import { useAxios } from 'tools/hooks/use-axios';

import {
  OPTIONS,
  OPTIONS_TO_OPTIONS_STRING,
} from './company-details-page.constants';
import styles from './company-details-page.module.scss';

interface Candle {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  s: string;
  t: number[];
  v: number[];
}

export const CompanyDetailsPage: FC = () => {
  const [resolution, setResolution] = useState('1');
  const [dateFrom, setDateFrom] = useState(
    weekBeforeFromNowInSeconds().toString()
  );
  const [dateTo, setDateTo] = useState(nowInSeconds().toString());
  const params = useParams();

  const { symbol } = params;

  const dateF = 'dateFrom';
  const dateT = 'dateTo';
  const select = 'interval-select';

  const candleOptions: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: `${symbol} Chart`,
      align: 'center',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  const { response } = useAxios<Candle>(
    config.endpoints.candle,
    {
      ...(symbol && { symbol }),
      resolution,
      from: dateFrom,
      to: dateTo,
    },
    !!symbol
  );

  const handleDateFromChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setDateFrom(convertDateToUnixInSeconds(target.value).toString());
  };

  const handleDateToChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setDateTo(convertDateToUnixInSeconds(target.value).toString());
  };

  const handleSelectChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    return setResolution(target.value);
  };

  if (!response) return null;

  const count = response.data.o.length;

  const oArray = Array.from({ length: count });

  const formatedResponse = [
    {
      data: oArray.map((item, i) => {
        return {
          x: new Date(response.data.t[i] * 1000),
          y: [
            Number(response.data.o[i].toFixed(2)),
            Number(response.data.h[i].toFixed(2)),
            Number(response.data.l[i].toFixed(2)),
            Number(response.data.c[i].toFixed(2)),
          ],
        };
      }),
    },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.paramsContainer}>
          <label htmlFor={dateF}>Date from: </label>
          <input
            type="date"
            id={dateF}
            value={convertDateFromUnix(dateFrom)}
            onChange={handleDateFromChange}
          />
          <br />
          <label htmlFor={dateT}>Date to: </label>
          <input
            type="date"
            id={dateT}
            value={convertDateFromUnix(dateTo)}
            onChange={handleDateToChange}
          />
          <br />
          <label htmlFor={select}>Select interval: </label>
          <select id={select} onChange={handleSelectChange}>
            {OPTIONS.map((option) => (
              <option key={option} value={option}>
                {OPTIONS_TO_OPTIONS_STRING[option]}
              </option>
            ))}
          </select>
        </div>
        <Link className={styles.btn} to="/">
          Go back
        </Link>
      </div>
      <ReactApexChart
        options={candleOptions}
        series={formatedResponse}
        type="candlestick"
        height={600}
      />
    </>
  );
};
