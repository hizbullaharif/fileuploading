"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImgdbDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'imgdb',
    connector: 'mongodb',
    url: '',
    host: 'localhost',
    port: 27017,
    user: '',
    password: '',
    database: 'imgdb',
    useNewUrlParser: true
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let ImgdbDataSource = class ImgdbDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
ImgdbDataSource.dataSourceName = 'imgdb';
ImgdbDataSource.defaultConfig = config;
ImgdbDataSource = (0, tslib_1.__decorate)([
    (0, core_1.lifeCycleObserver)('datasource'),
    (0, tslib_1.__param)(0, (0, core_1.inject)('datasources.config.imgdb', { optional: true })),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], ImgdbDataSource);
exports.ImgdbDataSource = ImgdbDataSource;
//# sourceMappingURL=imgdb.datasource.js.map