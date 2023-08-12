/*
 * This script is used for generating the search index of the Belt API
 * Ideally we would like following information:
 *
 * - Module names (h1)
 *   - function names (```res sig)
 */
import unified from "unified";
import markdown from "remark-parse";
import stringify from "remark-stringify";
import slug from "remark-slug";
import glob from "glob";
import path from "path";
import fs from "fs";
import { URL } from 'url';

const pathname = new URL('.', import.meta.url).pathname;
const __dirname = process.platform !== 'win32' ? pathname : pathname.substring(1)

const headers = options => (tree, file) => {
  const headers = [];
  let mainHeader;
  tree.children.forEach(child => {
    if (child.type === "heading" && child.depth === 1) {
      if (child.children.length > 0) {
        mainHeader = child.children.map(element => element.value).join("");
      }
    }
    if (child.type === "heading" && child.depth === 2) {
      if (child.children.length > 0) {
        const id = child.data.id || "";
        const name = child.children.map(element => element.value).join("");
        headers.push({ name, href: id });
      }
    }
  });

  file.data = Object.assign({}, file.data, { headers, mainHeader });
};

const codeblocks = options => (tree, file) => {
  const { children } = tree;
  const codeblocks = {};

  const formatter = value => {
    // Strip newlines and weird spacing
    return value
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .replace(/\(\s+/g, "(")
      .replace(/\s+\)/g, ")");
  };

  children.forEach(child => {
    if (child.type === "code" && child.value) {
      const { meta, lang } = child;
      if (meta === "sig" && lang === "re") {
        if (codeblocks[lang] == null) {
          codeblocks[lang] = [];
        }
        codeblocks[lang].push(formatter(child.value));
      }
    }
  });

  file.data = Object.assign({}, file.data, { codeblocks });
};

const processor = unified()
  .use(markdown, { gfm: true })
  .use(slug)
  .use(stringify)
  .use(headers)
  .use(codeblocks);

const processFile = filepath => {
  const content = fs.readFileSync(filepath, "utf8");
  const result = processor.processSync(content);

  const pagesPath = path.resolve("./pages");
  const relFilepath = path.relative(pagesPath, filepath);
  const parsedPath = path.parse(relFilepath);

  const dataset = {
    headers: result.data.headers,
    signatures: result.data.codeblocks.re,
    href: path.join(parsedPath.dir, parsedPath.name),
    moduleName: result.data.mainHeader
  };
  return dataset;
};

const createIndex = result => {
  // Currently we reorder the data to a map, the key is
  // reflected as the router pathname, as defined by the
  // NextJS router
  return result.reduce((acc, data) => {
    const { signatures = [], moduleName, headers } = data;

    // Sort the headers, but keep type `t` as the first header.
    const headersSorted = [...headers].sort(
      (headerA, headerB) => {
        if (headerA.name === 't') {
          return -1
        } else if (headerB.name === 't') {
          return 1
        } else {
          return headerA.name.localeCompare(headerB.name)
        }
      }
    );

    acc["/" + data.href] = {
      moduleName,
      headers: headersSorted
    };

    return acc;
  }, {});
};

const extractApiIndex = () => {
  const DOCS_DIR = path.join(__dirname, "../pages/docs");
  const DOCS_INDEX_FILE = path.join(__dirname, `../index_data/docs.json`);
  const docsFiles = glob.sync(`${DOCS_DIR}/*.md?(x)`);
  const docsResult = docsFiles.map(processFile);
  const docsIndex = createIndex(docsResult);
  fs.writeFileSync(DOCS_INDEX_FILE, JSON.stringify(docsIndex), "utf8");
};

extractApiIndex();



// v8.0.0 api stuff
