import React from "react";

class DetailHomnePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: {}
    };
  }

  componentWillMount() {
    this.props.fetchHome(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    // debugger;
    this.setState({
      home: nextProps.home
    });
  }

  onRedirectDelete(e) {
    e.preventDefault();
  }

  onRedirectEdit(e) {
    e.preventDefault();
    this.context.router.push(`/homes/${this.props.params.id}/edit`);
  }

  buildDetailComponent() {
    // debugger;
    if (!_.isEmpty(this.state.home)) {
      const { id, title, description } = this.state.home;
      //   debugger;
      return (
        <div>
          <label>{`ID: ${id}`}</label>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      );
    }
    return "";
  }

  render() {
    const {
      id,
      title,
      description,
      img,
      host_id,
      price,
      district,
      property_type,
      room_type,
      setup_for_guest,
      guest_availability,
      rooms_availability,
      beds_availability,
      bath_availability,
      target
    } = this.props.home;

    return (
      <div>
        <img src={img} className="img-cover" />

        <h1 className="text-center">Detail page</h1>
        <div>
          <label>{`ID: ${id}`}</label>
          <h1>{title}</h1>
          <p>{description}</p>
          <button
            className="btn btn-warning"
            onClick={e => this.onRedirectEdit(e)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={e => this.onRedirectDelete(e)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

DetailHomnePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default DetailHomnePage;
