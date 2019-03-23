import * as React from 'react';

type Props = {
  // TODO: context渡しにする必要あり
  onTouchStart: any;
  onTouchMove: any;
  onTouchEnd: any;
};

export class SwipeListItem extends React.Component<Props> {
  public render(): JSX.Element {
    return (
      <li
        className="SwipeListItem"
        onTouchStart={this.props.onTouchStart}
        onTouchMove={this.props.onTouchMove}
        onTouchEnd={this.props.onTouchEnd}
      >
        {this.props.children}
      </li>
    );
  }
}
