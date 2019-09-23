export default class Client {
  url_base = "/api/";

  off() {
    let url = this.url_base + "off";
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      }
    };
    fetch(url, options);
  }
}
