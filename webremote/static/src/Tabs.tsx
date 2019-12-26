import React, { ReactNode, useState } from 'react';
import './Tabs.css';
import Toggle from './Toggle';

const Tab: React.FC<{ label: ReactNode, children: ReactNode }> = ({ children }) => {
    return <div className="Tabs-Panel">{children}</div>
}

const Tabs: React.FC<{ children: Array<any>, className?: string}> & { Tab: any } = ({ children, className }) => {
    const [selected, setSelected] = useState(0);
    const SelectedTab = children[selected];

    if (!children) {
        return null;
    }

    return (
        <div className={"Tabs " + (className || '')}>
            <div className="Tabs-Navigation">
                <Toggle>
                    {children.map((c: any, index: number) =>
                        <Toggle.Button
                            id={'' + index}
                            key={index}
                            value={index}
                            onChange={setSelected}
                            checked={selected === index}
                        >
                            {c.props.label}
                        </Toggle.Button>
                    )}
                </Toggle>
            </div>
            <Tab {...SelectedTab.props} />
        </div>
    )
}

export default Tabs;
Tabs.Tab = Tab;
