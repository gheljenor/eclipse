import * as React from "react";

import StateHolder from "./state-holder";

type ReactProps<ReactComp extends typeof React.Component>
    = InstanceType<ReactComp> extends React.Component<infer Props, any, any> ? Props : never;

type IStateHolderWrapperProps<ReactComp extends typeof React.Component> = ReactProps<ReactComp> & {
    _change?: string;
};

type IStateHolderWrapperState<ReactComp extends typeof React.Component> = IStateHolderWrapperProps<ReactComp> & {
    state?: ReactProps<ReactComp>;
};

export default function <ReactComp extends typeof React.Component>(Component: ReactComp) {
    return class StateHolderWrapper
        extends React.Component<IStateHolderWrapperProps<ReactComp>, IStateHolderWrapperState<ReactComp>> {

        private readonly _onChange;
        private readonly _change: number;

        constructor(props) {
            super(props);

            const state = Object.assign({}, props);

            const {onChange, _change} = state;
            delete state.onChange;
            delete state._change;

            this._change = _change;

            this.state = _change ? state || {} : {state};

            const holder = new StateHolder(this.state, (newState) => this.setState(newState));
            const update = holder.onChange(_change || "state");

            this._onChange = (newState) => {
                update(newState);
                onChange(newState);
            };
        }

        public render() {
            const state = this._change ? this.state : this.state.state;

            // I realy don't know how to fix this error...
            // @ts-ignore
            return <Component {...state} onChange={this._onChange} />;
        }
    };
}
