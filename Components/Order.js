import React, { Component, PropTypes } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    NavigatorIOS,
    Image,
    TouchableOpacity,
    Dimensions,
    ListView,
    StatusBar,
    TouchableWithoutFeedback
} from 'react-native';

import { TitleCell, SelectCell, BillCell, TotalCell } from '../ViewSrc/Cells/OrderCells'
import { windowWidth, windowHeight } from '../ViewSrc/Common/CommonDefined'
import { GoodsCell, ShopsCell } from '../ViewSrc/Cells/GoodsCarCells'
import { LineView } from '../ViewSrc/Common/CommonView'


export default class Order extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            sectionFooterHasChanged: (section1, section2) => section1 !== section2
        })
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(this.props.datas),
            billChooseIndex: -1,
            addressChooseIndex: -1,
            payChooseIndex: -1,
        }
    }

    _selectedNewBox = (index) => {
        console.log(index)
        //防止反复回调
        if (index === this.state.addressChooseIndex) return;

        this.setState({ addressChooseIndex: index });

    }

    //TODO: 添加单选按钮的点击事件
    _renderRows = (rowData, sectionID, rowID) => {
        if (sectionID == 'pay') {
            let contentView = null;
            if (rowData.content == '收货方式') {
                contentView = rowData.data.map((item, index) => {
                    let rightShow = true;
                    if (index > 0) rightShow = false;
                    return (
                        <SelectCell
                            title={item}
                            rightButton={rightShow}
                            lineView={index < rowData.data.length - 1 ? 'blank' : 'none'}
                            selectType={'single'}
                            key={index}
                            index={index}
                            selected={this.state.addressChooseIndex === index ? true : false}
                            chooiseNew={this._selectedNewBox}
                        />
                    );
                })
            } else if (rowData.content == '优惠券') {
                contentView = rowData.data.map((item, index) => {
                    return (
                        <SelectCell
                            title={item}
                            rightButton={true}
                            lineView={index < rowData.data.length - 1 ? 'blank' : 'none'}
                            key={index} />
                    );
                })
            } else if (rowData.content == '支付方式') {
                contentView = rowData.data.map((item, index) => {
                    return (
                        <SelectCell
                            title={item.name}
                            rightButton={false} lineView={index < rowData.data.length - 1 ? 'blank' : 'none'}
                            iconImage={item.iconUri}
                            selectType={'single'}
                            key={index}
                            index={index}
                            currentIndex={this.state.payChooseIndex}
                            chooiseNew={this._chooiseNewPayType}
                        />
                    );
                })
            }
            return (
                <View>
                    <TitleCell title={rowData.content} />
                    {contentView}
                </View>
            );
        } else if (sectionID == 'bill') {
            if (rowID == 0) {
                return (
                    <View>
                        <View style={{ height: 10, backgroundColor: '#EFEFF4' }} />
                        <SelectCell
                            title={rowData}
                            rightButton={false}
                            lineView={'full'}
                            selectType={'multi'} />
                    </View>
                );
            } else if (rowID == 1) {
                return (<BillCell arr={rowData.types} title={rowData.name} chooiseNew={this._chooiseNewType} index={this.state.billChooseIndex} separator={'blank'} type={'select'} />);
            } else {
                return (
                    <BillCell title={rowData} placeholder={'请输入相关内容'} separator={'none'} type={'input'} />
                );
            }
        } else if (sectionID.indexOf('goods') == 0) {
            let totalView = null;
            if (rowID == this.props.datas[sectionID].length - 1) {
                let message = {
                    othercost: 33,
                    count: this.props.datas[sectionID].length - 1,
                    total: 220
                };
                totalView = <TotalCell message={message} />;
            }
            if (rowID == 0) {
                return (
                    <View>
                        <View style={{ width: windowWidth, height: 10, backgroundColor: '#EFEFF4' }} />
                        <ShopsCell isEdited={false} shopName={rowData} disActive={true} />
                        <LineView viewType={'row'} />
                    </View>
                );
            } else {
                return (
                    <View>
                        <GoodsCell isdisable={true} separator={totalView ? 'none' : 'blank'} />
                        {totalView}
                    </View>
                );
            }
        }
        return (
            <View></View>
        );
    }

    _footerRender = () => {
        return (
            <SelectCell title={'我同意《一起逛平台服务协议》'}
                fontSize={12}
                fontColor={'#666666'}
                bgColor={'#EFEFF4'}
                isSelected={true}
                selectType={'multi'}
                height={37}
            />
        );
    }

    render() {
        return (
            <View style={{ height: windowHeight, flexDirection: 'column-reverse' }}>
                <BottomView />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRows}
                    renderFooter={this._footerRender}
                    style={{ width: windowWidth }}
                />
            </View>
        );
    }
}


class BottomView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAll: false,
        }
    }

    _handleBuyButtonPress() {
    }

    render() {
        return (
            <View style={{ backgroundColor: '#FAFAFA', flexDirection: 'row', alignItems: 'center', height: 49, justifyContent: 'space-between' }}>
                <View style={{ marginLeft: 14}}></View>
                <Text style={{ marginRight: 9, fontSize: 13, color: '#54575F' }}>合计
                        <Text style={{ color: '#FF3600', fontSize: 16 }}> ¥236
                            <Text style={{ color: '#FF3600', fontSize: 11 }}>.86</Text>
                    </Text>
                    <Text style={{ color: '#9397A1', fontSize: 13 }}>（包含运费33元）</Text>
                </Text>
                <TouchableOpacity onPress={() => this._handleBuyButtonPress()}>
                    <View style={{ backgroundColor: '#2AC1BC', width: 140, height: 49, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 14, color: '#FFFFFF' }}>立即支付</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}