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

import { windowWidth, windowHeight } from '../ViewSrc/Common/CommonDefined'
import { LineView } from '../ViewSrc/Common/CommonView'
import { ShopsCell, GoodsCell } from '../ViewSrc/Cells/GoodsCarCells'

export default class GoodsCar extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            sectionFooterHasChanged: (section1, section2) => section1 !== section2
        })
        this.state = {
            isEdited: false,
            dataSource: ds.cloneWithRowsAndSections([['row1', 'row12', 'row13', 'row14'], ['row2', 'row22'], ['row3', 'row32']]),
        }
    }

    _renderRows = (rowData, sectionID, rowID) => {
        if (rowID == 0) {
            return (
                <View>
                    {this._renderFooter(rowID, sectionID)}
                    <ShopsCell isEdited={false} shopName={rowData} />
                </View>
            );
        } else {
            let isSoldOut = false; 
            let isSoldText = null;
            if(!(rowData.indexOf('row3'))) {
                isSoldOut = true;
                isSoldText = <Text style={{backgroundColor:'rgba(255,255,255,0.15)', color:'white'}}>售罄</Text>;
            }
            return (
                <GoodsCell isdisable={isSoldOut} imageText={isSoldText}/>
            )
        }
    }

    _renderFooter = (rowID = 0, sectionID = 0) => {
        if (rowID == 0) {
            return (
                <View style={{ width: windowWidth, height: 10, backgroundColor: '#EFEFF4' }} />
            )
        } else {
            return null;
        }
    }

    _renderLine = (sectionID, rowID) => {
        if (rowID == 0) {
            return (<LineView viewType={'row'} key={`${sectionID}-${rowID}`} />);
        } else {
            return (
                <LineView viewType={'row'} leftBlank={15} rightBlank={15} key={`${sectionID}-${rowID}`} />
            );
        }
    }

    render() {

        console.log(this.state.dataSource);
        //未编辑状态
        return (
            <View style={{ height: windowHeight, flexDirection: 'column-reverse' }}>
                <BottomView />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRows}
                    style={{ width: windowWidth, height: windowHeight - 49 - 64 }}
                    renderSeparator={this._renderLine}
                    renderFooter={this._renderFooter}
                />
            </View>
        );
    }
}

/**
 * 
 * 最下层结算View
 * @class BottomView
 * @extends {Component}
 */
class BottomView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAll: false,
        }
    }

    _handleSelectedAllButtonPress(selected) {
        this.setState({ selectedAll: !selected })
    }

    _handleAccountButtonPress() {
    }

    render() {
        return (
            <View style={{ backgroundColor: '#FAFAFA', flexDirection: 'row', alignItems: 'center', height: 49, justifyContent: 'space-between' }}>
                <TouchableWithoutFeedback onPress={() => this._handleSelectedAllButtonPress(this.state.selectedAll)}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                        <Image source={(this.state.selectedAll ? { uri: 'circle-check-selected' } : { uri: 'circle-unselected' })}
                            style={{ width: 19, height: 19 }}
                            resizeMode={'contain'}
                        />
                        <Text style={{ marginLeft: 5, fontSize: 13 }}>全选</Text>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => this._handleAccountButtonPress()}>
                        <View style={{ backgroundColor: '#2AC1BC', width: 140, height: 49, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#FFFFFF' }}>结算（10）</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ marginRight: 9, fontSize: 13 }}>合计
                        <Text style={{ color: '#FF3600', fontSize: 16 }}> ¥220.00</Text>
                    </Text>
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