<template>

    <div class="uk-width-expand">
        <div class="uk-h4 cat-txt uk-margin-small-bottom uk-margin-remove-adjacent uk-text-bold">

            <span class="uk-display-block uk-text-muted uk-text-small" style="line-height: 15px;">
                <!-- <span class="uk-display-block uk-text-small">({{ computedGradeSum }})</span> -->
                {{sectorDescription}}
            </span>

            <!-- // TICKER NAME - NEMONICO -->
            <span class="uk-position-relative">
                {{nemonico}} <span class="uk-text-small uk-text-muted">({{ segment }})</span>
            </span>

            <div class="uk-display-block uk-text-muted uk-text-small uk-margin-remove" style="line-height: 15px;">
                {{shortName}}
            </div>

        </div>
    </div>	

</template>

<script>
export default {

  name: 'TickerCompanyHeadingInfo',
  props: ['sectorDescription', 'nemonico', 'shortName', 'segment'],
  data () {
    return {

    }
  }
}
</script>

<style lang="css" scoped>
</style>