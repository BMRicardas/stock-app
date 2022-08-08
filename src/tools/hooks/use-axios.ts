import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';

import { config } from 'config/config';

export const useAxios = <R>(
  url: string,
  params: Record<string, string>,
  enabled: boolean = true
) => {
  const [response, setResponse] = useState<AxiosResponse<R>>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.request<R>({
          baseURL: config.baseURL,
          url,
          // headers: config.headers,
          params: {
            // token: config.token,
            ...(params.q && { q: params.q }),
            ...(params.symbol && { symbol: params.symbol }),
            ...(params.resolution && { resolution: params.resolution }),
            ...(params.from && { from: params.from }),
            ...(params.to && { to: params.to }),
          },
        });
        setResponse(result);
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };
    if (enabled) {
      fetchData();
    }
  }, [
    enabled,
    params.from,
    params.q,
    params.resolution,
    params.symbol,
    params.to,
    url,
  ]);

  return { response, error, loading };
};
