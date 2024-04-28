const months = ["january","february","march","april","may","june","july","august","september","october","november","december"];

export const convertMonth = (month) => {
    const index = months.indexOf(month.toLowerCase());
    return index + 1;
}

export const convertToMonth = (num) => {
    if(num) {
        const monthStr = months[num-1];
        return `${monthStr.substring(0,1).toUpperCase()}${monthStr.substring(1)}`;
    }
    
}