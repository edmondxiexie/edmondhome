import React, { Component } from "react";
import GalleryCard from "../common/GalleryCard";
import Loader from "../common/Loader";

class ManageHostsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.props.fetchHostHomes(this.props.user.id);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1000); // simulates an async action, and hides the spinner
  }

  onRedirect(e, id) {
    e.preventDefault();
    this.context.router.push(`/homes/${id}`);
  }

  onRedirectEdit(e, id) {
    e.stopPropagation();
    this.context.router.push(`/homes/${id}/edit`);
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
            showEditButton={true}
            onEditClick={e => {
              this.onRedirectEdit(e, id);
            }}
          />
        </div>
      );
    }
    return gallery;
  }

  render() {
    if (this.state.isLoading) {
      return <Loader />;
    }

    let hostHomes = this.props.hostHomes || [];
    return (
      <div className="homes-manage-page-base">
        <div className="container">
          <div className="row">
            <h1 className="page-title">Manage your homes</h1>
            {this.buildGallery(hostHomes)}
          </div>
        </div>
      </div>
    );
  }
}

ManageHostsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ManageHostsPage;
