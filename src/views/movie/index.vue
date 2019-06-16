<template>
    <div id="main">
        <Header title="花千树电影"/>
        <div id="content">
            <div class="movie_menu">
				<router-link class="city_name" to="/movie/City" tag="div">
					<span>{{this.$store.state.city.nm}}</span><i class="iconfont icon-lower-triangle"></i>
				</router-link>
				<div class="hot_swtich">
					<router-link class="hot_item" to="/movie/NowPlaying" tag="div">正在热映</router-link>
					<router-link class="hot_item" to="/movie/ComingSoon" tag="div">即将上映</router-link>
				</div>
				<router-link class="search_entry" to="/movie/Search" tag="div">
					<i class="iconfont icon-sousuo"></i>
				</router-link>
			</div>   
            <keep-alive>
                <router-view/>
            </keep-alive>
            <TabBar /> 
        </div>
        <router-view name="detail"/>
    </div>
</template>

<script>
import Header from "@/components/header" 
import TabBar from "@/components/tabbar"

export default {
    name:"movie",
    components:{
        Header,
        TabBar
    },
    mounted(){
        this.axios.get('/api/getLocation').then((res)=>{
            var msg = res.data.msg;
            if(msg === 'ok'){
                this.nm = res.data.data.nm;
                this.id = res.data.data.id;
                window.localStorage.setItem('newNm',this.nm);
                window.localStorage.setItem('newId',this.id);
                this.$router.push('/movie/NowPlaying')
            }
        })
    }

}
</script>

<style scoped>
#content .movie_menu {
    width: 100%;
    height: 45px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    z-index: 10;
}

.movie_menu .city_name {
    margin-left: 20px;
    height: 100%;
    line-height: 45px;
}
.movie_menu .city_name.active {
    color: #33a3dc;
    border-bottom: 2px #33a3dc solid;
}
.movie_menu .city_name.router-link-active {
    color: #33a3dc;
    border-bottom: 2px #33a3dc solid;
}

.movie_menu .hot_swtich {
    display: flex;
    height: 100%;
    line-height: 45px;
}

.movie_menu .hot_item {
    font-size: 15px;
    color: #666;
    width: 80px;
    text-align: center;
    margin: 0 12px;
    font-weight: 700;
}
.movie_menu .hot_item.active {
    color: #33a3dc;
    border-bottom: 2px #33a3dc solid;
}
.movie_menu .hot_item.router-link-active {
    color: #33a3dc;
    border-bottom: 2px #33a3dc solid;
}

.movie_menu .search_entry {
    margin-right: 20px;
    height: 100%;
    line-height: 45px;
}
.movie_menu .search_entry.active {
    color: #33a3dc;
    border-bottom: 2px #33a3dc solid;
}
.movie_menu .search_entry.router-link-active {
    color: #33a3dc;
    border-bottom: 2px #33a3dc solid;
}

.movie_menu .search_entry i {
    font-size: 24px;
    color: #33a3dc;
}

</style>
