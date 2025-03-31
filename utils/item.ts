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
    try {
      if (!file || typeof file !== 'object') {
        throw new Error('Invalid file data');
      }

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
    } catch (error) {
      console.error('Item creation error:', error);
      throw error;
    }
  }

  isImage(): boolean {
    try {
      return this.type === 'file' && 
             [Extension.jpg, Extension.gif].includes(this.extension!);
    } catch (error) {
      console.error('Image check error:', error);
      return false;
    }
  }

  static isItem(obj: unknown): obj is Item {
    try {
      return obj instanceof Item;
    } catch (error) {
      console.error('Item type check error:', error);
      return false;
    }
  }

  static buildTree(items: FileEntry[]): Item[] {
    try {
      const itemMap = new Map<number, Item>();
      const rootItems: Item[] = [];

      items.forEach(item => {
        const newItem = new Item(item);
        itemMap.set(newItem.id, newItem);
      });

      items.forEach(item => {
        const currentItem = itemMap.get(item.id);
        if (currentItem) {
          if (item.parentId === null) {
            rootItems.push(currentItem);
          } else {
            const parent = itemMap.get(item.parentId);
            if (parent) {
              if (!parent.children) parent.children = [];
              parent.children.push(currentItem);
            }
          }
        }
      });

      return rootItems;
    } catch (error) {
      console.error('Tree build error:', error);
      throw new Error('Failed to build file tree');
    }
  }
}