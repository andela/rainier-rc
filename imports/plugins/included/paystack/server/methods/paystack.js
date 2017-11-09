import { Meteor } from "meteor/meteor";

Meteor.methods({
/**
 * @description: gets API keys from env
 *
 * @return {object} an object containing publicKey and secretKey
 */
  "paystack/getKeys"() {
    return {
      public: process.env.paystackPublicKey,
      secret: process.env.paystackSecretKey
    };
  }
});
