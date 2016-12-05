'use strict';

import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Animated,
    TouchableHighlight,
    Text,
    Platform,
    Picker,
    Image,
} from 'react-native';

export default class SelectBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            animatedHeight: new Animated.Value(0),
            value: this.props.options[0],
        };

        this.onPressCancel = this.onPressCancel.bind(this);
        this.onPressConfirm = this.onPressConfirm.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});

        // slide animation
        if (visible) {
            Animated.timing(
                this.state.animatedHeight,
                {
                    toValue: this.props.height,
                    duration: this.props.duration
                },
            ).start();
        } else {
            this.setState({
                animatedHeight: new Animated.Value(0)
            });
        }
    }

    onPressInput() {
        this.setModalVisible(true);
    }

    onPressCancel() {
        this.setModalVisible(false);
    }

    onPressConfirm() {
        this.picked();
        this.setModalVisible(false);
    }

    picked() {
        if (typeof this.props.onValueChange === 'function') {
            this.props.onValueChange(this.state.value);
        }
    }

    getTitleElement() {
        return (<Text style={[Style.dataText, this.props.customStyles.dataText]}>{this.props.value}</Text>);
    }

    render() {
        let customStyles = this.props.customStyles;

        return (
            <TouchableHighlight
                style={[Style.dateTouch, this.props.style]}
                underlayColor={'transparent'}
                onPress={() => this.onPressInput()}
            >
                <View style={[Style.dateTouchBody, customStyles.dateTouchBody]}>
                    <View style={[Style.input, customStyles.input]}>
                        {this.getTitleElement()}
                        <Image source={this.props.iconSource} style={[Style.icon, customStyles.icon]}/>
                    </View>
                    {this.props.showIcon && <Image
                        style={[Style.dateIcon, customStyles.dateIcon]}
                        source={this.props.iconSource}
                    />}
                    {Platform.OS === 'ios' && <Modal
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {this.setModalVisible(false);}}
                    >
                        <TouchableHighlight
                            style={Style.datePickerMask}
                            activeOpacity={1}
                            underlayColor={'#00000077'}
                            onPress={this.onPressCancel}
                        >
                            <TouchableHighlight
                                underlayColor={'#fff'}
                                style={{flex: 1}}
                            >
                                <Animated.View
                                    style={[Style.datePickerCon, {height: this.state.animatedHeight}, customStyles.datePickerCon]}
                                >
                                    <View style={[Style.picker, customStyles.picker]}>
                                        <Picker
                                            style={[Style.pickerPosition, customStyles.pickerPosition]}
                                            selectedValue={this.state.value}
                                            onValueChange={(option) => {this.setState({value: option})}}>
                                            {this.props.options.map((option) => {
                                                return (
                                                    <Picker.Item label={option} value={option}  key={option}/>
                                                )
                                            })}
                                        </Picker>
                                    </View>



                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={this.onPressCancel}
                                        style={[Style.btnText, Style.btnCancel, customStyles.btnCancel]}
                                    >
                                        <Text
                                            style={[Style.btnTextText, Style.btnTextCancel, customStyles.btnTextCancel]}
                                        >
                                            {this.props.cancelBtnText}
                                        </Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        underlayColor={'transparent'}
                                        onPress={this.onPressConfirm}
                                        style={[Style.btnText, Style.btnConfirm, customStyles.btnConfirm]}
                                    >
                                        <Text style={[Style.btnTextText, customStyles.btnTextConfirm]}>{this.props.confirmBtnText}</Text>
                                    </TouchableHighlight>
                                </Animated.View>
                            </TouchableHighlight>
                        </TouchableHighlight>
                    </Modal>}
                </View>
            </TouchableHighlight>
        )
    }
}

SelectBox.defaultProps = {
    // component height: 216(DatePickerIOS) + 1(borderTop) + 42(marginTop), IOS only
    height: 259,
    // slide animation duration time, default to 300ms, IOS only
    duration: 300,
    confirmBtnText: 'Confirm',
    cancelBtnText: 'Cancel',
    customStyles: {},
    placeholder: '',
    iconSource: {},
};

SelectBox.propTypes = {
    height: React.PropTypes.number,
    duration: React.PropTypes.number,
    confirmBtnText: React.PropTypes.string,
    cancelBtnText: React.PropTypes.string,
    customStyles: React.PropTypes.object,
    onValueChange: React.PropTypes.func,
    value: React.PropTypes.string,
    options: React.PropTypes.array,
    iconSource: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.object]),
};

let Style = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#aaa',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    icon: {
        width: 10,
        height: 6,
        position: 'absolute',
        right: 10,
        top: 21
    },
    dateTouch: {
        width: 142
    },
    dateTouchBody: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dataText: {
        color: '#333'
    },
    placeholderText: {
        color: '#c9c9c9'
    },
    datePickerMask: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#00000077'
    },
    datePickerCon: {
        backgroundColor: '#fff',
        height: 0,
        overflow: 'hidden'
    },
    picker: {
        marginTop: 42,
        borderTopColor: '#ccc',
        borderTopWidth: 1
    },
    pickerPosition: {
        marginTop: -15,
    },
    btnText: {
        position: 'absolute',
        top: 0,
        height: 42,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnTextText: {
        fontSize: 16,
        color: '#46cf98'
    },
    btnTextCancel: {
        color: '#666'
    },
    btnCancel: {
        left: 0
    },
    btnConfirm: {
        right: 0
    },
});

module.exports = SelectBox;