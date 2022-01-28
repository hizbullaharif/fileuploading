import React from "react";
import ReactNotifications from "react-browser-notifications";

class Example extends React.Component {
  constructor(props) {
    super();
    this.showNotifications = this.showNotifications.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = props.title;
  }

  showNotifications() {
    // If the Notifications API is supported by the browser
    // then show the notification
    if (this.n.supported()) this.n.show();
  }

  handleClick(event) {
    // Do something here such as
    console.log("Notification Clicked");
    // window.focus() OR
    window.open("http://localhost:3001/");
    // Lastly, Close the notification
    this.n.close(event.target.tag);
    // this.n.show();
  }
  componentDidMount() {
    this.showNotifications();
  }
  render() {
    return (
      <div>
        <ReactNotifications
          onRef={(ref) => (this.n = ref)} // Required
          title={this.state} // Required
          body="This is the body"
          icon="icon.png"
          tag="abcdef"
          timeout="2000"
          onClick={(event) => this.handleClick(event)}
        />
      </div>
    );
  }
}
export default Example;
