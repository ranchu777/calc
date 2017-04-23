var Calculator = (function () {
    function Calculator(calc) {
        this.calc = calc;
        this.calcArray = [];
    }

    Calculator.prototype.addToCalc = function (char) {
        this.calcArray.push(char);
    };
    Calculator.prototype.showString = function () {
        var ele = document.getElementById('total');
        ele.innerHTML = this.calcArray.join("");
    };
    Calculator.prototype.calcResults = function () {
        var ele = document.getElementById('total');
        var total = this.calculate();
        console.log(total);
        //totalString = totalString.replace('X','*');
        try {
            if (total) {
                ele.innerHTML = eval(total).toString();
            }
            else {
                ele.innerHTML = 'Error';
            }
        }
        catch (error) {
            ele.innerHTML = 'Error';
        }
        this.calcArray = [];
    };
    Calculator.prototype.calculate = function () {
        var group = '';
        var resultArray = [];
        var result = '';
        for (var i = 0; i < this.calcArray.length; i++) {
            var char = this.calcArray[i];
            if ((char >= '0' && char <= '9') || char == '.') {
                group += char;
                if (i == this.calcArray.length - 1) {
                    resultArray.push(parseFloat(group));
                    group = '';
                }
            }
            else {
                if (group) {
                    resultArray.push(parseFloat(group));
                }
                resultArray.push(char);
                group = '';
            }
        }
 
        console.log(resultArray);
        result = this.calcStringByOrder(resultArray);
        return result;
    };
    Calculator.prototype.calcStringByOrder = function (arr) {
        var success = true;
        var result = '';
        for (var i = 0; i < arr.length; i++) {
            if ((isNaN(arr[0]) || isNaN(arr[arr.length - 1])) && arr[0] != '(' && arr[arr.length - 1] != ')') {
                alert('failed');
                success = false;
                break;
            }
            if (arr[i] == '^') {
                var numBefore = arr[i - 1];
                var numAfter = arr[i + 1];
                if (numAfter == '(') {
                    var group = '';
                    var countBreaces = 0;
                    for (var j = i + 1; j < arr.length; j++) {
                        group += arr[j];
                        if (arr[j] == '(') {
                            countBreaces++;
                        }
                        else if (arr[j] == ')') {
                            countBreaces--;
                            if (!countBreaces) {
                                arr.splice(i + 1, j - i);
                                numAfter = parseFloat(eval(group));
                                console.log(group);
                                console.log(numAfter);
                                break;
                            }
                        }
                    }
                }
                arr.splice(i + 1, 1);
                arr.splice(i - 1, 1);
                i -= 1;
                arr[i] = eval('Math.pow(' + numBefore + ',' + numAfter + ')');
            }
            if (arr[i] == 'X') {
                arr[i] = '*';
            }
        }
        if (success) {
            result = eval(arr.join("")).toString();
        }
        return result;
    };
    Calculator.prototype.clean = function () {
        var ele = document.getElementById('total');
        this.calcArray = [];
    };
    Calculator.prototype.del = function () {
        this.calcArray.pop();
    };
    Calculator.prototype.addClickEvents = function () {
        var elements = document.getElementsByClassName('item-clickable');
        var _loop_1 = function () {
            console.log(elements[_i]);
            var _this = this_1;
            elements[_i].addEventListener('click', function (e) {
                var text = this.innerText;
                if (text != 'C' && text != '=' && text != '^' && text != 'del') {
                    _this.addToCalc(text);
                    _this.showString();
                }
                else {
                    if (text == 'C') {
                        _this.clean();
                        _this.showString();
                    }
                    else if (text == '=') {
                        _this.calcResults();
                    }
                    else if (text == '^') {
                        _this.addToCalc(text);
                        _this.showString();
                    }
                    else if (text == 'del') {
                        _this.del();
                        _this.showString();
                    }
                }
            });
        };
        var this_1 = this;
        for (var _i = 0; _i < elements.length; _i++) {
            _loop_1();
        }
    };
    return Calculator;
}());
;
var calc = new Calculator("Hello, world!");

calc.addClickEvents();
//# sourceMappingURL=calc.js.map