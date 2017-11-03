 window.onload = function () {
  Vue.component('variation-select', {
    props:['title', 'data', 'val'],
    template: `<div class="orderLine_variants orderLine">
        <div class="orderLine_title">{{title}}</div>
          <select class="orderLine_size" v-on:input="onUpdate($event.target.value)">
            <option value="0" v-bind:selected="val == 0">Select size</option>
            <option v-for="(item, id_item) in data" v-bind:value="id_item" v-bind:selected="val == id_item">
              {{item.name}}
            </option>
          </select>
      </div>`,
      methods: {
        onUpdate: function (val) {
          console.log(val);
          this.$emit('input', val);
        }
      }
  })

  Vue.component('product', {
    props:['prices', 'onorder'],
    template: `<div>
          <variation-select title="Color" :data="prices" v-model="id_color" :val="id_color"></variation-select>
          <variation-select title="Size" v-if="isColor" v-model="id_size" :data="prices[id_color].sizes" :val="id_color"></variation-select>
          <div class="orderLine_price" v-if="isSize">{{price}}</div>
          <div class="orderLine_button" v-if="isSize" v-on:click="onorder(id_color, id_size)">Add to basket
          </div>
              </div>`,
    data: function ()  {
       return {
          id_color: "0",
          id_size: "0"
       }
    },
    computed: {
      isColor: function () {
        return this.prices[this.id_color] != undefined;
      },
      isSize: function () {
        return this.isColor &&
        this.prices[this.id_color].sizes[this.id_size] != undefined;
      },
      price: function () {
        return this.prices[this.id_color].sizes[this.id_size].price;
      }
    },
  });

  Vue.component('product-container', {
    template: '<product :prices="prices" :onorder="order"></product>',
    data: function () {
      return {
        prices: mapFromSomewhere()
      }
    },
    methods: {
      order: function (id_color, id_size) {
        console.log(id_color);
        console.log(id_size);
      }
    }
  });


  var a = new Vue({
    el: '.orderLine'
  });
}


function mapFromSomewhere () {
  return {
    red: {
      name: "red",
      sizes: {
        s: {
          name: "small",
          price: 759
        },
        m: {
          name: "medium",
          price: 456
        },
        l: {
          name: "large",
          price: 674
        }
      }
    },
      green: {
        name: "green",
        sizes: {
          m: {
            name: "medium",
            price: 456
          },
          l: {
            name: "large",
            price: 674
          }
        }
      },
      blue: {
        name: "blue",
        sizes: {
          s: {
            name: "small",
            price: 759
          },
          m: {
            name: "medium",
            price: 456
          }
        }
      }
  };
}