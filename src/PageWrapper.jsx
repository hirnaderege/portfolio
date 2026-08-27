import { useEffect, useState } from 'react';

export default function PageWrapper({ children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`page-wrapper ${visible ? 'page-visible' : ''}`}>
      {children}
    </div>
  );
}