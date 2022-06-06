import response from '../apiUtil/reponses';
import Investment from '../models/investment.model';
import Transaction from '../models/transaction.model';
import add from 'date-fns/add';

export const getInvestments = async (req, res) => {
  const { _id } = req.profile;
  try {
    const allInvestments = await Investment.find({ userId: _id }).exec();

    return response(res, 200, 'success', allInvestments);
  } catch (err) {
    return response(res, 500, 'server error', err.message);
  }
};

export const invest = async (req, res) => {
  let invest = new Investment({ user: req.profile._id, status: 'pending', ...req.body });
  try {
    const result = await invest.save();
    if (result) {
      response(res, 200, 'success', result);
    }
  } catch (err) {
    return res;
  }
};

export const getInvestmentDetail = async (req, res) => {
  const { investmentId } = req.params;
  try {
    const investment = await Investment.findById(investmentId).exec();
    if (investment) {
      return response(res, 200, 'success', investment);
    } else {
      return response(res, 404, 'not found', null);
    }
  } catch (err) {
    return response(res, 500, 'server error', err.message);
  }
};

//admin route, admin middleware will be involved
export const approveInvestment = async (req, res) => {
  const { investmentId } = req.params;

  try {
    const investment = await Investment.findByIdAndUpdate(
      investmentId,
      { approvedDate: Date.now(), withDrawalDate: add(new Date(), { days: 30 }) },
      { new: true }
    ).exec();
    if (investment) {
      const transaction = await Transaction.create({
        amount: investment.capital,
        investmentId,
        currentBalance: req.profile.accountBalance,
        type: 'investment',
        userId: req.profile._id,
      });
      return response(res, 200, 'success', transaction);
    }
  } catch (err) {
    return res;
  }
};
