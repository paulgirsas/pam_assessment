import {MutationTypes} from "@/store/index";
import firebase from 'firebase/app';
import {router} from "@/routing/app.routing";

export const actions = {
    saveHistoryItem(context, payload) {
        const historyItem = payload.item;
        historyItem.created = Date.now().valueOf();
        // TODO: Make call to firebase. update after
        context.commit(MutationTypes.addHistoryItem);
    },
    signUpAction({ commit }, payload) {
        firebase
            .auth()
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                commit(MutationTypes.updateToken, {token: JSON.stringify(response.user)});
                router.push('/auth/login');
            })
            .catch(error => {
                commit(MutationTypes.setError, {message: error.message});
            });
    },
    signInAction ({ commit }, payload) {
        firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                commit(MutationTypes.updateToken, {token: JSON.stringify(response.user)});
                router.push('/');
            })
            .catch(error => {
                commit(MutationTypes.setError, {message: error.message});
            });
    },
};

export const SaveHistoryItemActionType = 'saveHistoryItem';
