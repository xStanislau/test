import React, { Component } from 'react';
import { connect } from 'react-redux';
import { calculations } from '../../core/ui/calculations';
import { Header } from '../../components/Header/Header';
import { CompareWithItem } from '../../components/ComparePanel/CompareWithItem';
import { UnitSwitch } from "../../components/ComparePanel/UnitSwitch/UnitSwitch";
import './comparePanel.css';
import { switchUnitSystem } from "./actions";

export class ComparePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domReady: false,
        };
        this.handleUnitChange = this.handleUnitChange.bind(this);
    }

    componentDidMount() {
        this.setState({ domReady: true });
    }

    handleUnitChange({target, currentTarget}) {
        const firstElementClassList = currentTarget.firstChild.classList;
        const secondElementClassList = currentTarget.lastChild.classList;
        if(target.textContent === 'IN') {
            if(!firstElementClassList.contains('active')) firstElementClassList.add('active');
            if(secondElementClassList.contains('active')) secondElementClassList.remove('active');

            this.props.switchUnitSystem(false );
            this.forceUpdate();
        } else if(target.textContent === 'CM') {
            if(!secondElementClassList.contains('active')) secondElementClassList.add('active');
            if(firstElementClassList.contains('active')) firstElementClassList.remove('active');
            this.props.switchUnitSystem(true );
            this.forceUpdate();
        }
    }


    showCurrentMode(mode, product, item) {
        const
            width = this.comparePanelBody.offsetWidth,
            height = this.comparePanelBody.offsetHeight;
        return (
            <CompareWithItem
                key={item.id}
                product={product}
                item={item}
                calculations={ calculations(width, height) }
                bodySize = {{width, height}}
                isImperial={this.props.isImperial}
            />)
    }

    render() {
        return (
            <div className="compare-panel">
                <Header mode={this.props.currentMode} productName={this.props.product.name} currentItems={this.props.currentItems} />
                <div className="compare-panel__body" ref={(body) => this.comparePanelBody = body}>
                    {
                        this.state.domReady &&
                        this.showCurrentMode(this.props.currentMode, this.props.product, this.props.currentItems[0])
                    }
                </div>
                <UnitSwitch handleUnitChange={this.handleUnitChange}/>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        currentMode: state.ControlPanel.currentMode,
        currentItems: state.ControlPanel.currentItems,
        product: state.ComparePanel.product,
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        switchUnitSystem: (isImperial) => {
            dispatch(switchUnitSystem(isImperial));
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ComparePanel);