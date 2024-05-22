import fs from "node:fs/promises"
import path from "node:path"

interface menu {
    text: string
    collapsed?: boolean
    link?: string
    items?: menu[]
}

interface Article {
    url: string
    fileName: string
    title: string | null
}

async function loadFiles(dir: string, srcDir: string = "src/") {
    while (dir.indexOf("/") != -1)
        dir = dir.replace("/", "");
    while (srcDir.indexOf("/") != -1)
        srcDir = srcDir.replace("/", "");

    dir += "/";
    srcDir += "/";

    const dirPath = srcDir + dir;
    const files = await fs.readdir(dirPath);
    const result: Article[] = [];

    for (const fn of files) {
        if (fn.slice(fn.lastIndexOf('.') + 1) != "md")
            continue;

        const fileName = fn.slice(0, fn.lastIndexOf('.'));
        const url = "/" + dir + fileName;
        let title: string | null = null;

        if (true) {
            const content = await fs.readFile(path.resolve(srcDir + dir + fn), "utf-8");
            const ymlStart = content.indexOf("---\n") + 4;
            const ymlEnd = content.indexOf("---", ymlStart + 1);

            let titleStart = content.indexOf("title: ", ymlStart) + 7;
            if (titleStart == -1 + 7 || titleStart <= ymlStart || titleStart >= ymlEnd)
                titleStart = content.indexOf("# ") + 2;
            const titleEnd = content.indexOf("\n", titleStart);

            if (titleStart != -1 + 2)
                title = content.slice(titleStart, titleEnd == -1 ? undefined : titleEnd).trim();
        }

        result.push({ url, fileName, title });
    }

    return result;
}

async function loadAsDateTree(dir: string) {
    const result: menu[] = [];

    let yearStr = "";
    let mouthStr = "";

    let yearObj: menu = { text: '', collapsed: true };
    let mouthObj: menu = { text: '', collapsed: true };

    const acs = await loadFiles(dir);

    for (const ac of acs) {
        if (!ac.fileName.match(/\d{4}\-\d{2}\-\d{2}\-.+/)) {
            result.unshift({ text: ac.title ?? ac.fileName, link: ac.url });
            continue;
        }

        const members = ac.fileName.split('-');

        const year = members[0];
        const mouth = members[1];

        if (year != yearStr) {
            yearStr = year;
            mouthStr = "";

            yearObj = {
                text: year,
                collapsed: true,
                items: []
            }

            result.unshift(yearObj)
        }

        if (mouth != mouthStr) {
            mouthStr = mouth;

            mouthObj = {
                text: mouth,
                collapsed: true,
                items: []
            }

            yearObj.items?.push(mouthObj);
        }

        mouthObj.items?.push({
            text: ac.title ?? members[3],
            link: ac.url
        });
    }

    return result;
}

export default {
    loadAsDateTree
}