import fs from "node:fs/promises"

interface menu {
    text: string
    collapsed: boolean
    link?: string
    items?: menu[]
}

async function loadAsDateTree(dir: string) {
    const result: menu[] = [];

    let yearStr = "";
    let mouthStr = "";

    let yearObj: menu = { text: '', collapsed: true };
    let mouthObj: menu = { text: '', collapsed: true };

    const files =  await fs.readdir(dir);

    for (const path of files) {
        if (path.slice(path.lastIndexOf('.') + 1) != "md")
            continue;

        let fnId = path.lastIndexOf('\\');
        if (fnId == -1)
            fnId = path.lastIndexOf('/');

        const fileName = path.slice(fnId + 1, path.lastIndexOf('.'));
        if (fileName == "index") {
            result.unshift({ text: "首页", collapsed: false, link: "/tech/" });
            continue;
        }

        const members = fileName.split('-');

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

        const content = await fs.readFile(dir + path, "utf-8");

        const ymlStart = content.indexOf("---\n") + 4;
        const ymlEnd = content.indexOf("---", ymlStart + 1);
        let titleStart = content.indexOf("title: ", ymlStart) + 7;
        if (titleStart == -1 + 7 || titleStart < ymlStart || titleStart >= ymlEnd)
            titleStart = content.indexOf("# ") + 2;

        const titleEnd = content.indexOf("\n", titleStart);

        const title = titleStart == -1 + 2
            ? members[3]
            : content.slice(titleStart, titleEnd == -1 ? undefined : titleEnd);

        mouthObj.items?.push({
            text: title,
            collapsed: true,
            link: "/tech/" + fileName
        });
    }

    return result;
}

export default {
    loadAsDateTree
}