
export default {
  price(value) {
      return String(value).replace(/(.)(?=(\d{3})+$)/g,'$1,');
  }
}



// WEBPACK FOOTER //
// ./src/inc/fmt.js