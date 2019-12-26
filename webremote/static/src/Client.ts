export default class Client {
    url_base = '/api/';

    _fetch(method: 'POST' | 'PUT' | 'DELETE' | 'GET', headers: Object, endpoint: string, json?: any) {
        let url = this.url_base + endpoint;
        let options: any = {
            method,
            headers: {
                'Accept': 'application/json',
                ...headers,
            },
        };

        if (json) {
            options.body = JSON.stringify(json);
        }

        return fetch(url, options);
    }

    _delete(endpoint: string) {
        return this._fetch('DELETE', {}, endpoint);
    }

    _put(endpoint: string, json?: any) {
        return this._fetch('PUT', { 'Content-Type': 'application/json;charset=UTF-8' }, endpoint, json);
    }

    _post(endpoint: string, json?: any) {
        return this._fetch('POST', { 'Content-Type': 'application/json;charset=UTF-8' }, endpoint, json);
    }

    off() {
        this._post('off');
    }

    on() {
        this._post('on');
    }

    mode(mode: RemoteMode) {
        this._post('mode', { mode });
    }

    fan(speed: RemoteFanSpeed) {
        this._post('fan', { speed });
    }

    temperature(temperature: number) {
        this._post('temperature', { temperature });
    }

    async history() {
        const result = await fetch(this.url_base + 'sensor');
        return (await result.json()) as History;
    }

    async sensor() {
        const result = await fetch(this.url_base + 'sensor');
        const json = await result.json();
        if (json.length === 0) {
            return null;
        }

        return json[0] as CurrentCondition;
    }

    async state() {
        const result = await fetch(this.url_base + 'state');
        return (await result.json()) as RemoteState;
    }

    async timers() {
        const result = await fetch(this.url_base + 'timers');
        return (await result.json()) as [TimerAndTid];
    }

    async add_timer(timer: Timer) {
        const result = await this._post('timers', timer);
        return (await result.json()) as TimerAndTid;
    }

    remove_timer(tid: number) {
        return this._delete('timers/' + tid);
    }

    set_timer(tid: number, timer: Timer) {
        return this._put('timers/' + tid, timer);
    }
}

export type RemoteMode = 'auto' | 'heater' | 'cooler' | 'dry' | 'fan';
export type RemoteFanSpeed = 'auto' | 'high' | 'low' | 'quiet' | 'natural';

export type RemoteState = {
    mode: RemoteMode;
    power: boolean;
    fan_speed: RemoteFanSpeed;
    temperature: number;
};

export const START_STATE: RemoteState = {
    mode: 'auto',
    power: false,
    fan_speed: 'auto',
    temperature: 25,
};

export type Condition = {
    temperature: number;
    humidity: number;
    timestamp: number;
};

export type CurrentCondition = {
    temperature: number;
    humidity: number;
};

export type History = Condition[];

export type Modes = 'auto' | 'heater' | 'cooler' | 'dry' | 'fan';
export type FanSpeeds =  'auto' | 'high' | 'low' | 'quiet' | 'natural';

export type TimerCommand = {
    on_off: 'on' | 'off',
    temperature: number,
    mode: Modes,
    fan: FanSpeeds,
};

export type Timer = {
    time: string,
    enabled: boolean,
    command: TimerCommand,
};

export type TimerAndTid = Timer & { tid: number }
