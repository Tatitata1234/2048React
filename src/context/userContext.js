import createGlobalState from "react-create-global-state";

const stringifyUser = localStorage.getItem('user')

const user = JSON.parse(stringifyUser) || {}

const [_useGlobalUser, UserGlobalProvider] = createGlobalState(user)

const useGlobalUser = () => {
  const [globalUser, _setGlobalUser] = _useGlobalUser()

  const setGlobalUser = user => {
    localStorage.setItem('user', JSON.stringify(user))
    _setGlobalUser(user)
  }

  return [globalUser, setGlobalUser]
}

export { useGlobalUser, UserGlobalProvider }
