"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = void 0;
const tslib_1 = require("tslib");
const rest_1 = require("@loopback/rest");
const stripe = require('stripe')('sk_test_51KNvwbEJpWsAdIis7wFCphGLtyuGuTJP3KVVKSghL9HVt8xHHEpFNCP9qIIKYAmlJtq0vQ7C5xAIawQPtVHRpTAd00bMlOuTdi');
const { v4: uuidv4 } = require('uuid');
const idempotencykey = uuidv4();
class StripeController {
    constructor() { }
    async hello(data) {
        const { product, token } = data;
        console.log('token', token.email);
        console.log('product', product);
        console.log('Key', idempotencykey);
        let status, error;
        try {
            const customer = await stripe.customers.create({
                name: 'hizbu',
                email: token.email,
                source: token.id,
            });
            const chrgeobj = {
                amount: product.price * 100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchased the ${product.name}`,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip,
                    },
                },
            };
            const charge = await stripe.charges.create(chrgeobj, () => { });
            status = 'success';
            error = charge;
        }
        catch (error) {
            console.error('Error:', error);
            status = 'failure';
            error = error;
        }
        return { status, error };
    }
}
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/payment'),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], StripeController.prototype, "hello", null);
exports.StripeController = StripeController;
//       .then((customer: any) => {
//         stripe.charges
//           .create(
//             {
//               amount: product.price * 100,
//               currency: 'usd',
//               customer: customer.id,
//               reciept_email: token.email,
//               description: `purchase of ${product.name}`,
//               shipping: {
//                 name: token.card.name,
//                 address: {
//                   country: token.card.address_country,
//                 },
//               },
//             },
//             {idempotencykey},
//           )
//           .then((result: any) => {
//             return result;
//           })
//           .catch((err: any) => console.log(err));
//       });
//     return 'this is testing from backend';
//   }
// }
//# sourceMappingURL=stripe.controller.js.map