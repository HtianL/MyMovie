<template>
<div class="cinema_body">
	<loading v-if="isLoading"/>
	<ul>
		<li v-for="item in cinemaList" :key="item.id">
			<div>
				<span>{{item.nm}}</span>
				<span class="q"><span class="price">{{item.sc}}</span> 元起</span>
			</div>
			<div class="address">
				<span>{{item.addr}}</span>
				<span>{{item.distance}}</span>
			</div>
			<div class="card">
				<div>1</div>
       		</div>
		</li>
	</ul>
</div>
</template>

<script>
export default {
	name:'cmList',
	data(){
		return {
			cinemaList:[],
			isLoading:true
		}
	},
	activated(){
		var cityId = this.$store.state.city.id;
        if(this.preCityId === cityId){return}
        this.isLoading = true;
		this.axios.get("/api/cinemaList?cityId="+cityId).then((res)=>{
			var msg = res.data.msg;
			if(msg === 'ok'){
				this.isLoading = false;
				this.cinemaList = res.data.data.cinemas;
			}
		});
	}
}
</script>

<style scoped>
#content .cinema_body {
    flex: 1;
    overflow: auto;
}

.cinema_body ul {
    padding: 20px;
}

.cinema_body li {
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 20px;
}

.cinema_body div {
    margin-bottom: 10px;
}

.cinema_body .q {
    font-size: 11px;
    color: #90d7ec;
}

.cinema_body .price {
    font-size: 18px;
}

.cinema_body .address {
    font-size: 13px;
    color: #666;
}

.cinema_body .address span:nth-of-type(2) {
    float: right;
}

.cinema_body .card {
    display: flex;
}

.cinema_body .card div {
    padding: 0 3px;
    height: 15px;
    line-height: 15px;
    border-radius: 2px;
    color: #f90;
    border: 1px solid #f90;
    font-size: 13px;
    margin-right: 5px;
}

.cinema_body .card div.or {
    color: #f90;
    border: 1px solid #f90;
}

.cinema_body .card div.bl {
    color: #589daf;
    border: 1px solid #589daf;
}

</style>
