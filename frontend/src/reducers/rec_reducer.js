import { GET_RECS, SEARCH_REC, LOADING_RECS, CLEAR_RECS } from '../actions';
// const dev = false;

const defaultRecState = { recs: [], loading: false, query: '' }

const recReducer = (state = defaultRecState, action) => {
    switch(action.type) {
        case GET_RECS:
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
                recs: processPackages(action.payload),
                loading: false
            });
        case SEARCH_REC:
            return Object.assign({}, state, {
                recs: processPackages(action.payload),
                loading: false
            });
        case LOADING_RECS:
            return Object.assign({}, state, {
                loading: true,
                recs: []
            })
        case CLEAR_RECS:
            return defaultRecState
        default:
            return state;
    }
};


export default recReducer;