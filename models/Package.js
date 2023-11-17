import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    fullName: String,
    usercnic: String,
    userEmail: String,
    contactNo: String,
    isMember: Boolean,
    package: [
        {
            packageID: String,
            sourceCity: String,
            destinationCity: String,
            destPostalCode: String,
            destAddress: String,
            packageWeight: String,
            dimensions: String,
            isSensitive: String,
            estimatedCost: Number,
            isDelivered: Boolean,
            path: {
                type: [String]
            }
        }
    ]
});

const Package = mongoose.model("Package", packageSchema);
export default Package;