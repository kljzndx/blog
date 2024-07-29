function getPubDateOnPath(path: string): string | undefined {
    const rp = path
    const idFile = rp.lastIndexOf('/');
    const idExt = rp.lastIndexOf('.');

    const fn = rp.slice(idFile == -1 ? 0 : idFile + 1, idExt == -1 ? undefined : idExt);
    if (fn.match(/\d{4}\-\d{2}\-\d{2}\-.+/))
        return fn.slice(0, 10);
    return undefined;
}

function findLine(str: string, start: string, lineNumberLimit: number = 20): string | null {
    const lines = str.split('\n', lineNumberLimit);

    for (const line of lines) {
        const trimLine = line.trim();

        if (trimLine.startsWith(start))
            return trimLine;
    }

    return null;
}

export default {
    getPubDateOnPath, 
    findLine,
}