

export default {

  Auth: {
    region: 'ap-northeast-1',
    userPoolId: 'ap-northeast-1_KNlSLZHrm',
    userPoolWebClientId: '6bacsgfr4100pf1t4tb9tglmi0',
    identityPoolId: 'ap-northeast-1:9f3c3822-4707-47cc-98d3-67660b368003' ,

    mandatorySignIn: true,
    oauth: {
      domain: 'airticket-console-seec-oki.auth.ap-northeast-1.amazoncognito.com',
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: 'https://console.dev-airticket.seec-oki.com/auth/',
      redirectSignOut: 'https://console.dev-airticket.seec-oki.com/auth/',
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
};
export const dev = {

  Auth: {
    region: 'ap-northeast-1',
    userPoolId: 'ap-northeast-1_SdMlRgBLk',
    userPoolWebClientId: '8tmd58u3mim81qn704eg8d0mk',
    identityPoolId: 'ap-northeast-1:57c25c4f-af77-426e-b4c2-90dc61485755' ,

  //  identityPoolId: 'ap-northeast-1:647af021-af96-4b57-a5bf-88f037b2c988' ,
    mandatorySignIn: true,
    oauth: {
      domain: 'dev-airticket-console-seec-oki.auth.ap-northeast-1.amazoncognito.com',
      scope: ['email', 'openid', 'profile'],
      redirectSignIn: 'http://localhost:3000/auth/',
      redirectSignOut: 'http://localhost:3000/auth/',
      responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
    }
  }
}
