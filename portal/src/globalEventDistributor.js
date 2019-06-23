export class GlobalEventDistributor {

    constructor() {
        this.stores = [];
    }

    registerStore(store) {
        this.stores.push(store);
    }

    dispatch(event) {
        this.stores.forEach((s) =>{
            s.dispatch(event)
        } );
    }

    // 获取所有模块当前的对外状态
    getState() {
        let state = {};
        this.stores.forEach((s) => {
            let currentState = s.getState();
            state[currentState.namespace] = currentState
        });
        return state
    }
}