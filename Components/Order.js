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
            chooseIndex: -1,
        }
    }

    _chooiseNewType = (index) => {
        this.setState({ chooseIndex: parseInt(index) });
    }

    _renderRows = (rowData, sectionID, rowID) => {
        if (sectionID == 'pay') {
            let contentView = null;
            if (rowData.content == '收货方式') {
                contentView = rowData.data.map((item, index) => {
                    let rightShow = true;
                    if (index > 0) rightShow = false;
                    return (
                        <SelectCell title={item} rightButton={rightShow} lineView={index < rowData.data.length - 1 ? 'blank' : 'none'} selectType={'single'} key={index} />
                    );
                })
            } else if (rowData.content == '优惠券') {
                contentView = rowData.data.map((item, index) => {
                    return (
                        <SelectCell title={item} rightButton={true} lineView={index < rowData.data.length - 1 ? 'blank' : 'none'} key={index} />
                    );
                })
            } else if (rowData.content == '支付方式') {
                contentView = rowData.data.map((item, index) => {
                    return (
                        <SelectCell title={item.name} rightButton={false} lineView={index < rowData.data.length - 1 ? 'blank' : 'none'}
                            iconImage={item.iconUri} selectType={'single'} key={index} />
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
                        <SelectCell title={rowData} rightButton={false} lineView={'full'} selectType={'multi'} />
                    </View>
                );
            } else if (rowID == 1) {
                return (<BillCell arr={rowData.types} title={rowData.name} chooiseNew={this._chooiseNewType} index={this.state.chooseIndex} separator={'blank'} type={'select'} />);
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
                        <GoodsCell isdisable={true} separator={totalView ? 'none':'blank'}/>
                        {totalView}
                    </View>

                );
            }
        }
        return (
            <View></View>
        );
    }

    render() {
        return (
            <View style={{ height: windowHeight, flexDirection: 'column-reverse' }}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRows}
                    style={{ width: windowWidth}}
                />
            </View>
        );
    }
}
