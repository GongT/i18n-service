SystemJS.config({
	baseURL: "/public",
	paths: {
		"npm:": "jspm_packages/npm/",
		"client/": "client/"
	},
	browserConfig: {
		"bundles": {
			"jspm_packages/bundle/react-dom.js": [
				"npm:react-dom@15.6.1/index.js",
				"npm:react-dom@15.6.1.json",
				"npm:jspm-nodelibs-process@0.2.1/process.js",
				"npm:jspm-nodelibs-process@0.2.1.json",
				"npm:react-dom@15.6.1/lib/ReactDOM.js",
				"npm:react-dom@15.6.1/lib/ReactDOMInvalidARIAHook.js",
				"npm:fbjs@0.8.12/lib/warning.js",
				"npm:fbjs@0.8.12.json",
				"npm:fbjs@0.8.12/lib/emptyFunction.js",
				"npm:react@15.6.1/lib/ReactComponentTreeHook.js",
				"npm:react@15.6.1.json",
				"npm:fbjs@0.8.12/lib/invariant.js",
				"npm:react@15.6.1/lib/ReactCurrentOwner.js",
				"npm:react@15.6.1/lib/reactProdInvariant.js",
				"npm:react-dom@15.6.1/lib/DOMProperty.js",
				"npm:react-dom@15.6.1/lib/reactProdInvariant.js",
				"npm:react-dom@15.6.1/lib/ReactDOMNullInputValuePropHook.js",
				"npm:react-dom@15.6.1/lib/ReactDOMUnknownPropertyHook.js",
				"npm:react-dom@15.6.1/lib/EventPluginRegistry.js",
				"npm:react-dom@15.6.1/lib/ReactInstrumentation.js",
				"npm:react-dom@15.6.1/lib/ReactDebugTool.js",
				"npm:fbjs@0.8.12/lib/performanceNow.js",
				"npm:fbjs@0.8.12/lib/performance.js",
				"npm:fbjs@0.8.12/lib/ExecutionEnvironment.js",
				"npm:react-dom@15.6.1/lib/ReactHostOperationHistoryHook.js",
				"npm:react-dom@15.6.1/lib/ReactInvalidSetStateWarningHook.js",
				"npm:react-dom@15.6.1/lib/renderSubtreeIntoContainer.js",
				"npm:react-dom@15.6.1/lib/ReactMount.js",
				"npm:react-dom@15.6.1/lib/shouldUpdateReactComponent.js",
				"npm:react-dom@15.6.1/lib/setInnerHTML.js",
				"npm:react-dom@15.6.1/lib/createMicrosoftUnsafeLocalFunction.js",
				"npm:react-dom@15.6.1/lib/DOMNamespaces.js",
				"npm:react-dom@15.6.1/lib/instantiateReactComponent.js",
				"npm:react@15.6.1/lib/getNextDebugID.js",
				"npm:react-dom@15.6.1/lib/ReactHostComponent.js",
				"npm:react-dom@15.6.1/lib/ReactEmptyComponent.js",
				"npm:react-dom@15.6.1/lib/ReactCompositeComponent.js",
				"npm:fbjs@0.8.12/lib/shallowEqual.js",
				"npm:fbjs@0.8.12/lib/emptyObject.js",
				"npm:react-dom@15.6.1/lib/checkReactTypeSpec.js",
				"npm:react-dom@15.6.1/lib/ReactPropTypesSecret.js",
				"npm:react-dom@15.6.1/lib/ReactPropTypeLocationNames.js",
				"npm:react-dom@15.6.1/lib/ReactReconciler.js",
				"npm:react-dom@15.6.1/lib/ReactRef.js",
				"npm:react-dom@15.6.1/lib/ReactOwner.js",
				"npm:react-dom@15.6.1/lib/ReactNodeTypes.js",
				"npm:react@15.6.1/lib/React.js",
				"npm:react@15.6.1/lib/ReactElementValidator.js",
				"npm:react@15.6.1/lib/lowPriorityWarning.js",
				"npm:react@15.6.1/lib/getIteratorFn.js",
				"npm:react@15.6.1/lib/canDefineProperty.js",
				"npm:react@15.6.1/lib/checkReactTypeSpec.js",
				"npm:react@15.6.1/lib/ReactPropTypesSecret.js",
				"npm:react@15.6.1/lib/ReactPropTypeLocationNames.js",
				"npm:react@15.6.1/lib/ReactElement.js",
				"npm:react@15.6.1/lib/ReactElementSymbol.js",
				"npm:object-assign@4.1.1/index.js",
				"npm:object-assign@4.1.1.json",
				"npm:react@15.6.1/lib/onlyChild.js",
				"npm:react@15.6.1/lib/createClass.js",
				"npm:create-react-class@15.6.0/factory.js",
				"npm:create-react-class@15.6.0.json",
				"npm:react@15.6.1/lib/ReactNoopUpdateQueue.js",
				"npm:react@15.6.1/lib/ReactBaseClasses.js",
				"npm:react@15.6.1/lib/ReactVersion.js",
				"npm:react@15.6.1/lib/ReactPropTypes.js",
				"npm:prop-types@15.5.10/factory.js",
				"npm:prop-types@15.5.10.json",
				"npm:prop-types@15.5.10/factoryWithTypeCheckers.js",
				"npm:prop-types@15.5.10/checkPropTypes.js",
				"npm:prop-types@15.5.10/lib/ReactPropTypesSecret.js",
				"npm:react@15.6.1/lib/ReactDOMFactories.js",
				"npm:react@15.6.1/lib/ReactChildren.js",
				"npm:react@15.6.1/lib/traverseAllChildren.js",
				"npm:react@15.6.1/lib/KeyEscapeUtils.js",
				"npm:react@15.6.1/lib/PooledClass.js",
				"npm:react-dom@15.6.1/lib/ReactInstanceMap.js",
				"npm:react-dom@15.6.1/lib/ReactErrorUtils.js",
				"npm:react-dom@15.6.1/lib/ReactComponentEnvironment.js",
				"npm:react-dom@15.6.1/lib/ReactUpdates.js",
				"npm:react-dom@15.6.1/lib/Transaction.js",
				"npm:react-dom@15.6.1/lib/ReactFeatureFlags.js",
				"npm:react-dom@15.6.1/lib/PooledClass.js",
				"npm:react-dom@15.6.1/lib/CallbackQueue.js",
				"npm:react-dom@15.6.1/lib/ReactUpdateQueue.js",
				"npm:react-dom@15.6.1/lib/ReactMarkupChecksum.js",
				"npm:react-dom@15.6.1/lib/adler32.js",
				"npm:react-dom@15.6.1/lib/ReactDOMFeatureFlags.js",
				"npm:react-dom@15.6.1/lib/ReactDOMContainerInfo.js",
				"npm:react-dom@15.6.1/lib/validateDOMNesting.js",
				"npm:react-dom@15.6.1/lib/ReactDOMComponentTree.js",
				"npm:react-dom@15.6.1/lib/ReactDOMComponentFlags.js",
				"npm:react-dom@15.6.1/lib/ReactBrowserEventEmitter.js",
				"npm:react-dom@15.6.1/lib/isEventSupported.js",
				"npm:react-dom@15.6.1/lib/getVendorPrefixedEventName.js",
				"npm:react-dom@15.6.1/lib/ViewportMetrics.js",
				"npm:react-dom@15.6.1/lib/ReactEventEmitterMixin.js",
				"npm:react-dom@15.6.1/lib/EventPluginHub.js",
				"npm:react-dom@15.6.1/lib/forEachAccumulated.js",
				"npm:react-dom@15.6.1/lib/accumulateInto.js",
				"npm:react-dom@15.6.1/lib/EventPluginUtils.js",
				"npm:react-dom@15.6.1/lib/DOMLazyTree.js",
				"npm:react-dom@15.6.1/lib/setTextContent.js",
				"npm:react-dom@15.6.1/lib/escapeTextContentForBrowser.js",
				"npm:react-dom@15.6.1/lib/getHostComponentFromComposite.js",
				"npm:react-dom@15.6.1/lib/findDOMNode.js",
				"npm:react-dom@15.6.1/lib/ReactVersion.js",
				"npm:react-dom@15.6.1/lib/ReactDefaultInjection.js",
				"npm:react-dom@15.6.1/lib/SimpleEventPlugin.js",
				"npm:react-dom@15.6.1/lib/getEventCharCode.js",
				"npm:react-dom@15.6.1/lib/SyntheticWheelEvent.js",
				"npm:react-dom@15.6.1/lib/SyntheticMouseEvent.js",
				"npm:react-dom@15.6.1/lib/getEventModifierState.js",
				"npm:react-dom@15.6.1/lib/SyntheticUIEvent.js",
				"npm:react-dom@15.6.1/lib/getEventTarget.js",
				"npm:react-dom@15.6.1/lib/SyntheticEvent.js",
				"npm:react-dom@15.6.1/lib/SyntheticTransitionEvent.js",
				"npm:react-dom@15.6.1/lib/SyntheticTouchEvent.js",
				"npm:react-dom@15.6.1/lib/SyntheticDragEvent.js",
				"npm:react-dom@15.6.1/lib/SyntheticKeyboardEvent.js",
				"npm:react-dom@15.6.1/lib/getEventKey.js",
				"npm:react-dom@15.6.1/lib/SyntheticFocusEvent.js",
				"npm:react-dom@15.6.1/lib/SyntheticClipboardEvent.js",
				"npm:react-dom@15.6.1/lib/SyntheticAnimationEvent.js",
				"npm:react-dom@15.6.1/lib/EventPropagators.js",
				"npm:fbjs@0.8.12/lib/EventListener.js",
				"npm:react-dom@15.6.1/lib/SelectEventPlugin.js",
				"npm:react-dom@15.6.1/lib/isTextInputElement.js",
				"npm:fbjs@0.8.12/lib/getActiveElement.js",
				"npm:react-dom@15.6.1/lib/ReactInputSelection.js",
				"npm:fbjs@0.8.12/lib/focusNode.js",
				"npm:fbjs@0.8.12/lib/containsNode.js",
				"npm:fbjs@0.8.12/lib/isTextNode.js",
				"npm:fbjs@0.8.12/lib/isNode.js",
				"npm:react-dom@15.6.1/lib/ReactDOMSelection.js",
				"npm:react-dom@15.6.1/lib/getTextContentAccessor.js",
				"npm:react-dom@15.6.1/lib/getNodeForCharacterOffset.js",
				"npm:react-dom@15.6.1/lib/SVGDOMPropertyConfig.js",
				"npm:react-dom@15.6.1/lib/ReactReconcileTransaction.js",
				"npm:react-dom@15.6.1/lib/ReactInjection.js",
				"npm:react-dom@15.6.1/lib/ReactEventListener.js",
				"npm:fbjs@0.8.12/lib/getUnboundedScrollPosition.js",
				"npm:react-dom@15.6.1/lib/ReactDefaultBatchingStrategy.js",
				"npm:react-dom@15.6.1/lib/ReactDOMTextComponent.js",
				"npm:react-dom@15.6.1/lib/DOMChildrenOperations.js",
				"npm:react-dom@15.6.1/lib/Danger.js",
				"npm:fbjs@0.8.12/lib/createNodesFromMarkup.js",
				"npm:fbjs@0.8.12/lib/getMarkupWrap.js",
				"npm:fbjs@0.8.12/lib/createArrayFromMixed.js",
				"npm:react-dom@15.6.1/lib/ReactDOMTreeTraversal.js",
				"npm:react-dom@15.6.1/lib/ReactDOMEmptyComponent.js",
				"npm:react-dom@15.6.1/lib/ReactDOMComponent.js",
				"npm:react-dom@15.6.1/lib/inputValueTracking.js",
				"npm:react-dom@15.6.1/lib/ReactServerRenderingTransaction.js",
				"npm:react-dom@15.6.1/lib/ReactServerUpdateQueue.js",
				"npm:react-dom@15.6.1/lib/ReactMultiChild.js",
				"npm:react-dom@15.6.1/lib/flattenChildren.js",
				"npm:react-dom@15.6.1/lib/traverseAllChildren.js",
				"npm:react-dom@15.6.1/lib/KeyEscapeUtils.js",
				"npm:react-dom@15.6.1/lib/getIteratorFn.js",
				"npm:react-dom@15.6.1/lib/ReactElementSymbol.js",
				"npm:react-dom@15.6.1/lib/ReactChildReconciler.js",
				"npm:react-dom@15.6.1/lib/ReactDOMTextarea.js",
				"npm:react-dom@15.6.1/lib/LinkedValueUtils.js",
				"npm:react-dom@15.6.1/lib/ReactDOMSelect.js",
				"npm:react-dom@15.6.1/lib/ReactDOMOption.js",
				"npm:react-dom@15.6.1/lib/ReactDOMInput.js",
				"npm:react-dom@15.6.1/lib/DOMPropertyOperations.js",
				"npm:react-dom@15.6.1/lib/quoteAttributeValueForBrowser.js",
				"npm:react-dom@15.6.1/lib/CSSPropertyOperations.js",
				"npm:fbjs@0.8.12/lib/memoizeStringOnly.js",
				"npm:fbjs@0.8.12/lib/hyphenateStyleName.js",
				"npm:fbjs@0.8.12/lib/hyphenate.js",
				"npm:react-dom@15.6.1/lib/dangerousStyleValue.js",
				"npm:react-dom@15.6.1/lib/CSSProperty.js",
				"npm:fbjs@0.8.12/lib/camelizeStyleName.js",
				"npm:fbjs@0.8.12/lib/camelize.js",
				"npm:react-dom@15.6.1/lib/AutoFocusUtils.js",
				"npm:react-dom@15.6.1/lib/ReactComponentBrowserEnvironment.js",
				"npm:react-dom@15.6.1/lib/ReactDOMIDOperations.js",
				"npm:react-dom@15.6.1/lib/HTMLDOMPropertyConfig.js",
				"npm:react-dom@15.6.1/lib/EnterLeaveEventPlugin.js",
				"npm:react-dom@15.6.1/lib/DefaultEventPluginOrder.js",
				"npm:react-dom@15.6.1/lib/ChangeEventPlugin.js",
				"npm:react-dom@15.6.1/lib/BeforeInputEventPlugin.js",
				"npm:react-dom@15.6.1/lib/SyntheticInputEvent.js",
				"npm:react-dom@15.6.1/lib/SyntheticCompositionEvent.js",
				"npm:react-dom@15.6.1/lib/FallbackCompositionState.js",
				"npm:react-dom@15.6.1/lib/ARIADOMPropertyConfig.js"
			],
			"jspm_packages/bundle/whatwg-fetch.js": [
				"npm:whatwg-fetch@2.0.3/fetch.js",
				"npm:whatwg-fetch@2.0.3.json"
			],
			"jspm_packages/bundle/prop-types.js": [
				"npm:prop-types@15.5.10/index.js",
				"npm:prop-types@15.5.10.json",
				"npm:jspm-nodelibs-process@0.2.1/process.js",
				"npm:jspm-nodelibs-process@0.2.1.json",
				"npm:prop-types@15.5.10/factoryWithThrowingShims.js",
				"npm:prop-types@15.5.10/lib/ReactPropTypesSecret.js",
				"npm:fbjs@0.8.12/lib/invariant.js",
				"npm:fbjs@0.8.12.json",
				"npm:fbjs@0.8.12/lib/emptyFunction.js",
				"npm:prop-types@15.5.10/factoryWithTypeCheckers.js",
				"npm:prop-types@15.5.10/checkPropTypes.js",
				"npm:fbjs@0.8.12/lib/warning.js"
			]
		}
	},
	transpiler: false,
	packages: {
		"client": {
			"main": "index.js",
			"format": "cjs"
		}
	}
});

SystemJS.config({
	packageConfigPaths: [
		"npm:@*/*.json",
		"npm:*.json"
	],
	map: {
		"assert": "npm:jspm-nodelibs-assert@0.2.1",
		"buffer": "npm:jspm-nodelibs-buffer@0.2.3",
		"child_process": "npm:jspm-nodelibs-child_process@0.2.1",
		"constants": "npm:jspm-nodelibs-constants@0.2.1",
		"crypto": "npm:jspm-nodelibs-crypto@0.2.1",
		"domain": "npm:jspm-nodelibs-domain@0.2.1",
		"events": "npm:jspm-nodelibs-events@0.2.2",
		"fs": "npm:jspm-nodelibs-fs@0.2.1",
		"http": "npm:jspm-nodelibs-http@0.2.0",
		"https": "npm:jspm-nodelibs-https@0.2.2",
		"os": "npm:jspm-nodelibs-os@0.2.2",
		"path": "npm:jspm-nodelibs-path@0.2.3",
		"process": "npm:jspm-nodelibs-process@0.2.1",
		"prop-types": "npm:prop-types@15.5.10",
		"react": "npm:react@15.6.1",
		"react-dom": "npm:react-dom@15.6.1",
		"stream": "npm:jspm-nodelibs-stream@0.2.1",
		"string_decoder": "npm:jspm-nodelibs-string_decoder@0.2.1",
		"url": "npm:jspm-nodelibs-url@0.2.1",
		"util": "npm:jspm-nodelibs-util@0.2.2",
		"vm": "npm:jspm-nodelibs-vm@0.2.1",
		"whatwg-fetch": "npm:whatwg-fetch@2.0.3",
		"zlib": "npm:jspm-nodelibs-zlib@0.2.3"
	},
	packages: {
		"npm:react-dom@15.6.1": {
			"map": {
				"object-assign": "npm:object-assign@4.1.1",
				"prop-types": "npm:prop-types@15.5.10",
				"fbjs": "npm:fbjs@0.8.12",
				"loose-envify": "npm:loose-envify@1.3.1"
			}
		},
		"npm:react@15.6.1": {
			"map": {
				"prop-types": "npm:prop-types@15.5.10",
				"object-assign": "npm:object-assign@4.1.1",
				"fbjs": "npm:fbjs@0.8.12",
				"loose-envify": "npm:loose-envify@1.3.1",
				"create-react-class": "npm:create-react-class@15.6.0"
			}
		},
		"npm:prop-types@15.5.10": {
			"map": {
				"fbjs": "npm:fbjs@0.8.12",
				"loose-envify": "npm:loose-envify@1.3.1"
			}
		},
		"npm:fbjs@0.8.12": {
			"map": {
				"object-assign": "npm:object-assign@4.1.1",
				"loose-envify": "npm:loose-envify@1.3.1",
				"isomorphic-fetch": "npm:isomorphic-fetch@2.2.1",
				"setimmediate": "npm:setimmediate@1.0.5",
				"promise": "npm:promise@7.3.1",
				"ua-parser-js": "npm:ua-parser-js@0.7.12",
				"core-js": "npm:core-js@1.2.7"
			}
		},
		"npm:create-react-class@15.6.0": {
			"map": {
				"fbjs": "npm:fbjs@0.8.12",
				"loose-envify": "npm:loose-envify@1.3.1",
				"object-assign": "npm:object-assign@4.1.1"
			}
		},
		"npm:isomorphic-fetch@2.2.1": {
			"map": {
				"whatwg-fetch": "npm:whatwg-fetch@2.0.3",
				"node-fetch": "npm:node-fetch@1.7.1"
			}
		},
		"npm:loose-envify@1.3.1": {
			"map": {
				"js-tokens": "npm:js-tokens@3.0.1"
			}
		},
		"npm:promise@7.3.1": {
			"map": {
				"asap": "npm:asap@2.0.5"
			}
		},
		"npm:jspm-nodelibs-stream@0.2.1": {
			"map": {
				"stream-browserify": "npm:stream-browserify@2.0.1"
			}
		},
		"npm:node-fetch@1.7.1": {
			"map": {
				"is-stream": "npm:is-stream@1.1.0",
				"encoding": "npm:encoding@0.1.12"
			}
		},
		"npm:stream-browserify@2.0.1": {
			"map": {
				"inherits": "npm:inherits@2.0.3",
				"readable-stream": "npm:readable-stream@2.3.0"
			}
		},
		"npm:readable-stream@2.3.0": {
			"map": {
				"inherits": "npm:inherits@2.0.3",
				"util-deprecate": "npm:util-deprecate@1.0.2",
				"safe-buffer": "npm:safe-buffer@5.1.0",
				"string_decoder": "npm:string_decoder@1.0.2",
				"process-nextick-args": "npm:process-nextick-args@1.0.7",
				"core-util-is": "npm:core-util-is@1.0.2",
				"isarray": "npm:isarray@1.0.0"
			}
		},
		"npm:jspm-nodelibs-zlib@0.2.3": {
			"map": {
				"browserify-zlib": "npm:browserify-zlib@0.1.4"
			}
		},
		"npm:jspm-nodelibs-http@0.2.0": {
			"map": {
				"http-browserify": "npm:stream-http@2.7.2"
			}
		},
		"npm:browserify-zlib@0.1.4": {
			"map": {
				"readable-stream": "npm:readable-stream@2.3.0",
				"pako": "npm:pako@0.2.9"
			}
		},
		"npm:stream-http@2.7.2": {
			"map": {
				"inherits": "npm:inherits@2.0.3",
				"readable-stream": "npm:readable-stream@2.3.0",
				"builtin-status-codes": "npm:builtin-status-codes@3.0.0",
				"xtend": "npm:xtend@4.0.1",
				"to-arraybuffer": "npm:to-arraybuffer@1.0.1"
			}
		},
		"npm:jspm-nodelibs-domain@0.2.1": {
			"map": {
				"domain-browser": "npm:domain-browser@1.1.7"
			}
		},
		"npm:jspm-nodelibs-url@0.2.1": {
			"map": {
				"url": "npm:url@0.11.0"
			}
		},
		"npm:string_decoder@1.0.2": {
			"map": {
				"safe-buffer": "npm:safe-buffer@5.0.1"
			}
		},
		"npm:jspm-nodelibs-buffer@0.2.3": {
			"map": {
				"buffer": "npm:buffer@5.0.6"
			}
		},
		"npm:url@0.11.0": {
			"map": {
				"punycode": "npm:punycode@1.3.2",
				"querystring": "npm:querystring@0.2.0"
			}
		},
		"npm:encoding@0.1.12": {
			"map": {
				"iconv-lite": "npm:iconv-lite@0.4.18"
			}
		},
		"npm:buffer@5.0.6": {
			"map": {
				"ieee754": "npm:ieee754@1.1.8",
				"base64-js": "npm:base64-js@1.2.0"
			}
		},
		"npm:jspm-nodelibs-crypto@0.2.1": {
			"map": {
				"crypto-browserify": "npm:crypto-browserify@3.11.0"
			}
		},
		"npm:crypto-browserify@3.11.0": {
			"map": {
				"inherits": "npm:inherits@2.0.3",
				"create-ecdh": "npm:create-ecdh@4.0.0",
				"browserify-cipher": "npm:browserify-cipher@1.0.0",
				"browserify-sign": "npm:browserify-sign@4.0.4",
				"create-hash": "npm:create-hash@1.1.3",
				"diffie-hellman": "npm:diffie-hellman@5.0.2",
				"randombytes": "npm:randombytes@2.0.5",
				"create-hmac": "npm:create-hmac@1.1.6",
				"public-encrypt": "npm:public-encrypt@4.0.0",
				"pbkdf2": "npm:pbkdf2@3.0.12"
			}
		},
		"npm:jspm-nodelibs-os@0.2.2": {
			"map": {
				"os-browserify": "npm:os-browserify@0.3.0"
			}
		},
		"npm:jspm-nodelibs-string_decoder@0.2.1": {
			"map": {
				"string_decoder": "npm:string_decoder@0.10.31"
			}
		},
		"npm:browserify-sign@4.0.4": {
			"map": {
				"inherits": "npm:inherits@2.0.3",
				"create-hash": "npm:create-hash@1.1.3",
				"create-hmac": "npm:create-hmac@1.1.6",
				"elliptic": "npm:elliptic@6.4.0",
				"parse-asn1": "npm:parse-asn1@5.1.0",
				"browserify-rsa": "npm:browserify-rsa@4.0.1",
				"bn.js": "npm:bn.js@4.11.7"
			}
		},
		"npm:create-hash@1.1.3": {
			"map": {
				"inherits": "npm:inherits@2.0.3",
				"ripemd160": "npm:ripemd160@2.0.1",
				"cipher-base": "npm:cipher-base@1.0.3",
				"sha.js": "npm:sha.js@2.4.8"
			}
		},
		"npm:diffie-hellman@5.0.2": {
			"map": {
				"randombytes": "npm:randombytes@2.0.5",
				"miller-rabin": "npm:miller-rabin@4.0.0",
				"bn.js": "npm:bn.js@4.11.7"
			}
		},
		"npm:randombytes@2.0.5": {
			"map": {
				"safe-buffer": "npm:safe-buffer@5.1.0"
			}
		},
		"npm:create-hmac@1.1.6": {
			"map": {
				"create-hash": "npm:create-hash@1.1.3",
				"inherits": "npm:inherits@2.0.3",
				"safe-buffer": "npm:safe-buffer@5.1.0",
				"ripemd160": "npm:ripemd160@2.0.1",
				"cipher-base": "npm:cipher-base@1.0.3",
				"sha.js": "npm:sha.js@2.4.8"
			}
		},
		"npm:create-ecdh@4.0.0": {
			"map": {
				"elliptic": "npm:elliptic@6.4.0",
				"bn.js": "npm:bn.js@4.11.7"
			}
		},
		"npm:elliptic@6.4.0": {
			"map": {
				"inherits": "npm:inherits@2.0.3",
				"bn.js": "npm:bn.js@4.11.7",
				"hash.js": "npm:hash.js@1.1.1",
				"hmac-drbg": "npm:hmac-drbg@1.0.1",
				"minimalistic-assert": "npm:minimalistic-assert@1.0.0",
				"brorand": "npm:brorand@1.1.0",
				"minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
			}
		},
		"npm:public-encrypt@4.0.0": {
			"map": {
				"create-hash": "npm:create-hash@1.1.3",
				"randombytes": "npm:randombytes@2.0.5",
				"parse-asn1": "npm:parse-asn1@5.1.0",
				"browserify-rsa": "npm:browserify-rsa@4.0.1",
				"bn.js": "npm:bn.js@4.11.7"
			}
		},
		"npm:browserify-cipher@1.0.0": {
			"map": {
				"evp_bytestokey": "npm:evp_bytestokey@1.0.0",
				"browserify-aes": "npm:browserify-aes@1.0.6",
				"browserify-des": "npm:browserify-des@1.0.0"
			}
		},
		"npm:parse-asn1@5.1.0": {
			"map": {
				"browserify-aes": "npm:browserify-aes@1.0.6",
				"create-hash": "npm:create-hash@1.1.3",
				"evp_bytestokey": "npm:evp_bytestokey@1.0.0",
				"pbkdf2": "npm:pbkdf2@3.0.12",
				"asn1.js": "npm:asn1.js@4.9.1"
			}
		},
		"npm:evp_bytestokey@1.0.0": {
			"map": {
				"create-hash": "npm:create-hash@1.1.3"
			}
		},
		"npm:browserify-aes@1.0.6": {
			"map": {
				"create-hash": "npm:create-hash@1.1.3",
				"inherits": "npm:inherits@2.0.3",
				"evp_bytestokey": "npm:evp_bytestokey@1.0.0",
				"cipher-base": "npm:cipher-base@1.0.3",
				"buffer-xor": "npm:buffer-xor@1.0.3"
			}
		},
		"npm:browserify-des@1.0.0": {
			"map": {
				"inherits": "npm:inherits@2.0.3",
				"cipher-base": "npm:cipher-base@1.0.3",
				"des.js": "npm:des.js@1.0.0"
			}
		},
		"npm:browserify-rsa@4.0.1": {
			"map": {
				"randombytes": "npm:randombytes@2.0.5",
				"bn.js": "npm:bn.js@4.11.7"
			}
		},
		"npm:ripemd160@2.0.1": {
			"map": {
				"inherits": "npm:inherits@2.0.3",
				"hash-base": "npm:hash-base@2.0.2"
			}
		},
		"npm:miller-rabin@4.0.0": {
			"map": {
				"bn.js": "npm:bn.js@4.11.7",
				"brorand": "npm:brorand@1.1.0"
			}
		},
		"npm:pbkdf2@3.0.12": {
			"map": {
				"create-hash": "npm:create-hash@1.1.3",
				"create-hmac": "npm:create-hmac@1.1.6",
				"ripemd160": "npm:ripemd160@2.0.1",
				"safe-buffer": "npm:safe-buffer@5.1.0",
				"sha.js": "npm:sha.js@2.4.8"
			}
		},
		"npm:hash.js@1.1.1": {
			"map": {
				"inherits": "npm:inherits@2.0.3",
				"minimalistic-assert": "npm:minimalistic-assert@1.0.0"
			}
		},
		"npm:hmac-drbg@1.0.1": {
			"map": {
				"hash.js": "npm:hash.js@1.1.1",
				"minimalistic-assert": "npm:minimalistic-assert@1.0.0",
				"minimalistic-crypto-utils": "npm:minimalistic-crypto-utils@1.0.1"
			}
		},
		"npm:cipher-base@1.0.3": {
			"map": {
				"inherits": "npm:inherits@2.0.3"
			}
		},
		"npm:sha.js@2.4.8": {
			"map": {
				"inherits": "npm:inherits@2.0.3"
			}
		},
		"npm:des.js@1.0.0": {
			"map": {
				"inherits": "npm:inherits@2.0.3",
				"minimalistic-assert": "npm:minimalistic-assert@1.0.0"
			}
		},
		"npm:asn1.js@4.9.1": {
			"map": {
				"bn.js": "npm:bn.js@4.11.7",
				"inherits": "npm:inherits@2.0.3",
				"minimalistic-assert": "npm:minimalistic-assert@1.0.0"
			}
		},
		"npm:hash-base@2.0.2": {
			"map": {
				"inherits": "npm:inherits@2.0.3"
			}
		}
	}
});
