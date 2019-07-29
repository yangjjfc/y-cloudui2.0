/* Automatically generated by './build/bin/build-entry.js' */

import Pagination from '../packages/pagination/index.js';
import Dialog from '../packages/dialog/index.js';
import FileUpload from '../packages/file-upload/index.js';
import TableTree from '../packages/table-tree/index.js';
import RegionPicker from '../packages/region-picker/index.js';
import Icon from '../packages/icon/index.js';
import Tinymce from '../packages/Tinymce/index.js';
import Table from '../packages/table/index.js';
import Sku from '../packages/sku/index.js';
import CollapseTransition from 'ycloud-ui/src/transitions/collapse-transition';

import Http from 'ycloud-ui/src/utils/axios/index';
import * as Tools from 'ycloud-ui/src/utils/global';
import emitter from 'ycloud-ui/src/mixins/emitter';
import formValid from 'ycloud-ui/src/mixins/formValid';
import boxer from 'ycloud-ui/src/directives/boxer';
import { Environment, changeEnvironment } from 'ycloud-ui/src/config';

const components = [
  Pagination,
  Dialog,
  FileUpload,
  TableTree,
  RegionPicker,
  Icon,
  Tinymce,
  Table,
  Sku,
  CollapseTransition
];

const install = function (Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
  Vue.prototype.Http = Http;
  Vue.directive('boxer', boxer);
}; 

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  emitter,
  formValid,
  Http,
  Environment,
  changeEnvironment,
  Tools
};

export default {
  version: '2.1.8',
  install,
  CollapseTransition,
  Pagination,
  Dialog,
  FileUpload,
  TableTree,
  RegionPicker,
  Icon,
  Tinymce,
  Table,
  Sku
};
