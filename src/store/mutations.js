import {TokenKey} from "@/store/index";

export const mutations = {
    toggleLoggedIn (state) {
        state.isLoggedIn = !state.isLoggedIn;
    },
    updateSlip (state, payload) {
        state.currentSlip = payload.slip;
    },
    deleteSlip (state) {
        state.currentSlip = null;
    },
    deleteToken(state) {
        window.localStorage.removeItem(TokenKey);
        state.token = null;
    },
    updateToken(state, payload) {
        window.localStorage.removeItem(TokenKey);
        state.token = payload.token;
    },
    setError(state, payload) {
        state.error = payload.message;
    },
    deleteError(state) {
        state.error = null;
    }
};

export const ToggleLoggedInMutationType = 'toggleLoggedIn';
export const UpdateSlipMutationType = 'updateSlip';
export const DeleteSlipMutationType = 'deleteSlip';
export const DeleteTokenMutationType = 'deleteToken';
export const UpdateTokenMutationType = 'updateToken';
export const AddHistoryItemMutationType = 'addHistoryItem';
export const SetErrorMutationType = 'setError';
export const DeleteErrorMutationType = 'deleteError';
