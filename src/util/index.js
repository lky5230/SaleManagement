//小图标的type所对应的class
export function supportsType(typeNumber) {
    let data = '';
    switch (typeNumber) {
        case 0:
            data = 'decrease_1';
            break;
        case 1:
            data = 'discount_1';
            break;
        case 2:
            data = 'special_1';
            break;
        case 3:
            data = 'invoice_1';
            break;
        case 4:
            data = 'guarantee_1';
            break;
    }
    return data;
}
//评分格式化为数组
export function scoreFormat(score) {
    score = Number.parseFloat(score);
    if(score > 5 || score < 0) return new Error('评分在0~5之间');
    let int = Number.parseInt(score);
    let dot = score - int;
    let arr = ['all', 'all', 'all', 'all', 'all']
    arr = arr.map((item, index) => {
        if (int >= index * 1 + 1) {
            return item;
        } else {
            return 'none';
        }
    });
    if(dot == 0){
        return arr;
    } else if (dot - 0.5 < 0) {
        arr[int] = 'none';
    } else {
        arr[int] = 'half';
    };
    return arr;
}













