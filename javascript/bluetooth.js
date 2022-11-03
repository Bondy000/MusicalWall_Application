/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/bluetoothConnection.js":
/*!************************************!*\
  !*** ./src/bluetoothConnection.js ***!
  \************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nlet options = {\r\n    filters: [\r\n        { services: [\"0000ffe0-0000-1000-8000-00805f9b34fb\"]},\r\n        { namePrefix: 'BT' },\r\n        { namePrefix: 'Wall'},\r\n        { namePrefix: 'Guitar'}\r\n    ],\r\n    optionalServices: ['device_information']\r\n}\r\n\r\ndocument.querySelector('.tryBle').addEventListener('click', async function(){\r\n    let device = await navigator.bluetooth.requestDevice(options);\r\n    let server = await device.gatt.connect();\r\n    let service = await server.getPrimaryService(0xffe0);\r\n    let characteristic = await service.getCharacteristic(0xffe1);\r\n    console.log(characteristic);\r\n    console.log(characteristic.BluetoothCharacteristicProperties.write)\r\n    console.log(characteristic);\r\n\r\n});\r\n//let device = await navigator.bluetooth.requestDevice(options);\r\n/*let server = await device.gatt.connect();\r\nlet service = await server.getPrimaryService(0xff0f);\r\nlet characteristic = await service.getCharacteristic(0xfffc);\r\n*/\n\n//# sourceURL=webpack://musicalwall_application/./src/bluetoothConnection.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/bluetoothConnection.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;