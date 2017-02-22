import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    ListView,
    TouchableWithoutFeedback,
    TextInput
} from 'react-native';

import { LineView } from '../Common/CommonView'
import { windowWidth, windowHeight } from '../Common/CommonDefined'

export class TitleCell extends Component {
    render() {
        return (
            <View>
                <LineView viewType={'row'} />
                <View style={{ backgroundColor: '#F7F7F7', justifyContent: 'center', height: 34 }}>
                    <Text style={{ color: '#2AC1BC', fontSize: 14, marginLeft: 14 }}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}


export class SelectCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: this.props.isSelected,
        }
    }

    _handleSelectedButtonPress(selected) {
        this.setState({ isSelected: !selected })
    }

    _selectType = () => {
        let leftBlank = 0;
        let selectImage = null;
        let payIcon = this.props.iconImage ? <Image source={{ uri: this.props.iconImage }}
            style={{ width: 18, height: 18, marginLeft: 10, marginRight: 4 }}
            resizeMode={'contain'}
        /> : null;
        let rightButton = this.props.rightButton ? <View style={{ marginRight: 15 }}>
            <Image source={{ uri: 'right' }}
                style={{ width: 15, height: 15 }}
                resizeMode={'contain'} />
        </View> : null;
        if (this.props.selectType == 'single') {
            selectImage = <Image source={(this.props.selected ? { uri: 'selected' } : { uri: 'unselected' })}
                style={{ width: 18, height: 18 }}
                resizeMode={'contain'}
            />;
            leftBlank = 8;
        } else if (this.props.selectType == 'multi') {
            selectImage = <Image source={(this.state.isSelected ? { uri: 'check-selected' } : { uri: 'check-unSelected' })}
                style={{ width: 18, height: 18 }}
                resizeMode={'contain'}
            />;
            leftBlank = 10;
        } else {
            payIcon = null;
        }
        let lineView = null;
        if (this.props.lineView == 'blank') {
            lineView = <LineView viewType={'row'} leftBlank={15} rightBlank={15} />;
        } else if (this.props.lineView == 'full') {
            lineView = <LineView viewType={'row'} />
        }

        return ({
            blank: leftBlank,
            imageView: selectImage,
            payView: payIcon,
            right: rightButton,
            line: lineView
        });
    }

    render() {

        console.log(this);
        let press = null;
        if (this.props.selectType == 'multi') {
            press = () => this._handleSelectedButtonPress(this.state.isSelected)
        } else if (this.props.selectType == 'single') {
            //TODO: 添加点击
            press = () => {

                if (this.props.chooiseNew) {
                    this.props.chooiseNew(this.props.index)
                }
            };
        }

        return (
            <View>
                <View style={{ height: this.props.height || 49, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: this.props.bgColor || 'white' }}>
                    <TouchableWithoutFeedback onPress={press}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                            {this._selectType().imageView}
                            {this._selectType().payView}
                            <Text style={{
                                marginLeft: this._selectType().blank,
                                fontSize: this.props.fontSize || 14,
                                color:this.props.fontColor
                            }}>{this.props.title}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    {this._selectType().right}
                </View>
                {this._selectType().line}
            </View>
        );
    }
}


export class BillCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            currentIndex: -1
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            currentIndex: (nextProps.index >= 0) ? nextProps.index : -1,
        })
    }

    _selectedNewBox = (index) => {

        //防止反复回调
        if (index === this.state.currentIndex) return;

        this.setState({ currentIndex: index });
        //回调新的选择项
        if (this.props.chooiseNew) {
            this.props.chooiseNew(index);
        }
    }

    _renderItems = () => {
        return this.props.arr.map((item, index) => {
            let blank = 26
            if (index == 0) {
                blank = 23
            }
            return (<BillItem
                key={index}
                index={index}
                selected={this.state.currentIndex === index ? true : false}
                title={item}
                click={this._selectedNewBox}
                leftBlank={blank}
            />);
        });
    }

    render() {

        let selectView = null;
        if (this.props.type == 'select') {
            selectView = this._renderItems();
        } else if (this.props.type == 'input') {
            selectView = (
                <TextInput style={{ height: 30, width: windowWidth - 80, marginLeft: 22, alignSelf: 'center', fontSize: 13 }}
                    onChangeText={(text) => this.setState({ text })}
                    value={this.state.text}
                    maxLength={30}
                    placeholder={this.props.placeholder}
                />);
        }

        let separator = null;
        if (this.props.separator == 'blank') {
            separator = <LineView viewType={'row'} leftBlank={15} rightBlank={15} />;
        } else if (this.props.separator == 'full') {
            separator = <LineView viewType={'row'} />
        }

        return (
            <View>
                <View style={{ flexDirection: 'row', height: 49 }}>
                    <Text style={{ color: '#9397A1', fontSize: 13, marginLeft: 14, alignSelf: 'center' }}>{this.props.title}</Text>
                    {selectView}
                </View>
                {separator}
            </View>
        );
    }
}

class BillItem extends Component {

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                if (this.props.click) {
                    this.props.click(this.props.index);
                }
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={(this.props.selected ? { uri: 'selected' } : { uri: 'unselected' })}
                        style={{ width: 18, height: 18, marginLeft: this.props.leftBlank, alignSelf: 'center' }}
                        resizeMode={'contain'}
                    />
                    <Text style={{ marginLeft: 7, fontSize: 13, alignSelf: 'center' }}>{this.props.title}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export class TotalCell extends Component {

    render() {
        let freightView = this.props.message.othercost > 0 ?
            (<Text style={{ color: '#9397A1', fontSize: 13, marginRight: 15 }}>（包含运费 ¥{this.props.message.othercost}）</Text>) : null;

        let rightBlank = freightView ? 0 : 15;

        return (
            <View style={{ backgroundColor: '#FAFAFA', flexDirection: 'row-reverse', height: 50, alignItems: 'center' }}>
                {freightView}
                <Text style={{ fontSize: 13, marginRight: rightBlank }}>
                    合计
                    <Text style={{ color: '#FF3600', fontSize: 13 }}> ¥ {this.props.message.total}</Text>
                </Text>
                <Text style={{ marginRight: 14, fontSize: 13 }}>共{this.props.message.count}件商品</Text>
            </View>
        )
    }
}