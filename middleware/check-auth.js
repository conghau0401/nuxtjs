import Amplify, { Auth, Hub } from 'aws-amplify'
import awsconfig, { dev } from '~/aws.config'

function currentUser() {
  return Auth.currentAuthenticatedUser()
    .then(user => {
      console.log('[Check-Auth] authenticated');
      return {
        username: user.username,
        email: user.attributes.email
      }
    })
}

export default function ({ store, isDev, route, redirect }) {
  if (isDev) {
    Amplify.configure(dev);
  } else {
    Amplify.configure(awsconfig);
  }
  console.log('# [middleware] called');
  Hub.listen("auth", ({ payload: { event, data } }) => {
    switch (event) {
      case "signIn":
        console.log('[Check-Auth] Hub event: signIn')
        currentUser()
          .then(user => {
            console.log('[Check-Auth] authenticated');
            store.commit('login/setUser', user)
          })
        break;
      case "signOut":
        console.log('[Check-Auth] Hub event: signout')
        store.commit('login/setUser', null)
        break;
    }
  });

  return currentUser()
    .then(user => {
      console.log('[Check-Auth] authenticated');
      store.commit('login/setUser', user)
    })
    .catch(err => {
      console.log('[Check-Auth] not authenticated');
      console.log(err)
      store.commit('login/setUser', null)

      if (route.name != 'auth') {
        redirect('/auth/');
      }
    });
}


