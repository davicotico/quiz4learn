import { ref, readonly } from 'vue';

const isModalOpen = ref(false);

export function useModal() {
  const openModal = () => {
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  return {
    isModalOpen: readonly(isModalOpen),
    openModal,
    closeModal,
  };
}
