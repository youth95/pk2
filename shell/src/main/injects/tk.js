// hook 函数
let chatMessageHandler = chatMsg => {
    window.dm_bridge.emit_dm(chatMsg.toObject());
    console.log(chatMsg);
};

// 1813.53d209930b219a64e211.js 的代码
(self.__LOADABLE_LOADED_CHUNKS__ = self.__LOADABLE_LOADED_CHUNKS__ || []).push([[1813], {
    71813: (e, t, o) => {
        "use strict";
        o.r(t),
            o.d(t, {
                LiveIM: () => m
            });
        var i = o(64047);
        const r = "1.3.0"
            , s = "180800";
        function n() {
            return {
                device_platform: "web",
                cookie_enabled: String(navigator.cookieEnabled),
                screen_width: String(screen.width),
                screen_height: String(screen.height),
                browser_language: navigator.language,
                browser_platform: navigator.platform,
                browser_name: navigator.appCodeName,
                browser_version: navigator.appVersion,
                browser_online: String(navigator.onLine),
                tz_name: Intl.DateTimeFormat().resolvedOptions().timeZone
            }
        }
        var a;
        !function (e) {
            e[e.http = 0] = "http",
                e[e.socket = 1] = "socket"
        }(a || (a = {}));
        var p = o(34307)
            , l = o(62487);
        class u {
            constructor() {
                this.ntpDiff = 0
            }
            updateNTPDiff(e, t) {
                const o = Date.now()
                    , i = t + (e - o) / 2 - o;
                this.ntpDiff = i
            }
            getNTPClientTime() {
                return Date.now() + this.ntpDiff
            }
            getMessageArriveTime(e) {
                const t = Date.now();
                return {
                    server_now: e,
                    imsdk_recv_time: t,
                    adjusted_imsdk_recv_time: Math.round(t + this.ntpDiff)
                }
            }
        }
        var d = o(71915);
        function g(e) {
            const t = Object.keys(e);
            return t.length ? t.reduce(((t, o) => `${t}${t ? "&" : ""}${o}=${String(e[o])}`), "") : ""
        }
        class c {
            constructor(e) {
                const t = function (e) {
                    const { app_name: t, routeParamsMap: o, pushServer: n } = e
                        , a = (0,
                            i.__rest)(e, ["app_name", "routeParamsMap", "pushServer"])
                        , p = {};
                    if (e.routeParamsMap)
                        for (const [t, o] of e.routeParamsMap.entries())
                            p[t] = o;
                    return `${n}?${g(Object.assign(Object.assign({
                        app_name: t,
                        version_code: s,
                        webcast_sdk_version: r,
                        update_version_code: r,
                        compress: "gzip"
                    }, p), a))}`
                }(e);
                "undefined" != typeof WebSocket && (this.socket = new WebSocket(t),
                    this.socket.binaryType = "arraybuffer")
            }
            onError(e) {
                var t;
                null === (t = this.socket) || void 0 === t || t.addEventListener("error", e)
            }
            onMessage(e) {
                var t;
                null === (t = this.socket) || void 0 === t || t.addEventListener("message", e)
            }
            onOpen(e) {
                var t;
                null === (t = this.socket) || void 0 === t || t.addEventListener("open", e)
            }
            onClose(e) {
                var t;
                null === (t = this.socket) || void 0 === t || t.addEventListener("close", e)
            }
        }
        const h = function (e = 1e3) {
            return (0,
                i.__awaiter)(this, void 0, void 0, (function* () {
                    return new Promise((t => {
                        "undefined" != typeof window && window.setTimeout((() => {
                            t()
                        }
                        ), e)
                    }
                    ))
                }
                ))
        };
        class y {
            abort() {
                this.xhr && this.xhr.abort()
            }
            fetch(e) {
                return (0,
                    i.__awaiter)(this, void 0, void 0, (function* () {
                        this.xhr = new XMLHttpRequest;
                        const { xhr: t } = this;
                        return t.timeout = 1e4,
                            t.responseType = "arraybuffer",
                            new Promise(((o, i) => {
                                try {
                                    t.open("GET", e, !0),
                                        t.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"),
                                        t.withCredentials = !0,
                                        t.onload = function () {
                                            4 === t.readyState ? 200 === t.status && t.response && o(t.response) : i(new Error(t.response))
                                        }
                                        ,
                                        t.onerror = e => {
                                            i(e)
                                        }
                                        ,
                                        t.ontimeout = e => {
                                            i(e)
                                        }
                                        ,
                                        t.send()
                                } catch (e) {
                                    i(e)
                                }
                            }
                            ))
                    }
                    ))
            }
        }
        class f extends class extends class extends class {
            constructor(e) {
                this.isOpen = false
            }
            info(e, t) {
                if (this.isOpen)
                    try {
                        console.info(`%cLIVE-im %c${e}`, "color:green;", "color:green;", t ? t() : "")
                    } catch (t) {
                        console.info(`%cLIVE-im %c${e}`, "color:red;", "color:red;", t)
                    }
            }
        }
        {
            constructor(e) {
                super(e),
                    this.ntp = new u,
                    this.messageIdsForDistinct = new Set,
                    this.unUseMessageCache = new Map,
                    this.messageExtraCache = new Map,
                    this.eventsMap = new Map,
                    this.performanceEvents = new Map,
                    this.messageModules = e.modules;
                    ['ChatMessage', 'GiftMessage', 'AccessRecallMessage', 'ControlMessage', 'MemberMessage', 'RoomUserSeqMessage', 'BottomMessage', 'GiftPromptMessage', 'NotifyMessage', 'RoomVerifyMessage', 'UnauthorizedMemberMessage', 'RoomMessage', 'SocialMessage', 'LikeMessage', 'EmoteChatMessage', 'SubNotifyMessage'].forEach(item => {
                      this.eventsMap.set(item, [chatMessageHandler]);
                    });
                window.__ws = this;
            }
            onPerformanceEvent(e, t) {
                var o;
                const i = null !== (o = this.performanceEvents.get(e)) && void 0 !== o ? o : [];
                i.push(t),
                    this.performanceEvents.set(e, i)
            }
            offPerformanceEvent(e, t) {
                var o;
                const i = null !== (o = this.performanceEvents.get(e)) && void 0 !== o ? o : [];
                i.length && this.performanceEvents.set(e, t ? i.filter((e => e !== t)) : [])
            }
            emitPerformanceEvent(e, t) {
                var o;
                this.info("performance events", (() => e));
                const i = null !== (o = this.performanceEvents.get(e)) && void 0 !== o ? o : [];
                (null == i ? void 0 : i.length) && i.forEach((e => e(t)))
            }
            on(e, t) {
                var o;
                const i = null !== (o = this.eventsMap.get(e)) && void 0 !== o ? o : [];
                i.push(t),
                    this.eventsMap.set(e, i),
                    this.runCacheEvents(e, t)
            }
            off(e, t) {
                var o;
                const i = null !== (o = this.eventsMap.get(e)) && void 0 !== o ? o : [];
                i.length && this.eventsMap.set(e, i.filter((e => !!t && e !== t)))
            }
            stop() {
                this.messageIdsForDistinct = new Set,
                    this.unUseMessageCache = new Map,
                    this.messageExtraCache = new Map
            }
            emit(e, t) {
                const o = e.getMessagesList();
                o.length && o.forEach((e => {
                    const o = e.getMethod()
                        , i = "RoomMessage" === o ? o : e.getMsgId();
                    this.messageIdsForDistinct.has(i) || (this.messageIdsForDistinct.add(i),
                        this.runAllEvents(o, e, t))
                }
                ))
            }
            runCacheEvents(e, t) {
                var o, i;
                for (const [r, s] of this.unUseMessageCache.entries()) {
                    const n = null === (o = this.messageModules) || void 0 === o ? void 0 : o[e]
                        , a = null !== (i = this.messageExtraCache.get(r)) && void 0 !== i ? i : [];
                    s.length && n && this.isCorrectEventName(e, r) && (s.forEach(((e, o) => {
                        const i = e.getPayload_asU8()
                            , r = n.deserializeBinary(i);
                        this.info("from Cache emit Message Payload: ", (() => r.toObject())),
                            t(r, e, i, a[o])
                    }
                    )),
                        this.unUseMessageCache.delete(r))
                }
            }
            isCorrectEventName(e, t) {
                return `Webcast${e}` === t || t === e
            }
            runAllEvents(e, t, o) {
                var i, r, s;
                for (const [r, s] of this.eventsMap.entries()) {
                    const n = null === (i = this.messageModules) || void 0 === i ? void 0 : i[r];
                    if (s.length && n && this.isCorrectEventName(r, e)) {
                        const i = t.getPayload_asU8()
                            , a = n.deserializeBinary(i);
                        return this.info(`emit Message Type: ${e} ${r}`),
                            this.info("emit Message Payload:", (() => a.toObject())),
                            this.info("emit Message extraInfo:", (() => o)),
                            void s.forEach((e => {
                                e(a, t, i, o)
                            }
                            ))
                    }
                }
                const n = null !== (r = this.unUseMessageCache.get(e)) && void 0 !== r ? r : []
                    , a = null !== (s = this.messageExtraCache.get(e)) && void 0 !== s ? s : [];
                n.length > 100 && (n.shift(),
                    a.shift()),
                    n.push(t),
                    a.push(o),
                    this.unUseMessageCache.set(e, n),
                    this.messageExtraCache.set(e, a)
            }
        }
        {
            constructor(e) {
                super({
                    debug: e.debug,
                    modules: e.modules
                }),
                    this.heartbeatDuration = 1e4,
                    this.cursor = "",
                    this.internalExt = "",
                    this.pingStarted = !1,
                    this.socketProps = e
            }
            stopSocket() {
                var e;
                this.pingStarted = !1,
                    clearTimeout(this.pingTimer),
                    this.client && (null === (e = this.client.socket) || void 0 === e || e.close(),
                        this.client = void 0)
            }
            stop() {
                this.stopSocket(),
                    super.stop()
            }
            fetchSocketServer(e, t, o) {
                if (!("WebSocket" in window))
                    return o(new Error("not support websocket"));
                const r = this.socketProps
                    , { modules: s } = r
                    , n = (0,
                        i.__rest)(r, ["modules"]);
                this.info("start fetchSocketServer", (() => e)),
                    this.heartbeatDuration = Number(e.heartbeatDuration),
                    this.stopSocket(),
                    this.emitPerformanceEvent("live_im_socket_start", {
                        initConfig: this.socketProps,
                        startConfig: e
                    }),
                    this.client = new c(Object.assign(Object.assign({
                        internal_ext: this.internalExt,
                        cursor: this.cursor
                    }, n), e)),
                    this.client.onMessage((e => {
                        this.bindClientMessage(e, o)
                    }
                    )),
                    this.client.onError((t => {
                        this.emitPerformanceEvent("live_im_socket_failed", {
                            initConfig: this.socketProps,
                            startConfig: e,
                            error: {
                                name: t.type,
                                message: "live_im_socket_failed"
                            }
                        }),
                            o(new Error(t.type)),
                            this.info("fetchSocketServer socket error: ", (() => t)),
                            this.pingStarted = !1
                    }
                    )),
                    this.client.onClose((t => {
                        this.emitPerformanceEvent("live_im_socket_close", {
                            initConfig: this.socketProps,
                            startConfig: e,
                            error: {
                                name: t.type,
                                message: "live_im_socket_close"
                            }
                        }),
                            this.info("fetchSocketServer socket close: ", (() => t)),
                            this.pingStarted && (o(new Error(t.type)),
                                this.pingStarted = !1)
                    }
                    )),
                    this.client.onOpen((() => {
                        this.emitPerformanceEvent("live_im_socket_success", {
                            initConfig: this.socketProps,
                            startConfig: e
                        }),
                            t(),
                            this.pingStarted = !0,
                            this.ping()
                    }
                    ))
            }
            ping() {
                var e;
                const t = Math.max(1e4, Number(this.heartbeatDuration));
                if (this.client && 1 === (null === (e = this.client.socket) || void 0 === e ? void 0 : e.readyState)) {
                    const e = new d.PushFrame;
                    e.setPayloadType("hb"),
                        this.client.socket.send(e.serializeBinary())
                }
                this.pingTimer = window.setTimeout((() => {
                    this.pingStarted && this.ping()
                }
                ), t)
            }
            bindClientMessage(e, t) {
                var o;
                if (this.client) {
                    const i = Date.now()
                        , r = d.PushFrame.deserializeBinary(e.data)
                        , s = p.Response.deserializeBinary(function (e) {
                            for (const t of Object.values(e.getHeadersList()))
                                if ("compress_type" === t.getKey() && "gzip" === t.getValue())
                                    return !0;
                            return !1
                        }(r) ? (0,
                            l.ec)(r.getPayload()) : r.getPayload_asU8());
                    if (s.getNeedAck()) {
                        this.internalExt = s.getInternalExt(),
                            this.cursor = s.getCursor();
                        const e = new d.PushFrame;
                        e.setPayloadType("ack"),
                            e.setPayload(function (e) {
                                const t = [];
                                for (const o of e) {
                                    const e = o.charCodeAt(0);
                                    e < 128 ? t.push(e) : e < 2048 ? (t.push(192 + (e >> 6)),
                                        t.push(128 + (63 & e))) : e < 65536 && (t.push(224 + (e >> 12)),
                                            t.push(128 + (e >> 6 & 63)),
                                            t.push(128 + (63 & e)))
                                }
                                return Uint8Array.from(t)
                            }(s.getInternalExt())),
                            e.setLogid(r.getLogid()),
                            null === (o = this.client.socket) || void 0 === o || o.send(e.serializeBinary())
                    }
                    if ("msg" === r.getPayloadType()) {
                        this.info("fetchSocketServer socket response: ", (() => s.toObject()));
                        const e = Number(s.getNow());
                        this.ntp.updateNTPDiff(i, e);
                        const t = this.ntp.getMessageArriveTime(e);
                        this.emit(s, {
                            message_from: a.socket,
                            server_now: t.server_now,
                            imsdk_recv_time: t.imsdk_recv_time,
                            adjusted_imsdk_recv_time: t.adjusted_imsdk_recv_time
                        })
                    }
                    if ("close" === r.getPayloadType())
                        return t(new Error("close by payloadtype"))
                }
            }
        }
        {
            constructor(e) {
                super(e),
                    this.isStopped = !1,
                    this.isStarted = !1,
                    this.stopPolling = !1,
                    this.isTryingSocket = !1,
                    this.fetchRule = 1,
                    this.defaultInterval = 1e3,
                    this.errorInterval = 1e4,
                    this.props = e
            }
            start(e) {
                this.isStarted && new Error("[live-im-sdk] you have started polling!"),
                    this.isStarted = !0,
                    this.isStopped = !1,
                    this.stopPolling = !1,
                    this.emitPerformanceEvent("live_im_fetch_config", {
                        initConfig: this.props,
                        startConfig: e
                    }),
                    this.startRecursiveFetch(e, {
                        fetch_rule: 1,
                        last_rtt: "0"
                    })
            }
            stop() {
                this.isStarted && (this.isStopped = !0,
                    this.stopPolling = !0,
                    this.isStarted = !1,
                    this.isTryingSocket = !1,
                    super.stop(),
                    this.xhr.abort(),
                    this.cursor = "",
                    this.internalExt = "")
            }
            fetchImServer(e) {
                return (0,
                    i.__awaiter)(this, void 0, void 0, (function* () {
                        const t = this.props
                            , { host: o, did_rule: r, device_id: l, modules: u } = t
                            , d = (0,
                                i.__rest)(t, ["host", "did_rule", "device_id", "modules"])
                            , c = `${o}/webcast/im/fetch/`
                            , h = Object.assign(Object.assign(Object.assign(Object.assign({
                                version_code: s,
                                resp_content_type: "protobuf",
                                did_rule: null != r ? r : l ? 0 : 3
                            }, n()), d), e), {
                                fetch_rule: this.fetchRule,
                                cursor: this.cursor,
                                internal_ext: this.internalExt,
                                device_id: ""
                            });
                        l && (h.device_id = l);
                        const f = g(h);
                        this.xhr = new y;
                        const m = Date.now();
                        return yield this.xhr.fetch(`${c}?${f}`).then((e => {
                            if (this.isStopped || this.stopPolling)
                                return;
                            const t = p.Response.deserializeBinary(new Uint8Array(e));
                            this.cursor = t.getCursor(),
                                this.internalExt = t.getInternalExt();
                            const o = Number(t.getNow());
                            this.ntp.updateNTPDiff(m, o);
                            const i = this.ntp.getMessageArriveTime(o);
                            return this.emit(t, {
                                message_from: a.http,
                                server_now: i.server_now,
                                imsdk_recv_time: i.imsdk_recv_time,
                                adjusted_imsdk_recv_time: i.adjusted_imsdk_recv_time
                            }),
                                this.info("fetch im server response", (() => t.toObject())),
                                t
                        }
                        ))
                    }
                    ))
            }
            trySocketServer(e, t) {
                if (this.isTryingSocket)
                    return;
                const o = this.props
                    , { modules: r } = o
                    , s = (0,
                        i.__rest)(o, ["modules"]);
                this.isTryingSocket = !0,
                    this.fetchRule = 2,
                    super.fetchSocketServer(Object.assign(Object.assign(Object.assign({}, n()), s), {
                        identity: e.identity,
                        room_id: e.room_id,
                        pushServer: t.getPushServer(),
                        routeParamsMap: t.getRouteParamsMap(),
                        heartbeatDuration: t.getHeartbeatDuration()
                    }), (() => {
                        this.stopPolling = !0,
                            this.fetchRule = 1
                    }
                    ), (t => {
                        super.stopSocket(),
                            this.isTryingSocket = !1,
                            this.stopPolling = !1,
                            this.fetchRule = 1,
                            this.emitPerformanceEvent("live_im_socket_switch_to_polling", {
                                initConfig: this.props,
                                startConfig: e
                            })
                    }
                    ))
            }
            startRecursiveFetch(e, t) {
                return (0,
                    i.__awaiter)(this, void 0, void 0, (function* () {
                        if (this.isStopped)
                            return;
                        const { last_rtt: o = "0" } = null != t ? t : {}
                            , i = Date.now();
                        let r;
                        this.stopPolling || (this.emitPerformanceEvent("live_im_polling_start", {
                            initConfig: this.props,
                            startConfig: e
                        }),
                            r = yield this.fetchImServer(Object.assign(Object.assign({}, e), {
                                last_rtt: o
                            })).catch((t => (this.emitPerformanceEvent("live_im_polling_error", {
                                initConfig: this.props,
                                startConfig: e,
                                error: t
                            }),
                                null)))),
                            this.isTryingSocket || 1 !== (null == r ? void 0 : r.getFetchType()) || (this.emitPerformanceEvent("live_im_polling_switch_to_socket", {
                                initConfig: this.props,
                                startConfig: e
                            }),
                                this.trySocketServer(e, r)),
                            r ? yield h(Math.max(Number(r.getFetchInterval()), this.defaultInterval)) : yield h(this.errorInterval),
                            this.startRecursiveFetch(e, {
                                last_rtt: r ? String(Date.now() - i) : "-1"
                            })
                    }
                    ))
            }
        }
        class m {
            constructor(e) {
                const t = new f(e);
                this.start = t.start.bind(t),
                    this.stop = t.stop.bind(t),
                    this.on = t.on.bind(t),
                    this.off = t.off.bind(t),
                    this.onPerformanceEvent = t.onPerformanceEvent.bind(t),
                    this.offPerformanceEvent = t.offPerformanceEvent.bind(t),
                    this.ntp = t.ntp
            }
        }
    }
    ,
    81220: (e, t, o) => {
        var i = o(38090)
            , r = i
            , s = Function("return this")()
            , n = o(72798);
        r.object.extend(proto, n),
            r.exportSymbol("proto.api.AGType", null, s),
            r.exportSymbol("proto.api.DataPolicyStruct", null, s),
            r.exportSymbol("proto.api.DynamicMessage", null, s),
            r.exportSymbol("proto.api.EmptyRequest", null, s),
            r.exportSymbol("proto.api.EmptyResponse", null, s),
            r.exportSymbol("proto.api.apiLevel", null, s),
            r.exportSymbol("proto.api.apiVersion", null, s),
            r.exportSymbol("proto.api.baseurl", null, s),
            r.exportSymbol("proto.api.binary", null, s),
            r.exportSymbol("proto.api.body", null, s),
            r.exportSymbol("proto.api.category", null, s),
            r.exportSymbol("proto.api.cookie", null, s),
            r.exportSymbol("proto.api.dataPolicy", null, s),
            r.exportSymbol("proto.api.deprecatedEnum", null, s),
            r.exportSymbol("proto.api.dynamicFieldList", null, s),
            r.exportSymbol("proto.api.enumBaseRef", null, s),
            r.exportSymbol("proto.api.genPath", null, s),
            r.exportSymbol("proto.api.get", null, s),
            r.exportSymbol("proto.api.header", null, s),
            r.exportSymbol("proto.api.httpCode", null, s),
            r.exportSymbol("proto.api.httpMessage", null, s),
            r.exportSymbol("proto.api.messageBaseRef", null, s),
            r.exportSymbol("proto.api.name", null, s),
            r.exportSymbol("proto.api.none", null, s),
            r.exportSymbol("proto.api.param", null, s),
            r.exportSymbol("proto.api.patch", null, s),
            r.exportSymbol("proto.api.path", null, s),
            r.exportSymbol("proto.api.pb_delete", null, s),
            r.exportSymbol("proto.api.post", null, s),
            r.exportSymbol("proto.api.put", null, s),
            r.exportSymbol("proto.api.query", null, s),
            r.exportSymbol("proto.api.rawBody", null, s),
            r.exportSymbol("proto.api.ref", null, s),
            r.exportSymbol("proto.api.respSerializer", null, s),
            r.exportSymbol("proto.api.respWrapper", null, s),
            r.exportSymbol("proto.api.serializer", null, s),
            r.exportSymbol("proto.api.tag", null, s),
            r.exportSymbol("proto.api.vd", null, s),
            r.exportSymbol("proto.api.version", null, s),
            proto.api.DynamicMessage = function (e) {
                i.Message.initialize(this, e, 0, -1, null, null)
            }
            ,
            r.inherits(proto.api.DynamicMessage, i.Message),
            r.DEBUG && !COMPILED && (proto.api.DynamicMessage.displayName = "proto.api.DynamicMessage"),
            proto.api.DataPolicyStruct = function (e) {
                i.Message.initialize(this, e, 0, -1, null, null)
            }
            ,
            r.inherits(proto.api.DataPolicyStruct, i.Message),
            r.DEBUG && !COMPILED && (proto.api.DataPolicyStruct.displayName = "proto.api.DataPolicyStruct"),
            proto.api.EmptyRequest = function (e) {
                i.Message.initialize(this, e, 0, -1, null, null)
            }
            ,
            r.inherits(proto.api.EmptyRequest, i.Message),
            r.DEBUG && !COMPILED && (proto.api.EmptyRequest.displayName = "proto.api.EmptyRequest"),
            proto.api.EmptyResponse = function (e) {
                i.Message.initialize(this, e, 0, -1, null, null)
            }
            ,
            r.inherits(proto.api.EmptyResponse, i.Message),
            r.DEBUG && !COMPILED && (proto.api.EmptyResponse.displayName = "proto.api.EmptyResponse"),
            i.Message.GENERATE_TO_OBJECT && (proto.api.DynamicMessage.prototype.toObject = function (e) {
                return proto.api.DynamicMessage.toObject(e, this)
            }
                ,
                proto.api.DynamicMessage.toObject = function (e, t) {
                    var o, r = {
                        key: null == (o = i.Message.getField(t, 1)) ? void 0 : o,
                        type: null == (o = i.Message.getField(t, 2)) ? void 0 : o,
                        keyField: null == (o = i.Message.getField(t, 3)) ? void 0 : o,
                        typeField: null == (o = i.Message.getField(t, 4)) ? void 0 : o,
                        psm: null == (o = i.Message.getField(t, 5)) ? void 0 : o,
                        handler: null == (o = i.Message.getField(t, 6)) ? void 0 : o,
                        contentEncoding: null == (o = i.Message.getField(t, 7)) ? void 0 : o,
                        serializer: null == (o = i.Message.getField(t, 8)) ? void 0 : o
                    };
                    return e && (r.$jspbMessageInstance = t),
                        r
                }
            ),
            proto.api.DynamicMessage.deserializeBinary = function (e) {
                var t = new i.BinaryReader(e)
                    , o = new proto.api.DynamicMessage;
                return proto.api.DynamicMessage.deserializeBinaryFromReader(o, t)
            }
            ,
            proto.api.DynamicMessage.deserializeBinaryFromReader = function (e, t) {
                for (; t.nextField() && !t.isEndGroup();)
                    switch (t.getFieldNumber()) {
                        case 1:
                            var o = t.readString();
                            e.setKey(o);
                            break;
                        case 2:
                            o = t.readString(),
                                e.setType(o);
                            break;
                        case 3:
                            o = t.readString(),
                                e.setKeyField(o);
                            break;
                        case 4:
                            o = t.readString(),
                                e.setTypeField(o);
                            break;
                        case 5:
                            o = t.readString(),
                                e.setPsm(o);
                            break;
                        case 6:
                            o = t.readString(),
                                e.setHandler(o);
                            break;
                        case 7:
                            o = t.readString(),
                                e.setContentEncoding(o);
                            break;
                        case 8:
                            o = t.readString(),
                                e.setSerializer(o);
                            break;
                        default:
                            t.skipField()
                    }
                return e
            }
            ,
            proto.api.DynamicMessage.prototype.serializeBinary = function () {
                var e = new i.BinaryWriter;
                return proto.api.DynamicMessage.serializeBinaryToWriter(this, e),
                    e.getResultBuffer()
            }
            ,
            proto.api.DynamicMessage.serializeBinaryToWriter = function (e, t) {
                var o = void 0;
                null != (o = i.Message.getField(e, 1)) && t.writeString(1, o),
                    null != (o = i.Message.getField(e, 2)) && t.writeString(2, o),
                    null != (o = i.Message.getField(e, 3)) && t.writeString(3, o),
                    null != (o = i.Message.getField(e, 4)) && t.writeString(4, o),
                    null != (o = i.Message.getField(e, 5)) && t.writeString(5, o),
                    null != (o = i.Message.getField(e, 6)) && t.writeString(6, o),
                    null != (o = i.Message.getField(e, 7)) && t.writeString(7, o),
                    null != (o = i.Message.getField(e, 8)) && t.writeString(8, o)
            }
            ,
            proto.api.DynamicMessage.prototype.getKey = function () {
                return i.Message.getFieldWithDefault(this, 1, "")
            }
            ,
            proto.api.DynamicMessage.prototype.setKey = function (e) {
                return i.Message.setField(this, 1, e)
            }
            ,
            proto.api.DynamicMessage.prototype.clearKey = function () {
                return i.Message.setField(this, 1, void 0)
            }
            ,
            proto.api.DynamicMessage.prototype.hasKey = function () {
                return null != i.Message.getField(this, 1)
            }
            ,
            proto.api.DynamicMessage.prototype.getType = function () {
                return i.Message.getFieldWithDefault(this, 2, "")
            }
            ,
            proto.api.DynamicMessage.prototype.setType = function (e) {
                return i.Message.setField(this, 2, e)
            }
            ,
            proto.api.DynamicMessage.prototype.clearType = function () {
                return i.Message.setField(this, 2, void 0)
            }
            ,
            proto.api.DynamicMessage.prototype.hasType = function () {
                return null != i.Message.getField(this, 2)
            }
            ,
            proto.api.DynamicMessage.prototype.getKeyField = function () {
                return i.Message.getFieldWithDefault(this, 3, "")
            }
            ,
            proto.api.DynamicMessage.prototype.setKeyField = function (e) {
                return i.Message.setField(this, 3, e)
            }
            ,
            proto.api.DynamicMessage.prototype.clearKeyField = function () {
                return i.Message.setField(this, 3, void 0)
            }
            ,
            proto.api.DynamicMessage.prototype.hasKeyField = function () {
                return null != i.Message.getField(this, 3)
            }
            ,
            proto.api.DynamicMessage.prototype.getTypeField = function () {
                return i.Message.getFieldWithDefault(this, 4, "")
            }
            ,
            proto.api.DynamicMessage.prototype.setTypeField = function (e) {
                return i.Message.setField(this, 4, e)
            }
            ,
            proto.api.DynamicMessage.prototype.clearTypeField = function () {
                return i.Message.setField(this, 4, void 0)
            }
            ,
            proto.api.DynamicMessage.prototype.hasTypeField = function () {
                return null != i.Message.getField(this, 4)
            }
            ,
            proto.api.DynamicMessage.prototype.getPsm = function () {
                return i.Message.getFieldWithDefault(this, 5, "")
            }
            ,
            proto.api.DynamicMessage.prototype.setPsm = function (e) {
                return i.Message.setField(this, 5, e)
            }
            ,
            proto.api.DynamicMessage.prototype.clearPsm = function () {
                return i.Message.setField(this, 5, void 0)
            }
            ,
            proto.api.DynamicMessage.prototype.hasPsm = function () {
                return null != i.Message.getField(this, 5)
            }
            ,
            proto.api.DynamicMessage.prototype.getHandler = function () {
                return i.Message.getFieldWithDefault(this, 6, "")
            }
            ,
            proto.api.DynamicMessage.prototype.setHandler = function (e) {
                return i.Message.setField(this, 6, e)
            }
            ,
            proto.api.DynamicMessage.prototype.clearHandler = function () {
                return i.Message.setField(this, 6, void 0)
            }
            ,
            proto.api.DynamicMessage.prototype.hasHandler = function () {
                return null != i.Message.getField(this, 6)
            }
            ,
            proto.api.DynamicMessage.prototype.getContentEncoding = function () {
                return i.Message.getFieldWithDefault(this, 7, "")
            }
            ,
            proto.api.DynamicMessage.prototype.setContentEncoding = function (e) {
                return i.Message.setField(this, 7, e)
            }
            ,
            proto.api.DynamicMessage.prototype.clearContentEncoding = function () {
                return i.Message.setField(this, 7, void 0)
            }
            ,
            proto.api.DynamicMessage.prototype.hasContentEncoding = function () {
                return null != i.Message.getField(this, 7)
            }
            ,
            proto.api.DynamicMessage.prototype.getSerializer = function () {
                return i.Message.getFieldWithDefault(this, 8, "")
            }
            ,
            proto.api.DynamicMessage.prototype.setSerializer = function (e) {
                return i.Message.setField(this, 8, e)
            }
            ,
            proto.api.DynamicMessage.prototype.clearSerializer = function () {
                return i.Message.setField(this, 8, void 0)
            }
            ,
            proto.api.DynamicMessage.prototype.hasSerializer = function () {
                return null != i.Message.getField(this, 8)
            }
            ,
            i.Message.GENERATE_TO_OBJECT && (proto.api.DataPolicyStruct.prototype.toObject = function (e) {
                return proto.api.DataPolicyStruct.toObject(e, this)
            }
                ,
                proto.api.DataPolicyStruct.toObject = function (e, t) {
                    var o, r = {
                        ag: null == (o = i.Message.getField(t, 1)) ? void 0 : o
                    };
                    return e && (r.$jspbMessageInstance = t),
                        r
                }
            ),
            proto.api.DataPolicyStruct.deserializeBinary = function (e) {
                var t = new i.BinaryReader(e)
                    , o = new proto.api.DataPolicyStruct;
                return proto.api.DataPolicyStruct.deserializeBinaryFromReader(o, t)
            }
            ,
            proto.api.DataPolicyStruct.deserializeBinaryFromReader = function (e, t) {
                for (; t.nextField() && !t.isEndGroup();)
                    if (1 === t.getFieldNumber()) {
                        var o = t.readEnum();
                        e.setAg(o)
                    } else
                        t.skipField();
                return e
            }
            ,
            proto.api.DataPolicyStruct.prototype.serializeBinary = function () {
                var e = new i.BinaryWriter;
                return proto.api.DataPolicyStruct.serializeBinaryToWriter(this, e),
                    e.getResultBuffer()
            }
            ,
            proto.api.DataPolicyStruct.serializeBinaryToWriter = function (e, t) {
                var o;
                null != (o = i.Message.getField(e, 1)) && t.writeEnum(1, o)
            }
            ,
            proto.api.DataPolicyStruct.prototype.getAg = function () {
                return i.Message.getFieldWithDefault(this, 1, 1)
            }
            ,
            proto.api.DataPolicyStruct.prototype.setAg = function (e) {
                return i.Message.setField(this, 1, e)
            }
            ,
            proto.api.DataPolicyStruct.prototype.clearAg = function () {
                return i.Message.setField(this, 1, void 0)
            }
            ,
            proto.api.DataPolicyStruct.prototype.hasAg = function () {
                return null != i.Message.getField(this, 1)
            }
            ,
            i.Message.GENERATE_TO_OBJECT && (proto.api.EmptyRequest.prototype.toObject = function (e) {
                return proto.api.EmptyRequest.toObject(e, this)
            }
                ,
                proto.api.EmptyRequest.toObject = function (e, t) {
                    var o = {};
                    return e && (o.$jspbMessageInstance = t),
                        o
                }
            ),
            proto.api.EmptyRequest.deserializeBinary = function (e) {
                var t = new i.BinaryReader(e)
                    , o = new proto.api.EmptyRequest;
                return proto.api.EmptyRequest.deserializeBinaryFromReader(o, t)
            }
            ,
            proto.api.EmptyRequest.deserializeBinaryFromReader = function (e, t) {
                for (; t.nextField() && !t.isEndGroup();)
                    t.getFieldNumber(),
                        t.skipField();
                return e
            }
            ,
            proto.api.EmptyRequest.prototype.serializeBinary = function () {
                var e = new i.BinaryWriter;
                return proto.api.EmptyRequest.serializeBinaryToWriter(this, e),
                    e.getResultBuffer()
            }
            ,
            proto.api.EmptyRequest.serializeBinaryToWriter = function (e, t) { }
            ,
            i.Message.GENERATE_TO_OBJECT && (proto.api.EmptyResponse.prototype.toObject = function (e) {
                return proto.api.EmptyResponse.toObject(e, this)
            }
                ,
                proto.api.EmptyResponse.toObject = function (e, t) {
                    var o = {};
                    return e && (o.$jspbMessageInstance = t),
                        o
                }
            ),
            proto.api.EmptyResponse.deserializeBinary = function (e) {
                var t = new i.BinaryReader(e)
                    , o = new proto.api.EmptyResponse;
                return proto.api.EmptyResponse.deserializeBinaryFromReader(o, t)
            }
            ,
            proto.api.EmptyResponse.deserializeBinaryFromReader = function (e, t) {
                for (; t.nextField() && !t.isEndGroup();)
                    t.getFieldNumber(),
                        t.skipField();
                return e
            }
            ,
            proto.api.EmptyResponse.prototype.serializeBinary = function () {
                var e = new i.BinaryWriter;
                return proto.api.EmptyResponse.serializeBinaryToWriter(this, e),
                    e.getResultBuffer()
            }
            ,
            proto.api.EmptyResponse.serializeBinaryToWriter = function (e, t) { }
            ,
            proto.api.AGType = {
                AG_ENABLE: 1,
                AG_DISABLE: 2
            },
            proto.api.rawBody = new i.ExtensionFieldInfo(50101, {
                rawBody: 0
            }, null, null, 0),
            n.FieldOptions.extensionsBinary[50101] = new i.ExtensionFieldBinaryInfo(proto.api.rawBody, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.FieldOptions.extensions[50101] = proto.api.rawBody,
            proto.api.query = new i.ExtensionFieldInfo(50102, {
                query: 0
            }, null, null, 0),
            n.FieldOptions.extensionsBinary[50102] = new i.ExtensionFieldBinaryInfo(proto.api.query, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.FieldOptions.extensions[50102] = proto.api.query,
            proto.api.header = new i.ExtensionFieldInfo(50103, {
                header: 0
            }, null, null, 0),
            n.FieldOptions.extensionsBinary[50103] = new i.ExtensionFieldBinaryInfo(proto.api.header, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.FieldOptions.extensions[50103] = proto.api.header,
            proto.api.cookie = new i.ExtensionFieldInfo(50104, {
                cookie: 0
            }, null, null, 0),
            n.FieldOptions.extensionsBinary[50104] = new i.ExtensionFieldBinaryInfo(proto.api.cookie, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.FieldOptions.extensions[50104] = proto.api.cookie,
            proto.api.body = new i.ExtensionFieldInfo(50105, {
                body: 0
            }, null, null, 0),
            n.FieldOptions.extensionsBinary[50105] = new i.ExtensionFieldBinaryInfo(proto.api.body, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.FieldOptions.extensions[50105] = proto.api.body,
            proto.api.path = new i.ExtensionFieldInfo(50106, {
                path: 0
            }, null, null, 0),
            n.FieldOptions.extensionsBinary[50106] = new i.ExtensionFieldBinaryInfo(proto.api.path, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.FieldOptions.extensions[50106] = proto.api.path,
            proto.api.vd = new i.ExtensionFieldInfo(50107, {
                vd: 0
            }, null, null, 0),
            n.FieldOptions.extensionsBinary[50107] = new i.ExtensionFieldBinaryInfo(proto.api.vd, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.FieldOptions.extensions[50107] = proto.api.vd,
            proto.api.none = new i.ExtensionFieldInfo(50108, {
                none: 0
            }, null, null, 0),
            n.FieldOptions.extensionsBinary[50108] = new i.ExtensionFieldBinaryInfo(proto.api.none, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.FieldOptions.extensions[50108] = proto.api.none,
            proto.api.ref = new i.ExtensionFieldInfo(50109, {
                ref: 0
            }, null, null, 0),
            n.FieldOptions.extensionsBinary[50109] = new i.ExtensionFieldBinaryInfo(proto.api.ref, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.FieldOptions.extensions[50109] = proto.api.ref,
            proto.api.binary = new i.ExtensionFieldInfo(50110, {
                binary: 0
            }, null, null, 0),
            n.FieldOptions.extensionsBinary[50110] = new i.ExtensionFieldBinaryInfo(proto.api.binary, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.FieldOptions.extensions[50110] = proto.api.binary,
            proto.api.get = new i.ExtensionFieldInfo(50201, {
                get: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50201] = new i.ExtensionFieldBinaryInfo(proto.api.get, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50201] = proto.api.get,
            proto.api.post = new i.ExtensionFieldInfo(50202, {
                post: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50202] = new i.ExtensionFieldBinaryInfo(proto.api.post, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50202] = proto.api.post,
            proto.api.put = new i.ExtensionFieldInfo(50203, {
                put: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50203] = new i.ExtensionFieldBinaryInfo(proto.api.put, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50203] = proto.api.put,
            proto.api.pb_delete = new i.ExtensionFieldInfo(50204, {
                pb_delete: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50204] = new i.ExtensionFieldBinaryInfo(proto.api.pb_delete, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50204] = proto.api.pb_delete,
            proto.api.patch = new i.ExtensionFieldInfo(50205, {
                patch: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50205] = new i.ExtensionFieldBinaryInfo(proto.api.patch, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50205] = proto.api.patch,
            proto.api.genPath = new i.ExtensionFieldInfo(50301, {
                genPath: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50301] = new i.ExtensionFieldBinaryInfo(proto.api.genPath, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50301] = proto.api.genPath,
            proto.api.apiVersion = new i.ExtensionFieldInfo(50302, {
                apiVersion: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50302] = new i.ExtensionFieldBinaryInfo(proto.api.apiVersion, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50302] = proto.api.apiVersion,
            proto.api.tag = new i.ExtensionFieldInfo(50303, {
                tag: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50303] = new i.ExtensionFieldBinaryInfo(proto.api.tag, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50303] = proto.api.tag,
            proto.api.name = new i.ExtensionFieldInfo(50304, {
                name: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50304] = new i.ExtensionFieldBinaryInfo(proto.api.name, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50304] = proto.api.name,
            proto.api.apiLevel = new i.ExtensionFieldInfo(50305, {
                apiLevel: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50305] = new i.ExtensionFieldBinaryInfo(proto.api.apiLevel, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50305] = proto.api.apiLevel,
            proto.api.serializer = new i.ExtensionFieldInfo(50306, {
                serializer: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50306] = new i.ExtensionFieldBinaryInfo(proto.api.serializer, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50306] = proto.api.serializer,
            proto.api.param = new i.ExtensionFieldInfo(50307, {
                param: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50307] = new i.ExtensionFieldBinaryInfo(proto.api.param, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50307] = proto.api.param,
            proto.api.baseurl = new i.ExtensionFieldInfo(50308, {
                baseurl: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50308] = new i.ExtensionFieldBinaryInfo(proto.api.baseurl, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50308] = proto.api.baseurl,
            proto.api.version = new i.ExtensionFieldInfo(50309, {
                version: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50309] = new i.ExtensionFieldBinaryInfo(proto.api.version, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50309] = proto.api.version,
            proto.api.category = new i.ExtensionFieldInfo(50310, {
                category: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50310] = new i.ExtensionFieldBinaryInfo(proto.api.category, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50310] = proto.api.category,
            proto.api.dataPolicy = new i.ExtensionFieldInfo(50311, {
                dataPolicy: 0
            }, proto.api.DataPolicyStruct, proto.api.DataPolicyStruct.toObject, 0),
            n.MethodOptions.extensionsBinary[50311] = new i.ExtensionFieldBinaryInfo(proto.api.dataPolicy, i.BinaryReader.prototype.readMessage, i.BinaryWriter.prototype.writeMessage, proto.api.DataPolicyStruct.serializeBinaryToWriter, proto.api.DataPolicyStruct.deserializeBinaryFromReader, !1),
            n.MethodOptions.extensions[50311] = proto.api.dataPolicy,
            proto.api.respSerializer = new i.ExtensionFieldInfo(50312, {
                respSerializer: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50312] = new i.ExtensionFieldBinaryInfo(proto.api.respSerializer, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50312] = proto.api.respSerializer,
            proto.api.respWrapper = new i.ExtensionFieldInfo(50313, {
                respWrapper: 0
            }, null, null, 0),
            n.MethodOptions.extensionsBinary[50313] = new i.ExtensionFieldBinaryInfo(proto.api.respWrapper, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MethodOptions.extensions[50313] = proto.api.respWrapper,
            proto.api.httpCode = new i.ExtensionFieldInfo(50401, {
                httpCode: 0
            }, null, null, 0),
            n.EnumValueOptions.extensionsBinary[50401] = new i.ExtensionFieldBinaryInfo(proto.api.httpCode, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.EnumValueOptions.extensions[50401] = proto.api.httpCode,
            proto.api.httpMessage = new i.ExtensionFieldInfo(50402, {
                httpMessage: 0
            }, null, null, 0),
            n.EnumValueOptions.extensionsBinary[50402] = new i.ExtensionFieldBinaryInfo(proto.api.httpMessage, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.EnumValueOptions.extensions[50402] = proto.api.httpMessage,
            proto.api.deprecatedEnum = new i.ExtensionFieldInfo(50403, {
                deprecatedEnum: 0
            }, null, null, 0),
            n.EnumValueOptions.extensionsBinary[50403] = new i.ExtensionFieldBinaryInfo(proto.api.deprecatedEnum, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.EnumValueOptions.extensions[50403] = proto.api.deprecatedEnum,
            proto.api.enumBaseRef = new i.ExtensionFieldInfo(50501, {
                enumBaseRef: 0
            }, null, null, 0),
            n.EnumOptions.extensionsBinary[50501] = new i.ExtensionFieldBinaryInfo(proto.api.enumBaseRef, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.EnumOptions.extensions[50501] = proto.api.enumBaseRef,
            proto.api.messageBaseRef = new i.ExtensionFieldInfo(50601, {
                messageBaseRef: 0
            }, null, null, 0),
            n.MessageOptions.extensionsBinary[50601] = new i.ExtensionFieldBinaryInfo(proto.api.messageBaseRef, i.BinaryReader.prototype.readString, i.BinaryWriter.prototype.writeString, void 0, void 0, !1),
            n.MessageOptions.extensions[50601] = proto.api.messageBaseRef,
            proto.api.dynamicFieldList = new i.ExtensionFieldInfo(50602, {
                dynamicFieldList: 0
            }, proto.api.DynamicMessage, proto.api.DynamicMessage.toObject, 1),
            n.MessageOptions.extensionsBinary[50602] = new i.ExtensionFieldBinaryInfo(proto.api.dynamicFieldList, i.BinaryReader.prototype.readMessage, i.BinaryWriter.prototype.writeRepeatedMessage, proto.api.DynamicMessage.serializeBinaryToWriter, proto.api.DynamicMessage.deserializeBinaryFromReader, !1),
            n.MessageOptions.extensions[50602] = proto.api.dynamicFieldList,
            r.object.extend(t, proto.api)
    }
    ,
    71915: (e, t, o) => {
        var i = o(38090)
            , r = i
            , s = Function("return this")();
        r.exportSymbol("proto.pushproto.PushFrame", null, s),
            r.exportSymbol("proto.pushproto.PushHeader", null, s),
            proto.pushproto.PushHeader = function (e) {
                i.Message.initialize(this, e, 0, -1, null, null)
            }
            ,
            r.inherits(proto.pushproto.PushHeader, i.Message),
            r.DEBUG && !COMPILED && (proto.pushproto.PushHeader.displayName = "proto.pushproto.PushHeader"),
            proto.pushproto.PushFrame = function (e) {
                i.Message.initialize(this, e, 0, -1, proto.pushproto.PushFrame.repeatedFields_, null)
            }
            ,
            r.inherits(proto.pushproto.PushFrame, i.Message),
            r.DEBUG && !COMPILED && (proto.pushproto.PushFrame.displayName = "proto.pushproto.PushFrame"),
            i.Message.GENERATE_TO_OBJECT && (proto.pushproto.PushHeader.prototype.toObject = function (e) {
                return proto.pushproto.PushHeader.toObject(e, this)
            }
                ,
                proto.pushproto.PushHeader.toObject = function (e, t) {
                    var o = {
                        key: i.Message.getFieldWithDefault(t, 1, ""),
                        value: i.Message.getFieldWithDefault(t, 2, "")
                    };
                    return e && (o.$jspbMessageInstance = t),
                        o
                }
            ),
            proto.pushproto.PushHeader.deserializeBinary = function (e) {
                var t = new i.BinaryReader(e)
                    , o = new proto.pushproto.PushHeader;
                return proto.pushproto.PushHeader.deserializeBinaryFromReader(o, t)
            }
            ,
            proto.pushproto.PushHeader.deserializeBinaryFromReader = function (e, t) {
                for (; t.nextField() && !t.isEndGroup();)
                    switch (t.getFieldNumber()) {
                        case 1:
                            var o = t.readString();
                            e.setKey(o);
                            break;
                        case 2:
                            o = t.readString(),
                                e.setValue(o);
                            break;
                        default:
                            t.skipField()
                    }
                return e
            }
            ,
            proto.pushproto.PushHeader.prototype.serializeBinary = function () {
                var e = new i.BinaryWriter;
                return proto.pushproto.PushHeader.serializeBinaryToWriter(this, e),
                    e.getResultBuffer()
            }
            ,
            proto.pushproto.PushHeader.serializeBinaryToWriter = function (e, t) {
                var o = void 0;
                (o = e.getKey()).length > 0 && t.writeString(1, o),
                    (o = e.getValue()).length > 0 && t.writeString(2, o)
            }
            ,
            proto.pushproto.PushHeader.prototype.getKey = function () {
                return i.Message.getFieldWithDefault(this, 1, "")
            }
            ,
            proto.pushproto.PushHeader.prototype.setKey = function (e) {
                return i.Message.setProto3StringField(this, 1, e)
            }
            ,
            proto.pushproto.PushHeader.prototype.getValue = function () {
                return i.Message.getFieldWithDefault(this, 2, "")
            }
            ,
            proto.pushproto.PushHeader.prototype.setValue = function (e) {
                return i.Message.setProto3StringField(this, 2, e)
            }
            ,
            proto.pushproto.PushFrame.repeatedFields_ = [5],
            i.Message.GENERATE_TO_OBJECT && (proto.pushproto.PushFrame.prototype.toObject = function (e) {
                return proto.pushproto.PushFrame.toObject(e, this)
            }
                ,
                proto.pushproto.PushFrame.toObject = function (e, t) {
                    var o = {
                        seqid: i.Message.getFieldWithDefault(t, 1, 0),
                        logid: i.Message.getFieldWithDefault(t, 2, 0),
                        service: i.Message.getFieldWithDefault(t, 3, 0),
                        method: i.Message.getFieldWithDefault(t, 4, 0),
                        headersList: i.Message.toObjectList(t.getHeadersList(), proto.pushproto.PushHeader.toObject, e),
                        payloadEncoding: i.Message.getFieldWithDefault(t, 6, ""),
                        payloadType: i.Message.getFieldWithDefault(t, 7, ""),
                        payload: t.getPayload_asB64()
                    };
                    return e && (o.$jspbMessageInstance = t),
                        o
                }
            ),
            proto.pushproto.PushFrame.deserializeBinary = function (e) {
                var t = new i.BinaryReader(e)
                    , o = new proto.pushproto.PushFrame;
                return proto.pushproto.PushFrame.deserializeBinaryFromReader(o, t)
            }
            ,
            proto.pushproto.PushFrame.deserializeBinaryFromReader = function (e, t) {
                for (; t.nextField() && !t.isEndGroup();)
                    switch (t.getFieldNumber()) {
                        case 1:
                            var o = t.readUint64();
                            e.setSeqid(o);
                            break;
                        case 2:
                            o = t.readUint64(),
                                e.setLogid(o);
                            break;
                        case 3:
                            o = t.readUint64(),
                                e.setService(o);
                            break;
                        case 4:
                            o = t.readUint64(),
                                e.setMethod(o);
                            break;
                        case 5:
                            o = new proto.pushproto.PushHeader,
                                t.readMessage(o, proto.pushproto.PushHeader.deserializeBinaryFromReader),
                                e.addHeaders(o);
                            break;
                        case 6:
                            o = t.readString(),
                                e.setPayloadEncoding(o);
                            break;
                        case 7:
                            o = t.readString(),
                                e.setPayloadType(o);
                            break;
                        case 8:
                            o = t.readBytes(),
                                e.setPayload(o);
                            break;
                        default:
                            t.skipField()
                    }
                return e
            }
            ,
            proto.pushproto.PushFrame.prototype.serializeBinary = function () {
                var e = new i.BinaryWriter;
                return proto.pushproto.PushFrame.serializeBinaryToWriter(this, e),
                    e.getResultBuffer()
            }
            ,
            proto.pushproto.PushFrame.serializeBinaryToWriter = function (e, t) {
                var o = void 0;
                0 !== (o = e.getSeqid()) && t.writeUint64(1, o),
                    0 !== (o = e.getLogid()) && t.writeUint64(2, o),
                    0 !== (o = e.getService()) && t.writeUint64(3, o),
                    0 !== (o = e.getMethod()) && t.writeUint64(4, o),
                    (o = e.getHeadersList()).length > 0 && t.writeRepeatedMessage(5, o, proto.pushproto.PushHeader.serializeBinaryToWriter),
                    (o = e.getPayloadEncoding()).length > 0 && t.writeString(6, o),
                    (o = e.getPayloadType()).length > 0 && t.writeString(7, o),
                    (o = e.getPayload_asU8()).length > 0 && t.writeBytes(8, o)
            }
            ,
            proto.pushproto.PushFrame.prototype.getSeqid = function () {
                return i.Message.getFieldWithDefault(this, 1, 0)
            }
            ,
            proto.pushproto.PushFrame.prototype.setSeqid = function (e) {
                return i.Message.setProto3IntField(this, 1, e)
            }
            ,
            proto.pushproto.PushFrame.prototype.getLogid = function () {
                return i.Message.getFieldWithDefault(this, 2, 0)
            }
            ,
            proto.pushproto.PushFrame.prototype.setLogid = function (e) {
                return i.Message.setProto3IntField(this, 2, e)
            }
            ,
            proto.pushproto.PushFrame.prototype.getService = function () {
                return i.Message.getFieldWithDefault(this, 3, 0)
            }
            ,
            proto.pushproto.PushFrame.prototype.setService = function (e) {
                return i.Message.setProto3IntField(this, 3, e)
            }
            ,
            proto.pushproto.PushFrame.prototype.getMethod = function () {
                return i.Message.getFieldWithDefault(this, 4, 0)
            }
            ,
            proto.pushproto.PushFrame.prototype.setMethod = function (e) {
                return i.Message.setProto3IntField(this, 4, e)
            }
            ,
            proto.pushproto.PushFrame.prototype.getHeadersList = function () {
                return i.Message.getRepeatedWrapperField(this, proto.pushproto.PushHeader, 5)
            }
            ,
            proto.pushproto.PushFrame.prototype.setHeadersList = function (e) {
                return i.Message.setRepeatedWrapperField(this, 5, e)
            }
            ,
            proto.pushproto.PushFrame.prototype.addHeaders = function (e, t) {
                return i.Message.addToRepeatedWrapperField(this, 5, e, proto.pushproto.PushHeader, t)
            }
            ,
            proto.pushproto.PushFrame.prototype.clearHeadersList = function () {
                return this.setHeadersList([])
            }
            ,
            proto.pushproto.PushFrame.prototype.getPayloadEncoding = function () {
                return i.Message.getFieldWithDefault(this, 6, "")
            }
            ,
            proto.pushproto.PushFrame.prototype.setPayloadEncoding = function (e) {
                return i.Message.setProto3StringField(this, 6, e)
            }
            ,
            proto.pushproto.PushFrame.prototype.getPayloadType = function () {
                return i.Message.getFieldWithDefault(this, 7, "")
            }
            ,
            proto.pushproto.PushFrame.prototype.setPayloadType = function (e) {
                return i.Message.setProto3StringField(this, 7, e)
            }
            ,
            proto.pushproto.PushFrame.prototype.getPayload = function () {
                return i.Message.getFieldWithDefault(this, 8, "")
            }
            ,
            proto.pushproto.PushFrame.prototype.getPayload_asB64 = function () {
                return i.Message.bytesAsB64(this.getPayload())
            }
            ,
            proto.pushproto.PushFrame.prototype.getPayload_asU8 = function () {
                return i.Message.bytesAsU8(this.getPayload())
            }
            ,
            proto.pushproto.PushFrame.prototype.setPayload = function (e) {
                return i.Message.setProto3BytesField(this, 8, e)
            }
            ,
            r.object.extend(t, proto.pushproto)
    }
    ,
    34307: (e, t, o) => {
        var i = o(38090)
            , r = i
            , s = Function("return this")()
            , n = o(81220);
        r.object.extend(proto, n),
            r.exportSymbol("proto.webcast.im.Message", null, s),
            r.exportSymbol("proto.webcast.im.Request", null, s),
            r.exportSymbol("proto.webcast.im.Response", null, s),
            proto.webcast.im.Request = function (e) {
                i.Message.initialize(this, e, 0, -1, null, null)
            }
            ,
            r.inherits(proto.webcast.im.Request, i.Message),
            r.DEBUG && !COMPILED && (proto.webcast.im.Request.displayName = "proto.webcast.im.Request"),
            proto.webcast.im.Response = function (e) {
                i.Message.initialize(this, e, 0, -1, proto.webcast.im.Response.repeatedFields_, null)
            }
            ,
            r.inherits(proto.webcast.im.Response, i.Message),
            r.DEBUG && !COMPILED && (proto.webcast.im.Response.displayName = "proto.webcast.im.Response"),
            proto.webcast.im.Message = function (e) {
                i.Message.initialize(this, e, 0, -1, null, null)
            }
            ,
            r.inherits(proto.webcast.im.Message, i.Message),
            r.DEBUG && !COMPILED && (proto.webcast.im.Message.displayName = "proto.webcast.im.Message"),
            i.Message.GENERATE_TO_OBJECT && (proto.webcast.im.Request.prototype.toObject = function (e) {
                return proto.webcast.im.Request.toObject(e, this)
            }
                ,
                proto.webcast.im.Request.toObject = function (e, t) {
                    var o = {
                        liveId: i.Message.getFieldWithDefault(t, 1, "0"),
                        aid: i.Message.getFieldWithDefault(t, 2, "0"),
                        roomId: i.Message.getFieldWithDefault(t, 3, ""),
                        identity: i.Message.getFieldWithDefault(t, 4, ""),
                        lastRtt: i.Message.getFieldWithDefault(t, 5, ""),
                        internalExt: i.Message.getFieldWithDefault(t, 6, ""),
                        cursor: i.Message.getFieldWithDefault(t, 7, ""),
                        deviceId: i.Message.getFieldWithDefault(t, 8, ""),
                        uniqueId: i.Message.getFieldWithDefault(t, 9, ""),
                        devicePlatform: i.Message.getFieldWithDefault(t, 10, ""),
                        appLanguage: i.Message.getFieldWithDefault(t, 11, ""),
                        versionCode: i.Message.getFieldWithDefault(t, 12, ""),
                        updateVersionCode: i.Message.getFieldWithDefault(t, 13, ""),
                        respContentType: i.Message.getFieldWithDefault(t, 14, ""),
                        getHistory: i.Message.getFieldWithDefault(t, 15, ""),
                        ac: i.Message.getFieldWithDefault(t, 16, ""),
                        keepMethod: i.Message.getFieldWithDefault(t, 17, ""),
                        stress: i.Message.getFieldWithDefault(t, 18, ""),
                        recvCnt: i.Message.getFieldWithDefault(t, 19, "0"),
                        parseCnt: i.Message.getFieldWithDefault(t, 20, "0"),
                        fetchRule: i.Message.getFieldWithDefault(t, 21, ""),
                        abGroup: i.Message.getFieldWithDefault(t, 22, "")
                    };
                    return e && (o.$jspbMessageInstance = t),
                        o
                }
            ),
            proto.webcast.im.Request.deserializeBinary = function (e) {
                var t = new i.BinaryReader(e)
                    , o = new proto.webcast.im.Request;
                return proto.webcast.im.Request.deserializeBinaryFromReader(o, t)
            }
            ,
            proto.webcast.im.Request.deserializeBinaryFromReader = function (e, t) {
                for (; t.nextField() && !t.isEndGroup();)
                    switch (t.getFieldNumber()) {
                        case 1:
                            var o = t.readInt64String();
                            e.setLiveId(o);
                            break;
                        case 2:
                            o = t.readInt64String(),
                                e.setAid(o);
                            break;
                        case 3:
                            o = t.readString(),
                                e.setRoomId(o);
                            break;
                        case 4:
                            o = t.readString(),
                                e.setIdentity(o);
                            break;
                        case 5:
                            o = t.readString(),
                                e.setLastRtt(o);
                            break;
                        case 6:
                            o = t.readString(),
                                e.setInternalExt(o);
                            break;
                        case 7:
                            o = t.readString(),
                                e.setCursor(o);
                            break;
                        case 8:
                            o = t.readString(),
                                e.setDeviceId(o);
                            break;
                        case 9:
                            o = t.readString(),
                                e.setUniqueId(o);
                            break;
                        case 10:
                            o = t.readString(),
                                e.setDevicePlatform(o);
                            break;
                        case 11:
                            o = t.readString(),
                                e.setAppLanguage(o);
                            break;
                        case 12:
                            o = t.readString(),
                                e.setVersionCode(o);
                            break;
                        case 13:
                            o = t.readString(),
                                e.setUpdateVersionCode(o);
                            break;
                        case 14:
                            o = t.readString(),
                                e.setRespContentType(o);
                            break;
                        case 15:
                            o = t.readString(),
                                e.setGetHistory(o);
                            break;
                        case 16:
                            o = t.readString(),
                                e.setAc(o);
                            break;
                        case 17:
                            o = t.readString(),
                                e.setKeepMethod(o);
                            break;
                        case 18:
                            o = t.readString(),
                                e.setStress(o);
                            break;
                        case 19:
                            o = t.readInt64String(),
                                e.setRecvCnt(o);
                            break;
                        case 20:
                            o = t.readInt64String(),
                                e.setParseCnt(o);
                            break;
                        case 21:
                            o = t.readString(),
                                e.setFetchRule(o);
                            break;
                        case 22:
                            o = t.readString(),
                                e.setAbGroup(o);
                            break;
                        default:
                            t.skipField()
                    }
                return e
            }
            ,
            proto.webcast.im.Request.prototype.serializeBinary = function () {
                var e = new i.BinaryWriter;
                return proto.webcast.im.Request.serializeBinaryToWriter(this, e),
                    e.getResultBuffer()
            }
            ,
            proto.webcast.im.Request.serializeBinaryToWriter = function (e, t) {
                var o = void 0;
                o = e.getLiveId(),
                    0 !== parseInt(o, 10) && t.writeInt64String(1, o),
                    o = e.getAid(),
                    0 !== parseInt(o, 10) && t.writeInt64String(2, o),
                    (o = e.getRoomId()).length > 0 && t.writeString(3, o),
                    (o = e.getIdentity()).length > 0 && t.writeString(4, o),
                    (o = e.getLastRtt()).length > 0 && t.writeString(5, o),
                    (o = e.getInternalExt()).length > 0 && t.writeString(6, o),
                    (o = e.getCursor()).length > 0 && t.writeString(7, o),
                    (o = e.getDeviceId()).length > 0 && t.writeString(8, o),
                    (o = e.getUniqueId()).length > 0 && t.writeString(9, o),
                    (o = e.getDevicePlatform()).length > 0 && t.writeString(10, o),
                    (o = e.getAppLanguage()).length > 0 && t.writeString(11, o),
                    (o = e.getVersionCode()).length > 0 && t.writeString(12, o),
                    (o = e.getUpdateVersionCode()).length > 0 && t.writeString(13, o),
                    (o = e.getRespContentType()).length > 0 && t.writeString(14, o),
                    (o = e.getGetHistory()).length > 0 && t.writeString(15, o),
                    (o = e.getAc()).length > 0 && t.writeString(16, o),
                    (o = e.getKeepMethod()).length > 0 && t.writeString(17, o),
                    (o = e.getStress()).length > 0 && t.writeString(18, o),
                    o = e.getRecvCnt(),
                    0 !== parseInt(o, 10) && t.writeInt64String(19, o),
                    o = e.getParseCnt(),
                    0 !== parseInt(o, 10) && t.writeInt64String(20, o),
                    (o = e.getFetchRule()).length > 0 && t.writeString(21, o),
                    (o = e.getAbGroup()).length > 0 && t.writeString(22, o)
            }
            ,
            proto.webcast.im.Request.prototype.getLiveId = function () {
                return i.Message.getFieldWithDefault(this, 1, "0")
            }
            ,
            proto.webcast.im.Request.prototype.setLiveId = function (e) {
                return i.Message.setProto3StringIntField(this, 1, e)
            }
            ,
            proto.webcast.im.Request.prototype.getAid = function () {
                return i.Message.getFieldWithDefault(this, 2, "0")
            }
            ,
            proto.webcast.im.Request.prototype.setAid = function (e) {
                return i.Message.setProto3StringIntField(this, 2, e)
            }
            ,
            proto.webcast.im.Request.prototype.getRoomId = function () {
                return i.Message.getFieldWithDefault(this, 3, "")
            }
            ,
            proto.webcast.im.Request.prototype.setRoomId = function (e) {
                return i.Message.setProto3StringField(this, 3, e)
            }
            ,
            proto.webcast.im.Request.prototype.getIdentity = function () {
                return i.Message.getFieldWithDefault(this, 4, "")
            }
            ,
            proto.webcast.im.Request.prototype.setIdentity = function (e) {
                return i.Message.setProto3StringField(this, 4, e)
            }
            ,
            proto.webcast.im.Request.prototype.getLastRtt = function () {
                return i.Message.getFieldWithDefault(this, 5, "")
            }
            ,
            proto.webcast.im.Request.prototype.setLastRtt = function (e) {
                return i.Message.setProto3StringField(this, 5, e)
            }
            ,
            proto.webcast.im.Request.prototype.getInternalExt = function () {
                return i.Message.getFieldWithDefault(this, 6, "")
            }
            ,
            proto.webcast.im.Request.prototype.setInternalExt = function (e) {
                return i.Message.setProto3StringField(this, 6, e)
            }
            ,
            proto.webcast.im.Request.prototype.getCursor = function () {
                return i.Message.getFieldWithDefault(this, 7, "")
            }
            ,
            proto.webcast.im.Request.prototype.setCursor = function (e) {
                return i.Message.setProto3StringField(this, 7, e)
            }
            ,
            proto.webcast.im.Request.prototype.getDeviceId = function () {
                return i.Message.getFieldWithDefault(this, 8, "")
            }
            ,
            proto.webcast.im.Request.prototype.setDeviceId = function (e) {
                return i.Message.setProto3StringField(this, 8, e)
            }
            ,
            proto.webcast.im.Request.prototype.getUniqueId = function () {
                return i.Message.getFieldWithDefault(this, 9, "")
            }
            ,
            proto.webcast.im.Request.prototype.setUniqueId = function (e) {
                return i.Message.setProto3StringField(this, 9, e)
            }
            ,
            proto.webcast.im.Request.prototype.getDevicePlatform = function () {
                return i.Message.getFieldWithDefault(this, 10, "")
            }
            ,
            proto.webcast.im.Request.prototype.setDevicePlatform = function (e) {
                return i.Message.setProto3StringField(this, 10, e)
            }
            ,
            proto.webcast.im.Request.prototype.getAppLanguage = function () {
                return i.Message.getFieldWithDefault(this, 11, "")
            }
            ,
            proto.webcast.im.Request.prototype.setAppLanguage = function (e) {
                return i.Message.setProto3StringField(this, 11, e)
            }
            ,
            proto.webcast.im.Request.prototype.getVersionCode = function () {
                return i.Message.getFieldWithDefault(this, 12, "")
            }
            ,
            proto.webcast.im.Request.prototype.setVersionCode = function (e) {
                return i.Message.setProto3StringField(this, 12, e)
            }
            ,
            proto.webcast.im.Request.prototype.getUpdateVersionCode = function () {
                return i.Message.getFieldWithDefault(this, 13, "")
            }
            ,
            proto.webcast.im.Request.prototype.setUpdateVersionCode = function (e) {
                return i.Message.setProto3StringField(this, 13, e)
            }
            ,
            proto.webcast.im.Request.prototype.getRespContentType = function () {
                return i.Message.getFieldWithDefault(this, 14, "")
            }
            ,
            proto.webcast.im.Request.prototype.setRespContentType = function (e) {
                return i.Message.setProto3StringField(this, 14, e)
            }
            ,
            proto.webcast.im.Request.prototype.getGetHistory = function () {
                return i.Message.getFieldWithDefault(this, 15, "")
            }
            ,
            proto.webcast.im.Request.prototype.setGetHistory = function (e) {
                return i.Message.setProto3StringField(this, 15, e)
            }
            ,
            proto.webcast.im.Request.prototype.getAc = function () {
                return i.Message.getFieldWithDefault(this, 16, "")
            }
            ,
            proto.webcast.im.Request.prototype.setAc = function (e) {
                return i.Message.setProto3StringField(this, 16, e)
            }
            ,
            proto.webcast.im.Request.prototype.getKeepMethod = function () {
                return i.Message.getFieldWithDefault(this, 17, "")
            }
            ,
            proto.webcast.im.Request.prototype.setKeepMethod = function (e) {
                return i.Message.setProto3StringField(this, 17, e)
            }
            ,
            proto.webcast.im.Request.prototype.getStress = function () {
                return i.Message.getFieldWithDefault(this, 18, "")
            }
            ,
            proto.webcast.im.Request.prototype.setStress = function (e) {
                return i.Message.setProto3StringField(this, 18, e)
            }
            ,
            proto.webcast.im.Request.prototype.getRecvCnt = function () {
                return i.Message.getFieldWithDefault(this, 19, "0")
            }
            ,
            proto.webcast.im.Request.prototype.setRecvCnt = function (e) {
                return i.Message.setProto3StringIntField(this, 19, e)
            }
            ,
            proto.webcast.im.Request.prototype.getParseCnt = function () {
                return i.Message.getFieldWithDefault(this, 20, "0")
            }
            ,
            proto.webcast.im.Request.prototype.setParseCnt = function (e) {
                return i.Message.setProto3StringIntField(this, 20, e)
            }
            ,
            proto.webcast.im.Request.prototype.getFetchRule = function () {
                return i.Message.getFieldWithDefault(this, 21, "")
            }
            ,
            proto.webcast.im.Request.prototype.setFetchRule = function (e) {
                return i.Message.setProto3StringField(this, 21, e)
            }
            ,
            proto.webcast.im.Request.prototype.getAbGroup = function () {
                return i.Message.getFieldWithDefault(this, 22, "")
            }
            ,
            proto.webcast.im.Request.prototype.setAbGroup = function (e) {
                return i.Message.setProto3StringField(this, 22, e)
            }
            ,
            proto.webcast.im.Response.repeatedFields_ = [1],
            i.Message.GENERATE_TO_OBJECT && (proto.webcast.im.Response.prototype.toObject = function (e) {
                return proto.webcast.im.Response.toObject(e, this)
            }
                ,
                proto.webcast.im.Response.toObject = function (e, t) {
                    var o, r = {
                        messagesList: i.Message.toObjectList(t.getMessagesList(), proto.webcast.im.Message.toObject, e),
                        cursor: i.Message.getFieldWithDefault(t, 2, ""),
                        fetchInterval: i.Message.getFieldWithDefault(t, 3, "0"),
                        now: i.Message.getFieldWithDefault(t, 4, "0"),
                        internalExt: i.Message.getFieldWithDefault(t, 5, ""),
                        fetchType: i.Message.getFieldWithDefault(t, 6, 0),
                        routeParamsMap: (o = t.getRouteParamsMap()) ? o.toObject(e, void 0) : [],
                        heartbeatDuration: i.Message.getFieldWithDefault(t, 8, "0"),
                        needAck: i.Message.getBooleanFieldWithDefault(t, 9, !1),
                        pushServer: i.Message.getFieldWithDefault(t, 10, ""),
                        isFirst: i.Message.getBooleanFieldWithDefault(t, 11, !1)
                    };
                    return e && (r.$jspbMessageInstance = t),
                        r
                }
            ),
            proto.webcast.im.Response.deserializeBinary = function (e) {
                var t = new i.BinaryReader(e)
                    , o = new proto.webcast.im.Response;
                return proto.webcast.im.Response.deserializeBinaryFromReader(o, t)
            }
            ,
            proto.webcast.im.Response.deserializeBinaryFromReader = function (e, t) {
                for (; t.nextField() && !t.isEndGroup();)
                    switch (t.getFieldNumber()) {
                        case 1:
                            var o = new proto.webcast.im.Message;
                            t.readMessage(o, proto.webcast.im.Message.deserializeBinaryFromReader),
                                e.addMessages(o);
                            break;
                        case 2:
                            o = t.readString(),
                                e.setCursor(o);
                            break;
                        case 3:
                            o = t.readInt64String(),
                                e.setFetchInterval(o);
                            break;
                        case 4:
                            o = t.readInt64String(),
                                e.setNow(o);
                            break;
                        case 5:
                            o = t.readString(),
                                e.setInternalExt(o);
                            break;
                        case 6:
                            o = t.readInt32(),
                                e.setFetchType(o);
                            break;
                        case 7:
                            o = e.getRouteParamsMap(),
                                t.readMessage(o, (function (e, t) {
                                    i.Map.deserializeBinary(e, t, i.BinaryReader.prototype.readString, i.BinaryReader.prototype.readString, null, "", "")
                                }
                                ));
                            break;
                        case 8:
                            o = t.readInt64String(),
                                e.setHeartbeatDuration(o);
                            break;
                        case 9:
                            o = t.readBool(),
                                e.setNeedAck(o);
                            break;
                        case 10:
                            o = t.readString(),
                                e.setPushServer(o);
                            break;
                        case 11:
                            o = t.readBool(),
                                e.setIsFirst(o);
                            break;
                        default:
                            t.skipField()
                    }
                return e
            }
            ,
            proto.webcast.im.Response.prototype.serializeBinary = function () {
                var e = new i.BinaryWriter;
                return proto.webcast.im.Response.serializeBinaryToWriter(this, e),
                    e.getResultBuffer()
            }
            ,
            proto.webcast.im.Response.serializeBinaryToWriter = function (e, t) {
                var o = void 0;
                (o = e.getMessagesList()).length > 0 && t.writeRepeatedMessage(1, o, proto.webcast.im.Message.serializeBinaryToWriter),
                    (o = e.getCursor()).length > 0 && t.writeString(2, o),
                    o = e.getFetchInterval(),
                    0 !== parseInt(o, 10) && t.writeInt64String(3, o),
                    o = e.getNow(),
                    0 !== parseInt(o, 10) && t.writeInt64String(4, o),
                    (o = e.getInternalExt()).length > 0 && t.writeString(5, o),
                    0 !== (o = e.getFetchType()) && t.writeInt32(6, o),
                    (o = e.getRouteParamsMap(!0)) && o.getLength() > 0 && o.serializeBinary(7, t, i.BinaryWriter.prototype.writeString, i.BinaryWriter.prototype.writeString),
                    o = e.getHeartbeatDuration(),
                    0 !== parseInt(o, 10) && t.writeInt64String(8, o),
                    (o = e.getNeedAck()) && t.writeBool(9, o),
                    (o = e.getPushServer()).length > 0 && t.writeString(10, o),
                    (o = e.getIsFirst()) && t.writeBool(11, o)
            }
            ,
            proto.webcast.im.Response.prototype.getMessagesList = function () {
                return i.Message.getRepeatedWrapperField(this, proto.webcast.im.Message, 1)
            }
            ,
            proto.webcast.im.Response.prototype.setMessagesList = function (e) {
                return i.Message.setRepeatedWrapperField(this, 1, e)
            }
            ,
            proto.webcast.im.Response.prototype.addMessages = function (e, t) {
                return i.Message.addToRepeatedWrapperField(this, 1, e, proto.webcast.im.Message, t)
            }
            ,
            proto.webcast.im.Response.prototype.clearMessagesList = function () {
                return this.setMessagesList([])
            }
            ,
            proto.webcast.im.Response.prototype.getCursor = function () {
                return i.Message.getFieldWithDefault(this, 2, "")
            }
            ,
            proto.webcast.im.Response.prototype.setCursor = function (e) {
                return i.Message.setProto3StringField(this, 2, e)
            }
            ,
            proto.webcast.im.Response.prototype.getFetchInterval = function () {
                return i.Message.getFieldWithDefault(this, 3, "0")
            }
            ,
            proto.webcast.im.Response.prototype.setFetchInterval = function (e) {
                return i.Message.setProto3StringIntField(this, 3, e)
            }
            ,
            proto.webcast.im.Response.prototype.getNow = function () {
                return i.Message.getFieldWithDefault(this, 4, "0")
            }
            ,
            proto.webcast.im.Response.prototype.setNow = function (e) {
                return i.Message.setProto3StringIntField(this, 4, e)
            }
            ,
            proto.webcast.im.Response.prototype.getInternalExt = function () {
                return i.Message.getFieldWithDefault(this, 5, "")
            }
            ,
            proto.webcast.im.Response.prototype.setInternalExt = function (e) {
                return i.Message.setProto3StringField(this, 5, e)
            }
            ,
            proto.webcast.im.Response.prototype.getFetchType = function () {
                return i.Message.getFieldWithDefault(this, 6, 0)
            }
            ,
            proto.webcast.im.Response.prototype.setFetchType = function (e) {
                return i.Message.setProto3IntField(this, 6, e)
            }
            ,
            proto.webcast.im.Response.prototype.getRouteParamsMap = function (e) {
                return i.Message.getMapField(this, 7, e, null)
            }
            ,
            proto.webcast.im.Response.prototype.clearRouteParamsMap = function () {
                return this.getRouteParamsMap().clear(),
                    this
            }
            ,
            proto.webcast.im.Response.prototype.getHeartbeatDuration = function () {
                return i.Message.getFieldWithDefault(this, 8, "0")
            }
            ,
            proto.webcast.im.Response.prototype.setHeartbeatDuration = function (e) {
                return i.Message.setProto3StringIntField(this, 8, e)
            }
            ,
            proto.webcast.im.Response.prototype.getNeedAck = function () {
                return i.Message.getBooleanFieldWithDefault(this, 9, !1)
            }
            ,
            proto.webcast.im.Response.prototype.setNeedAck = function (e) {
                return i.Message.setProto3BooleanField(this, 9, e)
            }
            ,
            proto.webcast.im.Response.prototype.getPushServer = function () {
                return i.Message.getFieldWithDefault(this, 10, "")
            }
            ,
            proto.webcast.im.Response.prototype.setPushServer = function (e) {
                return i.Message.setProto3StringField(this, 10, e)
            }
            ,
            proto.webcast.im.Response.prototype.getIsFirst = function () {
                return i.Message.getBooleanFieldWithDefault(this, 11, !1)
            }
            ,
            proto.webcast.im.Response.prototype.setIsFirst = function (e) {
                return i.Message.setProto3BooleanField(this, 11, e)
            }
            ,
            i.Message.GENERATE_TO_OBJECT && (proto.webcast.im.Message.prototype.toObject = function (e) {
                return proto.webcast.im.Message.toObject(e, this)
            }
                ,
                proto.webcast.im.Message.toObject = function (e, t) {
                    var o = {
                        method: i.Message.getFieldWithDefault(t, 1, ""),
                        payload: t.getPayload_asB64(),
                        msgId: i.Message.getFieldWithDefault(t, 3, "0"),
                        msgType: i.Message.getFieldWithDefault(t, 4, 0)
                    };
                    return e && (o.$jspbMessageInstance = t),
                        o
                }
            ),
            proto.webcast.im.Message.deserializeBinary = function (e) {
                var t = new i.BinaryReader(e)
                    , o = new proto.webcast.im.Message;
                return proto.webcast.im.Message.deserializeBinaryFromReader(o, t)
            }
            ,
            proto.webcast.im.Message.deserializeBinaryFromReader = function (e, t) {
                for (; t.nextField() && !t.isEndGroup();)
                    switch (t.getFieldNumber()) {
                        case 1:
                            var o = t.readString();
                            e.setMethod(o);
                            break;
                        case 2:
                            o = t.readBytes(),
                                e.setPayload(o);
                            break;
                        case 3:
                            o = t.readInt64String(),
                                e.setMsgId(o);
                            break;
                        case 4:
                            o = t.readInt32(),
                                e.setMsgType(o);
                            break;
                        default:
                            t.skipField()
                    }
                return e
            }
            ,
            proto.webcast.im.Message.prototype.serializeBinary = function () {
                var e = new i.BinaryWriter;
                return proto.webcast.im.Message.serializeBinaryToWriter(this, e),
                    e.getResultBuffer()
            }
            ,
            proto.webcast.im.Message.serializeBinaryToWriter = function (e, t) {
                var o = void 0;
                (o = e.getMethod()).length > 0 && t.writeString(1, o),
                    (o = e.getPayload_asU8()).length > 0 && t.writeBytes(2, o),
                    o = e.getMsgId(),
                    0 !== parseInt(o, 10) && t.writeInt64String(3, o),
                    0 !== (o = e.getMsgType()) && t.writeInt32(4, o)
            }
            ,
            proto.webcast.im.Message.prototype.getMethod = function () {
                return i.Message.getFieldWithDefault(this, 1, "")
            }
            ,
            proto.webcast.im.Message.prototype.setMethod = function (e) {
                return i.Message.setProto3StringField(this, 1, e)
            }
            ,
            proto.webcast.im.Message.prototype.getPayload = function () {
                return i.Message.getFieldWithDefault(this, 2, "")
            }
            ,
            proto.webcast.im.Message.prototype.getPayload_asB64 = function () {
                return i.Message.bytesAsB64(this.getPayload())
            }
            ,
            proto.webcast.im.Message.prototype.getPayload_asU8 = function () {
                return i.Message.bytesAsU8(this.getPayload())
            }
            ,
            proto.webcast.im.Message.prototype.setPayload = function (e) {
                return i.Message.setProto3BytesField(this, 2, e)
            }
            ,
            proto.webcast.im.Message.prototype.getMsgId = function () {
                return i.Message.getFieldWithDefault(this, 3, "0")
            }
            ,
            proto.webcast.im.Message.prototype.setMsgId = function (e) {
                return i.Message.setProto3StringIntField(this, 3, e)
            }
            ,
            proto.webcast.im.Message.prototype.getMsgType = function () {
                return i.Message.getFieldWithDefault(this, 4, 0)
            }
            ,
            proto.webcast.im.Message.prototype.setMsgType = function (e) {
                return i.Message.setProto3IntField(this, 4, e)
            }
            ,
            r.object.extend(t, proto.webcast.im)
    }
}]);
