Vue.config.devtools = true
Quasar.lang.set(Quasar.lang.es)
new Vue({
  el: '#q-app',
  data: function () {
    return {
      articulo: {
        id: '',
        cantidad: '',
        name: '',
        uniValor: null,
        subtotal: null,
        iva: null,
        total: null,
      },

      cesta: []
    }
  },
  methods: {
    calcularArticuloSubtotal () {
      this.articulo.subtotal = this.articulo.cantidad * this.articulo.uniValor
      this.calcularArticuloIva()
    },
    calcularArticuloIva () {
      this.articulo.iva = this.articulo.subtotal * 0.19
    },
    calcularArticuloTotal () {
      this.articulo.total = this.articulo.subtotal + this.articulo.iva
    },
    addArticuloCesta () {
      this.calcularArticuloSubtotal()
      this.calcularArticuloTotal()
      this.cesta.push(Object.assign({}, this.articulo))
      this.cleanArticulo()
    },
    cleanArticulo () {
      this.articulo.cantidad = ''
      this.articulo.name = ''
      this.articulo.uniValor = null
      this.articulo.subtotal = null
      this.articulo.iva = null
      this.articulo.total = null
    },
  },
})