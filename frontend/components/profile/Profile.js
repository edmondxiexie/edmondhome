import React from "react";

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getUserProfile(this.props.auth.user.id);
    }
  }

  render() {
    const profile = JSON.stringify(this.props.profile);

    return (
      <div>
        <h1>This is profile</h1>
        {profile}
      </div>
    );
  }
}

export default Profile;
