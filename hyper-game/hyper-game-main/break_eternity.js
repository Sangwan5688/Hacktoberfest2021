(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Decimal = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  /**
   * A LRU cache intended for caching pure functions.
   */
  var LRUCache = /*#__PURE__*/function () {
    /**
     * @param maxSize The maximum size for this cache. We recommend setting this
     * to be one less than a power of 2, as most hashtables - including V8's
     * Object hashtable (https://crsrc.org/c/v8/src/objects/ordered-hash-table.cc)
     * - uses powers of two for hashtable sizes. It can't exactly be a power of
     * two, as a .set() call could temporarily set the size of the map to be
     * maxSize + 1.
     */
    function LRUCache(maxSize) {
      _classCallCheck(this, LRUCache);

      this.map = new Map(); // Invariant: Exactly one of the below is true before and after calling a
      // LRUCache method:
      // - first and last are both undefined, and map.size() is 0.
      // - first and last are the same object, and map.size() is 1.
      // - first and last are different objects, and map.size() is greater than 1.

      this.first = undefined;
      this.last = undefined;
      this.maxSize = maxSize;
    }

    _createClass(LRUCache, [{
      key: "size",
      get: function get() {
        return this.map.size;
      }
      /**
       * Gets the specified key from the cache, or undefined if it is not in the
       * cache.
       * @param key The key to get.
       * @returns The cached value, or undefined if key is not in the cache.
       */

    }, {
      key: "get",
      value: function get(key) {
        var node = this.map.get(key);

        if (node === undefined) {
          return undefined;
        } // It is guaranteed that there is at least one item in the cache.
        // Therefore, first and last are guaranteed to be a ListNode...
        // but if there is only one item, they might be the same.
        // Update the order of the list to make this node the first node in the
        // list.
        // This isn't needed if this node is already the first node in the list.


        if (node !== this.first) {
          // As this node is DIFFERENT from the first node, it is guaranteed that
          // there are at least two items in the cache.
          // However, this node could possibly be the last item.
          if (node === this.last) {
            // This node IS the last node.
            this.last = node.prev; // From the invariants, there must be at least two items in the cache,
            // so node - which is the original "last node" - must have a defined
            // previous node. Therefore, this.last - set above - must be defined
            // here.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

            this.last.next = undefined;
          } else {
            // This node is somewhere in the middle of the list, so there must be at
            // least THREE items in the list, and this node's prev and next must be
            // defined here.
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            node.prev.next = node.next; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

            node.next.prev = node.prev;
          }

          node.next = this.first; // From the invariants, there must be at least two items in the cache, so
          // this.first must be a valid ListNode.
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

          this.first.prev = node;
          this.first = node;
        }

        return node.value;
      }
      /**
       * Sets an entry in the cache.
       *
       * @param key The key of the entry.
       * @param value The value of the entry.
       * @throws Error, if the map already contains the key.
       */

    }, {
      key: "set",
      value: function set(key, value) {
        // Ensure that this.maxSize >= 1.
        if (this.maxSize < 1) {
          return;
        }

        if (this.map.has(key)) {
          throw new Error("Cannot update existing keys in the cache");
        }

        var node = new ListNode(key, value); // Move node to the front of the list.

        if (this.first === undefined) {
          // If the first is undefined, the last is undefined too.
          // Therefore, this cache has no items in it.
          this.first = node;
          this.last = node;
        } else {
          // This cache has at least one item in it.
          node.next = this.first;
          this.first.prev = node;
          this.first = node;
        }

        this.map.set(key, node);

        while (this.map.size > this.maxSize) {
          // We are guaranteed that this.maxSize >= 1,
          // so this.map.size is guaranteed to be >= 2,
          // so this.first and this.last must be different valid ListNodes,
          // and this.last.prev must also be a valid ListNode (possibly this.first).
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          var last = this.last;
          this.map["delete"](last.key);
          this.last = last.prev; // eslint-disable-next-line @typescript-eslint/no-non-null-assertion

          this.last.next = undefined;
        }
      }
    }]);

    return LRUCache;
  }();
  /**
   * A node in a doubly linked list.
   */

  var ListNode = /*#__PURE__*/_createClass(function ListNode(key, value) {
    _classCallCheck(this, ListNode);

    this.next = undefined;
    this.prev = undefined;
    this.key = key;
    this.value = value;
  });

  var MAX_SIGNIFICANT_DIGITS = 17; //Maximum number of digits of precision to assume in Number

  var EXP_LIMIT = 9e15; //If we're ABOVE this value, increase a layer. (9e15 is close to the largest integer that can fit in a Number.)

  var LAYER_DOWN = Math.log10(9e15);
  var FIRST_NEG_LAYER = 1 / 9e15; //At layer 0, smaller non-zero numbers than this become layer 1 numbers with negative mag. After that the pattern continues as normal.

  var NUMBER_EXP_MAX = 308; //The largest exponent that can appear in a Number, though not all mantissas are valid here.

  var NUMBER_EXP_MIN = -324; //The smallest exponent that can appear in a Number, though not all mantissas are valid here.

  var MAX_ES_IN_A_ROW = 5; //For default toString behaviour, when to swap from eee... to (e^n) syntax.

  var DEFAULT_FROM_STRING_CACHE_SIZE = (1 << 10) - 1; // The default size of the LRU cache used to cache Decimal.fromString.

  var powerOf10 = function () {
    // We need this lookup table because Math.pow(10, exponent)
    // when exponent's absolute value is large is slightly inaccurate.
    // You can fix it with the power of math... or just make a lookup table.
    // Faster AND simpler
    var powersOf10 = [];

    for (var i = NUMBER_EXP_MIN + 1; i <= NUMBER_EXP_MAX; i++) {
      powersOf10.push(Number("1e" + i));
    }

    var indexOf0InPowersOf10 = 323;
    return function (power) {
      return powersOf10[power + indexOf0InPowersOf10];
    };
  }(); //tetration/slog to real height stuff
  //background info and tables of values for critical functions taken here: https://github.com/Patashu/break_eternity.js/issues/22


  var critical_headers = [2, Math.E, 3, 4, 5, 6, 7, 8, 9, 10];
  var critical_tetr_values = [[// Base 2 (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
  1, 1.0891180521811202527, 1.1789767925673958433, 1.2701455431742086633, 1.3632090180450091941, 1.4587818160364217007, 1.5575237916251418333, 1.6601571006859253673, 1.7674858188369780435, 1.8804192098842727359, 2], [// Base E (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
  1, 1.1121114330934078681, 1.2310389249316089299, 1.3583836963111376089, 1.4960519303993531879, 1.6463542337511945810, 1.8121385357018724464, 1.9969713246183068478, 2.2053895545527544330, 2.4432574483385252544, Math.E //1.0
  ], [// Base 3
  1, 1.1187738849693603, 1.2464963939368214, 1.38527004705667, 1.5376664685821402, 1.7068895236551784, 1.897001227148399, 2.1132403089001035, 2.362480153784171, 2.6539010333870774, 3], [// Base 4
  1, 1.1367350847096405, 1.2889510672956703, 1.4606478703324786, 1.6570295196661111, 1.8850062585672889, 2.1539465047453485, 2.476829779693097, 2.872061932789197, 3.3664204535587183, 4], [// Base 5
  1, 1.1494592900767588, 1.319708228183931, 1.5166291280087583, 1.748171114438024, 2.0253263297298045, 2.3636668498288547, 2.7858359149579424, 3.3257226212448145, 4.035730287722532, 5], [// Base 6
  1, 1.159225940787673, 1.343712473580932, 1.5611293155111927, 1.8221199554561318, 2.14183924486326, 2.542468319282638, 3.0574682501653316, 3.7390572020926873, 4.6719550537360774, 6], [// Base 7
  1, 1.1670905356972596, 1.3632807444991446, 1.5979222279405536, 1.8842640123816674, 2.2416069644878687, 2.69893426559423, 3.3012632110403577, 4.121250340630164, 5.281493033448316, 7], [// Base 8
  1, 1.1736630594087796, 1.379783782386201, 1.6292821855668218, 1.9378971836180754, 2.3289975651071977, 2.8384347394720835, 3.5232708454565906, 4.478242031114584, 5.868592169644505, 8], [// Base 9
  1, 1.1793017514670474, 1.394054150657457, 1.65664127441059, 1.985170999970283, 2.4069682290577457, 2.9647310119960752, 3.7278665320924946, 4.814462547283592, 6.436522247411611, 9], [// Base 10 (using http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html )
  1, 1.1840100246247336579, 1.4061375836156954169, 1.6802272208863963918, 2.026757028388618927, 2.4770056063449647580, 3.0805252717554819987, 3.9191964192627283911, 5.1351528408331864230, 6.9899611795347148455, 10]];
  var critical_slog_values = [[// Base 2
  -1, -0.9194161097107025, -0.8335625019330468, -0.7425599821143978, -0.6466611521029437, -0.5462617907227869, -0.4419033816638769, -0.3342645487554494, -0.224140440909962, -0.11241087890006762, 0], [// Base E
  -1, -0.90603157029014, -0.80786507256596, -0.7064666939634, -0.60294836853664, -0.49849837513117, -0.39430303318768, -0.29147201034755, -0.19097820800866, -0.09361896280296, 0 //1.0
  ], [// Base 3
  -1, -0.9021579584316141, -0.8005762598234203, -0.6964780623319391, -0.5911906810998454, -0.486050182576545, -0.3823089430815083, -0.28106046722897615, -0.1831906535795894, -0.08935809204418144, 0], [// Base 4
  -1, -0.8917227442365535, -0.781258746326964, -0.6705130326902455, -0.5612813129406509, -0.4551067709033134, -0.35319256652135966, -0.2563741554088552, -0.1651412821106526, -0.0796919581982668, 0], [// Base 5
  -1, -0.8843387974366064, -0.7678744063886243, -0.6529563724510552, -0.5415870994657841, -0.4352842206588936, -0.33504449124791424, -0.24138853420685147, -0.15445285440944467, -0.07409659641336663, 0], [// Base 6
  -1, -0.8786709358426346, -0.7577735191184886, -0.6399546189952064, -0.527284921869926, -0.4211627631006314, -0.3223479611761232, -0.23107655627789858, -0.1472057700818259, -0.07035171210706326, 0], [// Base 7
  -1, -0.8740862815291583, -0.7497032990976209, -0.6297119746181752, -0.5161838335958787, -0.41036238255751956, -0.31277212146489963, -0.2233976621705518, -0.1418697367979619, -0.06762117662323441, 0], [// Base 8
  -1, -0.8702632331800649, -0.7430366914122081, -0.6213373075161548, -0.5072025698095242, -0.40171437727184167, -0.30517930701410456, -0.21736343968190863, -0.137710238299109, -0.06550774483471955, 0], [// Base 9
  -1, -0.8670016295947213, -0.7373984232432306, -0.6143173985094293, -0.49973884395492807, -0.394584953527678, -0.2989649949848695, -0.21245647317021688, -0.13434688362382652, -0.0638072667348083, 0], [// Base 10
  -1, -0.8641642839543857, -0.732534623168535, -0.6083127477059322, -0.4934049257184696, -0.3885773075899922, -0.29376029055315767, -0.2083678561173622, -0.13155653399373268, -0.062401588652553186, 0]];

  var D = function D(value) {
    return Decimal.fromValue_noAlloc(value);
  };

  var FC = function FC(sign, layer, mag) {
    return Decimal.fromComponents(sign, layer, mag);
  };

  var FC_NN = function FC_NN(sign, layer, mag) {
    return Decimal.fromComponents_noNormalize(sign, layer, mag);
  }; // eslint-disable-next-line @typescript-eslint/no-unused-vars

  var decimalPlaces = function decimalPlaces(value, places) {
    var len = places + 1;
    var numDigits = Math.ceil(Math.log10(Math.abs(value)));
    var rounded = Math.round(value * Math.pow(10, len - numDigits)) * Math.pow(10, numDigits - len);
    return parseFloat(rounded.toFixed(Math.max(len - numDigits, 0)));
  };

  var f_maglog10 = function f_maglog10(n) {
    return Math.sign(n) * Math.log10(Math.abs(n));
  }; //from HyperCalc source code


  var f_gamma = function f_gamma(n) {
    if (!isFinite(n)) {
      return n;
    }

    if (n < -50) {
      if (n === Math.trunc(n)) {
        return Number.NEGATIVE_INFINITY;
      }

      return 0;
    }

    var scal1 = 1;

    while (n < 10) {
      scal1 = scal1 * n;
      ++n;
    }

    n -= 1;
    var l = 0.9189385332046727; //0.5*Math.log(2*Math.PI)

    l = l + (n + 0.5) * Math.log(n);
    l = l - n;
    var n2 = n * n;
    var np = n;
    l = l + 1 / (12 * np);
    np = np * n2;
    l = l + 1 / (360 * np);
    np = np * n2;
    l = l + 1 / (1260 * np);
    np = np * n2;
    l = l + 1 / (1680 * np);
    np = np * n2;
    l = l + 1 / (1188 * np);
    np = np * n2;
    l = l + 691 / (360360 * np);
    np = np * n2;
    l = l + 7 / (1092 * np);
    np = np * n2;
    l = l + 3617 / (122400 * np);
    return Math.exp(l) / scal1;
  };

  var OMEGA = 0.56714329040978387299997; // W(1, 0)
  //from https://math.stackexchange.com/a/465183
  // The evaluation can become inaccurate very close to the branch point

  var f_lambertw = function f_lambertw(z) {
    var tol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e-10;
    var w;
    var wn;

    if (!Number.isFinite(z)) {
      return z;
    }

    if (z === 0) {
      return z;
    }

    if (z === 1) {
      return OMEGA;
    }

    if (z < 10) {
      w = 0;
    } else {
      w = Math.log(z) - Math.log(Math.log(z));
    }

    for (var i = 0; i < 100; ++i) {
      wn = (z * Math.exp(-w) + w * w) / (w + 1);

      if (Math.abs(wn - w) < tol * Math.abs(wn)) {
        return wn;
      } else {
        w = wn;
      }
    }

    throw Error("Iteration failed to converge: ".concat(z.toString())); //return Number.NaN;
  }; //from https://github.com/scipy/scipy/blob/8dba340293fe20e62e173bdf2c10ae208286692f/scipy/special/lambertw.pxd
  // The evaluation can become inaccurate very close to the branch point
  // at ``-1/e``. In some corner cases, `lambertw` might currently
  // fail to converge, or can end up on the wrong branch.


  function d_lambertw(z) {
    var tol = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1e-10;
    var w;
    var ew, wewz, wn;

    if (!Number.isFinite(z.mag)) {
      return z;
    }

    if (z.eq(Decimal.dZero)) {
      return z;
    }

    if (z.eq(Decimal.dOne)) {
      //Split out this case because the asymptotic series blows up
      return Decimal.fromNumber(OMEGA);
    } //Get an initial guess for Halley's method


    w = Decimal.ln(z); //Halley's method; see 5.9 in [1]

    for (var i = 0; i < 100; ++i) {
      ew = w.neg().exp();
      wewz = w.sub(z.mul(ew));
      wn = w.sub(wewz.div(w.add(1).sub(w.add(2).mul(wewz).div(Decimal.mul(2, w).add(2)))));

      if (Decimal.abs(wn.sub(w)).lt(Decimal.abs(wn).mul(tol))) {
        return wn;
      } else {
        w = wn;
      }
    }

    throw Error("Iteration failed to converge: ".concat(z.toString())); //return Decimal.dNaN;
  }
  /**
   * The Decimal's value is simply mantissa * 10^exponent.
   */


  var Decimal = /*#__PURE__*/function () {
    function Decimal(value) {
      _classCallCheck(this, Decimal);

      this.sign = 0;
      this.mag = 0;
      this.layer = 0;

      if (value instanceof Decimal) {
        this.fromDecimal(value);
      } else if (typeof value === "number") {
        this.fromNumber(value);
      } else if (typeof value === "string") {
        this.fromString(value);
      }
    }

    _createClass(Decimal, [{
      key: "m",
      get: function get() {
        if (this.sign === 0) {
          return 0;
        } else if (this.layer === 0) {
          var exp = Math.floor(Math.log10(this.mag)); //handle special case 5e-324

          var man;

          if (this.mag === 5e-324) {
            man = 5;
          } else {
            man = this.mag / powerOf10(exp);
          }

          return this.sign * man;
        } else if (this.layer === 1) {
          var residue = this.mag - Math.floor(this.mag);
          return this.sign * Math.pow(10, residue);
        } else {
          //mantissa stops being relevant past 1e9e15 / ee15.954
          return this.sign;
        }
      },
      set: function set(value) {
        if (this.layer <= 2) {
          this.fromMantissaExponent(value, this.e);
        } else {
          //don't even pretend mantissa is meaningful
          this.sign = Math.sign(value);

          if (this.sign === 0) {
            this.layer = 0;
            this.exponent = 0;
          }
        }
      }
    }, {
      key: "e",
      get: function get() {
        if (this.sign === 0) {
          return 0;
        } else if (this.layer === 0) {
          return Math.floor(Math.log10(this.mag));
        } else if (this.layer === 1) {
          return Math.floor(this.mag);
        } else if (this.layer === 2) {
          return Math.floor(Math.sign(this.mag) * Math.pow(10, Math.abs(this.mag)));
        } else {
          return this.mag * Number.POSITIVE_INFINITY;
        }
      },
      set: function set(value) {
        this.fromMantissaExponent(this.m, value);
      }
    }, {
      key: "s",
      get: function get() {
        return this.sign;
      },
      set: function set(value) {
        if (value === 0) {
          this.sign = 0;
          this.layer = 0;
          this.mag = 0;
        } else {
          this.sign = value;
        }
      } // Object.defineProperty(Decimal.prototype, "mantissa", {

    }, {
      key: "mantissa",
      get: function get() {
        return this.m;
      },
      set: function set(value) {
        this.m = value;
      }
    }, {
      key: "exponent",
      get: function get() {
        return this.e;
      },
      set: function set(value) {
        this.e = value;
      }
    }, {
      key: "normalize",
      value: function normalize() {
        /*
        PSEUDOCODE:
        Whenever we are partially 0 (sign is 0 or mag and layer is 0), make it fully 0.
        Whenever we are at or hit layer 0, extract sign from negative mag.
        If layer === 0 and mag < FIRST_NEG_LAYER (1/9e15), shift to 'first negative layer' (add layer, log10 mag).
        While abs(mag) > EXP_LIMIT (9e15), layer += 1, mag = maglog10(mag).
        While abs(mag) < LAYER_DOWN (15.954) and layer > 0, layer -= 1, mag = pow(10, mag).
              When we're done, all of the following should be true OR one of the numbers is not IsFinite OR layer is not IsInteger (error state):
        Any 0 is totally zero (0, 0, 0).
        Anything layer 0 has mag 0 OR mag > 1/9e15 and < 9e15.
        Anything layer 1 or higher has abs(mag) >= 15.954 and < 9e15.
        We will assume in calculations that all Decimals are either erroneous or satisfy these criteria. (Otherwise: Garbage in, garbage out.)
        */
        if (this.sign === 0 || this.mag === 0 && this.layer === 0) {
          this.sign = 0;
          this.mag = 0;
          this.layer = 0;
          return this;
        }

        if (this.layer === 0 && this.mag < 0) {
          //extract sign from negative mag at layer 0
          this.mag = -this.mag;
          this.sign = -this.sign;
        } //Handle shifting from layer 0 to negative layers.


        if (this.layer === 0 && this.mag < FIRST_NEG_LAYER) {
          this.layer += 1;
          this.mag = Math.log10(this.mag);
          return this;
        }

        var absmag = Math.abs(this.mag);
        var signmag = Math.sign(this.mag);

        if (absmag >= EXP_LIMIT) {
          this.layer += 1;
          this.mag = signmag * Math.log10(absmag);
          return this;
        } else {
          while (absmag < LAYER_DOWN && this.layer > 0) {
            this.layer -= 1;

            if (this.layer === 0) {
              this.mag = Math.pow(10, this.mag);
            } else {
              this.mag = signmag * Math.pow(10, absmag);
              absmag = Math.abs(this.mag);
              signmag = Math.sign(this.mag);
            }
          }

          if (this.layer === 0) {
            if (this.mag < 0) {
              //extract sign from negative mag at layer 0
              this.mag = -this.mag;
              this.sign = -this.sign;
            } else if (this.mag === 0) {
              //excessive rounding can give us all zeroes
              this.sign = 0;
            }
          }
        }

        return this;
      }
    }, {
      key: "fromComponents",
      value: function fromComponents(sign, layer, mag) {
        this.sign = sign;
        this.layer = layer;
        this.mag = mag;
        this.normalize();
        return this;
      }
    }, {
      key: "fromComponents_noNormalize",
      value: function fromComponents_noNormalize(sign, layer, mag) {
        this.sign = sign;
        this.layer = layer;
        this.mag = mag;
        return this;
      }
    }, {
      key: "fromMantissaExponent",
      value: function fromMantissaExponent(mantissa, exponent) {
        this.layer = 1;
        this.sign = Math.sign(mantissa);
        mantissa = Math.abs(mantissa);
        this.mag = exponent + Math.log10(mantissa);
        this.normalize();
        return this;
      }
    }, {
      key: "fromMantissaExponent_noNormalize",
      value: function fromMantissaExponent_noNormalize(mantissa, exponent) {
        //The idea of 'normalizing' a break_infinity.js style Decimal doesn't really apply. So just do the same thing.
        this.fromMantissaExponent(mantissa, exponent);
        return this;
      }
    }, {
      key: "fromDecimal",
      value: function fromDecimal(value) {
        this.sign = value.sign;
        this.layer = value.layer;
        this.mag = value.mag;
        return this;
      }
    }, {
      key: "fromNumber",
      value: function fromNumber(value) {
        this.mag = Math.abs(value);
        this.sign = Math.sign(value);
        this.layer = 0;
        this.normalize();
        return this;
      }
    }, {
      key: "fromString",
      value: function fromString(value) {
        var originalValue = value;
        var cached = Decimal.fromStringCache.get(originalValue);

        if (cached !== undefined) {
          return this.fromDecimal(cached);
        }

        {
          value = value.replace(",", "");
        } //Handle x^^^y format.


        var pentationparts = value.split("^^^");

        if (pentationparts.length === 2) {
          var _base = parseFloat(pentationparts[0]);

          var _height = parseFloat(pentationparts[1]);

          var heightparts = pentationparts[1].split(";");
          var payload = 1;

          if (heightparts.length === 2) {
            payload = parseFloat(heightparts[1]);

            if (!isFinite(payload)) {
              payload = 1;
            }
          }

          if (isFinite(_base) && isFinite(_height)) {
            var result = Decimal.pentate(_base, _height, payload);
            this.sign = result.sign;
            this.layer = result.layer;
            this.mag = result.mag;

            if (Decimal.fromStringCache.maxSize >= 1) {
              Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
            }

            return this;
          }
        } //Handle x^^y format.


        var tetrationparts = value.split("^^");

        if (tetrationparts.length === 2) {
          var _base2 = parseFloat(tetrationparts[0]);

          var _height2 = parseFloat(tetrationparts[1]);

          var _heightparts = tetrationparts[1].split(";");

          var _payload = 1;

          if (_heightparts.length === 2) {
            _payload = parseFloat(_heightparts[1]);

            if (!isFinite(_payload)) {
              _payload = 1;
            }
          }

          if (isFinite(_base2) && isFinite(_height2)) {
            var _result = Decimal.tetrate(_base2, _height2, _payload);

            this.sign = _result.sign;
            this.layer = _result.layer;
            this.mag = _result.mag;

            if (Decimal.fromStringCache.maxSize >= 1) {
              Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
            }

            return this;
          }
        } //Handle x^y format.


        var powparts = value.split("^");

        if (powparts.length === 2) {
          var _base3 = parseFloat(powparts[0]);

          var _exponent = parseFloat(powparts[1]);

          if (isFinite(_base3) && isFinite(_exponent)) {
            var _result2 = Decimal.pow(_base3, _exponent);

            this.sign = _result2.sign;
            this.layer = _result2.layer;
            this.mag = _result2.mag;

            if (Decimal.fromStringCache.maxSize >= 1) {
              Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
            }

            return this;
          }
        } //Handle various cases involving it being a Big Number.


        value = value.trim().toLowerCase(); //handle X PT Y format.

        var base;
        var height;
        var ptparts = value.split("pt");

        if (ptparts.length === 2) {
          base = 10;
          height = parseFloat(ptparts[0]);
          ptparts[1] = ptparts[1].replace("(", "");
          ptparts[1] = ptparts[1].replace(")", "");

          var _payload2 = parseFloat(ptparts[1]);

          if (!isFinite(_payload2)) {
            _payload2 = 1;
          }

          if (isFinite(base) && isFinite(height)) {
            var _result3 = Decimal.tetrate(base, height, _payload2);

            this.sign = _result3.sign;
            this.layer = _result3.layer;
            this.mag = _result3.mag;

            if (Decimal.fromStringCache.maxSize >= 1) {
              Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
            }

            return this;
          }
        } //handle XpY format (it's the same thing just with p).


        ptparts = value.split("p");

        if (ptparts.length === 2) {
          base = 10;
          height = parseFloat(ptparts[0]);
          ptparts[1] = ptparts[1].replace("(", "");
          ptparts[1] = ptparts[1].replace(")", "");

          var _payload3 = parseFloat(ptparts[1]);

          if (!isFinite(_payload3)) {
            _payload3 = 1;
          }

          if (isFinite(base) && isFinite(height)) {
            var _result4 = Decimal.tetrate(base, height, _payload3);

            this.sign = _result4.sign;
            this.layer = _result4.layer;
            this.mag = _result4.mag;

            if (Decimal.fromStringCache.maxSize >= 1) {
              Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
            }

            return this;
          }
        }

        var parts = value.split("e");
        var ecount = parts.length - 1; //Handle numbers that are exactly floats (0 or 1 es).

        if (ecount === 0) {
          var numberAttempt = parseFloat(value);

          if (isFinite(numberAttempt)) {
            this.fromNumber(numberAttempt);

            if (Decimal.fromStringCache.size >= 1) {
              Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
            }

            return this;
          }
        } else if (ecount === 1) {
          //Very small numbers ("2e-3000" and so on) may look like valid floats but round to 0.
          var _numberAttempt = parseFloat(value);

          if (isFinite(_numberAttempt) && _numberAttempt !== 0) {
            this.fromNumber(_numberAttempt);

            if (Decimal.fromStringCache.maxSize >= 1) {
              Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
            }

            return this;
          }
        } //Handle new (e^N)X format.


        var newparts = value.split("e^");

        if (newparts.length === 2) {
          this.sign = 1;

          if (newparts[0].charAt(0) == "-") {
            this.sign = -1;
          }

          var layerstring = "";

          for (var i = 0; i < newparts[1].length; ++i) {
            var chrcode = newparts[1].charCodeAt(i);

            if (chrcode >= 43 && chrcode <= 57 || chrcode === 101) {
              //is "0" to "9" or "+" or "-" or "." or "e" (or "," or "/")
              layerstring += newparts[1].charAt(i);
            } //we found the end of the layer count
            else {
              this.layer = parseFloat(layerstring);
              this.mag = parseFloat(newparts[1].substr(i + 1));
              this.normalize();

              if (Decimal.fromStringCache.maxSize >= 1) {
                Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
              }

              return this;
            }
          }
        }

        if (ecount < 1) {
          this.sign = 0;
          this.layer = 0;
          this.mag = 0;

          if (Decimal.fromStringCache.maxSize >= 1) {
            Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
          }

          return this;
        }

        var mantissa = parseFloat(parts[0]);

        if (mantissa === 0) {
          this.sign = 0;
          this.layer = 0;
          this.mag = 0;

          if (Decimal.fromStringCache.maxSize >= 1) {
            Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
          }

          return this;
        }

        var exponent = parseFloat(parts[parts.length - 1]); //handle numbers like AeBeC and AeeeeBeC

        if (ecount >= 2) {
          var me = parseFloat(parts[parts.length - 2]);

          if (isFinite(me)) {
            exponent *= Math.sign(me);
            exponent += f_maglog10(me);
          }
        } //Handle numbers written like eee... (N es) X


        if (!isFinite(mantissa)) {
          this.sign = parts[0] === "-" ? -1 : 1;
          this.layer = ecount;
          this.mag = exponent;
        } //Handle numbers written like XeY
        else if (ecount === 1) {
          this.sign = Math.sign(mantissa);
          this.layer = 1; //Example: 2e10 is equal to 10^log10(2e10) which is equal to 10^(10+log10(2))

          this.mag = exponent + Math.log10(Math.abs(mantissa));
        } //Handle numbers written like Xeee... (N es) Y
        else {
          this.sign = Math.sign(mantissa);
          this.layer = ecount;

          if (ecount === 2) {
            var _result5 = Decimal.mul(FC(1, 2, exponent), D(mantissa));

            this.sign = _result5.sign;
            this.layer = _result5.layer;
            this.mag = _result5.mag;

            if (Decimal.fromStringCache.maxSize >= 1) {
              Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
            }

            return this;
          } else {
            //at eee and above, mantissa is too small to be recognizable!
            this.mag = exponent;
          }
        }

        this.normalize();

        if (Decimal.fromStringCache.maxSize >= 1) {
          Decimal.fromStringCache.set(originalValue, Decimal.fromDecimal(this));
        }

        return this;
      }
    }, {
      key: "fromValue",
      value: function fromValue(value) {
        if (value instanceof Decimal) {
          return this.fromDecimal(value);
        }

        if (typeof value === "number") {
          return this.fromNumber(value);
        }

        if (typeof value === "string") {
          return this.fromString(value);
        }

        this.sign = 0;
        this.layer = 0;
        this.mag = 0;
        return this;
      }
    }, {
      key: "toNumber",
      value: function toNumber() {
        if (!Number.isFinite(this.layer)) {
          return Number.NaN;
        }

        if (this.layer === 0) {
          return this.sign * this.mag;
        } else if (this.layer === 1) {
          return this.sign * Math.pow(10, this.mag);
        } //overflow for any normalized Decimal
        else {
          return this.mag > 0 ? this.sign > 0 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : 0;
        }
      }
    }, {
      key: "mantissaWithDecimalPlaces",
      value: function mantissaWithDecimalPlaces(places) {
        // https://stackoverflow.com/a/37425022
        if (isNaN(this.m)) {
          return Number.NaN;
        }

        if (this.m === 0) {
          return 0;
        }

        return decimalPlaces(this.m, places);
      }
    }, {
      key: "magnitudeWithDecimalPlaces",
      value: function magnitudeWithDecimalPlaces(places) {
        // https://stackoverflow.com/a/37425022
        if (isNaN(this.mag)) {
          return Number.NaN;
        }

        if (this.mag === 0) {
          return 0;
        }

        return decimalPlaces(this.mag, places);
      }
    }, {
      key: "toString",
      value: function toString() {
        if (isNaN(this.layer) || isNaN(this.sign) || isNaN(this.mag)) {
          return "NaN";
        }

        if (this.mag === Number.POSITIVE_INFINITY || this.layer === Number.POSITIVE_INFINITY) {
          return this.sign === 1 ? "Infinity" : "-Infinity";
        }

        if (this.layer === 0) {
          if (this.mag < 1e21 && this.mag > 1e-7 || this.mag === 0) {
            return (this.sign * this.mag).toString();
          }

          return this.m + "e" + this.e;
        } else if (this.layer === 1) {
          return this.m + "e" + this.e;
        } else {
          //layer 2+
          if (this.layer <= MAX_ES_IN_A_ROW) {
            return (this.sign === -1 ? "-" : "") + "e".repeat(this.layer) + this.mag;
          } else {
            return (this.sign === -1 ? "-" : "") + "(e^" + this.layer + ")" + this.mag;
          }
        }
      }
    }, {
      key: "toExponential",
      value: function toExponential(places) {
        if (this.layer === 0) {
          return (this.sign * this.mag).toExponential(places);
        }

        return this.toStringWithDecimalPlaces(places);
      }
    }, {
      key: "toFixed",
      value: function toFixed(places) {
        if (this.layer === 0) {
          return (this.sign * this.mag).toFixed(places);
        }

        return this.toStringWithDecimalPlaces(places);
      }
    }, {
      key: "toPrecision",
      value: function toPrecision(places) {
        if (this.e <= -7) {
          return this.toExponential(places - 1);
        }

        if (places > this.e) {
          return this.toFixed(places - this.exponent - 1);
        }

        return this.toExponential(places - 1);
      }
    }, {
      key: "valueOf",
      value: function valueOf() {
        return this.toString();
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        return this.toString();
      }
    }, {
      key: "toStringWithDecimalPlaces",
      value: function toStringWithDecimalPlaces(places) {
        if (this.layer === 0) {
          if (this.mag < 1e21 && this.mag > 1e-7 || this.mag === 0) {
            return (this.sign * this.mag).toFixed(places);
          }

          return decimalPlaces(this.m, places) + "e" + decimalPlaces(this.e, places);
        } else if (this.layer === 1) {
          return decimalPlaces(this.m, places) + "e" + decimalPlaces(this.e, places);
        } else {
          //layer 2+
          if (this.layer <= MAX_ES_IN_A_ROW) {
            return (this.sign === -1 ? "-" : "") + "e".repeat(this.layer) + decimalPlaces(this.mag, places);
          } else {
            return (this.sign === -1 ? "-" : "") + "(e^" + this.layer + ")" + decimalPlaces(this.mag, places);
          }
        }
      }
    }, {
      key: "abs",
      value: function abs() {
        return FC_NN(this.sign === 0 ? 0 : 1, this.layer, this.mag);
      }
    }, {
      key: "neg",
      value: function neg() {
        return FC_NN(-this.sign, this.layer, this.mag);
      }
    }, {
      key: "negate",
      value: function negate() {
        return this.neg();
      }
    }, {
      key: "negated",
      value: function negated() {
        return this.neg();
      } // public sign () {
      //     return this.sign;
      //   }

    }, {
      key: "sgn",
      value: function sgn() {
        return this.sign;
      }
    }, {
      key: "round",
      value: function round() {
        if (this.mag < 0) {
          return Decimal.dZero;
        }

        if (this.layer === 0) {
          return FC(this.sign, 0, Math.round(this.mag));
        }

        return this;
      }
    }, {
      key: "floor",
      value: function floor() {
        if (this.mag < 0) {
          return Decimal.dZero;
        }

        if (this.layer === 0) {
          return FC(this.sign, 0, Math.floor(this.mag));
        }

        return this;
      }
    }, {
      key: "ceil",
      value: function ceil() {
        if (this.mag < 0) {
          return Decimal.dZero;
        }

        if (this.layer === 0) {
          return FC(this.sign, 0, Math.ceil(this.mag));
        }

        return this;
      }
    }, {
      key: "trunc",
      value: function trunc() {
        if (this.mag < 0) {
          return Decimal.dZero;
        }

        if (this.layer === 0) {
          return FC(this.sign, 0, Math.trunc(this.mag));
        }

        return this;
      }
    }, {
      key: "add",
      value: function add(value) {
        var decimal = D(value); //inf/nan check

        if (!Number.isFinite(this.layer)) {
          return this;
        }

        if (!Number.isFinite(decimal.layer)) {
          return decimal;
        } //Special case - if one of the numbers is 0, return the other number.


        if (this.sign === 0) {
          return decimal;
        }

        if (decimal.sign === 0) {
          return this;
        } //Special case - Adding a number to its negation produces 0, no matter how large.


        if (this.sign === -decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag) {
          return FC_NN(0, 0, 0);
        }

        var a;
        var b; //Special case: If one of the numbers is layer 2 or higher, just take the bigger number.

        if (this.layer >= 2 || decimal.layer >= 2) {
          return this.maxabs(decimal);
        }

        if (Decimal.cmpabs(this, decimal) > 0) {
          a = this;
          b = decimal;
        } else {
          a = decimal;
          b = this;
        }

        if (a.layer === 0 && b.layer === 0) {
          return Decimal.fromNumber(a.sign * a.mag + b.sign * b.mag);
        }

        var layera = a.layer * Math.sign(a.mag);
        var layerb = b.layer * Math.sign(b.mag); //If one of the numbers is 2+ layers higher than the other, just take the bigger number.

        if (layera - layerb >= 2) {
          return a;
        }

        if (layera === 0 && layerb === -1) {
          if (Math.abs(b.mag - Math.log10(a.mag)) > MAX_SIGNIFICANT_DIGITS) {
            return a;
          } else {
            var magdiff = Math.pow(10, Math.log10(a.mag) - b.mag);
            var mantissa = b.sign + a.sign * magdiff;
            return FC(Math.sign(mantissa), 1, b.mag + Math.log10(Math.abs(mantissa)));
          }
        }

        if (layera === 1 && layerb === 0) {
          if (Math.abs(a.mag - Math.log10(b.mag)) > MAX_SIGNIFICANT_DIGITS) {
            return a;
          } else {
            var _magdiff = Math.pow(10, a.mag - Math.log10(b.mag));

            var _mantissa = b.sign + a.sign * _magdiff;

            return FC(Math.sign(_mantissa), 1, Math.log10(b.mag) + Math.log10(Math.abs(_mantissa)));
          }
        }

        if (Math.abs(a.mag - b.mag) > MAX_SIGNIFICANT_DIGITS) {
          return a;
        } else {
          var _magdiff2 = Math.pow(10, a.mag - b.mag);

          var _mantissa2 = b.sign + a.sign * _magdiff2;

          return FC(Math.sign(_mantissa2), 1, b.mag + Math.log10(Math.abs(_mantissa2)));
        }
      }
    }, {
      key: "plus",
      value: function plus(value) {
        return this.add(value);
      }
    }, {
      key: "sub",
      value: function sub(value) {
        return this.add(D(value).neg());
      }
    }, {
      key: "subtract",
      value: function subtract(value) {
        return this.sub(value);
      }
    }, {
      key: "minus",
      value: function minus(value) {
        return this.sub(value);
      }
    }, {
      key: "mul",
      value: function mul(value) {
        var decimal = D(value); //inf/nan check

        if (!Number.isFinite(this.layer)) {
          return this;
        }

        if (!Number.isFinite(decimal.layer)) {
          return decimal;
        } //Special case - if one of the numbers is 0, return 0.


        if (this.sign === 0 || decimal.sign === 0) {
          return FC_NN(0, 0, 0);
        } //Special case - Multiplying a number by its own reciprocal yields +/- 1, no matter how large.


        if (this.layer === decimal.layer && this.mag === -decimal.mag) {
          return FC_NN(this.sign * decimal.sign, 0, 1);
        }

        var a;
        var b; //Which number is bigger in terms of its multiplicative distance from 1?

        if (this.layer > decimal.layer || this.layer == decimal.layer && Math.abs(this.mag) > Math.abs(decimal.mag)) {
          a = this;
          b = decimal;
        } else {
          a = decimal;
          b = this;
        }

        if (a.layer === 0 && b.layer === 0) {
          return Decimal.fromNumber(a.sign * b.sign * a.mag * b.mag);
        } //Special case: If one of the numbers is layer 3 or higher or one of the numbers is 2+ layers bigger than the other, just take the bigger number.


        if (a.layer >= 3 || a.layer - b.layer >= 2) {
          return FC(a.sign * b.sign, a.layer, a.mag);
        }

        if (a.layer === 1 && b.layer === 0) {
          return FC(a.sign * b.sign, 1, a.mag + Math.log10(b.mag));
        }

        if (a.layer === 1 && b.layer === 1) {
          return FC(a.sign * b.sign, 1, a.mag + b.mag);
        }

        if (a.layer === 2 && b.layer === 1) {
          var newmag = FC(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(FC(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag)));
          return FC(a.sign * b.sign, newmag.layer + 1, newmag.sign * newmag.mag);
        }

        if (a.layer === 2 && b.layer === 2) {
          var _newmag = FC(Math.sign(a.mag), a.layer - 1, Math.abs(a.mag)).add(FC(Math.sign(b.mag), b.layer - 1, Math.abs(b.mag)));

          return FC(a.sign * b.sign, _newmag.layer + 1, _newmag.sign * _newmag.mag);
        }

        throw Error("Bad arguments to mul: " + this + ", " + value);
      }
    }, {
      key: "multiply",
      value: function multiply(value) {
        return this.mul(value);
      }
    }, {
      key: "times",
      value: function times(value) {
        return this.mul(value);
      }
    }, {
      key: "div",
      value: function div(value) {
        var decimal = D(value);
        return this.mul(decimal.recip());
      }
    }, {
      key: "divide",
      value: function divide(value) {
        return this.div(value);
      }
    }, {
      key: "divideBy",
      value: function divideBy(value) {
        return this.div(value);
      }
    }, {
      key: "dividedBy",
      value: function dividedBy(value) {
        return this.div(value);
      }
    }, {
      key: "recip",
      value: function recip() {
        if (this.mag === 0) {
					console.log("Divide by 0 error! Divided resource set to 0 as an emergency, please mention this on the discord!")
          return Decimal.dZero;
        } else if (this.layer === 0) {
          return FC(this.sign, 0, 1 / this.mag);
        } else {
          return FC(this.sign, this.layer, -this.mag);
        }
      }
    }, {
      key: "reciprocal",
      value: function reciprocal() {
        return this.recip();
      }
    }, {
      key: "reciprocate",
      value: function reciprocate() {
        return this.recip();
      }
      /**
       * -1 for less than value, 0 for equals value, 1 for greater than value
       */

    }, {
      key: "cmp",
      value: function cmp(value) {
        var decimal = D(value);

        if (this.sign > decimal.sign) {
          return 1;
        }

        if (this.sign < decimal.sign) {
          return -1;
        }

        return this.sign * this.cmpabs(value);
      }
    }, {
      key: "cmpabs",
      value: function cmpabs(value) {
        var decimal = D(value);
        var layera = this.mag > 0 ? this.layer : -this.layer;
        var layerb = decimal.mag > 0 ? decimal.layer : -decimal.layer;

        if (layera > layerb) {
          return 1;
        }

        if (layera < layerb) {
          return -1;
        }

        if (this.mag > decimal.mag) {
          return 1;
        }

        if (this.mag < decimal.mag) {
          return -1;
        }

        return 0;
      }
    }, {
      key: "compare",
      value: function compare(value) {
        return this.cmp(value);
      }
    }, {
      key: "isNan",
      value: function isNan() {
        return isNaN(this.sign) || isNaN(this.layer) || isNaN(this.mag);
      }
    }, {
      key: "isFinite",
      value: function (_isFinite2) {
        function isFinite() {
          return _isFinite2.apply(this, arguments);
        }

        isFinite.toString = function () {
          return _isFinite2.toString();
        };

        return isFinite;
      }(function () {
        return isFinite(this.sign) && isFinite(this.layer) && isFinite(this.mag);
      })
    }, {
      key: "eq",
      value: function eq(value) {
        var decimal = D(value);
        return this.sign === decimal.sign && this.layer === decimal.layer && this.mag === decimal.mag;
      }
    }, {
      key: "equals",
      value: function equals(value) {
        return this.eq(value);
      }
    }, {
      key: "neq",
      value: function neq(value) {
        return !this.eq(value);
      }
    }, {
      key: "notEquals",
      value: function notEquals(value) {
        return this.neq(value);
      }
    }, {
      key: "lt",
      value: function lt(value) {
        return this.cmp(value) === -1;
      }
    }, {
      key: "lte",
      value: function lte(value) {
        return !this.gt(value);
      }
    }, {
      key: "gt",
      value: function gt(value) {
        return this.cmp(value) === 1;
      }
    }, {
      key: "gte",
      value: function gte(value) {
        return !this.lt(value);
      }
    }, {
      key: "max",
      value: function max(value) {
        var decimal = D(value);
        return this.lt(decimal) ? decimal : this;
      }
    }, {
      key: "min",
      value: function min(value) {
        var decimal = D(value);
        return this.gt(decimal) ? decimal : this;
      }
    }, {
      key: "maxabs",
      value: function maxabs(value) {
        var decimal = D(value);
        return this.cmpabs(decimal) < 0 ? decimal : this;
      }
    }, {
      key: "minabs",
      value: function minabs(value) {
        var decimal = D(value);
        return this.cmpabs(decimal) > 0 ? decimal : this;
      }
    }, {
      key: "clamp",
      value: function clamp(min, max) {
        return this.max(min).min(max);
      }
    }, {
      key: "clampMin",
      value: function clampMin(min) {
        return this.max(min);
      }
    }, {
      key: "clampMax",
      value: function clampMax(max) {
        return this.min(max);
      }
    }, {
      key: "cmp_tolerance",
      value: function cmp_tolerance(value, tolerance) {
        var decimal = D(value);
        return this.eq_tolerance(decimal, tolerance) ? 0 : this.cmp(decimal);
      }
    }, {
      key: "compare_tolerance",
      value: function compare_tolerance(value, tolerance) {
        return this.cmp_tolerance(value, tolerance);
      }
      /**
       * Tolerance is a relative tolerance, multiplied by the greater of the magnitudes of the two arguments.
       * For example, if you put in 1e-9, then any number closer to the
       * larger number than (larger number)*1e-9 will be considered equal.
       */

    }, {
      key: "eq_tolerance",
      value: function eq_tolerance(value, tolerance) {
        var decimal = D(value); // https://stackoverflow.com/a/33024979

        if (tolerance == null) {
          tolerance = 1e-7;
        } //Numbers that are too far away are never close.


        if (this.sign !== decimal.sign) {
          return false;
        }

        if (Math.abs(this.layer - decimal.layer) > 1) {
          return false;
        } // return abs(a-b) <= tolerance * max(abs(a), abs(b))


        var magA = this.mag;
        var magB = decimal.mag;

        if (this.layer > decimal.layer) {
          magB = f_maglog10(magB);
        }

        if (this.layer < decimal.layer) {
          magA = f_maglog10(magA);
        }

        return Math.abs(magA - magB) <= tolerance * Math.max(Math.abs(magA), Math.abs(magB));
      }
    }, {
      key: "equals_tolerance",
      value: function equals_tolerance(value, tolerance) {
        return this.eq_tolerance(value, tolerance);
      }
    }, {
      key: "neq_tolerance",
      value: function neq_tolerance(value, tolerance) {
        return !this.eq_tolerance(value, tolerance);
      }
    }, {
      key: "notEquals_tolerance",
      value: function notEquals_tolerance(value, tolerance) {
        return this.neq_tolerance(value, tolerance);
      }
    }, {
      key: "lt_tolerance",
      value: function lt_tolerance(value, tolerance) {
        var decimal = D(value);
        return !this.eq_tolerance(decimal, tolerance) && this.lt(decimal);
      }
    }, {
      key: "lte_tolerance",
      value: function lte_tolerance(value, tolerance) {
        var decimal = D(value);
        return this.eq_tolerance(decimal, tolerance) || this.lt(decimal);
      }
    }, {
      key: "gt_tolerance",
      value: function gt_tolerance(value, tolerance) {
        var decimal = D(value);
        return !this.eq_tolerance(decimal, tolerance) && this.gt(decimal);
      }
    }, {
      key: "gte_tolerance",
      value: function gte_tolerance(value, tolerance) {
        var decimal = D(value);
        return this.eq_tolerance(decimal, tolerance) || this.gt(decimal);
      }
    }, {
      key: "pLog10",
      value: function pLog10() {
        if (this.lt(Decimal.dZero)) {
          return Decimal.dZero;
        }

        return this.log10();
      }
    }, {
      key: "absLog10",
      value: function absLog10() {
        if (this.sign === 0) {
					console.log("Log(0) error! Divided resource set to 0 as an emergency, please mention this on the discord!")
          return Decimal.dZero;
        } else if (this.layer > 0) {
          return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
        } else {
          return FC(1, 0, Math.log10(this.mag));
        }
      }
    }, {
      key: "log10",
      value: function log10() {
        if (this.sign <= 0) {
					console.log("Log(0) error! Divided resource set to 0 as an emergency, please mention this on the discord!")
          return Decimal.dZero;
        } else if (this.layer > 0) {
          return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
        } else {
          return FC(this.sign, 0, Math.log10(this.mag));
        }
      }
    }, {
      key: "log",
      value: function log(base) {
        base = D(base);

        if (this.sign <= 0) {
					console.log("Log(0) error! Divided resource set to 0 as an emergency, please mention this on the discord!")
          return Decimal.dZero;
        }

        if (base.sign <= 0) {
					console.log("Log(0) error! Divided resource set to 0 as an emergency, please mention this on the discord!")
          return Decimal.Zero;
        }

        if (base.sign === 1 && base.layer === 0 && base.mag === 1) {
          return Decimal.dZero;
        } else if (this.layer === 0 && base.layer === 0) {
          return FC(this.sign, 0, Math.log(this.mag) / Math.log(base.mag));
        }

        return Decimal.div(this.log10(), base.log10());
      }
    }, {
      key: "log2",
      value: function log2() {
        if (this.sign <= 0) {
          return Decimal.dZero;
        } else if (this.layer === 0) {
          return FC(this.sign, 0, Math.log2(this.mag));
        } else if (this.layer === 1) {
          return FC(Math.sign(this.mag), 0, Math.abs(this.mag) * 3.321928094887362); //log2(10)
        } else if (this.layer === 2) {
          return FC(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.5213902276543247); //-log10(log10(2))
        } else {
          return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
        }
      }
    }, {
      key: "ln",
      value: function ln() {
        if (this.sign <= 0) {
          return Decimal.dZero;
        } else if (this.layer === 0) {
          return FC(this.sign, 0, Math.log(this.mag));
        } else if (this.layer === 1) {
          return FC(Math.sign(this.mag), 0, Math.abs(this.mag) * 2.302585092994046); //ln(10)
        } else if (this.layer === 2) {
          return FC(Math.sign(this.mag), 1, Math.abs(this.mag) + 0.36221568869946325); //log10(log10(e))
        } else {
          return FC(Math.sign(this.mag), this.layer - 1, Math.abs(this.mag));
        }
      }
    }, {
      key: "logarithm",
      value: function logarithm(base) {
        return this.log(base);
      }
    }, {
      key: "pow",
      value: function pow(value) {
        var decimal = D(value);
        var a = this;
        var b = decimal; //special case: if a is 0, then return 0 (UNLESS b is 0, then return 1)

        if (a.sign === 0) {
          return b.eq(0) ? FC_NN(1, 0, 1) : a;
        } //special case: if a is 1, then return 1


        if (a.sign === 1 && a.layer === 0 && a.mag === 1) {
          return a;
        } //special case: if b is 0, then return 1


        if (b.sign === 0) {
          return FC_NN(1, 0, 1);
        } //special case: if b is 1, then return a


        if (b.sign === 1 && b.layer === 0 && b.mag === 1) {
          return a;
        }

        var result = a.absLog10().mul(b).pow10();

        if (this.sign === -1) {
          if (Math.abs(b.toNumber() % 2) % 2 === 1) {
            return result.neg();
          } else if (Math.abs(b.toNumber() % 2) % 2 === 0) {
            return result;
          }

					console.log("Exponentiation error! Divided resource set to 0 as an emergency, please mention this on the discord!")
          return Decimal.dZero;
        }

        return result;
      }
    }, {
      key: "pow10",
      value: function pow10() {
        /*
        There are four cases we need to consider:
        1) positive sign, positive mag (e15, ee15): +1 layer (e.g. 10^15 becomes e15, 10^e15 becomes ee15)
        2) negative sign, positive mag (-e15, -ee15): +1 layer but sign and mag sign are flipped (e.g. 10^-15 becomes e-15, 10^-e15 becomes ee-15)
        3) positive sign, negative mag (e-15, ee-15): layer 0 case would have been handled in the Math.pow check, so just return 1
        4) negative sign, negative mag (-e-15, -ee-15): layer 0 case would have been handled in the Math.pow check, so just return 1
        */
        if (!Number.isFinite(this.layer) || !Number.isFinite(this.mag)) {
          console.log("Exponentiation error! Divided resource set to 0 as an emergency, please mention this on the discord!")
          return Decimal.dZero;
        }

        var a = this; //handle layer 0 case - if no precision is lost just use Math.pow, else promote one layer

        if (a.layer === 0) {
          var newmag = Math.pow(10, a.sign * a.mag);

          if (Number.isFinite(newmag) && Math.abs(newmag) >= 0.1) {
            return FC(1, 0, newmag);
          } else {
            if (a.sign === 0) {
              return Decimal.dOne;
            } else {
              a = FC_NN(a.sign, a.layer + 1, Math.log10(a.mag));
            }
          }
        } //handle all 4 layer 1+ cases individually


        if (a.sign > 0 && a.mag >= 0) {
          return FC(a.sign, a.layer + 1, a.mag);
        }

        if (a.sign < 0 && a.mag >= 0) {
          return FC(-a.sign, a.layer + 1, -a.mag);
        } //both the negative mag cases are identical: one +/- rounding error


        return Decimal.dOne;
      }
    }, {
      key: "pow_base",
      value: function pow_base(value) {
        return D(value).pow(this);
      }
    }, {
      key: "root",
      value: function root(value) {
        var decimal = D(value);
        return this.pow(decimal.recip());
      }
    }, {
      key: "factorial",
      value: function factorial() {
        if (this.mag < 0) {
          return this.add(1).gamma();
        } else if (this.layer === 0) {
          return this.add(1).gamma();
        } else if (this.layer === 1) {
          return Decimal.exp(Decimal.mul(this, Decimal.ln(this).sub(1)));
        } else {
          return Decimal.exp(this);
        }
      } //from HyperCalc source code

    }, {
      key: "gamma",
      value: function gamma() {
        if (this.mag < 0) {
          return this.recip();
        } else if (this.layer === 0) {
          if (this.lt(FC_NN(1, 0, 24))) {
            return Decimal.fromNumber(f_gamma(this.sign * this.mag));
          }

          var t = this.mag - 1;
          var l = 0.9189385332046727; //0.5*Math.log(2*Math.PI)

          l = l + (t + 0.5) * Math.log(t);
          l = l - t;
          var n2 = t * t;
          var np = t;
          var lm = 12 * np;
          var adj = 1 / lm;
          var l2 = l + adj;

          if (l2 === l) {
            return Decimal.exp(l);
          }

          l = l2;
          np = np * n2;
          lm = 360 * np;
          adj = 1 / lm;
          l2 = l - adj;

          if (l2 === l) {
            return Decimal.exp(l);
          }

          l = l2;
          np = np * n2;
          lm = 1260 * np;
          var lt = 1 / lm;
          l = l + lt;
          np = np * n2;
          lm = 1680 * np;
          lt = 1 / lm;
          l = l - lt;
          return Decimal.exp(l);
        } else if (this.layer === 1) {
          return Decimal.exp(Decimal.mul(this, Decimal.ln(this).sub(1)));
        } else {
          return Decimal.exp(this);
        }
      }
    }, {
      key: "lngamma",
      value: function lngamma() {
        return this.gamma().ln();
      }
    }, {
      key: "exp",
      value: function exp() {
        if (this.mag < 0) {
          return Decimal.dOne;
        }

        if (this.layer === 0 && this.mag <= 709.7) {
          return Decimal.fromNumber(Math.exp(this.sign * this.mag));
        } else if (this.layer === 0) {
          return FC(1, 1, this.sign * Math.log10(Math.E) * this.mag);
        } else if (this.layer === 1) {
          return FC(1, 2, this.sign * (Math.log10(0.4342944819032518) + this.mag));
        } else {
          return FC(1, this.layer + 1, this.sign * this.mag);
        }
      }
    }, {
      key: "sqr",
      value: function sqr() {
        return this.pow(2);
      }
    }, {
      key: "sqrt",
      value: function sqrt() {
        if (this.layer === 0) {
          return Decimal.fromNumber(Math.sqrt(this.sign * this.mag));
        } else if (this.layer === 1) {
          return FC(1, 2, Math.log10(this.mag) - 0.3010299956639812);
        } else {
          var result = Decimal.div(FC_NN(this.sign, this.layer - 1, this.mag), FC_NN(1, 0, 2));
          result.layer += 1;
          result.normalize();
          return result;
        }
      }
    }, {
      key: "cube",
      value: function cube() {
        return this.pow(3);
      }
    }, {
      key: "cbrt",
      value: function cbrt() {
        return this.pow(1 / 3);
      } //Tetration/tetrate: The result of exponentiating 'this' to 'this' 'height' times in a row.  https://en.wikipedia.org/wiki/Tetration
      //If payload != 1, then this is 'iterated exponentiation', the result of exping (payload) to base (this) (height) times. https://andydude.github.io/tetration/archives/tetration2/ident.html
      //Works with negative and positive real heights.

    }, {
      key: "tetrate",
      value: function tetrate() {
        var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
        var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FC_NN(1, 0, 1);

        //x^^1 == x
        if (height === 1) {
          return Decimal.pow(this, payload);
        } //x^^0 == 1


        if (height === 0) {
          return new Decimal(payload);
        } //1^^x == 1


        if (this.eq(Decimal.dOne)) {
          return Decimal.dOne;
        } //-1^^x == -1


        if (this.eq(-1)) {
          return Decimal.pow(this, payload);
        }

        if (height === Number.POSITIVE_INFINITY) {
          var this_num = this.toNumber(); //within the convergence range?

          if (this_num <= 1.44466786100976613366 && this_num >= 0.06598803584531253708) {
            //hotfix for the very edge of the number range not being handled properly
            if (this_num > 1.444667861009099) {
              return Decimal.fromNumber(Math.E);
            } //Formula for infinite height power tower.


            var negln = Decimal.ln(this).neg();
            return negln.lambertw().div(negln);
          } else if (this_num > 1.44466786100976613366) {
            //explodes to infinity
            // TODO: replace this with Decimal.dInf
            return Decimal.fromNumber(Number.POSITIVE_INFINITY);
          } else {
            //0.06598803584531253708 > this_num >= 0: never converges
            //this_num < 0: quickly becomes a complex number
            return Decimal.dNaN;
          }
        } //0^^x oscillates if we define 0^0 == 1 (which in javascript land we do), since then 0^^1 is 0, 0^^2 is 1, 0^^3 is 0, etc. payload is ignored
        //using the linear approximation for height (TODO: don't know a better way to calculate it ATM, but it wouldn't surprise me if it's just NaN)


        if (this.eq(Decimal.dZero)) {
          var result = Math.abs((height + 1) % 2);

          if (result > 1) {
            result = 2 - result;
          }

          return Decimal.fromNumber(result);
        }

        if (height < 0) {
          return Decimal.iteratedlog(payload, this, -height);
        }

        payload = D(payload);
        var oldheight = height;
        height = Math.trunc(height);
        var fracheight = oldheight - height;

        if (this.gt(Decimal.dZero) && this.lte(1.44466786100976613366)) {
          //similar to 0^^n, flip-flops between two values, converging slowly (or if it's below 0.06598803584531253708, never. so once again, the fractional part at the end will be a linear approximation (TODO: again pending knowledge of how to approximate better, although tbh I think it should in reality just be NaN)
          height = Math.min(10000, height);

          for (var i = 0; i < height; ++i) {
            var old_payload = payload;
            payload = this.pow(payload); //stop early if we converge

            if (old_payload.eq(payload)) {
              return payload;
            }
          }

          if (fracheight != 0) {
            var next_payload = this.pow(payload);
            return payload.mul(1 - fracheight).add(next_payload.mul(fracheight));
          }

          return payload;
        } //TODO: base < 0, but it's hard for me to reason about (probably all non-integer heights are NaN automatically?)


        if (fracheight !== 0) {
          if (payload.eq(Decimal.dOne)) {
            //TODO: for bases above 10, revert to old linear approximation until I can think of something better
            if (this.gt(10)) {
              payload = this.pow(fracheight);
            } else {
              payload = Decimal.fromNumber(Decimal.tetrate_critical(this.toNumber(), fracheight)); //TODO: until the critical section grid can handle numbers below 2, scale them to the base
              //TODO: maybe once the critical section grid has very large bases, this math can be appropriate for them too? I'll think about it

              if (this.lt(2)) {
                payload = payload.sub(1).mul(this.minus(1)).plus(1);
              }
            }
          } else {
            if (this.eq(10)) {
              payload = payload.layeradd10(fracheight);
            } else {
              payload = payload.layeradd(fracheight, this);
            }
          }
        }

        for (var _i = 0; _i < height; ++_i) {
          payload = this.pow(payload); //bail if we're NaN

          if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
            return payload.normalize();
          } //shortcut


          if (payload.layer - this.layer > 3) {
            return FC_NN(payload.sign, payload.layer + (height - _i - 1), payload.mag);
          } //give up after 10000 iterations if nothing is happening


          if (_i > 10000) {
            return payload;
          }
        }

        return payload;
      } //iteratedexp/iterated exponentiation: - all cases handled in tetrate, so just call it

    }, {
      key: "iteratedexp",
      value: function iteratedexp() {
        var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
        var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FC_NN(1, 0, 1);
        return this.tetrate(height, payload);
      } //iterated log/repeated log: The result of applying log(base) 'times' times in a row. Approximately equal to subtracting (times) from the number's slog representation. Equivalent to tetrating to a negative height.
      //Works with negative and positive real heights.

    }, {
      key: "iteratedlog",
      value: function iteratedlog() {
        var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

        if (times < 0) {
          return Decimal.tetrate(base, -times, this);
        }

        base = D(base);
        var result = Decimal.fromDecimal(this);
        var fulltimes = times;
        times = Math.trunc(times);
        var fraction = fulltimes - times;

        if (result.layer - base.layer > 3) {
          var layerloss = Math.min(times, result.layer - base.layer - 3);
          times -= layerloss;
          result.layer -= layerloss;
        }

        for (var i = 0; i < times; ++i) {
          result = result.log(base); //bail if we're NaN

          if (!isFinite(result.layer) || !isFinite(result.mag)) {
            return result.normalize();
          } //give up after 10000 iterations if nothing is happening


          if (i > 10000) {
            return result;
          }
        } //handle fractional part


        if (fraction > 0 && fraction < 1) {
          if (base.eq(10)) {
            result = result.layeradd10(-fraction);
          } else {
            result = result.layeradd(-fraction, base);
          }
        }

        return result;
      } //Super-logarithm, one of tetration's inverses, tells you what size power tower you'd have to tetrate base to to get number. By definition, will never be higher than 1.8e308 in break_eternity.js, since a power tower 1.8e308 numbers tall is the largest representable number.
      // https://en.wikipedia.org/wiki/Super-logarithm
      // NEW: Accept a number of iterations, and use binary search to, after making an initial guess, hone in on the true value, assuming tetration as the ground truth.

    }, {
      key: "slog",
      value: function slog() {
        var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        var iterations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
        var step_size = 0.001;
        var has_changed_directions_once = false;
        var previously_rose = false;
        var result = this.slog_internal(base).toNumber();

        for (var i = 1; i < iterations; ++i) {
          var new_decimal = new Decimal(base).tetrate(result);
          var currently_rose = new_decimal.gt(this);

          if (i > 1) {
            if (previously_rose != currently_rose) {
              has_changed_directions_once = true;
            }
          }

          previously_rose = currently_rose;

          if (has_changed_directions_once) {
            step_size /= 2;
          } else {
            step_size *= 2;
          }

          step_size = Math.abs(step_size) * (currently_rose ? -1 : 1);
          result += step_size;

          if (step_size === 0) {
            break;
          }
        }

        return Decimal.fromNumber(result);
      }
    }, {
      key: "slog_internal",
      value: function slog_internal() {
        var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
        base = D(base); //special cases:
        //slog base 0 or lower is NaN

        if (base.lte(Decimal.dZero)) {
          return Decimal.dNaN;
        } //slog base 1 is NaN


        if (base.eq(Decimal.dOne)) {
          return Decimal.dNaN;
        } //need to handle these small, wobbling bases specially


        if (base.lt(Decimal.dOne)) {
          if (this.eq(Decimal.dOne)) {
            return Decimal.dZero;
          }

          if (this.eq(Decimal.dZero)) {
            return Decimal.dNegOne;
          } //0 < this < 1: ambiguous (happens multiple times)
          //this < 0: impossible (as far as I can tell)
          //this > 1: partially complex (http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html base 0.25 for proof)


          return Decimal.dNaN;
        } //slog_n(0) is -1


        if (this.mag < 0 || this.eq(Decimal.dZero)) {
          return Decimal.dNegOne;
        }

        var result = 0;
        var copy = Decimal.fromDecimal(this);

        if (copy.layer - base.layer > 3) {
          var layerloss = copy.layer - base.layer - 3;
          result += layerloss;
          copy.layer -= layerloss;
        }

        for (var i = 0; i < 100; ++i) {
          if (copy.lt(Decimal.dZero)) {
            copy = Decimal.pow(base, copy);
            result -= 1;
          } else if (copy.lte(Decimal.dOne)) {
            return Decimal.fromNumber(result + Decimal.slog_critical(base.toNumber(), copy.toNumber()));
          } else {
            result += 1;
            copy = Decimal.log(copy, base);
          }
        }

        return Decimal.fromNumber(result);
      } //background info and tables of values for critical functions taken here: https://github.com/Patashu/break_eternity.js/issues/22

    }, {
      key: "layeradd10",
      value: //Function for adding/removing layers from a Decimal, even fractional layers (e.g. its slog10 representation).
      //Moved this over to use the same critical section as tetrate/slog.
      function layeradd10(diff) {
        diff = Decimal.fromValue_noAlloc(diff).toNumber();
        var result = Decimal.fromDecimal(this);

        if (diff >= 1) {
          //bug fix: if result is very smol (mag < 0, layer > 0) turn it into 0 first
          if (result.mag < 0 && result.layer > 0) {
            result.sign = 0;
            result.mag = 0;
            result.layer = 0;
          } else if (result.sign === -1 && result.layer == 0) {
            //bug fix - for stuff like -3.layeradd10(1) we need to move the sign to the mag
            result.sign = 1;
            result.mag = -result.mag;
          }

          var layeradd = Math.trunc(diff);
          diff -= layeradd;
          result.layer += layeradd;
        }

        if (diff <= -1) {
          var _layeradd = Math.trunc(diff);

          diff -= _layeradd;
          result.layer += _layeradd;

          if (result.layer < 0) {
            for (var i = 0; i < 100; ++i) {
              result.layer++;
              result.mag = Math.log10(result.mag);

              if (!isFinite(result.mag)) {
                //another bugfix: if we hit -Infinity mag, then we should return negative infinity, not 0. 0.layeradd10(-1) h its this
                if (result.sign === 0) {
                  result.sign = 1;
                } //also this, for 0.layeradd10(-2)


                if (result.layer < 0) {
                  result.layer = 0;
                }

                return result.normalize();
              }

              if (result.layer >= 0) {
                break;
              }
            }
          }
        }

        while (result.layer < 0) {
          result.layer++;
          result.mag = Math.log10(result.mag);
        } //bugfix: before we normalize: if we started with 0, we now need to manually fix a layer ourselves!


        if (result.sign === 0) {
          result.sign = 1;

          if (result.mag === 0 && result.layer >= 1) {
            result.layer -= 1;
            result.mag = 1;
          }
        }

        result.normalize(); //layeradd10: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 10 and iterated log base 10. Also equivalent to adding a fractional amount to the number's layer in its break_eternity.js representation.

        if (diff !== 0) {
          return result.layeradd(diff, 10); //safe, only calls positive height 1 payload tetration, slog and log
        }

        return result;
      } //layeradd: like adding 'diff' to the number's slog(base) representation. Very similar to tetrate base 'base' and iterated log base 'base'.

    }, {
      key: "layeradd",
      value: function layeradd(diff, base) {
        var slogthis = this.slog(base).toNumber();
        var slogdest = slogthis + diff;

        if (slogdest >= 0) {
          return Decimal.tetrate(base, slogdest);
        } else if (!Number.isFinite(slogdest)) {
          return Decimal.dNaN;
        } else if (slogdest >= -1) {
          return Decimal.log(Decimal.tetrate(base, slogdest + 1), base);
        } else {
          return Decimal.log(Decimal.log(Decimal.tetrate(base, slogdest + 2), base), base);
        }
      } //The Lambert W function, also called the omega function or product logarithm, is the solution W(x) === x*e^x.
      // https://en.wikipedia.org/wiki/Lambert_W_function
      //Some special values, for testing: https://en.wikipedia.org/wiki/Lambert_W_function#Special_values

    }, {
      key: "lambertw",
      value: function lambertw() {
        if (this.lt(-0.3678794411710499)) {
          throw Error("lambertw is unimplemented for results less than -1, sorry!");
        } else if (this.mag < 0) {
          return Decimal.fromNumber(f_lambertw(this.toNumber()));
        } else if (this.layer === 0) {
          return Decimal.fromNumber(f_lambertw(this.sign * this.mag));
        } else if (this.layer === 1) {
          return d_lambertw(this);
        } else if (this.layer === 2) {
          return d_lambertw(this);
        }

        if (this.layer >= 3) {
          return FC_NN(this.sign, this.layer - 1, this.mag);
        }

        throw "Unhandled behavior in lambertw()";
      } //The super square-root function - what number, tetrated to height 2, equals this?
      //Other sroots are possible to calculate probably through guess and check methods, this one is easy though.
      // https://en.wikipedia.org/wiki/Tetration#Super-root

    }, {
      key: "ssqrt",
      value: function ssqrt() {
        if (this.sign == 1 && this.layer >= 3) {
          return FC_NN(this.sign, this.layer - 1, this.mag);
        }

        var lnx = this.ln();
        return lnx.div(lnx.lambertw());
      } //Pentation/pentate: The result of tetrating 'height' times in a row. An absurdly strong operator - Decimal.pentate(2, 4.28) and Decimal.pentate(10, 2.37) are already too huge for break_eternity.js!
      // https://en.wikipedia.org/wiki/Pentation

    }, {
      key: "pentate",
      value: function pentate() {
        var height = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
        var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : FC_NN(1, 0, 1);
        payload = D(payload);
        var oldheight = height;
        height = Math.trunc(height);
        var fracheight = oldheight - height; //I have no idea if this is a meaningful approximation for pentation to continuous heights, but it is monotonic and continuous.

        if (fracheight !== 0) {
          if (payload.eq(Decimal.dOne)) {
            ++height;
            payload = Decimal.fromNumber(fracheight);
          } else {
            if (this.eq(10)) {
              payload = payload.layeradd10(fracheight);
            } else {
              payload = payload.layeradd(fracheight, this);
            }
          }
        }

        for (var i = 0; i < height; ++i) {
          payload = this.tetrate(payload.toNumber()); //bail if we're NaN

          if (!isFinite(payload.layer) || !isFinite(payload.mag)) {
            return payload.normalize();
          } //give up after 10 iterations if nothing is happening


          if (i > 10) {
            return payload;
          }
        }

        return payload;
      } // trig functions!

    }, {
      key: "sin",
      value: function sin() {
        if (this.mag < 0) {
          return this;
        }

        if (this.layer === 0) {
          return Decimal.fromNumber(Math.sin(this.sign * this.mag));
        }

        return FC_NN(0, 0, 0);
      }
    }, {
      key: "cos",
      value: function cos() {
        if (this.mag < 0) {
          return Decimal.dOne;
        }

        if (this.layer === 0) {
          return Decimal.fromNumber(Math.cos(this.sign * this.mag));
        }

        return FC_NN(0, 0, 0);
      }
    }, {
      key: "tan",
      value: function tan() {
        if (this.mag < 0) {
          return this;
        }

        if (this.layer === 0) {
          return Decimal.fromNumber(Math.tan(this.sign * this.mag));
        }

        return FC_NN(0, 0, 0);
      }
    }, {
      key: "asin",
      value: function asin() {
        if (this.mag < 0) {
          return this;
        }

        if (this.layer === 0) {
          return Decimal.fromNumber(Math.asin(this.sign * this.mag));
        }

        return FC_NN(Number.NaN, Number.NaN, Number.NaN);
      }
    }, {
      key: "acos",
      value: function acos() {
        if (this.mag < 0) {
          return Decimal.fromNumber(Math.acos(this.toNumber()));
        }

        if (this.layer === 0) {
          return Decimal.fromNumber(Math.acos(this.sign * this.mag));
        }

        return FC_NN(Number.NaN, Number.NaN, Number.NaN);
      }
    }, {
      key: "atan",
      value: function atan() {
        if (this.mag < 0) {
          return this;
        }

        if (this.layer === 0) {
          return Decimal.fromNumber(Math.atan(this.sign * this.mag));
        }

        return Decimal.fromNumber(Math.atan(this.sign * 1.8e308));
      }
    }, {
      key: "sinh",
      value: function sinh() {
        return this.exp().sub(this.negate().exp()).div(2);
      }
    }, {
      key: "cosh",
      value: function cosh() {
        return this.exp().add(this.negate().exp()).div(2);
      }
    }, {
      key: "tanh",
      value: function tanh() {
        return this.sinh().div(this.cosh());
      }
    }, {
      key: "asinh",
      value: function asinh() {
        return Decimal.ln(this.add(this.sqr().add(1).sqrt()));
      }
    }, {
      key: "acosh",
      value: function acosh() {
        return Decimal.ln(this.add(this.sqr().sub(1).sqrt()));
      }
    }, {
      key: "atanh",
      value: function atanh() {
        if (this.abs().gte(1)) {
          return FC_NN(Number.NaN, Number.NaN, Number.NaN);
        }

        return Decimal.ln(this.add(1).div(Decimal.fromNumber(1).sub(this))).div(2);
      }
      /**
       * Joke function from Realm Grinder
       */

    }, {
      key: "ascensionPenalty",
      value: function ascensionPenalty(ascensions) {
        if (ascensions === 0) {
          return this;
        }

        return this.root(Decimal.pow(10, ascensions));
      }
      /**
       * Joke function from Cookie Clicker. It's 'egg'
       */

    }, {
      key: "egg",
      value: function egg() {
        return this.add(9);
      }
    }, {
      key: "lessThanOrEqualTo",
      value: function lessThanOrEqualTo(other) {
        return this.cmp(other) < 1;
      }
    }, {
      key: "lessThan",
      value: function lessThan(other) {
        return this.cmp(other) < 0;
      }
    }, {
      key: "greaterThanOrEqualTo",
      value: function greaterThanOrEqualTo(other) {
        return this.cmp(other) > -1;
      }
    }, {
      key: "greaterThan",
      value: function greaterThan(other) {
        return this.cmp(other) > 0;
      }
    }], [{
      key: "fromComponents",
      value: function fromComponents(sign, layer, mag) {
        return new Decimal().fromComponents(sign, layer, mag);
      }
    }, {
      key: "fromComponents_noNormalize",
      value: function fromComponents_noNormalize(sign, layer, mag) {
        return new Decimal().fromComponents_noNormalize(sign, layer, mag);
      }
    }, {
      key: "fromMantissaExponent",
      value: function fromMantissaExponent(mantissa, exponent) {
        return new Decimal().fromMantissaExponent(mantissa, exponent);
      }
    }, {
      key: "fromMantissaExponent_noNormalize",
      value: function fromMantissaExponent_noNormalize(mantissa, exponent) {
        return new Decimal().fromMantissaExponent_noNormalize(mantissa, exponent);
      }
    }, {
      key: "fromDecimal",
      value: function fromDecimal(value) {
        return new Decimal().fromDecimal(value);
      }
    }, {
      key: "fromNumber",
      value: function fromNumber(value) {
        return new Decimal().fromNumber(value);
      }
    }, {
      key: "fromString",
      value: function fromString(value) {
        return new Decimal().fromString(value);
      }
    }, {
      key: "fromValue",
      value: function fromValue(value) {
        return new Decimal().fromValue(value);
      }
      /**
       * Converts a DecimalSource to a Decimal, without constructing a new Decimal
       * if the provided value is already a Decimal.
       *
       * As the return value could be the provided value itself, this function
       * returns a read-only Decimal to prevent accidental mutations of the value.
       * Use `new Decimal(value)` to explicitly create a writeable copy if mutation
       * is required.
       */

    }, {
      key: "fromValue_noAlloc",
      value: function fromValue_noAlloc(value) {
        if (value instanceof Decimal) {
          return value;
        } else if (typeof value === "string") {
          var cached = Decimal.fromStringCache.get(value);

          if (cached !== undefined) {
            return cached;
          }

          return Decimal.fromString(value);
        } else if (typeof value === "number") {
          return Decimal.fromNumber(value);
        } else {
          // This should never happen... but some users like Prestige Tree Rewritten
          // pass undefined values in as DecimalSources, so we should handle this
          // case to not break them.
          return Decimal.dZero;
        }
      }
    }, {
      key: "abs",
      value: function abs(value) {
        return D(value).abs();
      }
    }, {
      key: "neg",
      value: function neg(value) {
        return D(value).neg();
      }
    }, {
      key: "negate",
      value: function negate(value) {
        return D(value).neg();
      }
    }, {
      key: "negated",
      value: function negated(value) {
        return D(value).neg();
      }
    }, {
      key: "sign",
      value: function sign(value) {
        return D(value).sign;
      }
    }, {
      key: "sgn",
      value: function sgn(value) {
        return D(value).sign;
      }
    }, {
      key: "round",
      value: function round(value) {
        return D(value).round();
      }
    }, {
      key: "floor",
      value: function floor(value) {
        return D(value).floor();
      }
    }, {
      key: "ceil",
      value: function ceil(value) {
        return D(value).ceil();
      }
    }, {
      key: "trunc",
      value: function trunc(value) {
        return D(value).trunc();
      }
    }, {
      key: "add",
      value: function add(value, other) {
        return D(value).add(other);
      }
    }, {
      key: "plus",
      value: function plus(value, other) {
        return D(value).add(other);
      }
    }, {
      key: "sub",
      value: function sub(value, other) {
        return D(value).sub(other);
      }
    }, {
      key: "subtract",
      value: function subtract(value, other) {
        return D(value).sub(other);
      }
    }, {
      key: "minus",
      value: function minus(value, other) {
        return D(value).sub(other);
      }
    }, {
      key: "mul",
      value: function mul(value, other) {
        return D(value).mul(other);
      }
    }, {
      key: "multiply",
      value: function multiply(value, other) {
        return D(value).mul(other);
      }
    }, {
      key: "times",
      value: function times(value, other) {
        return D(value).mul(other);
      }
    }, {
      key: "div",
      value: function div(value, other) {
        return D(value).div(other);
      }
    }, {
      key: "divide",
      value: function divide(value, other) {
        return D(value).div(other);
      }
    }, {
      key: "recip",
      value: function recip(value) {
        return D(value).recip();
      }
    }, {
      key: "reciprocal",
      value: function reciprocal(value) {
        return D(value).recip();
      }
    }, {
      key: "reciprocate",
      value: function reciprocate(value) {
        return D(value).reciprocate();
      }
    }, {
      key: "cmp",
      value: function cmp(value, other) {
        return D(value).cmp(other);
      }
    }, {
      key: "cmpabs",
      value: function cmpabs(value, other) {
        return D(value).cmpabs(other);
      }
    }, {
      key: "compare",
      value: function compare(value, other) {
        return D(value).cmp(other);
      }
    }, {
      key: "isNaN",
      value: function (_isNaN) {
        function isNaN(_x) {
          return _isNaN.apply(this, arguments);
        }

        isNaN.toString = function () {
          return _isNaN.toString();
        };

        return isNaN;
      }(function (value) {
        value = D(value);
        return isNaN(value.sign) || isNaN(value.layer) || isNaN(value.mag);
      })
    }, {
      key: "isFinite",
      value: function (_isFinite) {
        function isFinite(_x2) {
          return _isFinite.apply(this, arguments);
        }

        isFinite.toString = function () {
          return _isFinite.toString();
        };

        return isFinite;
      }(function (value) {
        value = D(value);
        return isFinite(value.sign) && isFinite(value.layer) && isFinite(value.mag);
      })
    }, {
      key: "eq",
      value: function eq(value, other) {
        return D(value).eq(other);
      }
    }, {
      key: "equals",
      value: function equals(value, other) {
        return D(value).eq(other);
      }
    }, {
      key: "neq",
      value: function neq(value, other) {
        return D(value).neq(other);
      }
    }, {
      key: "notEquals",
      value: function notEquals(value, other) {
        return D(value).notEquals(other);
      }
    }, {
      key: "lt",
      value: function lt(value, other) {
        return D(value).lt(other);
      }
    }, {
      key: "lte",
      value: function lte(value, other) {
        return D(value).lte(other);
      }
    }, {
      key: "gt",
      value: function gt(value, other) {
        return D(value).gt(other);
      }
    }, {
      key: "gte",
      value: function gte(value, other) {
        return D(value).gte(other);
      }
    }, {
      key: "max",
      value: function max(value, other) {
        return D(value).max(other);
      }
    }, {
      key: "min",
      value: function min(value, other) {
        return D(value).min(other);
      }
    }, {
      key: "minabs",
      value: function minabs(value, other) {
        return D(value).minabs(other);
      }
    }, {
      key: "maxabs",
      value: function maxabs(value, other) {
        return D(value).maxabs(other);
      }
    }, {
      key: "clamp",
      value: function clamp(value, min, max) {
        return D(value).clamp(min, max);
      }
    }, {
      key: "clampMin",
      value: function clampMin(value, min) {
        return D(value).clampMin(min);
      }
    }, {
      key: "clampMax",
      value: function clampMax(value, max) {
        return D(value).clampMax(max);
      }
    }, {
      key: "cmp_tolerance",
      value: function cmp_tolerance(value, other, tolerance) {
        return D(value).cmp_tolerance(other, tolerance);
      }
    }, {
      key: "compare_tolerance",
      value: function compare_tolerance(value, other, tolerance) {
        return D(value).cmp_tolerance(other, tolerance);
      }
    }, {
      key: "eq_tolerance",
      value: function eq_tolerance(value, other, tolerance) {
        return D(value).eq_tolerance(other, tolerance);
      }
    }, {
      key: "equals_tolerance",
      value: function equals_tolerance(value, other, tolerance) {
        return D(value).eq_tolerance(other, tolerance);
      }
    }, {
      key: "neq_tolerance",
      value: function neq_tolerance(value, other, tolerance) {
        return D(value).neq_tolerance(other, tolerance);
      }
    }, {
      key: "notEquals_tolerance",
      value: function notEquals_tolerance(value, other, tolerance) {
        return D(value).notEquals_tolerance(other, tolerance);
      }
    }, {
      key: "lt_tolerance",
      value: function lt_tolerance(value, other, tolerance) {
        return D(value).lt_tolerance(other, tolerance);
      }
    }, {
      key: "lte_tolerance",
      value: function lte_tolerance(value, other, tolerance) {
        return D(value).lte_tolerance(other, tolerance);
      }
    }, {
      key: "gt_tolerance",
      value: function gt_tolerance(value, other, tolerance) {
        return D(value).gt_tolerance(other, tolerance);
      }
    }, {
      key: "gte_tolerance",
      value: function gte_tolerance(value, other, tolerance) {
        return D(value).gte_tolerance(other, tolerance);
      }
    }, {
      key: "pLog10",
      value: function pLog10(value) {
        return D(value).pLog10();
      }
    }, {
      key: "absLog10",
      value: function absLog10(value) {
        return D(value).absLog10();
      }
    }, {
      key: "log10",
      value: function log10(value) {
        return D(value).log10();
      }
    }, {
      key: "log",
      value: function log(value, base) {
        return D(value).log(base);
      }
    }, {
      key: "log2",
      value: function log2(value) {
        return D(value).log2();
      }
    }, {
      key: "ln",
      value: function ln(value) {
        return D(value).ln();
      }
    }, {
      key: "logarithm",
      value: function logarithm(value, base) {
        return D(value).logarithm(base);
      }
    }, {
      key: "pow",
      value: function pow(value, other) {
        return D(value).pow(other);
      }
    }, {
      key: "pow10",
      value: function pow10(value) {
        return D(value).pow10();
      }
    }, {
      key: "root",
      value: function root(value, other) {
        return D(value).root(other);
      }
    }, {
      key: "factorial",
      value: function factorial(value, _other) {
        return D(value).factorial();
      }
    }, {
      key: "gamma",
      value: function gamma(value, _other) {
        return D(value).gamma();
      }
    }, {
      key: "lngamma",
      value: function lngamma(value, _other) {
        return D(value).lngamma();
      }
    }, {
      key: "exp",
      value: function exp(value) {
        return D(value).exp();
      }
    }, {
      key: "sqr",
      value: function sqr(value) {
        return D(value).sqr();
      }
    }, {
      key: "sqrt",
      value: function sqrt(value) {
        return D(value).sqrt();
      }
    }, {
      key: "cube",
      value: function cube(value) {
        return D(value).cube();
      }
    }, {
      key: "cbrt",
      value: function cbrt(value) {
        return D(value).cbrt();
      }
    }, {
      key: "tetrate",
      value: function tetrate(value) {
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
        var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : FC_NN(1, 0, 1);
        return D(value).tetrate(height, payload);
      }
    }, {
      key: "iteratedexp",
      value: function iteratedexp(value) {
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
        var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : FC_NN(1, 0, 1);
        return D(value).iteratedexp(height, payload);
      }
    }, {
      key: "iteratedlog",
      value: function iteratedlog(value) {
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
        var times = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        return D(value).iteratedlog(base, times);
      }
    }, {
      key: "layeradd10",
      value: function layeradd10(value, diff) {
        return D(value).layeradd10(diff);
      }
    }, {
      key: "layeradd",
      value: function layeradd(value, diff) {
        var base = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
        return D(value).layeradd(diff, base);
      }
    }, {
      key: "slog",
      value: function slog(value) {
        var base = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
        return D(value).slog(base);
      }
    }, {
      key: "lambertw",
      value: function lambertw(value) {
        return D(value).lambertw();
      }
    }, {
      key: "ssqrt",
      value: function ssqrt(value) {
        return D(value).ssqrt();
      }
    }, {
      key: "pentate",
      value: function pentate(value) {
        var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
        var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : FC_NN(1, 0, 1);
        return D(value).pentate(height, payload);
      }
      /**
       * If you're willing to spend 'resourcesAvailable' and want to buy something
       * with exponentially increasing cost each purchase (start at priceStart,
       * multiply by priceRatio, already own currentOwned), how much of it can you buy?
       * Adapted from Trimps source code.
       */

    }, {
      key: "affordGeometricSeries",
      value: function affordGeometricSeries(resourcesAvailable, priceStart, priceRatio, currentOwned) {
        return this.affordGeometricSeries_core(D(resourcesAvailable), D(priceStart), D(priceRatio), currentOwned);
      }
      /**
       * How much resource would it cost to buy (numItems) items if you already have currentOwned,
       * the initial price is priceStart and it multiplies by priceRatio each purchase?
       */

    }, {
      key: "sumGeometricSeries",
      value: function sumGeometricSeries(numItems, priceStart, priceRatio, currentOwned) {
        return this.sumGeometricSeries_core(numItems, D(priceStart), D(priceRatio), currentOwned);
      }
      /**
       * If you're willing to spend 'resourcesAvailable' and want to buy something with additively
       * increasing cost each purchase (start at priceStart, add by priceAdd, already own currentOwned),
       * how much of it can you buy?
       */

    }, {
      key: "affordArithmeticSeries",
      value: function affordArithmeticSeries(resourcesAvailable, priceStart, priceAdd, currentOwned) {
        return this.affordArithmeticSeries_core(D(resourcesAvailable), D(priceStart), D(priceAdd), D(currentOwned));
      }
      /**
       * How much resource would it cost to buy (numItems) items if you already have currentOwned,
       * the initial price is priceStart and it adds priceAdd each purchase?
       * Adapted from http://www.mathwords.com/a/arithmetic_series.htm
       */

    }, {
      key: "sumArithmeticSeries",
      value: function sumArithmeticSeries(numItems, priceStart, priceAdd, currentOwned) {
        return this.sumArithmeticSeries_core(D(numItems), D(priceStart), D(priceAdd), D(currentOwned));
      }
      /**
       * When comparing two purchases that cost (resource) and increase your resource/sec by (deltaRpS),
       * the lowest efficiency score is the better one to purchase.
       * From Frozen Cookies:
       * http://cookieclicker.wikia.com/wiki/Frozen_Cookies_(JavaScript_Add-on)#Efficiency.3F_What.27s_that.3F
       */

    }, {
      key: "efficiencyOfPurchase",
      value: function efficiencyOfPurchase(cost, currentRpS, deltaRpS) {
        return this.efficiencyOfPurchase_core(D(cost), D(currentRpS), D(deltaRpS));
      }
    }, {
      key: "randomDecimalForTesting",
      value: function randomDecimalForTesting(maxLayers) {
        // NOTE: This doesn't follow any kind of sane random distribution, so use this for testing purposes only.
        //5% of the time, return 0
        if (Math.random() * 20 < 1) {
          return FC_NN(0, 0, 0);
        }

        var randomsign = Math.random() > 0.5 ? 1 : -1; //5% of the time, return 1 or -1

        if (Math.random() * 20 < 1) {
          return FC_NN(randomsign, 0, 1);
        } //pick a random layer


        var layer = Math.floor(Math.random() * (maxLayers + 1));
        var randomexp = layer === 0 ? Math.random() * 616 - 308 : Math.random() * 16; //10% of the time, make it a simple power of 10

        if (Math.random() > 0.9) {
          randomexp = Math.trunc(randomexp);
        }

        var randommag = Math.pow(10, randomexp); //10% of the time, trunc mag

        if (Math.random() > 0.9) {
          randommag = Math.trunc(randommag);
        }

        return FC(randomsign, layer, randommag);
      }
    }, {
      key: "affordGeometricSeries_core",
      value: function affordGeometricSeries_core(resourcesAvailable, priceStart, priceRatio, currentOwned) {
        var actualStart = priceStart.mul(priceRatio.pow(currentOwned));
        return Decimal.floor(resourcesAvailable.div(actualStart).mul(priceRatio.sub(1)).add(1).log10().div(priceRatio.log10()));
      }
    }, {
      key: "sumGeometricSeries_core",
      value: function sumGeometricSeries_core(numItems, priceStart, priceRatio, currentOwned) {
        return priceStart.mul(priceRatio.pow(currentOwned)).mul(Decimal.sub(1, priceRatio.pow(numItems))).div(Decimal.sub(1, priceRatio));
      }
    }, {
      key: "affordArithmeticSeries_core",
      value: function affordArithmeticSeries_core(resourcesAvailable, priceStart, priceAdd, currentOwned) {
        // n = (-(a-d/2) + sqrt((a-d/2)^2+2dS))/d
        // where a is actualStart, d is priceAdd and S is resourcesAvailable
        // then floor it and you're done!
        var actualStart = priceStart.add(currentOwned.mul(priceAdd));
        var b = actualStart.sub(priceAdd.div(2));
        var b2 = b.pow(2);
        return b.neg().add(b2.add(priceAdd.mul(resourcesAvailable).mul(2)).sqrt()).div(priceAdd).floor();
      }
    }, {
      key: "sumArithmeticSeries_core",
      value: function sumArithmeticSeries_core(numItems, priceStart, priceAdd, currentOwned) {
        var actualStart = priceStart.add(currentOwned.mul(priceAdd)); // (n/2)*(2*a+(n-1)*d)

        return numItems.div(2).mul(actualStart.mul(2).plus(numItems.sub(1).mul(priceAdd)));
      }
    }, {
      key: "efficiencyOfPurchase_core",
      value: function efficiencyOfPurchase_core(cost, currentRpS, deltaRpS) {
        return cost.div(currentRpS).add(cost.div(deltaRpS));
      }
    }, {
      key: "slog_critical",
      value: function slog_critical(base, height) {
        //TODO: for bases above 10, revert to old linear approximation until I can think of something better
        if (base > 10) {
          return height - 1;
        }

        return Decimal.critical_section(base, height, critical_slog_values);
      }
    }, {
      key: "tetrate_critical",
      value: function tetrate_critical(base, height) {
        return Decimal.critical_section(base, height, critical_tetr_values);
      }
    }, {
      key: "critical_section",
      value: function critical_section(base, height, grid) {
        //this part is simple at least, since it's just 0.1 to 0.9
        height *= 10;

        if (height < 0) {
          height = 0;
        }

        if (height > 10) {
          height = 10;
        } //have to do this complicated song and dance since one of the critical_headers is Math.E, and in the future I'd like 1.5 as well


        if (base < 2) {
          base = 2;
        }

        if (base > 10) {
          base = 10;
        }

        var lower = 0;
        var upper = 0; //basically, if we're between bases, we interpolate each bases' relevant values together
        //then we interpolate based on what the fractional height is.
        //accuracy could be improved by doing a non-linear interpolation (maybe), by adding more bases and heights (definitely) but this is AFAIK the best you can get without running some pari.gp or mathematica program to calculate exact values
        //however, do note http://myweb.astate.edu/wpaulsen/tetcalc/tetcalc.html can do it for arbitrary heights but not for arbitrary bases (2, e, 10 present)

        for (var i = 0; i < critical_headers.length; ++i) {
          if (critical_headers[i] == base) {
            // exact match
            lower = grid[i][Math.floor(height)];
            upper = grid[i][Math.ceil(height)];
            break;
          } else if (critical_headers[i] < base && critical_headers[i + 1] > base) {
            // interpolate between this and the next
            var basefrac = (base - critical_headers[i]) / (critical_headers[i + 1] - critical_headers[i]);
            lower = grid[i][Math.floor(height)] * (1 - basefrac) + grid[i + 1][Math.floor(height)] * basefrac;
            upper = grid[i][Math.ceil(height)] * (1 - basefrac) + grid[i + 1][Math.ceil(height)] * basefrac;
            break;
          }
        }

        var frac = height - Math.floor(height); //improvement - you get more accuracy (especially around 0.9-1.0) by doing log, then frac, then powing the result
        //(we could pre-log the lookup table, but then fractional bases would get Weird)
        //also, use old linear for slog (values 0 or less in critical section). maybe something else is better but haven't thought about what yet

        if (lower <= 0 || upper <= 0) {
          return lower * (1 - frac) + upper * frac;
        } else {
          return Math.pow(base, Math.log(lower) / Math.log(base) * (1 - frac) + Math.log(upper) / Math.log(base) * frac);
        }
      }
    }]);

    return Decimal;
  }();
  Decimal.dZero = FC_NN(0, 0, 0);
  Decimal.dOne = FC_NN(1, 0, 1);
  Decimal.dNegOne = FC_NN(-1, 0, 1);
  Decimal.dTwo = FC_NN(1, 0, 2);
  Decimal.dTen = FC_NN(1, 0, 10);
  Decimal.dNaN = FC_NN(0, 0, 0); //Changed from all NaNs to all 0s;
  Decimal.dInf = FC_NN(1, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
  Decimal.dNegInf = FC_NN(-1, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
  Decimal.dNumberMax = FC(1, 0, Number.MAX_VALUE);
  Decimal.dNumberMin = FC(1, 0, Number.MIN_VALUE);
  Decimal.fromStringCache = new LRUCache(DEFAULT_FROM_STRING_CACHE_SIZE); // return Decimal;
  // Optimise Decimal aliases.
  // We can't do this optimisation before Decimal is assigned.

  D = Decimal.fromValue_noAlloc;
  FC = Decimal.fromComponents;
  FC_NN = Decimal.fromComponents_noNormalize; // eslint-disable-next-line @typescript-eslint/no-unused-vars

  Decimal.fromMantissaExponent; // eslint-disable-next-line @typescript-eslint/no-unused-vars

  Decimal.fromMantissaExponent_noNormalize;

  return Decimal;

}));