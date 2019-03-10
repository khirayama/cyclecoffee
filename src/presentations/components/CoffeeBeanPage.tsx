import * as d3 from 'd3';
import * as React from 'react';

import { ICoffeeBean, IShop } from 'interfaces';
import { CoffeeBeanSelectButtonContainer } from 'presentations/containers/CoffeeBeanSelectButtonContainer';
import { ShopCard } from 'presentations/components/ShopCard';
import { Navigation } from 'presentations/components/Navigation';

export interface IProps {
  isSignedIn: boolean;
  shop: IShop;
  coffeeBean: ICoffeeBean;
}

export class CoffeeBeanPage extends React.Component<IProps, {}> {
  private profileRef: React.RefObject<HTMLDivElement> = React.createRef();

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
      .domain([0, 15])
      .range([margin.left, width - margin.right]);
    const yScale = d3
      .scaleLinear()
      .domain([0, 300])
      .range([height - margin.bottom, margin.top]);
    // For axis
    const axisx = d3.axisBottom(xScale).ticks(15);
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

  public render(): JSX.Element {
    const shop: IShop = this.props.shop;
    const coffeeBean: ICoffeeBean = this.props.coffeeBean;

    return (
      <div className="CoffeeBeanPage">
        <div className="CoffeeBeanPage--Content">
          <div className="CoffeeBeanPage--Content--CoffeeBeanImage">
            <img src={coffeeBean.imageUrl} alt={coffeeBean.name} />
          </div>
          <div className="CoffeeBeanPage--Content--CoffeeBean">
            <h1>{coffeeBean.name}</h1>
            <p>{coffeeBean.description}</p>
            <CoffeeBeanSelectButtonContainer />
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
            <div ref={this.profileRef} />
            <p>
              <span>{coffeeBean.roastProfile.roast}</span>
              <span>{coffeeBean.roastProfile.machine}</span>
              <span>{coffeeBean.roastProfile.season}</span>
            </p>
            <ShopCard shop={shop} />
          </div>
        </div>
        <Navigation pathname="/" />
      </div>
    );
  }
}
