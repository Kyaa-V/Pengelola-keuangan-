import { ref } from "vue";

interface IStoreModal {
  isOpen: boolean;
  onOpen: () => void;
  setOpen: (value: boolean) => void;
}
export const StoreModal:IStoreModal = () => {
  const isOpen = ref(false);
  const onOpen = () => {
    isOpen.value = !isOpen.value;
  };
  const setOpen = (value) => {
    isOpen.value = value;
  };
  return { isOpen, onOpen, setOpen };
};
