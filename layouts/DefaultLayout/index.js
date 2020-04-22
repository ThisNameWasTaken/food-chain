import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import {
  Home as HomeIcon,
  Person as ProfileIcon,
  Search as SearchIcon,
} from '@material-ui/icons';

import { useStyles } from './styles';

const DefaultLayout = ({ children }) => {
  const styles = useStyles();

  const routes = [
    {
      label: 'home',
      path: '/home',
      icon: <HomeIcon />,
    },
    {
      label: 'profile',
      path: '/profile',
      icon: <ProfileIcon />,
    },
    {
      label: 'search',
      path: '/search',
      icon: <SearchIcon />,
    },
  ];

  const routesWithBottomNavigation = ['/home', '/profile', '/search', '/post'];

  const router = useRouter();

  const [activeRoute, setActiveRoute] = useState(null);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [shouldRenderNavigation, setShouldRenderNavigation] = useState(false);

  const onRouteChange = (event, newValue) => {
    setActiveRoute(newValue);

    router.push(newValue);
  };

  useEffect(() => {
    setActiveRoute(router.route);

    setShouldRenderNavigation(
      routesWithBottomNavigation.includes(router.route)
    );

    window.addEventListener('scroll', function (event) {
      // @ts-ignore
      setIsScrollingDown(this.prevScrollY < this.scrollY);
      // @ts-ignore
      this.prevScrollY = this.scrollY;
    });

    routes.forEach(({ path }) => {
      router.prefetch(path);
    });
  }, []);

  return (
    <>
      <>{children}</>
      {/* TODO: Export this component and lazy load it */}
      {shouldRenderNavigation && (
        <BottomNavigation
          className={`${styles.bottomNavigation} ${
            isScrollingDown && styles.bottomNavigationHidden
          }`}
          value={activeRoute}
          onChange={onRouteChange}
        >
          {routes.map(({ path, label, icon }) => (
            <BottomNavigationAction
              key={path}
              value={path}
              label={label}
              icon={icon}
            />
          ))}
        </BottomNavigation>
      )}
    </>
  );
};

export default DefaultLayout;
