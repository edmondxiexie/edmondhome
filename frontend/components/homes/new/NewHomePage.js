import React from "react";
import TextFieldGroup from "../../common/TextFieldGroup";

class NewHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      errors: [],
      isLoading: false
    };
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.createHome(this.state).then(res => {
      //   debugger;
      this.context.router.push("/");
    });
  }

  autoFill(e) {
    e.preventDefault();
    this.setState({
      title: `Title created at: ${new Date().toString()}`,
      description: `Description created at: ${new Date().toString()}`
    });
  }

  render() {
    const { title, description, image, errors, isLoading } = this.state;
    return (
      <form>
        <h1>Host your place</h1>
        <TextFieldGroup
          field="title"
          label="Home Title"
          name="title"
          value={title}
          onChange={e => this.onChange(e)}
          error={errors.title}
        />
        <TextFieldGroup
          field="description"
          label="Home Description"
          name="description"
          value={description}
          onChange={e => this.onChange(e)}
          error={errors.description}
        />

        <button className="btn btn-primary" onClick={e => this.onSubmit(e)}>
          Create
        </button>
        <button
          className="btn btn-warning pull-right"
          onClick={e => this.autoFill(e)}
        >
          Autn Fill
        </button>
      </form>
    );
  }
}

NewHomePage.propTypes = {
  createHome: React.PropTypes.func.isRequired
};

NewHomePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default NewHomePage;
