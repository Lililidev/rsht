import { create } from 'zustand';
import { FileEntry, ApiError } from '@/types/fileTypes';
import { Item } from '@/utils/item';
import mockFiles from '@/mocks/hardCodeFile';

interface FileStoreState {
  files: Item[];
  currentFolderId: number | null;
  isLoading: boolean;
  error: ApiError | null;
  fetchFiles: () => Promise<void>;
  toggleFavorite: (id: number) => Promise<void>;
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

  fetchFiles: async () => {
    set({ isLoading: true, error: null });
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const items = Item.buildTree(mockFiles);
      set({ files: items, isLoading: false });
    } catch (error) {
      const apiError: ApiError = {
        message: error instanceof Error ? error.message : 'Failed to load files',
        status: 500,
        timestamp: new Date().toISOString(),
      };
      set({ error: apiError, isLoading: false });
    }
  },

  toggleFavorite: async (id) => {
    set({ isLoading: true });
    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          try {
            set((state) => ({
              files: updateFavorite(state.files, id),
              isLoading: false,
            }));
            resolve();
          } catch (error) {
            console.error('Favorite update error:', error);
            throw error;
          }
        }, 200);
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      const apiError: ApiError = {
        message: 'Failed to toggle favorite',
        status: 400,
        timestamp: new Date().toISOString(),
      };
      set({ error: apiError, isLoading: false });
    }
  },

  setCurrentFolder: (id) => {
    try {
      set({ currentFolderId: id });
    } catch (error) {
      console.error('Folder navigation error:', error);
    }
  },

  getCurrentFolderFiles: () => {
    try {
      const { files, currentFolderId } = get();
      if (currentFolderId === null) return files.filter((file) => file.parentId === null);
      const folder = findItemById(files, currentFolderId);
      return folder?.children || [];
    } catch (error) {
      console.error('Get files error:', error);
      return [];
    }
  },

  getFolderPath: (id) => {
    try {
      const { files } = get();
      const path: Item[] = [];
      let currentId: number | null = id;

      while (currentId !== null) {
        const item = findItemById(files, currentId);
        if (item) {
          path.unshift(item);
          currentId = item.parentId;
        } else {
          currentId = null;
        }
      }
      return path;
    } catch (error) {
      console.error('Get path error:', error);
      return [];
    }
  },

  resetError: () => set({ error: null }),
}));

function updateFavorite(items: Item[], id: number): Item[] {
  return items.map((item) => {
    const newItem = new Item({
      ...item,
      isFavorite: item.id === id ? !item.isFavorite : item.isFavorite,
    });
    if (item.children) {
      newItem.children = updateFavorite(item.children, id);
    }
    return newItem;
  });
}

function findItemById(items: Item[], id: number): Item | undefined {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children) {
      const found = findItemById(item.children, id);
      if (found) return found;
    }
  }
}
