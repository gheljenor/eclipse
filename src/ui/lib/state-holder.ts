export type IStateHolderAction<Field> = (state: Field) => void;

export default class StateHolder<State> {
    constructor(
        public state: State,
        private readonly onUpdate: (state: State) => void,
    ) {
        this.state = state;
        this.onUpdate = onUpdate;
    }

    public onChange = <FieldName extends keyof State>(field: FieldName): IStateHolderAction<State[FieldName]> =>
        (newState) => {
            const state = this.state[field];

            if (state !== newState) {
                if (this.state instanceof Array) {
                    // It is bug in TS, or i really don't understand how it works...
                    this.state = this.state.slice() as unknown as State;
                    this.state[field] = newState;
                } else {
                    this.state = Object.assign({}, this.state, {[field]: newState});
                }
                this.onUpdate(this.state);
            }
        };
}
