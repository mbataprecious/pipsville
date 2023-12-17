import nc from 'next-connect';
import database from '../../middleware/database';
import fs from 'fs/promises';
import path from 'path';
import response from '../../apiUtil/reponses';
// import session from '../../../middleware/ironSession';

const handler = nc({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end('internal server error');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('route is not found');
  },
  attachParams: true,
})
  .use(database)
  .get(async (req, res) => {
    try {
      const { query } = req;
      console.log('this is running', { query });
      const subPath = 'utils';
      const fileName = 'yahooapi.json';

      const jsonFilePath = path.join(process.cwd(), 'src', subPath, fileName);
      let totaldata = await fs.readFile(jsonFilePath); //utils\yahooapi.json
      let parsedData = await JSON.parse(totaldata);

      const mappedData = parsedData.quoteResponse.result.reduce((acc, stockdata) => {
        acc[stockdata.symbol] = stockdata;
        return acc;
      }, {});
      let symbolsString = query?.symbols;
      if (typeof symbolsString === 'string') {
        const symbolsArray = symbolsString
          .trim()
          .split(',')
          .map((x) => x.trim());
        console.log({ symbolsArray });
        let queryData = symbolsArray.map((symbol) => mappedData[symbol]).filter((x) => x);
        return response(res, 200, 'success', queryData);
      } else {
        return response(res, 200, 'success', parsedData.quoteResponse.result);
      }
      // console.log({mappedData})
    } catch (err) {
      console.log(err);
      return response(res, 500, err.message, null);
    }
  });

export default handler;
