function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    function mul(str) {
        let a = +str.match(/^\d+\.?\d*/)[0];
        let b = +str.match(/\-?\d+\.?\d*$/)[0];  
        if (/e/.test((a/b) + '') || /e/.test((a*b) + '')) return 0;
        if (/\*/.test(str)) return (a*b) + '';
        if (b === 0) throw new Error("TypeError: Division by zero.");
        return (a/b) + '';
    }
    function add(str) {
        let a = +str.match(/^\-?\d+\.?\d*/)[0];
        let b = +str.match(/\-?\d+\.?\d*$/)[0];
        if (/\-{2}/.test(str)) return (a-b) + '';
        return (a+b) + '';
    }

    function calc(str) {
        let res = str;
        // do all multiplications and divisions
        while (/\*|\//.test(res)) {
            res = res.replace(/\d+\.?\d*(\*|\/)\-?\d+\.?\d*/, mul(res.match(/\d+\.?\d*(\*|\/)\-?\d+\.?\d*/)[0]));
        }
        // do all additions and subtractions
        while (/\d(\+|\-)/.test(res)) {
            res = res.replace(/\-?\d+\.?\d*(\+|\-)\-?\d+\.?\d*/, add(res.match(/\-?\d+\.?\d*(\+|\-)\-?\d+\.?\d*/)[0]));
        }
        return res;
    }
    
    let res = expr.replace(/ /g, '');
    
    while (/\([\d\+\-\*\/\.]+\)/.test(res)) {
        res = res.replace(/\([\d\+\-\*\/\.]+\)/, calc(res.match(/\([\d\+\-\*\/\.]+\)/)[0].slice(1, -1))).replace(/\+\-{2}/g, '+').replace(/\-{3}/g, '-');
    }
    
    if (/\(|\)/.test(res)) throw new Error("ExpressionError: Brackets must be paired");
    res = calc(res);

    return +res;
}

module.exports = {
    expressionCalculator
}