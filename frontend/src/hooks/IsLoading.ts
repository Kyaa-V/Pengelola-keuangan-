import { ref } from "vue";

interface IisLoading {
    isLoading: boolean;
    onLoading: () => void;
    setLoading: (value: boolean) => void;
}

export const IsLoading: IisLoading = () => {
    const isLoading = ref(false);
    const onLoading = () => {
        isLoading.value = !isLoading.value;
    };
    const setLoading = data => {
        isLoading.value = data;
    };

    return { isLoading, onLoading, setLoading };
};
