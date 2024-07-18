// Diretório: `pages`
// Arquivo: `_app.js`

import LogRocket from 'logrocket';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    LogRocket.init('wwhvxc/appjud');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
