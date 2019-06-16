<template>
    <div class="scroller" ref="scroller">
        <slot></slot>
    </div>
</template>

<script>
import Bscroll from 'better-scroll';
export default {
    name:"scroller",
    mounted(){
        var scroll = new Bscroll(this.$refs.scroller,{
            tap:true,
            probeType: 1
        })
        this.scroll = scroll
    },
    methods:{
        ToScrollTop(y){
            this.scroll.scrollTo(0,y)
        }
    }
}
</script>

<style scoped>
    .scroller{
        height:100%;
    }
</style>
