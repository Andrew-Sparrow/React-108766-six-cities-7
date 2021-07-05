import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import CommentForm from '../comment-form/comment-form';
import PropertyCommentList from './property-comment-list';
import withLayout from '../hocs/with-layout';
import PropertyImagesList from './property-images-list';
import PropertyGoodsList from './property-goods-list';
import { neighbourhoodPlaces } from '../../mock/neighbourhood-places';
import PropertyNearPlacesList from './property-near-places-list';

import { comments } from '../../mock/comments';
import { placeHotel } from '../../mock/place-hotel';
import Utils from '../../utils/utils';
import Map from '../map/map';

function Property ( props ) {
  const adaptedPlaceForClient = Utils.adaptToClient(placeHotel);
  const width = Utils.getWidthByRating(placeHotel.rating);

  return (
    <Fragment>
      <main className="page__main">
        <section className="property">
          < PropertyImagesList images={adaptedPlaceForClient.images} />
          <div className="property__container container">
            <div className="property__wrapper">
              {adaptedPlaceForClient.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>)}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  { adaptedPlaceForClient.description }
                </h1>
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark" />
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: `${width}%` }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{ Math.round(adaptedPlaceForClient.rating) }</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {adaptedPlaceForClient.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  { adaptedPlaceForClient.bedrooms } Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max { adaptedPlaceForClient.maxAdults } adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{ adaptedPlaceForClient.price }</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                < PropertyGoodsList goods={ adaptedPlaceForClient.goods } />
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${adaptedPlaceForClient.host.isPro && 'property__avatar-wrapper--pro'} user__avatar-wrapper`}>
                    <img
                      className="property__avatar user__avatar"
                      src={adaptedPlaceForClient.host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    { adaptedPlaceForClient.host.name}
                  </span>
                  {adaptedPlaceForClient.host.isPro && (
                    <span className="property__user-status">
                      Pro
                    </span>
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    { adaptedPlaceForClient.description }
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews · <span className="reviews__amount">{ comments.length }</span></h2>
                < PropertyCommentList reviews={ comments } />
                < CommentForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              activeCityName={adaptedPlaceForClient.city.name}
              city={adaptedPlaceForClient.city}
              points={neighbourhoodPlaces}
              selectedPoint={adaptedPlaceForClient}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            < PropertyNearPlacesList />
            <div className="near-places__list places__list">
              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img className="place-card__image" src="img/room.jpg" width={260} height={200} alt="Place" />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">€80</b>
                      <span className="place-card__price-text">/&nbsp;night</span>
                    </div>
                    <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
                      <svg className="place-card__bookmark-icon" width={18} height={19}>
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">In bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{width: '80%'}} />
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Wood and stone place</a>
                  </h2>
                  <p className="place-card__type">Private room</p>
                </div>
              </ article>
              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img className="place-card__image" src="img/apartment-02.jpg" width={260} height={200} alt="Place" />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">€132</b>
                      <span className="place-card__price-text">/&nbsp;night</span>
                    </div>
                    <button className="place-card__bookmark-button button" type="button">
                      <svg className="place-card__bookmark-icon" width={18} height={19}>
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{width: '80%'}} />
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Canal View Prinsengracht</a>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>
              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img className="place-card__image" src="img/apartment-03.jpg" width={260} height={200} alt="Place" />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">€180</b>
                      <span className="place-card__price-text">/&nbsp;night</span>
                    </div>
                    <button className="place-card__bookmark-button button" type="button">
                      <svg className="place-card__bookmark-icon" width={18} height={19}>
                        <use xlinkHref="#icon-bookmark" />
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{width: '100%'}} />
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Nice, cozy, warm big bed apartment</a>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width={64} height={33} />
        </Link>
      </footer>

    </Fragment>
  );
}

export default withLayout(Property);
