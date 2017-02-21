import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';


import { windowWidth, windowHeight } from '../Common/CommonDefined'
import { LineView } from '../Common/CommonView'

/**
 * 
 * 商店头cell
 * @export 
 * @class ShopsCell
 * @extends {Component}
 */
export class ShopsCell extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEdited: this.props.isEdited,
      isSelectedAll: this.props.isSelectedAll,
      _this: this
    }
    this.props.disActive = true;
  }

  _handelEditedButtonPress(editState) {
    this.setState(
      {
        isEdited: !editState,
        isSelectedAll: false
      });
  }

  _handleSelectedAllButtonPress(selected) {
    this.setState({ isSelectedAll: !selected })
  }

  render() {

    let selectView = this.state.isEdited ? (
      <TouchableWithoutFeedback onPress={() => this._handleSelectedAllButtonPress(this.state.isSelectedAll)}>
        <View style={shopCellStyles.selectedButtonContainor}>
          <Image source={(this.state.isSelectedAll ? { uri: 'circle-check-selected' } : { uri: 'circle-unselected' })}
            style={{ width: 19, height: 19 }}
            resizeMode={'contain'}
          />
        </View>
      </TouchableWithoutFeedback>) : null;
    // let selectView = showSelectedButton(this.state.isEdited, this.state.isSelectedAll,() => this._handleSelectedAllButtonPress);
    return (
      <TouchableOpacity disabled={this.props.disActive} onPress={() => this._handelEditedButtonPress(this.state.isEdited)}>
        <View style={shopCellStyles.containor}>
          <View style={shopCellStyles.shopContainor}>
            {selectView}
            <Image source={{ uri: 'shop' }}
              style={{ width: 15, height: 15 }}
              resizeMode={'contain'} />
            <Text style={{ marginLeft: 4, fontSize: 14 }}>{this.props.shopName}</Text>
          </View>
          <View style={{ marginRight: 15 }}>
            <Image source={{ uri: 'right' }}
              style={{ width: 15, height: 15 }}
              resizeMode={'contain'} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}


/**
 * 
 * 商品cell
 * @export
 * @class GoodsCell
 * @extends {Component}
 */
export class GoodsCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdited: this.props.isEdited,
      isSelected: this.props.isSelected,
      selectedNumber: 0
    }
  }

  _handelEditedButtonPress(editState) {
    this.setState(
      {
        isEdited: !editState,
        isSelected: false,
      });
  }

  _handleSelectedButtonPress(selected) {
    this.setState({ isSelected: !selected })
  }

  _handleMinusButtonPress() {
    let temp = (this.state.selectedNumber > 0) ? (this.state.selectedNumber - 1) : 0;
    this.setState({ selectedNumber: temp })
  }

  _handlePlusButtonPress() {
    let temp = this.state.selectedNumber + 1;
    this.setState({ selectedNumber: temp })
  }

  _showEdit(edited) {
    if (edited) {
      return (
        <View style={{ flexDirection: 'row', width: 88, justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => this._handleMinusButtonPress()}>
            <Image source={{ uri: 'Detail_icon_minus' }} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', fontSize: 14 }}>{this.state.selectedNumber}</Text>
          <TouchableOpacity onPress={() => this._handlePlusButtonPress()}>
            <Image source={{ uri: 'Detail_icon_plus' }} style={{ width: 25, height: 25 }} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    let selectView = this.state.isEdited ? (
      <TouchableWithoutFeedback onPress={() => this._handleSelectedButtonPress(this.state.isSelected)}>
        <View style={shopCellStyles.selectedButtonContainor}>
          <Image source={(this.state.isSelected ? { uri: 'circle-check-selected' } : { uri: 'circle-unselected' })}
            style={{ width: 19, height: 19 }}
            resizeMode={'contain'}
          />
        </View>
      </TouchableWithoutFeedback>) : null;

    let leftBlank = this.state.isEdited ? 30 : 0;

    let textFiled = this.state.isEdited ? <View style={{ flex: 130 }} /> : <Text style={{ fontSize: 12, color: '#9397A1', flex: 130, textAlign: 'right' }} numberOfLines={1}>X{this.state.selectedNumber}</Text>

    let separator = null;
    if (this.props.separator == 'blank') {
      separator = <LineView viewType={'row'} leftBlank={15} rightBlank={15} />;
    } else if (this.props.separator == 'full') {
      separator = <LineView viewType={'row'} />
    }

    return (
      <View>
        <TouchableOpacity onPress={() => this._handelEditedButtonPress(this.state.isEdited)} disabled={this.props.isdisable}>
          <View style={goodsCellStyle.containor}>
            {selectView}
            <Image source={{ uri: '2' }} style={{ width: 90, height: 90, borderRadius: 2, justifyContent: 'center', alignItems: 'center' }} resizeMode={'cover'}>
              {this.props.imageText}
            </Image>
            <View style={[goodsCellStyle.rightContainor, { width: windowWidth - leftBlank - 30 - 100 }]}>
              <View>
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 13, flex: 310 }} numberOfLines={2}>要多长有多长多长多长多长多长多长多长多长多长多长多长多长多长多长多长多长多长多长多长多长多长多长多长多长多长多长多长多长</Text>
                    <Text style={{ fontSize: 13, flex: 130, textAlign: 'right' }} numberOfLines={1}>¥29</Text>
                  </View>
                </View>
                <View style={{ marginTop: 4 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 12, color: '#9397A1', flex: 310 }} numberOfLines={1}>规格规格规格</Text>
                    {textFiled}
                  </View>
                </View>
              </View>
              {this._showEdit(this.state.isEdited)}
            </View>
          </View>
        </TouchableOpacity>
        {separator}
      </View>
    );
  }
}

const shopCellStyles = StyleSheet.create({
  containor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 44,
  },
  shopContainor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15
  },
  selectedButtonContainor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10
  }
});

const goodsCellStyle = StyleSheet.create({
  containor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 13,
    marginBottom: 13
  },
  shopContainor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15
  },
  rightContainor: {
    height: 90,
    marginLeft: 10,
    justifyContent: 'space-between'
  }
});