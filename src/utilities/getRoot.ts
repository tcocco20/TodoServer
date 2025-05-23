import path from "node:path";

export const rootPath = path.dirname(require.main?.filename ?? "");

export default rootPath;
