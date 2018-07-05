import React from 'react';
import Menu from './Menu.jsx';
import { connect } from '../store/Connect';
import {
    BackIcon,
    TemplateIcon,
    AddIcon,
    TickIcon,
    DeleteIcon,
    alertIconMap,
} from './Icons.jsx';
import '../../sass/components/_view.scss';

const ViewItem = ({
    view,
    remove,
    onClick,
}) => (
    <div className="ciq-list-item" onClick={onClick}>
        <span className="ciq-list-item-text">{view.name}</span>
        <DeleteIcon onClick={remove} />
    </div>
);

const Views = ({
    Menu,
    menuOpen,
    views,
    routes: { current: currentRoute, add, main, overwrite, cancel, cancelOverwrite },
    onChange,
    onSubmit,
    applyLayout,
    remove,
    inputRef,
    templateName,
}) => (
    <div className="ciq-views">
        <Menu>
            <Menu.Title className="cq-menu-btn">
                <TemplateIcon
                    className={`ic-icon-with-sub ${menuOpen ? 'active' : ''}`}
                    tooltip-title={t.translate('Templates')}
                />
            </Menu.Title>
            <Menu.Body>
                <div className="content">
                    {
                        currentRoute !== 'overwrite' ?
                            <div>
                                <div className="title">
                                    {
                                        currentRoute === 'add' ?
                                            <span className="add">
                                                <BackIcon onClick={cancel} />
                                                <input
                                                    ref={inputRef}
                                                    className="view-input"
                                                    placeholder={t.translate('Template name')}
                                                    maxLength={20}
                                                    onChange={onChange}
                                                    onKeyUp={onSubmit}
                                                />
                                            </span>
                                            : <span className="add-new" onClick={main}> {t.translate('Add New')} </span>
                                    }
                                    <span className="icon">
                                        {
                                            currentRoute === 'add'
                                                ? <TickIcon className="tick-icon" onClick={add} />
                                                : <AddIcon className="add-icon" onClick={main} />
                                        }
                                    </span>
                                </div>
                                <div className="ciq-list">
                                    {
                                        views.length
                                            ? views.map((view, i) => (
                                                <ViewItem
                                                    view={view}
                                                    key={i}
                                                    onClick={e => applyLayout(i, e)}
                                                    remove={e => remove(i, e)}
                                                />
                                            ))
                                            :
                                            <span className="placeholder">
                                                <p>{t.translate('There is no template added by you.')}</p>
                                                <p>{t.translate('Click + icon to add one.')}</p>
                                            </span>
                                    }
                                </div>
                            </div>
                            :
                            <div className="ovrwrit-alrt">
                                <div className="ovrwrit-alrt-title">
                                    <alertIconMap.warning />
                                    <span>
                                        {templateName + t.translate(' is already exist.')}
                                    </span>
                                    <span>
                                        {t.translate('Would you like to overwrite it?')}
                                    </span>
                                </div>
                                <div className="ovrwrit-alrt-buttons">
                                    <div onClick={cancelOverwrite}>
                                        {t.translate('CANCEL')}
                                    </div>
                                    <div onClick={overwrite}>
                                        {t.translate('OVERWRITE')}
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </Menu.Body>
        </Menu>
    </div>
);

export default connect(({ view: s }) => ({
    Menu: s.menu.connect(Menu),
    views: s.views,
    routes: s.routes,
    onOverwrite: s.onOverwrite,
    onCancel: s.onCancel,
    onChange: s.onChange,
    remove: s.remove,
    onSubmit: s.onSubmit,
    applyLayout: s.applyLayout,
    menuOpen: s.menu.dialog.open,
    inputRef: s.inputRef,
    templateName :s.templateName,
}))(Views);