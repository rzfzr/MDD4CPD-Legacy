import * as React from 'react';

import { BodyWidget } from './BodyWidget';
import { Application } from './Application';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
	var app = new Application();
	return <BodyWidget app={app} />;
};
