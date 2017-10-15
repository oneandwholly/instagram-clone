//import _ from 'lodash';
import { NAME } from './constants';

export const selectAll = state => state[NAME];

export const selectById = state => state[NAME].byId;