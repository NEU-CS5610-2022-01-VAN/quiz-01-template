const { JSDOM } = require("jsdom");
const fs = require("fs");
const postcss = require("postcss");

const css = fs.readFileSync("./index.css", "utf8");

let html, dom, document;

describe("Quiz 1 - HTML", () => {
  beforeAll(() => {
    html = fs.readFileSync("./index.html", "utf-8");
    dom = new JSDOM(html);
    document = dom.window.document;
  });

  test("1. The HTML file should have a <title> tag in the <head>", () => {
    const title = document.querySelector("head title");
    expect(title).not.toBeNull();
    expect(title.textContent.length).toBeGreaterThan(0);
  });

  test("2. The HTML file should have a meta description", () => {
    const metaDesc = document.querySelector('meta[name="description"]');
    expect(metaDesc).not.toBeNull();
    expect(metaDesc.getAttribute("content").length).toBeGreaterThan(0);
  });

  test("3. There should be a single <h1> header", () => {
    const headers = document.querySelectorAll("h1");
    expect(headers.length).toBe(1);
  });

  test("4. There should be an <img> with alt attribute", () => {
    const img = document.querySelector("img");
    expect(img).not.toBeNull();
    expect(img.getAttribute("alt").length).toBeGreaterThan(0);
  });

  test("5. There should be an ordered list with at least 5 items", () => {
    const ol = document.querySelector("ol");
    expect(ol.children.length).toBeGreaterThanOrEqual(5);
  });

  test("6. There should be a paragraph with at least 50 words", () => {
    const para = document.querySelector("p");
    expect(para).not.toBeNull();
    expect(para.textContent.split(" ").length).toBeGreaterThanOrEqual(50);
  });

  test("7. There should be a link opening in a new tab with proper rel attribute", () => {
    const link = document.querySelector('a[target="_blank"]');
    expect(link).not.toBeNull();
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  test("8. There should be a div with the class 'colorfull-div'", () => {
    const div = document.querySelector(".colorfull-div");
    expect(div).not.toBeNull();
    expect(div.textContent.length).toBeGreaterThan(0);
  });

  test("9. The index.css file should be linked in the HTML head", () => {
    const linkElem = document.querySelector('head link[rel="stylesheet"]');
    expect(linkElem.getAttribute("href")).toBe("index.css");
  });
});

describe("Quiz 1 - CSS Requirements", () => {
  let root;

  beforeAll(async () => {
    root = await postcss.parse(css);
  });

  test("10. The 'colorfull-div' should have the required styles", () => {
    const colorfullDiv = root.nodes.find(
      (node) => node.selector === ".colorfull-div"
    );
    expect(colorfullDiv).not.toBeUndefined();

    const hasWidth = colorfullDiv.nodes.some((node) => node.prop === "width");
    const hasHeight = colorfullDiv.nodes.some((node) => node.prop === "height");
    const hasBackgroundColor = colorfullDiv.nodes.some(
      (node) => node.prop === "background-color"
    );

    expect(hasWidth).toBe(true);
    expect(hasHeight).toBe(true);
    expect(hasBackgroundColor).toBe(true);
  });
});
