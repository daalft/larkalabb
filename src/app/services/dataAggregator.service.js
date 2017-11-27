System.register(["@angular/core", "./logger.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, logger_service_1, DataAggregatorService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            }
        ],
        execute: function () {
            DataAggregatorService = /** @class */ (function () {
                function DataAggregatorService(logger) {
                    this.logger = logger;
                    this.dataBuffer = [];
                    // turn on autoFlush with default interval of 1 minute
                    this.setAutoFlush(true);
                }
                DataAggregatorService.prototype.getUserInfo = function () {
                    this.logger.getUserInfo();
                };
                DataAggregatorService.prototype.aggregate = function (type, data, id) {
                    // automatically add timestamp
                    var now = new Date();
                    var obj = {
                        'type': type,
                        'data': data,
                        'id': id,
                        'timestamp': now
                    };
                    this.dataBuffer.push(obj);
                };
                DataAggregatorService.prototype.setAggregator = function (obj) {
                    obj['timestamp'] = new Date();
                    this.currentAggregator = obj;
                };
                DataAggregatorService.prototype.addInformation = function (key, val) {
                    if (!this.currentAggregator[key]) {
                        this.currentAggregator[key] = val;
                    }
                    else {
                        var buffer = this.currentAggregator[key];
                        if (typeof buffer === 'string' || buffer instanceof String) {
                            this.currentAggregator[key] = [];
                            this.currentAggregator[key].push(buffer);
                            this.currentAggregator[key].push(val);
                        }
                        else {
                            this.currentAggregator[key].push(val);
                        }
                    }
                };
                DataAggregatorService.prototype.closeAggregator = function () {
                    this.dataBuffer.push(this.currentAggregator);
                    this.currentAggregator = null;
                    this.flush();
                };
                DataAggregatorService.prototype.flush = function () {
                    if (this.dataBuffer.length == 0) {
                        //console.log("Nothing to flush");
                        return;
                    }
                    // send buffered data via logger service to database
                    for (var i = 0; i < this.dataBuffer.length; i++) {
                        this.logger.log(this.dataBuffer[i], this.mode);
                    }
                    this.dataBuffer = [];
                };
                DataAggregatorService.prototype.setAutoFlush = function (autoflush, intervalSeconds) {
                    if (intervalSeconds === void 0) { intervalSeconds = 60; }
                    if (!autoflush && !this.autoFlushProcessID) {
                        console.error("Autoflush already off");
                        return;
                    }
                    if (autoflush) {
                        this.autoFlushProcessID = window.setInterval((function (self) {
                            return function () {
                                self.flush();
                            };
                        })(this), 1000 * intervalSeconds);
                    }
                    else {
                        clearInterval(this.autoFlushProcessID);
                    }
                };
                DataAggregatorService.prototype.setLogType = function (s) {
                    this.mode = s;
                };
                DataAggregatorService = __decorate([
                    core_1.Injectable(),
                    __metadata("design:paramtypes", [logger_service_1.LoggerService])
                ], DataAggregatorService);
                return DataAggregatorService;
            }());
            exports_1("DataAggregatorService", DataAggregatorService);
        }
    };
});
//# sourceMappingURL=dataAggregator.service.js.map