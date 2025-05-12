// composables/useResizeBus.js
import { ref } from 'vue';

const resizeTick = ref(0);

const triggerResize = () => {
    resizeTick.value++;
};

export function useResizeBus() {
    return {
        resizeTick,
        triggerResize,
    };
}
