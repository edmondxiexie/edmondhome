import React from "react";

class IndexHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      homes: []
    };
  }

  componentWillMount() {
    this.props.fetchHomes();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.homes.length !== this.props.homes.homes) {
      this.setState({ homes: nextProps.homes.homes });
    }
  }

  onRedirecct(e, id) {
    e.preventDefault();
    this.context.router.push(`/homes/${id}`);
  }

  buildGallery(homes) {
    let gallery = [];
    for (let home of homes) {
      let { id, title, description } = home;
      if (title.length > 15) {
        title = title.substr(0, 15) + "...";
      }
      gallery.push(
        <div
          key={id}
          className="col-md-4 col-sm-6 gallery-card"
          onClick={e => this.onRedirecct(e, id)}
        >
          <img
            src="https://res.cloudinary.com/dqace5qmb/image/upload/v1521918931/people-3120717_640.jpg"
            className="card-img"
          />
          <div className="caption">
            <p>
              <span>
                <strong>{`ID: ${id}`}</strong>
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
    const homes = this.state.homes;
    return (
      <div className="container row">
        <h1 className="text-center">Index page</h1>
        {this.buildGallery(homes)}
      </div>
    );
  }
}

IndexHomePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default IndexHomePage;
