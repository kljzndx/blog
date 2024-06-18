function getPubDateOnPath(path: string): string | undefined {
    const rp = path
    const idFile = rp.lastIndexOf('/');
    const idExt = rp.lastIndexOf('.');
    
    const fn = rp.slice(idFile == -1 ? 0 : idFile + 1, idExt == -1 ? undefined : idExt);
    if (fn.match(/\d{4}\-\d{2}\-\d{2}\-.+/))
        return fn.slice(0, 10);
    return undefined;
}

export default {
    getPubDateOnPath
}