/* eslint-disable react/display-name */
import * as React from 'react';

import { CoffeeBeanSelectButton } from 'presentations/components/CoffeeBeanSelectButton';
import { connect, IContainerProps } from 'utils/Container';

export const CoffeeBeanSelectButtonContainer = connect(
  class extends React.Component<IContainerProps> {
    public render(): JSX.Element {
      return <CoffeeBeanSelectButton />;
    }
  },
);
