//创建一个组件为发送action

import React from 'react';
import {View,Text,Button} from 'react-native';
import store from '../../store';
import {sendAction} from '../../action';

export default class Home extends React.Component{
    //发送一个action
    handClick = () => {
        const action = sendAction('这是一个action');
        store.dispatch(action)
    };


    //组件加载完毕时，监听
    componentDidMount(){
        store.subscribe(() => {
            console.log("subscribe:",store.getState())
            this.setState({})
        })
    }

    render(){
        return (
            <View>
                <Text>Home 页面</Text>
                <Button 
                title="点击发送一个action"
                onPress={this.handClick}
                />
            </View>
            
        );
    }


    
}

