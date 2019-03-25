import { IAction, TReducer } from '../reducer/createReducer';

class ReducerTest<ReducerState> {
    public reducer: TReducer<ReducerState>;
    public initialState: ReducerState;
    public state: ReducerState;

    public constructor(reducer: TReducer<ReducerState>) {
        this.reducer = reducer;

        // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
        this.initialState = this.reducer(undefined, {} as IAction<{}>);

        this.state = this.initialState;
    }

    public handleAction({
        action,
        previousState = this.state,
    }: {
        action: IAction<{}>;
        previousState: ReducerState;
    }): ReducerState {
        this.state = this.reducer(previousState, action);
        return this.state;
    }

    public updateState(stateUpdates: object = {}): void {
        this.state = Object.assign({}, this.state, stateUpdates);
    }
}

export default ReducerTest;
