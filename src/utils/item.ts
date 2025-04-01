import { FileEntry, FileType, Extension, isExtension } from '@/types/fileTypes';

export class Item {
  id: number;
  type: FileType;
  parentId: number | null;
  name: string;
  isFavorite: boolean;
  extension?: Extension;
  children?: Item[];

  constructor(file: FileEntry) {
    this.id = file.id;
    this.type = file.type;
    this.parentId = file.parentId;
    this.name = file.name;
    this.isFavorite = file.isFavorite;

    if (file.type === 'file') {
      const ext = file.name.split('.').pop();
      if (ext && isExtension(ext)) {
        this.extension = ext;
      }
    }
  }

  isImage(): boolean {
    return this.type === 'file' && [Extension.jpg, Extension.gif].includes(this.extension!);
  }

  static buildTree(items: FileEntry[]): Item[] {
    const itemMap = new Map<number, Item>();
    const rootItems: Item[] = [];

    items.forEach((item) => {
      itemMap.set(item.id, new Item(item));
    });

    items.forEach((item) => {
      const currentItem = itemMap.get(item.id)!;
      if (item.parentId === null) {
        rootItems.push(currentItem);
      } else {
        const parent = itemMap.get(item.parentId);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(currentItem);
        }
      }
    });

    return rootItems;
  }
}
