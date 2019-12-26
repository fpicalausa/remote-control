import Client, {
    Timer,
    TimerAndTid,
} from './Client';


type Action = {
    type: 'add',
    payload: TimerAndTid,
} | {
    type: 'update',
    payload: TimerAndTid,
} | {
    type: 'remove',
    payload: { tid: number },
} | {
    type: 'reset',
    payload: [TimerAndTid]
}| {
    type: 'loading',
}

type State = { state: 'initial' | 'loading' | 'loaded', timers: TimerAndTid[]}

export const reducer: (state: State, action: Action) => State = (state, action) => {
    switch (action.type) {
        case 'loading':
            return {
                state: 'loading',
                timers: [],
            };
        case 'reset':
            return {
                state: 'loaded',
                timers: action.payload,
            };
        case 'add':
            return {
                state: state.state,
                timers: [...state.timers, action.payload]
            }
        case 'remove':
            return {
                state: state.state,
                timers: state.timers.filter(t => t.tid !== action.payload.tid),
            }
        case 'update':
            return {
                state: state.state,
                timers: state.timers.map(t => t.tid === action.payload.tid ? action.payload : t),
            }
    }

    return state;
}

export const INITIAL_SATE: State = { state: 'initial', timers: []}

type Dispatch = ((action: Action) => void);

export const add = (client: Client, timer: Timer) => {
    return (dispatch: Dispatch) => {
        client.add_timer(timer).then(t => dispatch({ type: 'add', payload: t}))
    }
}

export const fetch = (client: Client) => {
    return (dispatch: Dispatch) => {
        dispatch({ type: 'loading' });
        client.timers().then(t => dispatch({ type: 'reset', payload: t}))
    }
}

export const remove = (client: Client, tid: number) => {
    return (dispatch: Dispatch) => {
        client.remove_timer(tid).then(() => dispatch({ type: 'remove', payload: { tid }}))
    }
}

export const update = (client: Client, timer: Timer, tid: number) => {
    return (dispatch: Dispatch) => {
        client.set_timer(tid, timer).then(() => dispatch({ type: 'update', payload: { ...timer, tid }}))
    }
}