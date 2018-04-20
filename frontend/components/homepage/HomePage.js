import React from "react";
import { isEmpty } from "lodash";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.auth.user.username || ""
    };
  }

  componentWillMount() {
    this.props.fetchGalleryHomes(14);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth) {
      this.setState({
        username: nextProps.auth.user.username
      });
    } else {
      this.setState({
        username: ""
      });
    }
  }

  buildGalleryBoard(homes) {
    const gallery = [];

    for (let i = 0; i < 14; i++) {
      const src = homes[i].image;

      gallery.push(
        <div
          className={`gallery__item gallery__item--${i + 1}`}
          key={`Gallery image ${i + 1}`}
        >
          <img
            src={src}
            alt={`Gallery image ${i + 1}`}
            className="gallery__img"
          />
        </div>
      );
    }

    return <div className="gallery">{gallery}</div>;
  }

  buildGalleryItem(home) {}

  render() {
    const { galleryHomes } = this.props;

    const slogan = this.props.profile.fullname || "Edmond Book";
    return (
      <div className="home-page-base">
        {/* <div className="jumbotron">
          <h1>{`Welcome! ${slogan}`}</h1>
        </div> */}
        <div className="story">
          <div className="story__pictures">
            <img
              src="https://res.cloudinary.com/dqace5qmb/image/upload/v1524196536/story-1.jpg"
              alt="Travel Couple"
              className="story__img--1"
            />
            <img
              src="https://res.cloudinary.com/dqace5qmb/image/upload/v1524195607/sunset-962156_1280.jpg"
              alt="Beach House"
              className="story__img--2"
            />
          </div>
          <div className="story__content">
            <h3 className="heading-3">Happy Customer</h3>
            <h2 className="heading-2">
              &ldquo;The best travel experience of our lives&rdquo;
            </h2>
            <p className="story__text">
              Asperiores impedit illum sunt consequuntur ipsum repellendus fugit
              ea. Placeat possimus commodi occaecati deleniti ut. Dolore omnis
              quasi ea nam at. Placeat minima temporibus dolorum vel.
            </p>
            <button className="btn story-btn">Explore Next Trip</button>
          </div>
        </div>

        {!isEmpty(galleryHomes) && this.buildGalleryBoard(galleryHomes)}
      </div>
    );
  }
}

export default HomePage;
