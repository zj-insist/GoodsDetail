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

import * as windowSize from '../Common/CommonDefined'

import { LineView } from '../Common/CommonView'

/**
 * 
 * 顶部图片视图
 * @class ImageCell
 * @extends {Component}
 */
export class ImageCell extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Image source={{ uri: 'backImage' }} style={{ width: windowSize.windowWidth, height: 375 }}>
        <View style={styles.buttonContainer}>
          <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.props.returnButton}>
              <Image source={{ uri: 'return_icon_black' }} style={{ width: 10, height: 18 }} />
            </TouchableOpacity>
          </View>
          <View style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.props.shoppingButton}>
              <Image source={{ uri: 'Detail_icon_black' }} style={{ width: 15, height: 21 }} />
            </TouchableOpacity>
          </View>
        </View>
      </Image>
    );
  }
}

/**
 * 
 * 名称以及详情介绍
 * @export
 * @class IntroduceCell
 * @extends {Component}
 */
export class IntroduceCell extends Component {
  render() {
    return (
      <View>
        <Text style={styles.titleText} numberOfLines={1}>要多长有多长多长多长多长多长多长多长多长多长</Text>
        <Text style={styles.detailsText} numberOfLines={1}>详情测试测试测试测试测试测试测试测测试测试试测试测试测试测试</Text>
        <View style={styles.priceContainer}>
          <Text style={{ fontSize: 15, color: '#EE1C25' }}>¥ 156</Text>
          <Text style={{ marginLeft: 3, fontSize: 13, color: '#CCCCCC', textDecorationLine: 'line-through' }}>¥ 220.00</Text>
        </View>
        <LineView viewType={'row'} />
      </View>
    );
  }
}


/**
 * 
 * 活动信息展示
 * @export
 * @class ActivityCell
 * @extends {Component}
 */
export class ActivityCell extends Component {
  render() {
    return (
      <View>
        <ActivityView topBlank={10} imageUri={'Detail_icon_zhen'} descriptionText={'满赠满赠满赠；满赠'} />
        <ActivityView topBlank={6} bottomBlank={10} imageUri={'Detail_icon_zhekou'} descriptionText={'折扣折扣折扣折扣；折扣'} />
        <LineView viewType={'row'} />
      </View>
    );
  }
}

class ActivityView extends Component {
  constructor(props) {
    super(props);
    this.props.topBlank = 0;
    this.props.bottomBlank = 0;
  }
  render() {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginLeft: 15, marginTop: this.props.topBlank, marginBottom: this.props.bottomBlank }}>
        <Image style={{ width: 30, height: 15 }} source={{ uri: this.props.imageUri }} />
        <Text style={{ fontSize: 12, color: '#8E919C', marginLeft: 5 }} numnumberOfLines={1}>{this.props.descriptionText}</Text>
      </View>
    );
  }
}


/**
 * 
 * 规格选择
 * @export
 * @class QuantitySelectCell
 * @extends {Component}
 */
export class QuantitySelectCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: -1,
    };
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      currentIndex: (nextProps.index >= 0) ? nextProps.index : -1,
    })
  }

  _selectedNewBox = (index) => {

    console.log(index)
    //防止反复回调
    if (index === this.state.currentIndex) {
      this.setState({ currentIndex: -1 });
      return;
    }

    this.setState({ currentIndex: index });
    //回调新的选择项
    if (this.props.chooiseNew) {
      this.props.chooiseNew(index);
    }
  }

  _renderItems = () => {
    return this.props.arr.map((item, index) => {
      return (<QuantityItemView
        key={index}
        index={index}
        selected={this.state.currentIndex === index ? true : false}
        title={item.title}
        disable={item.disable}
        click={this._selectedNewBox} />);
    });
  }

  render() {
    return (
      <View>
        <View style={styles.quantityContainer}>
          {this._renderItems()}
        </View>
        <LineView viewType={'row'} />
      </View>

    );
  }
}


class QuantityItemView extends Component {

  render() {
    let backgroundImage = null;
    let textStyle = null;
    if (this.props.disable) {
      backgroundImage = 'Detail_icon_Inoperable';
      textStyle = styles.disableText;
    } else if (this.props.selected) {
      backgroundImage = 'Detail_icon_select';
      textStyle = styles.selectedText;
    } else {
      backgroundImage = 'Detail_icon_unselectd';
      textStyle = styles.normalText;
    }

    return (
      <TouchableOpacity style={styles.buttonStyle} disabled={this.props.disable} onPress={() => {
        if (this.props.click) {
          this.props.click(this.props.index);
        }
      }}>
        <Image source={{ uri: backgroundImage }} style={styles.quantityItemContainer} resizeMode={'contain'}>
          <Text style={textStyle}>{this.props.title}</Text>
        </Image>
      </TouchableOpacity>
    );
  }
}


/**
 * 
 * 其他信息
 * @export
 * @class OthersCell
 * @extends {Component}
 */
export class OthersCell extends Component {
  render() {
    let arr = [
      { icon: 'Detail_icon_local', title: '本地原产' },
      { icon: 'Detail_icon_Return', title: '5天退货' },
      { icon: 'Detail_icon_pay', title: '坏损包赔' },
    ];
    let rows = [];
    arr.forEach((row, index) => {
      rows.push(<OthersView flexNum={1} imageUri={row.icon} descriptionText={row.title} key={index}></OthersView>)
    })
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAFAFA', height: 45, width: windowSize.windowWidth }}>
        {rows}
      </View>
    );
  }
}

class OthersView extends Component {
  constructor(props) {
    super(props);
    this.props.flexNum = 1;
  }
  render() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center', flex: this.props.flexNum, flexDirection: 'row' }}>
        <Image style={{ width: 22, height: 20 }} source={{ uri: this.props.imageUri }} />
        <Text style={{ fontSize: 12, color: '#8E919C', marginLeft: 5 }} numnumberOfLines={1}>{this.props.descriptionText}</Text>
      </View>
    );
  }
}

export class DetailsCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      width: 0,
      height: 0
    }
  }

  componentDidMount() {
    Image.getSize(this.props.detailsImage, (width, height) => {
      this.setState({ width, height });
    });
  }

  _clickDetailsButton = (index) => {
    if (index === this.state.currentIndex) {
      return;
    }

    this.setState({ currentIndex: index });
    //回调新的选择项
    if (this.props.selectedDteailsType) {
      this.props.selectedDteailsType(index);
    }
  }

  _buttonItems = () => {
    return (this.props.arr.map((item, index) => {
      let line = true;
      if (index === (this.props.arr.length - 1)) {
        line = false;
      }
      return (<DetailsButton
        key={index}
        index={index}
        showLineView={line}
        allNumber={this.props.arr.length}
        selected={this.state.currentIndex === index ? true : false}
        title={item}
        click={this._clickDetailsButton} />);
    }));
  }

  render() {
    let details = null;
    if (this.state.currentIndex === 0) {
      details = (
        <Image source={{ uri: this.props.detailsImage }}
          resizeMode={'cover'}
          style={{ width: windowSize.windowWidth, height: (this.state.height / this.state.width * windowSize.windowWidth) }} />
      );
    } else {
      let rows = this.props.introduceArr.map((item, index) => {
        return (<DetailsTableCellView
          key={index}
          index={index}
          title={item.title}
          introduce={item.introduce} />);
      });
      details = (
        <View style={{ marginTop: 15, marginBottom: 15, marginLeft: 15, marginRight: 15 }}>
          {rows}
        </View>
      )
    }

    return (
      <View>
        <View>
          <View style={{ flexDirection: 'row' }}>
            {this._buttonItems()}
          </View>
          <LineView viewType={'row'} />
        </View>
        {details}
      </View>
    );
  }
}

class DetailsButton extends Component {
  constructor(props) {
    super(props);
    this.props.allNumber = 1;
  }
  render() {
    let selectedView = this.props.selected ? <View style={{ height: 3, backgroundColor: '#2AC1BC' }} /> : <View />;
    let textStyle = this.props.selected ? styles.buttonSelectedStyle : styles.buttonUnselectedStyle;
    let lineView = this.props.showLineView ? <LineView viewType={'column'} topBlank={15} bottomBlank={15} /> : <View />;
    return (
      <View style={{ flexDirection: 'row' }}>
        <View>
          <TouchableWithoutFeedback onPress={
            () => {
              if (this.props.click) {
                this.props.click(this.props.index)
              }
            }
          }>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 44, width: windowSize.windowWidth / this.props.allNumber }}>
              <Text style={textStyle}>{this.props.title}</Text>
            </View>
          </TouchableWithoutFeedback>
          {selectedView}
        </View>
        {lineView}
      </View>
    );
  }
}

class DetailsTableCellView extends Component {
  render() {
    return (
      <View style={{ marginLeft: 15, marginRight: 15 }}>
        <View style={styles.tableCellContainer}>
          <View style={styles.tableLeftContainer}>
            <Text style={styles.leftText}>{this.props.title}</Text>
          </View>
          <View style={styles.tableRightContainer}>
            <Text style={styles.rightText}>{this.props.introduce}</Text>
          </View>
        </View>
        <LineView viewType={'row'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  titleText: {
    marginTop: 14,
    marginLeft: 14,
    marginRight: 14,
    fontSize: 16,
    color: '#41444E'
  },
  detailsText: {
    marginTop: 9,
    marginLeft: 14,
    marginRight: 14,
    fontSize: 13,
    color: '#8D919C'
  },
  priceContainer: {
    marginTop: 5,
    marginLeft: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  quantityContainer: {
    marginTop: 10,
    marginLeft: 15,
    marginBottom: 10,
    marginRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  buttonStyle: {
    width: (windowSize.windowWidth - 60) / 3,
    height: 33 + 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityItemContainer: {
    marginTop: 5,
    marginBottom: 5,
    width: (windowSize.windowWidth - 60) / 3,
    height: 33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalText: {
    fontSize: 13,
    color: '#41444E',
  },
  disableText: {
    fontSize: 13,
    color: '#CCCCCC',
  },
  selectedText: {
    fontSize: 13,
    color: '#2AC1BC',
  },
  tableLeftContainer: {
    backgroundColor: '#F7F7F7',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flex: 95
  },
  tableRightContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 250
  },
  leftText: {
    fontSize: 12,
    color: '#9397A1',
    marginRight: 14,
    marginLeft: 14,
    marginTop: 10,
    marginBottom: 10
  },
  rightText: {
    fontSize: 12,
    color: '#41444E',
    marginLeft: 14,
    marginRight: 29,
    marginTop: 10,
    marginBottom: 10
  },
  tableCellContainer: {
    flexDirection: 'row',
    // height: 34,
    width: windowSize.windowWidth - 30
  },
  buttonSelectedStyle: {
    fontSize: 14,
    color: '#41444E'
  },
  buttonUnselectedStyle: {
    fontSize: 14,
    color: '#8D919C'
  }
});