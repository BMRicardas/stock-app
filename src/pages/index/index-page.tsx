import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { HomePage } from 'pages/home/home-page';
import { CompanyDetailsPage } from 'pages/company-details/company-details-page';
import { Path } from 'config/path';

export const IndexPage: FC = () => {
  return (
    <Routes>
      <Route path={Path.HOME} element={<HomePage />} />
      <Route path={Path.COMPANY_DETAILS} element={<CompanyDetailsPage />} />
      <Route path="*" element={<Navigate to={Path.HOME} replace />} />
    </Routes>
  );
};
