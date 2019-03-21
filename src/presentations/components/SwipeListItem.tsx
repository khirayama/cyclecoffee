import * as React from 'react';

export class SwipeListItem extends React.Component<{}> {
  public render(): JSX.Element {
    return <li className="SwipeListItem">{this.props.children}</li>;
  }
}
