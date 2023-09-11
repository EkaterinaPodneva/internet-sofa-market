"use strict";

var swiperBanner = new Swiper('.banner__container', {
  loop: true,
  //Цикличность
  speed: 600,
  //Скорость

  //Пагинация
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  //Перевод на русский язык
  a11y: {
    paginationBulleMessage: 'Тут название слайда {{index}}'
  }
});
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById('burger').addEventListener('click', function () {
    document.querySelector('.header__middle').classList.toggle('open');
  });
});
"use strict";

var selector = document.querySelector('.js-choices');
var choices = new Choices(selector, {
  searchEnabled: false,
  itemSelectText: "",
  classNames: {
    containerOuter: 'choices header_choices'
  }
});
var element = document.querySelector('.choices__furniture');
var choicesFurniture = new Choices(element, {
  searchEnabled: false,
  itemSelectText: "",
  classNames: {
    containerOuter: 'choices header_choices'
  }
});
"use strict";

function _typeof2(obj) { "@babel/helpers - typeof"; return _typeof2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof2(obj); }
/*!
 * dist/inputmask.min
 * https://github.com/RobinHerbots/Inputmask
 * Copyright (c) 2010 - 2020 Robin Herbots
 * Licensed under the MIT license
 * Version: 5.0.6-beta.16
 */
!function webpackUniversalModuleDefinition(root, factory) {
  if ("object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) && "object" == (typeof module === "undefined" ? "undefined" : _typeof2(module))) module.exports = factory();else if ("function" == typeof define && define.amd) define([], factory);else {
    var a = factory();
    for (var i in a) ("object" == (typeof exports === "undefined" ? "undefined" : _typeof2(exports)) ? exports : root)[i] = a[i];
  }
}(window, function () {
  return modules = [function (module) {
    module.exports = JSON.parse('{"BACKSPACE":8,"BACKSPACE_SAFARI":127,"DELETE":46,"DOWN":40,"END":35,"ENTER":13,"ESCAPE":27,"HOME":36,"INSERT":45,"LEFT":37,"PAGE_DOWN":34,"PAGE_UP":33,"RIGHT":39,"SPACE":32,"TAB":9,"UP":38,"X":88,"CONTROL":17,"KEY_229":229}');
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.caret = caret, exports.determineLastRequiredPosition = determineLastRequiredPosition, exports.determineNewCaretPosition = determineNewCaretPosition, exports.getBuffer = getBuffer, exports.getBufferTemplate = getBufferTemplate, exports.getLastValidPosition = getLastValidPosition, exports.isMask = isMask, exports.resetMaskSet = resetMaskSet, exports.seekNext = seekNext, exports.seekPrevious = seekPrevious, exports.translatePosition = translatePosition;
    var _validationTests = __webpack_require__(3),
      _validation = __webpack_require__(4),
      _mask = __webpack_require__(10);
    function caret(input, begin, end, notranslate, isDelete) {
      var inputmask = this,
        opts = this.opts,
        range;
      if (void 0 === begin) return "selectionStart" in input && "selectionEnd" in input ? (begin = input.selectionStart, end = input.selectionEnd) : window.getSelection ? (range = window.getSelection().getRangeAt(0), range.commonAncestorContainer.parentNode !== input && range.commonAncestorContainer !== input || (begin = range.startOffset, end = range.endOffset)) : document.selection && document.selection.createRange && (range = document.selection.createRange(), begin = 0 - range.duplicate().moveStart("character", -input.inputmask._valueGet().length), end = begin + range.text.length), {
        begin: notranslate ? begin : translatePosition.call(this, begin),
        end: notranslate ? end : translatePosition.call(this, end)
      };
      if (Array.isArray(begin) && (end = this.isRTL ? begin[0] : begin[1], begin = this.isRTL ? begin[1] : begin[0]), void 0 !== begin.begin && (end = this.isRTL ? begin.begin : begin.end, begin = this.isRTL ? begin.end : begin.begin), "number" == typeof begin) {
        begin = notranslate ? begin : translatePosition.call(this, begin), end = notranslate ? end : translatePosition.call(this, end), end = "number" == typeof end ? end : begin;
        var scrollCalc = parseInt(((input.ownerDocument.defaultView || window).getComputedStyle ? (input.ownerDocument.defaultView || window).getComputedStyle(input, null) : input.currentStyle).fontSize) * end;
        if (input.scrollLeft = scrollCalc > input.scrollWidth ? scrollCalc : 0, input.inputmask.caretPos = {
          begin: begin,
          end: end
        }, opts.insertModeVisual && !1 === opts.insertMode && begin === end && (isDelete || end++), input === (input.inputmask.shadowRoot || document).activeElement) if ("setSelectionRange" in input) input.setSelectionRange(begin, end);else if (window.getSelection) {
          if (range = document.createRange(), void 0 === input.firstChild || null === input.firstChild) {
            var textNode = document.createTextNode("");
            input.appendChild(textNode);
          }
          range.setStart(input.firstChild, begin < input.inputmask._valueGet().length ? begin : input.inputmask._valueGet().length), range.setEnd(input.firstChild, end < input.inputmask._valueGet().length ? end : input.inputmask._valueGet().length), range.collapse(!0);
          var sel = window.getSelection();
          sel.removeAllRanges(), sel.addRange(range);
        } else input.createTextRange && (range = input.createTextRange(), range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), range.select());
      }
    }
    function determineLastRequiredPosition(returnDefinition) {
      var inputmask = this,
        maskset = this.maskset,
        $ = this.dependencyLib,
        buffer = _validationTests.getMaskTemplate.call(this, !0, getLastValidPosition.call(this), !0, !0),
        bl = buffer.length,
        pos,
        lvp = getLastValidPosition.call(this),
        positions = {},
        lvTest = maskset.validPositions[lvp],
        ndxIntlzr = void 0 !== lvTest ? lvTest.locator.slice() : void 0,
        testPos;
      for (pos = lvp + 1; pos < buffer.length; pos++) testPos = _validationTests.getTestTemplate.call(this, pos, ndxIntlzr, pos - 1), ndxIntlzr = testPos.locator.slice(), positions[pos] = $.extend(!0, {}, testPos);
      var lvTestAlt = lvTest && void 0 !== lvTest.alternation ? lvTest.locator[lvTest.alternation] : void 0;
      for (pos = bl - 1; lvp < pos && (testPos = positions[pos], (testPos.match.optionality || testPos.match.optionalQuantifier && testPos.match.newBlockMarker || lvTestAlt && (lvTestAlt !== positions[pos].locator[lvTest.alternation] && 1 != testPos.match["static"] || !0 === testPos.match["static"] && testPos.locator[lvTest.alternation] && _validation.checkAlternationMatch.call(this, testPos.locator[lvTest.alternation].toString().split(","), lvTestAlt.toString().split(",")) && "" !== _validationTests.getTests.call(this, pos)[0].def)) && buffer[pos] === _validationTests.getPlaceholder.call(this, pos, testPos.match)); pos--) bl--;
      return returnDefinition ? {
        l: bl,
        def: positions[bl] ? positions[bl].match : void 0
      } : bl;
    }
    function determineNewCaretPosition(selectedCaret, tabbed) {
      var inputmask = this,
        maskset = this.maskset,
        opts = this.opts;
      function doRadixFocus(clickPos) {
        if ("" !== opts.radixPoint && 0 !== opts.digits) {
          var vps = maskset.validPositions;
          if (void 0 === vps[clickPos] || vps[clickPos].input === _validationTests.getPlaceholder.call(inputmask, clickPos)) {
            if (clickPos < seekNext.call(inputmask, -1)) return !0;
            var radixPos = getBuffer.call(inputmask).indexOf(opts.radixPoint);
            if (-1 !== radixPos) {
              for (var vp in vps) if (vps[vp] && radixPos < vp && vps[vp].input !== _validationTests.getPlaceholder.call(inputmask, vp)) return !1;
              return !0;
            }
          }
        }
        return !1;
      }
      if (tabbed && (inputmask.isRTL ? selectedCaret.end = selectedCaret.begin : selectedCaret.begin = selectedCaret.end), selectedCaret.begin === selectedCaret.end) {
        switch (opts.positionCaretOnClick) {
          case "none":
            break;
          case "select":
            selectedCaret = {
              begin: 0,
              end: getBuffer.call(inputmask).length
            };
            break;
          case "ignore":
            selectedCaret.end = selectedCaret.begin = seekNext.call(inputmask, getLastValidPosition.call(inputmask));
            break;
          case "radixFocus":
            if (doRadixFocus(selectedCaret.begin)) {
              var radixPos = getBuffer.call(inputmask).join("").indexOf(opts.radixPoint);
              selectedCaret.end = selectedCaret.begin = opts.numericInput ? seekNext.call(inputmask, radixPos) : radixPos;
              break;
            }
          default:
            var clickPosition = selectedCaret.begin,
              lvclickPosition = getLastValidPosition.call(inputmask, clickPosition, !0),
              lastPosition = seekNext.call(inputmask, -1 !== lvclickPosition || isMask.call(inputmask, 0) ? lvclickPosition : -1);
            if (clickPosition <= lastPosition) selectedCaret.end = selectedCaret.begin = isMask.call(inputmask, clickPosition, !1, !0) ? clickPosition : seekNext.call(inputmask, clickPosition);else {
              var lvp = maskset.validPositions[lvclickPosition],
                tt = _validationTests.getTestTemplate.call(inputmask, lastPosition, lvp ? lvp.match.locator : void 0, lvp),
                placeholder = _validationTests.getPlaceholder.call(inputmask, lastPosition, tt.match);
              if ("" !== placeholder && getBuffer.call(inputmask)[lastPosition] !== placeholder && !0 !== tt.match.optionalQuantifier && !0 !== tt.match.newBlockMarker || !isMask.call(inputmask, lastPosition, opts.keepStatic, !0) && tt.match.def === placeholder) {
                var newPos = seekNext.call(inputmask, lastPosition);
                (newPos <= clickPosition || clickPosition === lastPosition) && (lastPosition = newPos);
              }
              selectedCaret.end = selectedCaret.begin = lastPosition;
            }
        }
        return selectedCaret;
      }
    }
    function getBuffer(noCache) {
      var inputmask = this,
        maskset = this.maskset;
      return void 0 !== maskset.buffer && !0 !== noCache || (maskset.buffer = _validationTests.getMaskTemplate.call(this, !0, getLastValidPosition.call(this), !0), void 0 === maskset._buffer && (maskset._buffer = maskset.buffer.slice())), maskset.buffer;
    }
    function getBufferTemplate() {
      var inputmask = this,
        maskset = this.maskset;
      return void 0 === maskset._buffer && (maskset._buffer = _validationTests.getMaskTemplate.call(this, !1, 1), void 0 === maskset.buffer && (maskset.buffer = maskset._buffer.slice())), maskset._buffer;
    }
    function getLastValidPosition(closestTo, strict, validPositions) {
      var maskset = this.maskset,
        before = -1,
        after = -1,
        valids = validPositions || maskset.validPositions;
      for (var posNdx in void 0 === closestTo && (closestTo = -1), valids) {
        var psNdx = parseInt(posNdx);
        valids[psNdx] && (strict || !0 !== valids[psNdx].generatedInput) && (psNdx <= closestTo && (before = psNdx), closestTo <= psNdx && (after = psNdx));
      }
      return -1 === before || before == closestTo ? after : -1 == after ? before : closestTo - before < after - closestTo ? before : after;
    }
    function isMask(pos, strict, fuzzy) {
      var inputmask = this,
        maskset = this.maskset,
        test = _validationTests.getTestTemplate.call(this, pos).match;
      if ("" === test.def && (test = _validationTests.getTest.call(this, pos).match), !0 !== test["static"]) return test.fn;
      if (!0 === fuzzy && void 0 !== maskset.validPositions[pos] && !0 !== maskset.validPositions[pos].generatedInput) return !0;
      if (!0 !== strict && -1 < pos) {
        if (fuzzy) {
          var tests = _validationTests.getTests.call(this, pos);
          return tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0);
        }
        var testTemplate = _validationTests.determineTestTemplate.call(this, pos, _validationTests.getTests.call(this, pos)),
          testPlaceHolder = _validationTests.getPlaceholder.call(this, pos, testTemplate.match);
        return testTemplate.match.def !== testPlaceHolder;
      }
      return !1;
    }
    function resetMaskSet(soft) {
      var maskset = this.maskset;
      maskset.buffer = void 0, !0 !== soft && (maskset.validPositions = {}, maskset.p = 0);
    }
    function seekNext(pos, newBlock, fuzzy) {
      var inputmask = this;
      void 0 === fuzzy && (fuzzy = !0);
      for (var position = pos + 1; "" !== _validationTests.getTest.call(this, position).match.def && (!0 === newBlock && (!0 !== _validationTests.getTest.call(this, position).match.newBlockMarker || !isMask.call(this, position, void 0, !0)) || !0 !== newBlock && !isMask.call(this, position, void 0, fuzzy));) position++;
      return position;
    }
    function seekPrevious(pos, newBlock) {
      var inputmask = this,
        position = pos - 1;
      if (pos <= 0) return 0;
      for (; 0 < position && (!0 === newBlock && (!0 !== _validationTests.getTest.call(this, position).match.newBlockMarker || !isMask.call(this, position, void 0, !0)) || !0 !== newBlock && !isMask.call(this, position, void 0, !0));) position--;
      return position;
    }
    function translatePosition(pos) {
      var inputmask = this,
        opts = this.opts,
        el = this.el;
      return !this.isRTL || "number" != typeof pos || opts.greedy && "" === opts.placeholder || !el || (pos = Math.abs(this._valueGet().length - pos)), pos;
    }
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports["default"] = void 0, __webpack_require__(16), __webpack_require__(17);
    var _mask = __webpack_require__(10),
      _inputmask = _interopRequireDefault(__webpack_require__(9)),
      _window = _interopRequireDefault(__webpack_require__(6)),
      _maskLexer = __webpack_require__(20),
      _validationTests = __webpack_require__(3),
      _positioning = __webpack_require__(1),
      _validation = __webpack_require__(4),
      _inputHandling = __webpack_require__(5),
      _eventruler = __webpack_require__(11),
      _definitions = _interopRequireDefault(__webpack_require__(21)),
      _defaults = _interopRequireDefault(__webpack_require__(22));
    function _typeof(obj) {
      return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
        return _typeof2(obj);
      } : function _typeof(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      }, _typeof(obj);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    var document = _window["default"].document,
      dataKey = "_inputmask_opts";
    function Inputmask(alias, options, internal) {
      if (!(this instanceof Inputmask)) return new Inputmask(alias, options, internal);
      this.dependencyLib = _inputmask["default"], this.el = void 0, this.events = {}, this.maskset = void 0, !0 !== internal && ("[object Object]" === Object.prototype.toString.call(alias) ? options = alias : (options = options || {}, alias && (options.alias = alias)), this.opts = _inputmask["default"].extend(!0, {}, this.defaults, options), this.noMasksCache = options && void 0 !== options.definitions, this.userOptions = options || {}, resolveAlias(this.opts.alias, options, this.opts)), this.refreshValue = !1, this.undoValue = void 0, this.$el = void 0, this.skipKeyPressEvent = !1, this.skipInputEvent = !1, this.validationEvent = !1, this.ignorable = !1, this.maxLength, this.mouseEnter = !1, this.originalPlaceholder = void 0, this.isComposing = !1;
    }
    function resolveAlias(aliasStr, options, opts) {
      var aliasDefinition = Inputmask.prototype.aliases[aliasStr];
      return aliasDefinition ? (aliasDefinition.alias && resolveAlias(aliasDefinition.alias, void 0, opts), _inputmask["default"].extend(!0, opts, aliasDefinition), _inputmask["default"].extend(!0, opts, options), !0) : (null === opts.mask && (opts.mask = aliasStr), !1);
    }
    function importAttributeOptions(npt, opts, userOptions, dataAttribute) {
      function importOption(option, optionData) {
        var attrOption = "" === dataAttribute ? option : dataAttribute + "-" + option;
        optionData = void 0 !== optionData ? optionData : npt.getAttribute(attrOption), null !== optionData && ("string" == typeof optionData && (0 === option.indexOf("on") ? optionData = _window["default"][optionData] : "false" === optionData ? optionData = !1 : "true" === optionData && (optionData = !0)), userOptions[option] = optionData);
      }
      if (!0 === opts.importDataAttributes) {
        var attrOptions = npt.getAttribute(dataAttribute),
          option,
          dataoptions,
          optionData,
          p;
        if (attrOptions && "" !== attrOptions && (attrOptions = attrOptions.replace(/'/g, '"'), dataoptions = JSON.parse("{" + attrOptions + "}")), dataoptions) for (p in optionData = void 0, dataoptions) if ("alias" === p.toLowerCase()) {
          optionData = dataoptions[p];
          break;
        }
        for (option in importOption("alias", optionData), userOptions.alias && resolveAlias(userOptions.alias, userOptions, opts), opts) {
          if (dataoptions) for (p in optionData = void 0, dataoptions) if (p.toLowerCase() === option.toLowerCase()) {
            optionData = dataoptions[p];
            break;
          }
          importOption(option, optionData);
        }
      }
      return _inputmask["default"].extend(!0, opts, userOptions), "rtl" !== npt.dir && !opts.rightAlign || (npt.style.textAlign = "right"), "rtl" !== npt.dir && !opts.numericInput || (npt.dir = "ltr", npt.removeAttribute("dir"), opts.isRTL = !0), Object.keys(userOptions).length;
    }
    Inputmask.prototype = {
      dataAttribute: "data-inputmask",
      defaults: _defaults["default"],
      definitions: _definitions["default"],
      aliases: {},
      masksCache: {},
      get isRTL() {
        return this.opts.isRTL || this.opts.numericInput;
      },
      mask: function mask(elems) {
        var that = this;
        return "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : Array.isArray(elems) ? elems : Array.from(elems), elems.forEach(function (el, ndx) {
          var scopedOpts = _inputmask["default"].extend(!0, {}, that.opts);
          if (importAttributeOptions(el, scopedOpts, _inputmask["default"].extend(!0, {}, that.userOptions), that.dataAttribute)) {
            var maskset = (0, _maskLexer.generateMaskSet)(scopedOpts, that.noMasksCache);
            void 0 !== maskset && (void 0 !== el.inputmask && (el.inputmask.opts.autoUnmask = !0, el.inputmask.remove()), el.inputmask = new Inputmask(void 0, void 0, !0), el.inputmask.opts = scopedOpts, el.inputmask.noMasksCache = that.noMasksCache, el.inputmask.userOptions = _inputmask["default"].extend(!0, {}, that.userOptions), el.inputmask.el = el, el.inputmask.$el = (0, _inputmask["default"])(el), el.inputmask.maskset = maskset, _inputmask["default"].data(el, dataKey, that.userOptions), _mask.mask.call(el.inputmask));
          }
        }), elems && elems[0] && elems[0].inputmask || this;
      },
      option: function option(options, noremask) {
        return "string" == typeof options ? this.opts[options] : "object" === _typeof(options) ? (_inputmask["default"].extend(this.userOptions, options), this.el && !0 !== noremask && this.mask(this.el), this) : void 0;
      },
      unmaskedvalue: function unmaskedvalue(value) {
        if (this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), void 0 === this.el || void 0 !== value) {
          var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");
          _inputHandling.checkVal.call(this, void 0, !1, !1, valueBuffer), "function" == typeof this.opts.onBeforeWrite && this.opts.onBeforeWrite.call(this, void 0, _positioning.getBuffer.call(this), 0, this.opts);
        }
        return _inputHandling.unmaskedvalue.call(this, this.el);
      },
      remove: function remove() {
        if (this.el) {
          _inputmask["default"].data(this.el, dataKey, null);
          var cv = this.opts.autoUnmask ? (0, _inputHandling.unmaskedvalue)(this.el) : this._valueGet(this.opts.autoUnmask),
            valueProperty;
          cv !== _positioning.getBufferTemplate.call(this).join("") ? this._valueSet(cv, this.opts.autoUnmask) : this._valueSet(""), _eventruler.EventRuler.off(this.el), Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? (valueProperty = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.el), "value"), valueProperty && this.__valueGet && Object.defineProperty(this.el, "value", {
            get: this.__valueGet,
            set: this.__valueSet,
            configurable: !0
          })) : document.__lookupGetter__ && this.el.__lookupGetter__("value") && this.__valueGet && (this.el.__defineGetter__("value", this.__valueGet), this.el.__defineSetter__("value", this.__valueSet)), this.el.inputmask = void 0;
        }
        return this.el;
      },
      getemptymask: function getemptymask() {
        return this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), _positioning.getBufferTemplate.call(this).join("");
      },
      hasMaskedValue: function hasMaskedValue() {
        return !this.opts.autoUnmask;
      },
      isComplete: function isComplete() {
        return this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), _validation.isComplete.call(this, _positioning.getBuffer.call(this));
      },
      getmetadata: function getmetadata() {
        if (this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), Array.isArray(this.maskset.metadata)) {
          var maskTarget = _validationTests.getMaskTemplate.call(this, !0, 0, !1).join("");
          return this.maskset.metadata.forEach(function (mtdt) {
            return mtdt.mask !== maskTarget || (maskTarget = mtdt, !1);
          }), maskTarget;
        }
        return this.maskset.metadata;
      },
      isValid: function isValid(value) {
        if (this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache), value) {
          var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");
          _inputHandling.checkVal.call(this, void 0, !0, !1, valueBuffer);
        } else value = this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join("");
        for (var buffer = _positioning.getBuffer.call(this), rl = _positioning.determineLastRequiredPosition.call(this), lmib = buffer.length - 1; rl < lmib && !_positioning.isMask.call(this, lmib); lmib--);
        return buffer.splice(rl, lmib + 1 - rl), _validation.isComplete.call(this, buffer) && value === (this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join(""));
      },
      format: function format(value, metadata) {
        this.maskset = this.maskset || (0, _maskLexer.generateMaskSet)(this.opts, this.noMasksCache);
        var valueBuffer = ("function" == typeof this.opts.onBeforeMask && this.opts.onBeforeMask.call(this, value, this.opts) || value).split("");
        _inputHandling.checkVal.call(this, void 0, !0, !1, valueBuffer);
        var formattedValue = this.isRTL ? _positioning.getBuffer.call(this).slice().reverse().join("") : _positioning.getBuffer.call(this).join("");
        return metadata ? {
          value: formattedValue,
          metadata: this.getmetadata()
        } : formattedValue;
      },
      setValue: function setValue(value) {
        this.el && (0, _inputmask["default"])(this.el).trigger("setvalue", [value]);
      },
      analyseMask: _maskLexer.analyseMask
    }, Inputmask.extendDefaults = function (options) {
      _inputmask["default"].extend(!0, Inputmask.prototype.defaults, options);
    }, Inputmask.extendDefinitions = function (definition) {
      _inputmask["default"].extend(!0, Inputmask.prototype.definitions, definition);
    }, Inputmask.extendAliases = function (alias) {
      _inputmask["default"].extend(!0, Inputmask.prototype.aliases, alias);
    }, Inputmask.format = function (value, options, metadata) {
      return Inputmask(options).format(value, metadata);
    }, Inputmask.unmask = function (value, options) {
      return Inputmask(options).unmaskedvalue(value);
    }, Inputmask.isValid = function (value, options) {
      return Inputmask(options).isValid(value);
    }, Inputmask.remove = function (elems) {
      "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, elems.forEach(function (el) {
        el.inputmask && el.inputmask.remove();
      });
    }, Inputmask.setValue = function (elems, value) {
      "string" == typeof elems && (elems = document.getElementById(elems) || document.querySelectorAll(elems)), elems = elems.nodeName ? [elems] : elems, elems.forEach(function (el) {
        el.inputmask ? el.inputmask.setValue(value) : (0, _inputmask["default"])(el).trigger("setvalue", [value]);
      });
    }, Inputmask.dependencyLib = _inputmask["default"], _window["default"].Inputmask = Inputmask;
    var _default = Inputmask;
    exports["default"] = _default;
  }, function (module, exports, __webpack_require__) {
    "use strict";

    function getLocator(tst, align) {
      var locator = (null != tst.alternation ? tst.mloc[getDecisionTaker(tst)] : tst.locator).join("");
      if ("" !== locator) for (; locator.length < align;) locator += "0";
      return locator;
    }
    function getDecisionTaker(tst) {
      var decisionTaker = tst.locator[tst.alternation];
      return "string" == typeof decisionTaker && 0 < decisionTaker.length && (decisionTaker = decisionTaker.split(",")[0]), void 0 !== decisionTaker ? decisionTaker.toString() : "";
    }
    function getPlaceholder(pos, test, returnPL) {
      var inputmask = this,
        opts = this.opts,
        maskset = this.maskset;
      if (test = test || getTest.call(this, pos).match, void 0 !== test.placeholder || !0 === returnPL) return "function" == typeof test.placeholder ? test.placeholder(opts) : test.placeholder;
      if (!0 !== test["static"]) return opts.placeholder.charAt(pos % opts.placeholder.length);
      if (-1 < pos && void 0 === maskset.validPositions[pos]) {
        var tests = getTests.call(this, pos),
          staticAlternations = [],
          prevTest;
        if (tests.length > 1 + ("" === tests[tests.length - 1].match.def ? 1 : 0)) for (var i = 0; i < tests.length; i++) if ("" !== tests[i].match.def && !0 !== tests[i].match.optionality && !0 !== tests[i].match.optionalQuantifier && (!0 === tests[i].match["static"] || void 0 === prevTest || !1 !== tests[i].match.fn.test(prevTest.match.def, maskset, pos, !0, opts)) && (staticAlternations.push(tests[i]), !0 === tests[i].match["static"] && (prevTest = tests[i]), 1 < staticAlternations.length && /[0-9a-bA-Z]/.test(staticAlternations[0].match.def))) return opts.placeholder.charAt(pos % opts.placeholder.length);
      }
      return test.def;
    }
    function getMaskTemplate(baseOnInput, minimalPos, includeMode, noJit, clearOptionalTail) {
      var inputmask = this,
        opts = this.opts,
        maskset = this.maskset,
        greedy = opts.greedy;
      clearOptionalTail && (opts.greedy = !1), minimalPos = minimalPos || 0;
      var maskTemplate = [],
        ndxIntlzr,
        pos = 0,
        test,
        testPos,
        jitRenderStatic;
      do {
        if (!0 === baseOnInput && maskset.validPositions[pos]) testPos = clearOptionalTail && !0 === maskset.validPositions[pos].match.optionality && void 0 === maskset.validPositions[pos + 1] && (!0 === maskset.validPositions[pos].generatedInput || maskset.validPositions[pos].input == opts.skipOptionalPartCharacter && 0 < pos) ? determineTestTemplate.call(this, pos, getTests.call(this, pos, ndxIntlzr, pos - 1)) : maskset.validPositions[pos], test = testPos.match, ndxIntlzr = testPos.locator.slice(), maskTemplate.push(!0 === includeMode ? testPos.input : !1 === includeMode ? test.nativeDef : getPlaceholder.call(this, pos, test));else {
          testPos = getTestTemplate.call(this, pos, ndxIntlzr, pos - 1), test = testPos.match, ndxIntlzr = testPos.locator.slice();
          var jitMasking = !0 !== noJit && (!1 !== opts.jitMasking ? opts.jitMasking : test.jit);
          jitRenderStatic = jitRenderStatic && test["static"] && test.def !== opts.groupSeparator && null === test.fn || maskset.validPositions[pos - 1] && test["static"] && test.def !== opts.groupSeparator && null === test.fn, jitRenderStatic || !1 === jitMasking || void 0 === jitMasking || "number" == typeof jitMasking && isFinite(jitMasking) && pos < jitMasking ? maskTemplate.push(!1 === includeMode ? test.nativeDef : getPlaceholder.call(this, pos, test)) : jitRenderStatic = !1;
        }
        pos++;
      } while ((void 0 === this.maxLength || pos < this.maxLength) && (!0 !== test["static"] || "" !== test.def) || pos < minimalPos);
      return "" === maskTemplate[maskTemplate.length - 1] && maskTemplate.pop(), !1 === includeMode && void 0 !== maskset.maskLength || (maskset.maskLength = pos - 1), opts.greedy = greedy, maskTemplate;
    }
    function getTestTemplate(pos, ndxIntlzr, tstPs) {
      var inputmask = this,
        maskset = this.maskset;
      return maskset.validPositions[pos] || determineTestTemplate.call(this, pos, getTests.call(this, pos, ndxIntlzr ? ndxIntlzr.slice() : ndxIntlzr, tstPs));
    }
    function determineTestTemplate(pos, tests) {
      var inputmask = this,
        opts = this.opts;
      pos = 0 < pos ? pos - 1 : 0;
      for (var altTest = getTest.call(this, pos), targetLocator = getLocator(altTest), tstLocator, closest, bestMatch, ndx = 0; ndx < tests.length; ndx++) {
        var tst = tests[ndx];
        tstLocator = getLocator(tst, targetLocator.length);
        var distance = Math.abs(tstLocator - targetLocator);
        (void 0 === closest || "" !== tstLocator && distance < closest || bestMatch && !opts.greedy && bestMatch.match.optionality && "master" === bestMatch.match.newBlockMarker && (!tst.match.optionality || !tst.match.newBlockMarker) || bestMatch && bestMatch.match.optionalQuantifier && !tst.match.optionalQuantifier) && (closest = distance, bestMatch = tst);
      }
      return bestMatch;
    }
    function getTest(pos, tests) {
      var inputmask = this,
        maskset = this.maskset;
      return maskset.validPositions[pos] ? maskset.validPositions[pos] : (tests || getTests.call(this, pos))[0];
    }
    function getTests(pos, ndxIntlzr, tstPs) {
      var inputmask = this,
        $ = this.dependencyLib,
        maskset = this.maskset,
        opts = this.opts,
        el = this.el,
        maskTokens = maskset.maskToken,
        testPos = ndxIntlzr ? tstPs : 0,
        ndxInitializer = ndxIntlzr ? ndxIntlzr.slice() : [0],
        matches = [],
        insertStop = !1,
        latestMatch,
        cacheDependency = ndxIntlzr ? ndxIntlzr.join("") : "";
      function resolveTestFromToken(maskToken, ndxInitializer, loopNdx, quantifierRecurse) {
        function handleMatch(match, loopNdx, quantifierRecurse) {
          function isFirstMatch(latestMatch, tokenGroup) {
            var firstMatch = 0 === tokenGroup.matches.indexOf(latestMatch);
            return firstMatch || tokenGroup.matches.every(function (match, ndx) {
              return !0 === match.isQuantifier ? firstMatch = isFirstMatch(latestMatch, tokenGroup.matches[ndx - 1]) : Object.prototype.hasOwnProperty.call(match, "matches") && (firstMatch = isFirstMatch(latestMatch, match)), !firstMatch;
            }), firstMatch;
          }
          function resolveNdxInitializer(pos, alternateNdx, targetAlternation) {
            var bestMatch, indexPos;
            if ((maskset.tests[pos] || maskset.validPositions[pos]) && (maskset.tests[pos] || [maskset.validPositions[pos]]).every(function (lmnt, ndx) {
              if (lmnt.mloc[alternateNdx]) return bestMatch = lmnt, !1;
              var alternation = void 0 !== targetAlternation ? targetAlternation : lmnt.alternation,
                ndxPos = void 0 !== lmnt.locator[alternation] ? lmnt.locator[alternation].toString().indexOf(alternateNdx) : -1;
              return (void 0 === indexPos || ndxPos < indexPos) && -1 !== ndxPos && (bestMatch = lmnt, indexPos = ndxPos), !0;
            }), bestMatch) {
              var bestMatchAltIndex = bestMatch.locator[bestMatch.alternation],
                locator = bestMatch.mloc[alternateNdx] || bestMatch.mloc[bestMatchAltIndex] || bestMatch.locator;
              return locator.slice((void 0 !== targetAlternation ? targetAlternation : bestMatch.alternation) + 1);
            }
            return void 0 !== targetAlternation ? resolveNdxInitializer(pos, alternateNdx) : void 0;
          }
          function isSubsetOf(source, target) {
            function expand(pattern) {
              for (var expanded = [], start = -1, end, i = 0, l = pattern.length; i < l; i++) if ("-" === pattern.charAt(i)) for (end = pattern.charCodeAt(i + 1); ++start < end;) expanded.push(String.fromCharCode(start));else start = pattern.charCodeAt(i), expanded.push(pattern.charAt(i));
              return expanded.join("");
            }
            return source.match.def === target.match.nativeDef || !(!(opts.regex || source.match.fn instanceof RegExp && target.match.fn instanceof RegExp) || !0 === source.match["static"] || !0 === target.match["static"]) && -1 !== expand(target.match.fn.toString().replace(/[[\]/]/g, "")).indexOf(expand(source.match.fn.toString().replace(/[[\]/]/g, "")));
          }
          function staticCanMatchDefinition(source, target) {
            return !0 === source.match["static"] && !0 !== target.match["static"] && target.match.fn.test(source.match.def, maskset, pos, !1, opts, !1);
          }
          function setMergeLocators(targetMatch, altMatch) {
            var alternationNdx = targetMatch.alternation,
              shouldMerge = void 0 === altMatch || alternationNdx === altMatch.alternation && -1 === targetMatch.locator[alternationNdx].toString().indexOf(altMatch.locator[alternationNdx]);
            if (!shouldMerge && alternationNdx > altMatch.alternation) for (var i = altMatch.alternation; i < alternationNdx; i++) if (targetMatch.locator[i] !== altMatch.locator[i]) {
              alternationNdx = i, shouldMerge = !0;
              break;
            }
            if (shouldMerge) {
              targetMatch.mloc = targetMatch.mloc || {};
              var locNdx = targetMatch.locator[alternationNdx];
              if (void 0 !== locNdx) {
                if ("string" == typeof locNdx && (locNdx = locNdx.split(",")[0]), void 0 === targetMatch.mloc[locNdx] && (targetMatch.mloc[locNdx] = targetMatch.locator.slice()), void 0 !== altMatch) {
                  for (var ndx in altMatch.mloc) "string" == typeof ndx && (ndx = ndx.split(",")[0]), void 0 === targetMatch.mloc[ndx] && (targetMatch.mloc[ndx] = altMatch.mloc[ndx]);
                  targetMatch.locator[alternationNdx] = Object.keys(targetMatch.mloc).join(",");
                }
                return !0;
              }
              targetMatch.alternation = void 0;
            }
            return !1;
          }
          function isSameLevel(targetMatch, altMatch) {
            if (targetMatch.locator.length !== altMatch.locator.length) return !1;
            for (var locNdx = targetMatch.alternation + 1; locNdx < targetMatch.locator.length; locNdx++) if (targetMatch.locator[locNdx] !== altMatch.locator[locNdx]) return !1;
            return !0;
          }
          if (testPos > pos + opts._maxTestPos) throw "Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. " + maskset.mask;
          if (testPos === pos && void 0 === match.matches) return matches.push({
            match: match,
            locator: loopNdx.reverse(),
            cd: cacheDependency,
            mloc: {}
          }), !0;
          if (void 0 !== match.matches) {
            if (match.isGroup && quantifierRecurse !== match) {
              if (match = handleMatch(maskToken.matches[maskToken.matches.indexOf(match) + 1], loopNdx, quantifierRecurse), match) return !0;
            } else if (match.isOptional) {
              var optionalToken = match,
                mtchsNdx = matches.length;
              if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), match) {
                if (matches.forEach(function (mtch, ndx) {
                  mtchsNdx <= ndx && (mtch.match.optionality = !0);
                }), latestMatch = matches[matches.length - 1].match, void 0 !== quantifierRecurse || !isFirstMatch(latestMatch, optionalToken)) return !0;
                insertStop = !0, testPos = pos;
              }
            } else if (match.isAlternator) {
              var alternateToken = match,
                malternateMatches = [],
                maltMatches,
                currentMatches = matches.slice(),
                loopNdxCnt = loopNdx.length,
                altIndex = 0 < ndxInitializer.length ? ndxInitializer.shift() : -1;
              if (-1 === altIndex || "string" == typeof altIndex) {
                var currentPos = testPos,
                  ndxInitializerClone = ndxInitializer.slice(),
                  altIndexArr = [],
                  amndx;
                if ("string" == typeof altIndex) altIndexArr = altIndex.split(",");else for (amndx = 0; amndx < alternateToken.matches.length; amndx++) altIndexArr.push(amndx.toString());
                if (void 0 !== maskset.excludes[pos]) {
                  for (var altIndexArrClone = altIndexArr.slice(), i = 0, exl = maskset.excludes[pos].length; i < exl; i++) {
                    var excludeSet = maskset.excludes[pos][i].toString().split(":");
                    loopNdx.length == excludeSet[1] && altIndexArr.splice(altIndexArr.indexOf(excludeSet[0]), 1);
                  }
                  0 === altIndexArr.length && (delete maskset.excludes[pos], altIndexArr = altIndexArrClone);
                }
                (!0 === opts.keepStatic || isFinite(parseInt(opts.keepStatic)) && currentPos >= opts.keepStatic) && (altIndexArr = altIndexArr.slice(0, 1));
                for (var unMatchedAlternation = !1, ndx = 0; ndx < altIndexArr.length; ndx++) {
                  amndx = parseInt(altIndexArr[ndx]), matches = [], ndxInitializer = "string" == typeof altIndex && resolveNdxInitializer(testPos, amndx, loopNdxCnt) || ndxInitializerClone.slice(), alternateToken.matches[amndx] && handleMatch(alternateToken.matches[amndx], [amndx].concat(loopNdx), quantifierRecurse) ? match = !0 : 0 === ndx && (unMatchedAlternation = !0), maltMatches = matches.slice(), testPos = currentPos, matches = [];
                  for (var ndx1 = 0; ndx1 < maltMatches.length; ndx1++) {
                    var altMatch = maltMatches[ndx1],
                      dropMatch = !1;
                    altMatch.match.jit = altMatch.match.jit || unMatchedAlternation, altMatch.alternation = altMatch.alternation || loopNdxCnt, setMergeLocators(altMatch);
                    for (var ndx2 = 0; ndx2 < malternateMatches.length; ndx2++) {
                      var altMatch2 = malternateMatches[ndx2];
                      if ("string" != typeof altIndex || void 0 !== altMatch.alternation && altIndexArr.includes(altMatch.locator[altMatch.alternation].toString())) {
                        if (altMatch.match.nativeDef === altMatch2.match.nativeDef) {
                          dropMatch = !0, setMergeLocators(altMatch2, altMatch);
                          break;
                        }
                        if (isSubsetOf(altMatch, altMatch2)) {
                          setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch));
                          break;
                        }
                        if (isSubsetOf(altMatch2, altMatch)) {
                          setMergeLocators(altMatch2, altMatch);
                          break;
                        }
                        if (staticCanMatchDefinition(altMatch, altMatch2)) {
                          isSameLevel(altMatch, altMatch2) || void 0 !== el.inputmask.userOptions.keepStatic ? setMergeLocators(altMatch, altMatch2) && (dropMatch = !0, malternateMatches.splice(malternateMatches.indexOf(altMatch2), 0, altMatch)) : opts.keepStatic = !0;
                          break;
                        }
                      }
                    }
                    dropMatch || malternateMatches.push(altMatch);
                  }
                }
                matches = currentMatches.concat(malternateMatches), testPos = pos, insertStop = 0 < matches.length, match = 0 < malternateMatches.length, ndxInitializer = ndxInitializerClone.slice();
              } else match = handleMatch(alternateToken.matches[altIndex] || maskToken.matches[altIndex], [altIndex].concat(loopNdx), quantifierRecurse);
              if (match) return !0;
            } else if (match.isQuantifier && quantifierRecurse !== maskToken.matches[maskToken.matches.indexOf(match) - 1]) for (var qt = match, qndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; qndx < (isNaN(qt.quantifier.max) ? qndx + 1 : qt.quantifier.max) && testPos <= pos; qndx++) {
              var tokenGroup = maskToken.matches[maskToken.matches.indexOf(qt) - 1];
              if (match = handleMatch(tokenGroup, [qndx].concat(loopNdx), tokenGroup), match) {
                if (latestMatch = matches[matches.length - 1].match, latestMatch.optionalQuantifier = qndx >= qt.quantifier.min, latestMatch.jit = (qndx || 1) * tokenGroup.matches.indexOf(latestMatch) >= qt.quantifier.jit, latestMatch.optionalQuantifier && isFirstMatch(latestMatch, tokenGroup)) {
                  insertStop = !0, testPos = pos;
                  break;
                }
                return latestMatch.jit && (maskset.jitOffset[pos] = tokenGroup.matches.length - tokenGroup.matches.indexOf(latestMatch)), !0;
              }
            } else if (match = resolveTestFromToken(match, ndxInitializer, loopNdx, quantifierRecurse), match) return !0;
          } else testPos++;
        }
        for (var tndx = 0 < ndxInitializer.length ? ndxInitializer.shift() : 0; tndx < maskToken.matches.length; tndx++) if (!0 !== maskToken.matches[tndx].isQuantifier) {
          var match = handleMatch(maskToken.matches[tndx], [tndx].concat(loopNdx), quantifierRecurse);
          if (match && testPos === pos) return match;
          if (pos < testPos) break;
        }
      }
      function mergeLocators(pos, tests) {
        var locator = [],
          alternation;
        return Array.isArray(tests) || (tests = [tests]), 0 < tests.length && (void 0 === tests[0].alternation || !0 === opts.keepStatic ? (locator = determineTestTemplate.call(inputmask, pos, tests.slice()).locator.slice(), 0 === locator.length && (locator = tests[0].locator.slice())) : tests.forEach(function (tst) {
          "" !== tst.def && (0 === locator.length ? (alternation = tst.alternation, locator = tst.locator.slice()) : tst.locator[alternation] && -1 === locator[alternation].toString().indexOf(tst.locator[alternation]) && (locator[alternation] += "," + tst.locator[alternation]));
        })), locator;
      }
      if (-1 < pos && (void 0 === inputmask.maxLength || pos < inputmask.maxLength)) {
        if (void 0 === ndxIntlzr) {
          for (var previousPos = pos - 1, test; void 0 === (test = maskset.validPositions[previousPos] || maskset.tests[previousPos]) && -1 < previousPos;) previousPos--;
          void 0 !== test && -1 < previousPos && (ndxInitializer = mergeLocators(previousPos, test), cacheDependency = ndxInitializer.join(""), testPos = previousPos);
        }
        if (maskset.tests[pos] && maskset.tests[pos][0].cd === cacheDependency) return maskset.tests[pos];
        for (var mtndx = ndxInitializer.shift(); mtndx < maskTokens.length; mtndx++) {
          var match = resolveTestFromToken(maskTokens[mtndx], ndxInitializer, [mtndx]);
          if (match && testPos === pos || pos < testPos) break;
        }
      }
      return 0 !== matches.length && !insertStop || matches.push({
        match: {
          fn: null,
          "static": !0,
          optionality: !1,
          casing: null,
          def: "",
          placeholder: ""
        },
        locator: [],
        mloc: {},
        cd: cacheDependency
      }), void 0 !== ndxIntlzr && maskset.tests[pos] ? $.extend(!0, [], matches) : (maskset.tests[pos] = $.extend(!0, [], matches), maskset.tests[pos]);
    }
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.determineTestTemplate = determineTestTemplate, exports.getDecisionTaker = getDecisionTaker, exports.getMaskTemplate = getMaskTemplate, exports.getPlaceholder = getPlaceholder, exports.getTest = getTest, exports.getTests = getTests, exports.getTestTemplate = getTestTemplate;
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.alternate = alternate, exports.checkAlternationMatch = checkAlternationMatch, exports.isComplete = isComplete, exports.isValid = isValid, exports.refreshFromBuffer = refreshFromBuffer, exports.revalidateMask = revalidateMask, exports.handleRemove = handleRemove;
    var _validationTests = __webpack_require__(3),
      _keycode = _interopRequireDefault(__webpack_require__(0)),
      _positioning = __webpack_require__(1),
      _eventhandlers = __webpack_require__(7);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    function alternate(maskPos, c, strict, fromIsValid, rAltPos, selection) {
      var inputmask = this,
        $ = this.dependencyLib,
        opts = this.opts,
        maskset = this.maskset,
        validPsClone = $.extend(!0, {}, maskset.validPositions),
        tstClone = $.extend(!0, {}, maskset.tests),
        lastAlt,
        alternation,
        isValidRslt = !1,
        returnRslt = !1,
        altPos,
        prevAltPos,
        i,
        validPos,
        decisionPos,
        lAltPos = void 0 !== rAltPos ? rAltPos : _positioning.getLastValidPosition.call(this),
        nextPos,
        input,
        begin,
        end;
      if (selection && (begin = selection.begin, end = selection.end, selection.begin > selection.end && (begin = selection.end, end = selection.begin)), -1 === lAltPos && void 0 === rAltPos) lastAlt = 0, prevAltPos = _validationTests.getTest.call(this, lastAlt), alternation = prevAltPos.alternation;else for (; 0 <= lAltPos; lAltPos--) if (altPos = maskset.validPositions[lAltPos], altPos && void 0 !== altPos.alternation) {
        if (prevAltPos && prevAltPos.locator[altPos.alternation] !== altPos.locator[altPos.alternation]) break;
        lastAlt = lAltPos, alternation = maskset.validPositions[lastAlt].alternation, prevAltPos = altPos;
      }
      if (void 0 !== alternation) {
        decisionPos = parseInt(lastAlt), maskset.excludes[decisionPos] = maskset.excludes[decisionPos] || [], !0 !== maskPos && maskset.excludes[decisionPos].push((0, _validationTests.getDecisionTaker)(prevAltPos) + ":" + prevAltPos.alternation);
        var validInputs = [],
          resultPos = -1;
        for (i = decisionPos; i < _positioning.getLastValidPosition.call(this, void 0, !0) + 1; i++) -1 === resultPos && maskPos <= i && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1), validPos = maskset.validPositions[i], validPos && !0 !== validPos.generatedInput && (void 0 === selection || i < begin || end <= i) && validInputs.push(validPos.input), delete maskset.validPositions[i];
        for (-1 === resultPos && void 0 !== c && (validInputs.push(c), resultPos = validInputs.length - 1); void 0 !== maskset.excludes[decisionPos] && maskset.excludes[decisionPos].length < 10;) {
          for (maskset.tests = {}, _positioning.resetMaskSet.call(this, !0), isValidRslt = !0, i = 0; i < validInputs.length && (nextPos = isValidRslt.caret || _positioning.getLastValidPosition.call(this, void 0, !0) + 1, input = validInputs[i], isValidRslt = isValid.call(this, nextPos, input, !1, fromIsValid, !0)); i++) i === resultPos && (returnRslt = isValidRslt), 1 == maskPos && isValidRslt && (returnRslt = {
            caretPos: i
          });
          if (isValidRslt) break;
          if (_positioning.resetMaskSet.call(this), prevAltPos = _validationTests.getTest.call(this, decisionPos), maskset.validPositions = $.extend(!0, {}, validPsClone), maskset.tests = $.extend(!0, {}, tstClone), !maskset.excludes[decisionPos]) {
            returnRslt = alternate.call(this, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
            break;
          }
          var decisionTaker = (0, _validationTests.getDecisionTaker)(prevAltPos);
          if (-1 !== maskset.excludes[decisionPos].indexOf(decisionTaker + ":" + prevAltPos.alternation)) {
            returnRslt = alternate.call(this, maskPos, c, strict, fromIsValid, decisionPos - 1, selection);
            break;
          }
          for (maskset.excludes[decisionPos].push(decisionTaker + ":" + prevAltPos.alternation), i = decisionPos; i < _positioning.getLastValidPosition.call(this, void 0, !0) + 1; i++) delete maskset.validPositions[i];
        }
      }
      return returnRslt && !1 === opts.keepStatic || delete maskset.excludes[decisionPos], returnRslt;
    }
    function casing(elem, test, pos) {
      var opts = this.opts,
        maskset = this.maskset;
      switch (opts.casing || test.casing) {
        case "upper":
          elem = elem.toUpperCase();
          break;
        case "lower":
          elem = elem.toLowerCase();
          break;
        case "title":
          var posBefore = maskset.validPositions[pos - 1];
          elem = 0 === pos || posBefore && posBefore.input === String.fromCharCode(_keycode["default"].SPACE) ? elem.toUpperCase() : elem.toLowerCase();
          break;
        default:
          if ("function" == typeof opts.casing) {
            var args = Array.prototype.slice.call(arguments);
            args.push(maskset.validPositions), elem = opts.casing.apply(this, args);
          }
      }
      return elem;
    }
    function checkAlternationMatch(altArr1, altArr2, na) {
      for (var opts = this.opts, altArrC = opts.greedy ? altArr2 : altArr2.slice(0, 1), isMatch = !1, naArr = void 0 !== na ? na.split(",") : [], naNdx, i = 0; i < naArr.length; i++) -1 !== (naNdx = altArr1.indexOf(naArr[i])) && altArr1.splice(naNdx, 1);
      for (var alndx = 0; alndx < altArr1.length; alndx++) if (altArrC.includes(altArr1[alndx])) {
        isMatch = !0;
        break;
      }
      return isMatch;
    }
    function handleRemove(input, k, pos, strict, fromIsValid) {
      var inputmask = this,
        maskset = this.maskset,
        opts = this.opts;
      if ((opts.numericInput || this.isRTL) && (k === _keycode["default"].BACKSPACE ? k = _keycode["default"].DELETE : k === _keycode["default"].DELETE && (k = _keycode["default"].BACKSPACE), this.isRTL)) {
        var pend = pos.end;
        pos.end = pos.begin, pos.begin = pend;
      }
      var lvp = _positioning.getLastValidPosition.call(this, void 0, !0),
        offset;
      if (pos.end >= _positioning.getBuffer.call(this).length && lvp >= pos.end && (pos.end = lvp + 1), k === _keycode["default"].BACKSPACE ? pos.end - pos.begin < 1 && (pos.begin = _positioning.seekPrevious.call(this, pos.begin)) : k === _keycode["default"].DELETE && pos.begin === pos.end && (pos.end = _positioning.isMask.call(this, pos.end, !0, !0) ? pos.end + 1 : _positioning.seekNext.call(this, pos.end) + 1), !1 !== (offset = revalidateMask.call(this, pos))) {
        if (!0 !== strict && !1 !== opts.keepStatic || null !== opts.regex && -1 !== _validationTests.getTest.call(this, pos.begin).match.def.indexOf("|")) {
          var result = alternate.call(this, !0);
          if (result) {
            var newPos = void 0 !== result.caret ? result.caret : result.pos ? _positioning.seekNext.call(this, result.pos.begin ? result.pos.begin : result.pos) : _positioning.getLastValidPosition.call(this, -1, !0);
            (k !== _keycode["default"].DELETE || pos.begin > newPos) && pos.begin;
          }
        }
        !0 !== strict && (maskset.p = k === _keycode["default"].DELETE ? pos.begin + offset : pos.begin);
      }
    }
    function isComplete(buffer) {
      var inputmask = this,
        opts = this.opts,
        maskset = this.maskset;
      if ("function" == typeof opts.isComplete) return opts.isComplete(buffer, opts);
      if ("*" !== opts.repeat) {
        var complete = !1,
          lrp = _positioning.determineLastRequiredPosition.call(this, !0),
          aml = _positioning.seekPrevious.call(this, lrp.l);
        if (void 0 === lrp.def || lrp.def.newBlockMarker || lrp.def.optionality || lrp.def.optionalQuantifier) {
          complete = !0;
          for (var i = 0; i <= aml; i++) {
            var test = _validationTests.getTestTemplate.call(this, i).match;
            if (!0 !== test["static"] && void 0 === maskset.validPositions[i] && !0 !== test.optionality && !0 !== test.optionalQuantifier || !0 === test["static"] && buffer[i] !== _validationTests.getPlaceholder.call(this, i, test)) {
              complete = !1;
              break;
            }
          }
        }
        return complete;
      }
    }
    function isValid(pos, c, strict, fromIsValid, fromAlternate, validateOnly, fromCheckval) {
      var inputmask = this,
        $ = this.dependencyLib,
        opts = this.opts,
        el = inputmask.el,
        maskset = inputmask.maskset;
      function isSelection(posObj) {
        return inputmask.isRTL ? 1 < posObj.begin - posObj.end || posObj.begin - posObj.end == 1 : 1 < posObj.end - posObj.begin || posObj.end - posObj.begin == 1;
      }
      strict = !0 === strict;
      var maskPos = pos;
      function processCommandObject(commandObj) {
        if (void 0 !== commandObj) {
          if (void 0 !== commandObj.remove && (Array.isArray(commandObj.remove) || (commandObj.remove = [commandObj.remove]), commandObj.remove.sort(function (a, b) {
            return b.pos - a.pos;
          }).forEach(function (lmnt) {
            revalidateMask.call(inputmask, {
              begin: lmnt,
              end: lmnt + 1
            });
          }), commandObj.remove = void 0), void 0 !== commandObj.insert && (Array.isArray(commandObj.insert) || (commandObj.insert = [commandObj.insert]), commandObj.insert.sort(function (a, b) {
            return a.pos - b.pos;
          }).forEach(function (lmnt) {
            "" !== lmnt.c && isValid.call(inputmask, lmnt.pos, lmnt.c, void 0 === lmnt.strict || lmnt.strict, void 0 !== lmnt.fromIsValid ? lmnt.fromIsValid : fromIsValid);
          }), commandObj.insert = void 0), commandObj.refreshFromBuffer && commandObj.buffer) {
            var refresh = commandObj.refreshFromBuffer;
            refreshFromBuffer.call(inputmask, !0 === refresh ? refresh : refresh.start, refresh.end, commandObj.buffer), commandObj.refreshFromBuffer = void 0;
          }
          void 0 !== commandObj.rewritePosition && (maskPos = commandObj.rewritePosition, commandObj = !0);
        }
        return commandObj;
      }
      function _isValid(position, c, strict) {
        var rslt = !1;
        return _validationTests.getTests.call(inputmask, position).every(function (tst, ndx) {
          var test = tst.match;
          if (_positioning.getBuffer.call(inputmask, !0), rslt = null != test.fn ? test.fn.test(c, maskset, position, strict, opts, isSelection(pos)) : (c === test.def || c === opts.skipOptionalPartCharacter) && "" !== test.def && {
            c: _validationTests.getPlaceholder.call(inputmask, position, test, !0) || test.def,
            pos: position
          }, !1 === rslt) return !0;
          var elem = void 0 !== rslt.c ? rslt.c : c,
            validatedPos = position;
          return elem = elem === opts.skipOptionalPartCharacter && !0 === test["static"] ? _validationTests.getPlaceholder.call(inputmask, position, test, !0) || test.def : elem, rslt = processCommandObject(rslt), !0 !== rslt && void 0 !== rslt.pos && rslt.pos !== position && (validatedPos = rslt.pos), !0 !== rslt && void 0 === rslt.pos && void 0 === rslt.c || !1 === revalidateMask.call(inputmask, pos, $.extend({}, tst, {
            input: casing.call(inputmask, elem, test, validatedPos)
          }), fromIsValid, validatedPos) && (rslt = !1), !1;
        }), rslt;
      }
      void 0 !== pos.begin && (maskPos = inputmask.isRTL ? pos.end : pos.begin);
      var result = !0,
        positionsClone = $.extend(!0, {}, maskset.validPositions);
      if (!1 === opts.keepStatic && void 0 !== maskset.excludes[maskPos] && !0 !== fromAlternate && !0 !== fromIsValid) for (var i = maskPos; i < (inputmask.isRTL ? pos.begin : pos.end); i++) void 0 !== maskset.excludes[i] && (maskset.excludes[i] = void 0, delete maskset.tests[i]);
      if ("function" == typeof opts.preValidation && !0 !== fromIsValid && !0 !== validateOnly && (result = opts.preValidation.call(inputmask, _positioning.getBuffer.call(inputmask), maskPos, c, isSelection(pos), opts, maskset, pos, strict || fromAlternate), result = processCommandObject(result)), !0 === result) {
        if (void 0 === inputmask.maxLength || maskPos < _positioning.translatePosition.call(inputmask, inputmask.maxLength)) {
          if (result = _isValid(maskPos, c, strict), (!strict || !0 === fromIsValid) && !1 === result && !0 !== validateOnly) {
            var currentPosValid = maskset.validPositions[maskPos];
            if (!currentPosValid || !0 !== currentPosValid.match["static"] || currentPosValid.match.def !== c && c !== opts.skipOptionalPartCharacter) {
              if (opts.insertMode || void 0 === maskset.validPositions[_positioning.seekNext.call(inputmask, maskPos)] || pos.end > maskPos) {
                var skip = !1;
                if (maskset.jitOffset[maskPos] && void 0 === maskset.validPositions[_positioning.seekNext.call(inputmask, maskPos)] && (result = isValid.call(inputmask, maskPos + maskset.jitOffset[maskPos], c, !0), !1 !== result && (!0 !== fromAlternate && (result.caret = maskPos), skip = !0)), pos.end > maskPos && (maskset.validPositions[maskPos] = void 0), !skip && !_positioning.isMask.call(inputmask, maskPos, opts.keepStatic && 0 === maskPos)) for (var nPos = maskPos + 1, snPos = _positioning.seekNext.call(inputmask, maskPos, !1, 0 !== maskPos); nPos <= snPos; nPos++) if (result = _isValid(nPos, c, strict), !1 !== result) {
                  result = trackbackPositions.call(inputmask, maskPos, void 0 !== result.pos ? result.pos : nPos) || result, maskPos = nPos;
                  break;
                }
              }
            } else result = {
              caret: _positioning.seekNext.call(inputmask, maskPos)
            };
          }
        } else result = !1;
        !1 !== result || !opts.keepStatic || !isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && 0 !== maskPos || strict || !0 === fromAlternate ? isSelection(pos) && maskset.tests[maskPos] && 1 < maskset.tests[maskPos].length && opts.keepStatic && !strict && !0 !== fromAlternate && (result = alternate.call(inputmask, !0)) : result = alternate.call(inputmask, maskPos, c, strict, fromIsValid, void 0, pos), !0 === result && (result = {
          pos: maskPos
        });
      }
      if ("function" == typeof opts.postValidation && !0 !== fromIsValid && !0 !== validateOnly) {
        var postResult = opts.postValidation.call(inputmask, _positioning.getBuffer.call(inputmask, !0), void 0 !== pos.begin ? inputmask.isRTL ? pos.end : pos.begin : pos, c, result, opts, maskset, strict, fromCheckval);
        void 0 !== postResult && (result = !0 === postResult ? result : postResult);
      }
      result && void 0 === result.pos && (result.pos = maskPos), !1 === result || !0 === validateOnly ? (_positioning.resetMaskSet.call(inputmask, !0), maskset.validPositions = $.extend(!0, {}, positionsClone)) : trackbackPositions.call(inputmask, void 0, maskPos, !0);
      var endResult = processCommandObject(result);
      return endResult;
    }
    function positionCanMatchDefinition(pos, testDefinition, opts) {
      for (var inputmask = this, maskset = this.maskset, valid = !1, tests = _validationTests.getTests.call(this, pos), tndx = 0; tndx < tests.length; tndx++) {
        if (tests[tndx].match && (!(tests[tndx].match.nativeDef !== testDefinition.match[opts.shiftPositions ? "def" : "nativeDef"] || opts.shiftPositions && testDefinition.match["static"]) || tests[tndx].match.nativeDef === testDefinition.match.nativeDef)) {
          valid = !0;
          break;
        }
        if (tests[tndx].match && tests[tndx].match.def === testDefinition.match.nativeDef) {
          valid = void 0;
          break;
        }
      }
      return !1 === valid && void 0 !== maskset.jitOffset[pos] && (valid = positionCanMatchDefinition.call(this, pos + maskset.jitOffset[pos], testDefinition, opts)), valid;
    }
    function refreshFromBuffer(start, end, buffer) {
      var inputmask = this,
        maskset = this.maskset,
        opts = this.opts,
        $ = this.dependencyLib,
        el = this.el,
        i,
        p,
        skipOptionalPartCharacter = opts.skipOptionalPartCharacter,
        bffr = this.isRTL ? buffer.slice().reverse() : buffer;
      if (opts.skipOptionalPartCharacter = "", !0 === start) _positioning.resetMaskSet.call(this), maskset.tests = {}, start = 0, end = buffer.length, p = _positioning.determineNewCaretPosition.call(this, {
        begin: 0,
        end: 0
      }, !1).begin;else {
        for (i = start; i < end; i++) delete maskset.validPositions[i];
        p = start;
      }
      var keypress = new $.Event("keypress");
      for (i = start; i < end; i++) {
        keypress.which = bffr[i].toString().charCodeAt(0), this.ignorable = !1;
        var valResult = _eventhandlers.EventHandlers.keypressEvent.call(el, keypress, !0, !1, !1, p);
        !1 !== valResult && (p = valResult.forwardPosition);
      }
      opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
    }
    function trackbackPositions(originalPos, newPos, fillOnly) {
      var inputmask = this,
        maskset = this.maskset,
        $ = this.dependencyLib;
      if (void 0 === originalPos) for (originalPos = newPos - 1; 0 < originalPos && !maskset.validPositions[originalPos]; originalPos--);
      for (var ps = originalPos; ps < newPos; ps++) if (void 0 === maskset.validPositions[ps] && !_positioning.isMask.call(this, ps, !0)) {
        var vp = 0 == ps ? _validationTests.getTest.call(this, ps) : maskset.validPositions[ps - 1];
        if (vp) {
          var tests = _validationTests.getTests.call(this, ps).slice();
          "" === tests[tests.length - 1].match.def && tests.pop();
          var bestMatch = _validationTests.determineTestTemplate.call(this, ps, tests),
            np;
          if (bestMatch && (!0 !== bestMatch.match.jit || "master" === bestMatch.match.newBlockMarker && (np = maskset.validPositions[ps + 1]) && !0 === np.match.optionalQuantifier) && (bestMatch = $.extend({}, bestMatch, {
            input: _validationTests.getPlaceholder.call(this, ps, bestMatch.match, !0) || bestMatch.match.def
          }), bestMatch.generatedInput = !0, revalidateMask.call(this, ps, bestMatch, !0), !0 !== fillOnly)) {
            var cvpInput = maskset.validPositions[newPos].input;
            return maskset.validPositions[newPos] = void 0, isValid.call(this, newPos, cvpInput, !0, !0);
          }
        }
      }
    }
    function revalidateMask(pos, validTest, fromIsValid, validatedPos) {
      var inputmask = this,
        maskset = this.maskset,
        opts = this.opts,
        $ = this.dependencyLib;
      function IsEnclosedStatic(pos, valids, selection) {
        var posMatch = valids[pos];
        if (void 0 === posMatch || !0 !== posMatch.match["static"] || !0 === posMatch.match.optionality || void 0 !== valids[0] && void 0 !== valids[0].alternation) return !1;
        var prevMatch = selection.begin <= pos - 1 ? valids[pos - 1] && !0 === valids[pos - 1].match["static"] && valids[pos - 1] : valids[pos - 1],
          nextMatch = selection.end > pos + 1 ? valids[pos + 1] && !0 === valids[pos + 1].match["static"] && valids[pos + 1] : valids[pos + 1];
        return prevMatch && nextMatch;
      }
      var offset = 0,
        begin = void 0 !== pos.begin ? pos.begin : pos,
        end = void 0 !== pos.end ? pos.end : pos;
      if (pos.begin > pos.end && (begin = pos.end, end = pos.begin), validatedPos = void 0 !== validatedPos ? validatedPos : begin, begin !== end || opts.insertMode && void 0 !== maskset.validPositions[validatedPos] && void 0 === fromIsValid || void 0 === validTest) {
        var positionsClone = $.extend(!0, {}, maskset.validPositions),
          lvp = _positioning.getLastValidPosition.call(this, void 0, !0),
          i;
        for (maskset.p = begin, i = lvp; begin <= i; i--) delete maskset.validPositions[i], void 0 === validTest && delete maskset.tests[i + 1];
        var valid = !0,
          j = validatedPos,
          posMatch = j,
          t,
          canMatch;
        for (validTest && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest), posMatch++, j++), i = validTest ? end : end - 1; i <= lvp; i++) {
          if (void 0 !== (t = positionsClone[i]) && !0 !== t.generatedInput && (end <= i || begin <= i && IsEnclosedStatic(i, positionsClone, {
            begin: begin,
            end: end
          }))) {
            for (; "" !== _validationTests.getTest.call(this, posMatch).match.def;) {
              if (!1 !== (canMatch = positionCanMatchDefinition.call(this, posMatch, t, opts)) || "+" === t.match.def) {
                "+" === t.match.def && _positioning.getBuffer.call(this, !0);
                var result = isValid.call(this, posMatch, t.input, "+" !== t.match.def, "+" !== t.match.def);
                if (valid = !1 !== result, j = (result.pos || posMatch) + 1, !valid && canMatch) break;
              } else valid = !1;
              if (valid) {
                void 0 === validTest && t.match["static"] && i === pos.begin && offset++;
                break;
              }
              if (!valid && posMatch > maskset.maskLength) break;
              posMatch++;
            }
            "" == _validationTests.getTest.call(this, posMatch).match.def && (valid = !1), posMatch = j;
          }
          if (!valid) break;
        }
        if (!valid) return maskset.validPositions = $.extend(!0, {}, positionsClone), _positioning.resetMaskSet.call(this, !0), !1;
      } else validTest && _validationTests.getTest.call(this, validatedPos).match.cd === validTest.match.cd && (maskset.validPositions[validatedPos] = $.extend(!0, {}, validTest));
      return _positioning.resetMaskSet.call(this, !0), offset;
    }
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.applyInputValue = applyInputValue, exports.clearOptionalTail = clearOptionalTail, exports.checkVal = checkVal, exports.HandleNativePlaceholder = HandleNativePlaceholder, exports.unmaskedvalue = unmaskedvalue, exports.writeBuffer = writeBuffer;
    var _keycode = _interopRequireDefault(__webpack_require__(0)),
      _validationTests = __webpack_require__(3),
      _positioning = __webpack_require__(1),
      _validation = __webpack_require__(4),
      _environment = __webpack_require__(8),
      _eventhandlers = __webpack_require__(7);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    function applyInputValue(input, value) {
      var inputmask = input ? input.inputmask : this,
        opts = inputmask.opts;
      input.inputmask.refreshValue = !1, "function" == typeof opts.onBeforeMask && (value = opts.onBeforeMask.call(inputmask, value, opts) || value), value = value.toString().split(""), checkVal(input, !0, !1, value), inputmask.undoValue = _positioning.getBuffer.call(inputmask).join(""), (opts.clearMaskOnLostFocus || opts.clearIncomplete) && input.inputmask._valueGet() === _positioning.getBufferTemplate.call(inputmask).join("") && -1 === _positioning.getLastValidPosition.call(inputmask) && input.inputmask._valueSet("");
    }
    function clearOptionalTail(buffer) {
      var inputmask = this;
      buffer.length = 0;
      for (var template = _validationTests.getMaskTemplate.call(this, !0, 0, !0, void 0, !0), lmnt; void 0 !== (lmnt = template.shift());) buffer.push(lmnt);
      return buffer;
    }
    function checkVal(input, writeOut, strict, nptvl, initiatingEvent) {
      var inputmask = input ? input.inputmask : this,
        maskset = inputmask.maskset,
        opts = inputmask.opts,
        $ = inputmask.dependencyLib,
        inputValue = nptvl.slice(),
        charCodes = "",
        initialNdx = -1,
        result = void 0,
        skipOptionalPartCharacter = opts.skipOptionalPartCharacter;
      function isTemplateMatch(ndx, charCodes) {
        for (var targetTemplate = _validationTests.getMaskTemplate.call(inputmask, !0, 0).slice(ndx, _positioning.seekNext.call(inputmask, ndx, !1, !1)).join("").replace(/'/g, ""), charCodeNdx = targetTemplate.indexOf(charCodes); 0 < charCodeNdx && " " === targetTemplate[charCodeNdx - 1];) charCodeNdx--;
        var match = 0 === charCodeNdx && !_positioning.isMask.call(inputmask, ndx) && (_validationTests.getTest.call(inputmask, ndx).match.nativeDef === charCodes.charAt(0) || !0 === _validationTests.getTest.call(inputmask, ndx).match["static"] && _validationTests.getTest.call(inputmask, ndx).match.nativeDef === "'" + charCodes.charAt(0) || " " === _validationTests.getTest.call(inputmask, ndx).match.nativeDef && (_validationTests.getTest.call(inputmask, ndx + 1).match.nativeDef === charCodes.charAt(0) || !0 === _validationTests.getTest.call(inputmask, ndx + 1).match["static"] && _validationTests.getTest.call(inputmask, ndx + 1).match.nativeDef === "'" + charCodes.charAt(0)));
        if (!match && 0 < charCodeNdx && !_positioning.isMask.call(inputmask, ndx, !1, !0)) {
          var nextPos = _positioning.seekNext.call(inputmask, ndx);
          inputmask.caretPos.begin < nextPos && (inputmask.caretPos = {
            begin: nextPos
          });
        }
        return match;
      }
      opts.skipOptionalPartCharacter = "", _positioning.resetMaskSet.call(inputmask), maskset.tests = {}, initialNdx = opts.radixPoint ? _positioning.determineNewCaretPosition.call(inputmask, {
        begin: 0,
        end: 0
      }).begin : 0, maskset.p = initialNdx, inputmask.caretPos = {
        begin: initialNdx
      };
      var staticMatches = [],
        prevCaretPos = inputmask.caretPos;
      if (inputValue.forEach(function (charCode, ndx) {
        if (void 0 !== charCode) if (void 0 === maskset.validPositions[ndx] && inputValue[ndx] === _validationTests.getPlaceholder.call(inputmask, ndx) && _positioning.isMask.call(inputmask, ndx, !0) && !1 === _validation.isValid.call(inputmask, ndx, inputValue[ndx], !0, void 0, void 0, !0)) maskset.p++;else {
          var keypress = new $.Event("_checkval");
          keypress.which = charCode.toString().charCodeAt(0), charCodes += charCode;
          var lvp = _positioning.getLastValidPosition.call(inputmask, void 0, !0);
          isTemplateMatch(initialNdx, charCodes) ? result = _eventhandlers.EventHandlers.keypressEvent.call(inputmask, keypress, !0, !1, strict, lvp + 1) : (result = _eventhandlers.EventHandlers.keypressEvent.call(inputmask, keypress, !0, !1, strict, inputmask.caretPos.begin), result && (initialNdx = inputmask.caretPos.begin + 1, charCodes = "")), result ? (void 0 !== result.pos && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match["static"] && void 0 === maskset.validPositions[result.pos].alternation && (staticMatches.push(result.pos), inputmask.isRTL || (result.forwardPosition = result.pos + 1)), writeBuffer.call(inputmask, void 0, _positioning.getBuffer.call(inputmask), result.forwardPosition, keypress, !1), inputmask.caretPos = {
            begin: result.forwardPosition,
            end: result.forwardPosition
          }, prevCaretPos = inputmask.caretPos) : inputmask.caretPos = prevCaretPos;
        }
      }), 0 < staticMatches.length) {
        var sndx,
          validPos,
          nextValid = _positioning.seekNext.call(inputmask, -1, void 0, !1);
        if (!_validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && staticMatches.length <= nextValid || _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && 0 < staticMatches.length && staticMatches.length !== nextValid && 0 === staticMatches[0]) for (var nextSndx = nextValid; void 0 !== (sndx = staticMatches.shift());) {
          var keypress = new $.Event("_checkval");
          if (validPos = maskset.validPositions[sndx], validPos.generatedInput = !0, keypress.which = validPos.input.charCodeAt(0), result = _eventhandlers.EventHandlers.keypressEvent.call(inputmask, keypress, !0, !1, strict, nextSndx), result && void 0 !== result.pos && result.pos !== sndx && maskset.validPositions[result.pos] && !0 === maskset.validPositions[result.pos].match["static"]) staticMatches.push(result.pos);else if (!result) break;
          nextSndx++;
        }
      }
      writeOut && writeBuffer.call(inputmask, input, _positioning.getBuffer.call(inputmask), result ? result.forwardPosition : inputmask.caretPos.begin, initiatingEvent || new $.Event("checkval"), initiatingEvent && "input" === initiatingEvent.type && inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("")), opts.skipOptionalPartCharacter = skipOptionalPartCharacter;
    }
    function HandleNativePlaceholder(npt, value) {
      var inputmask = npt ? npt.inputmask : this;
      if (_environment.ie) {
        if (npt.inputmask._valueGet() !== value && (npt.placeholder !== value || "" === npt.placeholder)) {
          var buffer = _positioning.getBuffer.call(inputmask).slice(),
            nptValue = npt.inputmask._valueGet();
          if (nptValue !== value) {
            var lvp = _positioning.getLastValidPosition.call(inputmask);
            -1 === lvp && nptValue === _positioning.getBufferTemplate.call(inputmask).join("") ? buffer = [] : -1 !== lvp && clearOptionalTail.call(inputmask, buffer), writeBuffer(npt, buffer);
          }
        }
      } else npt.placeholder !== value && (npt.placeholder = value, "" === npt.placeholder && npt.removeAttribute("placeholder"));
    }
    function unmaskedvalue(input) {
      var inputmask = input ? input.inputmask : this,
        opts = inputmask.opts,
        maskset = inputmask.maskset;
      if (input) {
        if (void 0 === input.inputmask) return input.value;
        input.inputmask && input.inputmask.refreshValue && applyInputValue(input, input.inputmask._valueGet(!0));
      }
      var umValue = [],
        vps = maskset.validPositions;
      for (var pndx in vps) vps[pndx] && vps[pndx].match && (1 != vps[pndx].match["static"] || Array.isArray(maskset.metadata) && !0 !== vps[pndx].generatedInput) && umValue.push(vps[pndx].input);
      var unmaskedValue = 0 === umValue.length ? "" : (inputmask.isRTL ? umValue.reverse() : umValue).join("");
      if ("function" == typeof opts.onUnMask) {
        var bufferValue = (inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice().reverse() : _positioning.getBuffer.call(inputmask)).join("");
        unmaskedValue = opts.onUnMask.call(inputmask, bufferValue, unmaskedValue, opts);
      }
      return unmaskedValue;
    }
    function writeBuffer(input, buffer, caretPos, event, triggerEvents) {
      var inputmask = input ? input.inputmask : this,
        opts = inputmask.opts,
        $ = inputmask.dependencyLib;
      if (event && "function" == typeof opts.onBeforeWrite) {
        var result = opts.onBeforeWrite.call(inputmask, event, buffer, caretPos, opts);
        if (result) {
          if (result.refreshFromBuffer) {
            var refresh = result.refreshFromBuffer;
            _validation.refreshFromBuffer.call(inputmask, !0 === refresh ? refresh : refresh.start, refresh.end, result.buffer || buffer), buffer = _positioning.getBuffer.call(inputmask, !0);
          }
          void 0 !== caretPos && (caretPos = void 0 !== result.caret ? result.caret : caretPos);
        }
      }
      if (void 0 !== input && (input.inputmask._valueSet(buffer.join("")), void 0 === caretPos || void 0 !== event && "blur" === event.type || _positioning.caret.call(inputmask, input, caretPos, void 0, void 0, void 0 !== event && "keydown" === event.type && (event.keyCode === _keycode["default"].DELETE || event.keyCode === _keycode["default"].BACKSPACE)), !0 === triggerEvents)) {
        var $input = $(input),
          nptVal = input.inputmask._valueGet();
        input.inputmask.skipInputEvent = !0, $input.trigger("input"), setTimeout(function () {
          nptVal === _positioning.getBufferTemplate.call(inputmask).join("") ? $input.trigger("cleared") : !0 === _validation.isComplete.call(inputmask, buffer) && $input.trigger("complete");
        }, 0);
      }
    }
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports["default"] = void 0;
    var _default = "undefined" != typeof window ? window : new (eval("require('jsdom').JSDOM"))("").window;
    exports["default"] = _default;
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.EventHandlers = void 0;
    var _positioning = __webpack_require__(1),
      _keycode = _interopRequireDefault(__webpack_require__(0)),
      _environment = __webpack_require__(8),
      _validation = __webpack_require__(4),
      _inputHandling = __webpack_require__(5),
      _validationTests = __webpack_require__(3);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    var EventHandlers = {
      keydownEvent: function keydownEvent(e) {
        var inputmask = this.inputmask,
          opts = inputmask.opts,
          $ = inputmask.dependencyLib,
          maskset = inputmask.maskset,
          input = this,
          $input = $(input),
          k = e.keyCode,
          pos = _positioning.caret.call(inputmask, input),
          kdResult = opts.onKeyDown.call(this, e, _positioning.getBuffer.call(inputmask), pos, opts);
        if (void 0 !== kdResult) return kdResult;
        if (k === _keycode["default"].BACKSPACE || k === _keycode["default"].DELETE || _environment.iphone && k === _keycode["default"].BACKSPACE_SAFARI || e.ctrlKey && k === _keycode["default"].X && !("oncut" in input)) e.preventDefault(), _validation.handleRemove.call(inputmask, input, k, pos), (0, _inputHandling.writeBuffer)(input, _positioning.getBuffer.call(inputmask, !0), maskset.p, e, input.inputmask._valueGet() !== _positioning.getBuffer.call(inputmask).join(""));else if (k === _keycode["default"].END || k === _keycode["default"].PAGE_DOWN) {
          e.preventDefault();
          var caretPos = _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask));
          _positioning.caret.call(inputmask, input, e.shiftKey ? pos.begin : caretPos, caretPos, !0);
        } else k === _keycode["default"].HOME && !e.shiftKey || k === _keycode["default"].PAGE_UP ? (e.preventDefault(), _positioning.caret.call(inputmask, input, 0, e.shiftKey ? pos.begin : 0, !0)) : (opts.undoOnEscape && k === _keycode["default"].ESCAPE || 90 === k && e.ctrlKey) && !0 !== e.altKey ? ((0, _inputHandling.checkVal)(input, !0, !1, inputmask.undoValue.split("")), $input.trigger("click")) : !0 === opts.tabThrough && k === _keycode["default"].TAB ? !0 === e.shiftKey ? (pos.end = _positioning.seekPrevious.call(inputmask, pos.end, !0), !0 === _validationTests.getTest.call(inputmask, pos.end - 1).match["static"] && pos.end--, pos.begin = _positioning.seekPrevious.call(inputmask, pos.end, !0), 0 <= pos.begin && 0 < pos.end && (e.preventDefault(), _positioning.caret.call(inputmask, input, pos.begin, pos.end))) : (pos.begin = _positioning.seekNext.call(inputmask, pos.begin, !0), pos.end = _positioning.seekNext.call(inputmask, pos.begin, !0), pos.end < maskset.maskLength && pos.end--, pos.begin <= maskset.maskLength && (e.preventDefault(), _positioning.caret.call(inputmask, input, pos.begin, pos.end))) : e.shiftKey || opts.insertModeVisual && !1 === opts.insertMode && (k === _keycode["default"].RIGHT ? setTimeout(function () {
          var caretPos = _positioning.caret.call(inputmask, input);
          _positioning.caret.call(inputmask, input, caretPos.begin);
        }, 0) : k === _keycode["default"].LEFT && setTimeout(function () {
          var caretPos_begin = _positioning.translatePosition.call(inputmask, input.inputmask.caretPos.begin),
            caretPos_end = _positioning.translatePosition.call(inputmask, input.inputmask.caretPos.end);
          inputmask.isRTL ? _positioning.caret.call(inputmask, input, caretPos_begin + (caretPos_begin === maskset.maskLength ? 0 : 1)) : _positioning.caret.call(inputmask, input, caretPos_begin - (0 === caretPos_begin ? 0 : 1));
        }, 0));
        inputmask.ignorable = opts.ignorables.includes(k);
      },
      keypressEvent: function keypressEvent(e, checkval, writeOut, strict, ndx) {
        var inputmask = this.inputmask || this,
          opts = inputmask.opts,
          $ = inputmask.dependencyLib,
          maskset = inputmask.maskset,
          input = inputmask.el,
          $input = $(input),
          k = e.which || e.charCode || e.keyCode;
        if (!(!0 === checkval || e.ctrlKey && e.altKey) && (e.ctrlKey || e.metaKey || inputmask.ignorable)) return k === _keycode["default"].ENTER && inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") && (inputmask.undoValue = _positioning.getBuffer.call(inputmask).join(""), setTimeout(function () {
          $input.trigger("change");
        }, 0)), inputmask.skipInputEvent = !0, !0;
        if (k) {
          44 !== k && 46 !== k || 3 !== e.location || "" === opts.radixPoint || (k = opts.radixPoint.charCodeAt(0));
          var pos = checkval ? {
              begin: ndx,
              end: ndx
            } : _positioning.caret.call(inputmask, input),
            forwardPosition,
            c = String.fromCharCode(k);
          maskset.writeOutBuffer = !0;
          var valResult = _validation.isValid.call(inputmask, pos, c, strict, void 0, void 0, void 0, checkval);
          if (!1 !== valResult && (_positioning.resetMaskSet.call(inputmask, !0), forwardPosition = void 0 !== valResult.caret ? valResult.caret : _positioning.seekNext.call(inputmask, valResult.pos.begin ? valResult.pos.begin : valResult.pos), maskset.p = forwardPosition), forwardPosition = opts.numericInput && void 0 === valResult.caret ? _positioning.seekPrevious.call(inputmask, forwardPosition) : forwardPosition, !1 !== writeOut && (setTimeout(function () {
            opts.onKeyValidation.call(input, k, valResult);
          }, 0), maskset.writeOutBuffer && !1 !== valResult)) {
            var buffer = _positioning.getBuffer.call(inputmask);
            (0, _inputHandling.writeBuffer)(input, buffer, forwardPosition, e, !0 !== checkval);
          }
          if (e.preventDefault(), checkval) return !1 !== valResult && (valResult.forwardPosition = forwardPosition), valResult;
        }
      },
      keyupEvent: function keyupEvent(e) {
        var inputmask = this.inputmask;
        !inputmask.isComposing || e.keyCode !== _keycode["default"].KEY_229 && e.keyCode !== _keycode["default"].ENTER || inputmask.$el.trigger("input");
      },
      pasteEvent: function pasteEvent(e) {
        var inputmask = this.inputmask,
          opts = inputmask.opts,
          input = this,
          inputValue = inputmask._valueGet(!0),
          caretPos = _positioning.caret.call(inputmask, this),
          tempValue;
        inputmask.isRTL && (tempValue = caretPos.end, caretPos.end = caretPos.begin, caretPos.begin = tempValue);
        var valueBeforeCaret = inputValue.substr(0, caretPos.begin),
          valueAfterCaret = inputValue.substr(caretPos.end, inputValue.length);
        if (valueBeforeCaret == (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).slice(0, caretPos.begin).join("") && (valueBeforeCaret = ""), valueAfterCaret == (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).slice(caretPos.end).join("") && (valueAfterCaret = ""), window.clipboardData && window.clipboardData.getData) inputValue = valueBeforeCaret + window.clipboardData.getData("Text") + valueAfterCaret;else {
          if (!e.clipboardData || !e.clipboardData.getData) return !0;
          inputValue = valueBeforeCaret + e.clipboardData.getData("text/plain") + valueAfterCaret;
        }
        var pasteValue = inputValue;
        if ("function" == typeof opts.onBeforePaste) {
          if (pasteValue = opts.onBeforePaste.call(inputmask, inputValue, opts), !1 === pasteValue) return e.preventDefault();
          pasteValue = pasteValue || inputValue;
        }
        return (0, _inputHandling.checkVal)(this, !0, !1, pasteValue.toString().split(""), e), e.preventDefault();
      },
      inputFallBackEvent: function inputFallBackEvent(e) {
        var inputmask = this.inputmask,
          opts = inputmask.opts,
          $ = inputmask.dependencyLib;
        function ieMobileHandler(input, inputValue, caretPos) {
          if (_environment.iemobile) {
            var inputChar = inputValue.replace(_positioning.getBuffer.call(inputmask).join(""), "");
            if (1 === inputChar.length) {
              var iv = inputValue.split("");
              iv.splice(caretPos.begin, 0, inputChar), inputValue = iv.join("");
            }
          }
          return inputValue;
        }
        function analyseChanges(inputValue, buffer, caretPos) {
          for (var frontPart = inputValue.substr(0, caretPos.begin).split(""), backPart = inputValue.substr(caretPos.begin).split(""), frontBufferPart = buffer.substr(0, caretPos.begin).split(""), backBufferPart = buffer.substr(caretPos.begin).split(""), fpl = frontPart.length >= frontBufferPart.length ? frontPart.length : frontBufferPart.length, bpl = backPart.length >= backBufferPart.length ? backPart.length : backBufferPart.length, bl, i, action = "", data = [], marker = "~", placeholder; frontPart.length < fpl;) frontPart.push("~");
          for (; frontBufferPart.length < fpl;) frontBufferPart.push("~");
          for (; backPart.length < bpl;) backPart.unshift("~");
          for (; backBufferPart.length < bpl;) backBufferPart.unshift("~");
          var newBuffer = frontPart.concat(backPart),
            oldBuffer = frontBufferPart.concat(backBufferPart);
          for (i = 0, bl = newBuffer.length; i < bl; i++) switch (placeholder = _validationTests.getPlaceholder.call(inputmask, _positioning.translatePosition.call(inputmask, i)), action) {
            case "insertText":
              oldBuffer[i - 1] === newBuffer[i] && caretPos.begin == newBuffer.length - 1 && data.push(newBuffer[i]), i = bl;
              break;
            case "insertReplacementText":
              "~" === newBuffer[i] ? caretPos.end++ : i = bl;
              break;
            case "deleteContentBackward":
              "~" === newBuffer[i] ? caretPos.end++ : i = bl;
              break;
            default:
              newBuffer[i] !== oldBuffer[i] && ("~" !== newBuffer[i + 1] && newBuffer[i + 1] !== placeholder && void 0 !== newBuffer[i + 1] || (oldBuffer[i] !== placeholder || "~" !== oldBuffer[i + 1]) && "~" !== oldBuffer[i] ? "~" === oldBuffer[i + 1] && oldBuffer[i] === newBuffer[i + 1] ? (action = "insertText", data.push(newBuffer[i]), caretPos.begin--, caretPos.end--) : newBuffer[i] !== placeholder && "~" !== newBuffer[i] && ("~" === newBuffer[i + 1] || oldBuffer[i] !== newBuffer[i] && oldBuffer[i + 1] === newBuffer[i + 1]) ? (action = "insertReplacementText", data.push(newBuffer[i]), caretPos.begin--) : "~" === newBuffer[i] ? (action = "deleteContentBackward", !_positioning.isMask.call(inputmask, _positioning.translatePosition.call(inputmask, i), !0) && oldBuffer[i] !== opts.radixPoint || caretPos.end++) : i = bl : (action = "insertText", data.push(newBuffer[i]), caretPos.begin--, caretPos.end--));
              break;
          }
          return {
            action: action,
            data: data,
            caret: caretPos
          };
        }
        var input = this,
          inputValue = input.inputmask._valueGet(!0),
          buffer = (inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice().reverse() : _positioning.getBuffer.call(inputmask)).join(""),
          caretPos = _positioning.caret.call(inputmask, input, void 0, void 0, !0);
        if (buffer !== inputValue) {
          inputValue = ieMobileHandler(input, inputValue, caretPos);
          var changes = analyseChanges(inputValue, buffer, caretPos);
          switch ((input.inputmask.shadowRoot || document).activeElement !== input && input.focus(), (0, _inputHandling.writeBuffer)(input, _positioning.getBuffer.call(inputmask)), _positioning.caret.call(inputmask, input, caretPos.begin, caretPos.end, !0), changes.action) {
            case "insertText":
            case "insertReplacementText":
              changes.data.forEach(function (entry, ndx) {
                var keypress = new $.Event("keypress");
                keypress.which = entry.charCodeAt(0), inputmask.ignorable = !1, EventHandlers.keypressEvent.call(input, keypress);
              }), setTimeout(function () {
                inputmask.$el.trigger("keyup");
              }, 0);
              break;
            case "deleteContentBackward":
              var keydown = new $.Event("keydown");
              keydown.keyCode = _keycode["default"].BACKSPACE, EventHandlers.keydownEvent.call(input, keydown);
              break;
            default:
              (0, _inputHandling.applyInputValue)(input, inputValue);
              break;
          }
          e.preventDefault();
        }
      },
      compositionendEvent: function compositionendEvent(e) {
        var inputmask = this.inputmask;
        inputmask.isComposing = !1, inputmask.$el.trigger("input");
      },
      setValueEvent: function setValueEvent(e, argument_1, argument_2) {
        var inputmask = this.inputmask,
          input = this,
          value = e && e.detail ? e.detail[0] : argument_1;
        void 0 === value && (value = this.inputmask._valueGet(!0)), (0, _inputHandling.applyInputValue)(this, value), (e.detail && void 0 !== e.detail[1] || void 0 !== argument_2) && _positioning.caret.call(inputmask, this, e.detail ? e.detail[1] : argument_2);
      },
      focusEvent: function focusEvent(e) {
        var inputmask = this.inputmask,
          opts = inputmask.opts,
          input = this,
          nptValue = this.inputmask._valueGet();
        opts.showMaskOnFocus && nptValue !== _positioning.getBuffer.call(inputmask).join("") && (0, _inputHandling.writeBuffer)(this, _positioning.getBuffer.call(inputmask), _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask))), !0 !== opts.positionCaretOnTab || !1 !== inputmask.mouseEnter || _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && -1 !== _positioning.getLastValidPosition.call(inputmask) || EventHandlers.clickEvent.apply(this, [e, !0]), inputmask.undoValue = _positioning.getBuffer.call(inputmask).join("");
      },
      invalidEvent: function invalidEvent(e) {
        this.inputmask.validationEvent = !0;
      },
      mouseleaveEvent: function mouseleaveEvent() {
        var inputmask = this.inputmask,
          opts = inputmask.opts,
          input = this;
        inputmask.mouseEnter = !1, opts.clearMaskOnLostFocus && (this.inputmask.shadowRoot || document).activeElement !== this && (0, _inputHandling.HandleNativePlaceholder)(this, inputmask.originalPlaceholder);
      },
      clickEvent: function clickEvent(e, tabbed) {
        var inputmask = this.inputmask,
          input = this;
        if ((this.inputmask.shadowRoot || document).activeElement === this) {
          var newCaretPosition = _positioning.determineNewCaretPosition.call(inputmask, _positioning.caret.call(inputmask, this), tabbed);
          void 0 !== newCaretPosition && _positioning.caret.call(inputmask, this, newCaretPosition);
        }
      },
      cutEvent: function cutEvent(e) {
        var inputmask = this.inputmask,
          maskset = inputmask.maskset,
          input = this,
          pos = _positioning.caret.call(inputmask, this),
          clipboardData = window.clipboardData || e.clipboardData,
          clipData = inputmask.isRTL ? _positioning.getBuffer.call(inputmask).slice(pos.end, pos.begin) : _positioning.getBuffer.call(inputmask).slice(pos.begin, pos.end);
        clipboardData.setData("text", inputmask.isRTL ? clipData.reverse().join("") : clipData.join("")), document.execCommand && document.execCommand("copy"), _validation.handleRemove.call(inputmask, this, _keycode["default"].DELETE, pos), (0, _inputHandling.writeBuffer)(this, _positioning.getBuffer.call(inputmask), maskset.p, e, inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join(""));
      },
      blurEvent: function blurEvent(e) {
        var inputmask = this.inputmask,
          opts = inputmask.opts,
          $ = inputmask.dependencyLib,
          $input = $(this),
          input = this;
        if (this.inputmask) {
          (0, _inputHandling.HandleNativePlaceholder)(this, inputmask.originalPlaceholder);
          var nptValue = this.inputmask._valueGet(),
            buffer = _positioning.getBuffer.call(inputmask).slice();
          "" !== nptValue && (opts.clearMaskOnLostFocus && (-1 === _positioning.getLastValidPosition.call(inputmask) && nptValue === _positioning.getBufferTemplate.call(inputmask).join("") ? buffer = [] : _inputHandling.clearOptionalTail.call(inputmask, buffer)), !1 === _validation.isComplete.call(inputmask, buffer) && (setTimeout(function () {
            $input.trigger("incomplete");
          }, 0), opts.clearIncomplete && (_positioning.resetMaskSet.call(inputmask), buffer = opts.clearMaskOnLostFocus ? [] : _positioning.getBufferTemplate.call(inputmask).slice())), (0, _inputHandling.writeBuffer)(this, buffer, void 0, e)), inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") && (inputmask.undoValue = _positioning.getBuffer.call(inputmask).join(""), $input.trigger("change"));
        }
      },
      mouseenterEvent: function mouseenterEvent() {
        var inputmask = this.inputmask,
          opts = inputmask.opts,
          input = this;
        inputmask.mouseEnter = !0, (this.inputmask.shadowRoot || document).activeElement !== this && (null == inputmask.originalPlaceholder && this.placeholder !== inputmask.originalPlaceholder && (inputmask.originalPlaceholder = this.placeholder), opts.showMaskOnHover && (0, _inputHandling.HandleNativePlaceholder)(this, (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).join("")));
      },
      submitEvent: function submitEvent() {
        var inputmask = this.inputmask,
          opts = inputmask.opts;
        inputmask.undoValue !== _positioning.getBuffer.call(inputmask).join("") && inputmask.$el.trigger("change"), opts.clearMaskOnLostFocus && -1 === _positioning.getLastValidPosition.call(inputmask) && inputmask._valueGet && inputmask._valueGet() === _positioning.getBufferTemplate.call(inputmask).join("") && inputmask._valueSet(""), opts.clearIncomplete && !1 === _validation.isComplete.call(inputmask, _positioning.getBuffer.call(inputmask)) && inputmask._valueSet(""), opts.removeMaskOnSubmit && (inputmask._valueSet(inputmask.unmaskedvalue(), !0), setTimeout(function () {
          (0, _inputHandling.writeBuffer)(inputmask.el, _positioning.getBuffer.call(inputmask));
        }, 0));
      },
      resetEvent: function resetEvent() {
        var inputmask = this.inputmask;
        inputmask.refreshValue = !0, setTimeout(function () {
          (0, _inputHandling.applyInputValue)(inputmask.el, inputmask._valueGet(!0));
        }, 0);
      }
    };
    exports.EventHandlers = EventHandlers;
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.iphone = exports.iemobile = exports.mobile = exports.ie = exports.ua = void 0;
    var ua = window.navigator && window.navigator.userAgent || "",
      ie = 0 < ua.indexOf("MSIE ") || 0 < ua.indexOf("Trident/"),
      mobile = ("ontouchstart" in window),
      iemobile = /iemobile/i.test(ua),
      iphone = /iphone/i.test(ua) && !iemobile;
    exports.iphone = iphone, exports.iemobile = iemobile, exports.mobile = mobile, exports.ie = ie, exports.ua = ua;
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports["default"] = void 0;
    var _extend = _interopRequireDefault(__webpack_require__(12)),
      _window = _interopRequireDefault(__webpack_require__(6)),
      _data = _interopRequireDefault(__webpack_require__(18)),
      _events = __webpack_require__(19);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    var document = _window["default"].document;
    function DependencyLib(elem) {
      return elem instanceof DependencyLib ? elem : this instanceof DependencyLib ? void (null != elem && elem !== _window["default"] && (this[0] = elem.nodeName ? elem : void 0 !== elem[0] && elem[0].nodeName ? elem[0] : document.querySelector(elem), void 0 !== this[0] && null !== this[0] && (this[0].eventRegistry = this[0].eventRegistry || {}))) : new DependencyLib(elem);
    }
    DependencyLib.prototype = {
      on: _events.on,
      off: _events.off,
      trigger: _events.trigger
    }, DependencyLib.extend = _extend["default"], DependencyLib.data = _data["default"], DependencyLib.Event = _events.Event;
    var _default = DependencyLib;
    exports["default"] = _default;
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.mask = mask;
    var _keycode = _interopRequireDefault(__webpack_require__(0)),
      _positioning = __webpack_require__(1),
      _inputHandling = __webpack_require__(5),
      _eventruler = __webpack_require__(11),
      _environment = __webpack_require__(8),
      _validation = __webpack_require__(4),
      _eventhandlers = __webpack_require__(7);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    function mask() {
      var inputmask = this,
        opts = this.opts,
        el = this.el,
        $ = this.dependencyLib;
      function isElementTypeSupported(input, opts) {
        function patchValueProperty(npt) {
          var valueGet, valueSet;
          function patchValhook(type) {
            if ($.valHooks && (void 0 === $.valHooks[type] || !0 !== $.valHooks[type].inputmaskpatch)) {
              var valhookGet = $.valHooks[type] && $.valHooks[type].get ? $.valHooks[type].get : function (elem) {
                  return elem.value;
                },
                valhookSet = $.valHooks[type] && $.valHooks[type].set ? $.valHooks[type].set : function (elem, value) {
                  return elem.value = value, elem;
                };
              $.valHooks[type] = {
                get: function get(elem) {
                  if (elem.inputmask) {
                    if (elem.inputmask.opts.autoUnmask) return elem.inputmask.unmaskedvalue();
                    var result = valhookGet(elem);
                    return -1 !== _positioning.getLastValidPosition.call(inputmask, void 0, void 0, elem.inputmask.maskset.validPositions) || !0 !== opts.nullable ? result : "";
                  }
                  return valhookGet(elem);
                },
                set: function set(elem, value) {
                  var result = valhookSet(elem, value);
                  return elem.inputmask && (0, _inputHandling.applyInputValue)(elem, value), result;
                },
                inputmaskpatch: !0
              };
            }
          }
          function getter() {
            return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : -1 !== _positioning.getLastValidPosition.call(inputmask) || !0 !== opts.nullable ? (this.inputmask.shadowRoot || document.activeElement) === this && opts.clearMaskOnLostFocus ? (inputmask.isRTL ? _inputHandling.clearOptionalTail.call(inputmask, _positioning.getBuffer.call(inputmask).slice()).reverse() : _inputHandling.clearOptionalTail.call(inputmask, _positioning.getBuffer.call(inputmask).slice())).join("") : valueGet.call(this) : "" : valueGet.call(this);
          }
          function setter(value) {
            valueSet.call(this, value), this.inputmask && (0, _inputHandling.applyInputValue)(this, value);
          }
          function installNativeValueSetFallback(npt) {
            _eventruler.EventRuler.on(npt, "mouseenter", function () {
              var input = this,
                value = this.inputmask._valueGet(!0);
              value !== (inputmask.isRTL ? _positioning.getBuffer.call(inputmask).reverse() : _positioning.getBuffer.call(inputmask)).join("") && (0, _inputHandling.applyInputValue)(this, value);
            });
          }
          if (!npt.inputmask.__valueGet) {
            if (!0 !== opts.noValuePatching) {
              if (Object.getOwnPropertyDescriptor) {
                var valueProperty = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(npt), "value") : void 0;
                valueProperty && valueProperty.get && valueProperty.set ? (valueGet = valueProperty.get, valueSet = valueProperty.set, Object.defineProperty(npt, "value", {
                  get: getter,
                  set: setter,
                  configurable: !0
                })) : "input" !== npt.tagName.toLowerCase() && (valueGet = function valueGet() {
                  return this.textContent;
                }, valueSet = function valueSet(value) {
                  this.textContent = value;
                }, Object.defineProperty(npt, "value", {
                  get: getter,
                  set: setter,
                  configurable: !0
                }));
              } else document.__lookupGetter__ && npt.__lookupGetter__("value") && (valueGet = npt.__lookupGetter__("value"), valueSet = npt.__lookupSetter__("value"), npt.__defineGetter__("value", getter), npt.__defineSetter__("value", setter));
              npt.inputmask.__valueGet = valueGet, npt.inputmask.__valueSet = valueSet;
            }
            npt.inputmask._valueGet = function (overruleRTL) {
              return inputmask.isRTL && !0 !== overruleRTL ? valueGet.call(this.el).split("").reverse().join("") : valueGet.call(this.el);
            }, npt.inputmask._valueSet = function (value, overruleRTL) {
              valueSet.call(this.el, null == value ? "" : !0 !== overruleRTL && inputmask.isRTL ? value.split("").reverse().join("") : value);
            }, void 0 === valueGet && (valueGet = function valueGet() {
              return this.value;
            }, valueSet = function valueSet(value) {
              this.value = value;
            }, patchValhook(npt.type), installNativeValueSetFallback(npt));
          }
        }
        "textarea" !== input.tagName.toLowerCase() && opts.ignorables.push(_keycode["default"].ENTER);
        var elementType = input.getAttribute("type"),
          isSupported = "input" === input.tagName.toLowerCase() && opts.supportsInputType.includes(elementType) || input.isContentEditable || "textarea" === input.tagName.toLowerCase();
        if (!isSupported) if ("input" === input.tagName.toLowerCase()) {
          var el = document.createElement("input");
          el.setAttribute("type", elementType), isSupported = "text" === el.type, el = null;
        } else isSupported = "partial";
        return !1 !== isSupported ? patchValueProperty(input) : input.inputmask = void 0, isSupported;
      }
      _eventruler.EventRuler.off(el);
      var isSupported = isElementTypeSupported(el, opts);
      if (!1 !== isSupported) {
        inputmask.originalPlaceholder = el.placeholder, inputmask.maxLength = void 0 !== el ? el.maxLength : void 0, -1 === inputmask.maxLength && (inputmask.maxLength = void 0), "inputMode" in el && null === el.getAttribute("inputmode") && (el.inputMode = opts.inputmode, el.setAttribute("inputmode", opts.inputmode)), !0 === isSupported && (opts.showMaskOnFocus = opts.showMaskOnFocus && -1 === ["cc-number", "cc-exp"].indexOf(el.autocomplete), _environment.iphone && (opts.insertModeVisual = !1), _eventruler.EventRuler.on(el, "submit", _eventhandlers.EventHandlers.submitEvent), _eventruler.EventRuler.on(el, "reset", _eventhandlers.EventHandlers.resetEvent), _eventruler.EventRuler.on(el, "blur", _eventhandlers.EventHandlers.blurEvent), _eventruler.EventRuler.on(el, "focus", _eventhandlers.EventHandlers.focusEvent), _eventruler.EventRuler.on(el, "invalid", _eventhandlers.EventHandlers.invalidEvent), _eventruler.EventRuler.on(el, "click", _eventhandlers.EventHandlers.clickEvent), _eventruler.EventRuler.on(el, "mouseleave", _eventhandlers.EventHandlers.mouseleaveEvent), _eventruler.EventRuler.on(el, "mouseenter", _eventhandlers.EventHandlers.mouseenterEvent), _eventruler.EventRuler.on(el, "paste", _eventhandlers.EventHandlers.pasteEvent), _eventruler.EventRuler.on(el, "cut", _eventhandlers.EventHandlers.cutEvent), _eventruler.EventRuler.on(el, "complete", opts.oncomplete), _eventruler.EventRuler.on(el, "incomplete", opts.onincomplete), _eventruler.EventRuler.on(el, "cleared", opts.oncleared), !0 !== opts.inputEventOnly && (_eventruler.EventRuler.on(el, "keydown", _eventhandlers.EventHandlers.keydownEvent), _eventruler.EventRuler.on(el, "keypress", _eventhandlers.EventHandlers.keypressEvent), _eventruler.EventRuler.on(el, "keyup", _eventhandlers.EventHandlers.keyupEvent)), (_environment.mobile || opts.inputEventOnly) && el.removeAttribute("maxLength"), _eventruler.EventRuler.on(el, "input", _eventhandlers.EventHandlers.inputFallBackEvent), _eventruler.EventRuler.on(el, "compositionend", _eventhandlers.EventHandlers.compositionendEvent)), _eventruler.EventRuler.on(el, "setvalue", _eventhandlers.EventHandlers.setValueEvent), inputmask.undoValue = _positioning.getBufferTemplate.call(inputmask).join("");
        var activeElement = (el.inputmask.shadowRoot || document).activeElement;
        if ("" !== el.inputmask._valueGet(!0) || !1 === opts.clearMaskOnLostFocus || activeElement === el) {
          (0, _inputHandling.applyInputValue)(el, el.inputmask._valueGet(!0), opts);
          var buffer = _positioning.getBuffer.call(inputmask).slice();
          !1 === _validation.isComplete.call(inputmask, buffer) && opts.clearIncomplete && _positioning.resetMaskSet.call(inputmask), opts.clearMaskOnLostFocus && activeElement !== el && (-1 === _positioning.getLastValidPosition.call(inputmask) ? buffer = [] : _inputHandling.clearOptionalTail.call(inputmask, buffer)), (!1 === opts.clearMaskOnLostFocus || opts.showMaskOnFocus && activeElement === el || "" !== el.inputmask._valueGet(!0)) && (0, _inputHandling.writeBuffer)(el, buffer), activeElement === el && _positioning.caret.call(inputmask, el, _positioning.seekNext.call(inputmask, _positioning.getLastValidPosition.call(inputmask)));
        }
      }
    }
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.EventRuler = void 0;
    var _inputmask = _interopRequireDefault(__webpack_require__(2)),
      _keycode = _interopRequireDefault(__webpack_require__(0)),
      _positioning = __webpack_require__(1),
      _inputHandling = __webpack_require__(5);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    var EventRuler = {
      on: function on(input, eventName, eventHandler) {
        var $ = input.inputmask.dependencyLib,
          ev = function ev(e) {
            e.originalEvent && (e = e.originalEvent || e, arguments[0] = e);
            var that = this,
              args,
              inputmask = that.inputmask,
              opts = inputmask ? inputmask.opts : void 0;
            if (void 0 === inputmask && "FORM" !== this.nodeName) {
              var imOpts = $.data(that, "_inputmask_opts");
              $(that).off(), imOpts && new _inputmask["default"](imOpts).mask(that);
            } else {
              if (["submit", "reset", "setvalue"].includes(e.type) || "FORM" === this.nodeName || !(that.disabled || that.readOnly && !("keydown" === e.type && e.ctrlKey && 67 === e.keyCode || !1 === opts.tabThrough && e.keyCode === _keycode["default"].TAB))) {
                switch (e.type) {
                  case "input":
                    if (!0 === inputmask.skipInputEvent || e.inputType && "insertCompositionText" === e.inputType) return inputmask.skipInputEvent = !1, e.preventDefault();
                    break;
                  case "keydown":
                    inputmask.skipKeyPressEvent = !1, inputmask.skipInputEvent = inputmask.isComposing = e.keyCode === _keycode["default"].KEY_229;
                    break;
                  case "keyup":
                  case "compositionend":
                    inputmask.isComposing && (inputmask.skipInputEvent = !1);
                    break;
                  case "keypress":
                    if (!0 === inputmask.skipKeyPressEvent) return e.preventDefault();
                    inputmask.skipKeyPressEvent = !0;
                    break;
                  case "click":
                  case "focus":
                    return inputmask.validationEvent ? (inputmask.validationEvent = !1, input.blur(), (0, _inputHandling.HandleNativePlaceholder)(input, (inputmask.isRTL ? _positioning.getBufferTemplate.call(inputmask).slice().reverse() : _positioning.getBufferTemplate.call(inputmask)).join("")), setTimeout(function () {
                      input.focus();
                    }, 3e3)) : (args = arguments, setTimeout(function () {
                      input.inputmask && eventHandler.apply(that, args);
                    }, 0)), !1;
                }
                var returnVal = eventHandler.apply(that, arguments);
                return !1 === returnVal && (e.preventDefault(), e.stopPropagation()), returnVal;
              }
              e.preventDefault();
            }
          };
        input.inputmask.events[eventName] = input.inputmask.events[eventName] || [], input.inputmask.events[eventName].push(ev), ["submit", "reset"].includes(eventName) ? null !== input.form && $(input.form).on(eventName, ev.bind(input)) : $(input).on(eventName, ev);
      },
      off: function off(input, event) {
        if (input.inputmask && input.inputmask.events) {
          var $ = input.inputmask.dependencyLib,
            events = input.inputmask.events;
          for (var eventName in event && (events = [], events[event] = input.inputmask.events[event]), events) {
            for (var evArr = events[eventName]; 0 < evArr.length;) {
              var ev = evArr.pop();
              ["submit", "reset"].includes(eventName) ? null !== input.form && $(input.form).off(eventName, ev) : $(input).off(eventName, ev);
            }
            delete input.inputmask.events[eventName];
          }
        }
      }
    };
    exports.EventRuler = EventRuler;
  }, function (module, exports, __webpack_require__) {
    "use strict";

    function _typeof(obj) {
      return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
        return _typeof2(obj);
      } : function _typeof(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      }, _typeof(obj);
    }
    function extend() {
      var options,
        name,
        src,
        copy,
        copyIsArray,
        clone,
        target = arguments[0] || {},
        i = 1,
        length = arguments.length,
        deep = !1;
      for ("boolean" == typeof target && (deep = target, target = arguments[i] || {}, i++), "object" !== _typeof(target) && "function" != typeof target && (target = {}); i < length; i++) if (null != (options = arguments[i])) for (name in options) src = target[name], copy = options[name], target !== copy && (deep && copy && ("[object Object]" === Object.prototype.toString.call(copy) || (copyIsArray = Array.isArray(copy))) ? (clone = copyIsArray ? (copyIsArray = !1, src && Array.isArray(src) ? src : []) : src && "[object Object]" === Object.prototype.toString.call(src) ? src : {}, target[name] = extend(deep, clone, copy)) : void 0 !== copy && (target[name] = copy));
      return target;
    }
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports["default"] = extend;
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports["default"] = _default;
    var escapeRegexRegex = new RegExp("(\\" + ["/", ".", "*", "+", "?", "|", "(", ")", "[", "]", "{", "}", "\\", "$", "^"].join("|\\") + ")", "gim");
    function _default(str) {
      return str.replace(escapeRegexRegex, "\\$1");
    }
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports["default"] = void 0, __webpack_require__(15), __webpack_require__(23), __webpack_require__(24), __webpack_require__(25);
    var _inputmask2 = _interopRequireDefault(__webpack_require__(2));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    var _default = _inputmask2["default"];
    exports["default"] = _default;
  }, function (module, exports, __webpack_require__) {
    "use strict";

    var _inputmask = _interopRequireDefault(__webpack_require__(2));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    _inputmask["default"].extendDefinitions({
      A: {
        validator: "[A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
        casing: "upper"
      },
      "&": {
        validator: "[0-9A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
        casing: "upper"
      },
      "#": {
        validator: "[0-9A-Fa-f]",
        casing: "upper"
      }
    });
    var ipValidatorRegex = new RegExp("25[0-5]|2[0-4][0-9]|[01][0-9][0-9]");
    function ipValidator(chrs, maskset, pos, strict, opts) {
      return chrs = -1 < pos - 1 && "." !== maskset.buffer[pos - 1] ? (chrs = maskset.buffer[pos - 1] + chrs, -1 < pos - 2 && "." !== maskset.buffer[pos - 2] ? maskset.buffer[pos - 2] + chrs : "0" + chrs) : "00" + chrs, ipValidatorRegex.test(chrs);
    }
    _inputmask["default"].extendAliases({
      cssunit: {
        regex: "[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)"
      },
      url: {
        regex: "(https?|ftp)://.*",
        autoUnmask: !1,
        keepStatic: !1,
        tabThrough: !0
      },
      ip: {
        mask: "i[i[i]].j[j[j]].k[k[k]].l[l[l]]",
        definitions: {
          i: {
            validator: ipValidator
          },
          j: {
            validator: ipValidator
          },
          k: {
            validator: ipValidator
          },
          l: {
            validator: ipValidator
          }
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          return maskedValue;
        },
        inputmode: "numeric"
      },
      email: {
        mask: "*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]",
        greedy: !1,
        casing: "lower",
        onBeforePaste: function onBeforePaste(pastedValue, opts) {
          return pastedValue = pastedValue.toLowerCase(), pastedValue.replace("mailto:", "");
        },
        definitions: {
          "*": {
            validator: "[0-9\uFF11-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5!#$%&'*+/=?^_`{|}~-]"
          },
          "-": {
            validator: "[0-9A-Za-z-]"
          }
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          return maskedValue;
        },
        inputmode: "email"
      },
      mac: {
        mask: "##:##:##:##:##:##"
      },
      vin: {
        mask: "V{13}9{4}",
        definitions: {
          V: {
            validator: "[A-HJ-NPR-Za-hj-npr-z\\d]",
            casing: "upper"
          }
        },
        clearIncomplete: !0,
        autoUnmask: !0
      },
      ssn: {
        mask: "999-99-9999",
        postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict) {
          return /^(?!219-09-9999|078-05-1120)(?!666|000|9.{2}).{3}-(?!00).{2}-(?!0{4}).{4}$/.test(buffer.join(""));
        }
      }
    });
  }, function (module, exports, __webpack_require__) {
    "use strict";

    function _typeof(obj) {
      return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
        return _typeof2(obj);
      } : function _typeof(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      }, _typeof(obj);
    }
    "function" != typeof Object.getPrototypeOf && (Object.getPrototypeOf = "object" === _typeof("test".__proto__) ? function (object) {
      return object.__proto__;
    } : function (object) {
      return object.constructor.prototype;
    });
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
      value: function value(searchElement, fromIndex) {
        if (null == this) throw new TypeError('"this" is null or not defined');
        var o = Object(this),
          len = o.length >>> 0;
        if (0 == len) return !1;
        for (var n = 0 | fromIndex, k = Math.max(0 <= n ? n : len - Math.abs(n), 0); k < len;) {
          if (o[k] === searchElement) return !0;
          k++;
        }
        return !1;
      }
    });
  }, function (module, exports, __webpack_require__) {
    "use strict";

    function _default(owner, key, value) {
      if (void 0 === value) return owner.__data ? owner.__data[key] : null;
      owner.__data = owner.__data || {}, owner.__data[key] = value;
    }
    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports["default"] = _default;
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.on = on, exports.off = off, exports.trigger = trigger, exports.Event = void 0;
    var _extend = _interopRequireDefault(__webpack_require__(12)),
      _window = _interopRequireDefault(__webpack_require__(6)),
      _inputmask = _interopRequireDefault(__webpack_require__(9)),
      Event;
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    function isValidElement(elem) {
      return elem instanceof Element;
    }
    function on(events, handler) {
      function addEvent(ev, namespace) {
        elem.addEventListener ? elem.addEventListener(ev, handler, !1) : elem.attachEvent && elem.attachEvent("on" + ev, handler), eventRegistry[ev] = eventRegistry[ev] || {}, eventRegistry[ev][namespace] = eventRegistry[ev][namespace] || [], eventRegistry[ev][namespace].push(handler);
      }
      if (isValidElement(this[0])) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = events.split(" "), endx = 0; endx < _events.length; endx++) {
        var nsEvent = _events[endx].split("."),
          ev = nsEvent[0],
          namespace = nsEvent[1] || "global";
        addEvent(ev, namespace);
      }
      return this;
    }
    function off(events, handler) {
      var eventRegistry, elem;
      function removeEvent(ev, namespace, handler) {
        if (ev in eventRegistry == !0) if (elem.removeEventListener ? elem.removeEventListener(ev, handler, !1) : elem.detachEvent && elem.detachEvent("on" + ev, handler), "global" === namespace) for (var nmsp in eventRegistry[ev]) eventRegistry[ev][nmsp].splice(eventRegistry[ev][nmsp].indexOf(handler), 1);else eventRegistry[ev][namespace].splice(eventRegistry[ev][namespace].indexOf(handler), 1);
      }
      function resolveNamespace(ev, namespace) {
        var evts = [],
          hndx,
          hndL;
        if (0 < ev.length) {
          if (void 0 === handler) for (hndx = 0, hndL = eventRegistry[ev][namespace].length; hndx < hndL; hndx++) evts.push({
            ev: ev,
            namespace: namespace && 0 < namespace.length ? namespace : "global",
            handler: eventRegistry[ev][namespace][hndx]
          });else evts.push({
            ev: ev,
            namespace: namespace && 0 < namespace.length ? namespace : "global",
            handler: handler
          });
        } else if (0 < namespace.length) for (var evNdx in eventRegistry) for (var nmsp in eventRegistry[evNdx]) if (nmsp === namespace) if (void 0 === handler) for (hndx = 0, hndL = eventRegistry[evNdx][nmsp].length; hndx < hndL; hndx++) evts.push({
          ev: evNdx,
          namespace: nmsp,
          handler: eventRegistry[evNdx][nmsp][hndx]
        });else evts.push({
          ev: evNdx,
          namespace: nmsp,
          handler: handler
        });
        return evts;
      }
      if (isValidElement(this[0])) {
        eventRegistry = this[0].eventRegistry, elem = this[0];
        for (var _events = events.split(" "), endx = 0; endx < _events.length; endx++) for (var nsEvent = _events[endx].split("."), offEvents = resolveNamespace(nsEvent[0], nsEvent[1]), i = 0, offEventsL = offEvents.length; i < offEventsL; i++) removeEvent(offEvents[i].ev, offEvents[i].namespace, offEvents[i].handler);
      }
      return this;
    }
    function trigger(events) {
      if (isValidElement(this[0])) for (var eventRegistry = this[0].eventRegistry, elem = this[0], _events = "string" == typeof events ? events.split(" ") : [events.type], endx = 0; endx < _events.length; endx++) {
        var nsEvent = _events[endx].split("."),
          ev = nsEvent[0],
          namespace = nsEvent[1] || "global";
        if (void 0 !== document && "global" === namespace) {
          var evnt,
            i,
            params = {
              bubbles: !0,
              cancelable: !0,
              detail: arguments[1]
            };
          if (document.createEvent) {
            try {
              evnt = new CustomEvent(ev, params);
            } catch (e) {
              evnt = document.createEvent("CustomEvent"), evnt.initCustomEvent(ev, params.bubbles, params.cancelable, params.detail);
            }
            events.type && (0, _extend["default"])(evnt, events), elem.dispatchEvent(evnt);
          } else evnt = document.createEventObject(), evnt.eventType = ev, evnt.detail = arguments[1], events.type && (0, _extend["default"])(evnt, events), elem.fireEvent("on" + evnt.eventType, evnt);
        } else if (void 0 !== eventRegistry[ev]) if (arguments[0] = arguments[0].type ? arguments[0] : _inputmask["default"].Event(arguments[0]), arguments[0].detail = arguments.slice(1), "global" === namespace) for (var nmsp in eventRegistry[ev]) for (i = 0; i < eventRegistry[ev][nmsp].length; i++) eventRegistry[ev][nmsp][i].apply(elem, arguments);else for (i = 0; i < eventRegistry[ev][namespace].length; i++) eventRegistry[ev][namespace][i].apply(elem, arguments);
      }
      return this;
    }
    exports.Event = Event, "function" == typeof _window["default"].CustomEvent ? exports.Event = Event = _window["default"].CustomEvent : (exports.Event = Event = function Event(event, params) {
      params = params || {
        bubbles: !1,
        cancelable: !1,
        detail: void 0
      };
      var evt = document.createEvent("CustomEvent");
      return evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail), evt;
    }, Event.prototype = _window["default"].Event.prototype);
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports.generateMaskSet = generateMaskSet, exports.analyseMask = analyseMask;
    var _inputmask = _interopRequireDefault(__webpack_require__(9));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    function generateMaskSet(opts, nocache) {
      var ms;
      function generateMask(mask, metadata, opts) {
        var regexMask = !1,
          masksetDefinition,
          maskdefKey;
        if (null !== mask && "" !== mask || (regexMask = null !== opts.regex, mask = regexMask ? (mask = opts.regex, mask.replace(/^(\^)(.*)(\$)$/, "$2")) : (regexMask = !0, ".*")), 1 === mask.length && !1 === opts.greedy && 0 !== opts.repeat && (opts.placeholder = ""), 0 < opts.repeat || "*" === opts.repeat || "+" === opts.repeat) {
          var repeatStart = "*" === opts.repeat ? 0 : "+" === opts.repeat ? 1 : opts.repeat;
          mask = opts.groupmarker[0] + mask + opts.groupmarker[1] + opts.quantifiermarker[0] + repeatStart + "," + opts.repeat + opts.quantifiermarker[1];
        }
        return maskdefKey = regexMask ? "regex_" + opts.regex : opts.numericInput ? mask.split("").reverse().join("") : mask, !1 !== opts.keepStatic && (maskdefKey = "ks_" + maskdefKey), void 0 === Inputmask.prototype.masksCache[maskdefKey] || !0 === nocache ? (masksetDefinition = {
          mask: mask,
          maskToken: Inputmask.prototype.analyseMask(mask, regexMask, opts),
          validPositions: {},
          _buffer: void 0,
          buffer: void 0,
          tests: {},
          excludes: {},
          metadata: metadata,
          maskLength: void 0,
          jitOffset: {}
        }, !0 !== nocache && (Inputmask.prototype.masksCache[maskdefKey] = masksetDefinition, masksetDefinition = _inputmask["default"].extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]))) : masksetDefinition = _inputmask["default"].extend(!0, {}, Inputmask.prototype.masksCache[maskdefKey]), masksetDefinition;
      }
      if ("function" == typeof opts.mask && (opts.mask = opts.mask(opts)), Array.isArray(opts.mask)) {
        if (1 < opts.mask.length) {
          null === opts.keepStatic && (opts.keepStatic = !0);
          var altMask = opts.groupmarker[0];
          return (opts.isRTL ? opts.mask.reverse() : opts.mask).forEach(function (msk) {
            1 < altMask.length && (altMask += opts.groupmarker[1] + opts.alternatormarker + opts.groupmarker[0]), void 0 !== msk.mask && "function" != typeof msk.mask ? altMask += msk.mask : altMask += msk;
          }), altMask += opts.groupmarker[1], generateMask(altMask, opts.mask, opts);
        }
        opts.mask = opts.mask.pop();
      }
      return null === opts.keepStatic && (opts.keepStatic = !1), ms = opts.mask && void 0 !== opts.mask.mask && "function" != typeof opts.mask.mask ? generateMask(opts.mask.mask, opts.mask, opts) : generateMask(opts.mask, opts.mask, opts), ms;
    }
    function analyseMask(mask, regexMask, opts) {
      var tokenizer = /(?:[?*+]|\{[0-9+*]+(?:,[0-9+*]*)?(?:\|[0-9+*]*)?\})|[^.?*+^${[]()|\\]+|./g,
        regexTokenizer = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
        escaped = !1,
        currentToken = new MaskToken(),
        match,
        m,
        openenings = [],
        maskTokens = [],
        openingToken,
        currentOpeningToken,
        alternator,
        lastMatch,
        closeRegexGroup = !1;
      function MaskToken(isGroup, isOptional, isQuantifier, isAlternator) {
        this.matches = [], this.openGroup = isGroup || !1, this.alternatorGroup = !1, this.isGroup = isGroup || !1, this.isOptional = isOptional || !1, this.isQuantifier = isQuantifier || !1, this.isAlternator = isAlternator || !1, this.quantifier = {
          min: 1,
          max: 1
        };
      }
      function insertTestDefinition(mtoken, element, position) {
        position = void 0 !== position ? position : mtoken.matches.length;
        var prevMatch = mtoken.matches[position - 1];
        if (regexMask) 0 === element.indexOf("[") || escaped && /\\d|\\s|\\w]/i.test(element) || "." === element ? mtoken.matches.splice(position++, 0, {
          fn: new RegExp(element, opts.casing ? "i" : ""),
          "static": !1,
          optionality: !1,
          newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element,
          casing: null,
          def: element,
          placeholder: void 0,
          nativeDef: element
        }) : (escaped && (element = element[element.length - 1]), element.split("").forEach(function (lmnt, ndx) {
          prevMatch = mtoken.matches[position - 1], mtoken.matches.splice(position++, 0, {
            fn: /[a-z]/i.test(opts.staticDefinitionSymbol || lmnt) ? new RegExp("[" + (opts.staticDefinitionSymbol || lmnt) + "]", opts.casing ? "i" : "") : null,
            "static": !0,
            optionality: !1,
            newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== lmnt && !0 !== prevMatch["static"],
            casing: null,
            def: opts.staticDefinitionSymbol || lmnt,
            placeholder: void 0 !== opts.staticDefinitionSymbol ? lmnt : void 0,
            nativeDef: (escaped ? "'" : "") + lmnt
          });
        })), escaped = !1;else {
          var maskdef = opts.definitions && opts.definitions[element] || opts.usePrototypeDefinitions && Inputmask.prototype.definitions[element];
          maskdef && !escaped ? mtoken.matches.splice(position++, 0, {
            fn: maskdef.validator ? "string" == typeof maskdef.validator ? new RegExp(maskdef.validator, opts.casing ? "i" : "") : new function () {
              this.test = maskdef.validator;
            }() : new RegExp("."),
            "static": maskdef["static"] || !1,
            optionality: !1,
            newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== (maskdef.definitionSymbol || element),
            casing: maskdef.casing,
            def: maskdef.definitionSymbol || element,
            placeholder: maskdef.placeholder,
            nativeDef: element,
            generated: maskdef.generated
          }) : (mtoken.matches.splice(position++, 0, {
            fn: /[a-z]/i.test(opts.staticDefinitionSymbol || element) ? new RegExp("[" + (opts.staticDefinitionSymbol || element) + "]", opts.casing ? "i" : "") : null,
            "static": !0,
            optionality: !1,
            newBlockMarker: void 0 === prevMatch ? "master" : prevMatch.def !== element && !0 !== prevMatch["static"],
            casing: null,
            def: opts.staticDefinitionSymbol || element,
            placeholder: void 0 !== opts.staticDefinitionSymbol ? element : void 0,
            nativeDef: (escaped ? "'" : "") + element
          }), escaped = !1);
        }
      }
      function verifyGroupMarker(maskToken) {
        maskToken && maskToken.matches && maskToken.matches.forEach(function (token, ndx) {
          var nextToken = maskToken.matches[ndx + 1];
          (void 0 === nextToken || void 0 === nextToken.matches || !1 === nextToken.isQuantifier) && token && token.isGroup && (token.isGroup = !1, regexMask || (insertTestDefinition(token, opts.groupmarker[0], 0), !0 !== token.openGroup && insertTestDefinition(token, opts.groupmarker[1]))), verifyGroupMarker(token);
        });
      }
      function defaultCase() {
        if (0 < openenings.length) {
          if (currentOpeningToken = openenings[openenings.length - 1], insertTestDefinition(currentOpeningToken, m), currentOpeningToken.isAlternator) {
            alternator = openenings.pop();
            for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup && (alternator.matches[mndx].isGroup = !1);
            0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
          }
        } else insertTestDefinition(currentToken, m);
      }
      function reverseTokens(maskToken) {
        function reverseStatic(st) {
          return st === opts.optionalmarker[0] ? st = opts.optionalmarker[1] : st === opts.optionalmarker[1] ? st = opts.optionalmarker[0] : st === opts.groupmarker[0] ? st = opts.groupmarker[1] : st === opts.groupmarker[1] && (st = opts.groupmarker[0]), st;
        }
        for (var match in maskToken.matches = maskToken.matches.reverse(), maskToken.matches) if (Object.prototype.hasOwnProperty.call(maskToken.matches, match)) {
          var intMatch = parseInt(match);
          if (maskToken.matches[match].isQuantifier && maskToken.matches[intMatch + 1] && maskToken.matches[intMatch + 1].isGroup) {
            var qt = maskToken.matches[match];
            maskToken.matches.splice(match, 1), maskToken.matches.splice(intMatch + 1, 0, qt);
          }
          void 0 !== maskToken.matches[match].matches ? maskToken.matches[match] = reverseTokens(maskToken.matches[match]) : maskToken.matches[match] = reverseStatic(maskToken.matches[match]);
        }
        return maskToken;
      }
      function groupify(matches) {
        var groupToken = new MaskToken(!0);
        return groupToken.openGroup = !1, groupToken.matches = matches, groupToken;
      }
      function closeGroup() {
        if (openingToken = openenings.pop(), openingToken.openGroup = !1, void 0 !== openingToken) {
          if (0 < openenings.length) {
            if (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(openingToken), currentOpeningToken.isAlternator) {
              alternator = openenings.pop();
              for (var mndx = 0; mndx < alternator.matches.length; mndx++) alternator.matches[mndx].isGroup = !1, alternator.matches[mndx].alternatorGroup = !1;
              0 < openenings.length ? (currentOpeningToken = openenings[openenings.length - 1], currentOpeningToken.matches.push(alternator)) : currentToken.matches.push(alternator);
            }
          } else currentToken.matches.push(openingToken);
        } else defaultCase();
      }
      function groupQuantifier(matches) {
        var lastMatch = matches.pop();
        return lastMatch.isQuantifier && (lastMatch = groupify([matches.pop(), lastMatch])), lastMatch;
      }
      for (regexMask && (opts.optionalmarker[0] = void 0, opts.optionalmarker[1] = void 0); match = regexMask ? regexTokenizer.exec(mask) : tokenizer.exec(mask);) {
        if (m = match[0], regexMask) switch (m.charAt(0)) {
          case "?":
            m = "{0,1}";
            break;
          case "+":
          case "*":
            m = "{" + m + "}";
            break;
          case "|":
            if (0 === openenings.length) {
              var altRegexGroup = groupify(currentToken.matches);
              altRegexGroup.openGroup = !0, openenings.push(altRegexGroup), currentToken.matches = [], closeRegexGroup = !0;
            }
            break;
        }
        if (escaped) defaultCase();else switch (m.charAt(0)) {
          case "$":
          case "^":
            regexMask || defaultCase();
            break;
          case "(?=":
            break;
          case "(?!":
            break;
          case "(?<=":
            break;
          case "(?<!":
            break;
          case opts.escapeChar:
            escaped = !0, regexMask && defaultCase();
            break;
          case opts.optionalmarker[1]:
          case opts.groupmarker[1]:
            closeGroup();
            break;
          case opts.optionalmarker[0]:
            openenings.push(new MaskToken(!1, !0));
            break;
          case opts.groupmarker[0]:
            openenings.push(new MaskToken(!0));
            break;
          case opts.quantifiermarker[0]:
            var quantifier = new MaskToken(!1, !1, !0);
            m = m.replace(/[{}]/g, "");
            var mqj = m.split("|"),
              mq = mqj[0].split(","),
              mq0 = isNaN(mq[0]) ? mq[0] : parseInt(mq[0]),
              mq1 = 1 === mq.length ? mq0 : isNaN(mq[1]) ? mq[1] : parseInt(mq[1]);
            "*" !== mq0 && "+" !== mq0 || (mq0 = "*" === mq1 ? 0 : 1), quantifier.quantifier = {
              min: mq0,
              max: mq1,
              jit: mqj[1]
            };
            var matches = 0 < openenings.length ? openenings[openenings.length - 1].matches : currentToken.matches;
            if (match = matches.pop(), match.isAlternator) {
              matches.push(match), matches = match.matches;
              var groupToken = new MaskToken(!0),
                tmpMatch = matches.pop();
              matches.push(groupToken), matches = groupToken.matches, match = tmpMatch;
            }
            match.isGroup || (match = groupify([match])), matches.push(match), matches.push(quantifier);
            break;
          case opts.alternatormarker:
            if (0 < openenings.length) {
              currentOpeningToken = openenings[openenings.length - 1];
              var subToken = currentOpeningToken.matches[currentOpeningToken.matches.length - 1];
              lastMatch = currentOpeningToken.openGroup && (void 0 === subToken.matches || !1 === subToken.isGroup && !1 === subToken.isAlternator) ? openenings.pop() : groupQuantifier(currentOpeningToken.matches);
            } else lastMatch = groupQuantifier(currentToken.matches);
            if (lastMatch.isAlternator) openenings.push(lastMatch);else if (lastMatch.alternatorGroup ? (alternator = openenings.pop(), lastMatch.alternatorGroup = !1) : alternator = new MaskToken(!1, !1, !1, !0), alternator.matches.push(lastMatch), openenings.push(alternator), lastMatch.openGroup) {
              lastMatch.openGroup = !1;
              var alternatorGroup = new MaskToken(!0);
              alternatorGroup.alternatorGroup = !0, openenings.push(alternatorGroup);
            }
            break;
          default:
            defaultCase();
        }
      }
      for (closeRegexGroup && closeGroup(); 0 < openenings.length;) openingToken = openenings.pop(), currentToken.matches.push(openingToken);
      return 0 < currentToken.matches.length && (verifyGroupMarker(currentToken), maskTokens.push(currentToken)), (opts.numericInput || opts.isRTL) && reverseTokens(maskTokens[0]), maskTokens;
    }
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports["default"] = void 0;
    var _default = {
      9: {
        validator: "[0-9\uFF10-\uFF19]",
        definitionSymbol: "*"
      },
      a: {
        validator: "[A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]",
        definitionSymbol: "*"
      },
      "*": {
        validator: "[0-9\uFF10-\uFF19A-Za-z\u0410-\u044F\u0401\u0451\xC0-\xFF\xB5]"
      }
    };
    exports["default"] = _default;
  }, function (module, exports, __webpack_require__) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: !0
    }), exports["default"] = void 0;
    var _default = {
      _maxTestPos: 500,
      placeholder: "_",
      optionalmarker: ["[", "]"],
      quantifiermarker: ["{", "}"],
      groupmarker: ["(", ")"],
      alternatormarker: "|",
      escapeChar: "\\",
      mask: null,
      regex: null,
      oncomplete: function oncomplete() {},
      onincomplete: function onincomplete() {},
      oncleared: function oncleared() {},
      repeat: 0,
      greedy: !1,
      autoUnmask: !1,
      removeMaskOnSubmit: !1,
      clearMaskOnLostFocus: !0,
      insertMode: !0,
      insertModeVisual: !0,
      clearIncomplete: !1,
      alias: null,
      onKeyDown: function onKeyDown() {},
      onBeforeMask: null,
      onBeforePaste: function onBeforePaste(pastedValue, opts) {
        return "function" == typeof opts.onBeforeMask ? opts.onBeforeMask.call(this, pastedValue, opts) : pastedValue;
      },
      onBeforeWrite: null,
      onUnMask: null,
      showMaskOnFocus: !0,
      showMaskOnHover: !0,
      onKeyValidation: function onKeyValidation() {},
      skipOptionalPartCharacter: " ",
      numericInput: !1,
      rightAlign: !1,
      undoOnEscape: !0,
      radixPoint: "",
      _radixDance: !1,
      groupSeparator: "",
      keepStatic: null,
      positionCaretOnTab: !0,
      tabThrough: !1,
      supportsInputType: ["text", "tel", "url", "password", "search"],
      ignorables: [8, 9, 19, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 93, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 0, 229],
      isComplete: null,
      preValidation: null,
      postValidation: null,
      staticDefinitionSymbol: void 0,
      jitMasking: !1,
      nullable: !0,
      inputEventOnly: !1,
      noValuePatching: !1,
      positionCaretOnClick: "lvp",
      casing: null,
      inputmode: "text",
      importDataAttributes: !0,
      shiftPositions: !0,
      usePrototypeDefinitions: !0
    };
    exports["default"] = _default;
  }, function (module, exports, __webpack_require__) {
    "use strict";

    var _inputmask = _interopRequireDefault(__webpack_require__(2)),
      _keycode = _interopRequireDefault(__webpack_require__(0)),
      _escapeRegex = _interopRequireDefault(__webpack_require__(13)),
      _positioning = __webpack_require__(1);
    function _typeof(obj) {
      return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
        return _typeof2(obj);
      } : function _typeof(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      }, _typeof(obj);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    var $ = _inputmask["default"].dependencyLib,
      currentYear = new Date().getFullYear(),
      formatCode = {
        d: ["[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", Date.prototype.getDate],
        dd: ["0[1-9]|[12][0-9]|3[01]", Date.prototype.setDate, "day", function () {
          return pad(Date.prototype.getDate.call(this), 2);
        }],
        ddd: [""],
        dddd: [""],
        m: ["[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
          return Date.prototype.getMonth.call(this) + 1;
        }],
        mm: ["0[1-9]|1[012]", Date.prototype.setMonth, "month", function () {
          return pad(Date.prototype.getMonth.call(this) + 1, 2);
        }],
        mmm: [""],
        mmmm: [""],
        yy: ["[0-9]{2}", Date.prototype.setFullYear, "year", function () {
          return pad(Date.prototype.getFullYear.call(this), 2);
        }],
        yyyy: ["[0-9]{4}", Date.prototype.setFullYear, "year", function () {
          return pad(Date.prototype.getFullYear.call(this), 4);
        }],
        h: ["[1-9]|1[0-2]", Date.prototype.setHours, "hours", Date.prototype.getHours],
        hh: ["0[1-9]|1[0-2]", Date.prototype.setHours, "hours", function () {
          return pad(Date.prototype.getHours.call(this), 2);
        }],
        hx: [function (x) {
          return "[0-9]{".concat(x, "}");
        }, Date.prototype.setHours, "hours", function (x) {
          return Date.prototype.getHours;
        }],
        H: ["1?[0-9]|2[0-3]", Date.prototype.setHours, "hours", Date.prototype.getHours],
        HH: ["0[0-9]|1[0-9]|2[0-3]", Date.prototype.setHours, "hours", function () {
          return pad(Date.prototype.getHours.call(this), 2);
        }],
        Hx: [function (x) {
          return "[0-9]{".concat(x, "}");
        }, Date.prototype.setHours, "hours", function (x) {
          return function () {
            return pad(Date.prototype.getHours.call(this), x);
          };
        }],
        M: ["[1-5]?[0-9]", Date.prototype.setMinutes, "minutes", Date.prototype.getMinutes],
        MM: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setMinutes, "minutes", function () {
          return pad(Date.prototype.getMinutes.call(this), 2);
        }],
        s: ["[1-5]?[0-9]", Date.prototype.setSeconds, "seconds", Date.prototype.getSeconds],
        ss: ["0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]", Date.prototype.setSeconds, "seconds", function () {
          return pad(Date.prototype.getSeconds.call(this), 2);
        }],
        l: ["[0-9]{3}", Date.prototype.setMilliseconds, "milliseconds", function () {
          return pad(Date.prototype.getMilliseconds.call(this), 3);
        }],
        L: ["[0-9]{2}", Date.prototype.setMilliseconds, "milliseconds", function () {
          return pad(Date.prototype.getMilliseconds.call(this), 2);
        }],
        t: ["[ap]"],
        tt: ["[ap]m"],
        T: ["[AP]"],
        TT: ["[AP]M"],
        Z: [""],
        o: [""],
        S: [""]
      },
      formatAlias = {
        isoDate: "yyyy-mm-dd",
        isoTime: "HH:MM:ss",
        isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
        isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
      };
    function formatcode(match) {
      var dynMatches = new RegExp("\\d+$").exec(match[0]);
      if (dynMatches && void 0 !== dynMatches[0]) {
        var fcode = formatCode[match[0][0] + "x"].slice("");
        return fcode[0] = fcode[0](dynMatches[0]), fcode[3] = fcode[3](dynMatches[0]), fcode;
      }
      if (formatCode[match[0]]) return formatCode[match[0]];
    }
    function getTokenizer(opts) {
      if (!opts.tokenizer) {
        var tokens = [],
          dyntokens = [];
        for (var ndx in formatCode) if (/\.*x$/.test(ndx)) {
          var dynToken = ndx[0] + "\\d+";
          -1 === dyntokens.indexOf(dynToken) && dyntokens.push(dynToken);
        } else -1 === tokens.indexOf(ndx[0]) && tokens.push(ndx[0]);
        opts.tokenizer = "(" + (0 < dyntokens.length ? dyntokens.join("|") + "|" : "") + tokens.join("+|") + ")+?|.", opts.tokenizer = new RegExp(opts.tokenizer, "g");
      }
      return opts.tokenizer;
    }
    function prefillYear(dateParts, currentResult, opts) {
      if (dateParts.year !== dateParts.rawyear) {
        var crrntyear = currentYear.toString(),
          enteredPart = dateParts.rawyear.replace(/[^0-9]/g, ""),
          currentYearPart = crrntyear.slice(0, enteredPart.length),
          currentYearNextPart = crrntyear.slice(enteredPart.length);
        if (2 === enteredPart.length && enteredPart === currentYearPart) {
          var entryCurrentYear = new Date(currentYear, dateParts.month - 1, dateParts.day);
          dateParts.day == entryCurrentYear.getDate() && (!opts.max || opts.max.date.getTime() >= entryCurrentYear.getTime()) && (dateParts.date.setFullYear(currentYear), dateParts.year = crrntyear, currentResult.insert = [{
            pos: currentResult.pos + 1,
            c: currentYearNextPart[0]
          }, {
            pos: currentResult.pos + 2,
            c: currentYearNextPart[1]
          }]);
        }
      }
      return currentResult;
    }
    function isValidDate(dateParts, currentResult, opts) {
      if (void 0 === dateParts.rawday || !isFinite(dateParts.rawday) && new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day || "29" == dateParts.day && !isFinite(dateParts.rawyear) || new Date(dateParts.date.getFullYear(), isFinite(dateParts.rawmonth) ? dateParts.month : dateParts.date.getMonth() + 1, 0).getDate() >= dateParts.day) return currentResult;
      if ("29" == dateParts.day) {
        var tokenMatch = getTokenMatch(currentResult.pos, opts);
        if ("yyyy" === tokenMatch.targetMatch[0] && currentResult.pos - tokenMatch.targetMatchIndex == 2) return currentResult.remove = currentResult.pos + 1, currentResult;
      } else if ("02" == dateParts.month && "30" == dateParts.day) return dateParts.day = "03", dateParts.date.setDate(3), dateParts.date.setMonth(1), currentResult.insert = [{
        pos: currentResult.pos,
        c: "0"
      }, {
        pos: currentResult.pos + 1,
        c: currentResult.c
      }], currentResult.caret = _positioning.seekNext.call(this, currentResult.pos + 1), currentResult;
      return !1;
    }
    function isDateInRange(dateParts, result, opts, maskset, fromCheckval) {
      if (!result) return result;
      if (opts.min) {
        if (dateParts.rawyear) {
          var rawYear = dateParts.rawyear.replace(/[^0-9]/g, ""),
            minYear = opts.min.year.substr(0, rawYear.length),
            maxYear;
          if (rawYear < minYear) {
            var tokenMatch = getTokenMatch(result.pos, opts);
            if (rawYear = dateParts.rawyear.substr(0, result.pos - tokenMatch.targetMatchIndex + 1).replace(/[^0-9]/g, "0"), minYear = opts.min.year.substr(0, rawYear.length), minYear <= rawYear) return result.remove = tokenMatch.targetMatchIndex + rawYear.length, result;
            if (rawYear = "yyyy" === tokenMatch.targetMatch[0] ? dateParts.rawyear.substr(1, 1) : dateParts.rawyear.substr(0, 1), minYear = opts.min.year.substr(2, 1), maxYear = opts.max ? opts.max.year.substr(2, 1) : rawYear, 1 === rawYear.length && minYear <= rawYear && rawYear <= maxYear && !0 !== fromCheckval) return "yyyy" === tokenMatch.targetMatch[0] ? (result.insert = [{
              pos: result.pos + 1,
              c: rawYear,
              strict: !0
            }], result.caret = result.pos + 2, maskset.validPositions[result.pos].input = opts.min.year[1]) : (result.insert = [{
              pos: result.pos + 1,
              c: opts.min.year[1],
              strict: !0
            }, {
              pos: result.pos + 2,
              c: rawYear,
              strict: !0
            }], result.caret = result.pos + 3, maskset.validPositions[result.pos].input = opts.min.year[0]), result;
            result = !1;
          }
        }
        result && dateParts.year && dateParts.year === dateParts.rawyear && opts.min.date.getTime() == opts.min.date.getTime() && (result = opts.min.date.getTime() <= dateParts.date.getTime());
      }
      return result && opts.max && opts.max.date.getTime() == opts.max.date.getTime() && (result = opts.max.date.getTime() >= dateParts.date.getTime()), result;
    }
    function parse(format, dateObjValue, opts, raw) {
      var mask = "",
        match,
        fcode;
      for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format);) if (void 0 === dateObjValue) {
        if (fcode = formatcode(match)) mask += "(" + fcode[0] + ")";else switch (match[0]) {
          case "[":
            mask += "(";
            break;
          case "]":
            mask += ")?";
            break;
          default:
            mask += (0, _escapeRegex["default"])(match[0]);
        }
      } else if (fcode = formatcode(match)) {
        if (!0 !== raw && fcode[3]) {
          var getFn = fcode[3];
          mask += getFn.call(dateObjValue.date);
        } else fcode[2] ? mask += dateObjValue["raw" + fcode[2]] : mask += match[0];
      } else mask += match[0];
      return mask;
    }
    function pad(val, len) {
      for (val = String(val), len = len || 2; val.length < len;) val = "0" + val;
      return val;
    }
    function analyseMask(maskString, format, opts) {
      var dateObj = {
          date: new Date(1, 0, 1)
        },
        targetProp,
        mask = maskString,
        match,
        dateOperation;
      function setValue(dateObj, value, opts) {
        if (dateObj[targetProp] = value.replace(/[^0-9]/g, "0"), dateObj["raw" + targetProp] = value, void 0 !== dateOperation) {
          var datavalue = dateObj[targetProp];
          "day" === targetProp && 0 === parseInt(datavalue) && (datavalue = 1), "month" === targetProp && (datavalue = parseInt(datavalue), 0 < datavalue) && (datavalue -= 1), dateOperation.call(dateObj.date, datavalue);
        }
      }
      if ("string" == typeof mask) {
        for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(format);) {
          var dynMatches = new RegExp("\\d+$").exec(match[0]),
            fcode = dynMatches ? match[0][0] + "x" : match[0],
            value = void 0;
          if (dynMatches) {
            var lastIndex = getTokenizer(opts).lastIndex,
              tokanMatch = getTokenMatch(match.index, opts);
            getTokenizer(opts).lastIndex = lastIndex, value = mask.slice(0, mask.indexOf(tokanMatch.nextMatch[0]));
          } else value = mask.slice(0, fcode.length);
          Object.prototype.hasOwnProperty.call(formatCode, fcode) && (targetProp = formatCode[fcode][2], dateOperation = formatCode[fcode][1], setValue(dateObj, value, opts)), mask = mask.slice(value.length);
        }
        return dateObj;
      }
      if (mask && "object" === _typeof(mask) && Object.prototype.hasOwnProperty.call(mask, "date")) return mask;
    }
    function importDate(dateObj, opts) {
      return parse(opts.inputFormat, {
        date: dateObj
      }, opts);
    }
    function getTokenMatch(pos, opts) {
      var calcPos = 0,
        targetMatch,
        match,
        matchLength = 0;
      for (getTokenizer(opts).lastIndex = 0; match = getTokenizer(opts).exec(opts.inputFormat);) {
        var dynMatches = new RegExp("\\d+$").exec(match[0]);
        if (matchLength = dynMatches ? parseInt(dynMatches[0]) : match[0].length, calcPos += matchLength, pos <= calcPos) {
          targetMatch = match, match = getTokenizer(opts).exec(opts.inputFormat);
          break;
        }
      }
      return {
        targetMatchIndex: calcPos - matchLength,
        nextMatch: match,
        targetMatch: targetMatch
      };
    }
    _inputmask["default"].extendAliases({
      datetime: {
        mask: function mask(opts) {
          return opts.numericInput = !1, formatCode.S = opts.i18n.ordinalSuffix.join("|"), opts.inputFormat = formatAlias[opts.inputFormat] || opts.inputFormat, opts.displayFormat = formatAlias[opts.displayFormat] || opts.displayFormat || opts.inputFormat, opts.outputFormat = formatAlias[opts.outputFormat] || opts.outputFormat || opts.inputFormat, opts.placeholder = "" !== opts.placeholder ? opts.placeholder : opts.inputFormat.replace(/[[\]]/, ""), opts.regex = parse(opts.inputFormat, void 0, opts), opts.min = analyseMask(opts.min, opts.inputFormat, opts), opts.max = analyseMask(opts.max, opts.inputFormat, opts), null;
        },
        placeholder: "",
        inputFormat: "isoDateTime",
        displayFormat: void 0,
        outputFormat: void 0,
        min: null,
        max: null,
        skipOptionalPartCharacter: "",
        i18n: {
          dayNames: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          monthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          ordinalSuffix: ["st", "nd", "rd", "th"]
        },
        preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
          if (strict) return !0;
          if (isNaN(c) && buffer[pos] !== c) {
            var tokenMatch = getTokenMatch(pos, opts);
            if (tokenMatch.nextMatch && tokenMatch.nextMatch[0] === c && 1 < tokenMatch.targetMatch[0].length) {
              var validator = formatCode[tokenMatch.targetMatch[0]][0];
              if (new RegExp(validator).test("0" + buffer[pos - 1])) return buffer[pos] = buffer[pos - 1], buffer[pos - 1] = "0", {
                fuzzy: !0,
                buffer: buffer,
                refreshFromBuffer: {
                  start: pos - 1,
                  end: pos + 1
                },
                pos: pos + 1
              };
            }
          }
          return !0;
        },
        postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict, fromCheckval) {
          var inputmask = this,
            tokenMatch,
            validator;
          if (strict) return !0;
          if (!1 === currentResult) return tokenMatch = getTokenMatch(pos + 1, opts), tokenMatch.targetMatch && tokenMatch.targetMatchIndex === pos && 1 < tokenMatch.targetMatch[0].length && void 0 !== formatCode[tokenMatch.targetMatch[0]] && (validator = formatCode[tokenMatch.targetMatch[0]][0], new RegExp(validator).test("0" + c)) ? {
            insert: [{
              pos: pos,
              c: "0"
            }, {
              pos: pos + 1,
              c: c
            }],
            pos: pos + 1
          } : currentResult;
          if (currentResult.fuzzy && (buffer = currentResult.buffer, pos = currentResult.pos), tokenMatch = getTokenMatch(pos, opts), tokenMatch.targetMatch && tokenMatch.targetMatch[0] && void 0 !== formatCode[tokenMatch.targetMatch[0]]) {
            validator = formatCode[tokenMatch.targetMatch[0]][0];
            var part = buffer.slice(tokenMatch.targetMatchIndex, tokenMatch.targetMatchIndex + tokenMatch.targetMatch[0].length);
            !1 === new RegExp(validator).test(part.join("")) && 2 === tokenMatch.targetMatch[0].length && maskset.validPositions[tokenMatch.targetMatchIndex] && maskset.validPositions[tokenMatch.targetMatchIndex + 1] && (maskset.validPositions[tokenMatch.targetMatchIndex + 1].input = "0");
          }
          var result = currentResult,
            dateParts = analyseMask(buffer.join(""), opts.inputFormat, opts);
          return result && dateParts.date.getTime() == dateParts.date.getTime() && (result = prefillYear(dateParts, result, opts), result = isValidDate.call(this, dateParts, result, opts), result = isDateInRange(dateParts, result, opts, maskset, fromCheckval)), pos && result && currentResult.pos !== pos ? {
            buffer: parse(opts.inputFormat, dateParts, opts).split(""),
            refreshFromBuffer: {
              start: pos,
              end: currentResult.pos
            }
          } : result;
        },
        onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
          var input = this;
          e.ctrlKey && e.keyCode === _keycode["default"].RIGHT && (this.inputmask._valueSet(importDate(new Date(), opts)), $(this).trigger("setvalue"));
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          return unmaskedValue ? parse(opts.outputFormat, analyseMask(maskedValue, opts.inputFormat, opts), opts, !0) : unmaskedValue;
        },
        casing: function casing(elem, test, pos, validPositions) {
          return 0 == test.nativeDef.indexOf("[ap]") ? elem.toLowerCase() : 0 == test.nativeDef.indexOf("[AP]") ? elem.toUpperCase() : elem;
        },
        onBeforeMask: function onBeforeMask(initialValue, opts) {
          return "[object Date]" === Object.prototype.toString.call(initialValue) && (initialValue = importDate(initialValue, opts)), initialValue;
        },
        insertMode: !1,
        shiftPositions: !1,
        keepStatic: !1,
        inputmode: "numeric"
      }
    });
  }, function (module, exports, __webpack_require__) {
    "use strict";

    var _inputmask = _interopRequireDefault(__webpack_require__(2)),
      _keycode = _interopRequireDefault(__webpack_require__(0)),
      _escapeRegex = _interopRequireDefault(__webpack_require__(13));
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    var $ = _inputmask["default"].dependencyLib;
    function autoEscape(txt, opts) {
      for (var escapedTxt = "", i = 0; i < txt.length; i++) _inputmask["default"].prototype.definitions[txt.charAt(i)] || opts.definitions[txt.charAt(i)] || opts.optionalmarker[0] === txt.charAt(i) || opts.optionalmarker[1] === txt.charAt(i) || opts.quantifiermarker[0] === txt.charAt(i) || opts.quantifiermarker[1] === txt.charAt(i) || opts.groupmarker[0] === txt.charAt(i) || opts.groupmarker[1] === txt.charAt(i) || opts.alternatormarker === txt.charAt(i) ? escapedTxt += "\\" + txt.charAt(i) : escapedTxt += txt.charAt(i);
      return escapedTxt;
    }
    function alignDigits(buffer, digits, opts, force) {
      if (0 < buffer.length && 0 < digits && (!opts.digitsOptional || force)) {
        var radixPosition = buffer.indexOf(opts.radixPoint),
          negationBack = !1;
        opts.negationSymbol.back === buffer[buffer.length - 1] && (negationBack = !0, buffer.length--), -1 === radixPosition && (buffer.push(opts.radixPoint), radixPosition = buffer.length - 1);
        for (var i = 1; i <= digits; i++) isFinite(buffer[radixPosition + i]) || (buffer[radixPosition + i] = "0");
      }
      return negationBack && buffer.push(opts.negationSymbol.back), buffer;
    }
    function findValidator(symbol, maskset) {
      var posNdx = 0;
      if ("+" === symbol) {
        for (posNdx in maskset.validPositions);
        posNdx = parseInt(posNdx);
      }
      for (var tstNdx in maskset.tests) if (tstNdx = parseInt(tstNdx), posNdx <= tstNdx) for (var ndx = 0, ndxl = maskset.tests[tstNdx].length; ndx < ndxl; ndx++) if ((void 0 === maskset.validPositions[tstNdx] || "-" === symbol) && maskset.tests[tstNdx][ndx].match.def === symbol) return tstNdx + (void 0 !== maskset.validPositions[tstNdx] && "-" !== symbol ? 1 : 0);
      return posNdx;
    }
    function findValid(symbol, maskset) {
      var ret = -1;
      for (var ndx in maskset.validPositions) {
        var tst = maskset.validPositions[ndx];
        if (tst && tst.match.def === symbol) {
          ret = parseInt(ndx);
          break;
        }
      }
      return ret;
    }
    function parseMinMaxOptions(opts) {
      void 0 === opts.parseMinMaxOptions && (null !== opts.min && (opts.min = opts.min.toString().replace(new RegExp((0, _escapeRegex["default"])(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.min = opts.min.replace(opts.radixPoint, ".")), opts.min = isFinite(opts.min) ? parseFloat(opts.min) : NaN, isNaN(opts.min) && (opts.min = Number.MIN_VALUE)), null !== opts.max && (opts.max = opts.max.toString().replace(new RegExp((0, _escapeRegex["default"])(opts.groupSeparator), "g"), ""), "," === opts.radixPoint && (opts.max = opts.max.replace(opts.radixPoint, ".")), opts.max = isFinite(opts.max) ? parseFloat(opts.max) : NaN, isNaN(opts.max) && (opts.max = Number.MAX_VALUE)), opts.parseMinMaxOptions = "done");
    }
    function genMask(opts) {
      opts.repeat = 0, opts.groupSeparator === opts.radixPoint && opts.digits && "0" !== opts.digits && ("." === opts.radixPoint ? opts.groupSeparator = "," : "," === opts.radixPoint ? opts.groupSeparator = "." : opts.groupSeparator = ""), " " === opts.groupSeparator && (opts.skipOptionalPartCharacter = void 0), 1 < opts.placeholder.length && (opts.placeholder = opts.placeholder.charAt(0)), "radixFocus" === opts.positionCaretOnClick && "" === opts.placeholder && (opts.positionCaretOnClick = "lvp");
      var decimalDef = "0",
        radixPointDef = opts.radixPoint;
      !0 === opts.numericInput && void 0 === opts.__financeInput ? (decimalDef = "1", opts.positionCaretOnClick = "radixFocus" === opts.positionCaretOnClick ? "lvp" : opts.positionCaretOnClick, opts.digitsOptional = !1, isNaN(opts.digits) && (opts.digits = 2), opts._radixDance = !1, radixPointDef = "," === opts.radixPoint ? "?" : "!", "" !== opts.radixPoint && void 0 === opts.definitions[radixPointDef] && (opts.definitions[radixPointDef] = {}, opts.definitions[radixPointDef].validator = "[" + opts.radixPoint + "]", opts.definitions[radixPointDef].placeholder = opts.radixPoint, opts.definitions[radixPointDef]["static"] = !0, opts.definitions[radixPointDef].generated = !0)) : (opts.__financeInput = !1, opts.numericInput = !0);
      var mask = "[+]",
        altMask;
      if (mask += autoEscape(opts.prefix, opts), "" !== opts.groupSeparator ? (void 0 === opts.definitions[opts.groupSeparator] && (opts.definitions[opts.groupSeparator] = {}, opts.definitions[opts.groupSeparator].validator = "[" + opts.groupSeparator + "]", opts.definitions[opts.groupSeparator].placeholder = opts.groupSeparator, opts.definitions[opts.groupSeparator]["static"] = !0, opts.definitions[opts.groupSeparator].generated = !0), mask += opts._mask(opts)) : mask += "9{+}", void 0 !== opts.digits && 0 !== opts.digits) {
        var dq = opts.digits.toString().split(",");
        isFinite(dq[0]) && dq[1] && isFinite(dq[1]) ? mask += radixPointDef + decimalDef + "{" + opts.digits + "}" : (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && (opts.digitsOptional ? (altMask = mask + radixPointDef + decimalDef + "{0," + opts.digits + "}", opts.keepStatic = !0) : mask += radixPointDef + decimalDef + "{" + opts.digits + "}");
      }
      return mask += autoEscape(opts.suffix, opts), mask += "[-]", altMask && (mask = [altMask + autoEscape(opts.suffix, opts) + "[-]", mask]), opts.greedy = !1, parseMinMaxOptions(opts), mask;
    }
    function hanndleRadixDance(pos, c, radixPos, maskset, opts) {
      return opts._radixDance && opts.numericInput && c !== opts.negationSymbol.back && pos <= radixPos && (0 < radixPos || c == opts.radixPoint) && (void 0 === maskset.validPositions[pos - 1] || maskset.validPositions[pos - 1].input !== opts.negationSymbol.back) && (pos -= 1), pos;
    }
    function decimalValidator(chrs, maskset, pos, strict, opts) {
      var radixPos = maskset.buffer ? maskset.buffer.indexOf(opts.radixPoint) : -1,
        result = -1 !== radixPos && new RegExp("[0-9\uFF11-\uFF19]").test(chrs);
      return opts._radixDance && result && null == maskset.validPositions[radixPos] ? {
        insert: {
          pos: radixPos === pos ? radixPos + 1 : radixPos,
          c: opts.radixPoint
        },
        pos: pos
      } : result;
    }
    function checkForLeadingZeroes(buffer, opts) {
      var numberMatches = new RegExp("(^" + ("" !== opts.negationSymbol.front ? (0, _escapeRegex["default"])(opts.negationSymbol.front) + "?" : "") + (0, _escapeRegex["default"])(opts.prefix) + ")(.*)(" + (0, _escapeRegex["default"])(opts.suffix) + ("" != opts.negationSymbol.back ? (0, _escapeRegex["default"])(opts.negationSymbol.back) + "?" : "") + "$)").exec(buffer.slice().reverse().join("")),
        number = numberMatches ? numberMatches[2] : "",
        leadingzeroes = !1;
      return number && (number = number.split(opts.radixPoint.charAt(0))[0], leadingzeroes = new RegExp("^[0" + opts.groupSeparator + "]*").exec(number)), !(!leadingzeroes || !(1 < leadingzeroes[0].length || 0 < leadingzeroes[0].length && leadingzeroes[0].length < number.length)) && leadingzeroes;
    }
    _inputmask["default"].extendAliases({
      numeric: {
        mask: genMask,
        _mask: function _mask(opts) {
          return "(" + opts.groupSeparator + "999){+|1}";
        },
        digits: "*",
        digitsOptional: !0,
        enforceDigitsOnBlur: !1,
        radixPoint: ".",
        positionCaretOnClick: "radixFocus",
        _radixDance: !0,
        groupSeparator: "",
        allowMinus: !0,
        negationSymbol: {
          front: "-",
          back: ""
        },
        prefix: "",
        suffix: "",
        min: null,
        max: null,
        SetMaxOnOverflow: !1,
        step: 1,
        inputType: "text",
        unmaskAsNumber: !1,
        roundingFN: Math.round,
        inputmode: "numeric",
        shortcuts: {
          k: "000",
          m: "000000"
        },
        placeholder: "0",
        greedy: !1,
        rightAlign: !0,
        insertMode: !0,
        autoUnmask: !1,
        skipOptionalPartCharacter: "",
        definitions: {
          0: {
            validator: decimalValidator
          },
          1: {
            validator: decimalValidator,
            definitionSymbol: "9"
          },
          "+": {
            validator: function validator(chrs, maskset, pos, strict, opts) {
              return opts.allowMinus && ("-" === chrs || chrs === opts.negationSymbol.front);
            }
          },
          "-": {
            validator: function validator(chrs, maskset, pos, strict, opts) {
              return opts.allowMinus && chrs === opts.negationSymbol.back;
            }
          }
        },
        preValidation: function preValidation(buffer, pos, c, isSelection, opts, maskset, caretPos, strict) {
          if (!1 !== opts.__financeInput && c === opts.radixPoint) return !1;
          var pattern;
          if (pattern = opts.shortcuts && opts.shortcuts[c]) {
            if (1 < pattern.length) for (var inserts = [], i = 0; i < pattern.length; i++) inserts.push({
              pos: pos + i,
              c: pattern[i],
              strict: !1
            });
            return {
              insert: inserts
            };
          }
          var radixPos = buffer.indexOf(opts.radixPoint),
            initPos = pos;
          if (pos = hanndleRadixDance(pos, c, radixPos, maskset, opts), "-" === c || c === opts.negationSymbol.front) {
            if (!0 !== opts.allowMinus) return !1;
            var isNegative = !1,
              front = findValid("+", maskset),
              back = findValid("-", maskset);
            return -1 !== front && (isNegative = [front, back]), !1 !== isNegative ? {
              remove: isNegative,
              caret: initPos - opts.negationSymbol.front.length
            } : {
              insert: [{
                pos: findValidator("+", maskset),
                c: opts.negationSymbol.front,
                fromIsValid: !0
              }, {
                pos: findValidator("-", maskset),
                c: opts.negationSymbol.back,
                fromIsValid: void 0
              }],
              caret: initPos + opts.negationSymbol.back.length
            };
          }
          if (c === opts.groupSeparator) return {
            caret: initPos
          };
          if (strict) return !0;
          if (-1 !== radixPos && !0 === opts._radixDance && !1 === isSelection && c === opts.radixPoint && void 0 !== opts.digits && (isNaN(opts.digits) || 0 < parseInt(opts.digits)) && radixPos !== pos) return {
            caret: opts._radixDance && pos === radixPos - 1 ? radixPos + 1 : radixPos
          };
          if (!1 === opts.__financeInput) if (isSelection) {
            if (opts.digitsOptional) return {
              rewritePosition: caretPos.end
            };
            if (!opts.digitsOptional) {
              if (caretPos.begin > radixPos && caretPos.end <= radixPos) return c === opts.radixPoint ? {
                insert: {
                  pos: radixPos + 1,
                  c: "0",
                  fromIsValid: !0
                },
                rewritePosition: radixPos
              } : {
                rewritePosition: radixPos + 1
              };
              if (caretPos.begin < radixPos) return {
                rewritePosition: caretPos.begin - 1
              };
            }
          } else if (!opts.showMaskOnHover && !opts.showMaskOnFocus && !opts.digitsOptional && 0 < opts.digits && "" === this.__valueGet.call(this)) return {
            rewritePosition: radixPos
          };
          return {
            rewritePosition: pos
          };
        },
        postValidation: function postValidation(buffer, pos, c, currentResult, opts, maskset, strict) {
          if (!1 === currentResult) return currentResult;
          if (strict) return !0;
          if (null !== opts.min || null !== opts.max) {
            var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {
              unmaskAsNumber: !0
            }));
            if (null !== opts.min && unmasked < opts.min && (unmasked.toString().length > opts.min.toString().length || unmasked < 0)) return !1;
            if (null !== opts.max && unmasked > opts.max) return !!opts.SetMaxOnOverflow && {
              refreshFromBuffer: !0,
              buffer: alignDigits(opts.max.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
            };
          }
          return currentResult;
        },
        onUnMask: function onUnMask(maskedValue, unmaskedValue, opts) {
          if ("" === unmaskedValue && !0 === opts.nullable) return unmaskedValue;
          var processValue = maskedValue.replace(opts.prefix, "");
          return processValue = processValue.replace(opts.suffix, ""), processValue = processValue.replace(new RegExp((0, _escapeRegex["default"])(opts.groupSeparator), "g"), ""), "" !== opts.placeholder.charAt(0) && (processValue = processValue.replace(new RegExp(opts.placeholder.charAt(0), "g"), "0")), opts.unmaskAsNumber ? ("" !== opts.radixPoint && -1 !== processValue.indexOf(opts.radixPoint) && (processValue = processValue.replace(_escapeRegex["default"].call(this, opts.radixPoint), ".")), processValue = processValue.replace(new RegExp("^" + (0, _escapeRegex["default"])(opts.negationSymbol.front)), "-"), processValue = processValue.replace(new RegExp((0, _escapeRegex["default"])(opts.negationSymbol.back) + "$"), ""), Number(processValue)) : processValue;
        },
        isComplete: function isComplete(buffer, opts) {
          var maskedValue = (opts.numericInput ? buffer.slice().reverse() : buffer).join("");
          return maskedValue = maskedValue.replace(new RegExp("^" + (0, _escapeRegex["default"])(opts.negationSymbol.front)), "-"), maskedValue = maskedValue.replace(new RegExp((0, _escapeRegex["default"])(opts.negationSymbol.back) + "$"), ""), maskedValue = maskedValue.replace(opts.prefix, ""), maskedValue = maskedValue.replace(opts.suffix, ""), maskedValue = maskedValue.replace(new RegExp((0, _escapeRegex["default"])(opts.groupSeparator) + "([0-9]{3})", "g"), "$1"), "," === opts.radixPoint && (maskedValue = maskedValue.replace((0, _escapeRegex["default"])(opts.radixPoint), ".")), isFinite(maskedValue);
        },
        onBeforeMask: function onBeforeMask(initialValue, opts) {
          var radixPoint = opts.radixPoint || ",";
          isFinite(opts.digits) && (opts.digits = parseInt(opts.digits)), "number" != typeof initialValue && "number" !== opts.inputType || "" === radixPoint || (initialValue = initialValue.toString().replace(".", radixPoint));
          var isNagtive = "-" === initialValue.charAt(0) || initialValue.charAt(0) === opts.negationSymbol.front,
            valueParts = initialValue.split(radixPoint),
            integerPart = valueParts[0].replace(/[^\-0-9]/g, ""),
            decimalPart = 1 < valueParts.length ? valueParts[1].replace(/[^0-9]/g, "") : "",
            forceDigits = 1 < valueParts.length;
          initialValue = integerPart + ("" !== decimalPart ? radixPoint + decimalPart : decimalPart);
          var digits = 0;
          if ("" !== radixPoint && (digits = opts.digitsOptional ? opts.digits < decimalPart.length ? opts.digits : decimalPart.length : opts.digits, "" !== decimalPart || !opts.digitsOptional)) {
            var digitsFactor = Math.pow(10, digits || 1);
            initialValue = initialValue.replace((0, _escapeRegex["default"])(radixPoint), "."), isNaN(parseFloat(initialValue)) || (initialValue = (opts.roundingFN(parseFloat(initialValue) * digitsFactor) / digitsFactor).toFixed(digits)), initialValue = initialValue.toString().replace(".", radixPoint);
          }
          if (0 === opts.digits && -1 !== initialValue.indexOf(radixPoint) && (initialValue = initialValue.substring(0, initialValue.indexOf(radixPoint))), null !== opts.min || null !== opts.max) {
            var numberValue = initialValue.toString().replace(radixPoint, ".");
            null !== opts.min && numberValue < opts.min ? initialValue = opts.min.toString().replace(".", radixPoint) : null !== opts.max && numberValue > opts.max && (initialValue = opts.max.toString().replace(".", radixPoint));
          }
          return isNagtive && "-" !== initialValue.charAt(0) && (initialValue = "-" + initialValue), alignDigits(initialValue.toString().split(""), digits, opts, forceDigits).join("");
        },
        onBeforeWrite: function onBeforeWrite(e, buffer, caretPos, opts) {
          function stripBuffer(buffer, stripRadix) {
            if (!1 !== opts.__financeInput || stripRadix) {
              var position = buffer.indexOf(opts.radixPoint);
              -1 !== position && buffer.splice(position, 1);
            }
            if ("" !== opts.groupSeparator) for (; -1 !== (position = buffer.indexOf(opts.groupSeparator));) buffer.splice(position, 1);
            return buffer;
          }
          var result,
            leadingzeroes = checkForLeadingZeroes(buffer, opts);
          if (leadingzeroes) for (var caretNdx = buffer.join("").lastIndexOf(leadingzeroes[0].split("").reverse().join("")) - (leadingzeroes[0] == leadingzeroes.input ? 0 : 1), offset = leadingzeroes[0] == leadingzeroes.input ? 1 : 0, i = leadingzeroes[0].length - offset; 0 < i; i--) delete this.maskset.validPositions[caretNdx + i], delete buffer[caretNdx + i];
          if (e) switch (e.type) {
            case "blur":
            case "checkval":
              if (null !== opts.min) {
                var unmasked = opts.onUnMask(buffer.slice().reverse().join(""), void 0, $.extend({}, opts, {
                  unmaskAsNumber: !0
                }));
                if (null !== opts.min && unmasked < opts.min) return {
                  refreshFromBuffer: !0,
                  buffer: alignDigits(opts.min.toString().replace(".", opts.radixPoint).split(""), opts.digits, opts).reverse()
                };
              }
              if (buffer[buffer.length - 1] === opts.negationSymbol.front) {
                var nmbrMtchs = new RegExp("(^" + ("" != opts.negationSymbol.front ? (0, _escapeRegex["default"])(opts.negationSymbol.front) + "?" : "") + (0, _escapeRegex["default"])(opts.prefix) + ")(.*)(" + (0, _escapeRegex["default"])(opts.suffix) + ("" != opts.negationSymbol.back ? (0, _escapeRegex["default"])(opts.negationSymbol.back) + "?" : "") + "$)").exec(stripBuffer(buffer.slice(), !0).reverse().join("")),
                  number = nmbrMtchs ? nmbrMtchs[2] : "";
                0 == number && (result = {
                  refreshFromBuffer: !0,
                  buffer: [0]
                });
              } else "" !== opts.radixPoint && buffer[0] === opts.radixPoint && (result && result.buffer ? result.buffer.shift() : (buffer.shift(), result = {
                refreshFromBuffer: !0,
                buffer: stripBuffer(buffer)
              }));
              if (opts.enforceDigitsOnBlur) {
                result = result || {};
                var bffr = result && result.buffer || buffer.slice().reverse();
                result.refreshFromBuffer = !0, result.buffer = alignDigits(bffr, opts.digits, opts, !0).reverse();
              }
          }
          return result;
        },
        onKeyDown: function onKeyDown(e, buffer, caretPos, opts) {
          var $input = $(this),
            bffr;
          if (e.ctrlKey) switch (e.keyCode) {
            case _keycode["default"].UP:
              return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) + parseInt(opts.step)), $input.trigger("setvalue"), !1;
            case _keycode["default"].DOWN:
              return this.inputmask.__valueSet.call(this, parseFloat(this.inputmask.unmaskedvalue()) - parseInt(opts.step)), $input.trigger("setvalue"), !1;
          }
          if (!e.shiftKey && (e.keyCode === _keycode["default"].DELETE || e.keyCode === _keycode["default"].BACKSPACE || e.keyCode === _keycode["default"].BACKSPACE_SAFARI) && caretPos.begin !== buffer.length) {
            if (buffer[e.keyCode === _keycode["default"].DELETE ? caretPos.begin - 1 : caretPos.end] === opts.negationSymbol.front) return bffr = buffer.slice().reverse(), "" !== opts.negationSymbol.front && bffr.shift(), "" !== opts.negationSymbol.back && bffr.pop(), $input.trigger("setvalue", [bffr.join(""), caretPos.begin]), !1;
            if (!0 === opts._radixDance) {
              var radixPos = buffer.indexOf(opts.radixPoint);
              if (opts.digitsOptional) {
                if (0 === radixPos) return bffr = buffer.slice().reverse(), bffr.pop(), $input.trigger("setvalue", [bffr.join(""), caretPos.begin >= bffr.length ? bffr.length : caretPos.begin]), !1;
              } else if (-1 !== radixPos && (caretPos.begin < radixPos || caretPos.end < radixPos || e.keyCode === _keycode["default"].DELETE && caretPos.begin === radixPos)) return caretPos.begin !== caretPos.end || e.keyCode !== _keycode["default"].BACKSPACE && e.keyCode !== _keycode["default"].BACKSPACE_SAFARI || caretPos.begin++, bffr = buffer.slice().reverse(), bffr.splice(bffr.length - caretPos.begin, caretPos.begin - caretPos.end + 1), bffr = alignDigits(bffr, opts.digits, opts).join(""), $input.trigger("setvalue", [bffr, caretPos.begin >= bffr.length ? radixPos + 1 : caretPos.begin]), !1;
            }
          }
        }
      },
      currency: {
        prefix: "",
        groupSeparator: ",",
        alias: "numeric",
        digits: 2,
        digitsOptional: !1
      },
      decimal: {
        alias: "numeric"
      },
      integer: {
        alias: "numeric",
        digits: 0
      },
      percentage: {
        alias: "numeric",
        min: 0,
        max: 100,
        suffix: " %",
        digits: 0,
        allowMinus: !1
      },
      indianns: {
        alias: "numeric",
        _mask: function _mask(opts) {
          return "(" + opts.groupSeparator + "99){*|1}(" + opts.groupSeparator + "999){1|1}";
        },
        groupSeparator: ",",
        radixPoint: ".",
        placeholder: "0",
        digits: 2,
        digitsOptional: !1
      }
    });
  }, function (module, exports, __webpack_require__) {
    "use strict";

    var _window = _interopRequireDefault(__webpack_require__(6)),
      _inputmask = _interopRequireDefault(__webpack_require__(2));
    function _typeof(obj) {
      return _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function _typeof(obj) {
        return _typeof2(obj);
      } : function _typeof(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      }, _typeof(obj);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
    }
    function _inherits(subClass, superClass) {
      if ("function" != typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function");
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          writable: !0,
          configurable: !0
        }
      }), superClass && _setPrototypeOf(subClass, superClass);
    }
    function _createSuper(Derived) {
      var hasNativeReflectConstruct = _isNativeReflectConstruct();
      return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived),
          result;
        if (hasNativeReflectConstruct) {
          var NewTarget = _getPrototypeOf(this).constructor;
          result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return _possibleConstructorReturn(this, result);
      };
    }
    function _possibleConstructorReturn(self, call) {
      return !call || "object" !== _typeof(call) && "function" != typeof call ? _assertThisInitialized(self) : call;
    }
    function _assertThisInitialized(self) {
      if (void 0 === self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return self;
    }
    function _wrapNativeSuper(Class) {
      var _cache = "function" == typeof Map ? new Map() : void 0;
      return _wrapNativeSuper = function _wrapNativeSuper(Class) {
        if (null === Class || !_isNativeFunction(Class)) return Class;
        if ("function" != typeof Class) throw new TypeError("Super expression must either be null or a function");
        if ("undefined" != typeof _cache) {
          if (_cache.has(Class)) return _cache.get(Class);
          _cache.set(Class, Wrapper);
        }
        function Wrapper() {
          return _construct(Class, arguments, _getPrototypeOf(this).constructor);
        }
        return Wrapper.prototype = Object.create(Class.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), _setPrototypeOf(Wrapper, Class);
      }, _wrapNativeSuper(Class);
    }
    function _construct(Parent, args, Class) {
      return _construct = _isNativeReflectConstruct() ? Reflect.construct : function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a),
          instance = new Constructor();
        return Class && _setPrototypeOf(instance, Class.prototype), instance;
      }, _construct.apply(null, arguments);
    }
    function _isNativeReflectConstruct() {
      if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ("function" == typeof Proxy) return !0;
      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), !0;
      } catch (e) {
        return !1;
      }
    }
    function _isNativeFunction(fn) {
      return -1 !== Function.toString.call(fn).indexOf("[native code]");
    }
    function _setPrototypeOf(o, p) {
      return _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        return o.__proto__ = p, o;
      }, _setPrototypeOf(o, p);
    }
    function _getPrototypeOf(o) {
      return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      }, _getPrototypeOf(o);
    }
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default": obj
      };
    }
    var document = _window["default"].document;
    if (document && document.head && document.head.attachShadow && _window["default"].customElements && void 0 === _window["default"].customElements.get("input-mask")) {
      var InputmaskElement = function (_HTMLElement) {
        _inherits(InputmaskElement, _HTMLElement);
        var _super = _createSuper(InputmaskElement);
        function InputmaskElement() {
          var _this;
          _classCallCheck(this, InputmaskElement), _this = _super.call(this);
          var attributeNames = _this.getAttributeNames(),
            shadow = _this.attachShadow({
              mode: "closed"
            }),
            input = document.createElement("input");
          for (var attr in input.type = "text", shadow.appendChild(input), attributeNames) Object.prototype.hasOwnProperty.call(attributeNames, attr) && input.setAttribute(attributeNames[attr], _this.getAttribute(attributeNames[attr]));
          var im = new _inputmask["default"]();
          return im.dataAttribute = "", im.mask(input), input.inputmask.shadowRoot = shadow, _this;
        }
        return InputmaskElement;
      }(_wrapNativeSuper(HTMLElement));
      _window["default"].customElements.define("input-mask", InputmaskElement);
    }
  }], installedModules = {}, __webpack_require__.m = modules, __webpack_require__.c = installedModules, __webpack_require__.d = function (exports, name, getter) {
    __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
      enumerable: !0,
      get: getter
    });
  }, __webpack_require__.r = function (exports) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(exports, "__esModule", {
      value: !0
    });
  }, __webpack_require__.t = function (value, mode) {
    if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
    if (4 & mode && "object" == _typeof2(value) && value && value.__esModule) return value;
    var ns = Object.create(null);
    if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
      enumerable: !0,
      value: value
    }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function (key) {
      return value[key];
    }.bind(null, key));
    return ns;
  }, __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ? function getDefault() {
      return module["default"];
    } : function getModuleExports() {
      return module;
    };
    return __webpack_require__.d(getter, "a", getter), getter;
  }, __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 14);
  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) return installedModules[moduleId].exports;
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: !1,
      exports: {}
    };
    return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), module.l = !0, module.exports;
  }
  var modules, installedModules;
});
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var B = Object.defineProperty;
var V = Object.getOwnPropertySymbols;
var W = Object.prototype.hasOwnProperty,
  Y = Object.prototype.propertyIsEnumerable;
var L = function L(f, u, p) {
    return u in f ? B(f, u, {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: p
    }) : f[u] = p;
  },
  x = function x(f, u) {
    for (var p in u || (u = {})) W.call(u, p) && L(f, p, u[p]);
    if (V) {
      var _iterator = _createForOfIteratorHelper(V(u)),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var p = _step.value;
          Y.call(u, p) && L(f, p, u[p]);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    return f;
  };
var d = function d(f, u, p) {
  return L(f, _typeof(u) != "symbol" ? u + "" : u, p), p;
};
(function (f, u) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) == "object" && typeof module != "undefined" ? module.exports = u() : typeof define == "function" && define.amd ? define(u) : (f = typeof globalThis != "undefined" ? globalThis : f || self, f.JustValidate = u());
})(void 0, function () {
  "use strict";

  var f = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    u = /^[0-9]+$/,
    p = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    M = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    P = function P(o) {
      var e = o;
      return typeof o == "string" && (e = o.trim()), !e;
    },
    N = function N(o) {
      return f.test(o);
    },
    G = function G(o, e) {
      return o.length > e;
    },
    A = function A(o, e) {
      return o.length < e;
    },
    j = function j(o) {
      return u.test(o);
    },
    q = function q(o) {
      return p.test(o);
    },
    O = function O(o) {
      return M.test(o);
    },
    z = function z(o, e) {
      return o > e;
    },
    D = function D(o, e) {
      return o < e;
    };
  var h;
  (function (o) {
    o.Required = "required", o.Email = "email", o.MinLength = "minLength", o.MaxLength = "maxLength", o.Password = "password", o.Number = "number", o.MaxNumber = "maxNumber", o.MinNumber = "minNumber", o.StrongPassword = "strongPassword", o.CustomRegexp = "customRegexp";
  })(h || (h = {}));
  var g;
  (function (o) {
    o.Required = "required";
  })(g || (g = {}));
  var C;
  (function (o) {
    o.Label = "label", o.LabelArrow = "labelArrow";
  })(C || (C = {}));
  var H = function H(o, e) {
      switch (o) {
        case h.Required:
          return "The field is required";
        case h.Email:
          return "Email has invalid format";
        case h.MaxLength:
          return "The field must contain a maximum of :value characters".replace(":value", String(e));
        case h.MinLength:
          return "The field must contain a minimum of :value characters".replace(":value", String(e));
        case h.Password:
          return "Password must contain minimum eight characters, at least one letter and one number";
        case h.Number:
          return "Value should be a number";
        case h.StrongPassword:
          return "Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character";
        case h.MaxNumber:
          return "Number should be less or equal than :value".replace(":value", String(e));
        case h.MinNumber:
          return "Number should be more or equal than :value".replace(":value", String(e));
        default:
          return "Value is incorrect";
      }
    },
    _ = function _(o) {
      switch (o) {
        case g.Required:
          return "The field is required";
        default:
          return "Group is incorrect";
      }
    },
    v = function v(o) {
      return !!o && typeof o.then == "function";
    },
    X = ".just-validate-error-label[data-tooltip=true]{position:fixed;padding:4px 8px;background:#423f3f;color:#fff;white-space:nowrap;z-index:10;border-radius:4px;transform:translateY(-5px)}.just-validate-error-label[data-tooltip=true]:before{content:'';width:0;height:0;border-left:solid 5px transparent;border-right:solid 5px transparent;border-bottom:solid 5px #423f3f;position:absolute;z-index:3;display:block;bottom:-5px;transform:rotate(180deg);left:calc(50% - 5px)}.just-validate-error-label[data-tooltip=true][data-direction=left]{transform:translateX(-5px)}.just-validate-error-label[data-tooltip=true][data-direction=left]:before{right:-7px;bottom:auto;left:auto;top:calc(50% - 2px);transform:rotate(90deg)}.just-validate-error-label[data-tooltip=true][data-direction=right]{transform:translateX(5px)}.just-validate-error-label[data-tooltip=true][data-direction=right]:before{right:auto;bottom:auto;left:-7px;top:calc(50% - 2px);transform:rotate(-90deg)}.just-validate-error-label[data-tooltip=true][data-direction=bottom]{transform:translateY(5px)}.just-validate-error-label[data-tooltip=true][data-direction=bottom]:before{right:auto;bottom:auto;left:calc(50% - 5px);top:-5px;transform:rotate(0)}",
    E = 5,
    S = {
      errorFieldStyle: {
        color: "#b81111",
        border: "1px solid #B81111"
      },
      errorFieldCssClass: "just-validate-error-field",
      errorLabelStyle: {
        color: "#b81111"
      },
      errorLabelCssClass: "just-validate-error-label",
      focusInvalidField: !0,
      lockForm: !0,
      testingMode: !1
    };
  var Z = /*#__PURE__*/function () {
    function Z(e, r, t) {
      var _this = this;
      _classCallCheck(this, Z);
      d(this, "form", null);
      d(this, "fields", {});
      d(this, "groupFields", {});
      d(this, "errors", {});
      d(this, "isValid", !1);
      d(this, "isSubmitted", !1);
      d(this, "globalConfig", S);
      d(this, "errorLabels", []);
      d(this, "eventListeners", []);
      d(this, "dictLocale", []);
      d(this, "currentLocale");
      d(this, "customStyleTags", {});
      d(this, "onSuccessCallback");
      d(this, "onFailCallback");
      d(this, "tooltips", []);
      d(this, "lastScrollPosition");
      d(this, "isScrollTick");
      d(this, "refreshAllTooltips", function () {
        _this.tooltips.forEach(function (e) {
          e.refresh();
        });
      });
      d(this, "handleDocumentScroll", function () {
        _this.lastScrollPosition = window.scrollY, _this.isScrollTick || (window.requestAnimationFrame(function () {
          _this.refreshAllTooltips(), _this.isScrollTick = !1;
        }), _this.isScrollTick = !0);
      });
      d(this, "formSubmitHandler", function (e) {
        e.preventDefault(), _this.isSubmitted = !0, _this.globalConfig.lockForm && _this.lockForm(), _this.validate().then(function () {
          var r, t;
          _this.isValid ? (r = _this.onSuccessCallback) == null || r.call(_this, e) : (t = _this.onFailCallback) == null || t.call(_this, _this.fields), _this.globalConfig.lockForm && _this.unlockForm();
        });
      });
      d(this, "handleFieldChange", function (e) {
        var r, t;
        for (var i in _this.fields) {
          var s = _this.fields[i];
          if (s.elem === e) {
            r = s, t = i;
            break;
          }
        }
        !r || !t || _this.validateField(t, r, !0);
      });
      d(this, "handleGroupChange", function (e) {
        var r, t;
        for (var i in _this.groupFields) {
          var s = _this.groupFields[i];
          if (s.elems.find(function (a) {
            return a === e;
          })) {
            r = s, t = i;
            break;
          }
        }
        !r || !t || _this.validateGroup(t, r);
      });
      d(this, "handlerChange", function (e) {
        !e.target || (_this.handleFieldChange(e.target), _this.handleGroupChange(e.target), _this.renderErrors());
      });
      this.initialize(e, r, t);
    }
    _createClass(Z, [{
      key: "initialize",
      value: function initialize(e, r, t) {
        if (this.form = null, this.errors = {}, this.isValid = !1, this.isSubmitted = !1, this.globalConfig = S, this.errorLabels = [], this.eventListeners = [], this.customStyleTags = {}, this.tooltips = [], typeof e == "string") {
          var i = document.querySelector(e);
          if (!i) throw Error("Form with ".concat(e, " selector not found! Please check the form selector"));
          this.setForm(i);
        } else if (e instanceof HTMLFormElement) this.setForm(e);else throw Error("Form selector is not valid. Please specify a string selector or a DOM element.");
        if (this.globalConfig = x(x({}, S), r), t && (this.dictLocale = t), this.isTooltip()) {
          var _i = document.createElement("style");
          _i.textContent = X, this.customStyleTags[C.Label] = document.head.appendChild(_i), this.addListener("scroll", document, this.handleDocumentScroll);
        }
      }
    }, {
      key: "getLocalisedString",
      value: function getLocalisedString(e) {
        var t;
        return !this.currentLocale || !this.dictLocale.length ? e : ((t = this.dictLocale.find(function (i) {
          return i.key === e;
        })) == null ? void 0 : t.dict[this.currentLocale]) || e;
      }
    }, {
      key: "getFieldErrorMessage",
      value: function getFieldErrorMessage(e) {
        return this.getLocalisedString(e.errorMessage) || H(e.rule, e.value);
      }
    }, {
      key: "getGroupErrorMessage",
      value: function getGroupErrorMessage(e) {
        return this.getLocalisedString(e.errorMessage) || _(e.rule);
      }
    }, {
      key: "setFieldInvalid",
      value: function setFieldInvalid(e, r) {
        this.fields[e].isValid = !1, this.fields[e].errorMessage = this.getFieldErrorMessage(r);
      }
    }, {
      key: "setGroupInvalid",
      value: function setGroupInvalid(e, r) {
        this.groupFields[e].isValid = !1, this.groupFields[e].errorMessage = this.getGroupErrorMessage(r);
      }
    }, {
      key: "setGroupValid",
      value: function setGroupValid(e) {
        this.groupFields[e].isValid = !0;
      }
    }, {
      key: "getElemValue",
      value: function getElemValue(e) {
        switch (e.type) {
          case "checkbox":
            return e.checked;
          default:
            return e.value;
        }
      }
    }, {
      key: "validateGroupRule",
      value: function validateGroupRule(e, r, t, i) {
        switch (i.rule) {
          case g.Required:
            (r === "radio" || r === "checkbox") && (t.every(function (s) {
              return !s.checked;
            }) ? this.setGroupInvalid(e, i) : this.setGroupValid(e));
        }
      }
    }, {
      key: "validateFieldRule",
      value: function validateFieldRule(e, r, t) {
        var _this2 = this;
        var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : !1;
        var s = t.value,
          a = this.getElemValue(r);
        switch (t.rule) {
          case h.Required:
            {
              P(a) && this.setFieldInvalid(e, t);
              break;
            }
          case h.Email:
            {
              if (typeof a != "string") {
                this.setFieldInvalid(e, t);
                break;
              }
              N(a) || this.setFieldInvalid(e, t);
              break;
            }
          case h.MaxLength:
            {
              if (!s) {
                console.error("Value for ".concat(t.rule, " rule for [").concat(e, "] field is not defined. The field will be always invalid.")), this.setFieldInvalid(e, t);
                return;
              }
              if (typeof s != "number") {
                console.error("Value for ".concat(t.rule, " rule for [").concat(e, "] should be a number. The field will be always invalid.")), this.setFieldInvalid(e, t);
                return;
              }
              if (typeof a != "string") {
                this.setFieldInvalid(e, t);
                break;
              }
              G(a, s) && this.setFieldInvalid(e, t);
              break;
            }
          case h.MinLength:
            {
              if (!s) {
                console.error("Value for ".concat(t.rule, " rule for [").concat(e, "] field is not defined. The field will be always invalid.")), this.setFieldInvalid(e, t);
                return;
              }
              if (typeof s != "number") {
                console.error("Value for ".concat(t.rule, " rule for [").concat(e, "] should be a number. The field will be always invalid.")), this.setFieldInvalid(e, t);
                return;
              }
              if (typeof a != "string") {
                this.setFieldInvalid(e, t);
                break;
              }
              A(a, s) && this.setFieldInvalid(e, t);
              break;
            }
          case h.Password:
            {
              if (typeof a != "string") {
                this.setFieldInvalid(e, t);
                break;
              }
              q(a) || this.setFieldInvalid(e, t);
              break;
            }
          case h.StrongPassword:
            {
              if (typeof a != "string") {
                this.setFieldInvalid(e, t);
                break;
              }
              O(a) || this.setFieldInvalid(e, t);
              break;
            }
          case h.Number:
            {
              if (typeof a != "string") {
                this.setFieldInvalid(e, t);
                break;
              }
              j(a) || this.setFieldInvalid(e, t);
              break;
            }
          case h.MaxNumber:
            {
              if (!s) {
                console.error("Value for ".concat(t.rule, " rule for [").concat(e, "] field is not defined. The field will be always invalid.")), this.setFieldInvalid(e, t);
                return;
              }
              if (typeof s != "number") {
                console.error("Value for ".concat(t.rule, " rule for [").concat(e, "] field should be a number. The field will be always invalid.")), this.setFieldInvalid(e, t);
                return;
              }
              if (typeof a != "string") {
                this.setFieldInvalid(e, t);
                break;
              }
              var l = +a;
              (Number.isNaN(l) || z(l, s)) && this.setFieldInvalid(e, t);
              break;
            }
          case h.MinNumber:
            {
              if (!s) {
                console.error("Value for ".concat(t.rule, " rule for [").concat(e, "] field is not defined. The field will be always invalid.")), this.setFieldInvalid(e, t);
                return;
              }
              if (typeof s != "number") {
                console.error("Value for ".concat(t.rule, " rule for [").concat(e, "] field should be a number. The field will be always invalid.")), this.setFieldInvalid(e, t);
                return;
              }
              if (typeof a != "string") {
                this.setFieldInvalid(e, t);
                break;
              }
              var _l = +a;
              (Number.isNaN(_l) || D(_l, s)) && this.setFieldInvalid(e, t);
              break;
            }
          case h.CustomRegexp:
            {
              if (!s) {
                console.error("Value for ".concat(t.rule, " rule for [").concat(e, "] field is not defined. This field will be always invalid.")), this.setFieldInvalid(e, t);
                return;
              }
              var _l2;
              try {
                _l2 = new RegExp(s);
              } catch (_unused) {
                console.error("Value for ".concat(t.rule, " rule for [").concat(e, "] should be a valid regexp. This field will be always invalid.")), this.setFieldInvalid(e, t);
                break;
              }
              _l2.test(String(a)) || this.setFieldInvalid(e, t);
              break;
            }
          default:
            {
              if (!t.validator) {
                console.error("Validator for custom rule for [".concat(e, "] field is not defined. This field will be always invalid.")), this.setFieldInvalid(e, t);
                return;
              }
              if (typeof t.validator != "function") {
                console.error("Validator for custom rule for [".concat(e, "] field should be a function. This field will be always invalid.")), this.setFieldInvalid(e, t);
                return;
              }
              var _l3 = t.validator(a, this.fields);
              if (typeof _l3 != "boolean" && typeof _l3 != "function" && console.error("Validator return value for [".concat(e, "] field should be boolean or function. It will be cast to boolean.")), typeof _l3 == "function" && !i) {
                var c = _l3();
                if (!v(c)) {
                  console.error("Validator function for custom rule for [".concat(e, "] field should return a Promise. This field will be always invalid.")), this.setFieldInvalid(e, t);
                  return;
                }
                return c.then(function (m) {
                  m || _this2.setFieldInvalid(e, t);
                })["catch"](function () {
                  _this2.setFieldInvalid(e, t);
                });
              }
              _l3 || this.setFieldInvalid(e, t);
            }
        }
      }
    }, {
      key: "validateField",
      value: function validateField(e, r) {
        var _this3 = this;
        var t = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : !1;
        r.isValid = !0;
        var i = [];
        return _toConsumableArray(r.rules).reverse().forEach(function (s) {
          var a = _this3.validateFieldRule(e, r.elem, s, t);
          v(a) && i.push(a);
        }), Promise.allSettled(i);
      }
    }, {
      key: "validateGroup",
      value: function validateGroup(e, r) {
        var _this4 = this;
        var t = [];
        return _toConsumableArray(r.rules).reverse().forEach(function (i) {
          var s = _this4.validateGroupRule(e, r.type, r.elems, i);
          v(s) && t.push(s);
        }), Promise.allSettled(t);
      }
    }, {
      key: "focusInvalidField",
      value: function focusInvalidField() {
        var _this5 = this;
        var _loop = function _loop() {
          var r = _this5.fields[e];
          if (!r.isValid) {
            setTimeout(function () {
              return r.elem.focus();
            }, 0);
            return "break";
          }
        };
        for (var e in this.fields) {
          var _ret = _loop();
          if (_ret === "break") break;
        }
      }
    }, {
      key: "afterSubmitValidation",
      value: function afterSubmitValidation() {
        this.renderErrors(), this.globalConfig.focusInvalidField && this.focusInvalidField();
      }
    }, {
      key: "validate",
      value: function validate() {
        var _this6 = this;
        return new Promise(function (e) {
          var r = [];
          Object.keys(_this6.fields).forEach(function (t) {
            var i = _this6.fields[t],
              s = _this6.validateField(t, i);
            v(s) && r.push(s);
          }), Object.keys(_this6.groupFields).forEach(function (t) {
            var i = _this6.groupFields[t],
              s = _this6.validateGroup(t, i);
            v(s) && r.push(s);
          }), r.length ? Promise.allSettled(r).then(function () {
            _this6.afterSubmitValidation(), e(!0);
          }) : (_this6.afterSubmitValidation(), e(!1));
        });
      }
    }, {
      key: "setForm",
      value: function setForm(e) {
        this.form = e, this.form.setAttribute("novalidate", "novalidate"), this.removeListener("submit", this.form, this.formSubmitHandler), this.addListener("submit", this.form, this.formSubmitHandler);
      }
    }, {
      key: "addListener",
      value: function addListener(e, r, t) {
        r.addEventListener(e, t), this.eventListeners.push({
          type: e,
          elem: r,
          func: t
        });
      }
    }, {
      key: "removeListener",
      value: function removeListener(e, r, t) {
        r.removeEventListener(e, t);
      }
    }, {
      key: "addField",
      value: function addField(e, r, t) {
        if (typeof e != "string") throw Error("Field selector is not valid. Please specify a string selector.");
        var i = document.querySelector(e);
        if (!i) throw Error("Field with ".concat(e, " selector not found! Please check the field selector."));
        if (!Array.isArray(r) || !r.length) throw Error("Rules argument for the field [".concat(e, "] should be an array and should contain at least 1 element."));
        return r.forEach(function (s) {
          if (!("rule" in s || "validator" in s)) throw Error("Rules argument for the field [".concat(e, "] must contain at least one rule or validator property."));
          if (!s.validator && (!s.rule || !Object.values(h).includes(s.rule))) throw Error("Rule should be one of these types: ".concat(Object.values(h).join(", "), ". Provided value: ").concat(s.rule));
        }), this.fields[e] = {
          elem: i,
          rules: r,
          isValid: void 0,
          config: t
        }, this.setListeners(i), this.isSubmitted && this.validate(), this;
      }
    }, {
      key: "removeField",
      value: function removeField(e) {
        if (typeof e != "string") throw Error("Field selector is not valid. Please specify a string selector.");
        return this.fields[e] ? (this.destroy(), delete this.fields[e], this.refresh(), this) : (console.error("Field not found. Check the field selector."), this);
      }
    }, {
      key: "addRequiredGroup",
      value: function addRequiredGroup(e, r, t) {
        var _this7 = this;
        if (typeof e != "string") throw Error("Group selector is not valid. Please specify a string selector.");
        var i = document.querySelector(e);
        if (!i) throw Error("Group with ".concat(e, " selector not found! Please check the group selector."));
        var s = i.querySelectorAll("input"),
          a = Array.from(s).every(function (c) {
            return c.type === "radio";
          }),
          l = Array.from(s).every(function (c) {
            return c.type === "checkbox";
          });
        if (!a && !l) throw Error("Group should contain either or checkboxes or radio buttons");
        return this.groupFields[e] = {
          rules: [{
            rule: g.Required,
            errorMessage: r
          }],
          groupElem: i,
          elems: Array.from(s),
          type: a ? "radio" : "checkbox",
          isDirty: !1,
          isValid: void 0,
          config: t
        }, s.forEach(function (c) {
          _this7.setListeners(c);
        }), this;
      }
    }, {
      key: "getListenerType",
      value: function getListenerType(e) {
        switch (e) {
          case "checkbox":
          case "select-one":
          case "radio":
            return "change";
          default:
            return "keyup";
        }
      }
    }, {
      key: "setListeners",
      value: function setListeners(e) {
        var r = this.getListenerType(e.type);
        this.removeListener(r, e, this.handlerChange), this.addListener(r, e, this.handlerChange);
      }
    }, {
      key: "clearErrors",
      value: function clearErrors() {
        var _this8 = this;
        var e, r, t;
        this.errorLabels.forEach(function (i) {
          return i.remove();
        });
        var _loop2 = function _loop2() {
          var s = _this8.fields[i],
            a = ((e = s.config) == null ? void 0 : e.errorFieldStyle) || _this8.globalConfig.errorFieldStyle;
          Object.keys(a).forEach(function (l) {
            s.elem.style[l] = "";
          }), s.elem.classList.remove(((r = s.config) == null ? void 0 : r.errorFieldCssClass) || _this8.globalConfig.errorFieldCssClass);
        };
        for (var i in this.fields) {
          _loop2();
        }
        var _loop3 = function _loop3() {
          var s = _this8.groupFields[_i2],
            a = ((t = s.config) == null ? void 0 : t.errorFieldStyle) || _this8.globalConfig.errorFieldStyle;
          Object.keys(a).forEach(function (l) {
            s.elems.forEach(function (c) {
              var m;
              c.style[l] = "", c.classList.remove(((m = s.config) == null ? void 0 : m.errorFieldCssClass) || _this8.globalConfig.errorFieldCssClass);
            });
          });
        };
        for (var _i2 in this.groupFields) {
          _loop3();
        }
        this.tooltips = [];
      }
    }, {
      key: "isTooltip",
      value: function isTooltip() {
        return !!this.globalConfig.tooltip;
      }
    }, {
      key: "lockForm",
      value: function lockForm() {
        var e = this.form.querySelectorAll("input, textarea, button, select");
        for (var r = 0, t = e.length; r < t; ++r) e[r].setAttribute("disabled", "disabled"), e[r].style.pointerEvents = "none", e[r].style.webkitFilter = "grayscale(100%)", e[r].style.filter = "grayscale(100%)";
      }
    }, {
      key: "unlockForm",
      value: function unlockForm() {
        var e = this.form.querySelectorAll("input, textarea, button, select");
        for (var r = 0, t = e.length; r < t; ++r) e[r].removeAttribute("disabled"), e[r].style.pointerEvents = "", e[r].style.webkitFilter = "", e[r].style.filter = "";
      }
    }, {
      key: "renderTooltip",
      value: function renderTooltip(e, r, t) {
        var _this9 = this;
        var y;
        var _e$getBoundingClientR = e.getBoundingClientRect(),
          i = _e$getBoundingClientR.top,
          s = _e$getBoundingClientR.left,
          a = _e$getBoundingClientR.width,
          l = _e$getBoundingClientR.height,
          c = r.getBoundingClientRect(),
          m = t || ((y = this.globalConfig.tooltip) == null ? void 0 : y.position);
        switch (m) {
          case "left":
            {
              r.style.top = "".concat(i + l / 2 - c.height / 2, "px"), r.style.left = "".concat(s - c.width - E, "px");
              break;
            }
          case "top":
            {
              r.style.top = "".concat(i - c.height - E, "px"), r.style.left = "".concat(s + a / 2 - c.width / 2, "px");
              break;
            }
          case "right":
            {
              r.style.top = "".concat(i + l / 2 - c.height / 2, "px"), r.style.left = "".concat(s + a + E, "px");
              break;
            }
          case "bottom":
            {
              r.style.top = "".concat(i + l + E, "px"), r.style.left = "".concat(s + a / 2 - c.width / 2, "px");
              break;
            }
        }
        return r.dataset.direction = m, {
          refresh: function refresh() {
            _this9.renderTooltip(e, r, t);
          }
        };
      }
    }, {
      key: "createErrorLabelElem",
      value: function createErrorLabelElem(e, r, t) {
        var i = document.createElement("div");
        i.innerHTML = r;
        var s = this.isTooltip() ? t == null ? void 0 : t.errorLabelStyle : (t == null ? void 0 : t.errorLabelStyle) || this.globalConfig.errorLabelStyle;
        return Object.assign(i.style, s), i.classList.add((t == null ? void 0 : t.errorLabelCssClass) || this.globalConfig.errorLabelCssClass, "just-validate-error-label"), this.isTooltip() && (i.dataset.tooltip = "true"), this.globalConfig.testingMode && (i.dataset.testId = "error-label-".concat(e)), this.errorLabels.push(i), i;
      }
    }, {
      key: "renderErrors",
      value: function renderErrors() {
        var _this10 = this;
        var e, r, t, i, s, a, l, c, m, k, y, T;
        if (!!this.isSubmitted) {
          this.clearErrors(), this.isValid = !0;
          var _loop4 = function _loop4() {
            var n = _this10.groupFields[F];
            if (n.isValid) return "continue";
            _this10.isValid = !1, n.elems.forEach(function (w) {
              var $, I;
              Object.assign(w.style, (($ = n.config) == null ? void 0 : $.errorFieldStyle) || _this10.globalConfig.errorFieldStyle), w.classList.add(((I = n.config) == null ? void 0 : I.errorFieldCssClass) || _this10.globalConfig.errorFieldCssClass);
            });
            var b = _this10.createErrorLabelElem(F, n.errorMessage, n.config);
            n.groupElem.appendChild(b), _this10.isTooltip() && _this10.tooltips.push(_this10.renderTooltip(n.groupElem, b, (r = (e = n.config) == null ? void 0 : e.tooltip) == null ? void 0 : r.position));
          };
          for (var F in this.groupFields) {
            var _ret2 = _loop4();
            if (_ret2 === "continue") continue;
          }
          for (var _F in this.fields) {
            var n = this.fields[_F];
            if (n.isValid) continue;
            this.isValid = !1, n.elem.classList.add(((t = n.config) == null ? void 0 : t.errorFieldCssClass) || this.globalConfig.errorFieldCssClass);
            var b = this.createErrorLabelElem(_F, n.errorMessage, n.config);
            if (n.elem.type === "checkbox" || n.elem.type === "radio") {
              var w = document.querySelector("label[for=\"".concat(n.elem.getAttribute("id"), "\"]"));
              ((s = (i = n.elem.parentElement) == null ? void 0 : i.tagName) == null ? void 0 : s.toLowerCase()) === "label" ? (l = (a = n.elem.parentElement) == null ? void 0 : a.parentElement) == null || l.appendChild(b) : w ? (c = w.parentElement) == null || c.appendChild(b) : (m = n.elem.parentElement) == null || m.appendChild(b);
            } else (k = n.elem.parentElement) == null || k.appendChild(b);
            this.isTooltip() && this.tooltips.push(this.renderTooltip(n.elem, b, (T = (y = n.config) == null ? void 0 : y.tooltip) == null ? void 0 : T.position));
          }
        }
      }
    }, {
      key: "destroy",
      value: function destroy() {
        var _this11 = this;
        this.eventListeners.forEach(function (e) {
          _this11.removeListener(e.type, e.elem, e.func);
        }), Object.keys(this.customStyleTags).forEach(function (e) {
          _this11.customStyleTags[e].remove();
        }), this.clearErrors(), this.globalConfig.lockForm && this.unlockForm();
      }
    }, {
      key: "refresh",
      value: function refresh() {
        var _this12 = this;
        this.destroy(), this.form ? (this.initialize(this.form, this.globalConfig), Object.keys(this.fields).forEach(function (e) {
          _this12.addField(e, _toConsumableArray(_this12.fields[e].rules), _this12.fields[e].config);
        })) : console.error("Cannot initialize the library! Form is not defined");
      }
    }, {
      key: "setCurrentLocale",
      value: function setCurrentLocale(e) {
        if (typeof e != "string" && e !== void 0) {
          console.error("Current locale should be a string");
          return;
        }
        this.currentLocale = e, this.isSubmitted && this.validate();
      }
    }, {
      key: "onSuccess",
      value: function onSuccess(e) {
        return this.onSuccessCallback = e, this;
      }
    }, {
      key: "onFail",
      value: function onFail(e) {
        return this.onFailCallback = e, this;
      }
    }]);
    return Z;
  }();
  return Z;
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).noUiSlider = {});
}(void 0, function (ot) {
  "use strict";

  function n(t) {
    return "object" == _typeof(t) && "function" == typeof t.to;
  }
  function st(t) {
    t.parentElement.removeChild(t);
  }
  function at(t) {
    return null != t;
  }
  function lt(t) {
    t.preventDefault();
  }
  function i(t) {
    return "number" == typeof t && !isNaN(t) && isFinite(t);
  }
  function ut(t, e, r) {
    0 < r && (ft(t, e), setTimeout(function () {
      dt(t, e);
    }, r));
  }
  function ct(t) {
    return Math.max(Math.min(t, 100), 0);
  }
  function pt(t) {
    return Array.isArray(t) ? t : [t];
  }
  function e(t) {
    t = (t = String(t)).split(".");
    return 1 < t.length ? t[1].length : 0;
  }
  function ft(t, e) {
    t.classList && !/\s/.test(e) ? t.classList.add(e) : t.className += " " + e;
  }
  function dt(t, e) {
    t.classList && !/\s/.test(e) ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ");
  }
  function ht(t) {
    var e = void 0 !== window.pageXOffset,
      r = "CSS1Compat" === (t.compatMode || "");
    return {
      x: e ? window.pageXOffset : (r ? t.documentElement : t.body).scrollLeft,
      y: e ? window.pageYOffset : (r ? t.documentElement : t.body).scrollTop
    };
  }
  function s(t, e) {
    return 100 / (e - t);
  }
  function a(t, e, r) {
    return 100 * e / (t[r + 1] - t[r]);
  }
  function l(t, e) {
    for (var r = 1; t >= e[r];) r += 1;
    return r;
  }
  function r(t, e, r) {
    if (r >= t.slice(-1)[0]) return 100;
    var n = l(r, t),
      i = t[n - 1],
      o = t[n],
      t = e[n - 1],
      n = e[n];
    return t + (r = r, a(o = [i, o], o[0] < 0 ? r + Math.abs(o[0]) : r - o[0], 0) / s(t, n));
  }
  function o(t, e, r, n) {
    if (100 === n) return n;
    var i = l(n, t),
      o = t[i - 1],
      s = t[i];
    return r ? (s - o) / 2 < n - o ? s : o : e[i - 1] ? t[i - 1] + (t = n - t[i - 1], i = e[i - 1], Math.round(t / i) * i) : n;
  }
  ot.PipsMode = void 0, (H = ot.PipsMode || (ot.PipsMode = {})).Range = "range", H.Steps = "steps", H.Positions = "positions", H.Count = "count", H.Values = "values", ot.PipsType = void 0, (H = ot.PipsType || (ot.PipsType = {}))[H.None = -1] = "None", H[H.NoValue = 0] = "NoValue", H[H.LargeValue = 1] = "LargeValue", H[H.SmallValue = 2] = "SmallValue";
  var u = (t.prototype.getDistance = function (t) {
    for (var e = [], r = 0; r < this.xNumSteps.length - 1; r++) e[r] = a(this.xVal, t, r);
    return e;
  }, t.prototype.getAbsoluteDistance = function (t, e, r) {
    var n = 0;
    if (t < this.xPct[this.xPct.length - 1]) for (; t > this.xPct[n + 1];) n++;else t === this.xPct[this.xPct.length - 1] && (n = this.xPct.length - 2);
    r || t !== this.xPct[n + 1] || n++;
    for (var i, o = 1, s = (e = null === e ? [] : e)[n], a = 0, l = 0, u = 0, c = r ? (t - this.xPct[n]) / (this.xPct[n + 1] - this.xPct[n]) : (this.xPct[n + 1] - t) / (this.xPct[n + 1] - this.xPct[n]); 0 < s;) i = this.xPct[n + 1 + u] - this.xPct[n + u], 100 < e[n + u] * o + 100 - 100 * c ? (a = i * c, o = (s - 100 * c) / e[n + u], c = 1) : (a = e[n + u] * i / 100 * o, o = 0), r ? (l -= a, 1 <= this.xPct.length + u && u--) : (l += a, 1 <= this.xPct.length - u && u++), s = e[n + u] * o;
    return t + l;
  }, t.prototype.toStepping = function (t) {
    return t = r(this.xVal, this.xPct, t);
  }, t.prototype.fromStepping = function (t) {
    return function (t, e, r) {
      if (100 <= r) return t.slice(-1)[0];
      var n = l(r, e),
        i = t[n - 1],
        o = t[n],
        t = e[n - 1],
        n = e[n];
      return (r - t) * s(t, n) * ((o = [i, o])[1] - o[0]) / 100 + o[0];
    }(this.xVal, this.xPct, t);
  }, t.prototype.getStep = function (t) {
    return t = o(this.xPct, this.xSteps, this.snap, t);
  }, t.prototype.getDefaultStep = function (t, e, r) {
    var n = l(t, this.xPct);
    return (100 === t || e && t === this.xPct[n - 1]) && (n = Math.max(n - 1, 1)), (this.xVal[n] - this.xVal[n - 1]) / r;
  }, t.prototype.getNearbySteps = function (t) {
    t = l(t, this.xPct);
    return {
      stepBefore: {
        startValue: this.xVal[t - 2],
        step: this.xNumSteps[t - 2],
        highestStep: this.xHighestCompleteStep[t - 2]
      },
      thisStep: {
        startValue: this.xVal[t - 1],
        step: this.xNumSteps[t - 1],
        highestStep: this.xHighestCompleteStep[t - 1]
      },
      stepAfter: {
        startValue: this.xVal[t],
        step: this.xNumSteps[t],
        highestStep: this.xHighestCompleteStep[t]
      }
    };
  }, t.prototype.countStepDecimals = function () {
    var t = this.xNumSteps.map(e);
    return Math.max.apply(null, t);
  }, t.prototype.hasNoSize = function () {
    return this.xVal[0] === this.xVal[this.xVal.length - 1];
  }, t.prototype.convert = function (t) {
    return this.getStep(this.toStepping(t));
  }, t.prototype.handleEntryPoint = function (t, e) {
    t = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t);
    if (!i(t) || !i(e[0])) throw new Error("noUiSlider: 'range' value isn't numeric.");
    this.xPct.push(t), this.xVal.push(e[0]);
    e = Number(e[1]);
    t ? this.xSteps.push(!isNaN(e) && e) : isNaN(e) || (this.xSteps[0] = e), this.xHighestCompleteStep.push(0);
  }, t.prototype.handleStepPoint = function (t, e) {
    e && (this.xVal[t] !== this.xVal[t + 1] ? (this.xSteps[t] = a([this.xVal[t], this.xVal[t + 1]], e, 0) / s(this.xPct[t], this.xPct[t + 1]), e = (this.xVal[t + 1] - this.xVal[t]) / this.xNumSteps[t], e = Math.ceil(Number(e.toFixed(3)) - 1), e = this.xVal[t] + this.xNumSteps[t] * e, this.xHighestCompleteStep[t] = e) : this.xSteps[t] = this.xHighestCompleteStep[t] = this.xVal[t]);
  }, t);
  function t(e, t, r) {
    var n;
    this.xPct = [], this.xVal = [], this.xSteps = [], this.xNumSteps = [], this.xHighestCompleteStep = [], this.xSteps = [r || !1], this.xNumSteps = [!1], this.snap = t;
    var i = [];
    for (Object.keys(e).forEach(function (t) {
      i.push([pt(e[t]), t]);
    }), i.sort(function (t, e) {
      return t[0][0] - e[0][0];
    }), n = 0; n < i.length; n++) this.handleEntryPoint(i[n][1], i[n][0]);
    for (this.xNumSteps = this.xSteps.slice(0), n = 0; n < this.xNumSteps.length; n++) this.handleStepPoint(n, this.xNumSteps[n]);
  }
  var c = {
      to: function to(t) {
        return void 0 === t ? "" : t.toFixed(2);
      },
      from: Number
    },
    p = {
      target: "target",
      base: "base",
      origin: "origin",
      handle: "handle",
      handleLower: "handle-lower",
      handleUpper: "handle-upper",
      touchArea: "touch-area",
      horizontal: "horizontal",
      vertical: "vertical",
      background: "background",
      connect: "connect",
      connects: "connects",
      ltr: "ltr",
      rtl: "rtl",
      textDirectionLtr: "txt-dir-ltr",
      textDirectionRtl: "txt-dir-rtl",
      draggable: "draggable",
      drag: "state-drag",
      tap: "state-tap",
      active: "active",
      tooltip: "tooltip",
      pips: "pips",
      pipsHorizontal: "pips-horizontal",
      pipsVertical: "pips-vertical",
      marker: "marker",
      markerHorizontal: "marker-horizontal",
      markerVertical: "marker-vertical",
      markerNormal: "marker-normal",
      markerLarge: "marker-large",
      markerSub: "marker-sub",
      value: "value",
      valueHorizontal: "value-horizontal",
      valueVertical: "value-vertical",
      valueNormal: "value-normal",
      valueLarge: "value-large",
      valueSub: "value-sub"
    },
    mt = {
      tooltips: ".__tooltips",
      aria: ".__aria"
    };
  function f(t, e) {
    if (!i(e)) throw new Error("noUiSlider: 'step' is not numeric.");
    t.singleStep = e;
  }
  function d(t, e) {
    if (!i(e)) throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric.");
    t.keyboardPageMultiplier = e;
  }
  function h(t, e) {
    if (!i(e)) throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric.");
    t.keyboardMultiplier = e;
  }
  function m(t, e) {
    if (!i(e)) throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric.");
    t.keyboardDefaultStep = e;
  }
  function g(t, e) {
    if ("object" != _typeof(e) || Array.isArray(e)) throw new Error("noUiSlider: 'range' is not an object.");
    if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'.");
    t.spectrum = new u(e, t.snap || !1, t.singleStep);
  }
  function v(t, e) {
    if (e = pt(e), !Array.isArray(e) || !e.length) throw new Error("noUiSlider: 'start' option is incorrect.");
    t.handles = e.length, t.start = e;
  }
  function b(t, e) {
    if ("boolean" != typeof e) throw new Error("noUiSlider: 'snap' option must be a boolean.");
    t.snap = e;
  }
  function S(t, e) {
    if ("boolean" != typeof e) throw new Error("noUiSlider: 'animate' option must be a boolean.");
    t.animate = e;
  }
  function x(t, e) {
    if ("number" != typeof e) throw new Error("noUiSlider: 'animationDuration' option must be a number.");
    t.animationDuration = e;
  }
  function y(t, e) {
    var r,
      n = [!1];
    if ("lower" === e ? e = [!0, !1] : "upper" === e && (e = [!1, !0]), !0 === e || !1 === e) {
      for (r = 1; r < t.handles; r++) n.push(e);
      n.push(!1);
    } else {
      if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count.");
      n = e;
    }
    t.connect = n;
  }
  function w(t, e) {
    switch (e) {
      case "horizontal":
        t.ort = 0;
        break;
      case "vertical":
        t.ort = 1;
        break;
      default:
        throw new Error("noUiSlider: 'orientation' option is invalid.");
    }
  }
  function E(t, e) {
    if (!i(e)) throw new Error("noUiSlider: 'margin' option must be numeric.");
    0 !== e && (t.margin = t.spectrum.getDistance(e));
  }
  function P(t, e) {
    if (!i(e)) throw new Error("noUiSlider: 'limit' option must be numeric.");
    if (t.limit = t.spectrum.getDistance(e), !t.limit || t.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.");
  }
  function C(t, e) {
    var r;
    if (!i(e) && !Array.isArray(e)) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
    if (Array.isArray(e) && 2 !== e.length && !i(e[0]) && !i(e[1])) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers.");
    if (0 !== e) {
      for (Array.isArray(e) || (e = [e, e]), t.padding = [t.spectrum.getDistance(e[0]), t.spectrum.getDistance(e[1])], r = 0; r < t.spectrum.xNumSteps.length - 1; r++) if (t.padding[0][r] < 0 || t.padding[1][r] < 0) throw new Error("noUiSlider: 'padding' option must be a positive number(s).");
      var n = e[0] + e[1],
        e = t.spectrum.xVal[0];
      if (1 < n / (t.spectrum.xVal[t.spectrum.xVal.length - 1] - e)) throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.");
    }
  }
  function N(t, e) {
    switch (e) {
      case "ltr":
        t.dir = 0;
        break;
      case "rtl":
        t.dir = 1;
        break;
      default:
        throw new Error("noUiSlider: 'direction' option was not recognized.");
    }
  }
  function V(t, e) {
    if ("string" != typeof e) throw new Error("noUiSlider: 'behaviour' must be a string containing options.");
    var r = 0 <= e.indexOf("tap"),
      n = 0 <= e.indexOf("drag"),
      i = 0 <= e.indexOf("fixed"),
      o = 0 <= e.indexOf("snap"),
      s = 0 <= e.indexOf("hover"),
      a = 0 <= e.indexOf("unconstrained"),
      l = 0 <= e.indexOf("drag-all"),
      e = 0 <= e.indexOf("smooth-steps");
    if (i) {
      if (2 !== t.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles");
      E(t, t.start[1] - t.start[0]);
    }
    if (a && (t.margin || t.limit)) throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit");
    t.events = {
      tap: r || o,
      drag: n,
      dragAll: l,
      smoothSteps: e,
      fixed: i,
      snap: o,
      hover: s,
      unconstrained: a
    };
  }
  function A(t, e) {
    if (!1 !== e) if (!0 === e || n(e)) {
      t.tooltips = [];
      for (var r = 0; r < t.handles; r++) t.tooltips.push(e);
    } else {
      if ((e = pt(e)).length !== t.handles) throw new Error("noUiSlider: must pass a formatter for all handles.");
      e.forEach(function (t) {
        if ("boolean" != typeof t && !n(t)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.");
      }), t.tooltips = e;
    }
  }
  function k(t, e) {
    if (e.length !== t.handles) throw new Error("noUiSlider: must pass a attributes for all handles.");
    t.handleAttributes = e;
  }
  function M(t, e) {
    if (!n(e)) throw new Error("noUiSlider: 'ariaFormat' requires 'to' method.");
    t.ariaFormat = e;
  }
  function U(t, e) {
    if (!n(r = e) || "function" != typeof r.from) throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods.");
    var r;
    t.format = e;
  }
  function D(t, e) {
    if ("boolean" != typeof e) throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean.");
    t.keyboardSupport = e;
  }
  function O(t, e) {
    t.documentElement = e;
  }
  function L(t, e) {
    if ("string" != typeof e && !1 !== e) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`.");
    t.cssPrefix = e;
  }
  function T(e, r) {
    if ("object" != _typeof(r)) throw new Error("noUiSlider: 'cssClasses' must be an object.");
    "string" == typeof e.cssPrefix ? (e.cssClasses = {}, Object.keys(r).forEach(function (t) {
      e.cssClasses[t] = e.cssPrefix + r[t];
    })) : e.cssClasses = r;
  }
  function gt(e) {
    var r = {
        margin: null,
        limit: null,
        padding: null,
        animate: !0,
        animationDuration: 300,
        ariaFormat: c,
        format: c
      },
      n = {
        step: {
          r: !1,
          t: f
        },
        keyboardPageMultiplier: {
          r: !1,
          t: d
        },
        keyboardMultiplier: {
          r: !1,
          t: h
        },
        keyboardDefaultStep: {
          r: !1,
          t: m
        },
        start: {
          r: !0,
          t: v
        },
        connect: {
          r: !0,
          t: y
        },
        direction: {
          r: !0,
          t: N
        },
        snap: {
          r: !1,
          t: b
        },
        animate: {
          r: !1,
          t: S
        },
        animationDuration: {
          r: !1,
          t: x
        },
        range: {
          r: !0,
          t: g
        },
        orientation: {
          r: !1,
          t: w
        },
        margin: {
          r: !1,
          t: E
        },
        limit: {
          r: !1,
          t: P
        },
        padding: {
          r: !1,
          t: C
        },
        behaviour: {
          r: !0,
          t: V
        },
        ariaFormat: {
          r: !1,
          t: M
        },
        format: {
          r: !1,
          t: U
        },
        tooltips: {
          r: !1,
          t: A
        },
        keyboardSupport: {
          r: !0,
          t: D
        },
        documentElement: {
          r: !1,
          t: O
        },
        cssPrefix: {
          r: !0,
          t: L
        },
        cssClasses: {
          r: !0,
          t: T
        },
        handleAttributes: {
          r: !1,
          t: k
        }
      },
      i = {
        connect: !1,
        direction: "ltr",
        behaviour: "tap",
        orientation: "horizontal",
        keyboardSupport: !0,
        cssPrefix: "noUi-",
        cssClasses: p,
        keyboardPageMultiplier: 5,
        keyboardMultiplier: 1,
        keyboardDefaultStep: 10
      };
    e.format && !e.ariaFormat && (e.ariaFormat = e.format), Object.keys(n).forEach(function (t) {
      if (at(e[t]) || void 0 !== i[t]) n[t].t(r, (at(e[t]) ? e : i)[t]);else if (n[t].r) throw new Error("noUiSlider: '" + t + "' is required.");
    }), r.pips = e.pips;
    var t = document.createElement("div"),
      o = void 0 !== t.style.msTransform,
      t = void 0 !== t.style.transform;
    r.transformRule = t ? "transform" : o ? "msTransform" : "webkitTransform";
    return r.style = [["left", "top"], ["right", "bottom"]][r.dir][r.ort], r;
  }
  function j(t, f, o) {
    var i,
      l,
      a,
      n,
      s,
      u,
      c = window.navigator.pointerEnabled ? {
        start: "pointerdown",
        move: "pointermove",
        end: "pointerup"
      } : window.navigator.msPointerEnabled ? {
        start: "MSPointerDown",
        move: "MSPointerMove",
        end: "MSPointerUp"
      } : {
        start: "mousedown touchstart",
        move: "mousemove touchmove",
        end: "mouseup touchend"
      },
      p = window.CSS && CSS.supports && CSS.supports("touch-action", "none") && function () {
        var t = !1;
        try {
          var e = Object.defineProperty({}, "passive", {
            get: function get() {
              t = !0;
            }
          });
          window.addEventListener("test", null, e);
        } catch (t) {}
        return t;
      }(),
      d = t,
      S = f.spectrum,
      h = [],
      m = [],
      g = [],
      v = 0,
      b = {},
      x = t.ownerDocument,
      y = f.documentElement || x.documentElement,
      w = x.body,
      E = "rtl" === x.dir || 1 === f.ort ? 0 : 100;
    function P(t, e) {
      var r = x.createElement("div");
      return e && ft(r, e), t.appendChild(r), r;
    }
    function C(t, e) {
      var r,
        t = P(t, f.cssClasses.origin),
        n = P(t, f.cssClasses.handle);
      return P(n, f.cssClasses.touchArea), n.setAttribute("data-handle", String(e)), f.keyboardSupport && (n.setAttribute("tabindex", "0"), n.addEventListener("keydown", function (t) {
        return function (t, e) {
          if (V() || A(e)) return !1;
          var r = ["Left", "Right"],
            n = ["Down", "Up"],
            i = ["PageDown", "PageUp"],
            o = ["Home", "End"];
          f.dir && !f.ort ? r.reverse() : f.ort && !f.dir && (n.reverse(), i.reverse());
          var s = t.key.replace("Arrow", ""),
            a = s === i[0],
            l = s === i[1],
            i = s === n[0] || s === r[0] || a,
            n = s === n[1] || s === r[1] || l,
            r = s === o[0],
            o = s === o[1];
          if (!(i || n || r || o)) return !0;
          if (t.preventDefault(), n || i) {
            var u = i ? 0 : 1,
              u = nt(e)[u];
            if (null === u) return !1;
            !1 === u && (u = S.getDefaultStep(m[e], i, f.keyboardDefaultStep)), u *= l || a ? f.keyboardPageMultiplier : f.keyboardMultiplier, u = Math.max(u, 1e-7), u *= i ? -1 : 1, u = h[e] + u;
          } else u = o ? f.spectrum.xVal[f.spectrum.xVal.length - 1] : f.spectrum.xVal[0];
          return Q(e, S.toStepping(u), !0, !0), I("slide", e), I("update", e), I("change", e), I("set", e), !1;
        }(t, e);
      })), void 0 !== f.handleAttributes && (r = f.handleAttributes[e], Object.keys(r).forEach(function (t) {
        n.setAttribute(t, r[t]);
      })), n.setAttribute("role", "slider"), n.setAttribute("aria-orientation", f.ort ? "vertical" : "horizontal"), 0 === e ? ft(n, f.cssClasses.handleLower) : e === f.handles - 1 && ft(n, f.cssClasses.handleUpper), t.handle = n, t;
    }
    function N(t, e) {
      return !!e && P(t, f.cssClasses.connect);
    }
    function e(t, e) {
      return !(!f.tooltips || !f.tooltips[e]) && P(t.firstChild, f.cssClasses.tooltip);
    }
    function V() {
      return d.hasAttribute("disabled");
    }
    function A(t) {
      return l[t].hasAttribute("disabled");
    }
    function k() {
      s && (Y("update" + mt.tooltips), s.forEach(function (t) {
        t && st(t);
      }), s = null);
    }
    function M() {
      k(), s = l.map(e), X("update" + mt.tooltips, function (t, e, r) {
        s && f.tooltips && !1 !== s[e] && (t = t[e], !0 !== f.tooltips[e] && (t = f.tooltips[e].to(r[e])), s[e].innerHTML = t);
      });
    }
    function U(t, e) {
      return t.map(function (t) {
        return S.fromStepping(e ? S.getStep(t) : t);
      });
    }
    function D(d) {
      var h = function (t) {
          if (t.mode === ot.PipsMode.Range || t.mode === ot.PipsMode.Steps) return S.xVal;
          if (t.mode !== ot.PipsMode.Count) return t.mode === ot.PipsMode.Positions ? U(t.values, t.stepped) : t.mode === ot.PipsMode.Values ? t.stepped ? t.values.map(function (t) {
            return S.fromStepping(S.getStep(S.toStepping(t)));
          }) : t.values : [];
          if (t.values < 2) throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'.");
          for (var e = t.values - 1, r = 100 / e, n = []; e--;) n[e] = e * r;
          return n.push(100), U(n, t.stepped);
        }(d),
        m = {},
        t = S.xVal[0],
        e = S.xVal[S.xVal.length - 1],
        g = !1,
        v = !1,
        b = 0;
      return (h = h.slice().sort(function (t, e) {
        return t - e;
      }).filter(function (t) {
        return !this[t] && (this[t] = !0);
      }, {}))[0] !== t && (h.unshift(t), g = !0), h[h.length - 1] !== e && (h.push(e), v = !0), h.forEach(function (t, e) {
        var r,
          n,
          i,
          o,
          s,
          a,
          l,
          u,
          t = t,
          c = h[e + 1],
          p = d.mode === ot.PipsMode.Steps,
          f = (f = p ? S.xNumSteps[e] : f) || c - t;
        for (void 0 === c && (c = t), f = Math.max(f, 1e-7), r = t; r <= c; r = Number((r + f).toFixed(7))) {
          for (a = (o = (i = S.toStepping(r)) - b) / (d.density || 1), u = o / (l = Math.round(a)), n = 1; n <= l; n += 1) m[(s = b + n * u).toFixed(5)] = [S.fromStepping(s), 0];
          a = -1 < h.indexOf(r) ? ot.PipsType.LargeValue : p ? ot.PipsType.SmallValue : ot.PipsType.NoValue, !e && g && r !== c && (a = 0), r === c && v || (m[i.toFixed(5)] = [r, a]), b = i;
        }
      }), m;
    }
    function O(i, o, s) {
      var t,
        a = x.createElement("div"),
        n = ((t = {})[ot.PipsType.None] = "", t[ot.PipsType.NoValue] = f.cssClasses.valueNormal, t[ot.PipsType.LargeValue] = f.cssClasses.valueLarge, t[ot.PipsType.SmallValue] = f.cssClasses.valueSub, t),
        l = ((t = {})[ot.PipsType.None] = "", t[ot.PipsType.NoValue] = f.cssClasses.markerNormal, t[ot.PipsType.LargeValue] = f.cssClasses.markerLarge, t[ot.PipsType.SmallValue] = f.cssClasses.markerSub, t),
        u = [f.cssClasses.valueHorizontal, f.cssClasses.valueVertical],
        c = [f.cssClasses.markerHorizontal, f.cssClasses.markerVertical];
      function p(t, e) {
        var r = e === f.cssClasses.value;
        return e + " " + (r ? u : c)[f.ort] + " " + (r ? n : l)[t];
      }
      return ft(a, f.cssClasses.pips), ft(a, 0 === f.ort ? f.cssClasses.pipsHorizontal : f.cssClasses.pipsVertical), Object.keys(i).forEach(function (t) {
        var e, r, n;
        r = i[e = t][0], n = i[t][1], (n = o ? o(r, n) : n) !== ot.PipsType.None && ((t = P(a, !1)).className = p(n, f.cssClasses.marker), t.style[f.style] = e + "%", n > ot.PipsType.NoValue && ((t = P(a, !1)).className = p(n, f.cssClasses.value), t.setAttribute("data-value", String(r)), t.style[f.style] = e + "%", t.innerHTML = String(s.to(r))));
      }), a;
    }
    function L() {
      n && (st(n), n = null);
    }
    function T(t) {
      L();
      var e = D(t),
        r = t.filter,
        t = t.format || {
          to: function to(t) {
            return String(Math.round(t));
          }
        };
      return n = d.appendChild(O(e, r, t));
    }
    function j() {
      var t = i.getBoundingClientRect(),
        e = "offset" + ["Width", "Height"][f.ort];
      return 0 === f.ort ? t.width || i[e] : t.height || i[e];
    }
    function z(n, i, o, s) {
      function e(t) {
        var e,
          r = function (e, t, r) {
            var n = 0 === e.type.indexOf("touch"),
              i = 0 === e.type.indexOf("mouse"),
              o = 0 === e.type.indexOf("pointer"),
              s = 0,
              a = 0;
            0 === e.type.indexOf("MSPointer") && (o = !0);
            if ("mousedown" === e.type && !e.buttons && !e.touches) return !1;
            if (n) {
              var l = function l(t) {
                t = t.target;
                return t === r || r.contains(t) || e.composed && e.composedPath().shift() === r;
              };
              if ("touchstart" === e.type) {
                n = Array.prototype.filter.call(e.touches, l);
                if (1 < n.length) return !1;
                s = n[0].pageX, a = n[0].pageY;
              } else {
                l = Array.prototype.find.call(e.changedTouches, l);
                if (!l) return !1;
                s = l.pageX, a = l.pageY;
              }
            }
            t = t || ht(x), (i || o) && (s = e.clientX + t.x, a = e.clientY + t.y);
            return e.pageOffset = t, e.points = [s, a], e.cursor = i || o, e;
          }(t, s.pageOffset, s.target || i);
        return !!r && !(V() && !s.doNotReject) && (e = d, t = f.cssClasses.tap, !((e.classList ? e.classList.contains(t) : new RegExp("\\b" + t + "\\b").test(e.className)) && !s.doNotReject) && !(n === c.start && void 0 !== r.buttons && 1 < r.buttons) && (!s.hover || !r.buttons) && (p || r.preventDefault(), r.calcPoint = r.points[f.ort], void o(r, s)));
      }
      var r = [];
      return n.split(" ").forEach(function (t) {
        i.addEventListener(t, e, !!p && {
          passive: !0
        }), r.push([t, e]);
      }), r;
    }
    function H(t) {
      var e,
        r,
        n = ct(n = 100 * (t - (n = i, e = f.ort, r = n.getBoundingClientRect(), n = (t = n.ownerDocument).documentElement, t = ht(t), /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (t.x = 0), e ? r.top + t.y - n.clientTop : r.left + t.x - n.clientLeft)) / j());
      return f.dir ? 100 - n : n;
    }
    function F(t, e) {
      "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && _(t, e);
    }
    function R(t, e) {
      if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty) return _(t, e);
      t = (f.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint);
      G(0 < t, 100 * t / e.baseSize, e.locations, e.handleNumbers, e.connect);
    }
    function _(t, e) {
      e.handle && (dt(e.handle, f.cssClasses.active), --v), e.listeners.forEach(function (t) {
        y.removeEventListener(t[0], t[1]);
      }), 0 === v && (dt(d, f.cssClasses.drag), K(), t.cursor && (w.style.cursor = "", w.removeEventListener("selectstart", lt))), f.events.smoothSteps && (e.handleNumbers.forEach(function (t) {
        Q(t, m[t], !0, !0, !1, !1);
      }), e.handleNumbers.forEach(function (t) {
        I("update", t);
      })), e.handleNumbers.forEach(function (t) {
        I("change", t), I("set", t), I("end", t);
      });
    }
    function B(t, e) {
      var r, n, i, o;
      e.handleNumbers.some(A) || (1 === e.handleNumbers.length && (o = l[e.handleNumbers[0]].children[0], v += 1, ft(o, f.cssClasses.active)), t.stopPropagation(), n = z(c.move, y, R, {
        target: t.target,
        handle: o,
        connect: e.connect,
        listeners: r = [],
        startCalcPoint: t.calcPoint,
        baseSize: j(),
        pageOffset: t.pageOffset,
        handleNumbers: e.handleNumbers,
        buttonsProperty: t.buttons,
        locations: m.slice()
      }), i = z(c.end, y, _, {
        target: t.target,
        handle: o,
        listeners: r,
        doNotReject: !0,
        handleNumbers: e.handleNumbers
      }), o = z("mouseout", y, F, {
        target: t.target,
        handle: o,
        listeners: r,
        doNotReject: !0,
        handleNumbers: e.handleNumbers
      }), r.push.apply(r, n.concat(i, o)), t.cursor && (w.style.cursor = getComputedStyle(t.target).cursor, 1 < l.length && ft(d, f.cssClasses.drag), w.addEventListener("selectstart", lt, !1)), e.handleNumbers.forEach(function (t) {
        I("start", t);
      }));
    }
    function r(t) {
      t.stopPropagation();
      var i,
        o,
        s,
        e = H(t.calcPoint),
        r = (i = e, s = !(o = 100), l.forEach(function (t, e) {
          var r, n;
          A(e) || (r = m[e], ((n = Math.abs(r - i)) < o || n <= o && r < i || 100 === n && 100 === o) && (s = e, o = n));
        }), s);
      !1 !== r && (f.events.snap || ut(d, f.cssClasses.tap, f.animationDuration), Q(r, e, !0, !0), K(), I("slide", r, !0), I("update", r, !0), f.events.snap ? B(t, {
        handleNumbers: [r]
      }) : (I("change", r, !0), I("set", r, !0)));
    }
    function q(t) {
      var t = H(t.calcPoint),
        t = S.getStep(t),
        e = S.fromStepping(t);
      Object.keys(b).forEach(function (t) {
        "hover" === t.split(".")[0] && b[t].forEach(function (t) {
          t.call(it, e);
        });
      });
    }
    function X(t, e) {
      b[t] = b[t] || [], b[t].push(e), "update" === t.split(".")[0] && l.forEach(function (t, e) {
        I("update", e);
      });
    }
    function Y(t) {
      var n = t && t.split(".")[0],
        i = n ? t.substring(n.length) : t;
      Object.keys(b).forEach(function (t) {
        var e = t.split(".")[0],
          r = t.substring(e.length);
        n && n !== e || i && i !== r || ((e = r) !== mt.aria && e !== mt.tooltips || i === r) && delete b[t];
      });
    }
    function I(r, n, i) {
      Object.keys(b).forEach(function (t) {
        var e = t.split(".")[0];
        r === e && b[t].forEach(function (t) {
          t.call(it, h.map(f.format.to), n, h.slice(), i || !1, m.slice(), it);
        });
      });
    }
    function W(t, e, r, n, i, o, s) {
      var a;
      return 1 < l.length && !f.events.unconstrained && (n && 0 < e && (a = S.getAbsoluteDistance(t[e - 1], f.margin, !1), r = Math.max(r, a)), i && e < l.length - 1 && (a = S.getAbsoluteDistance(t[e + 1], f.margin, !0), r = Math.min(r, a))), 1 < l.length && f.limit && (n && 0 < e && (a = S.getAbsoluteDistance(t[e - 1], f.limit, !1), r = Math.min(r, a)), i && e < l.length - 1 && (a = S.getAbsoluteDistance(t[e + 1], f.limit, !0), r = Math.max(r, a))), f.padding && (0 === e && (a = S.getAbsoluteDistance(0, f.padding[0], !1), r = Math.max(r, a)), e === l.length - 1 && (a = S.getAbsoluteDistance(100, f.padding[1], !0), r = Math.min(r, a))), !((r = ct(r = !s ? S.getStep(r) : r)) === t[e] && !o) && r;
    }
    function $(t, e) {
      var r = f.ort;
      return (r ? e : t) + ", " + (r ? t : e);
    }
    function G(t, r, n, e, i) {
      var o = n.slice(),
        s = e[0],
        a = f.events.smoothSteps,
        l = [!t, t],
        u = [t, !t];
      e = e.slice(), t && e.reverse(), 1 < e.length ? e.forEach(function (t, e) {
        e = W(o, t, o[t] + r, l[e], u[e], !1, a);
        !1 === e ? r = 0 : (r = e - o[t], o[t] = e);
      }) : l = u = [!0];
      var c = !1;
      e.forEach(function (t, e) {
        c = Q(t, n[t] + r, l[e], u[e], !1, a) || c;
      }), c && (e.forEach(function (t) {
        I("update", t), I("slide", t);
      }), null != i && I("drag", s));
    }
    function J(t, e) {
      return f.dir ? 100 - t - e : t;
    }
    function K() {
      g.forEach(function (t) {
        var e = 50 < m[t] ? -1 : 1,
          e = 3 + (l.length + e * t);
        l[t].style.zIndex = String(e);
      });
    }
    function Q(t, e, r, n, i, o) {
      return !1 !== (e = i ? e : W(m, t, e, r, n, !1, o)) && (e = e, m[t = t] = e, h[t] = S.fromStepping(e), e = "translate(" + $(J(e, 0) - E + "%", "0") + ")", l[t].style[f.transformRule] = e, Z(t), Z(t + 1), !0);
    }
    function Z(t) {
      var e, r;
      a[t] && (r = 100, e = "translate(" + $(J(e = (e = 0) !== t ? m[t - 1] : e, r = (r = t !== a.length - 1 ? m[t] : r) - e) + "%", "0") + ")", r = "scale(" + $(r / 100, "1") + ")", a[t].style[f.transformRule] = e + " " + r);
    }
    function tt(t, e) {
      return null === t || !1 === t || void 0 === t ? m[e] : ("number" == typeof t && (t = String(t)), !1 === (t = !1 !== (t = f.format.from(t)) ? S.toStepping(t) : t) || isNaN(t) ? m[e] : t);
    }
    function et(t, e, r) {
      var n = pt(t),
        t = void 0 === m[0];
      e = void 0 === e || e, f.animate && !t && ut(d, f.cssClasses.tap, f.animationDuration), g.forEach(function (t) {
        Q(t, tt(n[t], t), !0, !1, r);
      });
      var i,
        o = 1 === g.length ? 0 : 1;
      for (t && S.hasNoSize() && (r = !0, m[0] = 0, 1 < g.length && (i = 100 / (g.length - 1), g.forEach(function (t) {
        m[t] = t * i;
      }))); o < g.length; ++o) g.forEach(function (t) {
        Q(t, m[t], !0, !0, r);
      });
      K(), g.forEach(function (t) {
        I("update", t), null !== n[t] && e && I("set", t);
      });
    }
    function rt(t) {
      if (t = void 0 === t ? !1 : t) return 1 === h.length ? h[0] : h.slice(0);
      t = h.map(f.format.to);
      return 1 === t.length ? t[0] : t;
    }
    function nt(t) {
      var e = m[t],
        r = S.getNearbySteps(e),
        n = h[t],
        i = r.thisStep.step,
        t = null;
      if (f.snap) return [n - r.stepBefore.startValue || null, r.stepAfter.startValue - n || null];
      !1 !== i && n + i > r.stepAfter.startValue && (i = r.stepAfter.startValue - n), t = n > r.thisStep.startValue ? r.thisStep.step : !1 !== r.stepBefore.step && n - r.stepBefore.highestStep, 100 === e ? i = null : 0 === e && (t = null);
      e = S.countStepDecimals();
      return null !== i && !1 !== i && (i = Number(i.toFixed(e))), [t = null !== t && !1 !== t ? Number(t.toFixed(e)) : t, i];
    }
    ft(t = d, f.cssClasses.target), 0 === f.dir ? ft(t, f.cssClasses.ltr) : ft(t, f.cssClasses.rtl), 0 === f.ort ? ft(t, f.cssClasses.horizontal) : ft(t, f.cssClasses.vertical), ft(t, "rtl" === getComputedStyle(t).direction ? f.cssClasses.textDirectionRtl : f.cssClasses.textDirectionLtr), i = P(t, f.cssClasses.base), function (t, e) {
      var r = P(e, f.cssClasses.connects);
      l = [], (a = []).push(N(r, t[0]));
      for (var n = 0; n < f.handles; n++) l.push(C(e, n)), g[n] = n, a.push(N(r, t[n + 1]));
    }(f.connect, i), (u = f.events).fixed || l.forEach(function (t, e) {
      z(c.start, t.children[0], B, {
        handleNumbers: [e]
      });
    }), u.tap && z(c.start, i, r, {}), u.hover && z(c.move, i, q, {
      hover: !0
    }), u.drag && a.forEach(function (e, t) {
      var r, n, i, o, s;
      !1 !== e && 0 !== t && t !== a.length - 1 && (r = l[t - 1], n = l[t], i = [e], o = [r, n], s = [t - 1, t], ft(e, f.cssClasses.draggable), u.fixed && (i.push(r.children[0]), i.push(n.children[0])), u.dragAll && (o = l, s = g), i.forEach(function (t) {
        z(c.start, t, B, {
          handles: o,
          handleNumbers: s,
          connect: e
        });
      }));
    }), et(f.start), f.pips && T(f.pips), f.tooltips && M(), Y("update" + mt.aria), X("update" + mt.aria, function (t, e, o, r, s) {
      g.forEach(function (t) {
        var e = l[t],
          r = W(m, t, 0, !0, !0, !0),
          n = W(m, t, 100, !0, !0, !0),
          i = s[t],
          t = String(f.ariaFormat.to(o[t])),
          r = S.fromStepping(r).toFixed(1),
          n = S.fromStepping(n).toFixed(1),
          i = S.fromStepping(i).toFixed(1);
        e.children[0].setAttribute("aria-valuemin", r), e.children[0].setAttribute("aria-valuemax", n), e.children[0].setAttribute("aria-valuenow", i), e.children[0].setAttribute("aria-valuetext", t);
      });
    });
    var it = {
      destroy: function destroy() {
        for (Y(mt.aria), Y(mt.tooltips), Object.keys(f.cssClasses).forEach(function (t) {
          dt(d, f.cssClasses[t]);
        }); d.firstChild;) d.removeChild(d.firstChild);
        delete d.noUiSlider;
      },
      steps: function steps() {
        return g.map(nt);
      },
      on: X,
      off: Y,
      get: rt,
      set: et,
      setHandle: function setHandle(t, e, r, n) {
        if (!(0 <= (t = Number(t)) && t < g.length)) throw new Error("noUiSlider: invalid handle number, got: " + t);
        Q(t, tt(e, t), !0, !0, n), I("update", t), r && I("set", t);
      },
      reset: function reset(t) {
        et(f.start, t);
      },
      disable: function disable(t) {
        null != t ? (l[t].setAttribute("disabled", ""), l[t].handle.removeAttribute("tabindex")) : (d.setAttribute("disabled", ""), l.forEach(function (t) {
          t.handle.removeAttribute("tabindex");
        }));
      },
      enable: function enable(t) {
        null != t ? (l[t].removeAttribute("disabled"), l[t].handle.setAttribute("tabindex", "0")) : (d.removeAttribute("disabled"), l.forEach(function (t) {
          t.removeAttribute("disabled"), t.handle.setAttribute("tabindex", "0");
        }));
      },
      __moveHandles: function __moveHandles(t, e, r) {
        G(t, e, m, r);
      },
      options: o,
      updateOptions: function updateOptions(e, t) {
        var r = rt(),
          n = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips"];
        n.forEach(function (t) {
          void 0 !== e[t] && (o[t] = e[t]);
        });
        var i = gt(o);
        n.forEach(function (t) {
          void 0 !== e[t] && (f[t] = i[t]);
        }), S = i.spectrum, f.margin = i.margin, f.limit = i.limit, f.padding = i.padding, f.pips ? T(f.pips) : L(), (f.tooltips ? M : k)(), m = [], et(at(e.start) ? e.start : r, t);
      },
      target: d,
      removePips: L,
      removeTooltips: k,
      getPositions: function getPositions() {
        return m.slice();
      },
      getTooltips: function getTooltips() {
        return s;
      },
      getOrigins: function getOrigins() {
        return l;
      },
      pips: T
    };
    return it;
  }
  function z(t, e) {
    if (!t || !t.nodeName) throw new Error("noUiSlider: create requires a single element, got: " + t);
    if (t.noUiSlider) throw new Error("noUiSlider: Slider was already initialized.");
    e = j(t, gt(e), e);
    return t.noUiSlider = e;
  }
  var H = {
    __spectrum: u,
    cssClasses: p,
    create: z
  };
  ot.create = z, ot.cssClasses = p, ot["default"] = H, Object.defineProperty(ot, "__esModule", {
    value: !0
  });
});
"use strict";

var swiperOffers = new Swiper('.offers__swiper', {
  loop: false,
  speed: 600,
  autoHeight: false,
  spaceBetween: 32,
  breakpoints: {
    320: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 12
    },
    768: {
      slidesPerGroup: 2,
      slidesPerView: 2
    },
    1024: {
      slidesPerGroup: 3,
      slidesPerView: 3
    },
    1200: {
      slidesPerGroup: 3,
      slidesPerView: 3
    }
  },
  navigation: {
    nextEl: '.swiper__btn-next',
    prevEl: '.swiper__btn-prev'
  },
  //Перевод на русский язык
  a11y: {
    paginationBulleMessage: 'Тут название слайда {{index}}'
  }
});
"use strict";

var rangeSlider = document.getElementById('range-slider');
if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [2000, 150000],
    connect: true,
    step: 1,
    range: {
      'min': [2000],
      'max': [150000]
    }
  });
  var input0 = document.getElementById('price-input-0');
  var input1 = document.getElementById('price-input-1');
  var inputs = [input0, input1];
  rangeSlider.noUiSlider.on('update', function (values, handle) {
    inputs[handle].value = Math.round(values[handle]);
  });

  //function, которая сдвигает ползунок при изменении значения в input
  var setRangeSlider = function setRangeSlider(i, value) {
    var arr = [null, null];
    arr[i] = value;
    rangeSlider.noUiSlider.set(arr);
  };
  inputs.forEach(function (el, index) {
    el.addEventListener('change', function (e) {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}
"use strict";

tippy('[data-tippy-content]');
"use strict";

var swiperUseful = new Swiper('.useful__swiper', {
  loop: false,
  speed: 600,
  spaceBetween: 32,
  slidesPerGroup: 1,
  slidesPerView: 2,
  autoHeight: false,
  breakpoints: {
    320: {
      // when window width is >= 320px
      slidesPerView: 1
    },
    992: {
      // when window width is >= 992px
      slidesPerView: 2
    },
    1024: {
      // when window width is >= 1024px
      slidesPerView: 3
    },
    1352: {
      slidesPerView: 2
    }
  },
  navigation: {
    nextEl: '.swiper__btn-next',
    prevEl: '.swiper__btn-prev'
  }
});
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var validation = new JustValidate('.form', {
    errorFieldCssClass: 'just-validate-error-field',
    errorLabelStyle: {
      color: '#FF6972'
    },
    successFieldCssClass: 'just-validate-success-field',
    focusInvalidField: true,
    validateBeforeSubmitting: true,
    lockForm: true
  });
  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);
  var checkbox = document.querySelector('.custom__checkbox');
  validation.addField('.name', [{
    rule: 'minLength',
    value: 3,
    errorMessage: "Не достаточное количество символов!"
  }, {
    rule: 'required',
    value: true,
    errorMessage: 'Заполните имя!'
  }, {
    rule: 'customRegexp',
    value: /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/,
    errorMessage: 'Недопустимый формат!'
  }]).addField('.tel', [{
    rule: 'function',
    validator: function validator(name, value) {
      var phone = selector.inputmask.unmaskedvalue();
      return phone.length === 10;
    },
    errorMessage: 'Вы не ввели телефон'
  }]).addField('.email', [{
    rule: 'required',
    errorMessage: 'Введите Email!'
  }, {
    rule: 'email',
    errorMessage: 'Недопустимый формат!'
  }]).addField('.checkbox', [{
    rule: 'required',
    errorMessage: 'Необходимо поставить согласие'
  }]);
  document.getElementById('order__form').addEventListener('submit', function (e) {
    e.preventDefault();
    e.target.reset();
  });
});
"use strict";

var backMore = document.querySelector('.catalog-page__btn1');
var nextMore = document.querySelector('.catalog-page__btn2');
var nextMore2 = document.querySelector('.catalog-page__btn3');
var productsLength = document.querySelectorAll('.catalog-page__item').length;
var array = Array.from(document.querySelector('.catalog-page__list').children);
function createTabDesktop() {
  var items = 9;
  items += 9;
  var visibleItems = array.slice(9, items);
  var inVisibleItems = array.slice(0, 9);
  nextMore.addEventListener('click', function () {
    visibleItems.forEach(function (el) {
      return el.classList.add('is-visible');
    });
    inVisibleItems.forEach(function (el) {
      return el.classList.add('in-visible');
    });
    backMore.classList.remove('catalog-page__btn--active');
    nextMore.classList.add('catalog-page__btn--active');
    nextMore.blur();
  });
  backMore.addEventListener('click', function () {
    visibleItems.forEach(function (el) {
      return el.classList.remove('is-visible');
    });
    inVisibleItems.forEach(function (el) {
      return el.classList.remove('in-visible');
    });
    nextMore.classList.remove('catalog-page__btn--active');
    backMore.classList.add('catalog-page__btn--active');
    backMore.blur();
  });
}
;
function createTabTablet() {
  var items = 18;
  items += 6;
  var visibleItems = array.slice(6, 12);
  var inVisibleItems = array.slice(0, 6);
  var visibleItemsMore = array.slice(12, items);
  nextMore.addEventListener('click', function () {
    visibleItems.forEach(function (el) {
      return el.classList.add('is-visible');
    }); //6, 12 - видно
    inVisibleItems.forEach(function (el) {
      return el.classList.add('in-visible');
    }); //0, 6 - не видно
    visibleItemsMore.forEach(function (el) {
      return el.classList.add('in-visible');
    }); //12, 18 - не видно

    backMore.classList.remove('catalog-page__btn--active');
    nextMore2.classList.remove('catalog-page__btn--active');
    nextMore.classList.add('catalog-page__btn--active');
    nextMore.blur();
  });
  nextMore2.addEventListener('click', function () {
    visibleItemsMore.forEach(function (el) {
      return el.classList.remove('in-visible');
    });
    visibleItemsMore.forEach(function (el) {
      return el.classList.add('is-visible');
    });
    visibleItems.forEach(function (el) {
      return el.classList.remove('is-visible');
    });
    nextMore.classList.remove('catalog-page__btn--active');
    nextMore2.classList.add('catalog-page__btn--active');
    nextMore2.blur();
  });
  backMore.addEventListener('click', function () {
    visibleItems.forEach(function (el) {
      return el.classList.remove('is-visible');
    });
    inVisibleItems.forEach(function (el) {
      return el.classList.remove('in-visible');
    });
    visibleItemsMore.forEach(function (el) {
      return el.classList.add('in-visible');
    });
    nextMore.classList.remove('catalog-page__btn--active');
    nextMore2.classList.remove('catalog-page__btn--active');
    backMore.classList.add('catalog-page__btn--active');
    backMore.blur();
  });
}
;
var screenWidth = window.screen.width;
if (screenWidth > 992) {
  createTabDesktop();
} else {
  createTabTablet();
}
"use strict";

// Show/hide filter params
var filterCategoryButton = document.querySelector('.js-filter-category-btn');
var filterPriceButton = document.querySelector('.js-filter-price-btn');
var filterDiscountButton = document.querySelector('.js-filter-discount-btn');
var filterColorButton = document.querySelector('.js-filter-color-btn');
var filterCategoryOptions = document.querySelector('.js-filter-category-options');
var filterPriceOptions = document.querySelector('.js-filter-price-options');
var filterDiscountOptions = document.querySelector('.js-filter-discount-options');
var filterColorOptions = document.querySelector('.js-filter-color-options');
function toggleFilterOption(button, option) {
  var activeButton = document.querySelector('.param__btn--active');
  var activeOption = document.querySelector('.param__options--active');
  if (activeButton && activeButton !== button) activeButton.classList.remove('param__btn--active');
  if (activeOption && activeOption !== option) activeOption.classList.remove('param__options--active');
  button.classList.toggle('param__btn--active');
  option.classList.toggle('param__options--active');
}
filterCategoryButton.addEventListener('click', function () {
  return toggleFilterOption(filterCategoryButton, filterCategoryOptions);
});
filterPriceButton.addEventListener('click', function () {
  return toggleFilterOption(filterPriceButton, filterPriceOptions);
});
filterDiscountButton.addEventListener('click', function () {
  return toggleFilterOption(filterDiscountButton, filterDiscountOptions);
});
filterColorButton.addEventListener('click', function () {
  return toggleFilterOption(filterColorButton, filterColorOptions);
});
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var GraphModal = /*#__PURE__*/function () {
  function GraphModal(t) {
    _classCallCheck(this, GraphModal);
    this.options = Object.assign({
      isOpen: function isOpen() {},
      isClose: function isClose() {}
    }, t), this.modal = document.querySelector(".modal"), this.speed = !1, this.animation = !1, this._reOpen = !1, this._nextContainer = !1, this.modalContainer = !1, this.isOpen = !1, this.previousActiveElement = !1, this._focusElements = ["a[href]", "input", "select", "textarea", "button", "iframe", "[contenteditable]", '[tabindex]:not([tabindex^="-"])'], this._fixBlocks = document.querySelectorAll(".fix-block"), this.events();
  }
  _createClass(GraphModal, [{
    key: "events",
    value: function events() {
      this.modal && (document.addEventListener("click", function (t) {
        var e = t.target.closest("[data-graph-path]");
        if (e) {
          var _t = e.dataset.graphPath,
            s = e.dataset.graphAnimation,
            i = e.dataset.graphSpeed;
          return this.animation = s || "fade", this.speed = i ? parseInt(i) : 300, this._nextContainer = document.querySelector("[data-graph-target=\"".concat(_t, "\"]")), void this.open();
        }
        t.target.closest(".modal__close") && this.close();
      }.bind(this)), window.addEventListener("keydown", function (t) {
        27 == t.keyCode && this.modalContainer.classList.contains("modal-open") && this.close(), 9 == t.which && this.isOpen && this.focusCatch(t);
      }.bind(this)), this.modal.addEventListener("click", function (t) {
        t.target.classList.contains("modal__container") || t.target.closest(".modal__container") || !this.isOpen || this.close();
      }.bind(this)));
    }
  }, {
    key: "open",
    value: function open(t) {
      var _this = this;
      if (this.previousActiveElement = document.activeElement, this.isOpen) return this.reOpen = !0, void this.close();
      this.modalContainer = this._nextContainer, t && (this.modalContainer = document.querySelector("[data-graph-target=\"".concat(t, "\"]"))), this.modal.style.setProperty("--transition-time", "".concat(this.speed / 1e3, "s")), this.modal.classList.add("is-open"), this.disableScroll(), this.modalContainer.classList.add("modal-open"), this.modalContainer.classList.add(this.animation), setTimeout(function () {
        _this.options.isOpen(_this), _this.modalContainer.classList.add("animate-open"), _this.isOpen = !0, _this.focusTrap();
      }, this.speed);
    }
  }, {
    key: "close",
    value: function close() {
      this.modalContainer && (this.modalContainer.classList.remove("animate-open"), this.modalContainer.classList.remove(this.animation), this.modal.classList.remove("is-open"), this.modalContainer.classList.remove("modal-open"), this.enableScroll(), this.options.isClose(this), this.isOpen = !1, this.focusTrap(), this.reOpen && (this.reOpen = !1, this.open()));
    }
  }, {
    key: "focusCatch",
    value: function focusCatch(t) {
      var e = this.modalContainer.querySelectorAll(this._focusElements),
        s = Array.prototype.slice.call(e),
        i = s.indexOf(document.activeElement);
      t.shiftKey && 0 === i && (s[s.length - 1].focus(), t.preventDefault()), t.shiftKey || i !== s.length - 1 || (s[0].focus(), t.preventDefault());
    }
  }, {
    key: "focusTrap",
    value: function focusTrap() {
      var t = this.modalContainer.querySelectorAll(this._focusElements);
      this.isOpen ? t.length && t[0].focus() : this.previousActiveElement.focus();
    }
  }, {
    key: "disableScroll",
    value: function disableScroll() {
      var t = window.scrollY;
      this.lockPadding(), document.body.classList.add("disable-scroll"), document.body.dataset.position = t, document.body.style.top = -t + "px";
    }
  }, {
    key: "enableScroll",
    value: function enableScroll() {
      var t = parseInt(document.body.dataset.position, 10);
      this.unlockPadding(), document.body.style.top = "auto", document.body.classList.remove("disable-scroll"), window.scroll({
        top: t,
        left: 0
      }), document.body.removeAttribute("data-position");
    }
  }, {
    key: "lockPadding",
    value: function lockPadding() {
      var t = window.innerWidth - document.body.offsetWidth + "px";
      this._fixBlocks.forEach(function (e) {
        e.style.paddingRight = t;
      }), document.body.style.paddingRight = t;
    }
  }, {
    key: "unlockPadding",
    value: function unlockPadding() {
      this._fixBlocks.forEach(function (t) {
        t.style.paddingRight = "0px";
      }), document.body.style.paddingRight = "0px";
    }
  }]);
  return GraphModal;
}();
"use strict";

//Slider big foto sofa
var productSwiper = new Swiper('.slider-block', {
  loop: true,
  speed: 600,
  slidersPerView: 1,
  //Перевод на русский язык
  a11y: {
    paginationBulleMessage: 'Тут название слайда {{index}}'
  }
});

//Slider big foto sofa modal
var productModalSwiper = new Swiper('.product__modal', {
  loop: true,
  speed: 600,
  slidersPerView: 1,
  //Перевод на русский язык
  a11y: {
    paginationBulleMessage: 'Тут название слайда {{index}}'
  }
});

//slider nav (small foto sofa)
var productNavSwiper = new Swiper('.product__slider-nav', {
  loop: true,
  speed: 600,
  //direction: 'horizontal',
  //slidersPerView: 4,
  //spaceBetween: 38,
  breakpoints: {
    320: {
      direction: 'horizontal'
    },
    992: {
      // when window width is >= 992px
      slidesPerView: 4,
      direction: 'vertical'
    },
    1024: {
      // when window width is >= 1024px
      slidesPerView: 3,
      spaceBetween: 38,
      direction: 'horizontal'
    },
    1352: {
      slidesPerView: 4,
      spaceBetween: 38,
      direction: 'horizontal'
    }
  }
});

//slider nav (small foto sofa)
var productNavSwiperModal = new Swiper('.product__slider-nav--modal', {
  loop: true,
  speed: 600,
  autoHeight: false,
  spaceBetween: 38,
  slidesPerGroup: 1,
  slidesPerView: 1,
  breakpoints: {
    992: {
      // when window width is >= 992px
      slidesPerView: 2
    },
    1024: {
      // when window width is >= 1024px
      slidesPerView: 3
    },
    1352: {
      slidesPerView: 4
    }
  },
  navigation: {
    nextEl: '.swiper__btn-next--sofa',
    prevEl: '.swiper__btn-prev--sofa'
  },
  //Перевод на русский язык
  a11y: {
    paginationBulleMessage: 'Тут название слайда {{index}}'
  }
});

//Slider похожие товары
var productsSwiper = new Swiper('.product-slide__swiper', {
  loop: false,
  speed: 600,
  spaceBetween: 32,
  slidesPerGroup: 1,
  slidesPerView: 1,
  autoHeight: false,
  breakpoints: {
    320: {
      spaceBetween: 16
    },
    992: {
      // when window width is >= 992px
      slidesPerView: 2
    },
    1024: {
      // when window width is >= 1024px
      slidesPerView: 3
    },
    1352: {
      slidesPerView: 4
    }
  },
  navigation: {
    nextEl: '.swiper__btn-next',
    prevEl: '.swiper__btn-prev'
  },
  //Перевод на русский язык
  a11y: {
    paginationBulleMessage: 'Тут название слайда {{index}}'
  }
});

//modal
document.addEventListener('DOMContentLoaded', function () {
  var modal = new GraphModal({
    isOpen: function isOpen(modal) {
      console.log('opened');
    },
    isClose: function isClose() {
      gulpIf;
      console.log('closed');
    }
  });

  //function open modal product
  var modalProduct = document.querySelector('.slider-block');
  modalProduct.addEventListener('click', function () {
    new GraphModal().open('first');
  });

  //Присваиваем tab-index
  var sliderNavItems = document.querySelectorAll('.slider-nav__item');
  //const index = parseInt(e.currentTarget.dataset.index);
  sliderNavItems.forEach(function (el, index) {
    el.setAttribute('data-index', index);
    el.addEventListener('click', function (e) {
      var index = parseInt(e.currentTarget.dataset.index);
      console.log(index);
      productSwiper.slideTo(index);
    });
  });
  //modal
  var sliderNavModal = document.querySelectorAll('.slider-nav__item--modal');
  sliderNavModal.forEach(function (el, index) {
    el.setAttribute('data-index', index);
    el.addEventListener('click', function (e) {
      var index = parseInt(e.currentTarget.dataset.index);
      console.log(index);
      productModalSwiper.slideTo(index);
    });
  });
});

//validation
document.addEventListener("DOMContentLoaded", function () {
  var validation = new JustValidate('.order-modal__form', {
    errorFieldCssClass: 'just-validate-error-field',
    errorLabelStyle: {
      color: '#FF6972'
    },
    successFieldCssClass: 'just-validate-success-field',
    focusInvalidField: true,
    validateBeforeSubmitting: true,
    lockForm: true
  });
  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);
  var checkbox = document.querySelector('.custom__checkbox');
  validation.addField('.name', [{
    rule: 'minLength',
    value: 3,
    errorMessage: "Не достаточное количество символов!"
  }, {
    rule: 'required',
    value: true,
    errorMessage: 'Заполните имя!'
  }, {
    rule: 'customRegexp',
    value: /^[a-zA-Zа-яёА-ЯЁ\s\-]+$/,
    errorMessage: 'Недопустимый формат!'
  }]).addField('.tel', [{
    rule: 'function',
    validator: function validator(name, value) {
      var phone = selector.inputmask.unmaskedvalue();
      return phone.length === 10;
    },
    errorMessage: 'Вы не ввели телефон'
  }]).addField('.checkbox', [{
    rule: 'required',
    errorMessage: 'Необходимо поставить согласие'
  }]).onSuccess(function (e) {
    document.getElementById('order__form-modal').submit();
    e.preventDefault();
    e.target.reset();
    document.querySelector('.modal-open').classList.remove('animate-open');
    document.querySelector('.modal-open').classList.remove('false');
    document.querySelector('.modal-open').classList.remove('modal-open');
    new GraphModal().open('success');
  });
});
"use strict";

require("./components/banner");
require("./components/burger");
require("./components/offers");
require("./components/useful");
require("./components/tooltip");
require("./components/choices");
require("./components/just-validate.min");
require("./components/inputmask.min");
require("./components/validate-form");
require("./components/nouislider.min.js");
require("./components/range-slider");
require("./components/catalog/schow-more");
require("./components/catalog/select");
//# sourceMappingURL=app.js.map
