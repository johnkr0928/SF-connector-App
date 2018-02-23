
/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': 'lib/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'app',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/material': 'npm:@angular/material/material.umd.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',
            'ng2-material': 'npm:ng2-material',
            'carousel': 'app/common/caroussel.component',
            'angular2-data-table': "npm:angular2-data-table",
            'ng2-pagination': "npm:ng2-pagination",
            'ng2-lightning': "npm:ng2-lightning",
            'ng2-google-charts': "npm:ng2-google-charts",
            'ng2-toastr/ng2-toastr': 'ng2-toastr',
            'ng2-toasty/ng2-toasty': 'ng2-toasty',
            'ng2-popup': 'node_modules/ng2-popup/dist'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'ng2-material': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'angular2-data-table': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'ng2-pagination': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'ng2-lightning': {
                main: './index.js',
                defaultExtension: 'js'
            },
             'ng2-google-charts': {
             main: './index.js',
            defaultExtension: 'js'
             },
             'ng2-toastr': {
                 main: 'bundles/ng2-toastr.js',
                 defaultExtension: 'js'
             },
             'ng2-toasty': { "defaultExtension": "js" },
             'ng2-popup': { main: 'ng2-popup.umd.js', defaultExtension: 'js' }
        }
    });
})(this);
