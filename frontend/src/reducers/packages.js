import { GET_PACKAGES, GET_PACKAGE, NEW_SEARCH, LOADING, CLEAR_SEARCH } from '../actions';
// const dev = false;

const defaultSearch = { query: '', packages: [], loading: false }

const packageReducer = (state = defaultSearch, action) => {
    switch(action.type) {
        case GET_PACKAGES:
            const processPackages = (a) => {
                const returnArr = [];
                const scopedPackages = [];
                a.forEach((item) => {
                    if (item.name[0] !== '@') {
                        returnArr.push(item);
                    } else {
                        scopedPackages.push(item)
                    }
                });
                const scoped = { scoped: false };
                while (scopedPackages.length > 0) {
                    const nextScope = scopedPackages.shift();
                    let scope = nextScope.name
                    scope = scope.slice(0, scope.indexOf('/'))
                    if (scoped.hasOwnProperty(scope)) {
                        scoped[scope].push(nextScope)
                        continue;
                    } else {
                        scoped[scope] = [];
                        scoped[scope].push(nextScope);
                        if (scoped.scoped === false) {
                            scoped.scoped = true;
                        }
                        continue;
                    }
                }
                returnArr.push(scoped);
                return returnArr;
            }
            return Object.assign({}, state, {
                packages: processPackages(action.payload),
                loading: false
            });
        case GET_PACKAGE:
            return action.payload.data;
        case NEW_SEARCH:
            return Object.assign({}, state, {
                query: action.text
            })
        case LOADING:
            return Object.assign({}, state, {
                loading: true,
                packages: []
            })
        case CLEAR_SEARCH:
            return defaultSearch
        default:
            return state;
    }
};


export default packageReducer;