// tslint:disable:react-a11y-anchors react-no-dangerous-html no-any
import * as d3 from 'd3';
import * as React from 'react';

import { ICoffeeBean, IShop } from 'interfaces';
import { Footer } from 'presentations/components/Footer';
import { Header } from 'presentations/components/Header';

export interface IProps {
  isSignedIn: boolean;
  shop: IShop;
  coffeeBean: ICoffeeBean;
}

export class CoffeeBeanPage extends React.Component<IProps, {}> {
  private profileRef: React.RefObject<HTMLDivElement> = React.createRef();

  // tslint:disable-next-line:max-func-body-length
  public componentDidMount(): void {
    const el: HTMLDivElement = this.profileRef.current;
    const profile: any[] = this.props.coffeeBean.roastProfile.profile;
    const width = el.clientWidth;
    const height = (el.clientWidth * 1) / 2;
    const margin = {
      top: 30,
      bottom: 60,
      right: 30,
      left: 60,
    };
    const svg = d3
      .select(el)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    // For scale
    const xScale = d3
      .scaleLinear()
      .domain([0, 20])
      .range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain([0, 300])
      .range([height - margin.bottom, margin.top]);
    // For axis
    const axisx = d3.axisBottom(xScale).ticks(20);
    const axisy = d3.axisLeft(yScale).ticks(5);
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(axisx)
      .append('text')
      .attr('fill', 'black')
      .attr('x', (width - margin.left - margin.right) / 2 + margin.left)
      .attr('y', 35)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10pt')
      .attr('font-weight', 'bold')
      .text('時間(分)');
    svg
      .append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(axisy)
      .append('text')
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .attr('x', -(height - margin.top - margin.bottom) / 2 - margin.top)
      .attr('y', -35)
      .attr('transform', 'rotate(-90)')
      .attr('font-weight', 'bold')
      .attr('font-size', '10pt')
      .text('温度');
    // For line
    svg
      .append('path')
      .datum(profile)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr(
        'd',
        d3
          .line()
          .x((d: any) => xScale(d.time))
          .y((d: any) => yScale(d.temperature)),
      );
  }

  // tslint:disable:max-func-body-length
  public render(): JSX.Element {
    const shop: IShop = this.props.shop;
    const coffeeBean: ICoffeeBean = this.props.coffeeBean;

    return (
      <div className="CoffeeBeanPage">
        <Header isSignedIn={this.props.isSignedIn} />
        <div className="CoffeeBeanPage--CoffeeBean">
          <h1>{coffeeBean.name}</h1>
          <img src={coffeeBean.imageUrl} alt={coffeeBean.name} />
          <h2 className="CoffeeBeanPage--CoffeeBean--ShopName">
            <a href={`/shops/${shop.id}`}>
              <img src={shop.imageUrl} alt={shop.name} />
              <span>{shop.name}</span>
            </a>
          </h2>
          <div className="CoffeeBeanPage--CoffeeBean--SelectButton">
            <button>注文豆に選択</button>
          </div>
          <h3>生豆情報</h3>
          <table>
            <tbody>
              <tr>
                <td>名前</td>
                <td>{coffeeBean.greenCoffeeBean.name}</td>
              </tr>
              <tr>
                <td>地域</td>
                <td>{coffeeBean.greenCoffeeBean.country}</td>
              </tr>
              <tr>
                <td>産地標高</td>
                <td>{coffeeBean.greenCoffeeBean.height}m</td>
              </tr>
              <tr>
                <td>精製所</td>
                <td>{coffeeBean.greenCoffeeBean.farm}</td>
              </tr>
              <tr>
                <td>品種</td>
                <td>{coffeeBean.greenCoffeeBean.breed}</td>
              </tr>
              <tr>
                <td>精製法</td>
                <td>{coffeeBean.greenCoffeeBean.process}</td>
              </tr>
            </tbody>
          </table>
          <h3>焙煎プロファイル</h3>
          <div ref={this.profileRef} />
          <p>
            <span>{coffeeBean.roastProfile.roast}</span>
            <span>{coffeeBean.roastProfile.machine}</span>
            <span>{coffeeBean.roastProfile.season}</span>
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}
