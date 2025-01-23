import { ref, toValue, watchEffect, type Ref } from 'vue';

export function useFetchJSON<T = string>(
    url: string,
): { data: Ref<T | null>; error: Ref<string | null> } {
    const data: Ref<T | null> = ref(null);
    const error: Ref<string | null> = ref(null);

    const fetchData = () => {
        // reset state before fetching..
        data.value = null;
        error.value = null;

        fetch(toValue(url), {
            cache: 'no-cache',
            method: 'GET',
        })
            .then((response: Response) => {
                if (!response.ok) {
                    throw new Error(`请求时发生错误（${response.status}）`);
                }
                return response.json() as Promise<T>;
            })
            .then((json: T) => (data.value = json))
            .catch((err: any) => (error.value = err));
    };

    watchEffect(() => {
        fetchData();
    });

    return { data, error };
}
