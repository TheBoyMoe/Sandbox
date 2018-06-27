import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';

export default class AlertDismissable extends React.Component {
  // bsStyle = %w(success warning danger info)
  constructor(props, context) {
    super(props, context);

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleShow = this.handleShow.bind(this);

    this.state = {
      show: true
    };
  }

  handleDismiss() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    if (this.state.show) {
      return (
        <Alert bsStyle={ this.props.style } onDismiss={ this.handleDismiss }>
          <h4 style={{ marginBottom: '0px'}}>{ this.props.message }</h4>
        </Alert>
      );
    }
  }
}
// render (<AlertDismissable />);