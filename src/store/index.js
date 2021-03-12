import Vuex from 'vuex';
import Vue from 'vue';
import {
    AddHistoryItemMutationType, DeleteErrorMutationType,
    DeleteSlipMutationType,
    DeleteTokenMutationType,
    mutations, SetErrorMutationType,
    ToggleLoggedInMutationType,
    UpdateSlipMutationType,
    UpdateTokenMutationType
} from "./mutations";
import {actions, SaveHistoryItemActionType} from "./actions";

Vue.use(Vuex);
export const TokenKey = 'x_token_x';

/**
 * The Vuex store instance.
 * @type {Store<{isLoggedIn: boolean, currentSlip: null}>}
 */
export const store = new Vuex.Store({
    state: {
        currentSlip: null,
        isLoggedIn: false,
        token: window.localStorage.getItem(TokenKey),
        error: null,
        history: []
    },
    mutations,
    actions
});

/**
 * The supported mutation types.
 * @type {{updateSlip: string, deleteSlip: string, toggleLoggedIn: string}}
 */
export const MutationTypes = {
    deleteSlip: DeleteSlipMutationType,
    updateSlip: UpdateSlipMutationType,
    toggleLoggedIn: ToggleLoggedInMutationType,
    deleteToken: DeleteTokenMutationType,
    updateToken: UpdateTokenMutationType,
    addHistoryItem: AddHistoryItemMutationType,
    setError: SetErrorMutationType,
    deleteError: DeleteErrorMutationType
}

export const ActionTypes = {
    saveHistoryItem: SaveHistoryItemActionType
}
