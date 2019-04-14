import React, {Component} from "react";

withWidthView.propTypes = {};

withWidthView.defaultProps = {};

function withWidthView(ReceiveComponent) {

    return class WithWidth extends Component {

        state = {
            windowWidth: 0
        };

        componentDidMount() {
            window.addEventListener(`resize`, this.setWindowWidth);
        };

        setWindowWidth = () => {
            this.setState({
                windowWidth: window.innerWidth
            });
        };

        componentWillUnmount() {
            window.removeEventListener(`resize`, this.setWindowWidth);
        };

        render() {
            return (
                <ReceiveComponent
                    {...this.props}
                    windowWidth={this.state.windowWidth}
                />
            )
        }
    }
}

export default withWidthView;