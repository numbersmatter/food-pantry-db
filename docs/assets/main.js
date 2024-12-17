window.translations = {
	copy: "Copy",
	copied: "Copied!",
	normally_hidden: "This member is normally hidden due to your filter settings.",
	hierarchy_expand: "Expand",
	hierarchy_collapse: "Collapse",
}
;("use strict")
;(() => {
	var De = Object.create
	var le = Object.defineProperty
	var Fe = Object.getOwnPropertyDescriptor
	var Ne = Object.getOwnPropertyNames
	var Ve = Object.getPrototypeOf,
		Be = Object.prototype.hasOwnProperty
	var qe = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports)
	var je = (t, e, n, r) => {
		if ((e && typeof e == "object") || typeof e == "function")
			for (const i of Ne(e))
				!Be.call(t, i) && i !== n && le(t, i, { get: () => e[i], enumerable: !(r = Fe(e, i)) || r.enumerable })
		return t
	}
	var $e = (t, e, n) => (
		(n = t != null ? De(Ve(t)) : {}),
		je(e || !t || !t.__esModule ? le(n, "default", { value: t, enumerable: !0 }) : n, t)
	)
	var pe = qe((de, he) => {
		;(function () {
			var t = (e) => {
				var n = new t.Builder()
				return (
					n.pipeline.add(t.trimmer, t.stopWordFilter, t.stemmer),
					n.searchPipeline.add(t.stemmer),
					e.call(n, n),
					n.build()
				)
			}
			t.version = "2.3.9"
			;(t.utils = {}),
				(t.utils.warn = ((e) => (n) => {
					e.console && console.warn && console.warn(n)
				})(this)),
				(t.utils.asString = (e) => (e == null ? "" : e.toString())),
				(t.utils.clone = (e) => {
					if (e == null) return e
					for (var n = Object.create(null), r = Object.keys(e), i = 0; i < r.length; i++) {
						var s = r[i],
							o = e[s]
						if (Array.isArray(o)) {
							n[s] = o.slice()
							continue
						}
						if (typeof o == "string" || typeof o == "number" || typeof o == "boolean") {
							n[s] = o
							continue
						}
						throw new TypeError("clone is not deep and does not support nested objects")
					}
					return n
				}),
				(t.FieldRef = function (e, n, r) {
					;(this.docRef = e), (this.fieldName = n), (this._stringValue = r)
				}),
				(t.FieldRef.joiner = "/"),
				(t.FieldRef.fromString = (e) => {
					var n = e.indexOf(t.FieldRef.joiner)
					if (n === -1) throw "malformed field ref string"
					var r = e.slice(0, n),
						i = e.slice(n + 1)
					return new t.FieldRef(i, r, e)
				}),
				(t.FieldRef.prototype.toString = function () {
					return (
						this._stringValue == null && (this._stringValue = this.fieldName + t.FieldRef.joiner + this.docRef),
						this._stringValue
					)
				})
			;(t.Set = function (e) {
				if (((this.elements = Object.create(null)), e)) {
					this.length = e.length
					for (var n = 0; n < this.length; n++) this.elements[e[n]] = !0
				} else this.length = 0
			}),
				(t.Set.complete = {
					intersect: (e) => e,
					union: function () {
						return this
					},
					contains: () => !0,
				}),
				(t.Set.empty = {
					intersect: function () {
						return this
					},
					union: (e) => e,
					contains: () => !1,
				}),
				(t.Set.prototype.contains = function (e) {
					return !!this.elements[e]
				}),
				(t.Set.prototype.intersect = function (e) {
					var n,
						r,
						i,
						s = []
					if (e === t.Set.complete) return this
					if (e === t.Set.empty) return e
					this.length < e.length ? ((n = this), (r = e)) : ((n = e), (r = this)), (i = Object.keys(n.elements))
					for (var o = 0; o < i.length; o++) {
						var a = i[o]
						a in r.elements && s.push(a)
					}
					return new t.Set(s)
				}),
				(t.Set.prototype.union = function (e) {
					return e === t.Set.complete
						? t.Set.complete
						: e === t.Set.empty
							? this
							: new t.Set(Object.keys(this.elements).concat(Object.keys(e.elements)))
				}),
				(t.idf = (e, n) => {
					var r = 0
					for (var i in e) i != "_index" && (r += Object.keys(e[i]).length)
					var s = (n - r + 0.5) / (r + 0.5)
					return Math.log(1 + Math.abs(s))
				}),
				(t.Token = function (e, n) {
					;(this.str = e || ""), (this.metadata = n || {})
				}),
				(t.Token.prototype.toString = function () {
					return this.str
				}),
				(t.Token.prototype.update = function (e) {
					return (this.str = e(this.str, this.metadata)), this
				}),
				(t.Token.prototype.clone = function (e) {
					return (e = e || ((n) => n)), new t.Token(e(this.str, this.metadata), this.metadata)
				})
			;(t.tokenizer = (e, n) => {
				if (e == null || e == null) return []
				if (Array.isArray(e)) return e.map((m) => new t.Token(t.utils.asString(m).toLowerCase(), t.utils.clone(n)))
				for (var r = e.toString().toLowerCase(), i = r.length, s = [], o = 0, a = 0; o <= i; o++) {
					var l = r.charAt(o),
						c = o - a
					if (l.match(t.tokenizer.separator) || o == i) {
						if (c > 0) {
							var d = t.utils.clone(n) || {}
							;(d.position = [a, c]), (d.index = s.length), s.push(new t.Token(r.slice(a, o), d))
						}
						a = o + 1
					}
				}
				return s
			}),
				(t.tokenizer.separator = /[\s-]+/)
			;(t.Pipeline = function () {
				this._stack = []
			}),
				(t.Pipeline.registeredFunctions = Object.create(null)),
				(t.Pipeline.registerFunction = function (e, n) {
					n in this.registeredFunctions && t.utils.warn("Overwriting existing registered function: " + n),
						(e.label = n),
						(t.Pipeline.registeredFunctions[e.label] = e)
				}),
				(t.Pipeline.warnIfFunctionNotRegistered = function (e) {
					var n = e.label && e.label in this.registeredFunctions
					n ||
						t.utils.warn(
							`Function is not registered with pipeline. This may cause problems when serialising the index.
`,
							e
						)
				}),
				(t.Pipeline.load = (e) => {
					var n = new t.Pipeline()
					return (
						e.forEach((r) => {
							var i = t.Pipeline.registeredFunctions[r]
							if (i) n.add(i)
							else throw new Error("Cannot load unregistered function: " + r)
						}),
						n
					)
				}),
				(t.Pipeline.prototype.add = function () {
					var e = Array.prototype.slice.call(arguments)
					e.forEach(function (n) {
						t.Pipeline.warnIfFunctionNotRegistered(n), this._stack.push(n)
					}, this)
				}),
				(t.Pipeline.prototype.after = function (e, n) {
					t.Pipeline.warnIfFunctionNotRegistered(n)
					var r = this._stack.indexOf(e)
					if (r == -1) throw new Error("Cannot find existingFn")
					;(r = r + 1), this._stack.splice(r, 0, n)
				}),
				(t.Pipeline.prototype.before = function (e, n) {
					t.Pipeline.warnIfFunctionNotRegistered(n)
					var r = this._stack.indexOf(e)
					if (r == -1) throw new Error("Cannot find existingFn")
					this._stack.splice(r, 0, n)
				}),
				(t.Pipeline.prototype.remove = function (e) {
					var n = this._stack.indexOf(e)
					n != -1 && this._stack.splice(n, 1)
				}),
				(t.Pipeline.prototype.run = function (e) {
					for (var n = this._stack.length, r = 0; r < n; r++) {
						for (var i = this._stack[r], s = [], o = 0; o < e.length; o++) {
							var a = i(e[o], o, e)
							if (!(a == null || a === ""))
								if (Array.isArray(a)) for (var l = 0; l < a.length; l++) s.push(a[l])
								else s.push(a)
						}
						e = s
					}
					return e
				}),
				(t.Pipeline.prototype.runString = function (e, n) {
					var r = new t.Token(e, n)
					return this.run([r]).map((i) => i.toString())
				}),
				(t.Pipeline.prototype.reset = function () {
					this._stack = []
				}),
				(t.Pipeline.prototype.toJSON = function () {
					return this._stack.map((e) => (t.Pipeline.warnIfFunctionNotRegistered(e), e.label))
				})
			;(t.Vector = function (e) {
				;(this._magnitude = 0), (this.elements = e || [])
			}),
				(t.Vector.prototype.positionForIndex = function (e) {
					if (this.elements.length == 0) return 0
					for (
						var n = 0, r = this.elements.length / 2, i = r - n, s = Math.floor(i / 2), o = this.elements[s * 2];
						i > 1 && (o < e && (n = s), o > e && (r = s), o != e);
					)
						(i = r - n), (s = n + Math.floor(i / 2)), (o = this.elements[s * 2])
					if (o == e || o > e) return s * 2
					if (o < e) return (s + 1) * 2
				}),
				(t.Vector.prototype.insert = function (e, n) {
					this.upsert(e, n, () => {
						throw "duplicate index"
					})
				}),
				(t.Vector.prototype.upsert = function (e, n, r) {
					this._magnitude = 0
					var i = this.positionForIndex(e)
					this.elements[i] == e ? (this.elements[i + 1] = r(this.elements[i + 1], n)) : this.elements.splice(i, 0, e, n)
				}),
				(t.Vector.prototype.magnitude = function () {
					if (this._magnitude) return this._magnitude
					for (var e = 0, n = this.elements.length, r = 1; r < n; r += 2) {
						var i = this.elements[r]
						e += i * i
					}
					return (this._magnitude = Math.sqrt(e))
				}),
				(t.Vector.prototype.dot = function (e) {
					for (
						var n = 0, r = this.elements, i = e.elements, s = r.length, o = i.length, a = 0, l = 0, c = 0, d = 0;
						c < s && d < o;
					)
						(a = r[c]),
							(l = i[d]),
							a < l ? (c += 2) : a > l ? (d += 2) : a == l && ((n += r[c + 1] * i[d + 1]), (c += 2), (d += 2))
					return n
				}),
				(t.Vector.prototype.similarity = function (e) {
					return this.dot(e) / this.magnitude() || 0
				}),
				(t.Vector.prototype.toArray = function () {
					for (var e = new Array(this.elements.length / 2), n = 1, r = 0; n < this.elements.length; n += 2, r++)
						e[r] = this.elements[n]
					return e
				}),
				(t.Vector.prototype.toJSON = function () {
					return this.elements
				})
			;(t.stemmer = (() => {
				var e = {
						ational: "ate",
						tional: "tion",
						enci: "ence",
						anci: "ance",
						izer: "ize",
						bli: "ble",
						alli: "al",
						entli: "ent",
						eli: "e",
						ousli: "ous",
						ization: "ize",
						ation: "ate",
						ator: "ate",
						alism: "al",
						iveness: "ive",
						fulness: "ful",
						ousness: "ous",
						aliti: "al",
						iviti: "ive",
						biliti: "ble",
						logi: "log",
					},
					n = { icate: "ic", ative: "", alize: "al", iciti: "ic", ical: "ic", ful: "", ness: "" },
					r = "[^aeiou]",
					i = "[aeiouy]",
					s = r + "[^aeiouy]*",
					o = i + "[aeiou]*",
					a = "^(" + s + ")?" + o + s,
					l = "^(" + s + ")?" + o + s + "(" + o + ")?$",
					c = "^(" + s + ")?" + o + s + o + s,
					d = "^(" + s + ")?" + i,
					m = new RegExp(a),
					p = new RegExp(c),
					b = new RegExp(l),
					v = new RegExp(d),
					L = /^(.+?)(ss|i)es$/,
					f = /^(.+?)([^s])s$/,
					y = /^(.+?)eed$/,
					S = /^(.+?)(ed|ing)$/,
					w = /.$/,
					k = /(at|bl|iz)$/,
					_ = /([^aeiouylsz])\1$/,
					q = new RegExp("^" + s + i + "[^aeiouwxy]$"),
					F = /^(.+?[^aeiou])y$/,
					j =
						/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,
					$ = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,
					N = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,
					z = /^(.+?)(s|t)(ion)$/,
					Q = /^(.+?)e$/,
					W = /ll$/,
					U = new RegExp("^" + s + i + "[^aeiouwxy]$"),
					V = (u) => {
						var g, P, T, h, x, O, R
						if (u.length < 3) return u
						if (
							((T = u.substr(0, 1)),
							T == "y" && (u = T.toUpperCase() + u.substr(1)),
							(h = L),
							(x = f),
							h.test(u) ? (u = u.replace(h, "$1$2")) : x.test(u) && (u = u.replace(x, "$1$2")),
							(h = y),
							(x = S),
							h.test(u))
						) {
							var E = h.exec(u)
							;(h = m), h.test(E[1]) && ((h = w), (u = u.replace(h, "")))
						} else if (x.test(u)) {
							var E = x.exec(u)
							;(g = E[1]),
								(x = v),
								x.test(g) &&
									((u = g),
									(x = k),
									(O = _),
									(R = q),
									x.test(u)
										? (u = u + "e")
										: O.test(u)
											? ((h = w), (u = u.replace(h, "")))
											: R.test(u) && (u = u + "e"))
						}
						if (((h = F), h.test(u))) {
							var E = h.exec(u)
							;(g = E[1]), (u = g + "i")
						}
						if (((h = j), h.test(u))) {
							var E = h.exec(u)
							;(g = E[1]), (P = E[2]), (h = m), h.test(g) && (u = g + e[P])
						}
						if (((h = $), h.test(u))) {
							var E = h.exec(u)
							;(g = E[1]), (P = E[2]), (h = m), h.test(g) && (u = g + n[P])
						}
						if (((h = N), (x = z), h.test(u))) {
							var E = h.exec(u)
							;(g = E[1]), (h = p), h.test(g) && (u = g)
						} else if (x.test(u)) {
							var E = x.exec(u)
							;(g = E[1] + E[2]), (x = p), x.test(g) && (u = g)
						}
						if (((h = Q), h.test(u))) {
							var E = h.exec(u)
							;(g = E[1]), (h = p), (x = b), (O = U), (h.test(g) || (x.test(g) && !O.test(g))) && (u = g)
						}
						return (
							(h = W),
							(x = p),
							h.test(u) && x.test(u) && ((h = w), (u = u.replace(h, ""))),
							T == "y" && (u = T.toLowerCase() + u.substr(1)),
							u
						)
					}
				return (M) => M.update(V)
			})()),
				t.Pipeline.registerFunction(t.stemmer, "stemmer")
			;(t.generateStopWordFilter = (e) => {
				var n = e.reduce((r, i) => ((r[i] = i), r), {})
				return (r) => {
					if (r && n[r.toString()] !== r.toString()) return r
				}
			}),
				(t.stopWordFilter = t.generateStopWordFilter([
					"a",
					"able",
					"about",
					"across",
					"after",
					"all",
					"almost",
					"also",
					"am",
					"among",
					"an",
					"and",
					"any",
					"are",
					"as",
					"at",
					"be",
					"because",
					"been",
					"but",
					"by",
					"can",
					"cannot",
					"could",
					"dear",
					"did",
					"do",
					"does",
					"either",
					"else",
					"ever",
					"every",
					"for",
					"from",
					"get",
					"got",
					"had",
					"has",
					"have",
					"he",
					"her",
					"hers",
					"him",
					"his",
					"how",
					"however",
					"i",
					"if",
					"in",
					"into",
					"is",
					"it",
					"its",
					"just",
					"least",
					"let",
					"like",
					"likely",
					"may",
					"me",
					"might",
					"most",
					"must",
					"my",
					"neither",
					"no",
					"nor",
					"not",
					"of",
					"off",
					"often",
					"on",
					"only",
					"or",
					"other",
					"our",
					"own",
					"rather",
					"said",
					"say",
					"says",
					"she",
					"should",
					"since",
					"so",
					"some",
					"than",
					"that",
					"the",
					"their",
					"them",
					"then",
					"there",
					"these",
					"they",
					"this",
					"tis",
					"to",
					"too",
					"twas",
					"us",
					"wants",
					"was",
					"we",
					"were",
					"what",
					"when",
					"where",
					"which",
					"while",
					"who",
					"whom",
					"why",
					"will",
					"with",
					"would",
					"yet",
					"you",
					"your",
				])),
				t.Pipeline.registerFunction(t.stopWordFilter, "stopWordFilter")
			;(t.trimmer = (e) => e.update((n) => n.replace(/^\W+/, "").replace(/\W+$/, ""))),
				t.Pipeline.registerFunction(t.trimmer, "trimmer")
			;(t.TokenSet = function () {
				;(this.final = !1), (this.edges = {}), (this.id = t.TokenSet._nextId), (t.TokenSet._nextId += 1)
			}),
				(t.TokenSet._nextId = 1),
				(t.TokenSet.fromArray = (e) => {
					for (var n = new t.TokenSet.Builder(), r = 0, i = e.length; r < i; r++) n.insert(e[r])
					return n.finish(), n.root
				}),
				(t.TokenSet.fromClause = (e) =>
					"editDistance" in e ? t.TokenSet.fromFuzzyString(e.term, e.editDistance) : t.TokenSet.fromString(e.term)),
				(t.TokenSet.fromFuzzyString = (e, n) => {
					for (var r = new t.TokenSet(), i = [{ node: r, editsRemaining: n, str: e }]; i.length; ) {
						var s = i.pop()
						if (s.str.length > 0) {
							var o = s.str.charAt(0),
								a
							o in s.node.edges ? (a = s.node.edges[o]) : ((a = new t.TokenSet()), (s.node.edges[o] = a)),
								s.str.length == 1 && (a.final = !0),
								i.push({ node: a, editsRemaining: s.editsRemaining, str: s.str.slice(1) })
						}
						if (s.editsRemaining != 0) {
							if ("*" in s.node.edges) var l = s.node.edges["*"]
							else {
								var l = new t.TokenSet()
								s.node.edges["*"] = l
							}
							if (
								(s.str.length == 0 && (l.final = !0),
								i.push({ node: l, editsRemaining: s.editsRemaining - 1, str: s.str }),
								s.str.length > 1 && i.push({ node: s.node, editsRemaining: s.editsRemaining - 1, str: s.str.slice(1) }),
								s.str.length == 1 && (s.node.final = !0),
								s.str.length >= 1)
							) {
								if ("*" in s.node.edges) var c = s.node.edges["*"]
								else {
									var c = new t.TokenSet()
									s.node.edges["*"] = c
								}
								s.str.length == 1 && (c.final = !0),
									i.push({ node: c, editsRemaining: s.editsRemaining - 1, str: s.str.slice(1) })
							}
							if (s.str.length > 1) {
								var d = s.str.charAt(0),
									m = s.str.charAt(1),
									p
								m in s.node.edges ? (p = s.node.edges[m]) : ((p = new t.TokenSet()), (s.node.edges[m] = p)),
									s.str.length == 1 && (p.final = !0),
									i.push({ node: p, editsRemaining: s.editsRemaining - 1, str: d + s.str.slice(2) })
							}
						}
					}
					return r
				}),
				(t.TokenSet.fromString = (e) => {
					for (var n = new t.TokenSet(), r = n, i = 0, s = e.length; i < s; i++) {
						var o = e[i],
							a = i == s - 1
						if (o == "*") (n.edges[o] = n), (n.final = a)
						else {
							var l = new t.TokenSet()
							;(l.final = a), (n.edges[o] = l), (n = l)
						}
					}
					return r
				}),
				(t.TokenSet.prototype.toArray = function () {
					for (var e = [], n = [{ prefix: "", node: this }]; n.length; ) {
						var r = n.pop(),
							i = Object.keys(r.node.edges),
							s = i.length
						r.node.final && (r.prefix.charAt(0), e.push(r.prefix))
						for (var o = 0; o < s; o++) {
							var a = i[o]
							n.push({ prefix: r.prefix.concat(a), node: r.node.edges[a] })
						}
					}
					return e
				}),
				(t.TokenSet.prototype.toString = function () {
					if (this._str) return this._str
					for (var e = this.final ? "1" : "0", n = Object.keys(this.edges).sort(), r = n.length, i = 0; i < r; i++) {
						var s = n[i],
							o = this.edges[s]
						e = e + s + o.id
					}
					return e
				}),
				(t.TokenSet.prototype.intersect = function (e) {
					for (var n = new t.TokenSet(), r = void 0, i = [{ qNode: e, output: n, node: this }]; i.length; ) {
						r = i.pop()
						for (
							var s = Object.keys(r.qNode.edges), o = s.length, a = Object.keys(r.node.edges), l = a.length, c = 0;
							c < o;
							c++
						)
							for (var d = s[c], m = 0; m < l; m++) {
								var p = a[m]
								if (p == d || d == "*") {
									var b = r.node.edges[p],
										v = r.qNode.edges[d],
										L = b.final && v.final,
										f = void 0
									p in r.output.edges
										? ((f = r.output.edges[p]), (f.final = f.final || L))
										: ((f = new t.TokenSet()), (f.final = L), (r.output.edges[p] = f)),
										i.push({ qNode: v, output: f, node: b })
								}
							}
					}
					return n
				}),
				(t.TokenSet.Builder = function () {
					;(this.previousWord = ""),
						(this.root = new t.TokenSet()),
						(this.uncheckedNodes = []),
						(this.minimizedNodes = {})
				}),
				(t.TokenSet.Builder.prototype.insert = function (e) {
					var n,
						r = 0
					if (e < this.previousWord) throw new Error("Out of order word insertion")
					for (var i = 0; i < e.length && i < this.previousWord.length && e[i] == this.previousWord[i]; i++) r++
					this.minimize(r),
						this.uncheckedNodes.length == 0
							? (n = this.root)
							: (n = this.uncheckedNodes[this.uncheckedNodes.length - 1].child)
					for (var i = r; i < e.length; i++) {
						var s = new t.TokenSet(),
							o = e[i]
						;(n.edges[o] = s), this.uncheckedNodes.push({ parent: n, char: o, child: s }), (n = s)
					}
					;(n.final = !0), (this.previousWord = e)
				}),
				(t.TokenSet.Builder.prototype.finish = function () {
					this.minimize(0)
				}),
				(t.TokenSet.Builder.prototype.minimize = function (e) {
					for (var n = this.uncheckedNodes.length - 1; n >= e; n--) {
						var r = this.uncheckedNodes[n],
							i = r.child.toString()
						i in this.minimizedNodes
							? (r.parent.edges[r.char] = this.minimizedNodes[i])
							: ((r.child._str = i), (this.minimizedNodes[i] = r.child)),
							this.uncheckedNodes.pop()
					}
				})
			;(t.Index = function (e) {
				;(this.invertedIndex = e.invertedIndex),
					(this.fieldVectors = e.fieldVectors),
					(this.tokenSet = e.tokenSet),
					(this.fields = e.fields),
					(this.pipeline = e.pipeline)
			}),
				(t.Index.prototype.search = function (e) {
					return this.query((n) => {
						var r = new t.QueryParser(e, n)
						r.parse()
					})
				}),
				(t.Index.prototype.query = function (e) {
					for (
						var n = new t.Query(this.fields),
							r = Object.create(null),
							i = Object.create(null),
							s = Object.create(null),
							o = Object.create(null),
							a = Object.create(null),
							l = 0;
						l < this.fields.length;
						l++
					)
						i[this.fields[l]] = new t.Vector()
					e.call(n, n)
					for (var l = 0; l < n.clauses.length; l++) {
						var c = n.clauses[l],
							d = null,
							m = t.Set.empty
						c.usePipeline ? (d = this.pipeline.runString(c.term, { fields: c.fields })) : (d = [c.term])
						for (var p = 0; p < d.length; p++) {
							var b = d[p]
							c.term = b
							var v = t.TokenSet.fromClause(c),
								L = this.tokenSet.intersect(v).toArray()
							if (L.length === 0 && c.presence === t.Query.presence.REQUIRED) {
								for (var f = 0; f < c.fields.length; f++) {
									var y = c.fields[f]
									o[y] = t.Set.empty
								}
								break
							}
							for (var S = 0; S < L.length; S++)
								for (var w = L[S], k = this.invertedIndex[w], _ = k._index, f = 0; f < c.fields.length; f++) {
									var y = c.fields[f],
										q = k[y],
										F = Object.keys(q),
										j = w + "/" + y,
										$ = new t.Set(F)
									if (
										(c.presence == t.Query.presence.REQUIRED &&
											((m = m.union($)), o[y] === void 0 && (o[y] = t.Set.complete)),
										c.presence == t.Query.presence.PROHIBITED)
									) {
										a[y] === void 0 && (a[y] = t.Set.empty), (a[y] = a[y].union($))
										continue
									}
									if ((i[y].upsert(_, c.boost, (He, Ae) => He + Ae), !s[j])) {
										for (var N = 0; N < F.length; N++) {
											var z = F[N],
												Q = new t.FieldRef(z, y),
												W = q[z],
												U
											;(U = r[Q]) === void 0 ? (r[Q] = new t.MatchData(w, y, W)) : U.add(w, y, W)
										}
										s[j] = !0
									}
								}
						}
						if (c.presence === t.Query.presence.REQUIRED)
							for (var f = 0; f < c.fields.length; f++) {
								var y = c.fields[f]
								o[y] = o[y].intersect(m)
							}
					}
					for (var V = t.Set.complete, M = t.Set.empty, l = 0; l < this.fields.length; l++) {
						var y = this.fields[l]
						o[y] && (V = V.intersect(o[y])), a[y] && (M = M.union(a[y]))
					}
					var u = Object.keys(r),
						g = [],
						P = Object.create(null)
					if (n.isNegated()) {
						u = Object.keys(this.fieldVectors)
						for (var l = 0; l < u.length; l++) {
							var Q = u[l],
								T = t.FieldRef.fromString(Q)
							r[Q] = new t.MatchData()
						}
					}
					for (var l = 0; l < u.length; l++) {
						var T = t.FieldRef.fromString(u[l]),
							h = T.docRef
						if (V.contains(h) && !M.contains(h)) {
							var x = this.fieldVectors[T],
								O = i[T.fieldName].similarity(x),
								R
							if ((R = P[h]) !== void 0) (R.score += O), R.matchData.combine(r[T])
							else {
								var E = { ref: h, score: O, matchData: r[T] }
								;(P[h] = E), g.push(E)
							}
						}
					}
					return g.sort((Me, Re) => Re.score - Me.score)
				}),
				(t.Index.prototype.toJSON = function () {
					var e = Object.keys(this.invertedIndex)
							.sort()
							.map(function (r) {
								return [r, this.invertedIndex[r]]
							}, this),
						n = Object.keys(this.fieldVectors).map(function (r) {
							return [r, this.fieldVectors[r].toJSON()]
						}, this)
					return {
						version: t.version,
						fields: this.fields,
						fieldVectors: n,
						invertedIndex: e,
						pipeline: this.pipeline.toJSON(),
					}
				}),
				(t.Index.load = (e) => {
					var n = {},
						r = {},
						i = e.fieldVectors,
						s = Object.create(null),
						o = e.invertedIndex,
						a = new t.TokenSet.Builder(),
						l = t.Pipeline.load(e.pipeline)
					e.version != t.version &&
						t.utils.warn(
							"Version mismatch when loading serialised index. Current version of lunr '" +
								t.version +
								"' does not match serialized index '" +
								e.version +
								"'"
						)
					for (var c = 0; c < i.length; c++) {
						var d = i[c],
							m = d[0],
							p = d[1]
						r[m] = new t.Vector(p)
					}
					for (var c = 0; c < o.length; c++) {
						var d = o[c],
							b = d[0],
							v = d[1]
						a.insert(b), (s[b] = v)
					}
					return (
						a.finish(),
						(n.fields = e.fields),
						(n.fieldVectors = r),
						(n.invertedIndex = s),
						(n.tokenSet = a.root),
						(n.pipeline = l),
						new t.Index(n)
					)
				})
			;(t.Builder = function () {
				;(this._ref = "id"),
					(this._fields = Object.create(null)),
					(this._documents = Object.create(null)),
					(this.invertedIndex = Object.create(null)),
					(this.fieldTermFrequencies = {}),
					(this.fieldLengths = {}),
					(this.tokenizer = t.tokenizer),
					(this.pipeline = new t.Pipeline()),
					(this.searchPipeline = new t.Pipeline()),
					(this.documentCount = 0),
					(this._b = 0.75),
					(this._k1 = 1.2),
					(this.termIndex = 0),
					(this.metadataWhitelist = [])
			}),
				(t.Builder.prototype.ref = function (e) {
					this._ref = e
				}),
				(t.Builder.prototype.field = function (e, n) {
					if (/\//.test(e)) throw new RangeError("Field '" + e + "' contains illegal character '/'")
					this._fields[e] = n || {}
				}),
				(t.Builder.prototype.b = function (e) {
					e < 0 ? (this._b = 0) : e > 1 ? (this._b = 1) : (this._b = e)
				}),
				(t.Builder.prototype.k1 = function (e) {
					this._k1 = e
				}),
				(t.Builder.prototype.add = function (e, n) {
					var r = e[this._ref],
						i = Object.keys(this._fields)
					;(this._documents[r] = n || {}), (this.documentCount += 1)
					for (var s = 0; s < i.length; s++) {
						var o = i[s],
							a = this._fields[o].extractor,
							l = a ? a(e) : e[o],
							c = this.tokenizer(l, { fields: [o] }),
							d = this.pipeline.run(c),
							m = new t.FieldRef(r, o),
							p = Object.create(null)
						;(this.fieldTermFrequencies[m] = p), (this.fieldLengths[m] = 0), (this.fieldLengths[m] += d.length)
						for (var b = 0; b < d.length; b++) {
							var v = d[b]
							if ((p[v] == null && (p[v] = 0), (p[v] += 1), this.invertedIndex[v] == null)) {
								var L = Object.create(null)
								;(L._index = this.termIndex), (this.termIndex += 1)
								for (var f = 0; f < i.length; f++) L[i[f]] = Object.create(null)
								this.invertedIndex[v] = L
							}
							this.invertedIndex[v][o][r] == null && (this.invertedIndex[v][o][r] = Object.create(null))
							for (var y = 0; y < this.metadataWhitelist.length; y++) {
								var S = this.metadataWhitelist[y],
									w = v.metadata[S]
								this.invertedIndex[v][o][r][S] == null && (this.invertedIndex[v][o][r][S] = []),
									this.invertedIndex[v][o][r][S].push(w)
							}
						}
					}
				}),
				(t.Builder.prototype.calculateAverageFieldLengths = function () {
					for (var e = Object.keys(this.fieldLengths), n = e.length, r = {}, i = {}, s = 0; s < n; s++) {
						var o = t.FieldRef.fromString(e[s]),
							a = o.fieldName
						i[a] || (i[a] = 0), (i[a] += 1), r[a] || (r[a] = 0), (r[a] += this.fieldLengths[o])
					}
					for (var l = Object.keys(this._fields), s = 0; s < l.length; s++) {
						var c = l[s]
						r[c] = r[c] / i[c]
					}
					this.averageFieldLength = r
				}),
				(t.Builder.prototype.createFieldVectors = function () {
					for (
						var e = {}, n = Object.keys(this.fieldTermFrequencies), r = n.length, i = Object.create(null), s = 0;
						s < r;
						s++
					) {
						for (
							var o = t.FieldRef.fromString(n[s]),
								a = o.fieldName,
								l = this.fieldLengths[o],
								c = new t.Vector(),
								d = this.fieldTermFrequencies[o],
								m = Object.keys(d),
								p = m.length,
								b = this._fields[a].boost || 1,
								v = this._documents[o.docRef].boost || 1,
								L = 0;
							L < p;
							L++
						) {
							var f = m[L],
								y = d[f],
								S = this.invertedIndex[f]._index,
								w,
								k,
								_
							i[f] === void 0 ? ((w = t.idf(this.invertedIndex[f], this.documentCount)), (i[f] = w)) : (w = i[f]),
								(k =
									(w * ((this._k1 + 1) * y)) /
									(this._k1 * (1 - this._b + this._b * (l / this.averageFieldLength[a])) + y)),
								(k *= b),
								(k *= v),
								(_ = Math.round(k * 1e3) / 1e3),
								c.insert(S, _)
						}
						e[o] = c
					}
					this.fieldVectors = e
				}),
				(t.Builder.prototype.createTokenSet = function () {
					this.tokenSet = t.TokenSet.fromArray(Object.keys(this.invertedIndex).sort())
				}),
				(t.Builder.prototype.build = function () {
					return (
						this.calculateAverageFieldLengths(),
						this.createFieldVectors(),
						this.createTokenSet(),
						new t.Index({
							invertedIndex: this.invertedIndex,
							fieldVectors: this.fieldVectors,
							tokenSet: this.tokenSet,
							fields: Object.keys(this._fields),
							pipeline: this.searchPipeline,
						})
					)
				}),
				(t.Builder.prototype.use = function (e) {
					var n = Array.prototype.slice.call(arguments, 1)
					n.unshift(this), e.apply(this, n)
				}),
				(t.MatchData = function (e, n, r) {
					for (var i = Object.create(null), s = Object.keys(r || {}), o = 0; o < s.length; o++) {
						var a = s[o]
						i[a] = r[a].slice()
					}
					;(this.metadata = Object.create(null)),
						e !== void 0 && ((this.metadata[e] = Object.create(null)), (this.metadata[e][n] = i))
				}),
				(t.MatchData.prototype.combine = function (e) {
					for (var n = Object.keys(e.metadata), r = 0; r < n.length; r++) {
						var i = n[r],
							s = Object.keys(e.metadata[i])
						this.metadata[i] == null && (this.metadata[i] = Object.create(null))
						for (var o = 0; o < s.length; o++) {
							var a = s[o],
								l = Object.keys(e.metadata[i][a])
							this.metadata[i][a] == null && (this.metadata[i][a] = Object.create(null))
							for (var c = 0; c < l.length; c++) {
								var d = l[c]
								this.metadata[i][a][d] == null
									? (this.metadata[i][a][d] = e.metadata[i][a][d])
									: (this.metadata[i][a][d] = this.metadata[i][a][d].concat(e.metadata[i][a][d]))
							}
						}
					}
				}),
				(t.MatchData.prototype.add = function (e, n, r) {
					if (!(e in this.metadata)) {
						;(this.metadata[e] = Object.create(null)), (this.metadata[e][n] = r)
						return
					}
					if (!(n in this.metadata[e])) {
						this.metadata[e][n] = r
						return
					}
					for (var i = Object.keys(r), s = 0; s < i.length; s++) {
						var o = i[s]
						o in this.metadata[e][n]
							? (this.metadata[e][n][o] = this.metadata[e][n][o].concat(r[o]))
							: (this.metadata[e][n][o] = r[o])
					}
				}),
				(t.Query = function (e) {
					;(this.clauses = []), (this.allFields = e)
				}),
				(t.Query.wildcard = new String("*")),
				(t.Query.wildcard.NONE = 0),
				(t.Query.wildcard.LEADING = 1),
				(t.Query.wildcard.TRAILING = 2),
				(t.Query.presence = { OPTIONAL: 1, REQUIRED: 2, PROHIBITED: 3 }),
				(t.Query.prototype.clause = function (e) {
					return (
						"fields" in e || (e.fields = this.allFields),
						"boost" in e || (e.boost = 1),
						"usePipeline" in e || (e.usePipeline = !0),
						"wildcard" in e || (e.wildcard = t.Query.wildcard.NONE),
						e.wildcard & t.Query.wildcard.LEADING && e.term.charAt(0) != t.Query.wildcard && (e.term = "*" + e.term),
						e.wildcard & t.Query.wildcard.TRAILING &&
							e.term.slice(-1) != t.Query.wildcard &&
							(e.term = "" + e.term + "*"),
						"presence" in e || (e.presence = t.Query.presence.OPTIONAL),
						this.clauses.push(e),
						this
					)
				}),
				(t.Query.prototype.isNegated = function () {
					for (var e = 0; e < this.clauses.length; e++)
						if (this.clauses[e].presence != t.Query.presence.PROHIBITED) return !1
					return !0
				}),
				(t.Query.prototype.term = function (e, n) {
					if (Array.isArray(e))
						return (
							e.forEach(function (i) {
								this.term(i, t.utils.clone(n))
							}, this),
							this
						)
					var r = n || {}
					return (r.term = e.toString()), this.clause(r), this
				}),
				(t.QueryParseError = function (e, n, r) {
					;(this.name = "QueryParseError"), (this.message = e), (this.start = n), (this.end = r)
				}),
				(t.QueryParseError.prototype = new Error()),
				(t.QueryLexer = function (e) {
					;(this.lexemes = []),
						(this.str = e),
						(this.length = e.length),
						(this.pos = 0),
						(this.start = 0),
						(this.escapeCharPositions = [])
				}),
				(t.QueryLexer.prototype.run = function () {
					for (var e = t.QueryLexer.lexText; e; ) e = e(this)
				}),
				(t.QueryLexer.prototype.sliceString = function () {
					for (var e = [], n = this.start, r = this.pos, i = 0; i < this.escapeCharPositions.length; i++)
						(r = this.escapeCharPositions[i]), e.push(this.str.slice(n, r)), (n = r + 1)
					return e.push(this.str.slice(n, this.pos)), (this.escapeCharPositions.length = 0), e.join("")
				}),
				(t.QueryLexer.prototype.emit = function (e) {
					this.lexemes.push({ type: e, str: this.sliceString(), start: this.start, end: this.pos }),
						(this.start = this.pos)
				}),
				(t.QueryLexer.prototype.escapeCharacter = function () {
					this.escapeCharPositions.push(this.pos - 1), (this.pos += 1)
				}),
				(t.QueryLexer.prototype.next = function () {
					if (this.pos >= this.length) return t.QueryLexer.EOS
					var e = this.str.charAt(this.pos)
					return (this.pos += 1), e
				}),
				(t.QueryLexer.prototype.width = function () {
					return this.pos - this.start
				}),
				(t.QueryLexer.prototype.ignore = function () {
					this.start == this.pos && (this.pos += 1), (this.start = this.pos)
				}),
				(t.QueryLexer.prototype.backup = function () {
					this.pos -= 1
				}),
				(t.QueryLexer.prototype.acceptDigitRun = function () {
					var e, n
					do (e = this.next()), (n = e.charCodeAt(0))
					while (n > 47 && n < 58)
					e != t.QueryLexer.EOS && this.backup()
				}),
				(t.QueryLexer.prototype.more = function () {
					return this.pos < this.length
				}),
				(t.QueryLexer.EOS = "EOS"),
				(t.QueryLexer.FIELD = "FIELD"),
				(t.QueryLexer.TERM = "TERM"),
				(t.QueryLexer.EDIT_DISTANCE = "EDIT_DISTANCE"),
				(t.QueryLexer.BOOST = "BOOST"),
				(t.QueryLexer.PRESENCE = "PRESENCE"),
				(t.QueryLexer.lexField = (e) => (e.backup(), e.emit(t.QueryLexer.FIELD), e.ignore(), t.QueryLexer.lexText)),
				(t.QueryLexer.lexTerm = (e) => {
					if ((e.width() > 1 && (e.backup(), e.emit(t.QueryLexer.TERM)), e.ignore(), e.more()))
						return t.QueryLexer.lexText
				}),
				(t.QueryLexer.lexEditDistance = (e) => (
					e.ignore(), e.acceptDigitRun(), e.emit(t.QueryLexer.EDIT_DISTANCE), t.QueryLexer.lexText
				)),
				(t.QueryLexer.lexBoost = (e) => (
					e.ignore(), e.acceptDigitRun(), e.emit(t.QueryLexer.BOOST), t.QueryLexer.lexText
				)),
				(t.QueryLexer.lexEOS = (e) => {
					e.width() > 0 && e.emit(t.QueryLexer.TERM)
				}),
				(t.QueryLexer.termSeparator = t.tokenizer.separator),
				(t.QueryLexer.lexText = (e) => {
					for (;;) {
						var n = e.next()
						if (n == t.QueryLexer.EOS) return t.QueryLexer.lexEOS
						if (n.charCodeAt(0) == 92) {
							e.escapeCharacter()
							continue
						}
						if (n == ":") return t.QueryLexer.lexField
						if (n == "~") return e.backup(), e.width() > 0 && e.emit(t.QueryLexer.TERM), t.QueryLexer.lexEditDistance
						if (n == "^") return e.backup(), e.width() > 0 && e.emit(t.QueryLexer.TERM), t.QueryLexer.lexBoost
						if ((n == "+" && e.width() === 1) || (n == "-" && e.width() === 1))
							return e.emit(t.QueryLexer.PRESENCE), t.QueryLexer.lexText
						if (n.match(t.QueryLexer.termSeparator)) return t.QueryLexer.lexTerm
					}
				}),
				(t.QueryParser = function (e, n) {
					;(this.lexer = new t.QueryLexer(e)), (this.query = n), (this.currentClause = {}), (this.lexemeIdx = 0)
				}),
				(t.QueryParser.prototype.parse = function () {
					this.lexer.run(), (this.lexemes = this.lexer.lexemes)
					for (var e = t.QueryParser.parseClause; e; ) e = e(this)
					return this.query
				}),
				(t.QueryParser.prototype.peekLexeme = function () {
					return this.lexemes[this.lexemeIdx]
				}),
				(t.QueryParser.prototype.consumeLexeme = function () {
					var e = this.peekLexeme()
					return (this.lexemeIdx += 1), e
				}),
				(t.QueryParser.prototype.nextClause = function () {
					var e = this.currentClause
					this.query.clause(e), (this.currentClause = {})
				}),
				(t.QueryParser.parseClause = (e) => {
					var n = e.peekLexeme()
					if (n != null)
						switch (n.type) {
							case t.QueryLexer.PRESENCE:
								return t.QueryParser.parsePresence
							case t.QueryLexer.FIELD:
								return t.QueryParser.parseField
							case t.QueryLexer.TERM:
								return t.QueryParser.parseTerm
							default:
								var r = "expected either a field or a term, found " + n.type
								throw (
									(n.str.length >= 1 && (r += " with value '" + n.str + "'"), new t.QueryParseError(r, n.start, n.end))
								)
						}
				}),
				(t.QueryParser.parsePresence = (e) => {
					var n = e.consumeLexeme()
					if (n != null) {
						switch (n.str) {
							case "-":
								e.currentClause.presence = t.Query.presence.PROHIBITED
								break
							case "+":
								e.currentClause.presence = t.Query.presence.REQUIRED
								break
							default:
								var r = "unrecognised presence operator'" + n.str + "'"
								throw new t.QueryParseError(r, n.start, n.end)
						}
						var i = e.peekLexeme()
						if (i == null) {
							var r = "expecting term or field, found nothing"
							throw new t.QueryParseError(r, n.start, n.end)
						}
						switch (i.type) {
							case t.QueryLexer.FIELD:
								return t.QueryParser.parseField
							case t.QueryLexer.TERM:
								return t.QueryParser.parseTerm
							default:
								var r = "expecting term or field, found '" + i.type + "'"
								throw new t.QueryParseError(r, i.start, i.end)
						}
					}
				}),
				(t.QueryParser.parseField = (e) => {
					var n = e.consumeLexeme()
					if (n != null) {
						if (e.query.allFields.indexOf(n.str) == -1) {
							var r = e.query.allFields.map((o) => "'" + o + "'").join(", "),
								i = "unrecognised field '" + n.str + "', possible fields: " + r
							throw new t.QueryParseError(i, n.start, n.end)
						}
						e.currentClause.fields = [n.str]
						var s = e.peekLexeme()
						if (s == null) {
							var i = "expecting term, found nothing"
							throw new t.QueryParseError(i, n.start, n.end)
						}
						switch (s.type) {
							case t.QueryLexer.TERM:
								return t.QueryParser.parseTerm
							default:
								var i = "expecting term, found '" + s.type + "'"
								throw new t.QueryParseError(i, s.start, s.end)
						}
					}
				}),
				(t.QueryParser.parseTerm = (e) => {
					var n = e.consumeLexeme()
					if (n != null) {
						;(e.currentClause.term = n.str.toLowerCase()),
							n.str.indexOf("*") != -1 && (e.currentClause.usePipeline = !1)
						var r = e.peekLexeme()
						if (r == null) {
							e.nextClause()
							return
						}
						switch (r.type) {
							case t.QueryLexer.TERM:
								return e.nextClause(), t.QueryParser.parseTerm
							case t.QueryLexer.FIELD:
								return e.nextClause(), t.QueryParser.parseField
							case t.QueryLexer.EDIT_DISTANCE:
								return t.QueryParser.parseEditDistance
							case t.QueryLexer.BOOST:
								return t.QueryParser.parseBoost
							case t.QueryLexer.PRESENCE:
								return e.nextClause(), t.QueryParser.parsePresence
							default:
								var i = "Unexpected lexeme type '" + r.type + "'"
								throw new t.QueryParseError(i, r.start, r.end)
						}
					}
				}),
				(t.QueryParser.parseEditDistance = (e) => {
					var n = e.consumeLexeme()
					if (n != null) {
						var r = Number.parseInt(n.str, 10)
						if (isNaN(r)) {
							var i = "edit distance must be numeric"
							throw new t.QueryParseError(i, n.start, n.end)
						}
						e.currentClause.editDistance = r
						var s = e.peekLexeme()
						if (s == null) {
							e.nextClause()
							return
						}
						switch (s.type) {
							case t.QueryLexer.TERM:
								return e.nextClause(), t.QueryParser.parseTerm
							case t.QueryLexer.FIELD:
								return e.nextClause(), t.QueryParser.parseField
							case t.QueryLexer.EDIT_DISTANCE:
								return t.QueryParser.parseEditDistance
							case t.QueryLexer.BOOST:
								return t.QueryParser.parseBoost
							case t.QueryLexer.PRESENCE:
								return e.nextClause(), t.QueryParser.parsePresence
							default:
								var i = "Unexpected lexeme type '" + s.type + "'"
								throw new t.QueryParseError(i, s.start, s.end)
						}
					}
				}),
				(t.QueryParser.parseBoost = (e) => {
					var n = e.consumeLexeme()
					if (n != null) {
						var r = Number.parseInt(n.str, 10)
						if (isNaN(r)) {
							var i = "boost must be numeric"
							throw new t.QueryParseError(i, n.start, n.end)
						}
						e.currentClause.boost = r
						var s = e.peekLexeme()
						if (s == null) {
							e.nextClause()
							return
						}
						switch (s.type) {
							case t.QueryLexer.TERM:
								return e.nextClause(), t.QueryParser.parseTerm
							case t.QueryLexer.FIELD:
								return e.nextClause(), t.QueryParser.parseField
							case t.QueryLexer.EDIT_DISTANCE:
								return t.QueryParser.parseEditDistance
							case t.QueryLexer.BOOST:
								return t.QueryParser.parseBoost
							case t.QueryLexer.PRESENCE:
								return e.nextClause(), t.QueryParser.parsePresence
							default:
								var i = "Unexpected lexeme type '" + s.type + "'"
								throw new t.QueryParseError(i, s.start, s.end)
						}
					}
				}),
				((e, n) => {
					typeof define == "function" && define.amd
						? define(n)
						: typeof de == "object"
							? (he.exports = n())
							: (e.lunr = n())
				})(this, () => t)
		})()
	})
	window.translations ||= {
		copy: "Copy",
		copied: "Copied!",
		normally_hidden: "This member is normally hidden due to your filter settings.",
		hierarchy_expand: "Expand",
		hierarchy_collapse: "Collapse",
	}
	var ce = []
	function G(t, e) {
		ce.push({ selector: e, constructor: t })
	}
	var J = class {
		alwaysVisibleMember = null
		constructor() {
			this.createComponents(document.body),
				this.ensureFocusedElementVisible(),
				this.listenForCodeCopies(),
				window.addEventListener("hashchange", () => this.ensureFocusedElementVisible()),
				document.body.style.display ||
					(this.ensureFocusedElementVisible(), this.updateIndexVisibility(), this.scrollToHash())
		}
		createComponents(e) {
			ce.forEach((n) => {
				e.querySelectorAll(n.selector).forEach((r) => {
					r.dataset.hasInstance || (new n.constructor({ el: r, app: this }), (r.dataset.hasInstance = String(!0)))
				})
			})
		}
		filterChanged() {
			this.ensureFocusedElementVisible()
		}
		showPage() {
			document.body.style.display &&
				(document.body.style.removeProperty("display"),
				this.ensureFocusedElementVisible(),
				this.updateIndexVisibility(),
				this.scrollToHash())
		}
		scrollToHash() {
			if (location.hash) {
				const e = document.getElementById(location.hash.substring(1))
				if (!e) return
				e.scrollIntoView({ behavior: "instant", block: "start" })
			}
		}
		ensureActivePageVisible() {
			let e = document.querySelector(".tsd-navigation .current"),
				n = e?.parentElement
			while (n && !n.classList.contains(".tsd-navigation"))
				n instanceof HTMLDetailsElement && (n.open = !0), (n = n.parentElement)
			if (e && !ze(e)) {
				const r = e.getBoundingClientRect().top - document.documentElement.clientHeight / 4
				;(document.querySelector(".site-menu").scrollTop = r), (document.querySelector(".col-sidebar").scrollTop = r)
			}
		}
		updateIndexVisibility() {
			const e = document.querySelector(".tsd-index-content"),
				n = e?.open
			e && (e.open = !0),
				document.querySelectorAll(".tsd-index-section").forEach((r) => {
					r.style.display = "block"
					const i = Array.from(r.querySelectorAll(".tsd-index-link")).every((s) => s.offsetParent == null)
					r.style.display = i ? "none" : "block"
				}),
				e && (e.open = n)
		}
		ensureFocusedElementVisible() {
			if (
				(this.alwaysVisibleMember &&
					(this.alwaysVisibleMember.classList.remove("always-visible"),
					this.alwaysVisibleMember.firstElementChild.remove(),
					(this.alwaysVisibleMember = null)),
				!location.hash)
			)
				return
			const e = document.getElementById(location.hash.substring(1))
			if (!e) return
			let n = e.parentElement
			while (n && n.tagName !== "SECTION") n = n.parentElement
			if (!n) return
			let r = n.offsetParent == null,
				i = n
			while (i !== document.body) i instanceof HTMLDetailsElement && (i.open = !0), (i = i.parentElement)
			if (n.offsetParent == null) {
				;(this.alwaysVisibleMember = n), n.classList.add("always-visible")
				const s = document.createElement("p")
				s.classList.add("warning"), (s.textContent = window.translations.normally_hidden), n.prepend(s)
			}
			r && e.scrollIntoView()
		}
		listenForCodeCopies() {
			document.querySelectorAll("pre > button").forEach((e) => {
				let n
				e.addEventListener("click", () => {
					e.previousElementSibling instanceof HTMLElement &&
						navigator.clipboard.writeText(e.previousElementSibling.innerText.trim()),
						(e.textContent = window.translations.copied),
						e.classList.add("visible"),
						clearTimeout(n),
						(n = setTimeout(() => {
							e.classList.remove("visible"),
								(n = setTimeout(() => {
									e.textContent = window.translations.copy
								}, 100))
						}, 1e3))
				})
			})
		}
	}
	function ze(t) {
		const e = t.getBoundingClientRect(),
			n = Math.max(document.documentElement.clientHeight, window.innerHeight)
		return !(e.bottom < 0 || e.top - n >= 0)
	}
	var ue = (t, e = 100) => {
		let n
		return () => {
			clearTimeout(n), (n = setTimeout(() => t(), e))
		}
	}
	var ge = $e(pe(), 1)
	async function H(t) {
		const e = Uint8Array.from(atob(t), (s) => s.charCodeAt(0)),
			r = new Blob([e]).stream().pipeThrough(new DecompressionStream("deflate")),
			i = await new Response(r).text()
		return JSON.parse(i)
	}
	async function fe(t, e) {
		if (!window.searchData) return
		const n = await H(window.searchData)
		;(t.data = n), (t.index = ge.Index.load(n.index)), e.classList.remove("loading"), e.classList.add("ready")
	}
	function ve() {
		const t = document.getElementById("tsd-search")
		if (!t) return
		const e = { base: document.documentElement.dataset.base + "/" },
			n = document.getElementById("tsd-search-script")
		t.classList.add("loading"),
			n &&
				(n.addEventListener("error", () => {
					t.classList.remove("loading"), t.classList.add("failure")
				}),
				n.addEventListener("load", () => {
					fe(e, t)
				}),
				fe(e, t))
		const r = document.querySelector("#tsd-search input"),
			i = document.querySelector("#tsd-search .results")
		if (!r || !i) throw new Error("The input field or the result list wrapper was not found")
		i.addEventListener("mouseup", () => {
			re(t)
		}),
			r.addEventListener("focus", () => t.classList.add("has-focus")),
			We(t, i, r, e)
	}
	function We(t, e, n, r) {
		n.addEventListener(
			"input",
			ue(() => {
				Ue(t, e, n, r)
			}, 200)
		),
			n.addEventListener("keydown", (i) => {
				i.key == "Enter"
					? Je(e, t)
					: i.key == "ArrowUp"
						? (me(e, n, -1), i.preventDefault())
						: i.key === "ArrowDown" && (me(e, n, 1), i.preventDefault())
			}),
			document.body.addEventListener("keypress", (i) => {
				i.altKey || i.ctrlKey || i.metaKey || (!n.matches(":focus") && i.key === "/" && (i.preventDefault(), n.focus()))
			}),
			document.body.addEventListener("keyup", (i) => {
				t.classList.contains("has-focus") &&
					(i.key === "Escape" || (!e.matches(":focus-within") && !n.matches(":focus"))) &&
					(n.blur(), re(t))
			})
	}
	function re(t) {
		t.classList.remove("has-focus")
	}
	function Ue(t, e, n, r) {
		if (!r.index || !r.data) return
		e.textContent = ""
		let i = n.value.trim(),
			s
		if (i) {
			const o = i
				.split(" ")
				.map((a) => (a.length ? `*${a}*` : ""))
				.join(" ")
			s = r.index.search(o)
		} else s = []
		for (let o = 0; o < s.length; o++) {
			let a = s[o],
				l = r.data.rows[Number(a.ref)],
				c = 1
			l.name.toLowerCase().startsWith(i.toLowerCase()) && (c *= 1 + 1 / (1 + Math.abs(l.name.length - i.length))),
				(a.score *= c)
		}
		if (s.length === 0) {
			const o = document.createElement("li")
			o.classList.add("no-results")
			const a = document.createElement("span")
			;(a.textContent = "No results found"), o.appendChild(a), e.appendChild(o)
		}
		s.sort((o, a) => a.score - o.score)
		for (let o = 0, a = Math.min(10, s.length); o < a; o++) {
			let l = r.data.rows[Number(s[o].ref)],
				c = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="tsd-kind-icon"><use href="#icon-${l.kind}"></use></svg>`,
				d = ye(l.name, i)
			globalThis.DEBUG_SEARCH_WEIGHTS && (d += ` (score: ${s[o].score.toFixed(2)})`),
				l.parent &&
					(d = `<span class="parent">
                ${ye(l.parent, i)}.</span>${d}`)
			const m = document.createElement("li")
			m.classList.value = l.classes ?? ""
			const p = document.createElement("a")
			;(p.href = r.base + l.url),
				(p.innerHTML = c + d),
				m.append(p),
				p.addEventListener("focus", () => {
					e.querySelector(".current")?.classList.remove("current"), m.classList.add("current")
				}),
				e.appendChild(m)
		}
	}
	function me(t, e, n) {
		let r = t.querySelector(".current")
		if (!r) (r = t.querySelector(n == 1 ? "li:first-child" : "li:last-child")), r && r.classList.add("current")
		else {
			let i = r
			if (n === 1)
				do i = i.nextElementSibling ?? void 0
				while (i instanceof HTMLElement && i.offsetParent == null)
			else
				do i = i.previousElementSibling ?? void 0
				while (i instanceof HTMLElement && i.offsetParent == null)
			i
				? (r.classList.remove("current"), i.classList.add("current"))
				: n === -1 && (r.classList.remove("current"), e.focus())
		}
	}
	function Je(t, e) {
		let n = t.querySelector(".current")
		if ((n || (n = t.querySelector("li:first-child")), n)) {
			const r = n.querySelector("a")
			r && (window.location.href = r.href), re(e)
		}
	}
	function ye(t, e) {
		if (e === "") return t
		let n = t.toLocaleLowerCase(),
			r = e.toLocaleLowerCase(),
			i = [],
			s = 0,
			o = n.indexOf(r)
		while (o != -1)
			i.push(ne(t.substring(s, o)), `<b>${ne(t.substring(o, o + r.length))}</b>`),
				(s = o + r.length),
				(o = n.indexOf(r, s))
		return i.push(ne(t.substring(s))), i.join("")
	}
	var Ge = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" }
	function ne(t) {
		return t.replace(/[&<>"'"]/g, (e) => Ge[e])
	}
	var I = class {
		el
		app
		constructor(e) {
			;(this.el = e.el), (this.app = e.app)
		}
	}
	var A = "mousedown",
		Ee = "mousemove",
		B = "mouseup",
		X = { x: 0, y: 0 },
		xe = !1,
		ie = !1,
		Xe = !1,
		D = !1,
		Le = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
	document.documentElement.classList.add(Le ? "is-mobile" : "not-mobile")
	Le &&
		"ontouchstart" in document.documentElement &&
		((Xe = !0), (A = "touchstart"), (Ee = "touchmove"), (B = "touchend"))
	document.addEventListener(A, (t) => {
		;(ie = !0), (D = !1)
		const e = A == "touchstart" ? t.targetTouches[0] : t
		;(X.y = e.pageY || 0), (X.x = e.pageX || 0)
	})
	document.addEventListener(Ee, (t) => {
		if (ie && !D) {
			const e = A == "touchstart" ? t.targetTouches[0] : t,
				n = X.x - (e.pageX || 0),
				r = X.y - (e.pageY || 0)
			D = Math.sqrt(n * n + r * r) > 10
		}
	})
	document.addEventListener(B, () => {
		ie = !1
	})
	document.addEventListener("click", (t) => {
		xe && (t.preventDefault(), t.stopImmediatePropagation(), (xe = !1))
	})
	var Y = class extends I {
		active
		className
		constructor(e) {
			super(e),
				(this.className = this.el.dataset.toggle || ""),
				this.el.addEventListener(B, (n) => this.onPointerUp(n)),
				this.el.addEventListener("click", (n) => n.preventDefault()),
				document.addEventListener(A, (n) => this.onDocumentPointerDown(n)),
				document.addEventListener(B, (n) => this.onDocumentPointerUp(n))
		}
		setActive(e) {
			if (this.active == e) return
			;(this.active = e),
				document.documentElement.classList.toggle("has-" + this.className, e),
				this.el.classList.toggle("active", e)
			const n = (this.active ? "to-has-" : "from-has-") + this.className
			document.documentElement.classList.add(n), setTimeout(() => document.documentElement.classList.remove(n), 500)
		}
		onPointerUp(e) {
			D || (this.setActive(!0), e.preventDefault())
		}
		onDocumentPointerDown(e) {
			if (this.active) {
				if (e.target.closest(".col-sidebar, .tsd-filter-group")) return
				this.setActive(!1)
			}
		}
		onDocumentPointerUp(e) {
			if (!D && this.active && e.target.closest(".col-sidebar")) {
				const n = e.target.closest("a")
				if (n) {
					let r = window.location.href
					r.indexOf("#") != -1 && (r = r.substring(0, r.indexOf("#"))),
						n.href.substring(0, r.length) == r && setTimeout(() => this.setActive(!1), 250)
				}
			}
		}
	}
	var se
	try {
		se = localStorage
	} catch {
		se = {
			getItem() {
				return null
			},
			setItem() {},
		}
	}
	var C = se
	var be = document.head.appendChild(document.createElement("style"))
	be.dataset.for = "filters"
	var Z = class extends I {
		key
		value
		constructor(e) {
			super(e),
				(this.key = `filter-${this.el.name}`),
				(this.value = this.el.checked),
				this.el.addEventListener("change", () => {
					this.setLocalStorage(this.el.checked)
				}),
				this.setLocalStorage(this.fromLocalStorage()),
				(be.innerHTML += `html:not(.${this.key}) .tsd-is-${this.el.name} { display: none; }
`),
				this.app.updateIndexVisibility()
		}
		fromLocalStorage() {
			const e = C.getItem(this.key)
			return e ? e === "true" : this.el.checked
		}
		setLocalStorage(e) {
			C.setItem(this.key, e.toString()), (this.value = e), this.handleValueChange()
		}
		handleValueChange() {
			;(this.el.checked = this.value),
				document.documentElement.classList.toggle(this.key, this.value),
				this.app.filterChanged(),
				this.app.updateIndexVisibility()
		}
	}
	var oe = new Map(),
		ae = class {
			open
			accordions = []
			key
			constructor(e, n) {
				;(this.key = e), (this.open = n)
			}
			add(e) {
				this.accordions.push(e),
					(e.open = this.open),
					e.addEventListener("toggle", () => {
						this.toggle(e.open)
					})
			}
			toggle(e) {
				for (const n of this.accordions) n.open = e
				C.setItem(this.key, e.toString())
			}
		},
		K = class extends I {
			constructor(e) {
				super(e)
				const n = this.el.querySelector("summary"),
					r = n.querySelector("a")
				r &&
					r.addEventListener("click", () => {
						location.assign(r.href)
					})
				let i = `tsd-accordion-${n.dataset.key ?? n.textContent.trim().replace(/\s+/g, "-").toLowerCase()}`,
					s
				if (oe.has(i)) s = oe.get(i)
				else {
					const o = C.getItem(i),
						a = o ? o === "true" : this.el.open
					;(s = new ae(i, a)), oe.set(i, s)
				}
				s.add(this.el)
			}
		}
	function Se(t) {
		const e = C.getItem("tsd-theme") || "os"
		;(t.value = e),
			we(e),
			t.addEventListener("change", () => {
				C.setItem("tsd-theme", t.value), we(t.value)
			})
	}
	function we(t) {
		document.documentElement.dataset.theme = t
	}
	var ee
	function Ce() {
		const t = document.getElementById("tsd-nav-script")
		t && (t.addEventListener("load", Te), Te())
	}
	async function Te() {
		const t = document.getElementById("tsd-nav-container")
		if (!t || !window.navigationData) return
		const e = await H(window.navigationData)
		;(ee = document.documentElement.dataset.base), ee.endsWith("/") || (ee += "/"), (t.innerHTML = "")
		for (const n of e) Ie(n, t, [])
		window.app.createComponents(t), window.app.showPage(), window.app.ensureActivePageVisible()
	}
	function Ie(t, e, n) {
		const r = e.appendChild(document.createElement("li"))
		if (t.children) {
			const i = [...n, t.text],
				s = r.appendChild(document.createElement("details"))
			s.className = t.class ? `${t.class} tsd-accordion` : "tsd-accordion"
			const o = s.appendChild(document.createElement("summary"))
			;(o.className = "tsd-accordion-summary"),
				(o.dataset.key = i.join("$")),
				(o.innerHTML =
					'<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><use href="#icon-chevronDown"></use></svg>'),
				ke(t, o)
			const a = s.appendChild(document.createElement("div"))
			a.className = "tsd-accordion-details"
			const l = a.appendChild(document.createElement("ul"))
			l.className = "tsd-nested-navigation"
			for (const c of t.children) Ie(c, l, i)
		} else ke(t, r, t.class)
	}
	function ke(t, e, n) {
		if (t.path) {
			const r = e.appendChild(document.createElement("a"))
			;(r.href = ee + t.path),
				n && (r.className = n),
				location.pathname === r.pathname && !r.href.includes("#") && r.classList.add("current"),
				t.kind &&
					(r.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="tsd-kind-icon"><use href="#icon-${t.kind}"></use></svg>`),
				(r.appendChild(document.createElement("span")).textContent = t.text)
		} else {
			const r = e.appendChild(document.createElement("span"))
			;(r.innerHTML =
				'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="tsd-kind-icon"><use href="#icon-folder"></use></svg>'),
				(r.appendChild(document.createElement("span")).textContent = t.text)
		}
	}
	var te = document.documentElement.dataset.base
	te.endsWith("/") || (te += "/")
	function Pe() {
		document.querySelector(".tsd-full-hierarchy") ? Ye() : document.querySelector(".tsd-hierarchy") && Ze()
	}
	function Ye() {
		document.addEventListener("click", (r) => {
			let i = r.target
			while (i.parentElement && i.parentElement.tagName != "LI") i = i.parentElement
			i.dataset.dropdown && (i.dataset.dropdown = String(i.dataset.dropdown !== "true"))
		})
		const t = new Map(),
			e = new Set()
		for (const r of document.querySelectorAll(".tsd-full-hierarchy [data-refl]")) {
			const i = r.querySelector("ul")
			t.has(r.dataset.refl) ? e.add(r.dataset.refl) : i && t.set(r.dataset.refl, i)
		}
		for (const r of e) n(r)
		function n(r) {
			const i = t.get(r).cloneNode(!0)
			i.querySelectorAll("[id]").forEach((s) => {
				s.removeAttribute("id")
			}),
				i.querySelectorAll("[data-dropdown]").forEach((s) => {
					s.dataset.dropdown = "false"
				})
			for (const s of document.querySelectorAll(`[data-refl="${r}"]`)) {
				const o = tt(),
					a = s.querySelector("ul")
				s.insertBefore(o, a), (o.dataset.dropdown = String(!!a)), a || s.appendChild(i.cloneNode(!0))
			}
		}
	}
	function Ze() {
		const t = document.getElementById("tsd-hierarchy-script")
		t && (t.addEventListener("load", Qe), Qe())
	}
	async function Qe() {
		const t = document.querySelector(".tsd-panel.tsd-hierarchy:has(h4 a)")
		if (!t || !window.hierarchyData) return
		const e = +t.dataset.refl,
			n = await H(window.hierarchyData),
			r = t.querySelector("ul"),
			i = document.createElement("ul")
		if (
			(i.classList.add("tsd-hierarchy"),
			Ke(i, n, e),
			r.querySelectorAll("li").length == i.querySelectorAll("li").length)
		)
			return
		const s = document.createElement("span")
		s.classList.add("tsd-hierarchy-toggle"),
			(s.textContent = window.translations.hierarchy_expand),
			t.querySelector("h4 a")?.insertAdjacentElement("afterend", s),
			s.insertAdjacentText("beforebegin", ", "),
			s.addEventListener("click", () => {
				s.textContent === window.translations.hierarchy_expand
					? (r.insertAdjacentElement("afterend", i),
						r.remove(),
						(s.textContent = window.translations.hierarchy_collapse))
					: (i.insertAdjacentElement("afterend", r), i.remove(), (s.textContent = window.translations.hierarchy_expand))
			})
	}
	function Ke(t, e, n) {
		const r = e.roots.filter((i) => et(e, i, n))
		for (const i of r) t.appendChild(Oe(e, i, n))
	}
	function Oe(t, e, n, r = new Set()) {
		if (r.has(e)) return
		r.add(e)
		const i = t.reflections[e],
			s = document.createElement("li")
		if ((s.classList.add("tsd-hierarchy-item"), e === n)) {
			const o = s.appendChild(document.createElement("span"))
			;(o.textContent = i.name), o.classList.add("tsd-hierarchy-target")
		} else {
			for (const a of i.uniqueNameParents || []) {
				const l = t.reflections[a],
					c = s.appendChild(document.createElement("a"))
				;(c.textContent = l.name),
					(c.href = te + l.url),
					(c.className = l.class + " tsd-signature-type"),
					s.append(document.createTextNode("."))
			}
			const o = s.appendChild(document.createElement("a"))
			;(o.textContent = t.reflections[e].name), (o.href = te + i.url), (o.className = i.class + " tsd-signature-type")
		}
		if (i.children) {
			const o = s.appendChild(document.createElement("ul"))
			o.classList.add("tsd-hierarchy")
			for (const a of i.children) {
				const l = Oe(t, a, n, r)
				l && o.appendChild(l)
			}
		}
		return r.delete(e), s
	}
	function et(t, e, n) {
		if (e === n) return !0
		const r = new Set(),
			i = [t.reflections[e]]
		while (i.length) {
			const s = i.pop()
			if (!r.has(s)) {
				r.add(s)
				for (const o of s.children || []) {
					if (o === n) return !0
					i.push(t.reflections[o])
				}
			}
		}
		return !1
	}
	function tt() {
		const t = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		return (
			t.setAttribute("width", "20"),
			t.setAttribute("height", "20"),
			t.setAttribute("viewBox", "0 0 24 24"),
			t.setAttribute("fill", "none"),
			(t.innerHTML = '<use href="#icon-chevronDown"></use>'),
			t
		)
	}
	G(Y, "a[data-toggle]")
	G(K, ".tsd-accordion")
	G(Z, ".tsd-filter-item input[type=checkbox]")
	var _e = document.getElementById("tsd-theme")
	_e && Se(_e)
	var nt = new J()
	Object.defineProperty(window, "app", { value: nt })
	ve()
	Ce()
	Pe()
})()
/*! Bundled license information:

lunr/lunr.js:
  (**
   * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 2.3.9
   * Copyright (C) 2020 Oliver Nightingale
   * @license MIT
   *)
  (*!
   * lunr.utils
   * Copyright (C) 2020 Oliver Nightingale
   *)
  (*!
   * lunr.Set
   * Copyright (C) 2020 Oliver Nightingale
   *)
  (*!
   * lunr.tokenizer
   * Copyright (C) 2020 Oliver Nightingale
   *)
  (*!
   * lunr.Pipeline
   * Copyright (C) 2020 Oliver Nightingale
   *)
  (*!
   * lunr.Vector
   * Copyright (C) 2020 Oliver Nightingale
   *)
  (*!
   * lunr.stemmer
   * Copyright (C) 2020 Oliver Nightingale
   * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
   *)
  (*!
   * lunr.stopWordFilter
   * Copyright (C) 2020 Oliver Nightingale
   *)
  (*!
   * lunr.trimmer
   * Copyright (C) 2020 Oliver Nightingale
   *)
  (*!
   * lunr.TokenSet
   * Copyright (C) 2020 Oliver Nightingale
   *)
  (*!
   * lunr.Index
   * Copyright (C) 2020 Oliver Nightingale
   *)
  (*!
   * lunr.Builder
   * Copyright (C) 2020 Oliver Nightingale
   *)
*/