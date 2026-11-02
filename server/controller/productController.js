import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dataDir = join(dirname(fileURLToPath(import.meta.url)), "../data");

async function readJson(filename) {
    const raw = await readFile(join(dataDir, filename), "utf8");
    return JSON.parse(raw);
}

export const getAll = async (req, res) => {
    try {
        const [products, images] = await Promise.all([
            readJson("products.json"),
            readJson("images.json"),
        ]);

        const resolved = products.map((product) => ({
            ...product,
            image: product.image.map((key) => {
                const src = images[key];
                if (typeof src !== "string") {
                    throw new Error(`Картинка ${key} не найдена`);
                }
                return src;
            }),
        }));

        res.status(200).json(resolved);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
