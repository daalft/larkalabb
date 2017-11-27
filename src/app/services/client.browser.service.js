System.register(["@angular/core"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, ClientBrowserService;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            ClientBrowserService = /** @class */ (function () {
                function ClientBrowserService() {
                }
                /**
                 * JavaScript Client Detection
                 * (C) viazenetti GmbH (Christian Ludwig)
                 */
                ClientBrowserService.getInfo = function () {
                    {
                        var unknown = '-';
                        // screen
                        var screenSize = '';
                        if (screen.width) {
                            var width = (screen.width) ? screen.width : '';
                            var height = (screen.height) ? screen.height : '';
                            screenSize += '' + width + " x " + height;
                        }
                        //browser
                        var nVer = navigator.appVersion;
                        var nAgt = navigator.userAgent;
                        var browser = navigator.appName;
                        var version = '' + parseFloat(navigator.appVersion);
                        var majorVersion = parseInt(navigator.appVersion, 10);
                        var nameOffset = void 0, verOffset = void 0, ix = void 0;
                        // Opera
                        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
                            browser = 'Opera';
                            version = nAgt.substring(verOffset + 6);
                            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                                version = nAgt.substring(verOffset + 8);
                            }
                        }
                        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
                            browser = 'Microsoft Internet Explorer';
                            version = nAgt.substring(verOffset + 5);
                        }
                        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
                            browser = 'Chrome';
                            version = nAgt.substring(verOffset + 7);
                        }
                        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
                            browser = 'Safari';
                            version = nAgt.substring(verOffset + 7);
                            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                                version = nAgt.substring(verOffset + 8);
                            }
                        }
                        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
                            browser = 'Firefox';
                            version = nAgt.substring(verOffset + 8);
                        }
                        else if (nAgt.indexOf('Trident/') != -1) {
                            browser = 'Microsoft Internet Explorer';
                            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
                        }
                        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                            browser = nAgt.substring(nameOffset, verOffset);
                            version = nAgt.substring(verOffset + 1);
                            if (browser.toLowerCase() == browser.toUpperCase()) {
                                browser = navigator.appName;
                            }
                        }
                        // trim the version string
                        if ((ix = version.indexOf(';')) != -1)
                            version = version.substring(0, ix);
                        if ((ix = version.indexOf(' ')) != -1)
                            version = version.substring(0, ix);
                        if ((ix = version.indexOf(')')) != -1)
                            version = version.substring(0, ix);
                        majorVersion = parseInt('' + version, 10);
                        if (isNaN(majorVersion)) {
                            version = '' + parseFloat(navigator.appVersion);
                            majorVersion = parseInt(navigator.appVersion, 10);
                        }
                        // mobile version
                        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);
                        // cookie
                        var cookieEnabled = (navigator.cookieEnabled);
                        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
                            document.cookie = 'testcookie';
                            cookieEnabled = (document.cookie.indexOf('testcookie') != -1);
                        }
                        // system
                        var os = unknown;
                        var clientStrings = [
                            { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
                            { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
                            { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
                            { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
                            { s: 'Windows Vista', r: /Windows NT 6.0/ },
                            { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
                            { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
                            { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
                            { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
                            { s: 'Windows 98', r: /(Windows 98|Win98)/ },
                            { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
                            { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
                            { s: 'Windows CE', r: /Windows CE/ },
                            { s: 'Windows 3.11', r: /Win16/ },
                            { s: 'Android', r: /Android/ },
                            { s: 'Open BSD', r: /OpenBSD/ },
                            { s: 'Sun OS', r: /SunOS/ },
                            { s: 'Linux', r: /(Linux|X11)/ },
                            { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
                            { s: 'Mac OS X', r: /Mac OS X/ },
                            { s: 'Mac OS', r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
                            { s: 'QNX', r: /QNX/ },
                            { s: 'UNIX', r: /UNIX/ },
                            { s: 'BeOS', r: /BeOS/ },
                            { s: 'OS/2', r: /OS\/2/ },
                            { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
                        ];
                        for (var id in clientStrings) {
                            var cs = clientStrings[id];
                            if (cs.r.test(nAgt)) {
                                os = cs.s;
                                break;
                            }
                        }
                        var osVersion = unknown;
                        if (/Windows/.test(os)) {
                            osVersion = /Windows (.*)/.exec(os)[1];
                            os = 'Windows';
                        }
                        switch (os) {
                            case 'Mac OS X':
                                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                                break;
                            case 'Android':
                                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                                break;
                            case 'iOS':
                                var osVersionMatch = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                                osVersion = osVersionMatch[1] + '.' + osVersionMatch[2] + '.' + (osVersionMatch[3] ? osVersionMatch[3] : 0);
                                break;
                        }
                        return {
                            screen: screenSize,
                            browser: browser,
                            browserVersion: version,
                            mobile: mobile,
                            os: os,
                            osVersion: osVersion,
                            cookies: cookieEnabled,
                        };
                    }
                };
                ClientBrowserService = __decorate([
                    core_1.Injectable()
                ], ClientBrowserService);
                return ClientBrowserService;
            }());
            exports_1("ClientBrowserService", ClientBrowserService);
        }
    };
});
//# sourceMappingURL=client.browser.service.js.map