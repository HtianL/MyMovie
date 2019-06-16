const state = {
    //存放组件之间共享的数据
    nm: window.localStorage.getItem('newNm') || "北京",
    id: window.localStorage.getItem('newId') || 1
}
const mutations = {
    //改变state中的信息
    CITY_INFO(state, playload) {
        state.nm = playload.nm;
        state.id = playload.id;
    }
}
const actions = {

}
export default {
    //解决不同模块的命名冲突问题
    namespaced: true,
    state,
    mutations,
    actions,
}