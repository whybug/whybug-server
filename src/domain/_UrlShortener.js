class UrlShortener {

  get chars() {
    return '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ';
  }

  get base() {
    return this.chars.length();
  }

  shorten(num) {
    if(num > this.base) {
      return this.shorten(Math.floor(num / this.base)) + this.chars[num % this.base];
    } else {
      return this.chars[num];
    }
  }

  expand(short) {
  }

}
