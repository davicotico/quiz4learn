import { ref } from 'vue';
import { httpClient } from '@/utils/api';
import { shuffleArray } from '@/utils/utils';
import { URL_QUIZES } from '@/utils/const';

export function useQuizes() {
  const isLoading = ref(false);

  const getQuizData = async (quizName) => {
    let url = URL_QUIZES[quizName];
    isLoading.value = true;
    try {
      const { data } = await httpClient.get(url);
      return shuffleArray(data.results);
    } catch (err) {
      throw new Error(err.message);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    getQuizData,
  };
}
