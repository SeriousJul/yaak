import { Link as RouterLink } from '@tanstack/react-router';
import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import { Icon } from './Icon';

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function Link({ href, children, className, ...other }: Props) {
  const isExternal = href.match(/^https?:\/\//);

  className = classNames(className, 'relative underline hover:text-violet-600');

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames(className, 'pr-4 inline-flex items-center')}
        onClick={(e) => {
          e.preventDefault();
        }}
        {...other}
      >
        <span className="underline">{children}</span>
        <Icon className="inline absolute right-0.5 top-[0.3em]" size="xs" icon="external_link" />
      </a>
    );
  }

  return (
    <RouterLink to={href} className={className} {...other}>
      {children}
    </RouterLink>
  );
}
