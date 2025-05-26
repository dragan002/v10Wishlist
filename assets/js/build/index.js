/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/js/src/react/components/WishlistCounter.jsx":
/*!************************************************************!*\
  !*** ./assets/js/src/react/components/WishlistCounter.jsx ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);


const WishlistCounter = () => {
  const [count, setCount] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    // Initial count fetch
    fetchWishlistCount();

    // Listen for wishlist updates
    document.addEventListener('wpls_wishlist_updated', fetchWishlistCount);
    return () => document.removeEventListener('wpls_wishlist_updated', fetchWishlistCount);
  }, []);
  const fetchWishlistCount = async () => {
    try {
      // Ensure wpls_data and wpls_data.ajax_url are available
      if (typeof wpls_data === 'undefined' || typeof wpls_data.ajax_url === 'undefined') {
        console.error('wpls_data or wpls_data.ajax_url is not defined.');
        return;
      }
      const response = await fetch(wpls_data.ajax_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          action: 'wpls_get_wishlist_count',
          nonce: wpls_data.nonce // Ensure wpls_data.nonce is available
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        setCount(data.data.count);
      } else {
        console.error('Failed to fetch wishlist count:', data.data ? data.data.message : 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching wishlist count:', error);
    }
  };
  if (count === 0 && wpls_data.show_zero_count !== 'yes') {
    // Assuming you might add this option later
    return null;
  }
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: wpls_data.wishlist_url || '#',
    className: "wpls-wishlist-counter"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "wishlist-icon"
  }, "\u2665"), " ", (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "count"
  }, count));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WishlistCounter);

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./assets/js/src/react/index.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_WishlistCounter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/WishlistCounter */ "./assets/js/src/react/components/WishlistCounter.jsx");



document.addEventListener('DOMContentLoaded', () => {
  // Define an array of potential selectors for the mount point
  const mountPointSelectors = ['.site-header-cart',
  // Common WooCommerce selector
  '.header-cart-wrapper',
  // Another common one
  '.site-header .secondary-navigation ul',
  // Storefront theme secondary nav
  '#site-header-menu #primary-menu-list',
  // Twenty Twenty-One/Two/Three primary menu
  '#site-navigation .menu-main-menu-container > ul',
  // Generic primary menu
  '#primary-navigation > div > ul',
  // Another generic primary menu pattern
  'header[role="banner"] .nav-wrapper > ul',
  // Common header pattern
  'header .main-navigation ul' // Another common navigation pattern
  // Add more selectors if needed for common themes
  ];
  let mountPoint = null;
  for (const selector of mountPointSelectors) {
    mountPoint = document.querySelector(selector);
    if (mountPoint) {
      break; // Found a suitable mount point
    }
  }

  // If no specific mount point is found, try to append to the site header as a fallback
  if (!mountPoint) {
    mountPoint = document.querySelector('.site-header') || document.querySelector('header[role="banner"]');
  }

  // Final fallback: body, if absolutely nothing else is found (less ideal)
  if (!mountPoint) {
    console.warn('Wishlist Counter: Could not find a suitable mount point in the header or navigation. The counter might not be visible.');
    return; // Don't render if no good spot is found
  }
  const container = document.createElement('div');
  container.className = 'wpls-wishlist-counter-container'; // For potential styling

  // Try to prepend or append intelligently if it's a list
  if (mountPoint.tagName === 'UL') {
    const listItem = document.createElement('li');
    listItem.className = 'menu-item wpls-wishlist-counter-menu-item'; // So it looks like a menu item
    listItem.appendChild(container);
    mountPoint.appendChild(listItem); // Append as a new menu item
  } else {
    // For other elements, append directly (e.g., inside a header div)
    mountPoint.appendChild(container);
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.render)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_WishlistCounter__WEBPACK_IMPORTED_MODULE_2__["default"], null), container);
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map