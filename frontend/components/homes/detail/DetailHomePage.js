import React from "react";

class DetailHomnePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: ""
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
    const { id, title, description } = this.props.home;
    return (
      <div>
        <h1 className="text-center">Detail page</h1>
        <div>
          <label>{`ID: ${id}`}</label>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default DetailHomnePage;