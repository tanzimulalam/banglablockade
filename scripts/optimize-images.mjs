import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const uploadsDir = path.join(process.cwd(), "public", "uploads");
const optimizedDir = path.join(uploadsDir, "optimized");
const supportedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
const responsiveWidths = [480, 960, 1440];

function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function optimizeImage(inputPath, fileName) {
  const parsed = path.parse(fileName);
  const baseName = parsed.name.replace(/\s+/g, "-").toLowerCase();
  const outputOriginal = path.join(optimizedDir, `${baseName}.webp`);

  await sharp(inputPath).webp({ quality: 82 }).toFile(outputOriginal);

  await Promise.all(
    responsiveWidths.map((width) =>
      sharp(inputPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(path.join(optimizedDir, `${baseName}-${width}.webp`))
    )
  );
}

async function main() {
  ensureDirectory(uploadsDir);
  ensureDirectory(optimizedDir);

  const files = fs.readdirSync(uploadsDir).filter((fileName) => {
    const extension = path.extname(fileName).toLowerCase();
    const filePath = path.join(uploadsDir, fileName);
    return supportedExtensions.includes(extension) && fs.statSync(filePath).isFile();
  });

  if (files.length === 0) {
    console.log("No uploads found for optimization.");
    return;
  }

  for (const fileName of files) {
    const filePath = path.join(uploadsDir, fileName);
    await optimizeImage(filePath, fileName);
  }

  console.log(`Optimized ${files.length} uploaded image(s).`);
}

main().catch((error) => {
  console.error("Image optimization failed:", error);
  process.exit(1);
});
