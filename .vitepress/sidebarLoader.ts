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
    title?: string
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
        const url = "/" + dir + (fileName === "index" ? "" : fileName);
        let title: string | undefined = undefined;

        if (true) {
            const content = await fs.readFile(path.resolve(srcDir + dir + fn), "utf-8");

            if (true) {
                const ymlStart = content.indexOf("---");
                const ymlEnd = content.indexOf("---", ymlStart + 3);
                if (ymlStart != -1 && ymlEnd != -1) {
                    const yml = content.slice(ymlStart + 3, ymlEnd).trim();

                    title = yml.match(/title: (?<title>.+)/)?.groups?.["title"];
                    console.log(title);
                }
            }
            if (title == undefined)
                title = content.match(/\# (?<title>.+)/)?.groups?.["title"];
        }

        result.push({ url, fileName, title });
    }

    return result;
}

async function loadAsDateTree(dir: string, isYearDescending: boolean = false, isMouthDescending: boolean = false, isDayDescending: boolean = false) {
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

            if (isYearDescending)
                result.unshift(yearObj);
            else
                result.push(yearObj)
        }

        if (mouth != mouthStr) {
            mouthStr = mouth;

            mouthObj = {
                text: mouth,
                collapsed: true,
                items: []
            }

            if (isMouthDescending)
                yearObj.items?.unshift(mouthObj);
            else
                yearObj.items?.push(mouthObj);
        }

        const dayObj: menu = {
            text: members[2] + "日  " + (ac.title ?? members[3]),
            link: ac.url
        };

        if (isDayDescending)
            mouthObj.items?.unshift(dayObj);
        else
            mouthObj.items?.push(dayObj);
    }

    return result;
}

export default {
    loadAsDateTree
}