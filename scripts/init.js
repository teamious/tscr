var fs = require('fs-extra');
var path = require('path');

module.exports = function(projectRoot, packagePath) {
    var appPackagePath = path.resolve(projectRoot, 'package.json')
    var appPackage = require(appPackagePath)
    appPackage.scripts = {
        build: 'webpack',
        start: 'webpack-dev-server',
    }

    fs.writeFileSync(appPackagePath, JSON.stringify(appPackage, 0, 2));

    fs.copySync(
        path.resolve(packagePath, 'template'),
        path.resolve(projectRoot)
    );
};