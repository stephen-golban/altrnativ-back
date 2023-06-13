import mongoose from "mongoose";

const _user = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    abonnement_id: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      default: "",
    },
    accepted_info: {
      type: Boolean,
      default: false,
    },
    accepted_terms: {
      type: Boolean,
      default: false,
    },
    payment_method: {
      type: String,
      default: "",
    },
    card_cvc: {
      type: String,
      default: "",
    },
    card_number: {
      type: String,
      default: "",
    },
    card_holder_name: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", _user);

export default User;
