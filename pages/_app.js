import LogRocket from 'logrocket';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    LogRocket.init('your-logrocket-app-id');
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
