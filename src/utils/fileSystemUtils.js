export const findNode = (path, root) => {
    const parts = path.split('/').filter(part => part !== '');
    let current = root;
    for (let part of parts) {
        if (current.type !== 'folder')
            return null;
        current = current.children.find(child => child.name == part);
        if (!current)
            return null;
    };
    return current;

};
export const createNote = (path, newNode, root) => {
    const parts = path.split('/').filter(part => part !== '');
    let current = root;
    for (let part of parts) {
        if (!current.type !== 'folder')
            return false;
        current = current.children.find(child => child.name == part);
        if (!current)
            return false;
    }
    if (current.type !== 'folder')
        return false;
    current.children.push(newNode);
    return true;
}

export const deleteNode = (path, root) => {
    const parts = path.split('/').filter(part => part !== "");
    let current = root;
    for (let i = 0; i < parts.length - 1; i++) {
        if (current.type !== "folder")
            return false;
        current = current.children.find(child => child.name === parts[i]);
        if (!current)
            return false
    }
    if (current.type !== 'folder') return false;
    const index = current.children.findeIndex(child => child.name === parts[parts.length - 1]);
    if (index === -1)
        return false;
    current.children.splice(index, 1);
    return true;


};

export const renameNode = (path, newName, root) => {
    const parts = path.split('/').filter(part => part !== "");
    let current = root;
    for (let i = 0; i < parts.length - 1; i++) {
        if (current.type !== "folder")
            return false;
        current = current.children.find(child => child.name === parts[i]);
        if (!current)
            return false
    }
    if (current.type !== 'folder') return false;
    const node = current.children.find(child => child.name === parts[parts.length - 1]);
    if (!node)
        return false;
    node.name = newName;
    return true;
};