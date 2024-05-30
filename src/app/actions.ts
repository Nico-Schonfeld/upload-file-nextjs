"use server";

import moment from "moment";
import sharp from "sharp";
import fs, { promises } from "fs";

export async function action(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file || file.size === 0) {
    return { error: "No file uploaded", success: false };
  }

  const data = await file.arrayBuffer();
  const buffer = Buffer.from(data);

  const fileNameWithoutExtension = file.name.replace(/\.[^/.]+$/, "");

  const path = `${process.cwd()}/public/tmp/slider-${moment().format()}-${fileNameWithoutExtension}.webp`;

  const initPath = process.cwd();

  await sharp(buffer)
    .resize({
      width: 1920,
      height: 1920,
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality: 75 })
    .toFile(path);

  return {
    error: false,
    success: true,
    relativePath: path.replace(`${initPath}`, ""),
  };
}

export async function deleteSlider(path: string | undefined | null) {
  if (!path) return console.log("NULL");

  try {
    const newPath = `${process.cwd()}${path}`;

    if (newPath && fs.existsSync(newPath)) {
      await promises.unlink(newPath);

      return !fs.existsSync(newPath);
    }

    !fs.existsSync(newPath);

    return console.log({ error: false, success: true });
  } catch (error) {
    console.error(error);
  }
}
