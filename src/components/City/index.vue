<template>
<div class="city_body">
	<div class="city_list">
		<loading v-if="isLoading"/>
		<scroller ref="city_scroller">
		<div>
		<div class="city_hot">
			<h2>热门城市</h2>
			<ul class="clearfix">
				<li v-for="item in hotList" :key="item.id" @tap="handleToCity(item.nm,item.id)">{{ item.nm }}</li>
			</ul>
		</div>
		<div class="city_sort" ref="city_sort">
			<div v-for="item in cityList" :key="item.index">
				<h2>{{ item.index }}</h2>
				<ul>
					<li v-for="itemList in item.list" :key="itemList.id" @tap="handleToCity(itemList.nm,itemList.id)">{{itemList.nm}}</li>		
				</ul>
			</div>
		</div>
		</div>
		</scroller>
	</div>
	<div class="city_index">
		<ul>
			<li v-for="(item,index) in cityList" :key="item.index" @touchstart="ToScrollerIndex(index)">{{ item.index }}</li>		
		</ul>
	</div>
</div>
</template>

<script scoped>
export default {
	name:"City",
	data(){
		return {
			cityList:[],
			hotList:[],
			isLoading:true
		}
	},
	mounted(){
		var cityList = window.localStorage.getItem('cityList');
		var hotList = window.localStorage.getItem('hotList');
		if(cityList && hotList){
			this.cityList = JSON.parse(cityList);
			this.hotList = JSON.parse(hotList);
			this.isLoading = false;
		}else{
		this.axios.get("/api/cityList").then((res)=>{
			var cities = res.data.data.cities;
			var { cityList , hotList } = this.formatCityList(cities);
				this.isLoading = false;
				this.cityList = cityList;
				this.hotList = hotList;
				window.localStorage.setItem('cityList',JSON.stringify(cityList));
				window.localStorage.setItem('hotList',JSON.stringify(hotList));
		})
		}
	},
	methods:{
		formatCityList(cities){
			var cityList =[],
				hotList  =[];
			for(var i=0;i<cities.length;i++){
				if(cities[i].isHot === 1){
					hotList.push(cities[i]);
				}
			}
			for(var i=0;i<cities.length;i++){
				//获取第一个字母
				var firstletter = cities[i].py.substring(0,1).toUpperCase();
				if(toList(firstletter)){//新添加的字母
					cityList.push({index:firstletter,list:[{nm:cities[i].nm,id:cities[i].id}]})
				}else{
					for(var j=0;j<cityList.length;j++){
						if(cityList[j].index === firstletter){
							cityList[j].list.push({nm:cities[i].nm,id:cities[i].id})
						}
					}
				}
			}	
			//排序
			cityList.sort((num1,num2)=>{
				if(num1.index < num2.index){
					return -1;
				}else if(num1.index > num2.index){
					return 1;
				}else{
					return 0
				}
			});
			//判断这个字母是否已经存到列表中
			function toList(firstletter){
				for(var i=0;i < cityList.length;i++){
					if(cityList[i].index === firstletter){
						return false;
					}
				}
				return true
			}
			return {
				cityList,
				hotList
			}
		},
		ToScrollerIndex(index){
			var oH2 = this.$refs.city_sort.getElementsByTagName('h2');
			this.$refs.city_scroller.ToScrollTop(-oH2[index].offsetTop)
		},
		handleToCity(nm , id){
			this.$store.commit('city/CITY_INFO',{ nm , id })
			window.localStorage.setItem('newNm',nm);
			window.localStorage.setItem('newId',id);
			//改变到指定的路径
			this.$router.push('/movie/NowPlaying')
		}
	}
}
</script>

<style scoped>
#content .city_body {
    margin-top: 45px;
    display: flex;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
}

.city_body .city_list {
    flex: 1;
    overflow: auto;
    background: #FFF5F0;
}

.city_body .city_list::-webkit-scrollbar {
    background-color: transparent;
    width: 0;
}

.city_body .city_hot {
    margin-top: 20px;
}

.city_body .city_hot h2 {
    padding-left: 15px;
    line-height: 30px;
    font-size: 14px;
    background: #F0F0F0;
    font-weight: normal;
}

.city_body .city_hot ul li {
    float: left;
    background: #fff;
    width: 29%;
    height: 33px;
    margin-top: 15px;
    margin-left: 3%;
    padding: 0 4px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    line-height: 33px;
    text-align: center;
    box-sizing: border-box;
}

.city_body .city_sort div {
    margin-top: 20px;
}

.city_body .city_sort h2 {
    padding-left: 15px;
    line-height: 30px;
    font-size: 14px;
    background: #F0F0F0;
    font-weight: normal;
}

.city_body .city_sort ul {
    padding-left: 10px;
    margin-top: 10px;
}

.city_body .city_sort ul li {
    line-height: 30px;
    line-height: 30px;
}

.city_body .city_index {
    width: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-left: 1px #e6e6e6 solid;
}
</style>
