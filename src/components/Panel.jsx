import React from 'react';

const Panel = (props) => {
	return (
		<div className={props.floating ? "floating-panel" : "panel"}>
			<div className="panel-header">
				{props.title}
			</div>
			{props.children}
		</div>
	)
}

export default Panel;