import { ChangeEvent, FC, useState } from 'react';

import { Card, LoadingSpinner, Search } from 'components';
import { config } from 'config/config';
import { CompanyData } from 'types/company-data';
import { useAxios } from 'tools/hooks/use-axios';
import useDebounce from 'tools/hooks/use-debounce';

export const HomePage: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(target.value);
  };

  const { response, loading } = useAxios<CompanyData>(
    config.endpoints.profile,
    {
      symbol: debouncedSearchQuery,
    },
    !!debouncedSearchQuery
  );

  return (
    <>
      <Search
        id="name"
        label="Search for company ticker: "
        value={searchQuery}
        placeholder="Enter company ticker"
        onInputChange={handleInputChange}
      />
      {loading && debouncedSearchQuery ? (
        <LoadingSpinner />
      ) : response?.data ? (
        <Card data={response.data} />
      ) : (
        <p>No data</p>
      )}
    </>
  );
};
