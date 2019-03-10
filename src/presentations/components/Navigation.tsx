import * as classNames from 'classnames';
import * as React from 'react';

export function Navigation(props: { pathname: string }): JSX.Element {
  const navItems = [
    {
      name: 'ホーム',
      icon: 'home',
      href: '/',
    },
    {
      name: '履歴',
      icon: 'history',
      href: '/histories',
    },
    {
      name: 'プロフィール',
      icon: 'person',
      href: '/profile',
    },
  ];

  return (
    <nav className="Navigation">
      <ul className="Navigation--List">
        {navItems.map(navItem => {
          return (
            <li
              key={navItem.href}
              className={classNames('Navigation--List--Item', {
                'Navigation--List--Item__Active': props.pathname === navItem.href,
              })}
            >
              <a href={navItem.href}>
                <div>
                  <i className="Icon">{navItem.icon}</i>
                </div>
                <span>{navItem.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
