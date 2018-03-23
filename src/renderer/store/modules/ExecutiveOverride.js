const state = {
    disabledLeftTarget: true,
    disabledRightTarget: true,
    disabledLeftCoolingFan: true,
    disabledRightCoolingFan: true,
    disabledReactorTarget: true,
    disabledReactorBlower: true,
};

const getters = {
    getDisabledState: state => {
        return state;
    },
};

const mutations = {
    disableAllInputs: (state) => {
        state.disabledLeftTarget = true
        state.disabledRightTarget = true
        state.disabledLeftCoolingFan = true
        state.disabledRightCoolingFan = true
        state.disabledReactorTarget = true
        state.disabledReactorBlower = true
    },
    enableAllInputs: (state) => {
        state.disabledLeftTarget = false
        state.disabledRightTarget = false
        state.disabledLeftCoolingFan = false
        state.disabledRightCoolingFan = false
        state.disabledReactorTarget = false
        state.disabledReactorBlower = false
    },
};

const actions = {
    // Dialogue actions
    disableAllInputs: ({
        commit
    }) => {
        commit('disableAllInputs');
    },
    enableAllInputs: ({
        commit
    }) => {
        commit('enableAllInputs');
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}