const theme = {
    colors: {
        red: '#ff5470',
        green: '#00ebc7'
    },
    Input: {
        inputContainerStyle: {
            borderBottomWidth: 0,
            padding: 0,
            marginHorizontal: -10
        },
        inputStyle: {
            borderWidth: 2,
            borderRadius: 10,
            margin: 0,
            paddingHorizontal: 10
        },
        labelStyle: {
            marginBottom: 4,
            color: '#6B7280',
            fontWeight: 'regular',
            fontFamily: 'Poppins-SemiBold'
        },
        placeholderTextColor: '#fff',
        errorStyle: {
            margin: 0
        }
    },
    ListItem: {
        containerStyle: {
            marginHorizontal: 15,
            marginVertical: 6,
            borderRadius: 10,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 6,
            borderWidth: 2,
            borderColor: '#000',
            borderBottomWidth: 2
        }
    },
    Button: {
        titleStyle: {
            fontFamily: 'Poppins-Regular'
        }
    },
    Text: {
        style: {
            fontFamily: 'Poppins-Regular'
        }
    }
}

export default theme;