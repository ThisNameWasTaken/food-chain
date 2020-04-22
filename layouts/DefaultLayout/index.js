import React, { useEffect } from 'react';

const DefaultLayout = ({ children }) => {
  useEffect(() => {
    function calculateViewPortUnits() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    calculateViewPortUnits();
    window.addEventListener('resize', calculateViewPortUnits);

    return function cleanUp() {
      window.removeEventListener('resize', calculateViewPortUnits);
    };
  }, []);

  return <>{children}</>;
};

export default DefaultLayout;
