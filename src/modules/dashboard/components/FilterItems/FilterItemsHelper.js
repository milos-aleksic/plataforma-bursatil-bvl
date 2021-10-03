import { ref } from 'vue';
import { starterUpdatedList } from '../../store/dataStreamRV'


export const filteredList = ref([]);

export const listOrder = ref(
    ['sinceLastUpdate']
)
export const listFilter = ref({
    companyLocation: 'Local',
    hasData: true,
    closeValue: [0.0001, 100000]
});


export const rowLimit = ref(20)

export const filterList = () => {

    filteredList.value = starterUpdatedList.value.filter(itemRow => {
        let approved = true

        Object.keys(listFilter.value).map((filterOption) => {
            if (itemRow[filterOption] === undefined) {
                return false
            }
            switch (filterOption)
            {
                default:
                    if (itemRow[filterOption] !== listFilter.value[filterOption]) {
                        approved = false
                    }
                    break

                case 'closeValue':
                    if (itemRow[filterOption] < listFilter.value[filterOption][0] || itemRow[filterOption] > listFilter.value[filterOption][1]) {
                        approved = false
                    }
                    break
            }
        })
        return approved
    })
    console.log('filteredList')
    orderList() 
}

export const orderList = () => {

    switch( listOrder.value[0] ) {
        case 'sinceLastUpdate':
            filteredList.value.sort(function (a, b) {
                if (b.lastUpdateDiffMilisecs == a.lastUpdateDiffMilisecs) {
                    return 0
                }
                if (a.lastUpdateDiffMilisecs > b.lastUpdateDiffMilisecs) {
                    return -1
                }
                if (b.lastUpdateDiffMilisecs > a.lastUpdateDiffMilisecs) {
                    return 1
                }

            })
            break
    }

}

// export const limitList = (pagination = 1) => {
//     rowLimit
// }

