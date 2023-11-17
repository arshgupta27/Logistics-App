import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
    memberID: String,
    memberCnic: String,
    membershipPrice: Number,
    membershipPercentage: Number,
    memb_StartDate: String,
    memb_EndDate: String,
    cardNo: Number,
    cardHolder: String,
    securitykey: Number,
    card_expiryMonth: String,
    card_expiryYear: String
});

const Member = mongoose.model("Member", memberSchema);
export default Member;