import * as React from 'react';

export class SwipeList extends React.Component<{}> {
  public render(): JSX.Element {
    return <ul className="SwipeList">{this.props.children}</ul>;
  }
}
