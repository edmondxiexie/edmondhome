import React from "react";
import GalleryCard from "../../common/GalleryCard";

class IndexHomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchHomes();
  }

  onRedirect(e, id) {
    e.preventDefault();
    console.log("---onclick---");
    this.context.router.push(`/homes/${id}`);
  }

  buildGallery(homes) {
    let gallery = [];
    for (let home of homes) {
      let {
        id,
        title,
        description,
        image,
        property_type,
        room_type,
        price,
        district
      } = home;
      // if (title.length > 15) {
      //   title = title.substr(0, 15) + "...";
      // }
      gallery.push(
        <div key={id} className="col-md-4 col-sm-6">
          <GalleryCard
            propertyType={property_type}
            roomType={room_type}
            price={price}
            district={district}
            id={id}
            title={title}
            description={description}
            image={image}
            handleClick={(e, id) => {
              this.onRedirect(e, id);
            }}
          />
        </div>
      );
    }
    return gallery;
  }

  render() {
    let homes = this.props.homes || [];
    return (
      <div>
        <div className="container row">
          <h1 className="text-center">Index page</h1>
          {this.buildGallery(homes)}
        </div>
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              Previous
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              Next
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

IndexHomePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default IndexHomePage;
