import React, { Component } from "react";

class ManageHostsPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchHostHomes(this.props.user.id);
  }

  onRedirecct(e, id) {
    e.preventDefault();
    this.context.router.push(`/homes/${id}`);
  }

  buildGallery(homes) {
    let gallery = [];
    for (let home of homes) {
      let { id, title, host_id, description, image } = home;
      if (title.length > 15) {
        title = title.substr(0, 15) + "...";
      }
      gallery.push(
        <div
          key={id}
          className="col-md-4 col-sm-6 gallery-card"
          onClick={e => this.onRedirecct(e, id)}
        >
          <img src={image} className="card-img" />
          <div className="caption">
            <p>
              <span>
                <strong>{`ID: ${id}`}</strong>
              </span>
              <span>
                <strong>{`Host ID: ${host_id}`}</strong>
              </span>
            </p>
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
        </div>
      );
    }
    return gallery;
  }

  render() {
    let hostHomes = this.props.hostHomes || [];
    return (
      <div className="container row">
        <h1 className="text-center">Host Manage Page</h1>
        {this.buildGallery(hostHomes)}
      </div>
    );
  }
}

ManageHostsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ManageHostsPage;
