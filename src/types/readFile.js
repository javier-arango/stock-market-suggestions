"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var promises_1 = require("fs/promises");
/** Read JSON file */
var readJSON = function () { return __awaiter(void 0, void 0, void 0, function () {
    var buffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, promises_1.readFile)("../data/stock_data.json", {
                    encoding: "utf-8"
                })];
            case 1:
                buffer = _a.sent();
                // Retrun unprocessed data
                return [2 /*return*/, JSON.parse(buffer)];
        }
    });
}); };
/** Find the investment ating  */
var findInvestmentRating = function (datum) {
    // Stock rating
    var rating = 0;
    var dayCount = 0;
    // Find stock rating
    datum.forEach(function (data) {
        var dayGap = data.price - data.dcf;
        rating += dayGap;
        dayCount++;
    });
    return rating / dayCount;
};
/** Process the data from json file */
var getProcessedData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var obj, dataMap, stocks, index;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, readJSON()];
            case 1:
                obj = _a.sent();
                dataMap = new Map();
                stocks = [];
                index = 0;
                obj.forEach(function (data) {
                    if (!dataMap.has(data.ticker)) {
                        // Add value if the key is not in the map
                        dataMap.set(data.ticker, index);
                        // Add values to the stock obj
                        stocks.push({
                            investmentRating: index,
                            ticker: data.ticker,
                            name: data.name,
                            data: []
                        });
                        index++;
                    }
                    // Add values to the datum obj
                    stocks[dataMap.get(data.ticker)].data.push({
                        date: data.date,
                        price: data.price,
                        dcf: data.dcf
                    });
                });
                // Calculate the investing rating
                dataMap.forEach(function (data) {
                    stocks[data].investmentRating = findInvestmentRating(stocks[data].data);
                });
                console.log(stocks);
                // Return processed data
                return [2 /*return*/, stocks];
        }
    });
}); };
var printData = function (data, row, col) {
    for (var i = 0; i < row; i++) {
        console.log(data[i].name, data[i].investmentRating);
        for (var j = 0; j < col; j++) {
            console.log(data[i].data[j]);
        }
    }
};
var get = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        getProcessedData();
        return [2 /*return*/];
    });
}); };
get();
exports["default"] = getProcessedData;
