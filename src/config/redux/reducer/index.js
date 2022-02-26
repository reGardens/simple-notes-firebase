const initState = {
    popup: false,
    login: false,
    isLoading: false,
    user: {},
    notes: []
  }
  
  const reducer = (state = initState, action) => {
    if (action.type === 'CHANGE_POPUP') {
      return {
        ...state,
        popup: action.value
      }
    };
    if (action.type === 'CHANGE_LOGIN') {
      return {
        ...state,
        login: action.value
      }
    }
    if (action.type === 'CHANGE_USER') {
      return {
        ...state,
        user: action.value
      }
    }
    if (action.type === 'CHANGE_LOADING') {
      return {
        ...state,
        isLoading: action.value
      }
    }
    if (action.type === 'CHANGE_NOTES') {
      return {
        ...state,
        notes: action.value
      }
    }
    return state
  }

  export default reducer;
  