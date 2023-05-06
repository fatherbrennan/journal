import {
  createDir,
  exists,
  readTextFile,
  writeTextFile,
} from '@tauri-apps/api/fs';
import { BaseDirectory, appDataDir, join } from '@tauri-apps/api/path';

/**
 * Get system recognizable file path.
 * @param fileName Name of file.
 * @returns File path.
 */
export const fsPath = async (
  baseDir: () => Promise<string>,
  fileName: string
): Promise<string> => {
  try {
    return await join(await baseDir(), 'data', fileName);
  } catch (error) {
    throw 'fsPathError';
  }
};

/**
 * Recursively create directory.
 * @param baseDir Base directory.
 */
export const fsCreateDir = async (baseDir: BaseDirectory): Promise<void> => {
  try {
    await createDir('data', { dir: baseDir, recursive: true });
  } catch (error) {
    throw 'fsCreateDirError';
  }
};

/**
 * Test if the file exists.
 * @param path File path.
 * @returns True if the file exists.
 */
export const fsExists = async (path: string): Promise<boolean> => {
  try {
    return await exists(path, {
      dir: BaseDirectory.AppData,
    });
  } catch (error) {
    throw 'fsExistsError';
  }
};

/**
 * Read and parse JSON file.
 * @param path Absolute file path.
 * @returns JSON parsed contents.
 */
export const fsReadFile = async <T = any>(path: string): Promise<T> => {
  try {
    return JSON.parse(await readTextFile(path));
  } catch (error) {
    throw 'fsReadError';
  }
};

/**
 * Parse object to valid JSON and write to file.
 * @param path Absolute file path.
 * @param data Data to write to `path`.
 * @returns `data`.
 */
export const fsWriteFile = async <T = any>(
  path: string,
  data: any
): Promise<T> => {
  try {
    await writeTextFile(path, JSON.stringify(data));
    return data;
  } catch (error) {
    throw 'fsWriteError';
  }
};

/**
 * Initialize contact.
 * - Check if an existing file exists
 *   - If true, use data
 *   - If false, create new file and set data as `defaultValue`
 * @param path Relative path name.
 * @param defaultValue Default value for file if no file exists.
 * @returns Data and absolute path in an array.
 */
export const fsInitFromFile = async <T = any>(
  path: string,
  defaultValue: T
): Promise<[T, string]> => {
  try {
    // Get the app data path
    const dataPath = await fsPath(appDataDir, path);

    // Use the data file if one exists
    if (await fsExists(dataPath)) {
      return [await fsReadFile<T>(dataPath), dataPath];
    }

    // Create the data directory
    await fsCreateDir(BaseDirectory.AppData);

    // Create new data file with `defaultValue` as file content
    return [await fsWriteFile<T>(dataPath, defaultValue), dataPath];
  } catch (error) {
    // Assuming error is from parsing JSON

    const dataPath = await fsPath(appDataDir, path);

    // Attempt to create another file
    return [await fsWriteFile<T>(dataPath, defaultValue), dataPath];
  }
};
