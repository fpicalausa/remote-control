import React, { useState, ReactNode } from 'react';
import './Drawer.css';

const Drawer: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="Drawer">
            <div className={'Drawer-Content ' + (isOpen ? 'Open' : '')}>
                {children}
            </div>
            <button className="Drawer-Button" onClick={() => setOpen(!isOpen)}>
                {isOpen ? (
                    <i className="fa fa-chevron-up" />
                ) : (
                    <i className="fa fa-chevron-down" />
                )}
            </button>
        </div>
    );
};

export default Drawer;
