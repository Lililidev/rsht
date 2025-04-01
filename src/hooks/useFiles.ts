import { useEffect } from 'react';
import { useFileStore } from '@/store/fileStore';

export const useFiles = () => {
  const { fetchFiles, isLoading, error } = useFileStore();

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return { isLoading, error };
};