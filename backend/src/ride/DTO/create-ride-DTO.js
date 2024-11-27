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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRideDTO = void 0;
const class_validator_1 = require("class-validator");
const NotMatch_decorator_1 = require("../../decorator/NotMatch.decorator");
class CreateRideDTO {
    customer_id;
    origin;
    destination;
    driver_id;
    constructor(customer_id, origin, destination, driver_id) {
        this.customer_id = customer_id,
            this.origin = origin,
            this.destination = destination,
            this.driver_id = driver_id;
    }
}
exports.CreateRideDTO = CreateRideDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "O ID de usuário não pode estar vazio!" }),
    __metadata("design:type", Number)
], CreateRideDTO.prototype, "customer_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "O ID de usuário não pode estar vazio!" }),
    __metadata("design:type", String)
], CreateRideDTO.prototype, "origin", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "O ID de usuário não pode estar vazio!" }),
    (0, NotMatch_decorator_1.NotMatch)('origin', { message: "O local de destino não pode ser igual ao local de origem!" }),
    __metadata("design:type", String)
], CreateRideDTO.prototype, "destination", void 0);
