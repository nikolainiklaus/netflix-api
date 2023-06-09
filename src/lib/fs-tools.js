import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { readJSON, writeJSON } = fs;

export const dataFolderPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "../data"
);

export const mediaJSONPath = join(dataFolderPath, "media.json");
export const getMedias = () => readJSON(mediaJSONPath);
export const setMedias = (medias) => writeJSON(mediaJSONPath, medias);
