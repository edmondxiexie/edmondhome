import React, { Component } from "react";

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
      handleClick
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
            <i className="fa fa-star-half" />
            <span>4.5</span>
          </div>
        </div>
      </div>
    );
  }
}

export default GalleryCard;
