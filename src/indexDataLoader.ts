import { createContentLoader } from "vitepress";
import tools from '../.vitepress/tools'

interface page {
    url: string
    title: string
    publishDate: string
}

function loadIndexData(glob: string) {
    return createContentLoader(glob, {
        includeSrc: true,
        transform(raw) {
            const result: page[] = [];

            for (const item of raw) {
                if (!item.src)
                    continue;
                if (item.url.endsWith('/'))
                    continue;

                let publishDate = ""
                let title = ""

                if (item.frontmatter.publishDate)
                    publishDate = item.frontmatter.publishDate;
                else {
                    const pubDate = tools.getPubDateOnPath(item.url);

                    if (pubDate)
                        publishDate = pubDate;
                    else
                        continue;
                }

                if (item.frontmatter.title)
                    title = item.frontmatter.title;
                else
                    title = tools.findLine(item.src, "# ")?.replace("# ", "").trimEnd() ?? "未找到标题";

                result.push({
                    url: item.url,
                    title,
                    publishDate
                })
            }

            return result
        },
    })
}

export default {
    loadIndexData
}