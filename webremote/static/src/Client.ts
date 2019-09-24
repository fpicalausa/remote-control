export default class Client {
  url_base = "/api/";

  _post(endpoint: string) {
    let url = this.url_base + endpoint;
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8"
      }
    };
    fetch(url, options);
  }

  off() {
    this._post("off");
  }

  on() {
    this._post("on");
  }

  async state() {
    const result = await fetch(this.url_base + "state");
    return (await result.json()) as RemoteState;
    /*
   return {
     power: false,
     mode: "auto"
   }
   */
  }
}

export type RemoteState = {
  mode: string;
  power: boolean;
};
