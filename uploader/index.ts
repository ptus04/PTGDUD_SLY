import "dotenv/config";
import { put } from "@vercel/blob";
import fs from "node:fs";

const base = "../fec/public/";

const files = fs
  .readdirSync(base)
  .filter((file) => fs.lstatSync(`${base}${file}`).isFile());

const numFiles = files.length;
let numUploaded = 0;
let total = 0;
let totalUploaded = 0;
let percentage = 0;
let lastUploadedFile = "Not uploaded";
let lastUploadedUrl = "Not uploaded";

let uploadProgresses = Array.from({ length: numFiles }, () => 0);

const printProgress = () => {
  totalUploaded = uploadProgresses.reduce((acc, loaded) => acc + loaded, 0);
  percentage = (totalUploaded / total) * 100;

  const totalMBFormatted = (total / (1024 * 1024)).toFixed(2);
  const totalMBUploadedFormatted = (totalUploaded / (1024 * 1024)).toFixed(2);
  const percentageFormatted = percentage.toFixed(2);

  process.stdout.clearLine(0);
  process.stdout.moveCursor(0, -1);
  process.stdout.clearLine(0);

  process.stdout.write(
    `\rUploading ${numUploaded}/${numFiles} files... ${percentageFormatted}% (${totalMBUploadedFormatted}MB of ${totalMBFormatted}MB)`
  );
  process.stdout.write(
    `\r\nLast uploaded file: ${lastUploadedFile} (${lastUploadedUrl})`
  );
};

const uploadFile = async (i: number) => {
  const file = files[i];
  const data = fs.readFileSync(`${base}${file}`);
  total += data.length;

  const { url } = await put(`img/${file}`, data, {
    access: "public",
    addRandomSuffix: false,
    onUploadProgress: ({ loaded }) => {
      uploadProgresses[i] = loaded;
      printProgress();
    },
  });

  numUploaded++;
  lastUploadedFile = file;
  lastUploadedUrl = url;
};

const uploadPromises: Promise<void>[] = [];
for (let i = 0; i < numFiles; i++) {
  uploadPromises.push(uploadFile(i));
}

(async () => {
  console.log();

  await Promise.all(uploadPromises);
  printProgress();

  console.log("\nAll files uploaded successfully.");
  process.exit(0);
})();
