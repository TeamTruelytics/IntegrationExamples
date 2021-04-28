"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTruelyticsUrl = exports.getBaseUrl = void 0;
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
var environment_1 = require("./environments/environment");
function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
exports.getBaseUrl = getBaseUrl;
function getTruelyticsUrl() {
    return 'https://embed.truelytics.com';
}
exports.getTruelyticsUrl = getTruelyticsUrl;
var providers = [
    { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
    { provide: 'TRUELYTICS_EMBED_URL', useFactory: getTruelyticsUrl, deps: [] }
];
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic(providers).bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map