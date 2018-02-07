import { GET_PACKAGES, GET_PACKAGE, NEW_SEARCH, LOADING } from '../actions';
// const dev = false;

const packageReducer = (state = { query: '', packages: [], loading: false }, action) => {
    switch(action.type) {
        case GET_PACKAGES:
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
                loading: true
            })
        default:
            return state;
    }
};


export default packageReducer;