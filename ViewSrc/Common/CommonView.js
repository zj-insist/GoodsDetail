import React, { Component } from 'react';
import {
  View,
} from 'react-native';

export class LineView extends Component {
  constructor(props) {
    super(props);
    this.props.leftBlank = 0;
    this.props.rightBlank = 0;
    this.props.topBlank = 0;
    this.props.bottomBlank = 0;

  }
  render() {
    
    if (this.props.viewType == 'row') {
      return (
        <View style={{
          height: 1,
          backgroundColor: '#E2E7EA',
          marginLeft: this.props.leftBlank,
          marginRight: this.props.rightBlank,
          marginTop: this.props.topBlank,
          marginBottom: this.props.bottomBlank
        }} />
      );
    } else {
      return (
        <View style={{
          width: 1,
          backgroundColor: '#E2E7EA',
          marginLeft: this.props.leftBlank,
          marginRight: this.props.rightBlank,
          marginTop: this.props.topBlank,
          marginBottom: this.props.bottomBlank
        }} />
      );
    }
  }
}

