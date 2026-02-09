<template>
  <TransitionRoot appear :show="isModalOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-10"
        leave="duration-200 ease-in"
        leave-from="opacity-10"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel
            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
          >
            <DialogTitle as="h3" class="dialog-title">
              {{ title }}
            </DialogTitle>

            <div class="mt-2">
              <slot>
                <p class="text-sm text-gray-500">Sin mensaje</p>
              </slot>
            </div>

            <div class="mt-6 flex gap-2 justify-end">
              <slot name="footer">
                <button
                  type="button"
                  class="btn-danger"
                  @click="closeModal"
                >
                  Aceptar
                </button>
              </slot>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';
import { useModal } from '../composables/dialogs';

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const { isModalOpen, closeModal } = useModal();
</script>
