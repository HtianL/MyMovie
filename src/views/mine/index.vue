<template>
    <div id="main">
        <Header title="我的账户"/>
        <TabBar />
        <Login/>
    </div>
</template>

<script>
import Header from "@/components/header" 
import TabBar from "@/components/tabbar" 
import Login from "@/components/Login" 
export default {
    name:"mine",
    components:{
        Header,
        TabBar,
        Login
    }
}
</script>

<style>

</style>
