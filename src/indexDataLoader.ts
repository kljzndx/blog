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
                else {
                    const idH1 = item.src.indexOf('# ');
                    if (idH1 != -1) {
                        const idRn = item.src.indexOf("\n", idH1);
                        title = item.src.slice(idH1 + 2, idRn == -1 ? undefined : idRn).trim();
                    }
                    else
                        title = "无标题";
                }

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