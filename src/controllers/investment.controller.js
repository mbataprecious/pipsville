import response from '../apiUtil/reponses';
import Investment from '../models/investment.model';
import Transaction from '../models/transaction.model';
import User from '../models/user.model';
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
  let invest = new Investment({ userId: req.profile._id, status: 'pending', ...req.body });
  try {
    const result = await invest.save();
    if (result) {
      response(res, 200, 'success', result);
    }
  } catch (err) {
    return response(res, 500, 'failure', null);
  }
};
export const updateInvt = async (req, res) => {
  try {
    const invtId = req.query.investmentId;

    console.log(req.investment);
    let invest = await Investment.findByIdAndUpdate(invtId, req.body, { new: true });

    return response(res, 200, 'success', invest);
  } catch (err) {
    return response(res, 500, 'failure', err);
  }
};
export const deleteInvt = async (req, res) => {
  try {
    const invtId = req.investment._id;
    console.log(req.investment);
    let invest = await Investment.findByIdAndDelete(invtId);
    return response(res, 200, 'deleted successfully', invest);
  } catch (err) {
    return response(res, 500, 'failure', null);
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
export const attachInvestment = async (req, res, next) => {
  const { investmentId } = req.query;

  try {
    const investment = await Investment.findById(investmentId).lean();
    if (investment) {
      req.investment = investment;
      next();
    } else {
      return response(res, 404, 'not found', null);
    }
  } catch (err) {
    return response(res, 500, 'server error', err.message);
  }
};
//admin route, admin middleware will be involved
export const approveInvestment = async (req, res) => {
  const investmentId = req.investment._id;

  try {
    const session = await req.db.startSession();
    await session.withTransaction(async () => {
      const investment = await Investment.findByIdAndUpdate(
        investmentId,
        { approvedDate: Date.now(), status: 'active', withDrawalDate: add(new Date(), { days: 30 }).toISOString() },
        { session, new: true }
      ).exec();

      await Transaction.create(
        [
          {
            amount: investment.capital,
            investmentId,
            currentBalance: req.profile.accountBalance,
            type: 'investment',
            userId: req.profile._id,
          },
        ],
        { session }
      );
    });

    await session.commitTransaction();
    session.endSession();
    return response(res, 200, 'investment approved');
  } catch (err) {
    return response(res, 500, 'failure', null);
  }
};

export const dailyRio = async (req, res) => {
  const userId = req.profile._id;
  const investmentId = req.investment._id;
  const daily = req.body.daily;
  const currentBalance = req.profile.accountBalance;

  try {
    //save user
    const session = await req.db.startSession();
    await session.withTransaction(async () => {
      await Transaction.create(
        [
          {
            userId,
            investmentId,
            amount: Number(daily),
            type: 'daily',
            currentBalance: Number(currentBalance + daily),
          },
        ],
        { session, new: true }
      );
      await Investment.findByIdAndUpdate(investmentId, { $inc: { daysCount: 1 } }, { session });
      await User.findByIdAndUpdate(
        userId,
        { $inc: { accountBalance: Number(daily) } },
        {
          session,
          new: true,
          runValidators: true,
        }
      );
    });
    await session.commitTransaction();
    session.endSession();

    return response(res, 200, 'daily rio is added', null);
  } catch (err) {
    return response(res, 500, 'server error', err.message);
  }
};
