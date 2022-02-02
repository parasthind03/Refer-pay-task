const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		//   Name: string,
		//  Email: String
		//  ReferredUser: User ( current model)
		//  isPaymentMade: Boolean
		//  TotalEarnings: Number
		name: {
			type: String,
			unique: true
		},
		email: {
			type: String,
			unique: true
		},
		isPaymentMade: {
			type: Boolean,
			default: false
		},
		totalEarnings: {
			type: Number,
			default: 0
		},
		referredUser: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'User'
			}
		]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('User', userSchema);
