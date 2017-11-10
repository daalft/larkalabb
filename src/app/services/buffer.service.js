/**
 * Created by David on 10/20/2016.
 */
System.register(["@angular/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var BufferService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            BufferService = (function () {
                function BufferService(bufferfunction, buffersize) {
                    this.bufferFunction = bufferfunction;
                    this.bufferSize = buffersize;
                    this.buffer = [];
                    this.init();
                }
                BufferService.prototype.init = function () {
                    var me = this;
                    for (var i = 0; i < this.bufferSize; i++) {
                        this.bufferFunction().subscribe(function (data) {
                            me.buffer.push(data);
                        });
                    }
                };
                BufferService.prototype.ready = function () {
                    return this.buffer.length == this.bufferSize;
                };
                BufferService.prototype.next = function () {
                    if (!this.ready()) {
                        console.error("buffer not ready!");
                        return;
                    }
                    if (this.buffer.length == 0) {
                        console.error("buffer empty!");
                        return;
                    }
                    var nextElement = this.buffer.pop();
                    this.buffer.push(this.bufferFunction());
                    return nextElement;
                };
                BufferService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [Object, Number])
                ], BufferService);
                return BufferService;
            }());
            exports_1("BufferService", BufferService);
        }
    }
});
//# sourceMappingURL=buffer.service.js.map