import * as ramda from 'ramda';

export const empty = (value: any) => ramda.empty(value);

export const notEmpty = (value: any) => !empty(value);
