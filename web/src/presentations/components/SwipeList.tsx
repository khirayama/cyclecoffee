import * as React from 'react';

const shortAnimationTime: number = 200;

function waitShortAnimationEnd(): Promise<void> {
  return new Promise((resolve: any) => {
    resolve();
  });
}

type Props = {
  onSnap: any;
};

export class SwipeList extends React.Component<Props> {
  private ref: React.RefObject<HTMLUListElement> = React.createRef();

  private startX: number | null = null;

  private endX: number | null = null;

  private currentX: number | null = null;

  constructor(props: Props) {
    super(props);

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  public render(): JSX.Element {
    return <ul className="SwipeList">{this.props.children}</ul>;
  }

  private onTouchStart(event: React.TouchEvent<HTMLLIElement>) {
    this.startX = event.touches[0].clientX;
  }

  private onTouchMove(event: React.TouchEvent<HTMLLIElement>) {
    this.endX = event.touches[0].clientX;

    const el: HTMLElement = this.ref.current;
    const currentX: number = this.endX - this.startX + (this.currentX || 0);
    el.style.transition = 'none';
    el.style.transform = `translateX(${currentX}px)`;
  }

  private onTouchEnd(event: React.TouchEvent<HTMLLIElement>) {
    const el: HTMLElement = this.ref.current;
    let targetElement: HTMLElement;

    if (this.startX !== null && this.endX !== null) {
      if (this.startX > this.endX) {
        targetElement = event.currentTarget.nextElementSibling as HTMLElement;
      } else {
        targetElement = event.currentTarget.previousElementSibling as HTMLElement;
      }

      if (!targetElement) {
        targetElement = event.currentTarget;
      }

      const left: number = targetElement.offsetLeft * -1;
      el.style.transition = `transform ${shortAnimationTime}ms ease-in-out`;
      el.style.transform = `translateX(${left}px)`;

      this.currentX = left;
      this.startX = null;
      this.endX = null;

      waitShortAnimationEnd().then(() => {
        if (this.props.onSnap) {
          this.props.onSnap();
        }
      });
    }
  }
}
