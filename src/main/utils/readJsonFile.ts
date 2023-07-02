import { readFileSync } from "fs";
import { join } from "path";

const readJsonFile = () => {
  try {
    const data = readFileSync(
      join("./src/main", "./config", "./config.json"),
      "utf-8"
    );

    const json = JSON.parse(data);

    return json;
  } catch (error) {
    console.log("json解析失败");
    return [];
  }
};

export default readJsonFile;
