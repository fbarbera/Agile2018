var app = new Vue({
    el: '#app',
    data: {
      message: 'You loaded this page on ' + new Date().toLocaleString()
    }
  })

  Vue.component('form-reclamo',{
      template:'<form><div class="form-row"><span class="input-group-text" >Entre</span></div></form>'
  });