import { ref } from 'vue';


const startList = ref([]);
const liveList = ref([]);

export const setLiveList = updates => {
    startList.value = updates.filter().sort();
};

export default {
    dataStream
};