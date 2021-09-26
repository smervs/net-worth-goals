export const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const hexToRGB = (hexColor) => {
    return {
        red: (hexColor >> 16) & 0xFF,
        green: (hexColor >> 8) & 0xFF,
        blue: hexColor & 0xFF,
    }
}