import { GET_RECS, SEARCH_REC, LOADING_RECS } from '../actions';
// const dev = false;

const recReducer = (state = { recs: [], loading: false, query: '' }, action) => {
    switch(action.type) {
        case GET_RECS:
            const processPackages = (a) => {
                const seen = {};
                let noDups = a.filter((item) => {
                    return seen.hasOwnProperty(item.name) ? false : (seen[item.name] = true);
                });
                const scopedPackages = noDups.filter(item => item.name[0] === '@');
                noDups = noDups.filter(item => item.name[0] !== '@')
                let scoped = { scoped: false };
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
                noDups.push(scoped);
                return noDups;
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
                loading: true
            })
        default:
            return state;
    }
};


export default recReducer;