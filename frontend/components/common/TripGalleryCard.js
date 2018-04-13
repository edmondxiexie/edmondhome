import React, { Component } from "react";
import PropTypes from "prop-types";

class TripGalleryCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      id,
      title,
      image,
      checkInDate,
      checkOutDate,
      orderDate,
      district,
      price,
      handleClick
    } = this.props;

    let trimedTitle = title;

    if (title.length > 33) {
      trimedTitle = title.substr(0, 33) + "...";
    }

    // const today = moment(new Date());

    // const dif = moment(checkOutDate).diff(moment(checkInDate), "days");
    // console.log("dif", dif);

    return (
      <div
        className="trip-gallery-card"
        onClick={e => {
          handleClick(e);
        }}
      >
        <div className="plane-icon">
          <i className="fa fa-paper-plane" />
        </div>
        <img src={image} className="card-img" />
        <div className="caption">
          <div className="district">{district}</div>
          <div className="title">{trimedTitle}</div>
          <div className="stay-date">
            <div className="stay-date-text">
              <div className="check-in-data">
                {moment(checkInDate).format("MMM DD YYYY")}
              </div>
              <i className="fa fa-long-arrow-right" />
              <div className="check-out-data">
                {moment(checkOutDate).format("MMM DD YYYY")}
              </div>
            </div>
          </div>
          <div className="order-info">
            <label className="order-date-label">Order Placed</label>
            <div className="order-date-text">
              {moment(orderDate).format("MMM DD YYYY h:mm A")}
            </div>
            <div className="order-number">ORDER # 114-8145845-8255432</div>
          </div>
        </div>
      </div>
    );
  }
}

TripGalleryCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  image: PropTypes.string,
  checkInDate: PropTypes.string,
  checkOutDate: PropTypes.string,
  price: PropTypes.string,
  orderDate: PropTypes.string,
  district: PropTypes.string,
  handleClick: PropTypes.func
};

TripGalleryCard.defaultProps = {};

export default TripGalleryCard;
