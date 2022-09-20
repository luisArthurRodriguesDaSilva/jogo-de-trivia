import React, { Component } from 'react';
// import './style/carrousel.css';

export default class Carrousel extends Component {
  componentDidMount() {

  }

  componentDidUpdate() {
    bulmaCarousel.attach('#slider', {
      slidesToScroll: 1,
      slidesToShow: 1,
      infinite: true,
      autoplay: true,
      // autoplaySpeed: 2000,
      navigationKeys: true,
      pagination: true,
    });

    bulmaCarousel.attach('#carousel-demo', {
      slidesToScroll: 1,
      slidesToShow: 1,
      navigationKeys: true,
    });
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        <section className="hero is-medium has-carousel">
          <div id="carousel-demo" className="hero-carousel">
            <div className="item-1">
              <figure className="image is-16by9 is-covered">
                <img src="https://source.unsplash.com/random/1200x500" alt="" />
              </figure>
              t1
            </div>
            <div className="item-2">
              <figure className="image is-16by9 is-covered">
                <img src="https://source.unsplash.com/random/1200x500" alt="" />
              </figure>
              t2
            </div>
            <div className="item-3">
              <figure className="image is-16by9 is-covered">
                <img src="https://source.unsplash.com/random/1200x500" alt="" />
              </figure>
              t3
            </div>
            <div className="item-3">
              <figure className="image is-16by9 is-covered">
                <img src="https://source.unsplash.com/random/1200x500" alt="" />
              </figure>
              t4
            </div>
            <div className="item-3">
              <figure className="image is-16by9 is-covered">
                <img src="https://source.unsplash.com/random/1200x500" alt="" />
              </figure>
              t5
            </div>
          </div>
          <div className="hero-head" />
          <div className="hero-body" />
          <div className="hero-foot" />
        </section>
      </div>
    );
  }
}
