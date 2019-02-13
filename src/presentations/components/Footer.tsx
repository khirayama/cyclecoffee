import * as React from 'react';

export class Footer extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <footer className="Footer">
        <a href="/law">特定商取引に関する表記</a>
        <a href="/privacy">プライバシーポリシー</a>
        <a href="/terms">サービス利用規約</a>
        <p>&copy; cycle coffee</p>
      </footer>
    );
  }
}
