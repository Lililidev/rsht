import { create } from 'zustand';
import { ApiError } from '@/types/fileTypes';
import { Item } from '@/utils/item';
import mockFiles from '@/mocks/hardCodeFile';

interface FileStoreState {
  files: Item[];
  currentFolderId: number | null;
  isLoading: boolean;
  error: ApiError | null;
  itemsMap: Map<number, Item>;
  
  fetchFiles: () => Promise<void>;
  toggleFavorite: (id: number) => void;
  setCurrentFolder: (id: number | null) => void;
  getCurrentFolderFiles: () => Item[];
  getFolderPath: (id: number) => Item[];
  resetError: () => void;
}

export const useFileStore = create<FileStoreState>((set, get) => ({
  files: [],
  currentFolderId: null,
  isLoading: false,
  error: null,
  itemsMap: new Map(),

  fetchFiles: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const items = Item.buildTree(mockFiles);
      
      const itemsMap = new Map<number, Item>();
      const processItem = (item: Item) => {
        itemsMap.set(item.id, item);
        item.children?.forEach(processItem);
      };
      items.forEach(processItem);

      set({ files: items, itemsMap, isLoading: false });
    } catch (error) {
      set({ 
        error: {
          message: error instanceof Error ? error.message : 'Failed to load files',
          status: 500
        },
        isLoading: false 
      });
    }
  },

  toggleFavorite: (id) => {
    const state = get();
    const item = state.itemsMap.get(id);
    if (!item) return;

    item.isFavorite = !item.isFavorite;
    set({ files: [...state.files] }); 
  },

  setCurrentFolder: (id) => set({ currentFolderId: id }),

  getCurrentFolderFiles: () => {
    const { files, currentFolderId, itemsMap } = get();
    if (currentFolderId === null) {
      return files.filter(file => file.parentId === null);
    }
    return itemsMap.get(currentFolderId)?.children || [];
  },

  getFolderPath: (id) => {
    const path: Item[] = [];
    let currentId: number | null = id;
    const { itemsMap } = get();

    while (currentId !== null) {
      const item = itemsMap.get(currentId);
      if (!item) break;
      path.unshift(item);
      currentId = item.parentId;
    }

    return path;
  },

  resetError: () => set({ error: null })
}));