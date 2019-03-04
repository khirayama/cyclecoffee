import * as classNames from 'classnames';
import * as React from 'react';

export function CoffeeBeanSelectButton(props: { disabled?: boolean; loading?: boolean }): JSX.Element {
  const text: string = props.loading ? '注文豆にセット中' : '注文豆にセットする';

  return (
    <button
      className={classNames(
        'CoffeeBeanSelectButton',
        /* eslint-disable @typescript-eslint/camelcase */
        { CoffeeBeanSelectButton__Disabled: props.disabled },
        { CoffeeBeanSelectButton__Loading: props.loading },
        /* eslint-enable @typescript-eslint/camelcase */
      )}
      disabled={!props.disabled}
    >
      {text}
    </button>
  );
}
