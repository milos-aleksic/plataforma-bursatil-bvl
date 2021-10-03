<template>
    <div class="uk-form">

        <!-- Buscador y Filtro  Nacion o Internacional -->
        <div class="search-top-bar uk-padding-small uk-background-secondary">

            <div data-uk-grid>
                
                <div class="uk-flex">
                    <!-- Buscador -->
                    <div class="uk-width-expand">
                        <div class="uk-inline uk-width-1-1">
                            <span class="uk-form-icon uk-text-bold" uk-icon="icon: search"></span>
                            <input type="text" name="keysearch" class="uk-input uk-width-1-1 uk-border-pill">
                        </div>
                    </div>

                    <div class="uk-width-auto uk-flex uk-flex-middle uk-flex-right">
                        <button class="uk-border-rounded uk-margin-left uk-button uk-button-alternative">Buscar</button>
                        <ul class="uk-subnav uk-subnav-pill uk-margin-remove">
                            <li class="uk-active" @click="setFilter('companyLocation.Local')">
                                    <a href="#">Perú</a>
                            </li>
                            <li data-uk-tooltip="Instrumentos de otros países" 
                                 @click="setFilter('companyLocation.Internacional')">
                                    <a href="#"><i class="fa fa-globe-americas fa-2x"></i> </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- Filter & Sort  -->
            <h5 class="uk-white">Precio de acción</h5>
            <div class="uk-width-auto uk-flex uk-flex-middle">
                <input class="uk-input" type="number" v-model="minValue" placeholder="Mayor a 0">
                <input class="uk-input" type="number" v-model="maxValue" placeholder="Sin Limite">
            </div>

        </div>

        <!-- <div class="box">filter presidents <br>
            <label for="name">name: </label>
            <input type="text" class="input" v-model="filterObj.presidentName" @keyup="filterPresidents">
            
            <label for="name">party: </label>
            <select class="input" @change="filterPresidents" v-model="filterObj.partyAffiliation"> 
                <option  v-for="(party, key) in parties" :value="party" :key="key">{{ party }}</option>
            </select>
        </div> -->
    </div>
</template>

<script>

import { listFilter } from './FilterItemsHelper'
import { dataResume } from '../../store/dataStreamRV'

console.log('dataResume', dataResume)
console.log('listFilter', listFilter)

export default {

    name: 'FilterItems',
    props: ['filterProps'],

    data () {
        return {
            minValue: '',
            maxValue: ''
        }
    },
    methods: {
        setFilter( param ) {
            console.log('setFilter', param)
            const params = param.split('.')
            listFilter.value[params[0]] = params[1]
            // filterList()
        }
    },
    computed: {
        filteredBlogs: function(){
            return this.blogs.filter((blog) => {
                return blog.title.match(this.search);
            });
        }
    }
}
</script>

<style lang="css" scoped>
</style>
