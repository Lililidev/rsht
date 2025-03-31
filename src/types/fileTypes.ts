export enum Extension {
  'doc' = 'doc',
  'xls' = 'xls', 
  'pdf' = 'pdf',
  'jpg' = 'jpg',
  'png' = 'png',
  'gif' = 'gif'
}

export type FileType = 'dir' | 'file';

export interface FileEntry {
  id: number;
  type: FileType;
  parentId: number | null;
  name: string;
  isFavorite: boolean;
  extension?: Extension;
}

export interface ApiError {
  message: string;
  status?: number;
  timestamp?: string;
}

export function isExtension(ext: string): ext is Extension {
  return Object.values(Extension).includes(ext as Extension);
}