import {store} from "@/store";

export function requireAuthenticated(to, from, next) {
    !store.state.token ? next('/auth/login') : next();
}


export function requireUnauthenticated(to, from, next) {
    store.state.token ? next('/') : next();
}
