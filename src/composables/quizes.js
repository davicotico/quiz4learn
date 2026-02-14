import { ref } from 'vue';
import { httpClient } from '@/utils/api';
import { shuffleArray } from '@/utils/utils';
import { StorageSerializers, useLocalStorage } from '@vueuse/core';

export function useQuizes() {
  const isLoading = ref(false);
  const categories = useLocalStorage('categories', null, {serializer: StorageSerializers.object});
  const getQuizData = async (quizName) => {
    isLoading.value = true;
    try {
      const { data } = await httpClient.get(quizName + '.json');
      return shuffleArray(data.results);
    } catch (err) {
      throw new Error(err.message);
    } finally {
      isLoading.value = false;
    }
  };

  const getQuizCategories = async () => {
    isLoading.value = true;
    if (categories.value !== null) {
      isLoading.value = false;
      return categories.value;
    }
    try {
      const { data } = await httpClient.get('categories.json');
      categories.value = data;
      return data;
    } catch (err) {
      throw new Error(err.message);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    getQuizData,
    getQuizCategories
  };
}
