import React from "react";
import { StyleSheet } from "react-native";
import { SliderHuePicker } from 'react-native-slider-color-picker';
import tinycolor from 'tinycolor2';

export default function ColorPicker({ color, onColorChange}) {
    const changeColor = (colorHsvOrRgb, resType) => {
        if (resType === 'end') {
            onColorChange(tinycolor(colorHsvOrRgb).toHexString());
        }
    }

    return (
        <SliderHuePicker
            oldColor={color}
            trackStyle={[styles.trackStyle]}
            thumbStyle={styles.thumbStyle}
            useNativeDriver={false}
            onColorChange={changeColor}
        />
    );
}

const styles = StyleSheet.create({
    trackStyle: {
        height: 12,
        width: "100%"
    },
    thumbStyle: {
        width: 20,
        height: 20,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 0.35
    }
});