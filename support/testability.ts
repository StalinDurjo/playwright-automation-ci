import dotenv from "dotenv";
import SimpleScore from "./utils/simple-score";
import RestUtils from "./rest-utils";
dotenv.config();

// loose implementation to judge if pretest setup is required
export const isSetupRequired = async (baseUrl: string) => {
  try {
    let setupRequired: boolean;
    const simpleScore = new SimpleScore(20); // minimum pass percentage
    const restUtil = new RestUtils({ baseUrl });
    restUtil.setBasicAuth(process.env.ADMIN_USERNAME, process.env.ADMIN_PASSWORD);
    const isTaxEnabled = await restUtil.isTaxEnabled();
    simpleScore.addMeasure(isTaxEnabled ? 1 : 0);

    // if simple score passed, then setup is not required
    return (setupRequired = simpleScore.calculate() ? false : true);
  } catch {
    return true; // if condition fails, setup required will be true
  }
};
