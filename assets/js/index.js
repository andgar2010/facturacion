/**
* The Main program "Facturación" program implements an application that
* function with UI "Facturación" to the standard output.
*
* @author  Andrés García <afgarcia0479 at misena.edu.co>
* @version 1.0
* @since   2020-07-08
*/
// Vue.config.devtools = true
Quasar.lang.set(Quasar.lang.es)
new Vue({
  el: '#q-app',
  data: function () {
    return {
      articulo: {
        id: null,
        cantidad: null,
        name: null,
        uniValor: null,
        valorBase: null,
        iva: null,
        total: null,
      },
      cesta: []
    }
  },
  filters: {
    formatCurrency (val) {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(val)
    },
  },
  methods: {
    checkDataInput () {
      let resultString
      let resultNumber
      if (this.articulo.name) {
        resultString = true
      } else {
        this.$q.notify({
          type: 'negative',
          message: `Por favor llenar el nombre articulo`
        })
        resultString = false
      }

      if (this.articulo.cantidad > 0 && this.articulo.uniValor > 0) {
        resultNumber = true
      } else {
        this.$q.notify({
          type: 'negative',
          message: `Por favor llenar completar valores correcto`
        })
        resultNumber = false
      }

      if (resultNumber && resultString) {
        this.$q.notify({
          type: 'positive',
          message: `Guardado el articulo`
        })
        return true
      }
    },
    calcularArticuloValorBase() {
      this.articulo.valorBase = this.articulo.total / 1.19
      this.calcularArticuloIva()
    },
    calcularArticuloIva () {
      this.articulo.iva = this.articulo.total - this.articulo.valorBase
    },
    calcularArticuloTotal () {
      this.articulo.total = this.articulo.cantidad * this.articulo.uniValor
    },
    addArticuloCesta () {
      if (this.checkDataInput()) {
        this.calcularArticuloTotal()
        this.calcularArticuloValorBase()
        this.cesta.push(Object.assign({}, this.articulo))
        this.cleanArticulo()
      }
    },
    cleanArticulo () {
      this.articulo.cantidad = null
      this.articulo.name = null
      this.articulo.uniValor = null
      this.articulo.valorBase = null
      this.articulo.iva = null
      this.articulo.total = null
    },
  },
})