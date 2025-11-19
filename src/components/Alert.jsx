import { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: '2px',
      borderStyle: 'solid',
      fontWeight: 'bolder',
      borderRadius: '6px',
      borderColor: this.color,
      textAlign: 'center',
      fontSize: '13px',
      margin: '10px 0',
      padding: '10px',
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#0044cc';           // dark blue
    this.bgColor = '#e6f0ff';         // light blue background
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#b30000';           // deep red
    this.bgColor = '#ffe6e6';         // soft red background
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = '#cc7a00';           // amber
    this.bgColor = '#fff4e6';         // soft yellow-orange background
  }
}

export { InfoAlert, ErrorAlert, WarningAlert };
