export const login = (user = null) => {
  return(dispatch) => {
    if(user) {
      dispatch(setUser(user))
    } else {
      $.ajax({
        url: '/api/users/info',
        type: 'GET',
        dateType: 'JSON',
        async: false
      }).done( user => {
        dispatch(setUser(user))
      })
    }
  }
}

export const logout = (router) => {
  return (dispatch) => {
    dispatch(setUser())
    $.ajax({
      url: '/users/sign_out',
      type: 'DELETE',
      async: false
    }).done( user => {
      router.push('/')
    }).fail( err => {

    })
  }
}

const setUser = (user = {}) => {
  return { type: 'USER', ...user }
}
