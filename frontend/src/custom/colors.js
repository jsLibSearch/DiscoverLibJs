const customColors = {
	// light_orange: [216, 110, 9],
	header: [49, 53, 49],
	body_bg: [225, 225, 226],
	// darker_orange: [193, 92, 22],
	pink_red: [199, 80, 88],
    off_green: "#91ac7c",
    darker_orange: '#07169c',
    light_orange: '#4459ff'
};




for (let color in customColors) {
    let c = '';
    if (typeof customColors[color] === 'string') {
        c = customColors[color];
    } else {
        c = customColors[color].reduce((hex, color) => {
            return hex + (color+0x10000).toString(16).substr(-2).toUpperCase()
        }, '#');
    }
    customColors[color] = c;
}

module.exports = {
    customColors
}