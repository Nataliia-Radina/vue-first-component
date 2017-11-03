window.onload = function () {
  var a = new Vue({
    el: '.orderLine',
    data: {
      prices: mapFromSomewhere(),
      id_color: "0",
      id_size: "0"
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
    }

  })
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