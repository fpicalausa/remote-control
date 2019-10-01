const SENSOR_DATA = [
    { temperature: 25, humidity: 57, timestamp: 1569930002 },
    { temperature: 25, humidity: 56, timestamp: 1569928801 },
    { temperature: 26, humidity: 57, timestamp: 1569927602 },
    { temperature: 27, humidity: 57, timestamp: 1569926402 },
    { temperature: 28, humidity: 63, timestamp: 1569925202 },
    { temperature: 28, humidity: 64, timestamp: 1569924002 },
    { temperature: 28, humidity: 63, timestamp: 1569922802 },
    { temperature: 28, humidity: 63, timestamp: 1569921602 },
    { temperature: 28, humidity: 63, timestamp: 1569920402 },
    { temperature: 28, humidity: 63, timestamp: 1569919202 },
    { temperature: 28, humidity: 62, timestamp: 1569918002 },
    { temperature: 28, humidity: 62, timestamp: 1569916802 },
    { temperature: 28, humidity: 63, timestamp: 1569915602 },
    { temperature: 28, humidity: 63, timestamp: 1569914402 },
    { temperature: 28, humidity: 64, timestamp: 1569913202 },
    { temperature: 28, humidity: 63, timestamp: 1569912002 },
    { temperature: 28, humidity: 63, timestamp: 1569910802 },
    { temperature: 28, humidity: 62, timestamp: 1569909602 },
    { temperature: 28, humidity: 62, timestamp: 1569908402 },
    { temperature: 28, humidity: 60, timestamp: 1569907202 },
    { temperature: 28, humidity: 58, timestamp: 1569906002 },
    { temperature: 29, humidity: 58, timestamp: 1569904801 },
    { temperature: 30, humidity: 62, timestamp: 1569903602 },
    { temperature: 30, humidity: 61, timestamp: 1569902402 },
    { temperature: 30, humidity: 60, timestamp: 1569901202 },
    { temperature: 30, humidity: 59, timestamp: 1569900002 },
    { temperature: 30, humidity: 60, timestamp: 1569898802 },
    { temperature: 29, humidity: 61, timestamp: 1569897602 },
    { temperature: 29, humidity: 61, timestamp: 1569896402 },
    { temperature: 29, humidity: 61, timestamp: 1569895202 },
    { temperature: 28, humidity: 63, timestamp: 1569894002 },
    { temperature: 28, humidity: 65, timestamp: 1569892802 },
    { temperature: 27, humidity: 65, timestamp: 1569891602 },
    { temperature: 27, humidity: 65, timestamp: 1569890402 },
    { temperature: 27, humidity: 64, timestamp: 1569889202 },
    { temperature: 27, humidity: 65, timestamp: 1569888002 },
    { temperature: 27, humidity: 65, timestamp: 1569886802 },
    { temperature: 26, humidity: 66, timestamp: 1569884402 },
    { temperature: 26, humidity: 66, timestamp: 1569883201 },
    { temperature: 26, humidity: 66, timestamp: 1569882002 },
    { temperature: 26, humidity: 66, timestamp: 1569880802 },
    { temperature: 26, humidity: 66, timestamp: 1569879602 },
    { temperature: 26, humidity: 66, timestamp: 1569878402 },
    { temperature: 26, humidity: 66, timestamp: 1569877202 },
    { temperature: 26, humidity: 66, timestamp: 1569876002 },
    { temperature: 26, humidity: 65, timestamp: 1569874802 },
    { temperature: 26, humidity: 65, timestamp: 1569873602 },
    { temperature: 26, humidity: 65, timestamp: 1569872402 },
    { temperature: 26, humidity: 65, timestamp: 1569871202 },
    { temperature: 26, humidity: 65, timestamp: 1569870002 },
    { temperature: 27, humidity: 65, timestamp: 1569868802 },
    { temperature: 27, humidity: 65, timestamp: 1569867602 },
    { temperature: 27, humidity: 65, timestamp: 1569866402 },
    { temperature: 27, humidity: 65, timestamp: 1569865202 },
    { temperature: 27, humidity: 64, timestamp: 1569864002 },
    { temperature: 26, humidity: 65, timestamp: 1569862802 },
    { temperature: 25, humidity: 66, timestamp: 1569861602 },
    { temperature: 25, humidity: 65, timestamp: 1569860402 },
    { temperature: 27, humidity: 63, timestamp: 1569859202 },
    { temperature: 27, humidity: 63, timestamp: 1569858002 },
    { temperature: 27, humidity: 62, timestamp: 1569856802 },
    { temperature: 27, humidity: 62, timestamp: 1569855602 },
    { temperature: 27, humidity: 62, timestamp: 1569854402 },
    { temperature: 27, humidity: 61, timestamp: 1569853202 },
    { temperature: 27, humidity: 61, timestamp: 1569852002 },
    { temperature: 27, humidity: 60, timestamp: 1569850802 },
    { temperature: 27, humidity: 60, timestamp: 1569849602 },
    { temperature: 26, humidity: 59, timestamp: 1569848402 },
    { temperature: 26, humidity: 58, timestamp: 1569847201 },
    { temperature: 26, humidity: 57, timestamp: 1569846002 },
    { temperature: 25, humidity: 56, timestamp: 1569844802 },
    { temperature: 25, humidity: 56, timestamp: 1569844802 },
    { temperature: 25, humidity: 57, timestamp: 1569843602 },
    { temperature: 25, humidity: 56, timestamp: 1569842402 },
    { temperature: 24, humidity: 50, timestamp: 1569841202 },
    { temperature: 25, humidity: 51, timestamp: 1569840002 },
    { temperature: 27, humidity: 57, timestamp: 1569838802 },
    { temperature: 28, humidity: 65, timestamp: 1569837602 },
    { temperature: 29, humidity: 66, timestamp: 1569836402 },
    { temperature: 29, humidity: 66, timestamp: 1569835202 },
    { temperature: 29, humidity: 65, timestamp: 1569834002 },
    { temperature: 29, humidity: 64, timestamp: 1569832802 },
    { temperature: 29, humidity: 64, timestamp: 1569831602 },
    { temperature: 29, humidity: 64, timestamp: 1569830402 },
    { temperature: 29, humidity: 63, timestamp: 1569829202 },
    { temperature: 29, humidity: 63, timestamp: 1569828002 },
    { temperature: 29, humidity: 63, timestamp: 1569826802 },
    { temperature: 29, humidity: 63, timestamp: 1569825602 },
    { temperature: 29, humidity: 63, timestamp: 1569824402 },
    { temperature: 29, humidity: 63, timestamp: 1569823202 },
    { temperature: 29, humidity: 63, timestamp: 1569822002 },
    { temperature: 29, humidity: 63, timestamp: 1569820802 },
    { temperature: 29, humidity: 63, timestamp: 1569819602 },
    { temperature: 29, humidity: 63, timestamp: 1569818402 },
    { temperature: 29, humidity: 63, timestamp: 1569817202 },
    { temperature: 29, humidity: 63, timestamp: 1569816002 },
    { temperature: 28, humidity: 62, timestamp: 1569814801 },
    { temperature: 28, humidity: 62, timestamp: 1569813602 },
    { temperature: 28, humidity: 61, timestamp: 1569812402 },
    { temperature: 28, humidity: 62, timestamp: 1569811202 },
    { temperature: 28, humidity: 62, timestamp: 1569810002 },
    { temperature: 28, humidity: 61, timestamp: 1569808802 },
    { temperature: 28, humidity: 63, timestamp: 1569807602 },
    { temperature: 27, humidity: 63, timestamp: 1569806401 },
    { temperature: 27, humidity: 62, timestamp: 1569805202 },
    { temperature: 27, humidity: 63, timestamp: 1569804002 },
    { temperature: 27, humidity: 64, timestamp: 1569802802 },
    { temperature: 27, humidity: 66, timestamp: 1569801602 },
    { temperature: 26, humidity: 67, timestamp: 1569800402 },
    { temperature: 26, humidity: 67, timestamp: 1569799202 },
    { temperature: 26, humidity: 67, timestamp: 1569798002 },
    { temperature: 26, humidity: 67, timestamp: 1569796802 },
    { temperature: 25, humidity: 66, timestamp: 1569795602 },
    { temperature: 25, humidity: 66, timestamp: 1569794402 },
    { temperature: 25, humidity: 66, timestamp: 1569793202 },
    { temperature: 25, humidity: 66, timestamp: 1569792002 },
    { temperature: 25, humidity: 66, timestamp: 1569790802 },
    { temperature: 25, humidity: 66, timestamp: 1569789602 },
    { temperature: 25, humidity: 66, timestamp: 1569788402 },
    { temperature: 25, humidity: 65, timestamp: 1569787202 },
    { temperature: 25, humidity: 65, timestamp: 1569786001 },
    { temperature: 25, humidity: 65, timestamp: 1569784802 },
    { temperature: 25, humidity: 65, timestamp: 1569783604 },
    { temperature: 25, humidity: 64, timestamp: 1569782402 },
    { temperature: 25, humidity: 64, timestamp: 1569781202 },
    { temperature: 25, humidity: 64, timestamp: 1569780002 },
    { temperature: 25, humidity: 63, timestamp: 1569778802 },
    { temperature: 25, humidity: 61, timestamp: 1569777602 },
    { temperature: 25, humidity: 61, timestamp: 1569776402 },
    { temperature: 24, humidity: 61, timestamp: 1569775799 },
    { temperature: 24, humidity: 62, timestamp: 1569775284 },
    { temperature: 24, humidity: 62, timestamp: 1569775261 },
    { temperature: 25, humidity: 64, timestamp: 1569775202 },
    { temperature: 25, humidity: 67, timestamp: 1569774949 },
    { temperature: 25, humidity: 66, timestamp: 1569774652 },
    { temperature: 25, humidity: 65, timestamp: 1569774603 },
    { temperature: 25, humidity: 65, timestamp: 1569774514 },
];

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
        return SENSOR_DATA as History;
    }

    async sensor() {
        if (!false) {
            return SENSOR_DATA[0] as CurrentCondition;
        }
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

export type RemoteMode = 'auto' | 'heater' | 'cooler';
export type RemoteFanSpeed = 'auto' | 'high' | 'low';

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
