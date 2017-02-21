import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  Dimensions,
  ListView,
  StatusBar,
  Platform
} from 'react-native';


import { ImageCell, IntroduceCell, ActivityCell, OthersCell, QuantitySelectCell, DetailsCell } from '../ViewSrc/Cells/DetailsCells'
import { LineView } from '../ViewSrc/Common/CommonView'

import { windowWidth, windowHeight } from '../ViewSrc/Common/CommonDefined'


export default class Details extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    })
    this.state = {
      dataSource: ds.cloneWithRows(['row1', 'row2', 'row3', 'row4', 'row5', 'row6', 'row7']),
      chooseIndex: -1,
      selectedDetailsIndex: 0,
    }
  }

  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleShoppingsPress() {

  }

  _chooiseNewType = (index) => {
    console.log('点击了' + index);
    this.setState({ chooseIndex: parseInt(index) });
  }

  _selectedDetailsType = (index) => {
    this.setState({ selectedDetailsIndex: parseInt(index) });
  }

  _renderRows = (rowData, sectionID, rowID) => {
    switch (rowData) {
      case 'row1':
        return (
          <ImageCell returnButton={() => this._handleBackPress()} shoppingButton={() => this._handleShoppingsPress()} />
        );
      case 'row2':
        return (
          <IntroduceCell />
        );
      case 'row3':
        return (
          <ActivityCell />
        );
      case 'row4':
        let rows = [{ title: '测试1', disable: false }, { title: '测试2', disable: false }, { title: '测试3', disable: true }, { title: '测试4', disable: false }];
        return (
          <QuantitySelectCell arr={rows} chooiseNew={this._chooiseNewType} index={this.state.chooseIndex} />
        );

      case 'row5':
        {
          return (
            <OthersCell />
          );
        }
      case 'row6':
        return (
          <View style={{ backgroundColor: '#EFEFF4', height: 10 }} />
        );
      case 'row7':
        let buttonArr = ['图文详情', '产品参数'];
        let parameterArr = [
          { title: '测试1', introduce: '测试1详情信息' },
          { title: '测试测试22', introduce: '测试2详情信息' },
          { title: '测试3', introduce: '测试3详情信息' },
          { title: '测试4', introduce: '测试4详情信息' },
          { title: '测试5', introduce: '测试5详情信息测试5详情信息测试5详情信息测试5详情信息详情信息测试5详情信息详情信息测试5详情信息' }]
        return (
          <DetailsCell detailsImage={'testImage'}
            index={this.state.selectedDetailsIndex}
            selectedDteailsType={this._selectedDetailsType}
            arr={buttonArr}
            introduceArr={parameterArr} />
        );
    }
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={{ flex: (windowHeight - 50)}}>
          <ListView
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderRow={this._renderRows}
          />
        </View>
        <BottomView />
      </View>
    );
  }
}

/**
 * 
 * 最下层购买View
 * @class BottomView
 * @extends {Component}
 */
class BottomView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNumber: 0,
    }
  }

  _handleMinusButtonPress() {
    let temp = (this.state.selectedNumber > 0) ? (this.state.selectedNumber - 1) : 0;
    this.setState({ selectedNumber: temp })
  }

  _handlePlusButtonPress() {
    let temp = this.state.selectedNumber + 1;
    this.setState({ selectedNumber: temp })
  }

  render() {
    return (
      <View style={{ flex: 50, backgroundColor: '#FAFAFA' }}>
        <LineView viewType={'row'} />
        <View style={{ flex: 49, flexDirection: 'row' }}>
          <View style={{ flex: 120, backgroundColor: '#FAFAFA', justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.shoppingSelectContainer}>
              <TouchableOpacity onPress={() => this._handleMinusButtonPress()}>
                <Image source={{ uri: 'Detail_icon_minus' }} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
              <View style={{ width: 30, height: 30, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontSize: 15 }}>{this.state.selectedNumber}</Text>
              </View>
              <TouchableOpacity onPress={() => this._handlePlusButtonPress()}>
                <Image source={{ uri: 'Detail_icon_plus' }} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 115, backgroundColor: '#FAFAFA', flexDirection: 'row' }}>
            <LineView viewType={'column'} />
            <TouchableOpacity style={styles.buyContainer}>
              <Text style={{ color: '#2AC1BC', fontSize: 14 }}>立即购买</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.addContainer}>
            <Text style={{ color: '#FFFFFF', fontSize: 13 }}>加入购物车</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  buttonContainer: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buyContainer: {
    flex: 114,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addContainer: {
    flex: 140,
    backgroundColor: '#2AC1BC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  shoppingSelectContainer: {
    flexDirection: 'row',
  },
});

