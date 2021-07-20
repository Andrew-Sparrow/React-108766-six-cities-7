import React, {
  useState,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import {
  connect,
  useDispatch
} from 'react-redux';

import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import { useParams } from 'react-router-dom';
import { sendComment } from '../../store/api-actions';
import { ActionCreator } from '../../store/actions';

import PropertyCommentSubmitButton from './property-comment-submit-button';
import PropertyRatingStar from './property-rating-star';

import { MAX_RATING } from '../../const';
import Utils from '../../utils/utils';

function PropertyCommentForm(props) {
  const {
    onSubmit,
    isCommentLoading,
    isShowCommentErrorMessage,
  } = props;

  const MAX_LETTERS_AMOUNT = 300;
  const MIN_LETTERS_AMOUNT = 50;

  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();

  const { id } = useParams();

  const isSubmitButtonDisabled =
    (commentText.length < MIN_LETTERS_AMOUNT)
    || (commentText.length > MAX_LETTERS_AMOUNT)
    || (rating === 0);

  const generatedKeys = Utils.generateIdKeys(MAX_RATING);

  const onChangeCommentHandler = (evt) => {
    setCommentText(evt.target.value);
  };

  const onChangeRatingHandler = (evt) => {
    setRating(+evt.target.defaultValue);
  };

  const onSubmitHandler = (evt) => {
    evt.preventDefault();
    onSubmit(id, commentText, rating);
  };

  const setSuccessfulCommentActions = () => {
    setCommentText('');
    setRating(0);
  };

  useEffect(() => {
    !isShowCommentErrorMessage && setSuccessfulCommentActions();
  }, [isCommentLoading, isShowCommentErrorMessage]);

  return (
    <form
      className="reviews__form form"
      action=""
      method="post"
      onSubmit={ (evt) => { onSubmitHandler(evt); } }
      disabled={isCommentLoading}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" onChange={ onChangeRatingHandler }>
        { generatedKeys.map((idValue, index) => <PropertyRatingStar key={ idValue } index={ index } rating={rating}/>).reverse() }
      </div>
      <Tooltip
        overlay={ <div style={ { height: 100, width: 150, fontSize: 25 } }>Something went wrong</div> }
        placement="top"
        visible={ isShowCommentErrorMessage }
        animation="zoom"
      >
        <textarea
          className="reviews__textarea form__textarea"
          onChange={(evt) => onChangeCommentHandler(evt)}
          value={commentText}
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          onFocus={ () => {
            if (isShowCommentErrorMessage) {
              dispatch(ActionCreator.showErrorCommentFormMessage(false));
            }
          }}
        />
      </Tooltip>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span>
          and describe your stay with at least
          <b className="reviews__text-amount">50 characters</b>.
        </p>
        <PropertyCommentSubmitButton
          disabled={ isSubmitButtonDisabled }
          isSending={isCommentLoading}
        />
      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  isCommentLoading: state.isCommentLoading,
  isShowCommentErrorMessage: state.isShowCommentErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(idHotel, text, hotelRating) {
    dispatch(sendComment(idHotel, text, hotelRating));
  },
});

PropertyCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isCommentLoading: PropTypes.bool.isRequired,
  isShowCommentErrorMessage: PropTypes.bool,
};

export { PropertyCommentForm };
export default connect(mapStateToProps, mapDispatchToProps)(PropertyCommentForm);
