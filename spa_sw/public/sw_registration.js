if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register('./sw.js', { scope: './' })
    .then(registration => {
      // 登録成功
      // debugger;
      console.debug(`【SW : register】登録成功 scope:`, registration.scope);
    })
    .catch(error => {
      // 登録失敗
      // debugger;
      console.error(`【SW : register】登録失敗`, error);
    });
}