import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Navigator,
    Image,
} from 'react-native';

import Details from './Details'
import GoodsCar from './GoodsCar'
import Order from './Order'

const nativeImageSource = require('nativeImageSource');

export default class GoodsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdited: false
        }
    }

    _handleBackPress() {
        this.props.navigator.pop();
    }

    _handleNextPress(nextRoute) {
        this.props.navigator.push(nextRoute);
    }

    render() {
        const detailsRoute = {
            component: Details,
            title: '商品详情',
            navigationBarHidden: true
        };
        const goodsCarRoute = {
            component: GoodsCar,
            title: '购物车',
            barTintColor: '#FFFFFF',
            tintColor: 'black',
            leftButtonIcon: nativeImageSource({
                ios: 'return_icon_black',
                width: 10,
                height: 18
            }),
            onLeftButtonPress: () => this._handleBackPress(),
            rightButtonTitle: '编辑',
            passProps: { isEdited: this.state.isEdited },
            onRightButtonPress: () => {

            }
        };

        let dataArr = {
            pay: [
                { content: '收货方式', data: ['添加收货地址', '现场自提'] },
                { content: '优惠券', data: ['使用优惠券：满100减10'] },
                { content: '支付方式', data: [{ name: '支付宝', iconUri: 'zhifubao' }, { name: '微信支付', iconUri: 'weixin' }] },
            ],
            bill: [
                '开具发票',
                { name: '类型', types: ['公司', '个人'] },
                '抬头'
            ],
            goods1: [
                '邮购甄选店', 'row1', 'row2'
            ],
            goods2: [
                '千岛湖甄选店', 'row1', 'row2'
            ]
        }
        const orderRoute = {
            component: Order,
            title: '订单确认',
            barTintColor: '#FFFFFF',
            tintColor: 'black',
            passProps: {
                datas: dataArr
            },
            leftButtonIcon: nativeImageSource({
                ios: 'return_icon_black',
                width: 10,
                height: 18
            }),
            onLeftButtonPress: () => this._handleBackPress(),
        };

        return (
            <View>
                <View>
                    <TouchableHighlight onPress={() => this._handleNextPress(detailsRoute)}>
                        <Text style={{ marginTop: 200, alignSelf: 'center' }}>
                            点击进入详情…
                        </Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight onPress={() => this._handleNextPress(goodsCarRoute)}>
                        <Text style={{ marginTop: 100, alignSelf: 'center' }}>
                            点击进入购物车…
                        </Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <TouchableHighlight onPress={() => this._handleNextPress(orderRoute)}>
                        <Text style={{ marginTop: 100, alignSelf: 'center' }}>
                            点击进入订单详情…
                        </Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
