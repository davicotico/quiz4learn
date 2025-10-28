import { ref } from 'vue';
import { httpClient } from '@/utils/api';

export function useOpentrivia() {
  const isLoading = ref(false);

  const getQuizData = async () => {
    isLoading.value = true;
    try {
      const { data } = await httpClient.get('api.php', {
        params: { amount: 5, category: 18, type: 'multiple' },
      });
      return data;
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
