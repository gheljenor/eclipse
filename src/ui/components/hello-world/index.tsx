import * as React from "react";

const styles = require("./index.pcss");

interface IHelloWorldProps extends React.Props<HelloWorld> {
    title: string;
    text: string;
}

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {
    public render() {
        return (
            <div className={styles.wrapper}>
                <h1 className={styles.title}>
                    {this.props.title}
                </h1>
                <p className={styles.text}>
                    {this.props.text}
                </p>
                <div className={styles.image} />
            </div>
        );
    }
}
