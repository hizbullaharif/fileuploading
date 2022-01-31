import {resolveUntil} from '@loopback/core';
import {post, requestBody} from '@loopback/rest';
import {DH_UNABLE_TO_CHECK_GENERATOR} from 'constants';
import {ServerResponse} from 'http';
const stripe = require('stripe')(
  'sk_test_51KNvwbEJpWsAdIis7wFCphGLtyuGuTJP3KVVKSghL9HVt8xHHEpFNCP9qIIKYAmlJtq0vQ7C5xAIawQPtVHRpTAd00bMlOuTdi',
);
const {v4: uuidv4} = require('uuid');
const idempotencykey = uuidv4();
export class StripeController {
  constructor() {}

  @post('/payment')
  async hello(@requestBody() data: any) {
    const {product, token} = data;
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
      const charge = await stripe.charges.create(chrgeobj, () => {});
      status = 'success';
      error = charge;
    } catch (error) {
      console.error('Error:', error);
      status = 'failure';
      error = error;
    }
    return {status, error};
  }
}

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
