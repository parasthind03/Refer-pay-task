const User = require('../models/user');

exports.createUser = async (req, res, next) => {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(200).json({
			status: 'success',
			user
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

exports.referUser = async (req, res, next) => {
	try {
		const { referId } = req.params;
		const { name } = req.body;
		const mainUser = await User.findOne({ name: name });
		const userToRefer = await User.findById(referId);

		if (!mainUser) {
			throw new Error('There is no user with that name');
		}
		if (!userToRefer) {
			throw new Error('There is no user with that id');
		}

		if (!mainUser.referredUser.includes(userToRefer.id)) {
			mainUser.referredUser.push(userToRefer.id);
			await mainUser.save();

			res.status(200).json({
				status: 'success',
				message: 'You have referred the user!'
			});
		} else {
			throw new Error('You have already referred this user');
		}
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};

exports.pay = async (req, res, next) => {
	try {
		const { id } = req.body;
		const user = await User.findById(id).populate('referredUser');
		if (!user) {
			throw new Error('There is no user with that id');
		}

		// console.log(user);
		user.isPaymentMade = true;
		await user.save();

		if (user.referredUser.length) {
			user.referredUser.map(async (el) => {
				el.totalEarnings += 10;
				await el.save();
			});
		}

		res.status(200).json({
			status: 'success',
			msg: 'Payment made'
		});
	} catch (error) {
		res.status(400).json({
			status: 'fail',
			msg: error.message
		});
	}
};
