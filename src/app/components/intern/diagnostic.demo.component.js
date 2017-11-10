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
    var DiagnosticDemoComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            DiagnosticDemoComponent = (function () {
                function DiagnosticDemoComponent() {
                    this.page = 1;
                    this.gap = 1;
                }
                DiagnosticDemoComponent.prototype.nextgap = function (event) {
                    if (event.keyCode == 13) {
                        if (this.gap == 1 || this.gap == 3) {
                            this.gap++;
                        }
                    }
                    else {
                        if (this.gap == 1) {
                            $('#ggg2').val($('#ggg1').val());
                        }
                        else if (this.gap == 3) {
                            $('#ggg6').val($('#ggg5').val());
                        }
                    }
                };
                DiagnosticDemoComponent.prototype.nextpage = function (event) {
                    if (event.keyCode == 13) {
                        if (this.gap == 2 || this.gap > 3) {
                            this.gap++;
                            this.page++;
                        }
                    }
                    else if (this.gap == 2) {
                        $('#ggg4').val($('#ggg3').val());
                    }
                    else if (this.gap == 4) {
                        $('#ggg8').val($('#ggg7').val());
                    }
                };
                DiagnosticDemoComponent.prototype.gg1 = function (event) {
                    console.log(event);
                };
                DiagnosticDemoComponent.prototype.keyhandler = function (event) {
                    // 37 <-
                    // 39 ->
                    console.log(event);
                };
                DiagnosticDemoComponent.prototype.ngAfterViewInit = function () {
                    $("#sortable").sortable({
                        placeholder: "ui-state-highlight",
                        forcePlaceholderSize: true
                    });
                    $("#sortable").disableSelection();
                };
                DiagnosticDemoComponent = __decorate([
                    core_1.Component({
                        selector: 'dia-test',
                        templateUrl: 'app/templates/diagnostic-demo.html',
                        styleUrls: ['app/css/molna.css', 'app/css/diagnostic.css']
                    }), 
                    __metadata('design:paramtypes', [])
                ], DiagnosticDemoComponent);
                return DiagnosticDemoComponent;
            }());
            exports_1("DiagnosticDemoComponent", DiagnosticDemoComponent);
        }
    }
});
//# sourceMappingURL=diagnostic.demo.component.js.map