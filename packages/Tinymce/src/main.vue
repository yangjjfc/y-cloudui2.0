<template>
  <div :class="{fullscreen:fullscreen}" class="yl-Tinymce tinymce-container editor-container">
    <textarea :id="tinymceId" class="tinymce-textarea" />
    <div class="editor-custom-btn-container" v-if="isUploadBtn">
            <editorImage  class="editor-upload-btn" @successCBK="imageSuccessCBK"/>
        </div>
  </div>
</template>

<script>
import editorImage from './editorImage';
import plugins from './plugins';
import toolbar from './toolbar';
import { Environment } from 'ycloud-ui/src/config/index';

export default {
  name: 'YlTinymce',
  components: { editorImage },
  props: {
    id: {
      type: String,
      default: function () {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '');
      }
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default () {
        return [];
      }
    },
    menubar: {
      type: [String, Boolean],
      default: 'file edit insert view format table'
    },
    isUploadBtn: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data () {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      fullscreen: false,
      language: 'zh_CN'
    };
  },
  watch: {
    value (val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val || ''));
      }
    }
  },
  mounted () {
    this.initTinymce();
  },
  activated () {
    this.initTinymce();
  },
  deactivated () {
    this.destroyTinymce();
  },
  destroyed () {
    this.destroyTinymce();
  },
  methods: {
    initTinymce () {
      const _this = this;
      if (window.tinymce) {
        require('./zh_CN.js');
        window.tinymce.init({
          language: this.language,
          selector: `#${this.tinymceId}`,
          height: this.height,
          body_class: 'panel-body ',
          object_resizing: false,
          toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
          menubar: this.menubar,
          plugins: plugins,
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
          default_link_target: '_blank',
          link_title: false,
          nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
          init_instance_callback: editor => {
            if (_this.value) {
              editor.setContent(_this.value);
            }
            _this.hasInit = true;
            editor.on('NodeChange Change KeyUp SetContent', () => {
              this.hasChange = true;
              this.$emit('input', editor.getContent());
            });
          },
          setup (editor) {
            editor.on('FullscreenStateChanged', (e) => {
              _this.fullscreen = e.state;
            });
          }
        });
      }
    },
    destroyTinymce () {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (this.fullscreen) {
        tinymce.execCommand('mceFullScreen');
      }

      if (tinymce) {
        tinymce.destroy();
      }
    },
    setContent (value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent () {
      window.tinymce.get(this.tinymceId).getContent();
    },
    imageSuccessCBK (arr) {
      if (!arr) return; 
      const _this = this;
      arr.split(';').forEach(v => {
        window.tinymce.get(_this.tinymceId).insertContent(`<img class="wscnph" src="${Environment.IMAGE_DOWNLOAD + v}" >`);
      });
    }
  }
};
</script>
