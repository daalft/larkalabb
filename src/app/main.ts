///<reference path="../../node_modules/@angular/core/src/application_ref.d.ts"/>

import {AppModule} from "./app.module";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";

enableProdMode();

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);
