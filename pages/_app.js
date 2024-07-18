import LogRocket from 'logrocket';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    LogRocket.init('wwhvxc/appjud'); // Substitua pelo seu ID de aplicação correto
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
