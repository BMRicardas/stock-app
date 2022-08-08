import { BrowserRouter } from 'react-router-dom';

import { IndexPage } from 'pages/index/index-page';

export const App = () => {
  return (
    <BrowserRouter>
      <IndexPage />
    </BrowserRouter>
  );
};
