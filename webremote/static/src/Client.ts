export default class Client {
    url_base = '/api/';

    _post(endpoint: string, json?: any) {
        let url = this.url_base + endpoint;
        let options: any = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
        };

        if (json) {
            options.body = JSON.stringify(json);
        }

        fetch(url, options);
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
        return START_STATE;
        const result = await fetch(this.url_base + 'state');
        return (await result.json()) as RemoteState;
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

export type CurrentCondition = {
    temperature: number;
    humidity: number;
};

export type History = {
    temperature: number;
    humidity: number;
    timestamp: number;
}[];
