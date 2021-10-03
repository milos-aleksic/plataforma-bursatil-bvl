<template>
    <!-- {{ item }} -->

    <div class="uk-width-auto">

        <div class="uk-margin-small-bottom uk-text-bold uk-text-right" :class="progressClass">

            <!-- Actualizado hace X horas -->
            <span class="uk-display-block uk-text-small uk-text-muted" style="line-height: 15px;">
<!--                 <div v-if="item.lastDate" class="uk-text-muted uk-text-small">
                    {{ item.lastDateFormatted }}
                </div>
                <div v-else class="uk-text-muted uk-text-small">
                    {{ item.previousDateFormatted }}
                </div> -->
                <span v-if="item.last || item.previous">
                    Hace 
                </span>
                <span v-if="item.last">
                    {{ item.sinceLastDate }}
                </span><span v-else-if="item.previous">
                    {{ item.sincePreviousDate }}
                </span>
            </span>

            <!-- Ticker Value -->
            <span v-if="item.last || item.previous">
                {{ item.currency }}
            </span>
            <span class="uk-text-bold uk-h2 uk-margin-remove" :class="progressClass">
                <span v-if="item.last" class="uk-position-relative">
                    {{ item.last }}
                </span><span v-else-if="item.previous">
                    {{ item.previous }}
                </span><span v-else class="uk-text-muted uk-text-small">
                    Sin datos
                </span>
            </span>

            <!-- Value Progress % -->
            <div class=" uk-h6 uk-margin-remove">
                <!-- <span v-if="last" :class="getProgressClass">{{ percentageChange }} %</span> -->
                <span :class="progressClass">{{ formatedVariation }} </span>
            </div>

        </div>
    </div>

</template>

<script>
export default {

	name: 'LastValuesHeading',
	props: [
		'TickerVariation', 
		'formatedVariation',
		'progressClass', 
		'item'
		// 'LastUpdate', 
		// 'PreviousDateFormatted', 
		// 'currency', 
		// 'previous', 
  //       'createdDate',
  //       'createdDateZoned',
  //       'lastDate'
	],
	data () {
		return {

		}
	}
}
</script>

<style lang="css" scoped>
</style>