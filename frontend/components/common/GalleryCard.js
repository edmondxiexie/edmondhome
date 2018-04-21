import React, { Component } from "react";
import PropTypes from "prop-types";

class GalleryCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      title,
      description,
      image,
      propertyType,
      roomType,
      price,
      district,
      onWishlist,
      showFavButton,
      showEditButton,
      handleClick,
      addToWishlist,
      deleteFromWishlist,
      onEditClick
    } = this.props;

    let trimedTitle = title;

    if (title.length > 50) {
      trimedTitle = title.substr(0, 50) + "...";
    }

    return (
      <div
        className="gallery-card"
        onClick={e => {
          handleClick(e, id);
        }}
      >
        {onWishlist
          ? showFavButton && (
              <button
                className="favorite-btn"
                onClick={e => {
                  deleteFromWishlist(e, id);
                }}
              >
                <i className="fa fa-heart active" />
                <span>Saved</span>
              </button>
            )
          : showFavButton && (
              <button
                className="favorite-btn"
                onClick={e => {
                  addToWishlist(e, id);
                }}
              >
                <i className="fa fa-heart-o" />
                <span>Save</span>
              </button>
            )}

        {showEditButton && (
          <button
            className="edit-btn"
            onClick={e => {
              onEditClick(e, id);
            }}
          >
            <i className="fa fa-pencil active" />
            <span>Edit</span>
          </button>
        )}

        <img src={image} className="card-img" />
        <div className="caption">
          <div>
            <span>PLUS</span>
            {`${roomType} · ${district}`}
          </div>
          <div>{trimedTitle}</div>
          <div className="price-label">{`$${price} per night`}</div>
          <div className="rating">
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star" />
            <i className="fa fa-star-half-o" />
            <span>4.5</span>
          </div>
        </div>
      </div>
    );
  }
}

GalleryCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  propertyType: PropTypes.string,
  roomType: PropTypes.string,
  price: PropTypes.string,
  district: PropTypes.string,
  handleClick: PropTypes.func,
  showFavButton: PropTypes.bool,
  showEditButton: PropTypes.bool,
  onWishlist: PropTypes.bool,
  addToWishlist: PropTypes.func,
  deleteFromWishlist: PropTypes.func,
  onEditClick: PropTypes.func
};

GalleryCard.defaultProps = {
  onWishlist: false,
  showFavButton: false,
  showEditButton: false
};

export default GalleryCard;
