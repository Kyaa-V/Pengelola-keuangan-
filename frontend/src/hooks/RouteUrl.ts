import { useRouter } from "vue-router";

export const useRouteUrl = () => {
    const router = useRouter();

    const replace = (url: string) => {
        router.replace(url);
    };

    const navigate = (url: string) => {
        router.push(url);
    };

    return { replace, navigate };
};
