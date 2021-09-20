/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ramda from 'ramda';

export const empty = (value: any): boolean => ramda.empty(value);

export const notEmpty = (value: any): boolean => !empty(value);
