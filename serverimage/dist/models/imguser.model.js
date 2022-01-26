"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imguser = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Imguser = class Imguser extends repository_1.Model {
    constructor(data) {
        super(data);
    }
};
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
        id: true,
        generated: true,
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Imguser.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, repository_1.property)({
        type: 'string',
    }),
    (0, tslib_1.__metadata)("design:type", String)
], Imguser.prototype, "imgname", void 0);
Imguser = (0, tslib_1.__decorate)([
    (0, repository_1.model)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], Imguser);
exports.Imguser = Imguser;
//# sourceMappingURL=imguser.model.js.map