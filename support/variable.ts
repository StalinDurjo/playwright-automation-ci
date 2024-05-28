import path from "path";
import dotenv from "dotenv";
dotenv.config();

export const ROOT_DIR = path.resolve(process.cwd());
export const TEST_DIRECTORY = `${ROOT_DIR}/tests`;
export const MOCK_DATA_DIRECTORY = `${ROOT_DIR}/mock-data`;

// The following directories are created during application runtime
export const OUT_DIR = `${ROOT_DIR}/out`;
export const WP_DIR = `${OUT_DIR}/wp`;
export const REPORT_DIRECTORY = `${ROOT_DIR}/reports`;

export const GLOBAL_ADMIN_USERNAME = process.env.ADMIN_USERNAME;
export const GLOBAL_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
