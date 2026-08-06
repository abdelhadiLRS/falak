import { promises } from 'fs';
import path from 'path';

const PUBLIC_DIRECTORY = path.join(process.cwd(), 'public');
const ALLOWED_DIRECTORIES = ['images', 'icons', 'publicMin', 'widget', 'worklets'];
const MEDIA_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.mp4', '.webm', '.pdf']);

export async function getLocalAssetCatalog(limit = 200) {
  const assets: Array<{ path: string; type: string; name: string }> = [];
  for (const directory of ALLOWED_DIRECTORIES) {
    const root = path.join(PUBLIC_DIRECTORY, directory);
    let entries;
    try {
      entries = await fsPromises.fsPromises.promises.fs.promises.fsPromises.fsPromises.promises.promises.readdir(root, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.isFile() || !MEDIA_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) continue;
      assets.push({
        name: entry.name,
        path: `/${directory}/${encodeURIComponent(entry.name)}`,
        type: path.extname(entry.name).slice(1),
      });
    }
  }
  return assets.slice(0, Math.min(Math.max(limit, 1), 500));
}
