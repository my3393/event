//框架里没这两个方法，所以将就者用
function getFontWidth(item) {
  if (/[a-zA-Z]/.test(item)) {
    return .7;
  } else if (/[0-9]/.test(item)) {
    return .55;
  } else if (/\./.test(item)) {
    return .27;
  } else if (/-/.test(item)) {
    return .325;
  } else if (/\(|\)/.test(item)) {
    return .373;
  } else if (/\s/.test(item)) {
    return .25;
  } else if (/%/.test(item)) {
    return .8;
  } else {
    return 1;
  }
}

Object.defineProperty(Array.prototype, 'sum', {
  enumerable: false,
  value: function() {
    var array, iterator;
    if (typeof arguments[0] == 'function') {
      iterator = arguments[0];
    } else if (typeof arguments[1] == 'function') {
      array = arguments[0];
      iterator = arguments[1];
    }
    if (!array && this instanceof Array) {
      array = this;
    }
    let sum = 0;
    if (iterator) {
      array.forEach((a, i) => {
        sum += iterator.call(a, a, i);
      });
    } else {
      array.forEach(a => {
        sum += a;
      });
    }
    return sum;
  }
})
// plugin/swiperout/swiperout.js
//By 邢君可
const swiperout = {};
import TouchMove from '../js/touchMove';
//这是多指触摸纠正
const deleteWidth = 86;
//删除按钮默认宽度
Component({
  properties: {
    setting: {
      type: String,
      value: '',
      observer: function(value) {
        if (value) {
          if (value.length > 5) {
            value = value.substr(0, 5);
            this.setData({
              setting: value
            })
          }
          let settingWidth = value.split('').map(getFontWidth).sum() * 14 + 60;
          this.setData({
            settingWidth,
            openConfirmtransform: `transform: translateX(-${deleteWidth + settingWidth}px);`,
            opentransform: `transform: translateX(-${deleteWidth + settingWidth}px);`,
            actionsRightWidth: deleteWidth + settingWidth
          })
        }
      }
    }
  },
  detached() {
    if (swiperout[this.__wxWebviewId__])
      swiperout[this.__wxWebviewId__][this.index] = null;
  },
  data: {
    showcatch: false,
    settingWidth: 0,
    openConfirmtransform: `transform: translateX(-${deleteWidth+30}px);`,
    opentransform: `transform: translateX(-${deleteWidth}px);`,
    actionsRightWidth: deleteWidth,
    delheight: ''
  },
  ready() {
    if (!swiperout[this.__wxWebviewId__]) {
      swiperout[this.__wxWebviewId__] = [];
    }
    this.index = swiperout[this.__wxWebviewId__].push(this) - 1;
    this.mover = new TouchMove();
  },
  methods: {
    doDelete() {
      let query = this.createSelectorQuery()
      return new Promise((resolve, reject) => {
        query.select('.wapper').fields({
          size: true
        }).exec((res) => {
          this.setData({
            delheight: `margin-top:-${res[0].height}px;`
          });
          setTimeout(() => {
            this.setData({
              hide: true
            });
            resolve();
          }, 300)
        })
      })
    },
    onDelete() {
      if (this.data.showConfirm) {
        return this.triggerEvent('onDelete', {
          close: () => {
            this.close();
          },
          delete: () => {
            return this.doDelete();
          }
        })
      }
      this.setData({
        showConfirm: true
      })
    },
    onSetting() {
      this.triggerEvent('onSetting', {
        close: () => {
          this.close();
        }
      })
    },
    onTap() {
      if (this.data.open) {
        this.close();
      } else {
        this.triggerEvent('onTap');
      }
    },
    closeOther(e) {
      swiperout[this.__wxWebviewId__].forEach((item, i) => {
        if (item && i != this.index) {
          item.close();
        }
      })
    },
    close() {
      this.setData({
        showConfirm: false,
        transform0: '',
        transform1: '',
        transform2: '',
        open: false
      });
    },
    onMove(e) {
      let {
        open,
        setting,
        settingWidth,
        actionsRightWidth
      } = this.data;
      let translate, buttonTranslate, buttonTranslate2;
      let r = this.mover.onMove(e);
      if (r.first == 'y') return;
      if (r.type == 'move') {
        if (!this.data.showcatch)
          this.setData({
            showcatch: true
          })
        buttonTranslate = r.x;
        if (open) buttonTranslate -= actionsRightWidth;
        if (buttonTranslate > 0) buttonTranslate = 0;
        if (buttonTranslate < -actionsRightWidth) {
          buttonTranslate = -actionsRightWidth - ((-buttonTranslate - actionsRightWidth) ** 0.8);
        }
        if (setting) {
          buttonTranslate2 = buttonTranslate / actionsRightWidth * deleteWidth;
          this.setData({
            showConfirm: false,
            transform1: `transform: translateX(${buttonTranslate2}px)`,
            transform2: `transform: translateX(${buttonTranslate}px)`,
            transform0: `transform: translateX(${buttonTranslate}px)`
          });
        } else {
          this.setData({
            showConfirm: false,
            transform1: `transform: translateX(${buttonTranslate}px)`,
            transform0: `transform: translateX(${buttonTranslate}px)`
          });
        }
      } else if (r.type == 'end') {
        this.setData({
          showcatch: false,
          transform0: '',
          transform1: '',
          transform2: '',
          open: r.x < actionsRightWidth / 4 * (open ? 1 : -1)
        });
      } else if (r.type == 'start') {
        this.closeOther();
      }
    },
  }
})