import { ref } from 'vue';
import { httpClient } from '@/utils/api';
import { shuffleArray } from '@/utils/utils';

export function useQuizes() {
  const isLoading = ref(false);

  const getQuizData = async (quizName) => {
    isLoading.value = true;
    try {
      const { data } = await httpClient.get('data/' + quizName + '.json');
      return shuffleArray(data.results);
    } catch (err) {
      throw new Error(err.message);
    } finally {
      isLoading.value = false;
    }
  };

  const getQuizCategories = async () => {
    isLoading.value = true;
    try {
      const { data } = await httpClient.get('data/categories.json');
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
