import React, { useEffect, useState } from "react";
import { View, Animated, TouchableOpacity, Dimensions , StyleSheet} from 'react-native';
import { Icon } from "react-native-elements";

export default function TabBar({ state, descriptors, navigation }) {
    const [translateValue] = useState(new Animated.Value(0));
    const totalWidth = Dimensions.get("window").width;
    const tabWidth = totalWidth / state.routes.length;

    const animateSlider = (index: number) => {
        Animated.spring(translateValue, {
            toValue: index * tabWidth,
            velocity: 10,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        animateSlider(state.index);
    }, [state.index]);

    // console.log(descriptors[route.key])
    return (
        <View style={{ flexDirection: 'row' }}>
            <Animated.View
                style={[
                    style.slider,
                    {
                        transform: [{ translateX: translateValue }],
                        width: tabWidth - 50,
                    },
                ]}
            />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        // The `merge: true` option makes sure that the params inside the tab screen are preserved
                        navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center',
                        padding: 4
                    }}
                    >
                        {options.tabBarIcon({ color: '#673ab7', focused: isFocused})}
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const style = StyleSheet.create({
    tabContainer: {
        height: 60,
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4.0,
        backgroundColor: "white",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        elevation: 10,
        position: "absolute",
        bottom: 0,
    },
    slider: {
        width: 50,
        padding: 10,
        height: "82%",
        position: "absolute",
        opacity: 0.4,
        top: "10%",
        left: 25,
        backgroundColor: "#3A36D5",
        borderRadius: 50,
    },
});